import type { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    group: 'Forms',
  },
  access: {
    create: ({ req: { user } }) => {
      // Only tenant admins and super admins can create forms
      return user?.role === 'super-admin' || user?.role === 'tenant-admin'
    },
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') {
        return true
      }
      // Users can only access forms from their tenant
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
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create' && req.user) {
          // Auto-assign tenant for new forms
          if (req.user.role !== 'super-admin') {
            data.tenant = req.user.tenant
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      admin: {
        condition: (data, siblingData, { user }) => {
          return user?.role === 'super-admin'
        },
      },
    },
    {
      name: 'fields',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Number', value: 'number' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Select', value: 'select' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'select',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'confirmationType',
      type: 'select',
      options: [
        {
          label: 'Message',
          value: 'message',
        },
        {
          label: 'Redirect',
          value: 'redirect',
        },
      ],
      defaultValue: 'message',
    },
    {
      name: 'confirmationMessage',
      type: 'richText',
      admin: {
        condition: (data, siblingData) => siblingData?.confirmationType === 'message',
      },
    },
    {
      name: 'redirect',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.confirmationType === 'redirect',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        {
          name: 'emailTo',
          type: 'text',
          required: true,
        },
        {
          name: 'emailFrom',
          type: 'text',
        },
        {
          name: 'replyTo',
          type: 'text',
        },
        {
          name: 'emailSubject',
          type: 'text',
        },
        {
          name: 'message',
          type: 'richText',
        },
      ],
    },
  ],
}
