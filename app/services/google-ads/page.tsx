import type { Metadata } from 'next'
import GoogleAdsPageClient from './GoogleAdsPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Google Ads Management Services | Lead Generation & PPC Growth | Scalify Labs',
  description:
    'Run high-converting Google Ads campaigns for leads, calls, sales, and business growth. Search Ads, YouTube Ads, Performance Max, local ads, remarketing, and conversion-focused campaign management.',
  keywords: [
    'Google Ads services India',
    'PPC management services',
    'Google Ads agency India',
    'lead generation ads',
    'Search Ads management',
    'YouTube Ads service',
    'Google PPC company India',
    'Google Ads company India',
    'Performance Max campaigns',
    'Google Ads Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/services/google-ads` },
  openGraph: {
    title: 'Google Ads Management Services | Lead Generation & PPC Growth | Scalify Labs',
    description:
      'Performance-focused Google Ads management — Search, YouTube, Display, Performance Max, remarketing. Built for leads, calls, and business growth.',
    type: 'website',
    url: `${SITE.url}/services/google-ads`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Management | PPC Growth & Lead Generation | Scalify Labs',
    description:
      'High-converting Google Ads campaigns for leads, calls, and business growth. Management from ₹10,000/month.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google Ads Management Services',
  description:
    'Performance-focused Google Ads campaign management including Search Ads, YouTube Ads, Display, Performance Max, remarketing, and call campaigns for lead generation and business growth.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  offers: [
    { '@type': 'Offer', name: 'Starter Campaign Management', price: '10000', priceCurrency: 'INR', priceSpecification: { '@type': 'UnitPriceSpecification', unitText: 'per month', description: 'For ad budgets up to ₹50,000/month' } },
    { '@type': 'Offer', name: 'Scaling Campaign Management', description: '20% management fee on ad spend above ₹50,000/month' },
  ],
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/google-ads`,
}

export default function GoogleAdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GoogleAdsPageClient />
    </>
  )
}
