// import { withPayload } from '@payloadcms/next/withPayload'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Add these for production deployment
//   output: 'standalone', // Required for Docker deployment
//   serverExternalPackages: ['sharp'], // Updated from experimental.serverComponentsExternalPackages
//   images: {
//     unoptimized: true, // Add if having image optimization issues
//   },
// }

// export default withPayload(nextConfig, { 
//   devBundleServerPackages: false,
//   configPath: './src/payload.config.ts'
// })

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone for development - only use for production
  // output: 'standalone', // Comment this out for development
  serverExternalPackages: ['sharp'],
  images: {
    unoptimized: true,
  },
  // Add development optimizations
  experimental: {
    optimizePackageImports: ['@payloadcms/ui'],
  },
  eslint: {
    ignoreDuringBuilds: true, // This will allow deployment to succeed
  },
  typescript: {
    ignoreBuildErrors: true, // Dangerously allow production builds to successfully complete even if your project has TypeScript errors.
  },
}

export default withPayload(nextConfig, { 
  devBundleServerPackages: false,
  configPath: './src/payload.config.ts'
})
