"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#Endpoint for LOGIN
@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username == None or password == None:
        return jsonify({"msg": "Missing keys username or password"}), 401

    user = User.query.filter_by(username=username).first()
    if user == None:
        return jsonify({"msg": "User not found!"}), 401
    if user.password != password:
        return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=username)
    
    return jsonify({"token": access_token,
                    "user": user.serialize()}), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
