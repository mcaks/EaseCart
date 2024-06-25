import cv2
import datetime
from flask import Flask, Response, jsonify, request, send_file, session
from flask_cors import CORS
from pymongo import MongoClient
import base64
from io import BytesIO
from PIL import Image
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

import os
import requests





app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)



client = MongoClient('mongodb+srv://admin:adminadmin@cluster0.4v8pcrv.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0')
db = client.easecart
users_collection = db.users 

# Users data
users = [
    {
        "name": "User1",
        "email": "user1@example.com",
        "password": generate_password_hash("password1", method='pbkdf2:sha256')
        ]
    },
    {
        "name": "User2",
        "email": "user2@example.com",
        "password": generate_password_hash("password2", method='pbkdf2:sha256')
        ]
    }
]

# Insert users into the database
users_collection.insert_many(users)

@app.route('/')
def home():
    return "Welcome to EaseCart API"



@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    if users_collection.find_one({'email': email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    new_user = {
        'name': name,
        'email': email,
        'password': hashed_password,
    }

    users_collection.insert_one(new_user)

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid email or password"}), 400

 
    user_data = {
        "message": "Login successful",
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"]
    }

    # Store user ID in session
    session['user_id'] = str(user["_id"])

    return jsonify(user_data), 200





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6969, debug=True)
