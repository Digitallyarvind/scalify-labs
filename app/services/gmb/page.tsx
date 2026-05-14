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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is Local SEO and Google Business Profile optimization?","acceptedAnswer":{"@type":"Answer","text":"Local SEO improves your business visibility in Google Maps and local search results. Google Business Profile (GMB) optimization ensures your listing appears in the local 3-pack for searches like \"digital marketing agency near me\" or \"best clinic in Ranchi\"."}},{"@type":"Question","name":"How much does local SEO cost at Scalify Labs?","acceptedAnswer":{"@type":"Answer","text":"Local SEO and Google Business Profile management starts from ₹9,999/month. This includes GMB optimization, 8 Google Posts per month, review management, 25-directory citation building, and monthly Maps ranking reports."}},{"@type":"Question","name":"How long does it take to rank in Google Maps?","acceptedAnswer":{"@type":"Answer","text":"Most businesses appear in the local 3-pack for their primary keywords within 60 days. Results depend on competition, review count, citation consistency, and proximity to the searcher."}},{"@type":"Question","name":"Can Scalify Labs get my business to appear in Google Maps in Ranchi?","acceptedAnswer":{"@type":"Answer","text":"Yes — local SEO and Maps optimization for Ranchi, Jamshedpur, Dhanbad, Bokaro, and other Jharkhand cities is a core specialty. Scalify Labs has helped local businesses achieve top-3 Maps positions for competitive searches."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Local SEO & Google Business Profile","item":"https://scalifylabs.com/services/gmb"}]}` }} />
      <LocalSEOPageClient />
    </>
  )
}
