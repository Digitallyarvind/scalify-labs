import type { Metadata } from 'next'
import GoogleAdsPageClient from './GoogleAdsPageClient'
import { SITE } from '@/lib/data'
import { faqPageSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Google Ads Management Services | Lead Generation & PPC Growth | Scalify Labs',
  description: 'Run high-converting Google Ads campaigns for leads, calls, sales, and business growth. Search Ads, YouTube Ads, Performance Max, remarketing, and conversion-focused campaign management for Indian businesses.',
  keywords: ['Google Ads services India','PPC management services','Google Ads agency India','lead generation ads','Search Ads management','YouTube Ads service','Google PPC company India','Google Ads Ranchi'],
  alternates: { canonical: `${SITE.url}/services/google-ads-services` },
  openGraph: { title: 'Google Ads Management Services | Scalify Labs', description: 'Performance-focused Google Ads — Search, YouTube, Display, Performance Max, remarketing. Built for leads and business growth.', type: 'website', url: `${SITE.url}/services/google-ads-services`, siteName: SITE.name },
}

const FAQS = [
  { q: 'How much does Google Ads management cost at Scalify Labs?', a: 'Scalify Labs charges ₹10,000/month for ad budgets up to ₹50,000/month. For higher budgets, the management fee is 20% of ad spend. Note: ad spend is billed separately directly to Google.' },
  { q: 'What types of Google Ads campaigns does Scalify Labs manage?', a: 'We manage Search Ads, Display Ads, YouTube Ads, Shopping Ads, Performance Max campaigns, Local campaigns, remarketing campaigns, and call-only campaigns across all Google properties.' },
  { q: 'How soon will I see results from Google Ads?', a: 'Google Ads can start generating leads within 24–48 hours of campaign launch. For optimization and stable ROI, typically 2–4 weeks of data collection and testing is needed. Most clients see measurable improvement in cost-per-lead within the first month.' },
  { q: 'Does Scalify Labs handle conversion tracking?', a: 'Yes. We set up complete conversion tracking including Google Tag Manager, call tracking, form submission tracking, WhatsApp click tracking, and CRM integration so you can see exactly which ads generate leads and sales.' },
  { q: 'Can Scalify Labs manage Google Ads for local businesses in Ranchi?', a: 'Absolutely. We specialize in local Google Ads campaigns for businesses in Ranchi, Jamshedpur, Dhanbad, Patna, and across Jharkhand and Bihar — targeting your specific city, service area, and customer demographics.' },
]

export default function GoogleAdsPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Google Ads Management Services',
      description: 'Performance-focused Google Ads campaign management including Search, YouTube, Display, Performance Max, remarketing, and call campaigns.',
      provider: { '@id': `${SITE.url}/#organization` },
      offers: [
        { '@type': 'Offer', name: 'Starter', price: '10000', priceCurrency: 'INR', description: 'For ad budgets up to ₹50,000/month' },
        { '@type': 'Offer', name: 'Growth', description: '20% management fee on ad spend above ₹50,000/month' },
      ],
      areaServed: { '@type': 'Country', name: 'India' },
      url: `${SITE.url}/services/google-ads-services`,
    },
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: SITE.url },
      { name: 'Services', url: `${SITE.url}/services/google-ads-services` },
      { name: 'Google Ads Management', url: `${SITE.url}/services/google-ads-services` },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <GoogleAdsPageClient />
    </>
  )
}
