/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@awema/shared', '@awema/templates'],
  
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },

  swcMinify: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
}

module.exports = nextConfig