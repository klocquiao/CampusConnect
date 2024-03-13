import unittest
import os
import tempfile
from main import app

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_upload_photo(self):
        # Prepare a temporary file for upload
        _, temp_file_path = tempfile.mkstemp()
        with open(temp_file_path, 'w') as temp_file:
            temp_file.write('Test file content')

        # Make a request to upload the file
        with open(temp_file_path, 'rb') as temp_file:
            response = self.app.post('/upload?username=dummy_user', data={'file': (temp_file, 'test_file.txt')})

        # Assert response status code is 200
        self.assertEqual(response.status_code, 200)

        # Clean up temporary file
        os.remove(temp_file_path)


    def test_download_photo(self):
        # Make a request to download the file
        response = self.app.get('/download?username=dummy_user&filename=test_file.txt')

        # Assert response status code is 200
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
