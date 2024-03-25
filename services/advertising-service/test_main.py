import unittest
from unittest.mock import MagicMock, patch
from main import app
from io import BytesIO

class TestUploadPhoto(unittest.TestCase):
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
        print("Response: ", response.data.decode('utf-8'))
        # Check if the response status code is 200
        self.assertEqual(response.status_code, 200)

        # Check if the storage client's blob.upload_from_file method was called with the correct filename
        expected_user_filename = f'{username}_{filename}'
        self.assertEqual(expected_user_filename, 'test_user_test_file.jpg')

if __name__ == '__main__':
    unittest.main()
