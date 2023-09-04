/** @type {import('next').NextConfig} */
const nextConfig = {
  // Target must be serverless
  target: "serverless",
  distDir: "build",
  images: {
    domains: ["lh3.googleusercontent.com"], // allowed domains here
  },
};

module.exports = nextConfig;
