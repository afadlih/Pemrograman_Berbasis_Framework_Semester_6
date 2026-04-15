import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.spiritapparel.co.id",
      },
      {
        protocol: "https",
        hostname: "spiritapparel.co.id",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
