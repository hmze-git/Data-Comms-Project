from flask_restful import Resource,current_app
from flask import request
from Extensions.extensions import db,minio_client
from models.userModel import UserModel
import datetime as dt
import bcrypt
import os

class UserCreate(Resource):
    def post(self):
        data = request.get_json()

        print("get")

        if UserModel.query.filter_by(userName=data['userName']).first():
            return {"success":False,"message": "User already exists"}, 400
            
        if UserModel.query.filter_by(email=data['email']).first():
            return {"success":False,"message": "Email already exists"}, 400

        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        new_user = UserModel(
            userName=data['userName'],
              password=hashed_password.decode('utf-8')
            , email=data['email']
              )
        db.session.add(new_user)
        db.session.commit()

        return {"success":True,"message": "User registered successfully"}, 200

class UserLogin(Resource):
    def post(self):
        data=request.get_json()

        if not data or len(data)<2:
            return {"message": "Inssuficient parameters passed"}
        
        user=UserModel.query.filter_by(email=data["email"]).first()

        print(user)
        if not user:
            return {"success":False,"message": "Invalid credentials"},404

        if bcrypt.checkpw(data["password"].encode("utf-8"),user.password.encode("utf-8")):

            userDet={
                "id":user.id,
                "username":user.userName,
                "email":user.email}

            return {"success":True,"message": "Login Succesful","userDetails":userDet},200
        
        else:
            return {"success":False,"message": "Invalid credentials"},404

        
       



def registerRoutes(api):
    api.add_resource(UserCreate,'/users/register')
    api.add_resource(UserLogin,'/users/login')
