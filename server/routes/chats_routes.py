from flask import Blueprint, jsonify, request
from config import connect_to_database
from controllers.response_controller import ResponseController
from controllers.response_controller import ChatController
from datetime import datetime
from bson.json_util import dumps
import logging




logging.basicConfig(level=logging.INFO)

chat_bp = Blueprint('chat', __name__)

db, users_collection, messages_collection = connect_to_database()

response_controller = ResponseController()
chat_controller = ChatController(messages_collection)






class ChatHandler:
    @staticmethod
    @chat_bp.route('/chat', methods=['POST'])
    def chat():
     
        try:
            data = request.json
            email = data.get('email')
            user_message = data.get('message')

            if not email or not user_message:
                return jsonify({"error": "Email and message are required"}), 400

            logging.info(f"User ({email}) sent message: {user_message}")

            # Generate bot response
            bot_response = response_controller.generate_response(user_message)
            logging.info(f"Bot response: {bot_response}")

            # Save to the database
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
        






    @staticmethod
    @chat_bp.route('/history', methods=['GET'])
    def get_history():
      
        email = request.args.get('email') 

        if not email:
            return jsonify({"error": "Email is required"}), 400

        try:
            chats = messages_collection.find({"email": email}, {"_id": 0, "user_message": 1}) 
            serialized_chats = dumps(chats) 
            return serialized_chats, 200

        except Exception as e:
            logging.error(f"Error fetching chat history: {e}")
            return jsonify({"error": "An internal error occurred"}), 500
        






    @staticmethod
    @chat_bp.route('/delete-chats', methods=['DELETE'])
    def delete_chats():
     
        email = request.args.get('email')  

        if not email:
            return jsonify({"error": "Email is required"}), 400

        try:
            # Use ChatController to delete chats
            result = chat_controller.delete_all_chats(email)
            status_code = 200 if result["status"] == "success" else 404
            return jsonify(result), status_code

        except Exception as e:
            logging.error(f"Error deleting chats: {e}")
            return jsonify({"error": "An internal error occurred"}), 500
