# Deploy Using Vercel CLI (Alternative Method)

If the Vercel dashboard is giving you issues, use the CLI instead:

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Login
```bash
vercel login
```
- This will open a browser window for authentication

## Step 3: Navigate to Frontend
```bash
cd frontend
```

## Step 4: Deploy
```bash
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **What's your project's name?** → `lms-frontend` (or any name)
- **In which directory is your code located?** → `./` (current directory)
- **Want to override the settings?** → Yes
- **Which settings?** → Select all
- **Build Command?** → `npm run build`
- **Output Directory?** → `build`
- **Development Command?** → `npm start` (or leave default)
- **Install Command?** → `npm install`

## Step 5: Set Environment Variable
```bash
vercel env add REACT_APP_API_URL
```
- Enter value: `https://lms-pfi3.onrender.com/api`
- Select environments: Production, Preview, Development (select all)

## Step 6: Deploy to Production
```bash
vercel --prod
```

## Your site will be live!
Vercel will give you a URL like: `https://lms-frontend.vercel.app`

