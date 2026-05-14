import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import SocialMediaClient from './SocialMediaClient'

export const metadata: Metadata = {
  title: 'Social Media Marketing Services for Local Businesses | ScalifyLabs',
  description:
    'Get leads, not just likes. Affordable social media marketing plans for schools, clinics, real estate & SMBs. Starting ₹9,999/month.',
  keywords: [
    'social media marketing services India',
    'social media marketing for schools',
    'social media marketing for clinics',
    'SMB social media marketing',
    'affordable SMM agency India',
    'social media marketing Ranchi',
    'local business social media',
    'Facebook Instagram marketing India',
  ],
  alternates: { canonical: `${SITE.url}/social-media-marketing` },
  openGraph: {
    title: 'Social Media Marketing Services for Local Businesses | ScalifyLabs',
    description:
      'Affordable social media marketing for schools, clinics, real estate & SMBs. Starting ₹9,999/month.',
    url: `${SITE.url}/social-media-marketing`,
    type: 'website',
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Marketing Services | ScalifyLabs',
    description: 'Get leads, not just likes. Plans from ₹9,999/month for local businesses.',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media Marketing Services',
  description:
    'Complete social media marketing: strategy, content creation, page management, paid ads on Facebook, Instagram & LinkedIn, WhatsApp integration, and monthly reporting.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter Plan', price: '9999', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
    { '@type': 'Offer', name: 'Growth Plan', price: '19999', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
    { '@type': 'Offer', name: 'Scale Plan', price: '29999', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month' } },
  ],
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/social-media-marketing`,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is included in social media management?', acceptedAnswer: { '@type': 'Answer', text: 'Depending on plan: content calendar, custom graphics, captions, hashtags, FB/IG/LinkedIn management, inbox replies, paid ad campaigns, WhatsApp integration, and monthly performance reports.' } },
    { '@type': 'Question', name: 'How many posts per month do I get?', acceptedAnswer: { '@type': 'Answer', text: 'Starter: 12 posts/month. Growth: 20 posts + Reels/Stories. Scale: 30+ posts including daily content, Reels, Stories, and YouTube Shorts.' } },
    { '@type': 'Question', name: 'Is ad spend included in the plan price?', acceptedAnswer: { '@type': 'Answer', text: 'No. Ad spend is billed directly to Meta/Google platforms. ScalifyLabs fees cover strategy, creatives, and management only — ensuring full transparency.' } },
    { '@type': 'Question', name: 'Which platforms do you manage?', acceptedAnswer: { '@type': 'Answer', text: 'Starter & Growth: Facebook and Instagram. Growth also includes LinkedIn. Scale includes Facebook, Instagram, LinkedIn, and YouTube Shorts.' } },
    { '@type': 'Question', name: 'Can social media actually generate leads for local businesses?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. With a proper local lead-gen strategy — targeted content, paid ads, WhatsApp CTAs, and CRM integration — social media consistently generates qualified local leads.' } },
  ],
}

export default function SocialMediaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
          { '@type': 'ListItem', position: 3, name: 'Social Media Marketing', item: `${SITE.url}/social-media-marketing` },
        ],
      }) }} />
      <SocialMediaClient />
    </>
  )
}
