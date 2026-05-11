#Imports
from flask import Flask
from Extensions.extensions import db
from flask_restful import Api
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    CORS(app,origins=["http://localhost:5173"])
    Upload_Foulder='uploads'
    app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:Pass@db:3306/dbdatacoms'
    app.config['UPLOAD FOLDER']=Upload_Foulder
    db.init_app(app)
    api = Api(app)



    #blueprints
    from users.routes import registerRoutes
    from videos.routes import registerVideoRoutes
    from streams.routes import registerStreamRoutes
    registerRoutes(api)
    registerVideoRoutes(api)
    registerStreamRoutes(api)
    
    print("Routes registered")        # add this
    print(app.url_map)   
    return app


