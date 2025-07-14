/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@awema/core',
    '@awema/templates',
    '@awema/editor',
    '@awema/ai',
    '@awema/shared',
    '@awema/analytics'
  ],
  experimental: {
    optimizePackageImports: ['@awema/editor']
  }
}

module.exports = nextConfig