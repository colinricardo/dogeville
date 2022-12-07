const env = require("./config/environment");

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: { ...env },
  images: {
    domains: ["storage.googleapis.com"],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
