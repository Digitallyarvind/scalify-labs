import { createServerClient } from '@/lib/supabase'
import { CMSManager } from '@/components/admin/CMSManager'
import { SERVICES } from '@/lib/data'
import type { Page } from '@/types/database'

export const revalidate = 0

// Seed default pages if they don't exist
const DEFAULT_PAGES = [
  { title: 'Home', slug: '/', type: 'home' as const, status: 'published' as const, content: '## Welcome to Scalify Labs\n\nRanchi\'s leading digital marketing agency.' },
  { title: 'About Us', slug: '/about', type: 'info' as const, status: 'published' as const, content: '## About Scalify Labs\n\nFounded by Arvind Gupta in Ranchi, Jharkhand.' },
  { title: 'Contact', slug: '/contact', type: 'info' as const, status: 'published' as const, content: '## Contact Scalify Labs\n\nPhone: +91 87884 24727\nEmail: hello@scalifylabs.com' },
  { title: 'Super 30', slug: '/super-30', type: 'course' as const, status: 'published' as const, content: '## Super 30 Digital Marketing Programme\n\nOnly 30 seats. ₹12,000 all-inclusive.' },
  ...SERVICES.map(s => ({
    title: s.title, slug: `/services/${s.slug}`, type: 'service' as const, status: 'published' as const, content: s.body,
    meta_title: s.metaTitle, meta_description: s.metaDescription,
  })),
]

export default async function CMSPage() {
  const db = createServerClient()
  const { data: pagesRaw } = await db.from('pages').select('*').order('type').order('title')
  const pages = pagesRaw as Page[] | null

  return <CMSManager initialPages={pages || []} defaultPages={DEFAULT_PAGES} />
}
