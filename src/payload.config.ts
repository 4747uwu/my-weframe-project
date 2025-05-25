// storage-adapter-import-placeholder
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tenants } from './collections/Tenants'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormSubmissions'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Tenants, Forms, FormSubmissions],
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
    payloadCloudPlugin(),
    formBuilderPlugin({
      fields: {
        payment: false, // Disable payment field for this demo
      },
      formOverrides: {
        slug: 'forms-builtin', // Different slug to avoid conflicts with our custom Forms collection
        access: {
          read: ({ req: { user } }) => {
            if ((user as { role?: string })?.role === 'super-admin') {
              return true
            }
            return {
              tenant: {
                equals: (user as { tenant?: string })?.tenant,
              },
            }
          },
        },
      },
      formSubmissionOverrides: {
        slug: 'form-submissions-builtin',
        access: {
          read: ({ req: { user } }) => {
            if ((user as { role?: string })?.role === 'super-admin') {
              return true
            }
            return {
              tenant: {
                equals: (user as { tenant?: string })?.tenant,
              },
            }
          },
        },
      },
    }),
    // storage-adapter-placeholder
  ],
})

