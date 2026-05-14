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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What email marketing services does Scalify Labs offer?","acceptedAnswer":{"@type":"Answer","text":"Scalify Labs offers bulk email campaigns, cold email outreach (Apollo, Instantly, Lemlist), SMTP server setup, SendGrid integration, lead nurturing funnels, email automation, CRM email workflows, AI-personalized sequences, newsletter systems, domain warmup, and deliverability optimization."}},{"@type":"Question","name":"What platforms does Scalify Labs use for email marketing?","acceptedAnswer":{"@type":"Answer","text":"Email and SMTP: SendGrid, Mailgun, Amazon SES, Brevo, Mailchimp, HubSpot, ActiveCampaign, MailerLite. Cold outreach: Apollo, Instantly, Lemlist, Smartlead. Automation: Zapier, Make.com, n8n. AI: ChatGPT, Claude, Gemini for content personalization."}},{"@type":"Question","name":"What open rates can I expect?","acceptedAnswer":{"@type":"Answer","text":"With proper SMTP setup, domain warmup, and AI personalization, clients typically achieve 40%+ open rates versus the industry average of 20%. Cold email outreach campaigns achieve 30–45% open rates with proper infrastructure and personalization."}},{"@type":"Question","name":"Does Scalify Labs set up SMTP infrastructure?","acceptedAnswer":{"@type":"Answer","text":"Yes — Scalify Labs sets up dedicated SMTP servers including SPF, DKIM, and DMARC authentication, domain warmup protocols, sending reputation management, inbox monitoring, and multi-domain scaling for high-volume outreach."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Email Marketing Services","item":"https://scalifylabs.com/services/email-marketing"}]}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <EmailMarketingPageClient />
    </>
  )
}
