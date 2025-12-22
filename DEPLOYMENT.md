# ChessVerse Campus - Deployment Guide

This guide covers deploying ChessVerse Campus to Vercel, Netlify, and Render.

## Prerequisites

- Node.js 18+ installed
- Git repository pushed to GitHub/GitLab/Bitbucket
- Account on your chosen platform (Vercel/Netlify/Render)

## Platform-Specific Instructions

### 🔷 Vercel (Recommended)

**Option 1: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Option 2: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

**Environment Variables**: None required for basic deployment

**Custom Domain**:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

### 🟢 Netlify

**Option 1: Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

**Option 2: Netlify Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Build settings (auto-detected from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

**Configuration**: Uses `netlify.toml` (already included)

**Custom Domain**:
1. Site Settings → Domain management
2. Add custom domain
3. Configure DNS

---

### 🟣 Render

**Option 1: Using Dashboard**
1. Go to [render.com](https://render.com)
2. Click "New" → "Static Site"
3. Connect your Git repository
4. Configure (auto-detected from `render.yaml`):
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click "Create Static Site"

**Option 2: Using render.yaml**
- Configuration file `render.yaml` is already included
- Render will auto-detect and use these settings

**Custom Domain**:
1. Go to your site dashboard
2. Settings → Custom Domain
3. Add domain and configure DNS

---

## Build Verification

Before deploying, verify your build works locally:

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## Post-Deployment Checklist

### ✅ PWA Features
- [ ] Service worker loads correctly
- [ ] Manifest.json is accessible
- [ ] Install prompt appears on mobile
- [ ] App works offline

### ✅ Core Functionality
- [ ] All routes work (/, /learn, /about)
- [ ] Language switching works (EN/HI)
- [ ] Voice narration works
- [ ] Chess basics tutorial accessible
- [ ] Coding lessons load correctly
- [ ] Progress saves to localStorage

### ✅ Mobile Responsiveness
- [ ] Touch targets are 44px minimum
- [ ] Layouts adapt to mobile screens
- [ ] Safe area insets work on notched devices
- [ ] No horizontal scrolling

### ✅ Performance
- [ ] Lighthouse score 90+ (mobile)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Return 404
- **Vercel**: Check `vercel.json` rewrites
- **Netlify**: Check `netlify.toml` redirects  
- **Render**: Check `render.yaml` routes

### PWA Not Working
1. Check service worker registration in browser DevTools
2. Ensure manifest.json is served with correct MIME type
3. Verify HTTPS is enabled (required for PWA)

### Environment Variables
If you need environment variables in the future:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site settings → Build & deploy → Environment
- **Render**: Dashboard → Environment → Environment Variables

---

## Performance Optimization

### Enable Compression
All platforms automatically serve Brotli/Gzip compressed assets.

### Cache Headers
Configured in platform config files:
- Static assets: 1 year cache
- Service worker: No cache (must-revalidate)
- HTML: No cache

### CDN
All three platforms provide global CDN automatically.

---

## Monitoring

### Vercel
- Analytics: Built-in (free tier limited)
- Logs: Dashboard → Deployments → Function logs

### Netlify
- Analytics: Available as add-on
- Logs: Dashboard → Deploys → Deploy log

### Render
- Analytics: Dashboard → Metrics
- Logs: Dashboard → Logs

---

## Continuous Deployment

All platforms support automatic deployments:
- Push to `main` branch → Auto-deploy to production
- Push to `develop` branch → Auto-deploy to preview (optional)
- Pull requests → Preview deployments

### Configure Branches
- **Vercel**: Settings → Git → Production Branch
- **Netlify**: Site settings → Build & deploy → Deploy contexts
- **Render**: Settings → Auto-Deploy

---

## Rollback

### Vercel
Dashboard → Deployments → Click "..." → Promote to Production

### Netlify
Deploys → Click on previous deploy → Publish deploy

### Render
Dashboard → Deploys → Manual Deploy → Select previous commit

---

## Cost

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month, unlimited sites
- **Netlify**: 100GB bandwidth/month, 300 build minutes
- **Render**: 100GB bandwidth/month, static sites free

All three platforms are **FREE** for this static site in production use.

---

## Support

- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Render: [render.com/docs](https://render.com/docs)

---

## Recommended Platform

**For ChessVerse Campus**: **Vercel** is recommended because:
- Fastest global CDN
- Best Vite/React integration
- Excellent PWA support
- Free SSL certificates
- Automatic preview deployments
- Superior performance metrics

However, all three platforms will work perfectly!

---

**Happy Deployment! 🚀**
