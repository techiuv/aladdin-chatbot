from flask import Blueprint, jsonify, request
from config import connect_to_database
from controllers.response_controller import ResponseController, ChatController
from datetime import datetime
from bson.json_util import dumps
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize Blueprint and database connections
chat_bp = Blueprint('chat', __name__)
db, users_collection, messages_collection = connect_to_database()

# Initialize controllers
response_controller = ResponseController()
chat_controller = ChatController(messages_collection)


class ChatHandler:
    """Handler class to manage chat-related routes."""

    @staticmethod
    @chat_bp.route('/chat', methods=['POST'])
    def chat():
        """
        Handle user messages, generate a bot response, save the conversation to the database,
        and return the bot's reply.
        """
        try:
            data = request.get_json()
            email = data.get('email')
            user_message = data.get('message')

            if not email or not user_message:
                return jsonify({"error": "Email and message are required"}), 400

            logging.info(f"User ({email}) sent message: {user_message}")

            # Generate bot response
            bot_response = response_controller.generate_response(user_message)
            logging.info(f"Bot response: {bot_response}")

            # Save the conversation to the database
            messages_collection.insert_one({
                "email": email,
                "user_message": user_message,
                "bot_response": bot_response,
                "timestamp": datetime.utcnow()
            })
            logging.info("Chat successfully saved to the database.")

            return jsonify({"reply": bot_response}), 200

        except Exception as e:
            logging.error(f"Error in /chat route: {e}")
            return jsonify({"error": "An internal error occurred"}), 500

    @staticmethod
    @chat_bp.route('/history', methods=['GET'])
    def get_history():
        """
        Fetch the chat history of a user by their email.
        """
        email = request.args.get('email')

        if not email:
            return jsonify({"error": "Email is required"}), 400

        try:
            # Retrieve chat history from the database
            chats = messages_collection.find(
                {"email": email},
                {"_id": 0, "user_message": 1, "bot_response": 1, "timestamp": 1}
            )
            serialized_chats = dumps(chats)  # Serialize MongoDB cursor to JSON format
            logging.info(f"Fetched chat history for email: {email}")
            return serialized_chats, 200

        except Exception as e:
            logging.error(f"Error fetching chat history: {e}")
            return jsonify({"error": "An internal error occurred"}), 500

    @staticmethod
    @chat_bp.route('/delete-chats', methods=['DELETE'])
    def delete_chats():
        """
        Delete all chats associated with a user's email.
        """
        try:
            data = request.get_json()

            if not data or not data.get('email'):
                return jsonify({"error": "Email is required"}), 400

            email = data['email']

            # Use ChatController to delete chats
            result = chat_controller.delete_all_chats(email)
            status_code = 200 if result["status"] == "success" else 404
            logging.info(f"Deleted chats for email: {email}")
            return jsonify(result), status_code

        except Exception as e:
            logging.error(f"Error deleting chats: {e}")
            return jsonify({"error": "An internal error occurred"}), 500


# Register the blueprint
# In your main Flask app, you would register this Blueprint:
# app.register_blueprint(chat_bp, url_prefix='/api')
