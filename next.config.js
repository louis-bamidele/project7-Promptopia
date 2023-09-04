/** @type {import('next').NextConfig} */
const nextConfig = {
  // Target must be serverless
  serverless: true,
  distDir: "build",
  images: {
    domains: ["lh3.googleusercontent.com"], // allowed domains here
  },
};

module.exports = nextConfig;
