/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GPT_APIKEY: process.env.GPT_APIKEY,
    PASSWORD: process.env.POSTGRES_DATABASE,
    PASSWORD: process.env.POSTGRES_ACCOUNT,
    PASSWORD: process.env.POSTGRES_PASSWORD,
  },
};

module.exports = nextConfig;
