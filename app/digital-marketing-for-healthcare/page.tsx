import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import HealthcareFunnelClient from './HealthcareFunnelClient'

export const metadata: Metadata = {
  title: 'Clinic Growth Funnel — Patient Acquisition & Retention | ScalifyLabs',
  description:
    'Complete clinic marketing funnel: SEO, ads, reviews, WhatsApp reminders & CRM. 10+ clinics served, 1,000+ bookings. Book free call.',
  keywords: [
    'clinic marketing',
    'healthcare digital marketing',
    'patient acquisition',
    'local SEO for clinics',
    'WhatsApp reminders clinic',
    'healthcare CRM',
    'clinic marketing funnel',
    'digital marketing for clinics India',
    'clinic patient booking system',
  ],
  alternates: { canonical: `${SITE.url}/digital-marketing-for-healthcare` },
  openGraph: {
    title: 'Clinic Growth Funnel — Patient Acquisition & Retention | ScalifyLabs',
    description:
      'Fill your clinic with verified local patients. SEO, ads, reviews, WhatsApp reminders & CRM — one complete growth funnel.',
    url: `${SITE.url}/digital-marketing-for-healthcare`,
    type: 'website',
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinic Growth Funnel — Patient Acquisition | ScalifyLabs',
    description:
      'SEO, Google Ads, WhatsApp reminders & CRM for clinics. 1,000+ patient bookings delivered.',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Digital Marketing & Clinic Growth Funnel',
  description:
    'Complete patient acquisition funnel for clinics: Local SEO, Google & Meta Ads, review management, WhatsApp appointment reminders, and CRM dashboard integration.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/digital-marketing-for-healthcare`,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is this different from hiring a regular digital marketing agency?', acceptedAnswer: { '@type': 'Answer', text: "We don't just run ads. We integrate the full funnel — from Google search to WhatsApp reminders — so you get verified patient bookings, not just clicks." } },
    { '@type': 'Question', name: 'Do I need to manage multiple tools separately?', acceptedAnswer: { '@type': 'Answer', text: 'No. We set up and connect everything — SEO, ads, reviews, WhatsApp automation, and CRM. You only focus on treating patients.' } },
    { '@type': 'Question', name: 'How quickly can a clinic see results?', acceptedAnswer: { '@type': 'Answer', text: 'Most clinics see increased calls and bookings within 30–60 days of the funnel going live. Reviews and local SEO continue compounding over 3–6 months.' } },
    { '@type': 'Question', name: 'Can you handle multiple clinic branches?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We provide branch-wise funnels and reporting — each location tracked separately with its own lead source and booking data.' } },
    { '@type': 'Question', name: 'Do reviews really impact patient bookings?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Over 80% of patients choose a clinic based on online reviews. We actively collect and showcase 5-star ratings on Google and other platforms.' } },
  ],
}

export default function HealthcareFunnelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE.url}/#industries` },
          { '@type': 'ListItem', position: 3, name: 'Healthcare Solutions', item: `${SITE.url}/digital-marketing-for-healthcare` },
        ],
      }) }} />
      <HealthcareFunnelClient />
    </>
  )
}
