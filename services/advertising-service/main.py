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

def get_project_id():
    """Retrieve the project ID from the metadata server."""
    metadata_server = "http://metadata.google.internal/computeMetadata/v1/project/project-id"
    metadata_flavor = {'Metadata-Flavor': 'Google'}

    try:
        response = request.get(metadata_server, headers=metadata_flavor)
        if response.status_code == 200:
            return response.text
        else:
            return None
    except Exception as e:
        print(f"Error retrieving project ID: {e}")
        return None

def create_bucket_if_not_exists():
    """Creates a Google Cloud Storage bucket if it doesn't exist."""
    bucket_name = f'{get_project_id()}-bucket'
    try:
        bucket = storage_client.get_bucket(bucket_name)
    except:
        bucket = storage_client.create_bucket(bucket_name)
    return bucket

def get_user_filename(username, filename):
    """Generate a unique file name for each user uploaded picture"""
    return f'{username}_{filename}'

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
    user_filename = get_user_filename(username, file.filename)
    bucket = create_bucket_if_not_exists()
    blob = bucket.blob(user_filename)
    
    blob.upload_from_file(file)

    return jsonify({'message': f'File {user_filename} uploaded to bucket: {get_project_id()}-bucket'}), 200

#TODO: Refactor download_photo() to use the project bucket + implement unit test
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
    user_filename = get_user_filename(username, filename)

    bucket = create_bucket_if_not_exists()

    blob = bucket.blob(user_filename)
    if not blob.exists():
        return jsonify({'error': f'File: {user_filename} not found in project bucket: {bucket.name}'}), 404
    
    file_path = f'/tmp/{user_filename}'  # Save the file to /tmp directory
    blob.download_to_filename(file_path)

    return jsonify({'message': f'File {user_filename} downloaded from bucket {bucket.name}'}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))