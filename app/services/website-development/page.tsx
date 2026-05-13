import type { Metadata } from 'next'
import WebDevPageClient from './WebDevPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Website Development Services | Business Websites, Automation & Lead Systems | Scalify Labs',
  description:
    'Build modern business websites with lead management, automation, blog systems, CRM integration, and scalable infrastructure using WordPress or AI-assisted development workflows.',
  keywords: [
    'website development services India',
    'business website development',
    'WordPress development India',
    'AI website development',
    'lead generation website',
    'website automation services',
    'business website company India',
    'custom website development',
    'website with CRM integration',
    'website development Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/services/website-development` },
  openGraph: {
    title: 'Website Development | Business Websites, Automation & Lead Systems | Scalify Labs',
    description:
      'Growth-focused websites with lead management, CRM integration, automation workflows, and blog systems. WordPress and AI-assisted development.',
    type: 'website',
    url: `${SITE.url}/services/website-development`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Website Development with Automation & Lead Systems | Scalify Labs',
    description:
      'Websites built as business growth systems — lead capture, CRM integration, automation workflows, blog systems, and scalable digital infrastructure.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website Development Services',
  description:
    'Modern business website development with integrated lead management, CRM systems, WhatsApp automation, blog systems, and scalable digital infrastructure using WordPress and AI-assisted workflows.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/website-development`,
}

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WebDevPageClient />
    </>
  )
}
