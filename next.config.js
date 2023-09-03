/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    domains: ["lh3.googleusercontent.com"], // allowed domains here
  },
};

module.exports = nextConfig;
