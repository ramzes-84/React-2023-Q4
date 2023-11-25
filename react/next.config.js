/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.guim.co.uk",
      },
      {
        protocol: "http",
        hostname: "*.guim.co.uk",
      },
    ],
  },
};

module.exports = nextConfig;
