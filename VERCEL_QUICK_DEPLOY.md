# Vercel Frontend Deployment - Quick Guide

## Your Backend URL
**Backend API**: `https://lms-pfi3.onrender.com/api`

## Step-by-Step Vercel Deployment

### Step 1: Sign Up for Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find and select **"Lms"** repository
3. Click **"Import"**

### Step 3: Configure Project Settings

**Framework Preset**: Should auto-detect as **"React"**

**Root Directory**: 
- Click **"Edit"** next to Root Directory
- Change to: `frontend`
- Click **"Continue"**

**Build and Output Settings** (should auto-fill):
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Step 4: Add Environment Variable (IMPORTANT!)

1. Scroll to **"Environment Variables"** section
2. Click **"Add"** or **"+ Add"**
3. Add this variable:

**Variable Name**: `REACT_APP_API_URL`

**Value**: `https://lms-pfi3.onrender.com/api`

4. Make sure it's enabled for:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

5. Click **"Save"**

### Step 5: Deploy

1. Review all settings
2. Click **"Deploy"** button
3. Wait 1-2 minutes for deployment
4. Watch build logs:
   - Installing dependencies
   - Building React app
   - Deploying to Vercel

### Step 6: Get Your Frontend URL

Once deployment completes:
- **Your Frontend URL**: `https://your-app-name.vercel.app`
- Copy this URL - your app is live! 🎉

### Step 7: Test Your Deployment

1. Open your Vercel URL
2. You should see your LMS homepage
3. Try registering a new account
4. Try logging in
5. Test the full application

## Quick Checklist

- [ ] Sign up at vercel.com with GitHub
- [ ] Import "Lms" repository
- [ ] Set Root Directory: `frontend`
- [ ] Verify Build Command: `npm run build`
- [ ] Verify Output Directory: `build`
- [ ] Add Environment Variable: `REACT_APP_API_URL` = `https://lms-pfi3.onrender.com/api`
- [ ] Deploy
- [ ] Test your live app!

## Your URLs

**Backend API**: `https://lms-pfi3.onrender.com/api`
**Frontend**: `https://your-app-name.vercel.app` (after deployment)

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Verify Root Directory is `frontend`
- Check Node.js version (should be 14+)

### API Connection Error
- Verify `REACT_APP_API_URL` is set correctly
- Check that backend is running on Render
- Make sure URL ends with `/api`

### 404 on Page Refresh
- Vercel handles this automatically with `vercel.json`
- Should work out of the box

---

**Ready to deploy? Follow the steps above!** 🚀

