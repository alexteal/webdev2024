/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
  serverRuntimeConfig: {
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESSKEY_ID: process.env.AWS_ACCESSKEY_ID,
    AWS_ACCESSKEY_SECRET: process.env.AWS_ACCESSKEY_SECRET,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  // other configurations...
};
export default nextConfig;
