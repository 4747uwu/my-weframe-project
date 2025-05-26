// storage-adapter-import-placeholder
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

// Import your collections
import { Users } from './collections/Users'
import { Tenants } from './collections/Tenants'
// Remove your custom Forms collection import
// import { Forms } from './collections/Forms'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Tenants,
    // Remove your custom Forms collection from here
    // Forms,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    formBuilderPlugin({
      // Configure the Form Builder plugin to handle multi-tenancy
      formOverrides: {
        slug: 'forms', // Use the default 'forms' slug
        access: {
          read: () => true,
          create: ({ req: { user } }) => {
            return user?.role === 'tenant-admin' || user?.role === 'super-admin'
          },
          update: ({ req: { user } }) => {
            if (user?.role === 'super-admin') return true
            if (user?.role === 'tenant-admin') {
              return {
                tenant: { equals: user.tenant?.id }
              }
            }
            return false
          },
          delete: ({ req: { user } }) => {
            return user?.role === 'super-admin'
          },
        },
        // Add tenant field to forms
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
            admin: {
              position: 'sidebar',
            },
            hooks: {
              beforeChange: [
                ({ req, data }) => {
                  // Auto-assign tenant for tenant admins
                  if (req.user?.role === 'tenant-admin' && req.user.tenant) {
                    return req.user.tenant.id
                  }
                  return data
                },
              ],
            },
          },
        ],
      },
      formSubmissionOverrides: {
        slug: 'form-submissions',
        access: {
          create: () => true, // Allow public submissions
          read: ({ req: { user } }) => {
            if (!user) return false
            if (user.role === 'super-admin') return true
            
            // Tenant admins can only see their own submissions
            return {
              'form.tenant': { equals: user.tenant?.id }
            }
          },
          update: ({ req: { user } }) => {
            return user?.role === 'super-admin'
          },
          delete: ({ req: { user } }) => {
            return user?.role === 'super-admin'
          },
        },
      },
    }),
    payloadCloudPlugin(),
  ],
})

