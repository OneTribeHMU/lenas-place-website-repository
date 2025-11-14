# Lena's Place Official Website

A modern, professional website for Lake City's premier AI karaoke venue. Built with Next.js, React, and Tailwind CSS.

## Features

✨ **Modern Design**
- Elegant red/black theme
- Fully responsive (mobile, tablet, desktop)
- Smooth navigation and animations

🎤 **Core Pages**
- **Home:** Hero section with venue showcase
- **Events:** Upcoming karaoke nights and special events
- **Membership:** Three membership tiers (Community, VIP, Elite)
- **Contact:** Contact form and venue information

📧 **Built-in Functionality**
- Newsletter signup with email collection
- Contact form for inquiries
- Event calendar integration
- Membership tier showcase
- User authentication system

🗄️ **Backend Ready**
- MySQL database for events, memberships, and submissions
- tRPC API for secure form handling
- User authentication with Manus OAuth
- Production-ready deployment configuration

---

## Quick Start: Deploy to Railway

**Get your website live in 5 minutes!**

👉 **[Follow QUICK-START-DEPLOYMENT.md](./QUICK-START-DEPLOYMENT.md)**

Or detailed guide: [RAILWAY-DEPLOYMENT-GUIDE.md](./RAILWAY-DEPLOYMENT-GUIDE.md)

---

## Local Development

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- MySQL database

### Setup

```bash
# Install dependencies
pnpm install

# Create environment variables
cp .env.example .env.local

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

Visit `http://localhost:3000` in your browser.

---

## Project Structure

```
lenas-place-website/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
│   └── public/            # Static assets
├── server/                # Backend (Express + tRPC)
│   ├── routers.ts         # API endpoints
│   ├── db.ts              # Database queries
│   └── _core/             # Framework utilities
├── drizzle/               # Database schema
│   └── schema.ts          # Table definitions
└── package.json           # Dependencies
```

---

## Technology Stack

- **Frontend:** React 19, Tailwind CSS 4, Vite
- **Backend:** Express 4, tRPC 11, Node.js
- **Database:** MySQL with Drizzle ORM
- **Authentication:** Manus OAuth
- **Deployment:** Railway
- **UI Components:** shadcn/ui, Radix UI

---

## Environment Variables

Required for production:

```
NODE_ENV=production
DATABASE_URL=mysql://user:password@host/database
JWT_SECRET=your-secret-key
VITE_APP_TITLE=Lena's Place
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
```

---

## Deployment

### Railway (Recommended)
1. Push to GitHub
2. Connect to Railway
3. Set environment variables
4. Deploy!

See [QUICK-START-DEPLOYMENT.md](./QUICK-START-DEPLOYMENT.md) for detailed steps.

### Other Platforms
- Vercel
- Netlify
- Heroku
- DigitalOcean

---

## Features Coming Soon

- 🛒 Stripe payment integration for memberships
- 📧 Email notifications for submissions
- 📊 Admin dashboard for event management
- 🎨 Image gallery for venue photos
- 💬 Live chat support
- 📱 Mobile app

---

## Support & Help

- **Deployment Issues:** Check [RAILWAY-DEPLOYMENT-GUIDE.md](./RAILWAY-DEPLOYMENT-GUIDE.md)
- **Code Questions:** Review the template documentation
- **Manus Support:** https://help.manus.im

---

## License

MIT License - Feel free to use and modify this project.

---

## Next Steps

1. ✅ Deploy to Railway (see QUICK-START-DEPLOYMENT.md)
2. 📝 Add your events to the database
3. 🎨 Customize colors and content
4. 💳 Add Stripe for payments
5. 📧 Set up email notifications

**Your website is ready to launch! 🚀**

---

**Built with ❤️ for Lena's Place**
