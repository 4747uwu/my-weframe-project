import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'form',
    group: 'Forms',
    defaultColumns: ['form', 'tenant', 'submittedAt'],
  },
  access: {
    create: () => true, // Allow public form submissions
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      // Users can only access submissions from their tenant
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
  },  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === 'create') {
          // Auto-assign tenant based on the form
          if (data.form && req?.payload) {
            try {
              const form = await req.payload.findByID({
                collection: 'forms',
                id: data.form,
              })
              if (form?.tenant) {
                data.tenant = form.tenant
              }
            } catch (error) {
              console.error('Error fetching form for tenant assignment:', error)
            }
          }
          data.submittedAt = new Date().toISOString()
        }
        return data
      },
    ],
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
      relationTo: 'tenants',
      admin: {
        readOnly: true,
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
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'submitterIP',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submitterUserAgent',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
