import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  try {
    console.log('Starting database seeding...')

    // Create a sample tenant
    const tenant = await payload.create({
      collection: 'tenants',
      data: {
        name: 'WeframeTech Demo',
        slug: 'weframetech-demo',
        domain: 'demo.weframetech.com',
        isActive: true,
        settings: {
          allowFormCreation: true,
          maxForms: 10,
        },
      },
    })

    console.log('Created tenant:', tenant.name)

    // Create a super admin user
    const superAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@weframetech.com',
        password: 'admin123',
        role: 'super-admin',
        firstName: 'Super',
        lastName: 'Admin',
      },
    })

    console.log('Created super admin user:', superAdmin.email)

    // Create a tenant admin user
    const tenantAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'tenant@weframetech.com',
        password: 'tenant123',
        role: 'tenant-admin',
        tenant: tenant.id,
        firstName: 'Tenant',
        lastName: 'Admin',
      },
    })

    console.log('Created tenant admin user:', tenantAdmin.email)

    // Create a sample contact form
    const contactForm = await payload.create({
      collection: 'forms',
      data: {
        title: 'Contact Us Form',
        tenant: tenant.id,
        fields: [
          {
            name: 'fullName',
            label: 'Full Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your full name',
          },
          {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            placeholder: 'Enter your email address',
          },
          {
            name: 'subject',
            label: 'Subject',
            type: 'text',
            required: true,
            placeholder: 'What is this regarding?',
          },
          {
            name: 'message',
            label: 'Message',
            type: 'textarea',
            required: true,
            placeholder: 'Tell us how we can help you...',
          },        ],
        confirmationType: 'message',
        confirmationMessage: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Thank you for contacting us! We will get back to you soon.',
                    format: 0,
                    style: '',
                    mode: 'normal',
                    detail: 0,
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    })

    console.log('Created contact form:', contactForm.title)

    console.log('Database seeding completed successfully!')
    console.log('\nLogin credentials:')
    console.log('Super Admin: admin@weframetech.com / admin123')
    console.log('Tenant Admin: tenant@weframetech.com / tenant123')
    console.log('\nContact Form ID:', contactForm.id)

  } catch (error) {
    console.error('Error seeding database:', error)
  }
  
  // Important: Force exit the process
  process.exit(0)
}

seed()
