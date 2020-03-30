import time
from hashlib import sha1

from flask import Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import Calendar

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
        calendar_hash = request.get_json()['calendar_hash'].encode('utf-8')
        c = Calendar.query.get({'hash': calendar_hash})
        return {'success': True, 'title': c.title}
