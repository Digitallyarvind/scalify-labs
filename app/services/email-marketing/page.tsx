import type { Metadata } from 'next'
import EmailMarketingPageClient from './EmailMarketingPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Email Marketing Services | Bulk Outreach, SMTP & Automation | Scalify Labs',
  description:
    'Build modern email marketing systems — bulk outreach, cold email, SMTP setup, lead nurturing funnels, CRM automation, and AI-assisted campaigns. Scalify Labs helps businesses build email infrastructure that generates leads and scales revenue.',
  keywords: [
    'email marketing services India',
    'bulk email marketing India',
    'cold email outreach services',
    'SMTP setup services India',
    'email automation agency India',
    'SendGrid setup India',
    'Apollo outreach India',
    'lead nurturing email India',
    'email deliverability optimization',
    'CRM email automation India',
    'B2B email outreach India',
    'email marketing Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/services/email-marketing` },
  openGraph: {
    title: 'Email Marketing & Outreach Systems | Scalify Labs',
    description: 'Bulk outreach infrastructure, SMTP setup, cold email systems, CRM automation, and AI-powered email campaigns for Indian businesses.',
    type: 'website',
    url: `${SITE.url}/services/email-marketing`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Marketing Systems — Scalify Labs',
    description: 'Modern email infrastructure: SMTP, bulk outreach, automation funnels, CRM sync, AI personalization — for Indian businesses serious about scale.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Email Marketing & Outreach Systems',
  description:
    'Bulk email marketing, cold outreach infrastructure, SMTP setup, lead nurturing funnels, CRM email automation, and AI-assisted campaign management for Indian businesses.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/email-marketing`,
  serviceType: ['Email Marketing', 'Bulk Email Outreach', 'SMTP Infrastructure', 'Email Automation', 'CRM Email Integration'],
}

export default function EmailMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EmailMarketingPageClient />
    </>
  )
}
