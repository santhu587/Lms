# LMS - Learning Management System

A modern, full-stack Learning Management System built with React and Django REST Framework.

## Features

- 🔐 **User Authentication**: JWT-based authentication for students and lecturers
- 📚 **Course Management**: Create, edit, and manage courses with rich content
- 🎯 **Learning Progress**: Track student progress through course content
- 🔍 **Search & Filters**: Advanced search with category and difficulty filters
- 📊 **Analytics**: Lecturers can view student progress and enrollment statistics
- 🎨 **Modern UI**: Beautiful, responsive design with consistent theming

## Tech Stack

### Frontend
- React 18
- React Router
- Context API for state management
- Modern CSS with theme system

### Backend
- Django 5.2
- Django REST Framework
- JWT Authentication
- MySQL Database

## Project Structure

```
Mylearn/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── context/       # Context providers
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── lms_backend/       # Django backend application
│   ├── accounts/      # User authentication app
│   ├── courses/       # Course management app
│   └── lms_backend/    # Django project settings
│
└── requirements.txt   # Python dependencies
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL database

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure database in `lms_backend/lms_backend/settings.py`

4. Run migrations:
```bash
cd lms_backend
python manage.py migrate
python create_categories.py  # Create default categories
python manage.py createsuperuser  # Create admin user
```

5. Start development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

### Backend Deployment (Railway/Render)

1. Set environment variables:
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-domain.com`
   - Database credentials

2. Run migrations on deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

## API Endpoints

- `/api/auth/register/` - User registration
- `/api/auth/login/` - User login
- `/api/courses/` - List/create courses
- `/api/categories/` - List categories
- `/api/courses/<id>/enroll/` - Enroll in course
- `/api/courses/<id>/contents/` - Course content
- `/api/progress/` - Student progress

## License

MIT License

## Author

Santhosh Chandra

