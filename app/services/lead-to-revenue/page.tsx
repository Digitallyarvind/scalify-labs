import type { Metadata } from 'next'
import LeadToRevenuePageClient from './LeadToRevenuePageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Lead to Revenue Growth System | CRM, Ads, SEO & Automation | Scalify Labs',
  description:
    'Build a connected growth system combining SEO, paid ads, CRM, WhatsApp automation, lead nurturing, analytics, and conversion systems managed by Scalify Labs. ₹75,000/month.',
  keywords: [
    'Lead to Revenue System', 'Revenue Growth System', 'Marketing Automation Services',
    'Growth Infrastructure India', 'Outsourced CMO Services India', 'CRM Marketing Automation',
    'Multi-Channel Lead Management', 'Revenue Operations System', 'Connected Growth System',
    'Digital Growth Infrastructure India',
  ],
  alternates: { canonical: `${SITE.url}/services/lead-to-revenue` },
  openGraph: {
    title: 'Lead to Revenue Growth System | Connected Growth Infrastructure | Scalify Labs',
    description: 'Your outsourced digital growth engine. SEO + Ads + CRM + WhatsApp + Analytics — connected into one revenue-focused system. ₹75,000/month.',
    type: 'website', url: `${SITE.url}/services/lead-to-revenue`, siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead to Revenue System — Scalify Labs',
    description: 'Connected growth infrastructure: ads, SEO, CRM, WhatsApp automation, analytics — one managed system for scaling businesses.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Lead to Revenue Growth System',
  description: 'A complete connected growth infrastructure system combining SEO, paid ads, CRM, WhatsApp automation, lead nurturing, analytics, and conversion systems.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: {
    '@type': 'Offer',
    name: 'Lead to Revenue Monthly Retainer',
    price: '75000',
    priceCurrency: 'INR',
    priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' },
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/lead-to-revenue`,
}

export default function LeadToRevenuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LeadToRevenuePageClient />
    </>
  )
}
