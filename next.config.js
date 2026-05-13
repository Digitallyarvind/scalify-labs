/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  async redirects() {
    return [
      { source: '/services/google-ads', destination: '/services/google-ads-services', permanent: true },
      { source: '/services/seo', destination: '/services/affordable-seo-services', permanent: true },
      { source: '/services/whatsapp-marketing', destination: '/services/whatsapp-marketing-agency', permanent: true },
      { source: '/contact', destination: '/contact-scalifylabs', permanent: true },
    ]
  },
}

module.exports = nextConfig
