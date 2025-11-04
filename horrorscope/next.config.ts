// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add the images configuration here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '', // Keep empty unless a non-standard port is used
        pathname: '/t/p/**', // Matches paths like /t/p/w500/1A1...
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;