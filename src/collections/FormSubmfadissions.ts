import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants', // Make sure this matches your tenants collection slug
      required: true,
      admin: {
        readOnly: true, // Auto-assigned from form
      },
    },
    {
      name: 'submissionData',
      type: 'json',
      required: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  // Auto-assign tenant from form
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data.form) {
          try {
            const form = await req.payload.findByID({
              collection: 'forms',
              id: data.form,
              depth: 1,
            })
            
            if (form && form.tenant) {
              data.tenant = form.tenant.id || form.tenant
            }
          } catch (error) {
            console.error('Error auto-assigning tenant:', error)
          }
        }
        return data
      },
    ],
  },
  access: {
    create: () => true, // Allow public form submissions
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super-admin') return true
      
      // Tenant admins can only see their own submissions
      return {
        tenant: { equals: user.tenant?.id }
      }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'super-admin' || user.role === 'tenant-admin'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'super-admin'
    },
  },
}

export default FormSubmissions
