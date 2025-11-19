import os
import sys
from pathlib import Path
import django
import traceback

# Ensure project root is on sys.path so Django settings can be imported
project_root = str(Path(__file__).resolve().parent.parent)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_management.settings')
django.setup()

from django.test import Client
from django.conf import settings

# Allow the test client host to avoid DisallowedHost errors
settings.ALLOWED_HOSTS = ['testserver', '127.0.0.1', 'localhost']

c = Client()
try:
    r = c.get('/api/products/items/')
    print('STATUS', r.status_code)
    # print a short preview of content
    content = r.content.decode(errors='replace')
    print('CONTENT_PREVIEW:\n', content[:2000])
except Exception:
    traceback.print_exc()
