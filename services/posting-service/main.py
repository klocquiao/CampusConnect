import base64
import datetime
import json
import os
import uuid

from flask import Flask, request

from google.cloud import datastore

app = Flask(__name__)
ds_client = datastore.Client()
