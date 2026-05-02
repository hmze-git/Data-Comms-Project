from Extensions.extensions  import db
import uuid


class VideoModel(db.Model):
    __tablename__='video'
    id=db.Column(db.String(50),primary_key=True,default=lambda: str(uuid.uuid4()))
    title=db.Column(db.String(255),nullable=False,unique=False)
    description=db.Column(db.Text,nullable=True)
    upload_date=db.Column(db.Date,nullable=False)
    Fpath=db.Column(db.String(500),nullable=False) # not the minio fpathj but key 
    bucket=db.Column(db.String(150),nullable=False)
    duration=db.Column(db.Integer,nullable=False)
    uploaded_by=db.Column(db.String(50),db.ForeignKey('user.id'),nullable=False)
    def __repr__(self):
        return f"videos('{self.id}','{self.title}','{self.description}','{self.Fpath}','{self.duration}')"