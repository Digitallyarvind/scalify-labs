import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
  title: 'Careers at Scalify Labs | Join Our Growth Team',
  description: 'Work with us at Scalify Labs — India\'s growth marketing agency. Open positions in digital marketing, SEO, sales, and more. Apply now.',
  alternates: { canonical: `${SITE.url}/careers` },
}

export const revalidate = 60

export default async function CareersPage() {
  const db = createServerClient()
  const { data: jobs } = await db.from('job_listings').select('*').eq('status', 'open').order('created_at', { ascending: false })
  return <CareersClient jobs={jobs ?? []} />
}
