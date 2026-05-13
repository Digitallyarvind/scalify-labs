import type { Metadata } from 'next'
import LeadToRevenuePageClient from './LeadToRevenuePageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'CRM Setup & Lead Management Automation | Scalify Labs India',
  description:
    'Complete CRM setup and lead management automation for Indian businesses. Kylas, Zoho, Bitrix24, TeleCRM, HubSpot implementation with IndiaMART, JustDial, Meta Ads, and Google Ads integration.',
  keywords: [
    'CRM setup India',
    'lead management system India',
    'Kylas CRM setup',
    'TeleCRM implementation',
    'Zoho CRM India',
    'CRM automation Ranchi',
    'lead capture automation',
    'IndiaMART CRM integration',
    'sales pipeline setup India',
    'CRM consultant India',
  ],
  alternates: { canonical: `${SITE.url}/services/lead-to-revenue` },
  openGraph: {
    title: 'CRM Setup & Lead Management Automation | Scalify Labs',
    description:
      'Stop losing leads. We set up and automate your entire CRM — Kylas, Zoho, TeleCRM, and more — with integrations for Meta Ads, Google Ads, IndiaMART, JustDial, and WhatsApp.',
    type: 'website',
    url: `${SITE.url}/services/lead-to-revenue`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRM & Lead Management Setup — Scalify Labs India',
    description:
      'Full CRM implementation for Indian businesses. One-time setup starting ₹40,000. All lead sources connected. Sales team trained.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CRM Setup & Lead Management Automation',
  description:
    'End-to-end CRM implementation and lead management automation for Indian businesses — platform selection, setup, multi-source lead integration, workflow automation, and team training.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter CRM Setup', price: '40000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'one-time', description: 'For teams up to 10 users. Includes 3 lead source integrations and basic automation.' } },
    { '@type': 'Offer', name: 'Growth CRM Setup', price: '60000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'one-time', description: 'For teams up to 25 users. Includes 6 lead source integrations, WhatsApp automation, and custom reporting.' } },
  ],
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
