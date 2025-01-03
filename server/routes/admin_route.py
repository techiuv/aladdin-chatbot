from flask import Blueprint, jsonify, request
from config import connect_to_database
import logging
import os
from dotenv import load_dotenv

load_dotenv()

ADMIN_PASSWORD = os.getenv('ADMIN_PASSKEY')

logging.basicConfig(level=logging.INFO)

admin_bp = Blueprint('admin', __name__)

db, users_collection, admin_collection = connect_to_database()


@admin_bp.route('/validate-password', methods=['POST'])
def validate_password():
    try:
        data = request.get_json()
        input_password = data.get('password')

        if not input_password:
            return jsonify({"error": "Password is required"}), 400

        # Check if the input password matches the hardcoded admin password
        if input_password != ADMIN_PASSWORD:
            return jsonify({"error": "Invalid password"}), 401

        return jsonify({"message": "Password validated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all users route
@admin_bp.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = list(users_collection.find({}, {"_id": 0}))  
        logging.info(f"Retrieved {len(users)} users from the database.")

        return jsonify({"users": users}), 200

    except Exception as e:
        logging.error(f"Error retrieving users: {e}")
        return jsonify({"error": "An error occurred while retrieving users"}), 500
