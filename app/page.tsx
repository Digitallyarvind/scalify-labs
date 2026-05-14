import type { Metadata } from 'next'
import HomepageClient from './HomepageClient'
import { SITE } from '@/lib/data'
import { faqPageSchema, speakableSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Scalify Labs | AI-Powered Digital Growth & Lead Generation Systems',
  description:
    'Scalify Labs helps businesses grow through SEO, Google Ads, CRM automation, WhatsApp marketing, AI workflows, and lead-to-revenue systems. #1 Digital Marketing Agency in Ranchi, Jharkhand.',
  keywords: [
    'Digital Marketing Agency in Ranchi',
    'SEO Services in Ranchi',
    'Google Ads Agency Ranchi',
    'CRM Automation Services India',
    'WhatsApp Marketing Services',
    'AI Marketing Agency India',
    'Lead Generation Company Ranchi',
    'Local SEO Services Jharkhand',
    'Growth Marketing Agency India',
    'Lead to Revenue System',
    'Performance Marketing Agency',
    'Website Development Company Ranchi',
    'AI Automation Services India',
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'Scalify Labs | AI-Powered Growth & Lead Generation Systems',
    description: 'Connected growth infrastructure for Indian businesses — SEO, Google Ads, CRM automation, WhatsApp marketing, AI workflows, and lead-to-revenue systems.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    images: [{ url: `${SITE.url}/og-image.jpg`, width: 1200, height: 630, alt: 'Scalify Labs — Growth Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scalify Labs | AI-Powered Digital Growth Systems',
    description: 'We build connected growth systems — SEO · Google Ads · CRM · WhatsApp · AI Workflows. Based in Ranchi, Jharkhand.',
    images: [`${SITE.url}/og-image.jpg`],
  },
}

const HOME_FAQS = [
  {
    q: 'What is Scalify Labs?',
    a: 'Scalify Labs is a digital growth infrastructure company based in Ranchi, Jharkhand, India. Founded by Arvind Gupta, it helps Indian businesses build connected growth systems combining SEO, Google Ads, Meta Ads, CRM automation, WhatsApp marketing, AI workflows, and lead nurturing into one integrated system.',
  },
  {
    q: 'What services does Scalify Labs offer?',
    a: 'Scalify Labs offers SEO services, Google Ads management, Meta Ads management, WhatsApp automation, CRM setup and automation, email marketing, AI calling systems, RCS messaging, OBD voice calls, website development, local SEO & Google Business Profile optimization, specialized advertising (LinkedIn, Quora, Truecaller), and a complete Lead to Revenue growth system.',
  },
  {
    q: 'Where is Scalify Labs located?',
    a: 'Scalify Labs is headquartered at Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu, Ranchi 835222, Jharkhand, India. The team serves businesses across India including Delhi, Mumbai, Bangalore, Pune, Patna, Jamshedpur, Dhanbad, and other cities.',
  },
  {
    q: 'Who is the founder of Scalify Labs?',
    a: 'Arvind Gupta is the founder and growth strategist of Scalify Labs. He has 15+ years of experience in digital marketing, CRM systems, automation, EdTech growth, and performance marketing. He previously helped build the Dheya mentor ecosystem — one of India\'s largest career mentoring communities.',
  },
  {
    q: 'What is the Lead to Revenue system?',
    a: 'The Lead to Revenue system is Scalify Labs\' flagship offering — a complete connected growth infrastructure at ₹75,000/month. It combines SEO, paid ads (Google + Meta), CRM setup and management, WhatsApp automation, lead nurturing, analytics, and sales process optimization into one managed system for scaling businesses.',
  },
  {
    q: 'Does Scalify Labs work with small businesses?',
    a: 'Yes. Scalify Labs works with businesses of all sizes — from local businesses and startups to multi-location brands and growing companies. Services are available from ₹10,000/month for individual channels (Google Ads, Meta Ads) up to ₹75,000/month for the complete Lead to Revenue growth infrastructure.',
  },
  {
    q: 'What is the Super 30 program by Scalify Labs?',
    a: 'Super 30 is a 45-day offline growth accelerator in Ranchi for aspiring digital marketers. It is a selection-based program with only 30 seats per batch. It covers Google Ads, Meta Ads, SEO, AI tools (ChatGPT, Claude, Gemini), CRM systems, WhatsApp automation, analytics, and business growth strategy with hands-on real campaign execution.',
  },
  {
    q: 'How can I contact Scalify Labs?',
    a: 'You can contact Scalify Labs at: Phone/WhatsApp: +91 87884 24727, Email: hello@scalifylabs.com, Website contact form: scalifylabs.com/contact-scalifylabs, or visit the office at Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu, Ranchi 835222.',
  },
]

export default function HomePage() {
  const schemas = [
    faqPageSchema(HOME_FAQS),
    speakableSchema(['h1', 'h2', '.hero-subtext', 'blockquote'], SITE.url),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <HomepageClient />
    </>
  )
}
