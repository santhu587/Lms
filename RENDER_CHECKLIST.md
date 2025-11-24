# Render Deployment Checklist ✅

Follow this checklist step by step:

## Phase 1: Setup (5 minutes)

- [ ] Go to https://render.com
- [ ] Sign up/Login with GitHub
- [ ] Authorize Render to access GitHub
- [ ] You're now in Render dashboard

## Phase 2: Create PostgreSQL Database (5 minutes)

- [ ] Click "+ New" button
- [ ] Select "PostgreSQL"
- [ ] Configure:
  - [ ] Name: `lms-database`
  - [ ] Database: `lms`
  - [ ] User: `lms_user`
  - [ ] Region: (choose closest)
  - [ ] Plan: Free
- [ ] Click "Create Database"
- [ ] Wait for provisioning (2-3 minutes)

## Phase 3: Get Database Credentials (2 minutes)

- [ ] Click on PostgreSQL service
- [ ] Go to "Connections" tab
- [ ] **COPY Internal Database URL**: `postgresql://...`
- [ ] Save this URL - you'll need it!

## Phase 4: Create Web Service (3 minutes)

- [ ] Click "+ New" → "Web Service"
- [ ] Connect GitHub if needed
- [ ] Select "Lms" repository
- [ ] Click "Connect"

## Phase 5: Configure Web Service (5 minutes)

- [ ] **Name**: `lms-backend`
- [ ] **Region**: (choose closest)
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `lms_backend` ⚠️ IMPORTANT
- [ ] **Runtime**: `Python 3`
- [ ] **Build Command**: `pip install -r requirements.txt`
- [ ] **Start Command**: `python manage.py migrate && python create_categories.py && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT`

## Phase 6: Generate Secret Key (1 minute)

Run in terminal:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
- [ ] Copy the output
- [ ] This is your SECRET_KEY

## Phase 7: Add Environment Variables (5 minutes)

In "Environment Variables" section, add:

- [ ] **SECRET_KEY** = `[paste generated key]`
- [ ] **DEBUG** = `False`
- [ ] **ALLOWED_HOSTS** = `onrender.com` (update after deploy)
- [ ] **DATABASE_URL** = `[paste Internal Database URL from Step 3]`

## Phase 8: Link Database (2 minutes)

- [ ] Scroll to "Addons" section
- [ ] Click "Link Resource"
- [ ] Select your PostgreSQL database
- [ ] This auto-adds DATABASE_URL

## Phase 9: Deploy (5 minutes)

- [ ] Click "Create Web Service"
- [ ] Watch build logs:
  - [ ] ✅ Installing dependencies
  - [ ] ✅ Running migrations
  - [ ] ✅ Creating categories
  - [ ] ✅ Server started
- [ ] Wait for "Live" status

## Phase 10: Get Your URL (1 minute)

- [ ] Once deployed, copy your Render URL
- [ ] Format: `https://your-service-name.onrender.com`
- [ ] **Your API**: `https://your-service-name.onrender.com/api`

## Phase 11: Update ALLOWED_HOSTS (2 minutes)

- [ ] Go to Web Service → Environment tab
- [ ] Find `ALLOWED_HOSTS`
- [ ] Update to: `your-service-name.onrender.com`
- [ ] Save (auto-redeploys)

## Phase 12: Test (2 minutes)

- [ ] Open: `https://your-service-name.onrender.com/api/categories/`
- [ ] Should see JSON response
- [ ] If working → ✅ Success!

## ✅ Done!

Your backend is live at: `https://________________.onrender.com/api`

**Save this URL for Vercel frontend deployment!**

---

## Quick Reference

**Backend URL**: _________________________________

**API Endpoint**: _________________________________/api

**Database**: PostgreSQL (free tier)

**Note**: Free tier spins down after 15 min inactivity (first request takes 30-60 sec)

