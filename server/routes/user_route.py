from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from config import connect_to_database
import re

bcrypt = Bcrypt()
auth_bp = Blueprint('auth', __name__)

# Connect to the database
db, users_collection, _ = connect_to_database()  # Removed unused messages_collection

# Helper function for consistent error handling
def handle_error(message, status_code=400):
    return jsonify({"error": message}), status_code

# Helper function to validate email format
def validate_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email)

# Helper function to validate password complexity
def validate_password(password):
    return len(password) >= 8  # Extend this for stronger password rules

# Signup route
@auth_bp.route("/register", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not all([name, email, password]):
            return handle_error("Missing required fields")

        if not validate_email(email):
            return handle_error("Invalid email format")

        if not validate_password(password):
            return handle_error("Password must be at least 8 characters long")

        # Check if the user already exists
        existing_user = users_collection.find_one({"email": email})
        if existing_user:
            return handle_error("User already exists")

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        users_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashed_password
        })

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        print(f"Error during registration: {str(e)}")
        return handle_error("Internal server error", 500)

# Login route
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not all([email, password]):
            return handle_error("Missing required fields")

        user = users_collection.find_one({"email": email})
        if not user or not bcrypt.check_password_hash(user["password"], password):
            return handle_error("Invalid credentials", 401)

        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)

        print(access_token, refresh_token)

        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user["name"],
                "email": user["email"],
            },
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 200

    except Exception as e:
        print(f"Error during login: {str(e)}")
        return handle_error("Internal server error", 500)

# Protected route
@auth_bp.route("/protected", methods=["POST"])
@jwt_required()
def protected():
    try:
        current_email = get_jwt_identity()
        return jsonify({"msg": f"Welcome, {current_email}!"}), 200
    except Exception as e:
        print(f"Error in protected route: {str(e)}")
        return handle_error("Internal server error", 500)

# Token refresh route
@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    try:
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return jsonify({"access_token": access_token}), 200
    except Exception as e:
        print(f"Error during token refresh: {str(e)}")
        return handle_error("Internal server error", 500)
