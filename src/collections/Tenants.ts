import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
  },
  access: {
    // Only super admins can manage tenants
    create: ({ req: { user } }) => {
      return user?.role === 'super-admin'
    },
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      // Regular users can only see their own tenant
      return {
        id: {
          equals: user?.tenant,
        },
      }
    },
    update: ({ req: { user } }) => {
      return user?.role === 'super-admin'
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'super-admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for the tenant',
      },
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Custom domain for this tenant (optional)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'allowFormCreation',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'maxForms',
          type: 'number',
          defaultValue: 10,
        },
      ],
    },
  ],
}
