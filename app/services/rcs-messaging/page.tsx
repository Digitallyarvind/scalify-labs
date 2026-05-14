import type { Metadata } from 'next'
import RCSPageClient from './RCSPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'RCS Messaging Service in India Starting at 16 Paisa | Scalify Labs',
  description:
    'Launch interactive RCS messaging campaigns for your business with verified branding, images, buttons, carousels, and higher engagement. Pricing starts from ₹0.16/message. Minimum order 50,000 messages.',
  keywords: [
    'RCS messaging India',
    'RCS business messaging',
    'rich communication services India',
    'bulk RCS campaign India',
    'RCS messages price India',
    'interactive business messaging',
    'RCS messaging service Ranchi',
    'RCS bulk messaging 16 paisa',
  ],
  alternates: { canonical: `${SITE.url}/services/rcs-messaging` },
  openGraph: {
    title: 'RCS Messaging Service in India Starting at 16 Paisa | Scalify Labs',
    description:
      'Launch interactive RCS messaging campaigns with verified branding, images, CTA buttons, and carousels. Starting ₹0.16/message. Min 50,000 messages. Full campaign management included free.',
    type: 'website',
    url: `${SITE.url}/services/rcs-messaging`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCS Messaging Service in India — ₹0.16/message | Scalify Labs',
    description:
      'Interactive RCS campaigns with verified branding, rich media, and CTA buttons. ₹0.16/msg. Min 50,000 messages. Full campaign management free.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'RCS Messaging Service',
  description:
    'Bulk RCS messaging service for businesses in India. Send verified, interactive, rich media business messages with CTA buttons and carousels directly to Android users.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: {
    '@type': 'Offer',
    price: '0.16',
    priceCurrency: 'INR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '0.16',
      priceCurrency: 'INR',
      unitText: 'per message',
      minPrice: '8000',
    },
    description: 'Minimum order 50,000 messages. Full campaign management included free.',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/rcs-messaging`,
}

export default function RCSMessagingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is RCS messaging?","acceptedAnswer":{"@type":"Answer","text":"RCS (Rich Communication Services) is the next evolution of SMS that allows businesses to send rich interactive messages with images, carousels, buttons, and analytics — delivered to the native messaging app without requiring any app download."}},{"@type":"Question","name":"How much does RCS messaging cost?","acceptedAnswer":{"@type":"Answer","text":"RCS messages cost approximately ₹0.16 per delivered message — significantly lower than WhatsApp API at ₹0.82 per marketing conversation. Campaign management fees apply separately."}},{"@type":"Question","name":"What are the benefits of RCS over SMS?","acceptedAnswer":{"@type":"Answer","text":"RCS supports images, videos, carousels, one-tap CTA buttons, verified sender badges, read receipts, delivery confirmation, and campaign analytics — making it 10x more engaging than plain SMS at a similar delivery cost."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"RCS Messaging Services","item":"https://scalifylabs.com/services/rcs-messaging"}]}` }} />
      <RCSPageClient />
    </>
  )
}
