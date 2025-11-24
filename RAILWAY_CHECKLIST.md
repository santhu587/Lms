# Railway Deployment Checklist ✅

Follow this checklist step by step:

## Phase 1: Setup (5 minutes)

- [ ] Go to https://railway.app
- [ ] Sign up/Login with GitHub
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose "Lms" repository
- [ ] Click "Deploy Now"

## Phase 2: Database Setup (3 minutes)

- [ ] Click "+ New" button
- [ ] Select "Database" → "MySQL"
- [ ] Wait for database to provision
- [ ] Click on MySQL service
- [ ] Go to "Variables" tab
- [ ] **COPY these values** (you'll need them):
  - [ ] `MYSQLDATABASE` = _______________
  - [ ] `MYSQLUSER` = _______________
  - [ ] `MYSQLPASSWORD` = _______________
  - [ ] `MYSQLHOST` = _______________
  - [ ] `MYSQLPORT` = _______________

## Phase 3: Configure Backend Service (5 minutes)

- [ ] Go back to main project
- [ ] Click on your web service
- [ ] Go to "Settings" tab
- [ ] Set **Root Directory**: `lms_backend`
- [ ] Set **Build Command**: `pip install -r requirements.txt`
- [ ] Set **Start Command**: `python manage.py migrate && python create_categories.py && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT`

## Phase 4: Environment Variables (10 minutes)

- [ ] Still in Settings → Environment Variables
- [ ] Add each variable below:

### Generate Secret Key First:
Run this command in terminal:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
Copy the output - that's your SECRET_KEY

### Add Variables:

- [ ] **SECRET_KEY** = `[paste generated key]`
- [ ] **DEBUG** = `False`
- [ ] **ALLOWED_HOSTS** = `*`
- [ ] **DB_NAME** = `[from MYSQLDATABASE above]`
- [ ] **DB_USER** = `[from MYSQLUSER above]`
- [ ] **DB_PASSWORD** = `[from MYSQLPASSWORD above]`
- [ ] **DB_HOST** = `[from MYSQLHOST above]`
- [ ] **DB_PORT** = `3306`

## Phase 5: Connect Database (2 minutes)

- [ ] In Settings → Service Connections
- [ ] Click "Add Service Connection"
- [ ] Select your MySQL database
- [ ] Click "Add"

## Phase 6: Deploy (5 minutes)

- [ ] Go to "Deployments" tab
- [ ] Wait for deployment to complete
- [ ] Check logs for:
  - [ ] ✅ Dependencies installed
  - [ ] ✅ Migrations completed
  - [ ] ✅ Categories created
  - [ ] ✅ Server started

## Phase 7: Get Your URL (1 minute)

- [ ] Go to Settings → Domains
- [ ] Copy your Railway URL: `https://________________.railway.app`
- [ ] **Your API URL**: `https://________________.railway.app/api`

## Phase 8: Test (2 minutes)

- [ ] Open: `https://your-url.railway.app/api/categories/`
- [ ] Should see JSON response (even if empty array)
- [ ] If you see data → ✅ Backend is working!

## Phase 9: Update ALLOWED_HOSTS (Important!)

- [ ] Go to Settings → Environment Variables
- [ ] Find `ALLOWED_HOSTS`
- [ ] Update value to: `your-app-name.railway.app,*.railway.app`
- [ ] Save
- [ ] Redeploy

## ✅ Done!

Your backend is now live at: `https://________________.railway.app/api`

**Next Step**: Deploy frontend on Vercel (see VERCEL_DEPLOY_GUIDE.md)

---

## Quick Reference

**Your Backend URL**: _________________________________

**Your API Endpoint**: _________________________________/api

**Save these for Vercel deployment!**

