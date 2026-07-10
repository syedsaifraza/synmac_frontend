import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "synmac.acetians.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "synmac-backend.serverscripts.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;