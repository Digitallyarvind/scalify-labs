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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What CRM platforms does Scalify Labs set up?","acceptedAnswer":{"@type":"Answer","text":"Scalify Labs sets up Kylas CRM (recommended for Indian SMBs), TeleCRM (for telecalling teams), Cratio CRM (Indian B2B), Bitrix24, Zoho CRM, HubSpot, LeadSquared (education/healthcare), and Salesforce. Platform recommendation is based on team size, budget, and workflow."}},{"@type":"Question","name":"How much does CRM setup cost?","acceptedAnswer":{"@type":"Answer","text":"Starter CRM (up to 10 users): ₹40,000 one-time. Growth CRM (up to 25 users): ₹60,000 one-time. Enterprise CRM (unlimited users, custom development): custom pricing. All packages include platform setup, integrations, team training, and post-setup support."}},{"@type":"Question","name":"Can Scalify Labs integrate CRM with IndiaMART and JustDial?","acceptedAnswer":{"@type":"Answer","text":"Yes — leads from IndiaMART, JustDial, 99acres, and other portals can be auto-captured into CRM via API integration or Zapier. Every new inquiry auto-creates a lead and notifies the salesperson within 60 seconds."}},{"@type":"Question","name":"How long does CRM setup take?","acceptedAnswer":{"@type":"Answer","text":"Starter CRM: 5–7 business days. Growth CRM: 10–14 business days. Enterprise CRM: 3–6 weeks depending on custom development requirements. Data migration from existing Excel/spreadsheets is included in all packages."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"CRM & Lead Management Setup","item":"https://scalifylabs.com/services/lead-management"}]}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LeadManagementPageClient />
    </>
  )
}
