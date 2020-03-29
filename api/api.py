import time

from flask import Flask
from flask import request
from hashlib import sha1

app = Flask(__name__)

@app.route('/time')
def get_time():
    return {'time': time.time()}

@app.route('/create_calendar', methods=['POST'])
def calendar_handler():
    calendar_title = request.get_json()['calendar_title'].encode('utf-8')
    if len(calendar_title) >= 256 or len(calendar_title) < 4:
        return {'success': False, 'error_msg': 'API returned error'}
    calendar_hash = sha1(calendar_title + str(int(time.time())).encode('utf-8') + 'my_s3cr3t_s4lt'.encode('utf-8')).hexdigest()
    # TODO: create the actual DB calendar here
    print(calendar_hash)
    return {'success': True, 'hash': calendar_hash}