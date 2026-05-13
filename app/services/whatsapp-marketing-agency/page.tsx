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
      <WhatsAppPageClient />
    </>
  )
}
