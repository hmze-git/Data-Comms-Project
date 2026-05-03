from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from minio import Minio

db = SQLAlchemy()
#api = Api()

# setup way to interact with minio
minio_client=Minio(

    "minio:9000", # change this wehn docker ot it wont work 
    access_key="minioadmin", #username
    secret_key="minioadmin",#password
    secure=False # use http set to true for https
)