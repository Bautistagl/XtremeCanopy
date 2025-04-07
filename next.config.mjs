/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-assets.same.dev",
      },
    ],
  },
};

export default nextConfig;
