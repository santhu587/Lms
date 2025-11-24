# Railway Backend Deployment Guide - Step by Step

## Step 1: Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. You'll be redirected to your Railway dashboard

## Step 2: Create a New Project

1. Click the **"New Project"** button (usually a green button in the top right)
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your repositories
4. Find and select **"Lms"** repository
5. Click **"Deploy Now"**

Railway will start cloning your repository. This may take a minute.

## Step 3: Add MySQL Database

1. In your project dashboard, click **"+ New"** button
2. Select **"Database"** from the dropdown
3. Choose **"MySQL"**
4. Railway will automatically create a MySQL database
5. Wait for it to provision (usually 1-2 minutes)

## Step 4: Get Database Credentials

1. Click on the **MySQL service** you just created
2. Go to the **"Variables"** tab
3. You'll see these environment variables:
   - `MYSQLDATABASE` - Your database name
   - `MYSQLUSER` - Your database user
   - `MYSQLPASSWORD` - Your database password
   - `MYSQLHOST` - Your database host
   - `MYSQLPORT` - Your database port (usually 3306)

**Copy these values** - you'll need them in the next step!

## Step 5: Configure Your Backend Service

1. Go back to your main project view
2. Click on your **web service** (the one that says "Deploying" or your repo name)
3. Click on the **"Settings"** tab

### Configure Service Settings:

1. **Root Directory**: Set to `lms_backend`
   - Scroll down to "Root Directory"
   - Enter: `lms_backend`

2. **Build Command**: 
   - Scroll to "Build Command"
   - Enter: `pip install -r requirements.txt`

3. **Start Command**:
   - Scroll to "Start Command"
   - Enter: `python manage.py migrate && python create_categories.py && gunicorn lms_backend.wsgi:application --bind 0.0.0.0:$PORT`

## Step 6: Set Environment Variables

1. Still in the **Settings** tab, scroll to **"Environment Variables"**
2. Click **"New Variable"** for each of these:

### Required Environment Variables:

```
SECRET_KEY
```
**Value**: Generate a random secret key. You can use:
- Online generator: https://djecrety.ir/
- Or run in terminal: `python -c "import secrets; print(secrets.token_urlsafe(50))"`

```
DEBUG
```
**Value**: `False`

```
ALLOWED_HOSTS
```
**Value**: `*` (for now, Railway will assign a domain)

```
DB_NAME
```
**Value**: Copy from MySQL service `MYSQLDATABASE`

```
DB_USER
```
**Value**: Copy from MySQL service `MYSQLUSER`

```
DB_PASSWORD
```
**Value**: Copy from MySQL service `MYSQLPASSWORD`

```
DB_HOST
```
**Value**: Copy from MySQL service `MYSQLHOST`

```
DB_PORT
```
**Value**: `3306` (or copy from MySQL service `MYSQLPORT`)

### How to Add Each Variable:

1. Click **"+ New Variable"**
2. Enter the **Variable Name** (e.g., `SECRET_KEY`)
3. Enter the **Value**
4. Click **"Add"**
5. Repeat for all variables above

## Step 7: Link Database to Your Service

1. Go back to your project dashboard
2. Click on your **web service**
3. Go to **"Settings"** tab
4. Scroll to **"Service Connections"**
5. Click **"Add Service Connection"**
6. Select your **MySQL database** service
7. Click **"Add"**

This allows your backend to connect to the database.

## Step 8: Deploy

1. Railway should automatically start deploying
2. If not, go to the **"Deployments"** tab
3. Click **"Redeploy"** or wait for automatic deployment
4. Watch the build logs - you should see:
   - Installing dependencies
   - Running migrations
   - Creating categories
   - Starting Gunicorn server

## Step 9: Get Your Backend URL

1. Once deployment is complete, go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Railway will show your service URL (e.g., `https://your-app-name.railway.app`)
4. **Copy this URL** - you'll need it for the frontend!

Your backend API will be available at: `https://your-app-name.railway.app/api`

## Step 10: Test Your Backend

1. Open a new browser tab
2. Visit: `https://your-app-name.railway.app/api/categories/`
3. You should see a JSON response with categories (or an empty array if first time)
4. If you see data, your backend is working! ✅

## Step 11: Update ALLOWED_HOSTS (Important!)

1. Go back to Railway dashboard
2. Click on your web service → **Settings** → **Environment Variables**
3. Find `ALLOWED_HOSTS`
4. Update the value to include your Railway domain:
   ```
   your-app-name.railway.app,*.railway.app
   ```
5. Save and redeploy

## Troubleshooting

### Build Fails

- Check the **Deployments** tab → Click on failed deployment → View logs
- Common issues:
  - Missing dependencies: Check `requirements.txt`
  - Wrong root directory: Should be `lms_backend`
  - Database connection: Verify all DB environment variables

### Database Connection Error

- Verify all database environment variables are set correctly
- Make sure you added the database as a service connection
- Check that MySQL service is running (green status)

### 500 Internal Server Error

- Check deployment logs for errors
- Verify `SECRET_KEY` is set
- Make sure migrations ran successfully
- Check `DEBUG=False` is set

### Can't Access API

- Verify `ALLOWED_HOSTS` includes your Railway domain
- Check that the service is running (not paused)
- Make sure you're using `https://` not `http://`

## Next Steps

Once your backend is deployed and working:

1. **Copy your backend URL** (e.g., `https://your-app.railway.app`)
2. **Deploy frontend on Vercel** (see Vercel deployment guide)
3. **Set `REACT_APP_API_URL`** in Vercel to: `https://your-app.railway.app/api`

## Need Help?

- Railway Docs: https://docs.railway.app
- Check deployment logs in Railway dashboard
- Railway Discord: https://discord.gg/railway

---

**Your backend URL format**: `https://your-app-name.railway.app`
**Your API endpoint**: `https://your-app-name.railway.app/api`

