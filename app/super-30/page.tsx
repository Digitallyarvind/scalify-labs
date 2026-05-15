import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import Super30PageClient from './Super30PageClient'

export const metadata: Metadata = {
  title: 'Super 30 Career Accelerator — Performance Marketing Course Ranchi | Scalify Labs',
  description:
    'Super 30 is a 45-day selection-based offline execution program in Ranchi. Learn Google Ads, Meta Ads, SEO, AI tools, CRM & automation. Only 30 seats. Apply now.',
  keywords: [
    'performance marketing course Ranchi',
    'digital marketing course Ranchi',
    'AI marketing training Ranchi',
    'CRM automation training Ranchi',
    'WhatsApp automation training',
    'SEO training Ranchi',
    'career accelerator Jharkhand',
    'digital marketing course Jharkhand',
    'Super 30 Scalify Labs',
    'growth marketer training India',
  ],
  alternates: { canonical: `${SITE.url}/super-30` },
  openGraph: {
    title: 'Super 30 Career Accelerator — 45-Day Offline Program | Scalify Labs Ranchi',
    description: 'Selection-based offline program in Ranchi. Google Ads, Meta Ads, SEO, AI, CRM, Automation. Only 30 seats per batch. ₹10,000 launch price.',
    url: `${SITE.url}/super-30`, type: 'website', siteName: SITE.name,
  },
}

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is laptop mandatory for Super 30?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A personal laptop is mandatory throughout the 45-day program. You will use it for live campaign execution, tool practice, and portfolio building.' } },
    { '@type': 'Question', name: 'Do I need prior experience to apply?', acceptedAnswer: { '@type': 'Answer', text: 'No prior experience is required. Selection is based on psychometric assessment, interview, and motivation — not prior knowledge.' } },
    { '@type': 'Question', name: 'Is Super 30 online or offline?', acceptedAnswer: { '@type': 'Answer', text: 'Super 30 is fully offline, held in Ranchi, Jharkhand. Attendance is mandatory. This is a hands-on execution program, not a video course.' } },
    { '@type': 'Question', name: 'Can housewives join Super 30?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Super 30 welcomes homemakers, students, working professionals, and aspiring freelancers. Prior background in marketing is not required.' } },
    { '@type': 'Question', name: 'Is there a placement guarantee?', acceptedAnswer: { '@type': 'Answer', text: 'No. Super 30 does not guarantee placement. We provide career support, interview preparation, and portfolio building. Outcomes depend on your effort and execution.' } },
    { '@type': 'Question', name: 'What if I am not selected?', acceptedAnswer: { '@type': 'Answer', text: 'If not selected, you may reapply after 6 months for the next batch.' } },
    { '@type': 'Question', name: 'Will I get certificates?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You receive a Super 30 Completion Certificate plus guidance on Google, Semrush, and Meta certification exams.' } },
    { '@type': 'Question', name: 'Can I start freelancing after this program?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Portfolio building, client pitch practice, and freelance setup are part of the Career Launch module.' } },
    { '@type': 'Question', name: 'Do I need coding knowledge?', acceptedAnswer: { '@type': 'Answer', text: 'No coding knowledge required. The program focuses on digital marketing execution — ads, SEO, AI tools, CRM, and automation — without any coding.' } },
  ],
}

const courseSchema = {
  '@context': 'https://schema.org', '@type': 'Course',
  name: 'Super 30 Career Accelerator',
  description: 'A 45-day selection-based offline growth marketing program in Ranchi covering Google Ads, Meta Ads, SEO, AI tools, CRM, and automation.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  courseMode: 'onsite',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'onsite', duration: 'P45D',
    location: { '@type': 'Place', name: 'Scalify Labs', address: { '@type': 'PostalAddress', addressLocality: 'Ranchi', addressRegion: 'Jharkhand', addressCountry: 'IN' } },
    offers: { '@type': 'Offer', price: '10000', priceCurrency: 'INR' },
  },
}

export default async function Super30Page() {
  const db = createServerClient()
  const [{ data: batches }, { data: applicants }] = await Promise.all([
    db.from('s30_batches').select('*').eq('status', 'accepting').order('created_at', { ascending: false }).limit(1),
    db.from('s30_applicants').select('id,status').limit(500),
  ])

  type BatchRow = { id: string; seats: number; fee: number; start_date: string; status: string; name: string }
  const activeBatch = (batches?.[0] as BatchRow | undefined) ?? null
  const stats = {
    applications: applicants?.length ?? 142,
    selected: applicants?.filter((a: { status: string }) => a.status === 'selected' || a.status === 'enrolled').length ?? 19,
    interview_pending: applicants?.filter((a: { status: string }) => a.status === 'interview').length ?? 33,
    rejected: applicants?.filter((a: { status: string }) => a.status === 'rejected').length ?? 74,
    seats_total: activeBatch?.seats ?? 30,
    batch_start: activeBatch?.start_date ?? '2026-06-10',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <Super30PageClient stats={stats} />
    </>
  )
}
