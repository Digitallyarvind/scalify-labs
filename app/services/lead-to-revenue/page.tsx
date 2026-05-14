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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the Lead to Revenue system?","acceptedAnswer":{"@type":"Answer","text":"Lead to Revenue is a complete managed growth infrastructure at ₹75,000/month where Scalify Labs connects SEO, Google Ads, Meta Ads, CRM automation, WhatsApp nurturing, lead management, and analytics into one system for scaling businesses."}},{"@type":"Question","name":"What is included in the Lead to Revenue retainer?","acceptedAnswer":{"@type":"Answer","text":"Multi-channel growth management (SEO + paid ads), CRM setup and management, WhatsApp automation, lead nurturing workflows, analytics and revenue reporting, sales process optimization, and dedicated growth strategy support. Ad spend billed separately."}},{"@type":"Question","name":"Who benefits most from Lead to Revenue?","acceptedAnswer":{"@type":"Answer","text":"Businesses generating 50+ leads/month, businesses spending ₹1 lakh+ on ads without clear ROI, multi-location brands, clinics, education institutes, real estate companies, and service businesses needing scalable follow-up systems."}},{"@type":"Question","name":"Is ad spend included in the ₹75,000/month fee?","acceptedAnswer":{"@type":"Answer","text":"No — ad spend is billed directly to Google and Meta platforms. The ₹75,000/month covers strategy, management, CRM, automation, SEO, and reporting. This ensures full transparency and direct platform control for clients."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Lead to Revenue Growth System","item":"https://scalifylabs.com/services/lead-to-revenue"}]}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LeadToRevenuePageClient />
    </>
  )
}
