/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: '*.s3.amazonaws.com',
          },
        ],
      },
      typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
