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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How can I contact Scalify Labs?","acceptedAnswer":{"@type":"Answer","text":"Phone and WhatsApp: +91 87884 24727. Email: hello@scalifylabs.com. Office: Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu, Ranchi 835222, Jharkhand. Working hours: Monday to Saturday, 10 AM to 7 PM IST."}},{"@type":"Question","name":"Does Scalify Labs offer free consultations?","acceptedAnswer":{"@type":"Answer","text":"Yes — all initial strategy calls are completely free. A 30-minute session covers business goals, current marketing setup, and growth challenges before any recommendations or pricing is shared."}},{"@type":"Question","name":"Can Scalify Labs work with businesses outside Ranchi?","acceptedAnswer":{"@type":"Answer","text":"Yes — all services are delivered remotely. Scalify Labs serves businesses across India including Delhi, Mumbai, Bangalore, Pune, Patna, Jamshedpur, and beyond."}},{"@type":"Question","name":"How quickly does Scalify Labs respond to inquiries?","acceptedAnswer":{"@type":"Answer","text":"WhatsApp inquiries are answered within 2 hours during working hours. Form submissions and emails are responded to within 24 hours. For urgent queries, WhatsApp at +91 87884 24727 is the fastest channel."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Contact Scalify Labs","item":"https://scalifylabs.com/contact-scalifylabs"}]}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactPageClient />
    </>
  )
}
