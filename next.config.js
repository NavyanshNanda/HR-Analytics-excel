/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['papaparse'],
  allowedDevOrigins: ['http://192.168.18.46:3000'],
}

module.exports = nextConfig
