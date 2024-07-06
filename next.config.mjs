/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      }
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
