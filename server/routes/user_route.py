from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import connect_to_database
from controllers.user_controllers import UserController

# Define Blueprint
auth_bp = Blueprint('auth', __name__)

# Connect to the database
db, users_collection, _ = connect_to_database()

# Initialize UserController
user_controller = UserController(users_collection)


class AuthHandler:
    @staticmethod
    @auth_bp.route("/register", methods=["POST"])
    def signup():
        """User registration."""
        try:
            data = request.get_json()
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")

            if not all([name, email, password]):
                return jsonify({"error": "Missing required fields"}), 400

            result = user_controller.register_user(name, email, password)
            if "error" in result:
                return jsonify({"error": result["error"]}), 400

            return jsonify({"message": result["message"]}), 201

        except Exception as e:
            print(f"Error during registration: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    @auth_bp.route("/login", methods=["POST"])
    def login():
        """User login."""
        try:
            data = request.get_json()
            email = data.get("email")
            password = data.get("password")

            if not all([email, password]):
                return jsonify({"error": "Missing required fields"}), 400

            result = user_controller.login_user(email, password)
            if "error" in result:
                return jsonify({"error": result["error"]}), 401

            return jsonify(result), 200

        except Exception as e:
            print(f"Error during login: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    @auth_bp.route("/protected", methods=["POST"])
    @jwt_required()
    def protected():
        """Protected route."""
        try:
            current_email = get_jwt_identity()
            return jsonify({"msg": f"Welcome, {current_email}!"}), 200
        except Exception as e:
            print(f"Error in protected route: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500

    @staticmethod
    @auth_bp.route("/refresh", methods=["POST"])
    @jwt_required(refresh=True)
    def refresh():
        """Token refresh."""
        try:
            identity = get_jwt_identity()
            access_token = user_controller.create_tokens(identity)[0]
            return jsonify({"access_token": access_token}), 200
        except Exception as e:
            print(f"Error during token refresh: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
