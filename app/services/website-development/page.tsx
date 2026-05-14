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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What types of websites does Scalify Labs build?","acceptedAnswer":{"@type":"Answer","text":"Scalify Labs builds business websites, service business websites, landing pages for campaigns, education and coaching websites, clinic and healthcare websites, real estate websites, and ecommerce websites — all conversion-focused with lead capture and SEO built in."}},{"@type":"Question","name":"How long does website development take?","acceptedAnswer":{"@type":"Answer","text":"A standard 5–10 page business website typically takes 2–3 weeks. Landing pages: 3–5 days. eCommerce websites: 4–6 weeks. Timelines depend on content readiness and revision cycles."}},{"@type":"Question","name":"Does Scalify Labs include SEO in website development?","acceptedAnswer":{"@type":"Answer","text":"Yes — every website includes: on-page SEO for all pages, structured data (schema markup), mobile-first responsive design, sub-2-second load speed, Google Analytics and Search Console setup, and proper meta tags and canonical URLs."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Website Development","item":"https://scalifylabs.com/services/website-development"}]}` }} />
      <WebDevPageClient />
    </>
  )
}
