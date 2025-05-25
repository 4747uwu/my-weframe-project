# 🚀 Demo Access Guide

This guide provides instructions on how to access and test the multi-tenant form builder application after deployment.

## 🔑 Login Credentials

After running the seed script (`npm run seed`), the following accounts are available:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Super Admin | admin@weframetech.com | admin123 | Full system access |
| Tenant Admin | tenant@weframetech.com | tenant123 | Access to WeframeTech Demo tenant only |

## 🌐 Key URLs for Testing

### Admin Interface
```
https://[your-deployed-url]/admin
```
- Login using the credentials above
- Super admin can access all tenants and forms
- Tenant admin can only access their assigned tenant

### Frontend Pages

#### Homepage
```
https://[your-deployed-url]/
```
- Overview and navigation links

#### Contact Form Demo
```
https://[your-deployed-url]/contact
```
- Working contact form implementation
- Submits to the API endpoint

#### Features Showcase
```
https://[your-deployed-url]/demo
```
- Demonstrates all implemented features
- Shows forms data from the database

### API Endpoints

#### Get Forms
```
GET https://[your-deployed-url]/api/forms?tenant=weframetech-demo
```
- Returns all forms for a specific tenant

#### Submit Form
```
POST https://[your-deployed-url]/api/forms
```
- Submit data to a specific form
- Example payload:
```json
{
  "formId": "form-id-here",
  "submissionData": {
    "fullName": "Test User",
    "email": "test@example.com",
    "message": "This is a test submission"
  }
}
```

## 🏗️ Demo Walkthrough

1. **Login to Admin Panel**
   - Access `/admin` and login as super-admin
   - Explore the collections (Users, Tenants, Forms)
   - Create a new form with custom fields

2. **Test Tenant Isolation**
   - Login as tenant-admin
   - Verify you can only see your tenant's forms
   - Attempt to create a form (should be allowed)

3. **Form Submissions Flow**
   - Visit the `/contact` page
   - Fill out and submit the form
   - Check form submissions in the admin panel

4. **API Testing**
   - Use the API endpoints to fetch forms
   - Submit data via the API
   - Verify data appears in the admin panel

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

Test the contact form and demo pages on different screen sizes to verify the responsive design.

## 🔍 Multi-Tenant Features to Verify

1. **Data Isolation**
   - Forms created in one tenant are not visible to others
   - Form submissions are automatically associated with the correct tenant

2. **Access Control**
   - Super-admin can access everything
   - Tenant-admin can only access their tenant data
   - Regular users have further restricted access

3. **Form Builder Capabilities**
   - Create forms with various field types
   - Set validation rules
   - Configure confirmation messages and redirects

## 📊 Database Seeding

The seed script creates:
- 1 tenant (WeframeTech Demo)
- 2 users (super-admin and tenant-admin)
- 1 sample contact form

You can run the seed script again if needed:
```
npm run seed
```

Note: Running the seed script multiple times will create duplicate entries.
