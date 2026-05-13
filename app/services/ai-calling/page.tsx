import type { Metadata } from 'next'
import AICallingPageClient from './AICallingPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'AI Calling Service in India | AI Voice Agent & Automated Calling Solutions | Scalify Labs',
  description:
    'Automate customer calls using AI voice agents for lead qualification, reminders, follow-ups, appointment booking, customer engagement, and sales workflows. Scalable AI calling systems for businesses.',
  keywords: [
    'AI calling service India',
    'AI voice agent',
    'automated AI calls',
    'AI call automation',
    'AI voice assistant for business',
    'AI calling platform India',
    'conversational AI calling',
    'voice AI automation',
    'AI sales calling',
    'AI follow-up calls',
    'AI calling Ranchi',
    'automated calling system India',
  ],
  alternates: { canonical: `${SITE.url}/services/ai-calling` },
  openGraph: {
    title: 'AI Calling Service in India | AI Voice Agent | Scalify Labs',
    description:
      'AI-powered voice calling for lead qualification, appointment booking, follow-ups, and sales automation. Inbound and outbound calling workflows for Indian businesses.',
    type: 'website',
    url: `${SITE.url}/services/ai-calling`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Calling & Voice Automation | Scalify Labs',
    description:
      'Automate customer conversations using AI voice agents. Lead qualification, reminders, follow-ups, and sales workflows on autopilot.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Calling & Voice Automation Services',
  description:
    'AI-powered automated calling systems using conversational voice AI for lead qualification, appointment booking, customer follow-ups, reminders, and sales outreach workflows.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter AI Calling Plan', price: '15000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
    { '@type': 'Offer', name: 'Growth AI Calling Plan', price: '35000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
    { '@type': 'Offer', name: 'Enterprise AI Calling Plan', description: 'Custom pricing for enterprise-scale AI calling automation' },
  ],
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/ai-calling`,
}

export default function AICallingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AICallingPageClient />
    </>
  )
}
