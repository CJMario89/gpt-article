/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GPT_APIKEY: process.env.GPT_APIKEY,
    ACCOUNT: process.env.ACCOUNT,
    PASSWORD: process.env.PASSWORD,
  },
};

module.exports = nextConfig;
