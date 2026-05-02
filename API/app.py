#Imports
from flask import Flask
from Extensions.extensions import db
from flask_restful import Api

def create_app():
    app = Flask(__name__)

    Upload_Foulder='uploads'
    app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:Pass@localhost/DBDataComs'
    app.config['UPLOAD FOLDER']=Upload_Foulder
    db.init_app(app)
    api = Api(app)



    #blueprints
    from users.routes import registerRoutes
    from videos.routes import registerVideoRoutes
    registerRoutes(api)
    registerVideoRoutes(api)
    
    print("Routes registered")        # add this
    print(app.url_map)   
    return app


