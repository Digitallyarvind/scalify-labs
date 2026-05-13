import type { Metadata } from 'next'
import MetaAdsPageClient from './MetaAdsPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Meta Ads Management Services | Facebook & Instagram Ads | Scalify Labs',
  description:
    'Scale your business with Facebook and Instagram Ads focused on leads, sales, bookings, and growth. Meta Ads management for ecommerce, local businesses, clinics, education, and brands.',
  keywords: [
    'Meta Ads services India',
    'Facebook Ads agency India',
    'Instagram Ads management',
    'Meta Ads company India',
    'Facebook lead generation',
    'Instagram marketing agency',
    'Facebook advertising services',
    'Meta marketing agency India',
    'Facebook Ads Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/services/meta-ads` },
  openGraph: {
    title: 'Meta Ads Management Services | Facebook & Instagram Ads | Scalify Labs',
    description:
      'Performance-focused Meta Ads — Facebook, Instagram, Reels, Lead Gen, Ecommerce campaigns. Built for customer acquisition and business growth.',
    type: 'website',
    url: `${SITE.url}/services/meta-ads`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meta Ads | Facebook & Instagram Advertising | Scalify Labs',
    description:
      'Facebook and Instagram Ads management for leads, sales, and brand growth. Management from ₹10,000/month. 4–5 static creatives included.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Meta Ads Management Services',
  description:
    'Performance-focused Meta Ads management including Facebook Ads, Instagram Ads, Lead Generation, Reels Ads, Remarketing, and Ecommerce campaigns for business growth.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter Meta Ads Management', price: '10000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month', description: 'For ad budgets up to ₹50,000/month. Includes 4–5 static creatives.' } },
    { '@type': 'Offer', name: 'Scaling Meta Ads Management', description: '20% management fee on ad spend above ₹50,000/month' },
  ],
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/meta-ads`,
}

export default function MetaAdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MetaAdsPageClient />
    </>
  )
}
