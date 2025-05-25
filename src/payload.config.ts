// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilder } from '@payloadcms/plugin-form-builder'


import { Users } from './collections/Users'
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
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilder({
      // Optionally redirect to a success page
      // redirectUrl: '/contact-success',
      // Optionally define fields that should be excluded from the form builder
      // fields: {
      //   // payment: false, // Example: disable payment field if you don't need it
      // },
      formOverrides: {}, // If you need to override the Forms collection itself
      formSubmissionOverrides: {}, // If you need to override the Submissions collection
    }),
    // storage-adapter-placeholder
  ],
})
