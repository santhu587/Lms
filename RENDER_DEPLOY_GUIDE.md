# Render Deployment Guide - Django + PostgreSQL Backend

## Step-by-Step Deployment Instructions

### Step 1: Sign Up for Render

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Choose **"Sign up with GitHub"**
4. Authorize Render to access your GitHub account
5. You'll be redirected to your Render dashboard

### Step 2: Create PostgreSQL Database

1. In your Render dashboard, click **"New +"** button (top right)
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `lms-database` (or any name you prefer)
   - **Database**: `lms`
   - **User**: `lms_user` (or any name)
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15 (or latest available)
   - **Plan**: Free (for testing) or Paid (for production)
4. Click **"Create Database"**
5. Wait 2-3 minutes for provisioning

### Step 3: Get Database Credentials

1. Click on your PostgreSQL database service
2. Go to the **"Connections"** tab
3. You'll see:
   - **Internal Database URL** - Copy this entire URL
   - Individual connection details (Host, Port, Database, User, Password)

**Important**: Copy the **Internal Database URL** - you'll use this as `DATABASE_URL`

### Step 4: Create Web Service

1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. If not connected, click **"Connect GitHub"** and authorize
4. Find and select your **"Lms"** repository
5. Click **"Connect"**

### Step 5: Configure Web Service

Fill in these settings:

**Name**: `lms-backend` (or any name)

**Region**: Choose closest to you

**Branch**: `main`

**Root Directory**: `lms_backend`

**Runtime**: `Python 3`

**Build Command**:
```bash
pip install -r requirements.txt
```

**Start Command**:
```bash
python manage.py migrate && python create_categories.py && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT
```

### Step 6: Add Environment Variables

Before clicking "Create Web Service", scroll to **"Environment Variables"** section.

**Generate SECRET_KEY first**:
Run in terminal:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
Copy the output.

**Add these environment variables**:

| Variable Name | Value |
|--------------|-------|
| `SECRET_KEY` | [paste generated key from above] |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `onrender.com` (will update after first deploy) |
| `DATABASE_URL` | [paste Internal Database URL from PostgreSQL service] |

**OR** if you prefer individual DB variables:

| Variable Name | Value |
|--------------|-------|
| `DB_ENGINE` | `postgresql` |
| `DB_NAME` | [from PostgreSQL] |
| `DB_USER` | [from PostgreSQL] |
| `DB_PASSWORD` | [from PostgreSQL] |
| `DB_HOST` | [from PostgreSQL] |
| `DB_PORT` | `5432` |

### Step 7: Link Database (Optional but Recommended)

1. In the Web Service configuration
2. Scroll to **"Addons"** section
3. Click **"Link Resource"**
4. Select your PostgreSQL database
5. This automatically adds `DATABASE_URL` environment variable

### Step 8: Deploy

1. Review all settings
2. Click **"Create Web Service"**
3. Render will start building and deploying
4. Watch the build logs:
   - ✅ Installing dependencies
   - ✅ Running migrations
   - ✅ Creating categories
   - ✅ Starting Gunicorn server
5. Wait 3-5 minutes for first deployment

### Step 9: Get Your Backend URL

1. Once deployment completes, Render shows your service URL
2. Format: `https://your-service-name.onrender.com`
3. **Copy this URL**
4. Your API endpoint: `https://your-service-name.onrender.com/api`

### Step 10: Update ALLOWED_HOSTS

1. Go to your Web Service → **Environment** tab
2. Find `ALLOWED_HOSTS`
3. Click to edit
4. Update value to: `your-service-name.onrender.com`
5. Click **"Save Changes"**
6. Render will auto-redeploy

### Step 11: Test Your Backend

1. Open browser: `https://your-service-name.onrender.com/api/categories/`
2. You should see JSON response (even if empty array `[]`)
3. If you see data → ✅ Backend is working!

## Important Notes

### Free Tier Limitations

- **Spins down after 15 minutes** of inactivity
- **First request** after spin-down takes 30-60 seconds (cold start)
- **Upgrade to paid plan** for always-on service

### Database

- PostgreSQL is **free** on Render
- MySQL requires external service or paid add-on
- Database persists data even when web service spins down

### Auto-Deploy

- Render **automatically deploys** on git push to `main` branch
- You can disable auto-deploy in settings
- Manual redeploy available in dashboard

### Static Files

- WhiteNoise is configured for static files
- Works automatically with Render

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Verify `requirements.txt` has all dependencies
- Check Root Directory is set to `lms_backend`

### Database Connection Error

- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL service is running
- Ensure database is linked to web service

### 500 Internal Server Error

- Check deployment logs
- Verify `SECRET_KEY` is set
- Ensure migrations completed successfully
- Check `DEBUG=False` is set

### Slow First Request

- Normal on free tier (service spinning up)
- Takes 30-60 seconds after 15 minutes of inactivity
- Upgrade to paid plan for always-on

### Can't Access API

- Verify `ALLOWED_HOSTS` includes your Render domain
- Check service is running (not paused)
- Ensure you're using `https://` not `http://`

## Quick Checklist

- [ ] Sign up at render.com with GitHub
- [ ] Create PostgreSQL database
- [ ] Copy Internal Database URL
- [ ] Create Web Service
- [ ] Set Root Directory: `lms_backend`
- [ ] Set Build Command: `pip install -r requirements.txt`
- [ ] Set Start Command: `python manage.py migrate && python create_categories.py && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT`
- [ ] Add environment variables (SECRET_KEY, DEBUG, ALLOWED_HOSTS, DATABASE_URL)
- [ ] Link PostgreSQL database
- [ ] Deploy and wait
- [ ] Get your Render URL
- [ ] Test API endpoint
- [ ] Update ALLOWED_HOSTS with your Render URL

## Environment Variables Summary

```
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=your-service-name.onrender.com
DATABASE_URL=postgresql://user:password@host:port/database
```

## Next Steps

✅ Your backend is now live at: `https://your-service-name.onrender.com/api`

**Next**: Deploy frontend on Vercel (see VERCEL_DEPLOY_GUIDE.md)

---

**Your Backend URL**: `https://________________.onrender.com`
**Your API Endpoint**: `https://________________.onrender.com/api`

