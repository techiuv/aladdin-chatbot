<<<<<<< HEAD
from flask_bcrypt import Bcrypt
import re
from flask_jwt_extended import create_access_token, create_refresh_token

bcrypt = Bcrypt()

class UserController:
    def __init__(self, users_collection):
        self.users_collection = users_collection

    def validate_email(self, email):
        """Validate email format."""
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(email_regex, email)

    def validate_password(self, password):
        """Validate password complexity."""
        return len(password) >= 8  # Extend for stronger password rules

    def hash_password(self, password):
        """Hash a password."""
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, hashed_password, password):
        """Check if a password matches the hashed password."""
        return bcrypt.check_password_hash(hashed_password, password)

    def create_tokens(self, identity):
        """Create access and refresh tokens."""
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)
        return access_token, refresh_token

    def register_user(self, name, email, password):
        """Register a new user."""
        if not self.validate_email(email):
            return {"error": "Invalid email format"}

        if not self.validate_password(password):
            return {"error": "Password must be at least 8 characters long"}

        # Check if the user already exists
        existing_user = self.users_collection.find_one({"email": email})
        if existing_user:
            return {"error": "User already exists"}

        hashed_password = self.hash_password(password)
        self.users_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashed_password
        })

        return {"message": "User registered successfully"}

    def login_user(self, email, password):
        """Authenticate user and return tokens."""
        user = self.users_collection.find_one({"email": email})
        if not user or not self.check_password(user["password"], password):
            return {"error": "Invalid credentials"}

        access_token, refresh_token = self.create_tokens(email)
        return {
            "message": "Login successful",
            "user": {"name": user["name"], "email": user["email"]},
            "access_token": access_token,
            "refresh_token": refresh_token
        }
=======
from flask_bcrypt import Bcrypt
import re
from flask_jwt_extended import create_access_token, create_refresh_token

bcrypt = Bcrypt()

class UserController:
    def __init__(self, users_collection):
        self.users_collection = users_collection

    def validate_email(self, email):
        """Validate email format."""
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(email_regex, email)

    def validate_password(self, password):
        """Validate password complexity."""
        return len(password) >= 8  # Extend for stronger password rules

    def hash_password(self, password):
        """Hash a password."""
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, hashed_password, password):
        """Check if a password matches the hashed password."""
        return bcrypt.check_password_hash(hashed_password, password)

    def create_tokens(self, identity):
        """Create access and refresh tokens."""
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)
        return access_token, refresh_token

    def register_user(self, name, email, password):
        """Register a new user."""
        if not self.validate_email(email):
            return {"error": "Invalid email format"}

        if not self.validate_password(password):
            return {"error": "Password must be at least 8 characters long"}

        # Check if the user already exists
        existing_user = self.users_collection.find_one({"email": email})
        if existing_user:
            return {"error": "User already exists"}

        hashed_password = self.hash_password(password)
        self.users_collection.insert_one({
            "name": name,
            "email": email,
            "password": hashed_password
        })

        return {"message": "User registered successfully"}

    def login_user(self, email, password):
        """Authenticate user and return tokens."""
        user = self.users_collection.find_one({"email": email})
        if not user or not self.check_password(user["password"], password):
            return {"error": "Invalid credentials"}

        access_token, refresh_token = self.create_tokens(email)
        return {
            "message": "Login successful",
            "user": {"name": user["name"], "email": user["email"]},
            "access_token": access_token,
            "refresh_token": refresh_token
        }
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
