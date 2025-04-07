/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-assets.same.dev",
      },
    ],
  },
};

export default nextConfig;
