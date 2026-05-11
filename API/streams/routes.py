from flask_restful import Resource
from flask import request,jsonify
from Extensions.extensions import db
from models.streamModel import StreamModel,StreamStatus
from models.userModel import UserModel
from mosquitto.publisher import publish_noti


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

            return({"success":True,"StreamKey":newStream.key,"streamURL":"rtmp://localhost/live"})
        except Exception as e:
            return({"success":False,"Message":f"Failed to create stream key due to {e}"})

class endStream(Resource):
    def post(self):
        try:

            streamKey=request.form.get("name")

            stream= StreamModel.query.filter_by(key=streamKey).first()

            if not stream:
              return({"Success":False,"message": f"Unable to locate valid stream for id {streamKey}"}),404
        
            stream.status =StreamStatus.INACTIVE
            db.session.commit()
            return({"Success":True,"message": f"Succesfully updated stream for ID {streamKey}"}),200
        except Exception as e:
          return({"Success":False,"message": f"Unable to update stream for ID {streamKey}"}),400


class getStreams(Resource):
    def get(self):
        pageNum=int(request.args.get("page_num",1))
        limit=int(request.args.get("limit",10))


        streams = StreamModel.query.filter_by(status=StreamStatus.ACTIVE)\
            .paginate(page=pageNum,per_page=limit,error_out=False)
        

        results =[{
            "streamTitle": stream.title,
            "streamKey": stream.key,
            "streamer": stream.streamer.userName,

        }
        for stream in streams
        ]

    
        return {
            "Success": True,
            "results": results,
            "totalRecords":streams.total,

        },200
class getStream(Resource):
    def get(self,streamKey):

        stream = StreamModel.query.filter_by(key=streamKey).first()

        if not stream:
            return {"success":False,"Message":f"Unable to lovate stream for key {streamKey}"},404

    # must change when deploying on live system
        streamUrl = f"/live/{stream.key}.m3u8"

        return {"Success":True,"Title":stream.title,"urlLiveVid":streamUrl,"streamer":stream.streamer.userName},200
    
class startStream(Resource):
   def post(self):
    
        try:

            streamKey=request.form.get("name")

            print(f"key is {streamKey}")
            stream= StreamModel.query.filter_by(key=streamKey).first()

            if not stream:
              return({"Success":False,"message": f"Unable to locate valid stream for id {streamKey}"}),404
        
            stream.status =StreamStatus.ACTIVE
            db.session.commit()
            publish_noti(f"{stream.streamer.userName} has started streaming {stream.title}")
            return({"Success":True,"message": f"Succesfully updated stream for ID {streamKey}"}),200
        

        
        except Exception as e:
          return({"Success":False,"message": f"Unable to update stream for ID {streamKey}; error {e}"}),400


def registerStreamRoutes(api):

    api.add_resource(createStreamKey,'/stream/create')
    api.add_resource(endStream,"/stream/end")
    api.add_resource(startStream,"/stream/start")
    api.add_resource(getStreams,"/stream/active")
    api.add_resource(getStream,"/stream/<string:streamKey>")
