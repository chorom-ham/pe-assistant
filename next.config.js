const nextConfig = {
  reactStrictMode: true,
  env: {
    AIRTABLE_ID: process.env.AIRTABLE_ID,
    AIRTABLE_KEY: process.env.AIRTABLE_KEY,
  },
};

module.exports = nextConfig;
