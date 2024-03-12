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
    return 'Posting service'

@app.route('/api/posts/create', methods=['POST'])
def post_create():
    user_id = request.form['user_id']
    description = request.form['description']
    tags = request.form['tags']
    # type = request.form['type']
    price = request.form['price']

    posting = {
        'user_id': user_id,
        'order_id': str(uuid.uuid4()),
        'description': description,
        'tags':  tags,
        'price': price
    }

    with ds_client.transaction():
        incomplete_key = ds_client.key('Posting')
        order_entity = datastore.Entity(key=incomplete_key)
        order_entity.update(posting)
        ds_client.put(order_entity)

    return posting, 200

@app.route('/api/posts',methods=['GET'])
def post_get():
    query = ds_client.query(kind='Posting')

    tags = request.args.getlist('tags')

    if tags:
        query.add_filter('tags', 'IN', tags)

    results = list(query.fetch())
    return results, 200

@app.route('/api/posts/<user_id>',methods=['GET'])
def post_get(user_id):

    query = ds_client.query(kind='Posting')
    query.add_filter('user_id', '=', user_id)
    results = list(query.fetch())

    return results, 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))