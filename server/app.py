from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.user_route import auth_bp
from routes.chats_routes import chat_bp
from routes.admin_route import admin_bp
from flask_jwt_extended import JWTManager
import os

load_dotenv()

PORT = os.getenv('PORT', 5000 )

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'hasdo8ewudHIUYJq9w2ieksqwdjqiw9973ywjsoqwdkwfguqwiedhainxqid')
jwt = JWTManager(app)


app.register_blueprint(auth_bp, url_prefix="/auth")

app.register_blueprint(chat_bp, url_prefix='/api')

app.register_blueprint(admin_bp, url_prefix='/admin')




if __name__ == '__main__':
    app.run(debug=True, port=int(PORT))
