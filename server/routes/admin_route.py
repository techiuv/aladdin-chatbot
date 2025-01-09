from flask import Blueprint, request, jsonify
from config import connect_to_database
from controllers.admin_controller import AdminController

# Define Blueprint
admin_bp = Blueprint('admin', __name__)

# Connect to the database
db, users_collection, _ = connect_to_database()

# Initialize AdminController
admin_controller = AdminController(users_collection)


class AdminHandler:
    @staticmethod
    @admin_bp.route('/validate-password', methods=['POST'])
    def validate_password():
        """
        Route to validate admin password.
        """
        try:
            data = request.get_json()
            input_password = data.get('password')

            # Call the controller function
            result = admin_controller.validate_password(input_password)
            if "error" in result:
                return jsonify({"error": result["error"]}), result["status_code"]

            return jsonify({"message": result["message"]}), result["status_code"]

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    @admin_bp.route('/users', methods=['GET'])
    def get_all_users():
        """
        Route to get all users.
        """
        try:
            # Call the controller function
            result = admin_controller.get_all_users()
            if "error" in result:
                return jsonify({"error": result["error"]}), result["status_code"]

            return jsonify({"users": result["users"]}), result["status_code"]

        except Exception as e:
            return jsonify({"error": str(e)}), 500
