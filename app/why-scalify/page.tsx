import type { Metadata } from 'next'
import WhyScalifyPageClient from './WhyScalifyPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Why Scalify Labs | Growth Infrastructure Company — Ranchi, Jharkhand',
  description:
    'Scalify Labs is not a traditional digital agency. We build connected growth systems — CRM automation, AI workflows, SEO, and performance marketing — from Ranchi, Jharkhand. Meet the team behind India\'s next generation of growth infrastructure.',
  keywords: [
    'Scalify Labs about',
    'digital marketing agency Jharkhand',
    'CRM automation company India',
    'growth systems Ranchi',
    'Arvind Gupta founder',
    'AI marketing automation India',
    'growth infrastructure company',
    'digital marketing company Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/why-scalify` },
  openGraph: {
    title: 'Why Scalify Labs Exists | Growth Infrastructure from Jharkhand',
    description:
      'Built from 17+ years of real business experience. Scalify Labs connects performance marketing, CRM, AI automation, and SEO into scalable growth systems for Indian businesses.',
    type: 'website',
    url: `${SITE.url}/why-scalify`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Scalify Labs | Growth Systems Company, Jharkhand',
    description:
      'Not a traditional agency. A connected growth infrastructure company — CRM, AI workflows, SEO, performance marketing, and automation from Ranchi, Jharkhand.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Why Scalify Labs Exists',
  description: 'About Scalify Labs — a growth infrastructure company building connected digital systems from Ranchi, Jharkhand.',
  url: `${SITE.url}/why-scalify`,
  mainEntity: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    foundingDate: '2024',
    foundingLocation: { '@type': 'Place', name: 'Ranchi, Jharkhand, India' },
    founder: { '@type': 'Person', name: SITE.founder },
    description: 'Growth infrastructure company combining performance marketing, CRM automation, AI workflows, SEO, and lead nurturing systems.',
    areaServed: { '@type': 'Country', name: 'India' },
  },
}

export default function WhyScalifyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What makes Scalify Labs different from other digital marketing agencies?","acceptedAnswer":{"@type":"Answer","text":"Scalify Labs builds connected growth infrastructure — not isolated services. SEO, ads, CRM, WhatsApp, AI workflows, and analytics work together in one system. This connected approach delivers 2–3x better results than managing separate vendors."}},{"@type":"Question","name":"Who is the founder of Scalify Labs?","acceptedAnswer":{"@type":"Answer","text":"Arvind Gupta is the founder of Scalify Labs with 15+ years of experience in SEO, performance marketing, CRM systems, and EdTech growth. He previously built the Dheya career mentoring ecosystem which scaled to thousands of student interactions across India."}},{"@type":"Question","name":"What is Scalify Labs experience and track record?","acceptedAnswer":{"@type":"Answer","text":"Scalify Labs has 15+ years of combined experience, 100+ businesses helped, 5000+ students guided, and 10,000+ leads generated across education, healthcare, real estate, retail, and service businesses."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Why Scalify Labs","item":"https://scalifylabs.com/why-scalify"}]}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WhyScalifyPageClient />
    </>
  )
}
