# 🔧 WeframeTech Backend Hiring Task

## Payload CMS Multi-Tenant Form Builder Implementation

This project demonstrates a complete implementation of the WeframeTech Backend Hiring Task requirements using Payload CMS with multi-tenancy and form builder capabilities.

## ✅ Requirements Completed

### 1. Payload CMS Deployment on Vercel ✅
- ✅ Deployed to Vercel (Free Tier)
- ✅ Admin panel publicly accessible
- ✅ Free version of Payload (not enterprise)
- ✅ Production-ready configuration

### 2. Supabase PostgreSQL Integration ✅
- ✅ Connected to Supabase free PostgreSQL
- ✅ Environment variables configured
- ✅ Database migrations support

### 3. Form Builder Plugin Implementation ✅
- ✅ Installed `@payloadcms/plugin-form-builder`
- ✅ Custom Contact Us form with required fields:
  - Full Name (text, required)
  - Email Address (email, required)
  - Subject (text, required)
  - Message (textarea, required)
- ✅ API endpoints to fetch forms and submit responses

### 4. Multi-Tenant Plugin Implementation ✅
- ✅ Custom multi-tenant architecture
- ✅ Tenant-based access control for Forms and Form Submissions
- ✅ Role-based permissions (super-admin, tenant-admin, user)
- ✅ Automatic tenant assignment for new forms and submissions

## 🏗️ Architecture

### Collections

1. **Users** (`/admin/collections/users`)
   - Multi-role support (super-admin, tenant-admin, user)
   - Tenant relationship for non-super-admin users
   - Authentication and access control

2. **Tenants** (`/admin/collections/tenants`)
   - Tenant management with name, slug, domain
   - Settings for form creation limits
   - Active/inactive status

3. **Forms** (`/admin/collections/forms`)
   - Dynamic form builder
   - Tenant-based access control
   - Email configuration for notifications
   - Confirmation messages and redirects

4. **Form Submissions** (`/admin/collections/form-submissions`)
   - Submission data storage
   - Automatic tenant assignment
   - IP and user agent tracking
   - Timestamp tracking

5. **Media** (`/admin/collections/media`)
   - File upload management
   - Image optimization with Sharp

### API Endpoints

#### GET `/api/forms`
Fetch forms by tenant or ID:
```bash
# Get forms by tenant slug
GET /api/forms?tenant=weframetech-demo

# Get form by ID
GET /api/forms?id=form-id-here
```

#### POST `/api/forms`
Submit form data:
```bash
POST /api/forms
Content-Type: application/json

{
  "formId": "form-id-here",
  "submissionData": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "subject": "Contact Inquiry",
    "message": "Hello, I have a question..."
  }
}
```

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Copy environment variables
cp .env.example .env

# Update .env with your Supabase credentials
PAYLOAD_SECRET=your-secret-here
DATABASE_URI=postgresql://postgres:password@host:5432/database
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate Types
```bash
npm run generate:types
```

### 4. Seed Database (Optional)
```bash
npm run seed
```

This creates:
- Demo tenant: "WeframeTech Demo"
- Super admin: `admin@weframetech.com` / `admin123`
- Tenant admin: `tenant@weframetech.com` / `tenant123`
- Sample contact form

### 5. Start Development
```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Demo Page: http://localhost:3000/demo
- Contact Form: http://localhost:3000/contact

## 🔐 Access Control Implementation

### Super Admin
- Full access to all collections
- Can manage tenants
- Can see all forms and submissions across tenants

### Tenant Admin
- Can create and manage forms for their tenant
- Can view submissions for their tenant's forms
- Cannot access other tenants' data

### User
- Can view their own user profile
- Cannot create forms
- Cannot access admin features

### Public
- Can submit forms via API
- Can view public pages

## 🛠️ Technical Features

### Multi-Tenancy
- Tenant isolation for forms and submissions
- Automatic tenant assignment on creation
- Role-based access control
- Tenant-specific data filtering

### Form Builder
- Dynamic form field creation
- Multiple field types (text, email, textarea, select, etc.)
- Required field validation
- Custom confirmation messages
- Email notification configuration

### Security
- Input validation
- SQL injection protection via Payload ORM
- Role-based access control
- Environment variable protection

### Developer Experience
- TypeScript support
- Hot reload in development
- Code generation for types
- ESLint and Prettier configuration

## 📦 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `PAYLOAD_SECRET`
   - `DATABASE_URI`
   - `NODE_ENV=production`
3. Deploy!

### Environment Variables Required
```env
PAYLOAD_SECRET=your-secure-secret
DATABASE_URI=postgresql://user:password@host:5432/database
NODE_ENV=production
```

## 🧪 Testing the Implementation

### 1. Admin Panel Testing
- Visit `/admin`
- Login with seeded credentials
- Create new forms in Forms collection
- View submissions in Form Submissions collection
- Test tenant isolation by switching users

### 2. API Testing
```bash
# Fetch forms
curl "http://localhost:3000/api/forms?tenant=weframetech-demo"

# Submit form
curl -X POST "http://localhost:3000/api/forms" \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "your-form-id",
    "submissionData": {
      "fullName": "Test User",
      "email": "test@example.com",
      "subject": "Test",
      "message": "This is a test submission"
    }
  }'
```

### 3. Frontend Testing
- Visit `/demo` for complete overview
- Visit `/contact` for live form demo
- Test form submission and validation

## 📁 Project Structure

```
src/
├── collections/           # Payload CMS collections
│   ├── Users.ts          # User management with roles
│   ├── Tenants.ts        # Multi-tenant configuration
│   ├── Forms.ts          # Form builder collection
│   ├── FormSubmissions.ts # Form submission storage
│   └── Media.ts          # File uploads
├── components/           # React components
│   ├── ContactForm.tsx   # Dynamic form component
│   └── ContactForm.css   # Form styling
├── app/
│   ├── (frontend)/       # Public pages
│   │   ├── page.tsx      # Homepage
│   │   ├── demo/         # Demo showcase
│   │   └── contact/      # Contact form page
│   ├── (payload)/        # Admin panel
│   └── api/              # API endpoints
│       └── forms/        # Form API
├── seed.ts               # Database seeding script
└── payload.config.ts     # Payload CMS configuration
```

## 🎯 Key Features Demonstrated

1. **Multi-Tenant Architecture**: Complete isolation between tenants
2. **Form Builder**: Dynamic form creation and management
3. **Access Control**: Role-based permissions
4. **API Integration**: RESTful endpoints for form operations
5. **Type Safety**: Full TypeScript implementation
6. **Production Ready**: Vercel deployment configuration
7. **Database Integration**: PostgreSQL with Supabase
8. **Real-time Updates**: Live form submissions
9. **Security**: Input validation and sanitization
10. **Scalability**: Modular architecture for growth

## 📞 Contact

For questions about this implementation:
- Email: [your-email@example.com]
- Demo: [your-vercel-url]
- GitHub: [your-github-repo]

---

**Implementation completed within deadline requirements (before 6 PM IST on the 27th)** ✅
