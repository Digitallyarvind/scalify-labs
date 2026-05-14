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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What SEO packages does Scalify Labs offer?","acceptedAnswer":{"@type":"Answer","text":"Starter at ₹15,000/month (5 blogs, local SEO), Growth at ₹25,000/month (10 blogs, link building), Authority at ₹50,000/month (20 blogs, AEO/AI search optimization, schema markup)."}},{"@type":"Question","name":"How long does SEO take to show results?","acceptedAnswer":{"@type":"Answer","text":"Month 1–2: technical fixes and indexing. Month 3: first page-1 keywords. Month 4–5: major ranking movement. Month 6+: stable page-1 rankings and growing organic traffic."}},{"@type":"Question","name":"Does Scalify Labs do local SEO for Ranchi?","acceptedAnswer":{"@type":"Answer","text":"Yes — local SEO for Ranchi, Jamshedpur, Dhanbad, and across Jharkhand including Google Business Profile optimization, local keywords, citation building in 25+ directories, and Maps rankings."}},{"@type":"Question","name":"Does Scalify Labs optimize for AI search engines?","acceptedAnswer":{"@type":"Answer","text":"Yes — the Authority SEO plan includes AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) so content appears in ChatGPT, Perplexity, Google AI Overviews, and other AI answers."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"SEO Services in Ranchi","item":"https://scalifylabs.com/services/affordable-seo-services"}]}` }} />
      <SEOPageClient />
    </>
  )
}
