import type { Metadata } from 'next'
import OBDPageClient from './OBDPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'OBD Voice Call Service in India | Bulk Voice Campaigns Starting at 15 Paisa | Scalify Labs',
  description:
    'Run scalable OBD voice call campaigns with WhatsApp, RCS, and SMS automation workflows. Bulk outreach, reminders, political campaigns, education campaigns, healthcare engagement, and multi-channel communication systems.',
  keywords: [
    'OBD voice call service India',
    'bulk voice call service India',
    'automated voice call campaigns',
    'OBD campaign provider India',
    'voice broadcasting service',
    'multi channel communication platform',
    'WhatsApp SMS OBD automation',
    'bulk calling campaign service',
    'OBD voice calls Ranchi',
    'bulk outbound dialling India',
  ],
  alternates: { canonical: `${SITE.url}/services/obd` },
  openGraph: {
    title: 'OBD Voice Call Service in India | Starting at 15 Paisa | Scalify Labs',
    description:
      'Complete OBD voice call campaigns with automated WhatsApp, RCS, and SMS follow-up journeys. Multi-channel outreach, campaign execution support, real-time analytics. Starting ₹0.15/call.',
    type: 'website',
    url: `${SITE.url}/services/obd`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OBD Voice Call Campaigns in India — ₹0.15/call | Scalify Labs',
    description:
      'Automated OBD calling with WhatsApp, RCS & SMS follow-up workflows. Campaign execution partner for bulk outreach.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'OBD Voice Call Campaign Service',
  description:
    'Scalable OBD voice call campaigns with automated multi-channel follow-up journeys using WhatsApp, RCS, and SMS. Complete campaign execution and management support for businesses across India.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '0.15',
      priceCurrency: 'INR',
      unitText: 'per call (high volume)',
    },
    description: 'Volume-based pricing. Campaign management and multi-channel workflow automation included.',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/obd`,
}

export default function OBDVoiceCallPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <OBDPageClient />
    </>
  )
}
