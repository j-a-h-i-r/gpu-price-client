/** @type {import('next').NextConfig} */

// const apiUrl = "http://gpu-prices-server.web:5000";
console.log("API_URL", process.env.API_URL);
const apiUrl = process.env?.["API_URL"] ?? "http://localhost:3333";

console.log("apiUrl", apiUrl);

module.exports = {
  reactStrictMode: true,
  // transpilePackages: ['antd'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      }
    ]
  },
}
