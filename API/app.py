#Imports
from flask import Flask
from Extensions.extensions import db
from flask_restful import Api

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:Pass@localhost/DBDataComs'

    db.init_app(app)
    api = Api(app)



    #blueprints
    from users.routes import registerRoutes
    registerRoutes(api)
    
    print("Routes registered")        # add this
    print(app.url_map)   
    return app


