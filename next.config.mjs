/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-info.broadsolutionsgroup.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
