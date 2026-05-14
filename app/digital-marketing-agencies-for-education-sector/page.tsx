import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import EducationFunnelClient from './EducationFunnelClient'

export const metadata: Metadata = {
  title: 'Digital Marketing Agency for Education Sector | ScalifyLabs',
  description:
    'ScalifyLabs — trusted digital marketing agency for education sector. Student lead generation & admission funnels for schools, colleges & coaching.',
  keywords: [
    'digital marketing agency for education sector',
    'education digital marketing India',
    'student enrollment marketing',
    'lead generation for schools',
    'school admission marketing',
    'coaching digital marketing',
    'career coach marketing',
    'admission consultant digital marketing',
    'education marketing agency Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/digital-marketing-agencies-for-education-sector` },
  openGraph: {
    title: 'Digital Marketing Agency for Education Sector | ScalifyLabs',
    description: 'Fill every seat with verified student leads. Admission funnels for preschools, schools, colleges, coaching & EdTech — ScalifyLabs.',
    url: `${SITE.url}/digital-marketing-agencies-for-education-sector`,
    type: 'website',
    siteName: SITE.name,
  },
}

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Marketing for Education Sector',
    description: 'Student lead generation, admission funnels, CRM, WhatsApp automation, and SEO for schools, colleges, coaching institutes, and EdTech.',
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: { '@type': 'Country', name: 'India' },
    url: `${SITE.url}/digital-marketing-agencies-for-education-sector`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Why not hire a general digital marketing agency for education?', acceptedAnswer: { '@type': 'Answer', text: 'Generalist agencies treat education like e-commerce. They focus on clicks, not admissions. ScalifyLabs is built specifically for student enrollment funnels — from parent trust-building to counsellor handoff.' } },
      { '@type': 'Question', name: 'Do you provide verified student leads?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All leads are verified via form submissions, WhatsApp qualification, and AI nurturing sequences — only genuinely interested students reach your counselling team.' } },
      { '@type': 'Question', name: 'When should education marketing start?', acceptedAnswer: { '@type': 'Answer', text: 'Ideally 3–6 months before the academic year begins. Early campaigns build awareness; closer to admission season, campaigns shift to high-intent conversion.' } },
      { '@type': 'Question', name: 'Do you manage both online and offline marketing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build integrated strategies covering Google Ads, Meta Ads, SEO, WhatsApp automation, offline event support, and CRM tracking.' } },
      { '@type': 'Question', name: 'What does education digital marketing cost?', acceptedAnswer: { '@type': 'Answer', text: 'Ad spend is billed directly to platforms. ScalifyLabs charges cover funnel strategy, creative execution, campaign management, CRM setup, and monthly reporting.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE.url}/#industries` },
      { '@type': 'ListItem', position: 3, name: 'Education Solutions', item: `${SITE.url}/digital-marketing-agencies-for-education-sector` },
    ],
  },
]

export default function EducationFunnelPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <EducationFunnelClient />
    </>
  )
}
