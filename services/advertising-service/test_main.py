import unittest
from unittest.mock import MagicMock, patch
from main import app
from io import BytesIO

class TestGeneralSuccess(unittest.TestCase):
    def setUp(self):
        # Create a Flask test client
        self.app = app.test_client()

        # Mock any external dependencies (optional)
        self.mock_storage_client = MagicMock()
        patch('main.storage_client', self.mock_storage_client).start()

    def tearDown(self):
        # Stop any patches (if used)
        patch.stopall()

    @patch('main.get_project_id')
    def test_upload_photo_success(self, mock_get_project_id):
        mock_project_id = 'mock-project-id'
        mock_get_project_id.return_value = mock_project_id
        # Prepare mock request parameters
        username = 'test_user'
        filename = 'test_file.jpg'
        file_content = b''
        data = {
            'username': username,
            'file': (BytesIO(file_content), filename)  # Simulate file contents
        }

        # Send POST request to /upload endpoint
        response = self.app.post('/upload?username=' + username, data=data, content_type='multipart/form-data')
        expected_response = f'{username}_{filename} uploaded to bucket: {mock_project_id}'
        self.assertIn(expected_response, response.json['message'])
        # Check if the response status code is 200
        self.assertEqual(response.status_code, 200)

        # Check if the storage client's blob.upload_from_file method was called with the correct filename
        expected_user_filename = f'{username}_{filename}'
        self.assertEqual(expected_user_filename, 'test_user_test_file.jpg')
    
    @patch('main.get_project_id')
    @patch('main.storage_client.get_bucket')
    def test_download_photo_success(self, mock_get_bucket, mock_get_project_id):
        mock_project_id = 'mock-project-id'
        mock_get_project_id.return_value = mock_project_id
        mock_bucket = MagicMock()
        mock_bucket.name = mock_project_id
        mock_get_bucket.return_value = mock_bucket
        mock_get_bucket.name.return_value = mock_get_project_id

        mock_blob = MagicMock()
        mock_blob.exists.return_value = True
        mock_bucket.blob.return_value = mock_blob


        username = 'test_user'
        filename = 'test_file.jpg'
        url = f'/download?username={username}&filename={filename}'

        # Send GET request to /download endpoint
        response = self.app.get(url)

         # Check if the response status code is 200
        self.assertEqual(response.status_code, 200)

        # Check if the expected message is in the response JSON
        expected_message = f'File {username}_{filename} downloaded from bucket {mock_project_id}'
        self.assertIn(expected_message, response.json['message'])

    @patch('main.check_storage')
    def test_health_check_failure(self, mock_check_storage):
        # Mock the check_storage function to return False with an error message
        mock_check_storage.return_value = (False, 'Google Cloud Storage service is not accessible')

        # Send GET request to /health endpoint
        response = self.app.get('/health')

        # Check if the response status code is 500
        self.assertEqual(response.status_code, 500)

        # Check if the error message is in the response JSON
        self.assertEqual(response.json['status'], 'Error')
        self.assertEqual(response.json['message'], 'Google Cloud Storage service is not accessible')

class TestUnsuccessfulOperations(unittest.TestCase):
    def setUp(self):
        # Create a Flask test client
        self.app = app.test_client()

        # Mock any external dependencies (optional)
        self.mock_storage_client = MagicMock()
        patch('main.storage_client', self.mock_storage_client).start()

    def tearDown(self):
        # Stop any patches (if used)
        patch.stopall()

    # Test for no username
    @patch('main.get_project_id')
    def test_upload_photo_no_username(self, mock_get_project_id):
        mock_project_id = 'mock-project-id'
        mock_get_project_id.return_value = mock_project_id
        # Prepare mock request parameters
        filename = 'test_file.jpg'
        file_content = b''
        data = {
            'file': (BytesIO(file_content), filename)  # Simulate file contents
        }

        # Send POST request to /upload endpoint
        response = self.app.post('/upload?username=', data=data, content_type='multipart/form-data')
        expected_response = 'Username parameter is required'
        self.assertIn(expected_response, response.json['error'])
        # Check if the response status code is 200
        self.assertEqual(response.status_code, 400)
    
    def test_download_photo_no_username(self):
        filename = 'test_file.jpg'
        url = f'/download?username=&filename={filename}'
        response = self.app.get(url)

        self.assertEqual(response.status_code, 400)

        expected_response = 'Username parameter is required'
        self.assertIn(expected_response, response.json['error'])
    
    # Test for no file
        
    # Test for bad bucket



if __name__ == '__main__':
    unittest.main()
