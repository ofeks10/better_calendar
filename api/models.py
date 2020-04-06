from api import db

class Calendar(db.Model):
    hash = db.Column(db.Unicode(256), primary_key=True, index=True, unique=True)
    title = db.Column(db.Unicode(256))
    events = db.relationship('Event', backref='calendar', lazy='dynamic')

    def __repr__(self):
        return '<Calendar {}>'.format(self.hash)


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode(256))
    description = db.Column(db.Unicode(4096))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    calendar_hash = db.Column(db.Unicode(256), db.ForeignKey('calendar.hash'))
