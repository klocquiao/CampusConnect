import base64
import datetime
import json
import os
import uuid

from flask import Flask, request

from google.cloud import datastore
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
ds_client = datastore.Client()

def error500():
    resp = {
        'message': 'Internal error occured.'
    }
    return resp, 500


@app.route('/')
def index():
    return 'User service'



@app.route('/api/users/create', methods=['POST'])
@app.route('/user-service/api/users/create', methods=['POST'])

def user_create():
    user_name = request.json['user_name']
    password = request.json['password']
    
    user = {
        'user_id': str(uuid.uuid4()),
        'user_name': user_name,
        'password': password
    }

    with ds_client.transaction():
        incomplete_key = ds_client.key('User')
        order_entity = datastore.Entity(key=incomplete_key)
        order_entity.update(user)
        ds_client.put(order_entity)

    return user, 200


@app.route('/api/users/<user_name>',methods=['GET'])
@app.route('/user-service/api/users/<user_name>',methods=['GET'])
def user_name_get(user_name):

    query = ds_client.query(kind='User')
    query.add_filter('user_name', '=', user_name)
    results = list(query.fetch())

    return results[0], 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))