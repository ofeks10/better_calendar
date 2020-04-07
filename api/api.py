import time
from hashlib import sha1
from datetime import datetime, timedelta, time

from flask import Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import Calendar, Event

def handle_calendar_post(calendar_title):
    # Validate the user input
    if len(calendar_title) >= 256 or len(calendar_title) < 4:
        return {'success': False, 'error_msg': 'API returned error'}

    calendar_hash = sha1(calendar_title + \
        str(int(time.time())).encode('utf-8') + \
        'my_s3cr3t_s4lt'.encode('utf-8')).hexdigest()

    c = Calendar(hash=calendar_hash, title=calendar_title)
    db.session.add(c)
    db.session.commit()

    print(calendar_hash)
    return {'success': True, 'hash': calendar_hash}


@app.route('/calendar', methods=['GET', 'POST'])
def calendar_handler():
    if request.method == 'POST':
        calendar_title = request.get_json()['calendar_title'].encode('utf-8')
        return handle_calendar_post(calendar_title)
    else: # GET method for getting a calendar
        calendar_hash = request.args.get('calendar_hash')
        c = Calendar.query.get({'hash': calendar_hash})
        if c is not None:
            return {'success': True, 'title': c.title}
        else:
            return {'success': False, 'error_msg': 'Calendar Not Found'}

@app.route('/events', methods=['GET', 'POST'])
def events_handler():
    if request.method == 'POST':
        pass
    else: # GET method for getting events
        calendar_hash = request.args.get('calendar_hash')
        selected_date = request.args.get('selected_date')

        c = Calendar.query.get({'hash': calendar_hash})
        requested_date = datetime.fromtimestamp(int(selected_date) / 1000.0)

        start_of_requested_date = datetime.combine(requested_date.date(), time())
        next_day_of_requested_date = start_of_requested_date + timedelta(days=1)

        events = Event.query.filter(Event.start_time.between(
            start_of_requested_date.date(),
            next_day_of_requested_date.date())).filter(
                Event.calendar_hash == c.hash).all()

        events_list = []
        for event in events:
            events_list.append({
                'title': event.title,
                'description': event.description,
                'start_time': event.start_time.timestamp()*1000, 
                'end_time': event.end_time.timestamp()*1000
            })

        print(events_list)
        print('-'*50)
        
        return {'success': True, 'events': events_list}
