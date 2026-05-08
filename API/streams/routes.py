from flask_restful import Resource
from flask import request
from Extensions.extensions import db
from models.streamModel import StreamModel,StreamStatus
from models.userModel import UserModel
import uuid


class createStreamKey(Resource):
    def post(self):
        try:
            data= request.get_json()

            userId=data["userId"]
            sTitle=data["title"]
            user =UserModel.query.filter_by(id=userId).first()

            if not user:
                return({"Success":False,"message": "Unable to locate valid user"}),404
        
        # rtmp://localhost/live config to not use local host later



            newStream = StreamModel(title=sTitle,createdBy=user.id)
            db.session.add(newStream)
            db.session.commit()

            return({"Success":True,"StreamKey":newStream.key})
        except Exception as e:
            return({"Success":False,"Message":f"Failed to create stream key due to {e}"})

class endStream(Resource):
    def post(self,streamKey):
        try:

  

            stream= StreamModel.query.filter_by(key=streamKey).first()

            if not stream:
              return({"Success":False,"message": f"Unable to locate valid stream for id {streamKey}"}),404
        
            stream.status =StreamStatus.INACTIVE
            db.session.commit()
            return({"Success":True,"message": f"Succesfully updated stream for ID {streamKey}"}),404
        except Exception as e:
          return({"Success":False,"message": f"Unable to update stream for ID {streamKey}"}),400


def registerStreamRoutes(api):

    api.add_resource(createStreamKey,'/stream/create')
    api.add_resource(endStream,"/stream/<string:streamKey>/end")
