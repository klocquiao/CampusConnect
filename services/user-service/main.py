import base64
import datetime
import json
import os
import uuid

from flask import Flask, request

from google.cloud import datastore

app = Flask(__name__)
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
def user_create():
    user_name = request.json['user_name']
    password = request.json['password']
    
    posting = {
        'user_id': str(uuid.uuid4()),
        'user_name': user_name,
        'password': password
    }

    with ds_client.transaction():
        incomplete_key = ds_client.key('Posting')
        order_entity = datastore.Entity(key=incomplete_key)
        order_entity.update(posting)
        ds_client.put(order_entity)

    return posting, 200


@app.route('/api/users/<user_name>',methods=['GET'])
def user_name_get(user_name):

    query = ds_client.query(kind='Posting')
    query.add_filter('user_name', '=', user_name)
    results = list(query.fetch())

    return results, 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))