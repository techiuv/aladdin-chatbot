from flask import Blueprint, jsonify, request
from config import connect_to_database
from bson.json_util import dumps  # Use for serializing MongoDB data
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)

# Define Blueprint
chat_bp = Blueprint('chat', __name__)

# Connect to the database
db, users_collection, messages_collection = connect_to_database()

@chat_bp.route('/chat', methods=['POST'])
def chat():
    """
    Handle user messages and provide a bot response.
    """
    try:
        data = request.json
        email = data.get('email')
        user_message = data.get('message')

        if not email or not user_message:
            return jsonify({"error": "Email and message are required"}), 400

        logging.info(f"User ({email}) sent message: {user_message}")

        # Generate bot response
        bot_response = f"Hello! You said: '{user_message}'"
        logging.info(f"Bot response: {bot_response}")

        messages_collection.insert_one({
            "email": email,
            "user_message": user_message,
            "bot_response": bot_response,
            "timestamp": datetime.utcnow()  
        })
        logging.info("Chat successfully saved to the database.")

        # Return bot response
        return jsonify({"reply": bot_response}), 200

    except Exception as e:
        logging.error(f"Error in /chat route: {e}")
        return jsonify({"error": "An internal error occurred"}), 500


@chat_bp.route('/history', methods=['GET'])
def get_history():
    """
    Retrieve chat history for a specific user by email, returning only user messages.
    """
    email = request.args.get('email')  # Fetch the email from query parameters

    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        # Fetch only the `user_message` field from MongoDB based on email
        chats = messages_collection.find({"email": email}, {"_id": 0, "user_message": 1})  # Projection
        serialized_chats = dumps(chats)  # Serialize MongoDB cursor to JSON
        return serialized_chats, 200

    except Exception as e:
        logging.error(f"Error fetching chat history: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

