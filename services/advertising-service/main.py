import base64
import datetime
import json
import os
import uuid
import time
import requests

from flask import Flask, request, jsonify
from google.cloud import storage
from google.api_core.retry import Retry
from google.api_core.exceptions import RetryError

app = Flask(__name__)

# Initialize Google Cloud Storage client
storage_client = storage.Client()

def check_storage():
    try:
        response = requests.get('https://www.googleapis.com/storage/v1/b', timeout=5)
        if response.status_code == 200:
            return True, None
        else:
            return False, 'Google Cloud Storage service is not accessible'
    except Exception as e:
        return False, f'Error accessing Google Cloud Storage: {str(e)}'

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
    
def exponential_backoff_retry():
    """Exponential backoff retry mechanism."""
    initial_interval = 1  # Initial interval in seconds
    maximum_interval = 32  # Maximum interval in seconds
    multiplier = 2  # Multiplier for interval increase
    max_retries = 5  # Maximum number of retries
    total_elapsed_time = 40  # Total elapsed time in seconds
    deadline = time.time() + total_elapsed_time  # Deadline for retry

    return Retry(
        initial=initial_interval,
        maximum=maximum_interval,
        multiplier=multiplier,
        deadline=deadline,
        max_retries=max_retries
    )

def create_bucket_if_not_exists():
    """Creates a Google Cloud Storage bucket if it doesn't exist."""
    bucket_name = f'{get_project_id()}-bucket'
    try:
        bucket = storage_client.get_bucket(bucket_name, retry=exponential_backoff_retry())
    except Exception as e:
        print(f"Error retrieving bucket: {e}")
        return None

    if bucket is None:
        try:
            bucket = storage_client.create_bucket(bucket_name, retry=exponential_backoff_retry())
        except Exception as e:
            print(f"Error creating bucket: {e}")
            return None
    return bucket

def get_user_filename(username, filename):
    """Generate a unique file name for each user uploaded picture"""
    return f'{username}_{filename}'


# Health Check endpoint
# For use by Google Cloud Load Balancing
@app.route('/health', methods=['GET'])
def health_check():
    # Perform custom health checks
    is_healthy, message = check_storage()

    # TODO: Implement a list of health check functions to run
    # Allows us to sequentially call multiple health checks if needed

    # If all checks pass, return a healthy status
    if is_healthy:
        return jsonify({'status': 'OK'}), 200
    else:
        # If any checks fail, return an error status along with the reason
        return jsonify({'status': 'Error', 'message': message}), 500

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
    if bucket is None:
        return jsonify({'error' : 'Could not find project bucket'}), 404
    
    blob = bucket.blob(user_filename)
    
    blob.upload_from_file(file)

    return jsonify({'message': f'File {user_filename} uploaded to bucket: {get_project_id()}-bucket'}), 200

@app.route('/download', methods=['GET'])
def download_photo():
    # Get username from request parameters
    username = request.args.get('username')
    bucketUrl = request.bucket.get('bucket')
    if not bucketUrl:
        return jsonify({'error': 'Bucket URL parameter is required'}), 400
    if not username:
        return jsonify({'error': 'Username parameter is required'}), 400
    
    # Get filename from request parameters
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'Filename parameter is required'}), 400

    # Download file from Google Cloud Storage
    user_filename = get_user_filename(username, filename)

    bucket = create_bucket_if_not_exists()
    if bucket is None:
        return jsonify({'error' : 'Could not find project bucket'}), 404

    blob = bucket.blob(user_filename)
    if not blob.exists():
        return jsonify({'error': f'File: {user_filename} not found in project bucket: {bucket.name}'}), 404
    
    file_path = f'/tmp/{user_filename}'  # Save the file to /tmp directory
    blob.download_to_filename(file_path)

    return jsonify({'message': f'File {user_filename} downloaded from bucket {bucket.name}'}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))