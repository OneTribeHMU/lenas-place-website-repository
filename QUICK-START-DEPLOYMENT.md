# 🚀 Quick Start: Deploy to Railway in 5 Minutes

This is the **easiest way** to get your Lena's Place website live on Railway.

## What You Need

- A **GitHub account** (free at https://github.com)
- A **Railway account** (free at https://railway.app)
- That's it!

---

## Step 1: Create GitHub Repository (2 minutes)

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `lenas-place-website`
   - **Visibility:** Public
3. Click **"Create repository"**

---

## Step 2: Upload Your Code to GitHub (1 minute)

### Using GitHub Web Interface (Easiest)

1. Open your new GitHub repository
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop your entire `lenas-place-website` folder
4. Click **"Commit changes"**

### Using Command Line (If you prefer)

```bash
cd /path/to/lenas-place-website
git remote add origin https://github.com/YOUR_USERNAME/lenas-place-website.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 3: Deploy to Railway (2 minutes)

1. Go to https://railway.app
2. Sign in (create account if needed)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Click **"Connect GitHub Account"** and authorize
6. Select your **`lenas-place-website`** repository
7. Click **"Deploy"**

✅ **Your website is now deploying!**

---

## Step 4: Configure Environment Variables (1 minute)

Once Railway starts building:

1. Go to your Railway project dashboard
2. Click the **"Variables"** tab
3. Add these variables:

```
NODE_ENV = production
JWT_SECRET = (generate random: openssl rand -base64 32)
VITE_APP_TITLE = Lena's Place
```

4. Click **"Save"**

Railway will automatically handle the rest!

---

## Step 5: Get Your Live URL

1. Wait for the build to complete (you'll see a checkmark)
2. Click on your service in Railway
3. Copy the **"Public URL"** at the top
4. Open it in your browser

🎉 **Your website is LIVE!**

---

## That's It!

Your Lena's Place website is now live on the internet. Share the URL with everyone!

### What's Next?

- **Add a Custom Domain:** Go to Railway Settings → Custom Domain
- **Update Content:** Make changes locally, push to GitHub, Railway auto-deploys
- **Add Events:** Once live, add events to your database
- **Setup Payments:** Add Stripe for memberships and tickets

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Railway logs, ensure all files uploaded |
| Website won't load | Wait 2-3 minutes for build to complete |
| Need to update code | Edit locally, commit to GitHub, Railway redeploys automatically |
| Want custom domain | Railway Settings → Custom Domain (add your domain) |

---

## Support

- **Railway Help:** https://railway.app/support
- **GitHub Help:** https://docs.github.com
- **Your Website:** Check the logs in Railway dashboard

---

**You're all set! Your Lena's Place website is now live! 🎤🎉**
