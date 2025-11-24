# Deployment Guide

This guide will help you deploy the LMS application to free hosting platforms.

## Backend Deployment (Railway/Render)

### Option 1: Railway (Recommended)

1. **Sign up** at [railway.app](https://railway.app)

2. **Create a new project** and connect your GitHub repository

3. **Add MySQL Database**:
   - Click "New" → "Database" → "MySQL"
   - Railway will provide connection details

4. **Configure Environment Variables**:
   ```
   SECRET_KEY=your-generated-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-app-name.railway.app
   DB_NAME=railway
   DB_USER=root
   DB_PASSWORD=(from Railway MySQL service)
   DB_HOST=(from Railway MySQL service)
   DB_PORT=3306
   ```

5. **Set Build Command**:
   ```
   cd lms_backend && pip install -r ../requirements.txt
   ```

6. **Set Start Command**:
   ```
   cd lms_backend && python manage.py migrate && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT
   ```

7. **Deploy** - Railway will automatically deploy on push

### Option 2: Render

1. **Sign up** at [render.com](https://render.com)

2. **Create a new Web Service** and connect your GitHub repository

3. **Configure**:
   - Build Command: `cd lms_backend && pip install -r ../requirements.txt`
   - Start Command: `cd lms_backend && python manage.py migrate && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT`

4. **Add MySQL Database**:
   - Create a new PostgreSQL or MySQL database
   - Copy connection details

5. **Set Environment Variables** (same as Railway)

6. **Deploy**

## Frontend Deployment (Vercel)

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import your GitHub repository**

3. **Configure Project**:
   - Framework Preset: React
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```

5. **Deploy** - Vercel will automatically deploy on push

## Post-Deployment Steps

### Backend

1. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

2. **Create categories**:
   ```bash
   python create_categories.py
   ```

3. **Create superuser** (optional):
   ```bash
   python manage.py createsuperuser
   ```

### Frontend

1. Update `REACT_APP_API_URL` in Vercel environment variables to point to your deployed backend

2. The frontend will automatically rebuild with the new API URL

## Testing Deployment

1. **Backend**: Visit `https://your-backend-url.railway.app/api/categories/` - should return categories
2. **Frontend**: Visit your Vercel URL - should load the application
3. **Test Registration**: Create a new account
4. **Test Login**: Login with credentials
5. **Test Course Creation**: (as lecturer) Create a course
6. **Test Enrollment**: (as student) Enroll in a course

## Troubleshooting

### Backend Issues

- **Database Connection**: Check environment variables match your database credentials
- **Static Files**: Ensure `whitenoise` is in requirements.txt and middleware is configured
- **CORS Errors**: Update `CORS_ALLOWED_ORIGINS` in settings.py with your frontend URL

### Frontend Issues

- **API Connection**: Verify `REACT_APP_API_URL` is set correctly
- **Build Errors**: Check Node.js version (should be 14+)
- **404 on Refresh**: Vercel handles this automatically with vercel.json

## Security Notes

- Never commit `.env` files
- Use strong `SECRET_KEY` in production
- Set `DEBUG=False` in production
- Configure `ALLOWED_HOSTS` properly
- Use HTTPS in production (both platforms provide this)

