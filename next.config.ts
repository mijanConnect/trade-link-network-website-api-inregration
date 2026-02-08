import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "44kb593x-5004.inc1.devtunnels.ms",
      },
      {
        protocol: "http",
        hostname: "10.10.7.23",
        port: "3000",
      },
    ],
  },
};

export default nextConfig;
