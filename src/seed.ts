import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const seed = async (): Promise<void> => {
  const payload = await getPayload({ config })

  try {
    // Create tenant first
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

    console.log('Created tenant:', tenant.id)

    // Create admin user
    const adminUser = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@weframetech.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'super-admin',
      },
    })

    console.log('Created admin user:', adminUser.id)

    // Create tenant admin
    const tenantAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'tenant@weframetech.com',
        password: 'tenant123',
        firstName: 'Tenant',
        lastName: 'Admin',
        role: 'tenant-admin',
        tenant: tenant.id,
      },
    })

    console.log('Created tenant admin:', tenantAdmin.id)

    // Create contact form using Form Builder plugin
    const contactForm = await payload.create({
      collection: 'forms', // Use Form Builder plugin's collection
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
          },
        ],
        confirmationType: 'message',
        confirmationMessage: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Thank you for your message! We will get back to you soon.',
                  },
                ],
              },
            ],
          },
        },
        emails: [],
      },
    })

    console.log('Created contact form:', contactForm.id)
    console.log('✅ Seed completed successfully!')

  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  }
}

export default seed

// Run seed if called directly
if (process.argv[1] === __filename) {
  seed()
    .then(() => {
      console.log('Seed completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seed failed:', error)
      process.exit(1)
    })
}
