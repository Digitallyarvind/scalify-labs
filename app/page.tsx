import type { Metadata } from 'next'
import HomepageClient from './HomepageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Scalify Labs | AI-Powered Digital Growth & Lead Generation Systems',
  description:
    'Scalify Labs helps businesses grow through SEO, Google Ads, CRM automation, WhatsApp marketing, AI workflows, and lead-to-revenue systems designed for scalable business growth. Digital Marketing Agency in Ranchi, Jharkhand.',
  keywords: [
    'Digital Marketing Agency in Ranchi',
    'SEO Services in Ranchi',
    'Google Ads Agency Ranchi',
    'CRM Automation Services India',
    'WhatsApp Marketing Services',
    'AI Marketing Agency India',
    'Lead Generation Company Ranchi',
    'Local SEO Services Jharkhand',
    'Growth Marketing Agency India',
    'Lead to Revenue System',
    'Performance Marketing Agency',
    'Website Development Company Ranchi',
    'AI Automation Services India',
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'Scalify Labs | AI-Powered Growth & Lead Generation Systems',
    description: 'Connected growth infrastructure for Indian businesses — SEO, Google Ads, CRM automation, WhatsApp marketing, AI workflows, and lead-to-revenue systems.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scalify Labs | AI-Powered Digital Growth Systems',
    description: 'We build connected growth systems — not just campaigns. SEO · Google Ads · CRM · WhatsApp · AI Workflows. Based in Ranchi, Jharkhand.',
  },
}

function HomeSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        description: 'AI-powered growth infrastructure company combining SEO, Google Ads, CRM automation, WhatsApp marketing, and AI workflows for scalable business growth.',
        foundingLocation: { '@type': 'Place', name: 'Ranchi, Jharkhand, India' },
        founder: { '@type': 'Person', name: SITE.founder },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.phone,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['Hindi', 'English'],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.state,
          addressCountry: 'IN',
        },
        sameAs: [
          'https://www.facebook.com/scalifylabs',
          'https://www.instagram.com/scalifylabs',
          'https://www.linkedin.com/company/scalifylabs',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE.url}/#localbusiness`,
        name: SITE.name,
        priceRange: '₹₹',
        telephone: SITE.phone,
        email: SITE.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ranchi',
          addressLocality: 'Ranchi',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 23.3441, longitude: 85.3096 },
        url: SITE.url,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function HomePage() {
  return (
    <>
      <HomeSchema />
      <HomepageClient />
    </>
  )
}
