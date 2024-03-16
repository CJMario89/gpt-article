/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GPT_APIKEY: process.env.GPT_APIKEY,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    PLACE_APIKEY: process.env.PLACE_APIKEY,
  },
  i18n: {
    locales: ["en-US", "zh-TW", "ja-JP"],
    defaultLocale: "en-US",
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jp-travel.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["localhost"],
  },
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 100000,
  },
};

module.exports = nextConfig;
