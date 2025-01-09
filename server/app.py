from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os

# Import Blueprints
from routes.user_route import auth_bp
from routes.chats_routes import chat_bp
from routes.admin_route import admin_bp

# Load environment variables
load_dotenv()


class AppConfig:
    """
    A class to encapsulate Flask app configuration and initialization.
    """

    def __init__(self):
        """
        Initialize the Flask application and set configurations.
        """
        self.app = Flask(__name__)
        self.configure_app()
        self.register_extensions()
        self.register_blueprints()

    def configure_app(self):
        """
        Set application configurations such as secret keys and CORS.
        """
        self.app.config['JWT_SECRET_KEY'] = os.getenv(
            'JWT_SECRET_KEY'
        )
        self.port = int(os.getenv('PORT', 5000))
        CORS(self.app)

    def register_extensions(self):
        """
        Register extensions like JWT Manager.
        """
        self.jwt = JWTManager(self.app)

    def register_blueprints(self):
        """
        Register application routes/blueprints.
        """
        self.app.register_blueprint(auth_bp, url_prefix="/auth")
        self.app.register_blueprint(chat_bp, url_prefix='/api')
        self.app.register_blueprint(admin_bp, url_prefix='/admin')

    def run(self):
        """
        Run the Flask application.
        """
        self.app.run(debug=True, port=self.port)


if __name__ == '__main__':
    app_config = AppConfig()
    app_config.run()
