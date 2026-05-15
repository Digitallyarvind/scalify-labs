import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import FounderClient from './FounderClient'

export const metadata: Metadata = {
  title: 'Arvind Gupta | Founder, ScalifyLabs — Growth Systems Builder',
  description:
    'Meet Arvind Gupta — Founder of ScalifyLabs. 17+ years across marketing, growth systems, education, CRM automation, SEO and digital transformation.',
  keywords: [
    'Arvind Gupta ScalifyLabs', 'ScalifyLabs founder', 'growth systems builder Ranchi',
    'digital marketing expert Jharkhand', 'CRM automation specialist India',
    'performance marketing expert', 'SEO consultant Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/founder/arvind-gupta` },
  openGraph: {
    title: 'Arvind Gupta | Founder, ScalifyLabs — Growth Systems Builder',
    description: '17+ years across banking, education, performance marketing, CRM automation and community building. Founder of ScalifyLabs.',
    url: `${SITE.url}/founder/arvind-gupta`, type: 'profile', siteName: SITE.name,
  },
}

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/founder/arvind-gupta`,
    name: 'Arvind Gupta',
    jobTitle: 'Founder',
    worksFor: { '@type': 'Organization', name: 'ScalifyLabs', url: SITE.url },
    url: `${SITE.url}/founder/arvind-gupta`,
    sameAs: ['https://www.linkedin.com/in/digitallyarvind', SITE.url],
    knowsAbout: ['SEO', 'Google Ads', 'Meta Ads', 'CRM Automation', 'WhatsApp Marketing', 'Growth Systems', 'Community Building', 'Performance Marketing'],
    description: '17+ years across banking, education, performance marketing, CRM automation and community building. Founder of ScalifyLabs.',
    address: { '@type': 'PostalAddress', addressLocality: 'Ranchi', addressRegion: 'Jharkhand', addressCountry: 'IN' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Who is Arvind Gupta?', acceptedAnswer: { '@type': 'Answer', text: 'Arvind Gupta is the founder of ScalifyLabs, a growth systems company based in Ranchi, Jharkhand. He has 17+ years of experience across banking, education, performance marketing, CRM automation, SEO, and community building.' } },
      { '@type': 'Question', name: 'What industries has Arvind Gupta worked with?', acceptedAnswer: { '@type': 'Answer', text: 'Banking (ICICI Bank), education (IMS Proschool, Imarticus Learning), career services (Dheya Career Mentors), higher education (KK Modi University), healthcare, real estate, retail, and local businesses.' } },
      { '@type': 'Question', name: 'Does Arvind Gupta provide consulting?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Through ScalifyLabs, Arvind provides growth system consulting including SEO strategy, CRM setup, performance marketing, WhatsApp automation, and connected growth infrastructure.' } },
      { '@type': 'Question', name: 'What is ScalifyLabs?', acceptedAnswer: { '@type': 'Answer', text: 'ScalifyLabs is a growth systems company founded by Arvind Gupta in Ranchi, Jharkhand. It builds connected growth systems — SEO, ads, CRM, WhatsApp automation, websites and AI workflows — for businesses across India.' } },
      { '@type': 'Question', name: 'What are Arvind Gupta\'s main expertise areas?', acceptedAnswer: { '@type': 'Answer', text: 'Performance marketing (Google Ads, Meta Ads), SEO and organic growth, CRM and automation, community building, education marketing, analytics (GA4, GSC), AI workflows, and growth system design.' } },
    ],
  },
]

export default function FounderPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <FounderClient />
    </>
  )
}
