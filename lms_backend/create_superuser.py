#!/usr/bin/env python
"""Script to create a Django superuser non-interactively"""
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

from accounts.models import User

def create_superuser():
    username = 'admin'
    email = 'admin@lms.com'
    password = 'admin123'
    role = 'lecturer'  # Admin can be a lecturer
    
    if User.objects.filter(username=username).exists():
        print(f'Superuser "{username}" already exists!')
        return
    
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
        role=role
    )
    print(f'Superuser created successfully!')
    print(f'Username: {username}')
    print(f'Password: {password}')
    print(f'Email: {email}')

if __name__ == '__main__':
    create_superuser()



