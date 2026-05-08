from Extensions.extensions  import db
import uuid
from enum import Enum

class StreamStatus(Enum):
    ACTIVE="active"
    INACTIVE="inactive"
class StreamModel (db.Model):
    __tablename__='stream'

    key=db.Column(db.String(50),primary_key=True,default=lambda: str(uuid.uuid4()))
    title=db.Column(db.String(300),nullable=False)
    status=db.Column(db.Enum(StreamStatus),default=StreamStatus.INACTIVE)
    createdBy=db.Column(db.String(50),db.ForeignKey('user.id'),nullable=False)
    def __repr__(self):
        return f"StreamModel('{self.id}','{self.title}','{self.key}','{self.status}','{self.createdBy})"
    