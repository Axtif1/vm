/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    agentUpgrade: "security",
    cpus: 1
  }
};

export default nextConfig;
