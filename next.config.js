/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["links.papareact.com"]
  }
}

module.exports = nextConfig
