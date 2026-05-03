from flask_restful import Resource,current_app
from flask import request
from Extensions.extensions import db,minio_client
from models.videoModel import VideoModel
from models.userModel import UserModel
import datetime as dt
import bcrypt
import os

from worker.tasks import tanscode_video


class postVideoUser(Resource):
    def post(self):
        #expect userId,title,description
        #data=request.get_json()

       # if not data or len(data)<3:
        # return {"message": "Inssuficient parameters passed"},404

    

        if 'file' not in request.files:
            return {"message": "No file attached"},400
        now=dt.datetime.now()
        print("Time now",now)

  


        file = request.files.get("file")
        userId = request.form.get("userId")
        vidTit = request.form.get("title")
        vidDes= request.form.get("description")

        user =UserModel.query.filter_by(id=userId).first()
        if not user:
            return {"message": "Invalid UserId try again later"},404
        
  
        objKey=f"users/{userId}/raw/{file.filename}"
        #file.stream.seek(0)
       # file.stream.seek(0)
       # content= file.stream.read()
       # print("size " ,len(content))
        
        minio_client.put_object(
            bucket_name="videos",
            object_name=objKey,
            data=file.stream,
            length=-1,
            part_size=10*1024*1024,
            content_type=file.mimetype
            )
        
 
        # store in db
        new_Video= VideoModel(
            title=vidTit,
            description=vidDes,
            upload_date=now,
            Fpath=objKey,
            bucket="videos",
            duration=240, # placeholder put the real thing when doing ffmpeg
            uploaded_by=userId
        )
        db.session.add(new_Video)
        db.session.commit()

        print("Video db rec made ")

        tanscode_video.delay(objKey,new_Video.id,userId)


        return {"message": "Succesful upload"},200
        
        #  upload_date=db.Column(db.Date,nullable=False)
  #  Fpath=db.Column(db.String(500),nullable=False) # not the minio fpathj but key 
   # bucket=db.Column(db.String(150),nullable=False,unique=True)
   # duration=db.Column(db.Integer,nullable=False)
  #  uploaded_by=db.Column(db.String(50),db.ForeignKey('user.id'),nullable=False)

def registerVideoRoutes(api):

    api.add_resource(postVideoUser,'/post/video')