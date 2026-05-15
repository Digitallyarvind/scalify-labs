import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import WhyScalifyPageClient from './WhyScalifyPageClient'

export const metadata: Metadata = {
  title: 'Why Choose ScalifyLabs | Growth Systems, CRM, SEO & Automation Company in Jharkhand',
  description:
    'Learn why businesses choose ScalifyLabs for connected growth systems including SEO, CRM, lead generation, WhatsApp automation, websites and AI workflows. Helping Jharkhand businesses scale digitally.',
  keywords: [
    'Why Choose ScalifyLabs', 'Growth systems company in Jharkhand',
    'Digital growth partner Ranchi', 'CRM automation company',
    'SEO and lead generation company', 'Business automation services',
    'Lead generation company Jharkhand',
  ],
  alternates: { canonical: `${SITE.url}/why-scalify` },
  openGraph: {
    title: 'Why Choose ScalifyLabs | Growth Systems Company in Jharkhand',
    description: 'Connected growth systems: SEO, CRM, WhatsApp automation, lead generation, websites and AI workflows for Indian businesses.',
    url: `${SITE.url}/why-scalify`, type: 'website', siteName: SITE.name,
  },
}

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Why choose ScalifyLabs over a traditional agency?', acceptedAnswer: { '@type': 'Answer', text: 'ScalifyLabs builds connected growth systems — SEO, CRM, WhatsApp automation, ads and websites working together. Traditional agencies manage isolated campaigns without connecting the full lead-to-revenue pipeline.' } },
    { '@type': 'Question', name: 'What industries does ScalifyLabs work with?', acceptedAnswer: { '@type': 'Answer', text: 'We work with healthcare clinics, education institutes, real estate developers, retail brands, local businesses, furniture companies, and SMEs across Jharkhand and India.' } },
    { '@type': 'Question', name: 'Does ScalifyLabs offer CRM setup and management?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We set up and manage CRM systems including Kylas, TeleCRM and Zoho — integrated with WhatsApp, ads, and lead capture for a complete pipeline.' } },
    { '@type': 'Question', name: 'Do you provide SEO services?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We provide technical SEO, local SEO, Google Business Profile optimisation, and content SEO — all designed to drive consistent organic traffic and local visibility.' } },
    { '@type': 'Question', name: 'Do you help local businesses in Ranchi and Jharkhand?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Local business growth in Ranchi, Jamshedpur, Dhanbad and across Jharkhand is our core focus. We understand local markets, seasonal patterns and buyer behaviour.' } },
    { '@type': 'Question', name: 'Do you provide WhatsApp automation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We set up WhatsApp Business API systems including instant lead response, nurture sequences, appointment reminders, and CRM integration using WATI, Interakt, or AiSensy.' } },
    { '@type': 'Question', name: 'What is a connected growth system?', acceptedAnswer: { '@type': 'Answer', text: 'A connected growth system links every stage of your customer journey — traffic, website, lead capture, CRM, WhatsApp follow-up, automation, and reporting — so no lead is lost and every channel feeds the next.' } },
  ],
}

export default function WhyScalifyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: SITE.name, url: SITE.url,
        description: 'Growth systems company in Jharkhand building connected SEO, CRM, automation and lead generation systems for businesses.',
        areaServed: [{ '@type': 'State', name: 'Jharkhand' }, { '@type': 'Country', name: 'India' }],
        knowsAbout: ['SEO', 'Google Ads', 'Meta Ads', 'CRM Automation', 'WhatsApp Marketing', 'Lead Generation', 'Website Development'],
      }) }} />
      <WhyScalifyPageClient />
    </>
  )
}
