<<<<<<< HEAD
import logging
from pymongo.collection import Collection
import os
from dotenv import load_dotenv

load_dotenv()

ADMIN_PASSWORD = os.getenv('ADMIN_PASSKEY')

logging.basicConfig(level=logging.INFO)


class AdminController:
    def __init__(self, users_collection: Collection):
        self.users_collection = users_collection

    def validate_password(self, input_password: str) -> dict:
        """
        Validate the provided admin password.
        :param input_password: Password provided by the client
        :return: A dictionary containing the result
        """
        if not input_password:
            return {"error": "Password is required", "status_code": 400}

        if input_password != ADMIN_PASSWORD:
            return {"error": "Invalid password", "status_code": 401}

        return {"message": "Password validated", "status_code": 200}

    def get_all_users(self) -> dict:
        """
        Retrieve all users from the database.
        :return: A dictionary containing user data
        """
        try:
            users = list(self.users_collection.find({}, {"_id": 0}))
            logging.info(f"Retrieved {len(users)} users from the database.")
            return {"users": users, "status_code": 200}

        except Exception as e:
            logging.error(f"Error retrieving users: {e}")
            return {"error": "An error occurred while retrieving users", "status_code": 500}
=======
import logging
from pymongo.collection import Collection
import os
from dotenv import load_dotenv

load_dotenv()

ADMIN_PASSWORD = os.getenv('ADMIN_PASSKEY')

logging.basicConfig(level=logging.INFO)


class AdminController:
    def __init__(self, users_collection: Collection):
        self.users_collection = users_collection

    def validate_password(self, input_password: str) -> dict:
        """
        Validate the provided admin password.
        :param input_password: Password provided by the client
        :return: A dictionary containing the result
        """
        if not input_password:
            return {"error": "Password is required", "status_code": 400}

        if input_password != ADMIN_PASSWORD:
            return {"error": "Invalid password", "status_code": 401}

        return {"message": "Password validated", "status_code": 200}

    def get_all_users(self) -> dict:
        """
        Retrieve all users from the database.
        :return: A dictionary containing user data
        """
        try:
            users = list(self.users_collection.find({}, {"_id": 0}))
            logging.info(f"Retrieved {len(users)} users from the database.")
            return {"users": users, "status_code": 200}

        except Exception as e:
            logging.error(f"Error retrieving users: {e}")
            return {"error": "An error occurred while retrieving users", "status_code": 500}
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
