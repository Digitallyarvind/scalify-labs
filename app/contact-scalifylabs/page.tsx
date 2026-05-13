import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact Scalify Labs | Book Free Growth Strategy Call | Ranchi, India',
  description:
    'Start a growth conversation with Scalify Labs. Book a free strategy call to discuss SEO, Google Ads, CRM automation, WhatsApp marketing, AI workflows, and connected growth systems for your business. Based in Ranchi, serving all of India.',
  keywords: [
    'contact Scalify Labs',
    'book strategy call digital marketing',
    'free digital marketing consultation India',
    'CRM automation consultation Ranchi',
    'Google Ads consultation India',
    'WhatsApp marketing consultation',
    'growth systems consultation Jharkhand',
    'digital marketing agency contact Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/contact-scalifylabs` },
  openGraph: {
    title: 'Contact Scalify Labs | Start a Growth Systems Conversation',
    description: 'Book a free strategy call with the Scalify Labs team. SEO, ads, CRM, WhatsApp automation, AI workflows — connected growth infrastructure for your business.',
    url: `${SITE.url}/contact-scalifylabs`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Scalify Labs | Free Growth Strategy Call',
    description: 'Start a growth conversation. Book a free 30-min strategy call — SEO, Google Ads, CRM automation, WhatsApp, AI workflows from Ranchi, India.',
  },
}

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE.name}`,
    description: 'Book a free growth strategy consultation with Scalify Labs. CRM automation, SEO, Google Ads, WhatsApp marketing, AI workflows.',
    url: `${SITE.url}/contact-scalifylabs`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        addressRegion: SITE.state,
        addressCountry: 'IN',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactPageClient />
    </>
  )
}
