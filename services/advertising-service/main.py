import base64
import datetime
import json
import os
import uuid

from flask import Flask, request, jsonify
from google.cloud import storage

app = Flask(__name__)

# Initialize Google Cloud Storage client
storage_client = storage.Client()

def create_bucket_if_not_exists(bucket_name):
    """Creates a Google Cloud Storage bucket if it doesn't exist."""
    try:
        bucket = storage_client.get_bucket(bucket_name)
    except:
        bucket = storage_client.create_bucket(bucket_name)
    return bucket

@app.route('/upload', methods=['POST'])
def upload_photo():
    # Get username from request parameters
    username = request.args.get('username')

    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400

    # Get file from request
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'File parameter is required'}), 400

    # Upload file to Google Cloud Storage
    bucket_name = f'{username}'
    bucket = create_bucket_if_not_exists(bucket_name)
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file)

    return jsonify({'message': f'File {file.filename} uploaded to bucket {bucket_name}'}), 200

@app.route('/download', methods=['GET'])
def download_photo():
    # Get username from request parameters
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400

    # Get filename from request parameters
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'Filename parameter is required'}), 400

    # Download file from Google Cloud Storage
    bucket_name = f'{username}'
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)
    file_path = f'/tmp/{filename}'  # Save the file to /tmp directory
    blob.download_to_filename(file_path)

    return jsonify({'message': f'File {filename} downloaded from bucket {bucket_name}'}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))