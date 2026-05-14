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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What specialized advertising platforms does Scalify Labs manage?","acceptedAnswer":{"@type":"Answer","text":"Scalify Labs manages LinkedIn Ads (B2B targeting), Quora Ads (intent-based advertising), Truecaller Ads (caller ID advertising), Taboola native ads, Outbrain native ads, ShareChat regional ads, Moj ads, and Inshorts sponsored content."}},{"@type":"Question","name":"When should I use LinkedIn Ads vs Google Ads?","acceptedAnswer":{"@type":"Answer","text":"LinkedIn Ads are best for B2B businesses targeting professionals by job title, company, industry, or seniority. Google Ads are better for capturing high-intent customers actively searching for your product. LinkedIn typically has higher CPL but better B2B quality."}},{"@type":"Question","name":"What is native advertising and how does it work?","acceptedAnswer":{"@type":"Answer","text":"Native advertising (Taboola, Outbrain) shows your content as recommended articles on major news and media websites. It blends with editorial content making it less intrusive and better for awareness and content marketing goals than traditional display ads."}}]}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://scalifylabs.com"},{"@type":"ListItem","position":2,"name":"Specialized Advertising Platforms","item":"https://scalifylabs.com/services/specialized-ads"}]}` }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SpecializedAdsPageClient />
    </>
  )
}
