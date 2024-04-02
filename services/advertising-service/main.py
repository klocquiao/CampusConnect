import os
import time
import requests

from flask import Flask, request, jsonify
from google.cloud import storage
from google.api_core.retry import Retry

app = Flask(__name__)

# Initialize Google Cloud Storage client
storage_client = storage.Client()

# Get user_service API url from env vars
USER_SERVICE_URL = os.getenv('USER_SERVICE_URL')

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
    project_id = os.environ.get('PROJECT_ID')
    if not project_id:
        raise ValueError('PROJECT_ID environment variable not found')
    return project_id

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
    
    # Get auth token from request parameters
    id_token = request.headers["Authorization"].split(" ").pop()

    if not id_token:
        return jsonify({'error': 'Authorization parameter is required'}), 400

    # Get file from request
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'File parameter is required'}), 400
    
    # Call user_service to confirm user is logged in
    auth_check = check_auth(id_token)

    if(not auth_check):
        return jsonify({'error': 'Invalid auth token'}), 400

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
    
    # Get auth token from request parameters
    id_token = request.headers["Authorization"].split(" ").pop()

    if not id_token:
        return jsonify({'error': 'Authorization parameter is required'}), 400
    
    # Get filename from request parameters
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'Filename parameter is required'}), 400
    
    # Call user_service to confirm user is logged in
    auth_check = check_auth(id_token)

    if(not auth_check):
        return jsonify({'error': 'Invalid auth token'}), 400

    # Download file from Google Cloud Storage
    bucket_name = f'{username}'
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)
    file_path = f'/tmp/{filename}'  # Save the file to /tmp directory
    blob.download_to_filename(file_path)

    return jsonify({'message': f'File {filename} downloaded from bucket {bucket_name}'}), 200

def check_auth(id_token):
    # check if user is logged in using user_service
    url = USER_SERVICE_URL + '/user-service/api/users/auth'
    headers = {
        'Authorization': id_token
    }
    
    response = requests.get(url, headers=headers, timeout=5)
    if response.status_code == 200:
        return True
    else:
        # User service is not accessible
        return False

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))