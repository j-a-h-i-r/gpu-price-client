/** @type {import('next').NextConfig} */
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
        destination: 'http://localhost:3333/api/:path*',
      }
    ]
  },
}
