import type { Metadata } from 'next'
import LeadManagementPageClient from './LeadManagementPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'CRM Setup & Lead Management Automation | Scalify Labs India',
  description:
    'Complete CRM setup and lead management automation for Indian businesses. Kylas, Zoho, Bitrix24, TeleCRM, HubSpot implementation with IndiaMART, JustDial, Meta Ads, and Google Ads integration.',
  keywords: [
    'CRM setup India', 'lead management system India', 'Kylas CRM setup',
    'TeleCRM implementation', 'Zoho CRM India', 'CRM automation Ranchi',
    'lead capture automation', 'IndiaMART CRM integration', 'sales pipeline setup India',
  ],
  alternates: { canonical: `${SITE.url}/services/lead-management` },
  openGraph: {
    title: 'CRM Setup & Lead Management Automation | Scalify Labs',
    description: 'Stop losing leads. We set up and automate your entire CRM — Kylas, Zoho, TeleCRM — with integrations for Meta Ads, Google Ads, IndiaMART, JustDial, and WhatsApp.',
    type: 'website', url: `${SITE.url}/services/lead-management`, siteName: SITE.name,
  },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Service',
  name: 'CRM Setup & Lead Management Automation',
  description: 'End-to-end CRM implementation and lead management automation for Indian businesses.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter CRM Setup', price: '40000', priceCurrency: 'INR' },
    { '@type': 'Offer', name: 'Growth CRM Setup', price: '60000', priceCurrency: 'INR' },
  ],
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/lead-management`,
}

export default function LeadManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LeadManagementPageClient />
    </>
  )
}
