# Railway Deployment Guide for Lena's Place Website

This guide walks you through deploying your Lena's Place website to Railway using GitHub.

## Prerequisites

Before you start, make sure you have:
- A GitHub account (free at https://github.com)
- A Railway account (free at https://railway.app)
- Git installed on your computer (or use GitHub's web interface)

## Step 1: Create a GitHub Repository

### Option A: Using GitHub Web Interface (Easiest)

1. Go to https://github.com/new
2. Create a new repository:
   - **Repository name:** `lenas-place-website`
   - **Description:** "Lena's Place - AI Karaoke Venue Website"
   - **Visibility:** Public (recommended for easier setup)
   - **Initialize with:** Skip (we'll push existing code)
3. Click "Create repository"

### Option B: Using Command Line

If you prefer the command line, run these commands in your project directory:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lenas-place-website.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Push Your Code to GitHub

If you used Option A above, follow these steps:

1. Open Terminal/Command Prompt in your project directory
2. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lenas-place-website.git
git branch -M main
git push -u origin main
```

This will upload all your website files to GitHub.

## Step 3: Connect Railway to GitHub

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Click "Connect GitHub Account" and authorize Railway
5. Select your `lenas-place-website` repository
6. Click "Deploy"

## Step 4: Configure Environment Variables

Railway will automatically detect your project as a Node.js application. You need to set environment variables:

1. In Railway dashboard, go to your project
2. Click on the "Variables" tab
3. Add these environment variables:

**Required Variables:**
- `DATABASE_URL` - Your database connection string (Railway will provide this if you add a MySQL service)
- `JWT_SECRET` - A random string for session security (generate one: `openssl rand -base64 32`)
- `NODE_ENV` - Set to `production`

**OAuth Variables** (provided by Manus):
- `VITE_APP_ID` - Your Manus app ID
- `VITE_OAUTH_PORTAL_URL` - Manus OAuth portal URL
- `OAUTH_SERVER_URL` - Manus OAuth server URL
- `BUILT_IN_FORGE_API_URL` - Manus API URL
- `BUILT_IN_FORGE_API_KEY` - Manus API key

**App Configuration:**
- `VITE_APP_TITLE` - "Lena's Place"
- `OWNER_NAME` - Your name
- `OWNER_OPEN_ID` - Your Manus OpenID

## Step 5: Add a Database Service

1. In Railway dashboard, click "Add Service"
2. Select "MySQL"
3. Railway will automatically create a `DATABASE_URL` variable
4. Run migrations: `pnpm db:push` (do this locally first to test)

## Step 6: Deploy

Once environment variables are set:

1. Railway will automatically deploy your application
2. You'll see a live URL like: `https://lenas-place-website-production.up.railway.app`
3. Click the URL to view your live website

## Step 7: Set Up Custom Domain (Optional)

To use a custom domain like `lenasplace.com`:

1. In Railway dashboard, go to Settings
2. Click "Custom Domain"
3. Enter your domain name
4. Follow Railway's instructions to update your DNS settings

## Troubleshooting

### Build Fails
- Check the build logs in Railway dashboard
- Ensure all environment variables are set
- Make sure `package.json` scripts are correct

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check that MySQL service is running in Railway
- Run `pnpm db:push` to create tables

### Application Won't Start
- Check logs in Railway dashboard
- Ensure `NODE_ENV=production` is set
- Verify all required environment variables are present

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS settings are correct
- Clear browser cache

## Updating Your Website

After deployment, to make updates:

1. Make changes to your code locally
2. Commit and push to GitHub: `git push origin main`
3. Railway automatically redeploys your changes

## Support

- **Railway Documentation:** https://docs.railway.app
- **Railway Support:** https://railway.app/support
- **GitHub Documentation:** https://docs.github.com

## Next Steps

After deployment, consider:

1. **Add Payment Processing:** Integrate Stripe for membership payments
2. **Email Notifications:** Set up email service for newsletter and contact form submissions
3. **Analytics:** Add Google Analytics to track visitor behavior
4. **Admin Dashboard:** Create an admin panel to manage events and memberships
5. **Social Media Integration:** Add social media links and sharing buttons

---

**Your website is now ready for the world! 🚀**

For questions about Manus-specific configuration, contact support at https://help.manus.im
