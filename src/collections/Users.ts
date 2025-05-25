import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Users can only see themselves unless they're super admin
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user }, id }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      return user?.id === id
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Tenant Admin', 
          value: 'tenant-admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.role !== 'super-admin'
        },
      },
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    // Email added by default
    // Add more fields as needed
  ],
}
