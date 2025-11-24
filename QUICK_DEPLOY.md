# Quick Deployment Checklist

## ✅ Code Pushed to GitHub
Repository: https://github.com/santhu587/Lms.git

## 🚀 Deploy Backend (Railway - Free)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `Lms` repository
5. Add MySQL Database:
   - Click "New" → "Database" → "MySQL"
6. Configure Environment Variables:
   ```
   SECRET_KEY=generate-a-random-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=your-app-name.railway.app
   DB_NAME=(from Railway MySQL)
   DB_USER=(from Railway MySQL)
   DB_PASSWORD=(from Railway MySQL)
   DB_HOST=(from Railway MySQL)
   DB_PORT=3306
   ```
7. Set Root Directory: `lms_backend`
8. Set Build Command: `pip install -r requirements.txt`
9. Set Start Command: `python manage.py migrate && python create_categories.py && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT`
10. Deploy! Copy the backend URL (e.g., `https://your-app.railway.app`)

## 🎨 Deploy Frontend (Vercel - Free)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your `Lms` repository
5. Configure:
   - Framework Preset: **React**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
   (Replace with your actual Railway backend URL)
7. Deploy!

## 🔧 Update Frontend API URL

After backend is deployed, update Vercel environment variable:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `REACT_APP_API_URL` with your Railway backend URL
3. Redeploy

## ✅ Test Your Deployment

1. Visit your Vercel frontend URL
2. Register a new account
3. Login
4. Create a course (as lecturer) or enroll (as student)
5. Test search and filters

## 📝 Important Notes

- Backend URL format: `https://your-app.railway.app/api`
- Frontend will automatically rebuild when you update environment variables
- Both platforms provide free HTTPS
- Database migrations run automatically on Railway

## 🆘 Need Help?

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

