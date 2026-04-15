/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: "cdn-jarvis-store.oss-ap-southeast-5.aliyuncs.com",
      },
      {
        protocol: "https",
        hostname: "senikersku.com",
      },
      {
        protocol: "https",
        hostname: "screamous.com",
      },
      {
        protocol: "https",
        hostname: "static-src.com",
      },
      {
        protocol: "https",
        hostname: "www.static-src.com",
      },
      {
        protocol: "https",
        hostname: "hikenrun.com",
      },
      {
        protocol: "https",
        hostname: "www.screamous.com",
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
}

module.exports = nextConfig
