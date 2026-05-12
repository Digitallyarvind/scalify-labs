import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import { Super30Form } from '@/components/sections/Super30Form'

export const metadata: Metadata = {
  title: 'Super 30 Digital Marketing Course Ranchi | Scalify Labs',
  description: 'Join Super 30 — Ranchi\'s most intensive digital marketing programme. Only 30 seats. Psychometric test, career counselling, live projects. ₹12,000. Apply now.',
  alternates: { canonical: `${SITE.url}/super-30` },
  openGraph: {
    title: 'Super 30 Digital Marketing Course | Scalify Labs',
    description: '30 seats. 90 days. Complete digital marketing training with psychometric assessment and career counselling. ₹12,000 all-inclusive.',
    url: `${SITE.url}/super-30`,
  },
}

export const revalidate = 300

export default async function Super30Page() {
  const db = createServerClient()

  // Get current accepting batch
  const { data: batch } = await db
    .from('s30_batches')
    .select('*')
    .eq('status', 'accepting')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Count applications for this batch
  const { count: appCount } = await db
    .from('s30_applicants')
    .select('*', { count: 'exact', head: true })
    .eq('batch_id', batch?.id || '')

  const seatsLeft = batch ? Math.max(0, batch.seats - (appCount || 0)) : 30

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Super 30 Digital Marketing Programme',
    description: 'Intensive 90-day digital marketing course with psychometric assessment, career counselling, and live projects. Only 30 seats.',
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      sameAs: SITE.url,
    },
    offers: {
      '@type': 'Offer',
      price: '12000',
      priceCurrency: 'INR',
      availability: seatsLeft > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
    },
    courseMode: 'onsite',
    inLanguage: ['hi', 'en'],
    educationalCredentialAwarded: 'Digital Marketing Certificate',
    numberOfCredits: 90,
    hasCourseInstance: batch ? {
      '@type': 'CourseInstance',
      name: batch.name,
      startDate: batch.start_date,
      endDate: batch.end_date,
      location: {
        '@type': 'Place',
        name: 'Scalify Labs',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ranchi',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
      },
    } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-[#1C0800] py-28 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,101,0,0.28),transparent_55%)]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-[rgba(255,101,0,0.2)] border border-[rgba(255,101,0,0.35)] text-saffron font-mono text-[0.67rem] uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            🎓 Batch 7 — May 2026 · Accepting Applications
          </span>
          <h1 className="font-sans font-extrabold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-4">
            Super 30<br />
            <span className="text-saffron">Digital Marketing</span><br />
            Programme
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-10">
            India&apos;s most intensive digital marketing programme. Only 30 seats.
            Complete practical training, psychometric assessment, career counselling, and placement support.
          </p>

          {/* Batch stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: '🎓', value: '30', label: 'Total Seats' },
              { icon: '📅', value: '90', label: 'Day Programme' },
              { icon: '💰', value: '₹12K', label: 'All Inclusive' },
              { icon: '🔥', value: `${seatsLeft}`, label: 'Seats Left' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/6 border border-white/9 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`font-sans font-extrabold text-2xl mb-1 ${stat.label === 'Seats Left' && seatsLeft < 10 ? 'text-red-400' : 'text-white'}`}>
                  {stat.value}
                </div>
                <div className="font-mono text-[0.67rem] text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {batch && (
            <div className="flex flex-wrap gap-4 text-white/50 text-sm font-mono">
              <span>📅 {new Date(batch.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} — {new Date(batch.end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>📍 {batch.mode === 'offline' ? 'Offline · Ranchi' : batch.mode === 'online' ? 'Online' : 'Hybrid'}</span>
              <span>🗓 Applications close: {new Date(batch.app_close).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</span>
            </div>
          )}
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 items-start">
            {/* Left: What you learn + Selection process */}
            <div>
              <h2 className="font-sans font-bold text-3xl tracking-tight mb-5">
                Complete Digital Marketing in 90 Days
              </h2>

              <div className="space-y-3 mb-10">
                {[
                  { icon: '🔍', title: 'SEO & Content Marketing', desc: 'Rank on Google, drive organic traffic, build topical authority' },
                  { icon: '📱', title: 'Meta & Google Ads', desc: 'Run campaigns that generate real leads and sales for clients' },
                  { icon: '💬', title: 'WhatsApp & Social Media', desc: 'Build audiences, engage leads, convert with automation' },
                  { icon: '🤖', title: 'AI Tools & Automation', desc: 'Use AI to 10× your productivity and client results' },
                  { icon: '📊', title: 'Analytics & Reporting', desc: 'Read data, make decisions, prove ROI to clients' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3 p-4 bg-white border border-cream-300 rounded-xl">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-[#7C7268] text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selection Process */}
              <h2 className="font-sans font-bold text-2xl tracking-tight mb-5">Selection Process</h2>
              <div className="space-y-0">
                {[
                  { n: 1, title: 'Apply Online', desc: 'Fill the application form. Tell us about yourself, your goals, and why you want to join Super 30.' },
                  { n: 2, title: 'Counselling Call', desc: '1:1 career counselling session with Arvind Gupta. We understand your background and aspirations.' },
                  { n: 3, title: 'Psychometric Assessment', desc: 'RAPD psychometric test to understand your personality, strengths, and ideal career path in digital marketing.' },
                  { n: 4, title: 'Final Interview', desc: 'Short interview to assess motivation, commitment, and programme fit.' },
                  { n: 5, title: 'Selection & Offer Letter', desc: 'Selected candidates receive an official offer letter. Important: If you decline after selection, you cannot reapply for 12 months.' },
                ].map((step, i, arr) => (
                  <div key={step.n} className={`flex gap-4 py-6 ${i < arr.length - 1 ? 'border-b border-cream-300' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-navy text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 mt-1">
                      {step.n}
                    </div>
                    <div>
                      <div className="font-bold text-base mb-2">{step.title}</div>
                      <div className="text-[#44403C] text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: step.desc.replace('Important:', '<strong>Important:</strong>') }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Application form */}
            <div className="sticky top-24">
              <Super30Form batchId={batch?.id || 'default'} seatsLeft={seatsLeft} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
