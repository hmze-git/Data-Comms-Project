from flask_restful import Resource
from flask import request
from Extensions.extensions import db
from models.userModel import UserModel
import bcrypt

class UserCreate(Resource):
    def post(self):
        data = request.get_json()

        print("get")

        if UserModel.query.filter_by(userName=data['userName']).first():
            return {"message": "User already exists"}, 400
            
        if UserModel.query.filter_by(email=data['email']).first():
            return {"message": "Email already exists"}, 400

        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        new_user = UserModel(
            userName=data['userName'],
              password=hashed_password.decode('utf-8')
            , email=data['email']
              )
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully"}, 200

class UserLogin(Resource):
    def post(self):
        data=request.get_json()

        if not data or len(data)<2:
            return {"message": "Inssuficient parameters passed"}
        
        user=UserModel.query.filter_by(email=data["email"]).first()

        if not user:
            return {"message": "Invalid credentials"},404

        if bcrypt.checkpw(data["password"].encode("utf-8"),user.password.encode("utf-8")):
            return {"message": "Login Succesful"},200
        
        else:
            return {"message": "Invalid credentials"},404

        
       
        
        
def registerRoutes(api):
    api.add_resource(UserCreate,'/users')
    api.add_resource(UserLogin,'/users/login')