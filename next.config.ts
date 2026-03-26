import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
};

export default nextConfig;
