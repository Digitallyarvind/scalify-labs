import type { Metadata } from 'next'
import SpecializedAdsPageClient from './SpecializedAdsPageClient'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'LinkedIn Ads, Quora Ads, Native Ads & Premium Advertising Platforms | Scalify Labs',
  description:
    'Run targeted advertising campaigns across LinkedIn, Quora, Truecaller, Taboola, Outbrain, ShareChat, and premium native advertising platforms for B2B leads, awareness, and growth.',
  keywords: [
    'LinkedIn Ads agency India',
    'Quora Ads services',
    'native advertising services India',
    'Truecaller Ads',
    'Taboola advertising agency',
    'Outbrain campaign management',
    'B2B advertising services India',
    'premium ad platforms India',
    'LinkedIn advertising India',
    'ShareChat Ads agency',
  ],
  alternates: { canonical: `${SITE.url}/services/specialized-ads` },
  openGraph: {
    title: 'LinkedIn Ads, Quora Ads, Native Ads & Premium Platforms | Scalify Labs',
    description:
      'Multi-platform advertising across LinkedIn, Quora, Truecaller, Taboola, ShareChat, and native networks for B2B targeting, awareness, and niche audience reach.',
    type: 'website',
    url: `${SITE.url}/services/specialized-ads`,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Specialized Advertising Platforms — LinkedIn, Quora, Truecaller & More | Scalify Labs',
    description:
      'B2B targeting, intent-driven advertising, native campaigns, and regional audience reach across premium advertising platforms.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Specialized Advertising Platforms Management',
  description:
    'Performance-focused advertising campaign management across LinkedIn, Quora, Truecaller, Taboola, Outbrain, ShareChat, Moj, and Inshorts for B2B targeting, brand awareness, and niche audience campaigns.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: { '@type': 'Country', name: 'India' },
  url: `${SITE.url}/services/specialized-ads`,
}

export default function SpecializedAdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SpecializedAdsPageClient />
    </>
  )
}
