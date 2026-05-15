import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import LeadToRevenuePageClient from './LeadToRevenuePageClient'

export const metadata: Metadata = {
  title: 'Lead to Revenue Growth System | CRM, Automation & Revenue Growth',
  description:
    'Convert more leads into paying customers with CRM, WhatsApp automation, SEO, ads and connected growth systems. Stop losing revenue to slow follow-up.',
  keywords: [
    'Lead to Revenue System', 'CRM setup India', 'WhatsApp automation business',
    'revenue growth system', 'lead management system', 'marketing automation India',
  ],
  alternates: { canonical: `${SITE.url}/services/lead-to-revenue` },
  openGraph: {
    title: 'Lead to Revenue Growth System | CRM, Automation & Revenue Growth',
    description: 'Connected growth system: CRM + WhatsApp + Ads + SEO + Analytics. Stop losing leads. Start closing revenue.',
    url: `${SITE.url}/services/lead-to-revenue`, type: 'website', siteName: SITE.name,
  },
}

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the Lead to Revenue system?', acceptedAnswer: { '@type': 'Answer', text: 'A managed growth system at ₹75,000/month connecting CRM, Google Ads, Meta Ads, WhatsApp automation, SEO, and analytics. Ad spend billed separately.' } },
    { '@type': 'Question', name: 'Is ad spend included in ₹75,000/month?', acceptedAnswer: { '@type': 'Answer', text: 'No. The fee covers strategy, CRM, automation, SEO, and reporting. Ad spend goes directly to Google/Meta for full transparency.' } },
    { '@type': 'Question', name: 'How fast can I see results?', acceptedAnswer: { '@type': 'Answer', text: 'Most clients see measurable improvement in lead response time and conversion within 30 days. Significant revenue impact typically shows in 60-90 days.' } },
    { '@type': 'Question', name: 'Who is this for?', acceptedAnswer: { '@type': 'Answer', text: 'Businesses generating 30+ leads/month struggling to convert them. Ideal for clinics, education, real estate, and service companies.' } },
    { '@type': 'Question', name: 'Do I need existing CRM or ads?', acceptedAnswer: { '@type': 'Answer', text: 'No. We set up everything — CRM, ad campaigns, WhatsApp automation, and reporting dashboards.' } },
  ],
}

export default function LeadToRevenuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LeadToRevenuePageClient />
    </>
  )
}
