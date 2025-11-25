# Deploy to Vercel - Step by Step Guide

## Prerequisites
- Node.js installed
- Vercel account (sign up at https://vercel.com)

## Method 1: Using Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find your repository: `santhu587/Lms`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     - **Key**: `REACT_APP_API_URL`
     - **Value**: `https://lms-pfi3.onrender.com/api`
     - Select all environments (Production, Preview, Development)
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - Your site will be live at: `https://your-project-name.vercel.app`

## Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for project settings:
     - Root directory: `./` (current directory)
     - Build command: `npm run build`
     - Output directory: `build`

5. **Set Environment Variables**
   ```bash
   vercel env add REACT_APP_API_URL
   ```
   - Enter value: `https://lms-pfi3.onrender.com/api`
   - Select all environments

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## After Deployment

1. **Get Your Live URL**
   - Vercel will provide a URL like: `https://your-project-name.vercel.app`
   - This URL is your live frontend

2. **Update Backend CORS (if needed)**
   - Make sure your Render backend has the Vercel URL in `CORS_ALLOWED_ORIGINS`
   - Example: `https://your-project-name.vercel.app`

3. **Test Your Deployment**
   - Visit your Vercel URL
   - Test login, registration, and course features
   - Check mobile responsiveness

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `REACT_APP_API_URL` is set correctly
- Check build logs in Vercel dashboard

### API Connection Issues
- Verify backend is running on Render
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` environment variable

### 404 Errors on Routes
- This is normal for React Router
- Vercel.json should handle this with rewrites
- If issues persist, check vercel.json configuration

## Quick Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Open deployment in browser
vercel open
```

