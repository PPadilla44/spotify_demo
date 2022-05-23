import requests
from flask_app import app
from flask import jsonify, redirect, render_template, request
import os
import requests

@app.route("/")
def index():
    scope = 'user-read-private user-read-email user-top-read'
    redirect_uri = 'http://localhost:5000/dashboard'
    url = f"https://accounts.spotify.com/authorize?response_type=code&client_id={os.environ.get('CLIENT_ID')}&scope={scope}&redirect_uri={redirect_uri}"
    return redirect(url)

@app.route("/dashboard")
def dashboard():

    return render_template("index.html")


@app.route("/api/keys")
def get_keys():
    keys = {
        "CLIENT_ID" : os.environ.get("CLIENT_ID"),
        "CLIENT_SECRET" : os.environ.get("CLIENT_SECRET")
    }
    return jsonify(keys)