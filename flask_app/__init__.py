from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


# app.secret_key = "SECRET_KEY"

# DB = "DB_NAME"