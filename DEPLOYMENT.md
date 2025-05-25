# 🚀 Deployment Guide for WeframeTech Hiring Task

## Prerequisites
- GitHub account
- Vercel account (free)
- Supabase account (free)

## Step 1: Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and project name
   - Set database password
   - Select region closest to your users

2. **Get Database URL**
   - Go to Project Settings → Database
   - Copy the connection string under "Connection pooling"
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres`

## Step 2: Repository Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - WeframeTech hiring task"
   git branch -M main
   git remote add origin https://github.com/yourusername/weframetech-hiring-task.git
   git push -u origin main
   ```

## Step 3: Vercel Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repo: `weframetech-hiring-task`

2. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   
   ```env
   PAYLOAD_SECRET=your-super-secure-random-string-here
   DATABASE_URI=postgresql://postgres:your-password@your-host:5432/postgres
   NODE_ENV=production
   ```

   **Important:** 
   - Generate a secure random string for `PAYLOAD_SECRET` (at least 32 characters)
   - Use your actual Supabase connection string for `DATABASE_URI`

3. **Deploy Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: Leave empty (default)
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (3-5 minutes)

## Step 4: Post-Deployment Setup

1. **Access Your Deployed App**
   - Your app will be available at: `https://your-project-name.vercel.app`
   - Admin panel: `https://your-project-name.vercel.app/admin`

2. **Create First Admin User**
   - Visit the admin panel URL
   - You'll be prompted to create the first user
   - Use email: `admin@weframetech.com`
   - Use password: `admin123` (or create your own)

3. **Optional: Run Seed Data**
   If you want sample data:
   ```bash
   # Clone your repo locally
   git clone https://github.com/yourusername/weframetech-hiring-task.git
   cd weframetech-hiring-task
   
   # Install dependencies
   npm install
   
   # Set up local environment
   cp .env.example .env
   # Edit .env with your production database URL
   
   # Run seed script
   npm run seed
   ```

## Step 5: Verification

### Test These URLs:
- ✅ Homepage: `https://your-app.vercel.app`
- ✅ Admin Panel: `https://your-app.vercel.app/admin`
- ✅ Demo Page: `https://your-app.vercel.app/demo`
- ✅ Contact Form: `https://your-app.vercel.app/contact`
- ✅ API Endpoint: `https://your-app.vercel.app/api/forms`

### Test Admin Features:
1. **Login to Admin Panel**
   - Use the credentials you created
   
2. **Create a Tenant**
   - Go to Collections → Tenants
   - Click "Create New"
   - Fill in tenant details

3. **Create a Form**
   - Go to Collections → Forms
   - Click "Create New"
   - Add form fields and configuration

4. **Test Form Submission**
   - Use the contact form or API endpoint
   - Check Form Submissions collection for data

## Step 6: Custom Domain (Optional)

1. **Add Custom Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain
   - Configure DNS records as instructed

2. **Update Environment Variables**
   - No changes needed - the app will work with any domain

## Troubleshooting

### Build Failures
- Check environment variables are set correctly
- Ensure DATABASE_URI is properly formatted
- Verify Supabase database is accessible

### Runtime Errors
- Check Vercel function logs
- Verify database connectivity
- Ensure all required environment variables are set

### Admin Panel Issues
- Clear browser cache
- Check if admin user was created properly
- Verify database tables were created

## Environment Variables Reference

```env
# Required
PAYLOAD_SECRET=your-super-secure-random-string-minimum-32-chars
DATABASE_URI=postgresql://postgres:password@host:5432/postgres

# Optional
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Final Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] Environment variables configured
- [ ] Admin panel accessible
- [ ] First admin user created
- [ ] Forms collection working
- [ ] API endpoints responding
- [ ] Contact form functional
- [ ] Multi-tenant access control working

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Vercel function logs
3. Verify Supabase connection
4. Test locally first
5. Check browser console for errors

## Success Criteria

Your deployment is successful when:
- ✅ Admin panel loads at `/admin`
- ✅ You can create and manage forms
- ✅ Form submissions are stored in the database
- ✅ Multi-tenant access control is working
- ✅ API endpoints return expected data
- ✅ Contact form accepts and processes submissions

**Deployment should take 15-30 minutes total** ⏱️
