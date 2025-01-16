from dotenv import load_dotenv
from flask_pymongo import MongoClient
import os


load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
from pymongo import MongoClient

def connect_to_database():

    try:
        client = MongoClient(MONGO_URI)
        db = client.chatbot_db
        users_collection = db.users
        messages_collection = db.messages
        # print("Database connected successfully.")
        return db, users_collection, messages_collection
    except Exception as e:
        print(f"Database connection failed: {e}")
        return None, None, None
