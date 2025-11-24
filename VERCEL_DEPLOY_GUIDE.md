# Vercel Frontend Deployment Guide - Step by Step

## Prerequisites

✅ Your backend must be deployed on Railway first
✅ You need your Railway backend URL (e.g., `https://your-app.railway.app`)

## Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. You'll be redirected to your Vercel dashboard

## Step 2: Import Your Project

1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. You'll see a list of your GitHub repositories
4. Find and click on **"Lms"** repository
5. Click **"Import"**

## Step 3: Configure Project Settings

Vercel will auto-detect React, but verify these settings:

### Framework Preset
- Should be: **"React"** (auto-detected)

### Root Directory
1. Click **"Edit"** next to Root Directory
2. Change from `.` to `frontend`
3. Click **"Continue"**

### Build and Output Settings
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `build` (should be auto-filled)
- **Install Command**: `npm install` (should be auto-filled)

## Step 4: Add Environment Variable

**IMPORTANT**: You need your Railway backend URL for this step!

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or **"+ Add"**
3. Add this variable:

**Variable Name**: `REACT_APP_API_URL`

**Value**: `https://your-railway-app.railway.app/api`

**Replace** `your-railway-app` with your actual Railway app name!

Example:
```
REACT_APP_API_URL=https://lms-backend-production.railway.app/api
```

4. Make sure it's set for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"**

## Step 5: Deploy

1. Review all settings
2. Click **"Deploy"** button (bottom right)
3. Wait for deployment (usually 1-2 minutes)
4. Watch the build logs:
   - Installing dependencies
   - Building React app
   - Deploying to Vercel

## Step 6: Get Your Frontend URL

1. Once deployment completes, you'll see:
   - **Production URL**: `https://your-app.vercel.app`
   - This is your live frontend!

2. **Copy this URL** - your app is now live! 🎉

## Step 7: Test Your Deployment

1. Open your Vercel URL in a browser
2. You should see your LMS homepage
3. Try registering a new account
4. Try logging in
5. Test creating a course (as lecturer) or enrolling (as student)

## Step 8: Update Backend CORS (If Needed)

If you get CORS errors:

1. Go to Railway dashboard
2. Your backend service → Settings → Environment Variables
3. Add/Update:
   ```
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app.vercel.app
   ```
4. Set `CORS_ALLOW_ALL_ORIGINS` to `False`
5. Redeploy backend

## Automatic Deployments

Vercel automatically deploys when you:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment
- Open a Pull Request → Preview deployment

## Update API URL Later

If you change your backend URL:

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Edit `REACT_APP_API_URL`
5. Update the value
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click **"Redeploy"** on the latest deployment

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Common issues:
  - Missing dependencies: Check `package.json`
  - Wrong root directory: Should be `frontend`
  - Build errors: Check React code for syntax errors

### API Connection Error

- Verify `REACT_APP_API_URL` is set correctly
- Check that backend is running on Railway
- Make sure URL ends with `/api`
- Check browser console for CORS errors

### 404 on Page Refresh

- Vercel handles this automatically with `vercel.json`
- If issues persist, check `vercel.json` configuration

### Environment Variable Not Working

- Make sure variable name is exactly: `REACT_APP_API_URL`
- Must start with `REACT_APP_` for React to read it
- Redeploy after adding/changing variables

## Custom Domain (Optional)

1. Go to Project Settings → **Domains**
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 24 hours)

## Next Steps

✅ Your frontend is now live on Vercel!
✅ Your backend is on Railway!
✅ Test the full application flow

## Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Your Live App: Check Vercel dashboard for URL

---

**Your Frontend URL**: `https://your-app.vercel.app`
**Your Backend API**: `https://your-railway-app.railway.app/api`

