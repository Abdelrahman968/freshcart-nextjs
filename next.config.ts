import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
      },
    ],
  },
};

export default nextConfig;
