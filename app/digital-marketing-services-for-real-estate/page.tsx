import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import RealEstateFunnelClient from './RealEstateFunnelClient'

export const metadata: Metadata = {
  title: 'Real Estate Growth Funnel — Verified Buyer Leads | ScalifyLabs',
  description:
    'Scalify Labs offers digital marketing services for real estate. Get verified buyer leads, more site visits & faster closings with SEO, ads, WhatsApp & CRM.',
  keywords: [
    'digital marketing services for real estate',
    'real estate lead generation',
    'verified buyer leads',
    'real estate SEO India',
    'CRM for real estate',
    'WhatsApp marketing real estate',
    'real estate digital marketing Ranchi',
    'property lead generation India',
  ],
  alternates: { canonical: `${SITE.url}/digital-marketing-services-for-real-estate` },
  openGraph: {
    title: 'Real Estate Growth Funnel — Verified Buyer Leads | ScalifyLabs',
    description:
      'Get verified buyer leads, more site visits & faster closings with SEO, ads, WhatsApp & CRM — all in one real estate growth funnel.',
    url: `${SITE.url}/digital-marketing-services-for-real-estate`,
    type: 'website',
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Growth Funnel — Verified Buyer Leads | ScalifyLabs',
    description:
      'Digital marketing services for real estate. Verified buyer leads, site visits & faster closings.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Real Estate Digital Marketing & Growth Funnel',
  description:
    'Complete digital marketing funnel for real estate: SEO, Google & Meta Ads, AI lead qualification, WhatsApp automation, and CRM integration to generate verified buyer leads and increase site visits.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/digital-marketing-services-for-real-estate`,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do you provide verified buyer leads for real estate?', acceptedAnswer: { '@type': 'Answer', text: 'We qualify leads with AI calls and WhatsApp checks before passing them to your sales team. Only serious, verified buyers reach you.' } },
    { '@type': 'Question', name: 'Can you reduce fake portal leads?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We filter non-serious leads before they reach your sales team using AI qualification calls and WhatsApp engagement checks.' } },
    { '@type': 'Question', name: 'How do WhatsApp reminders help sell properties faster?', acceptedAnswer: { '@type': 'Answer', text: 'Buyers are nudged via automated WhatsApp reminders for site visits and follow-ups, resulting in more confirmed visits and faster closings.' } },
    { '@type': 'Question', name: 'Do you integrate with my existing CRM?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We connect to your existing CRM or provide a lightweight CRM dashboard — tracking every lead from first enquiry to deal closed.' } },
    { '@type': 'Question', name: 'Do influencer videos really convert to property sales?', acceptedAnswer: { '@type': 'Answer', text: 'Only when part of a complete system. We integrate influencer content into SEO, ads, WhatsApp nurturing, and CRM follow-up — turning views into verified site visits.' } },
  ],
}

export default function RealEstateFunnelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE.url}/#industries` },
          { '@type': 'ListItem', position: 3, name: 'Real Estate Growth Funnel', item: `${SITE.url}/digital-marketing-services-for-real-estate` },
        ],
      }) }} />
      <RealEstateFunnelClient />
    </>
  )
}
