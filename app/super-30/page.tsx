import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import Super30PageClient from './Super30PageClient'
import type { Batch } from '@/types/database'

export const metadata: Metadata = {
  title: 'Super 30 — Full Stack Growth Marketer Program | Scalify Labs Ranchi',
  description:
    'Join Super 30 — a 45-day execution-focused growth marketing program covering paid ads, SEO, AI workflows, CRM automation, analytics, and business strategy. Only 30 seats. Apply now.',
  keywords: [
    'Super 30 digital marketing Ranchi',
    'full stack digital marketing course Jharkhand',
    'AI marketing program India',
    'growth marketer training Ranchi',
    'digital marketing course Jharkhand',
    'CRM automation training India',
    'performance marketing course Ranchi',
    'digital marketing mentorship India',
    'SEO training Jharkhand',
    'Google Ads course Ranchi',
  ],
  alternates: { canonical: `${SITE.url}/super-30` },
  openGraph: {
    title: 'Super 30 — Full Stack Growth Marketer Program | Scalify Labs',
    description: '45-day execution-focused program — paid ads, SEO, AI workflows, CRM, analytics. 30 seats only. Selection-based. Based in Ranchi, Jharkhand.',
    url: `${SITE.url}/super-30`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super 30 Growth Marketer Program | Scalify Labs',
    description: 'Become a full stack growth marketer in 45 days. Ads, SEO, AI, CRM, analytics — by selection only. Ranchi, Jharkhand.',
  },
}

export const revalidate = 300

export default async function Super30Page() {
  const db = createServerClient()

  const { data: batchRaw } = await db
    .from('s30_batches')
    .select('*')
    .eq('status', 'accepting')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  const batch = batchRaw as Batch | null

  const { count: appCount } = await db
    .from('s30_applicants')
    .select('*', { count: 'exact', head: true })
    .eq('batch_id', batch?.id || '')

  const seatsLeft = batch ? Math.max(0, batch.seats - (appCount || 0)) : 30

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Super 30 — Full Stack Growth Marketer Program',
    description: '45-day execution-focused digital growth program covering paid ads, SEO, AI workflows, CRM automation, analytics, and business strategy.',
    provider: { '@type': 'Organization', name: SITE.name, sameAs: SITE.url },
    offers: {
      '@type': 'Offer',
      price: '12000',
      priceCurrency: 'INR',
      availability: seatsLeft > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
    courseMode: 'onsite',
    inLanguage: ['hi', 'en'],
    educationalCredentialAwarded: 'Full Stack Growth Marketer Certificate',
    numberOfCredits: 45,
    hasCourseInstance: batch ? {
      '@type': 'CourseInstance',
      name: batch.name,
      startDate: batch.start_date,
      endDate: batch.end_date,
      location: { '@type': 'Place', name: 'Scalify Labs', address: { '@type': 'PostalAddress', addressLocality: 'Ranchi', addressRegion: 'Jharkhand', addressCountry: 'IN' } },
    } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Super30PageClient batch={batch} seatsLeft={seatsLeft} />
    </>
  )
}
