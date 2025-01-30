/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-stg.transak.com",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "assets-dev.transak.com",
        port: "",
        pathname: "*/**",
      },
    ],
  },
};

module.exports = nextConfig;
