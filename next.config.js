/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GPT_APIKEY: process.env.GPT_APIKEY,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    PLACE_APIKEY: process.env.PLACE_APIKEY,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost"],
  },
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 100000,
  },
};

module.exports = nextConfig;
