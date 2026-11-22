/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  experimental: {
    agentUpgrade: "security",
    cpus: 1
  }
};

export default nextConfig;
