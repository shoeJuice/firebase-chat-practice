/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', ], 
  }
}

module.exports = nextConfig
