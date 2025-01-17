from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta

def generate_tokens(email):
    access_token = create_access_token(identity=email, expires_delta=timedelta(minutes=15))
    refresh_token = create_refresh_token(identity=email)
    return access_token, refresh_token
