import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
     remotePatterns: [
    {
      protocol: 'https',
      hostname: 'synmac-backend.serverscripts.in',
    },
  ],
    domains: ['synmac-backend.serverscripts.in'],
  },
};

export default nextConfig;
