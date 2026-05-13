import type { Metadata } from 'next'
import SEOPageClient from './SEOPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'SEO Services in India | Technical SEO, Content SEO & Organic Growth | Scalify Labs',
  description:
    'Grow your website traffic, Google rankings, and organic lead generation with technical SEO, content SEO, on-page optimization, and growth-focused SEO services.',
  keywords: [
    'SEO services India',
    'SEO company India',
    'technical SEO services',
    'organic SEO services',
    'business SEO agency',
    'website SEO services',
    'content SEO services',
    'SEO marketing company India',
    'SEO agency Ranchi',
    'organic traffic growth India',
  ],
  alternates: { canonical: `${SITE.url}/services/affordable-seo-services` },
  openGraph: {
    title: 'SEO Services in India | Technical SEO & Organic Growth | Scalify Labs',
    description:
      'Scale your business with technical SEO, content optimization, keyword strategy, and search visibility systems designed for long-term organic growth.',
    type: 'website',
    url: `${SITE.url}/services/affordable-seo-services`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Services — Technical SEO, Content SEO & Organic Growth | Scalify Labs',
    description:
      'Grow rankings, traffic, and organic leads. Technical SEO, content strategy, keyword research, and on-page optimization. Packages from ₹15,000/month.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SEO Services',
  description:
    'Professional SEO services including technical SEO, content SEO, keyword research, on-page optimization, and organic growth strategy for businesses in India.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter SEO', price: '15000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
    { '@type': 'Offer', name: 'Growth SEO', price: '25000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
    { '@type': 'Offer', name: 'Authority SEO', price: '50000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
  ],
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/affordable-seo-services`,
}

export default function SEOServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SEOPageClient />
    </>
  )
}
