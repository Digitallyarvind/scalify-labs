import type { Metadata } from 'next'
import WhatsAppPageClient from './WhatsAppPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'WhatsApp API Marketing & Automation Services | WATI, Interakt, AiSensy Setup | Scalify Labs',
  description:
    'Build scalable WhatsApp marketing and automation systems with official WhatsApp API platforms like WATI, Interakt, and AiSensy. Campaign management, automation workflows, message design, and customer engagement systems.',
  keywords: [
    'WhatsApp API marketing',
    'WhatsApp automation services',
    'WhatsApp Business API setup',
    'WhatsApp campaign management',
    'WATI setup service',
    'Interakt marketing service',
    'AiSensy automation',
    'WhatsApp API agency India',
    'WhatsApp marketing company India',
    'WhatsApp automation Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/services/whatsapp-marketing-agency` },
  openGraph: {
    title: 'WhatsApp API Marketing & Automation | WATI, Interakt, AiSensy | Scalify Labs',
    description:
      'Complete WhatsApp automation systems using official API platforms. Campaign management, workflow design, lead nurturing, chatbot flows. Agency management ₹10,000/month.',
    type: 'website',
    url: `${SITE.url}/services/whatsapp-marketing-agency`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Business API Marketing & Automation | Scalify Labs',
    description:
      'WATI, Interakt, AiSensy setup + campaign management. Build complete WhatsApp automation systems for business growth.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'WhatsApp API Marketing & Automation Services',
  description:
    'Complete WhatsApp Business API marketing and automation services including WATI, Interakt, and AiSensy setup, workflow design, campaign management, lead nurturing, and chatbot flows.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: {
    '@type': 'Offer',
    price: '10000',
    priceCurrency: 'INR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '10000',
      priceCurrency: 'INR',
      unitText: 'per month (agency management)',
    },
    description: 'Platform subscription and Meta conversation charges billed separately.',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/whatsapp-marketing-agency`,
}

export default function WhatsAppMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is WhatsApp marketing?","acceptedAnswer":{"@type":"Answer","text":"WhatsApp marketing uses the WhatsApp Business API to send branded messages, promotions, and automated nurture sequences to customers. It achieves 98% open rates versus 20% for email, making it the most effective marketing channel for Indian businesses."}},{"@type":"Question","name":"How much does WhatsApp marketing cost at Scalify Labs?","acceptedAnswer":{"@type":"Answer","text":"Management starts from ₹10,000/month. WhatsApp message costs are separate — charged by Meta at approximately ₹0.35–₹0.82 per conversation. API setup fee applies for first-time integrations."}},{"@type":"Question","name":"Can WhatsApp be integrated with CRM?","acceptedAnswer":{"@type":"Answer","text":"Yes — Scalify Labs integrates WhatsApp Business API with CRMs including Kylas, Zoho, TeleCRM, HubSpot, and Bitrix24 so every WhatsApp lead is automatically captured in the sales pipeline."}},{"@type":"Question","name":"What is WhatsApp automation?","acceptedAnswer":{"@type":"Answer","text":"WhatsApp automation sends triggered messages based on lead behavior — instant welcome messages on enquiry, multi-step nurture sequences over days or weeks, re-engagement for cold leads, and appointment reminders. Average response time: under 60 seconds."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"WhatsApp Marketing Agency","item":"https://scalifylabs.com/services/whatsapp-marketing-agency"}]}` }} />
      <WhatsAppPageClient />
    </>
  )
}
