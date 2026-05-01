from Extensions.extensions import db
import uuid



class UserModel(db.Model):
    __tablename__='user'
    id=db.Column(db.String(50),primary_key=True,default=lambda: str(uuid.uuid4()))
    userName=db.Column(db.String(150),nullable=False,unique=True)
    email=db.Column(db.String(50),nullable=False,unique=True)
    password=db.Column(db.String(500),nullable=False)


    videos= db.relationship('VideoModel',backref='uploader',lazy=True)
    def __repr__(self):
        return f"UserModel('{self.id}','{self.userName}','{self.email}','{self.password}')"
    
