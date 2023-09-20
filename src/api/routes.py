"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.json
    if "email" not in data or "password" not in data:
        raise APIException("You need to specify an email and a password", status_code=400)

    email = data["email"]
    password = data["password"]

    if User.query.filter_by(email=email).first():
        raise APIException("User already exists", status_code=400)

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=email)
    user_id = user.id

    return jsonify(message="User created successfully", user_id=user_id, access_token=access_token, email=email), 201 


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.json

    if "email" not in data or "password" not in data:
        raise APIException("You need to specify an email and a password", status_code=400)

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()

    user_id = user.id

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        return jsonify({"user": user.serialize(), "token": access_token, "user_id": user_id}), 200
    else:
        raise APIException("Invalid email or password", status_code=401)
    
