#!/usr/bin/env python
"""
Script to create default categories for courses
Run this after migrations: python manage.py shell < create_categories.py
Or run: python create_categories.py
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_backend.settings')
django.setup()

from courses.models import Category

# Default categories
default_categories = [
    {'name': 'Programming', 'description': 'Learn programming languages and software development', 'icon': '💻'},
    {'name': 'Web Development', 'description': 'Build websites and web applications', 'icon': '🌐'},
    {'name': 'Data Science', 'description': 'Analyze data and build machine learning models', 'icon': '📊'},
    {'name': 'Mobile Development', 'description': 'Create mobile apps for iOS and Android', 'icon': '📱'},
    {'name': 'Design', 'description': 'Learn UI/UX design and graphic design', 'icon': '🎨'},
    {'name': 'Business', 'description': 'Business skills, entrepreneurship, and management', 'icon': '💼'},
    {'name': 'Marketing', 'description': 'Digital marketing, SEO, and social media', 'icon': '📈'},
    {'name': 'Photography', 'description': 'Learn photography techniques and editing', 'icon': '📷'},
    {'name': 'Music', 'description': 'Music production, instruments, and theory', 'icon': '🎵'},
    {'name': 'Language', 'description': 'Learn new languages', 'icon': '🗣️'},
    {'name': 'Health & Fitness', 'description': 'Health, nutrition, and fitness courses', 'icon': '💪'},
    {'name': 'Personal Development', 'description': 'Self-improvement and personal growth', 'icon': '🌟'},
]

def create_categories():
    created_count = 0
    for cat_data in default_categories:
        category, created = Category.objects.get_or_create(
            name=cat_data['name'],
            defaults={
                'description': cat_data['description'],
                'icon': cat_data['icon']
            }
        )
        if created:
            created_count += 1
            print(f"Created category: {category.name}")
        else:
            print(f"Category already exists: {category.name}")
    
    print(f"\nTotal categories created: {created_count}")
    print(f"Total categories in database: {Category.objects.count()}")

if __name__ == '__main__':
    create_categories()

