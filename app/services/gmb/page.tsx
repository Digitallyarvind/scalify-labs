import type { Metadata } from 'next'
import LocalSEOPageClient from './LocalSEOPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Local SEO & Google Business Profile Services | Google Maps Ranking | Scalify Labs',
  description:
    'Improve your Google Maps visibility and local business rankings with Google Business Profile optimization, NAP management, local listings, reviews, and local SEO services.',
  keywords: [
    'local SEO services India',
    'Google Business Profile optimization',
    'Google Maps ranking service',
    'GMB management service',
    'local business SEO',
    'Google My Business optimization',
    'local SEO company India',
    'nearby search optimization',
    'local SEO Ranchi',
    'Google Maps optimization Jharkhand',
  ],
  alternates: { canonical: `${SITE.url}/services/gmb` },
  openGraph: {
    title: 'Local SEO & Google Business Profile | Google Maps Ranking | Scalify Labs',
    description:
      'Get discovered by nearby customers. Google Business Profile optimization, local listings, NAP consistency, review management. Starting ₹9,999/month.',
    type: 'website',
    url: `${SITE.url}/services/gmb`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local SEO & Google Maps Ranking Services | Scalify Labs',
    description:
      'Rank higher on Google Maps. Google Business Profile optimization, NAP consistency, local listings, review management. ₹9,999/month.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Local SEO & Google Business Profile Management',
  description:
    'Complete local SEO services including Google Business Profile optimization, NAP consistency management, local listings, review management, and Google Maps ranking improvement for local businesses in India.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: {
    '@type': 'Offer',
    price: '9999',
    priceCurrency: 'INR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '9999',
      priceCurrency: 'INR',
      unitText: 'per month',
    },
    description: 'Local Visibility Package — GBP optimization, listing management, NAP consistency, weekly posts, ranking optimization, and reporting.',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/gmb`,
}

export default function LocalSEOPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocalSEOPageClient />
    </>
  )
}
