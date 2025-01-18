import os
import re
import logging
from datetime import datetime
import openai
from pymongo.collection import Collection

# Configure logging
logging.basicConfig(level=logging.ERROR)

class ResponseController:
    def __init__(self):
        openai.api_key = "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"


    def generate_response(self, user_message):
        """
        Generate a bot response based on user input using regex or fallback to OpenAI API.
        """
        try:
            if re.search(r'\bhello\b', user_message, re.IGNORECASE):
                return "Hello! How can I assist you today?"
            elif re.search(r'\bhelp\b', user_message, re.IGNORECASE):
                return "Sure! Let me know what you need help with."
            else:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",  # You can use "gpt-4" for higher-quality responses
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": user_message}
                    ],
                    temperature=0.7,
                    max_tokens=256,
                    top_p=1.0,
                    frequency_penalty=0.0,
                    presence_penalty=0.0
                )

                return response.choices[0].message["content"].strip()
        except Exception as e:
            logging.error("Error in generate_response", exc_info=True)
            return "I'm sorry, but I'm unable to process your request at the moment."

class ChatController:
    def __init__(self, messages_collection: Collection):
        self.messages_collection = messages_collection

    def delete_all_chats(self, email: str) -> dict:
        """
        Delete all chats associated with the given email.
        :param email: The user's email whose chats need to be deleted.
        :return: A dictionary containing the status of the operation.
        """
        try:
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return {"status": "error", "message": "Invalid email format."}

            result = self.messages_collection.delete_many({"email": email})
            if result.deleted_count > 0:
                return {"status": "success", "message": f"Deleted {result.deleted_count} chat(s)."}
            else:
                return {"status": "error", "message": "No chats found for the given email."}
        except Exception as e:
            logging.error("Error in delete_all_chats", exc_info=True)
            return {"status": "error", "message": f"An error occurred: {str(e)}"}
