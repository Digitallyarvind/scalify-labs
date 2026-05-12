import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import { LeadForm } from '@/components/ui/LeadForm'

export const metadata: Metadata = {
  title: 'Contact Scalify Labs | Free Strategy Call | Ranchi',
  description: 'Book a free 30-minute strategy call with Arvind Gupta, Founder of Scalify Labs. Digital marketing consultation for your business. Ranchi, Jharkhand.',
  alternates: { canonical: `${SITE.url}/contact` },
}

const INFO = [
  { icon: '📞', label: 'Phone / WhatsApp', value: SITE.phone },
  { icon: '📧', label: 'Email', value: SITE.email },
  { icon: '📍', label: 'Office', value: `${SITE.city}, India` },
  { icon: '⏰', label: 'Working Hours', value: 'Mon–Sat: 10am – 7pm IST' },
]

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE.name}`,
    url: `${SITE.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        addressRegion: SITE.state,
        addressCountry: 'IN',
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-navy py-28 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,101,0,0.1)] via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-4">Get in Touch</p>
          <h1 className="font-sans font-extrabold text-5xl text-white leading-tight tracking-tight mb-4">
            Let's Grow Your<br />Business Together
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Free strategy call. No obligations. 30 minutes to map out your digital growth plan.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-14 items-start">

            {/* Left */}
            <div>
              <h2 className="font-sans font-bold text-3xl tracking-tight mb-6">
                Based in Ranchi.<br />Serving All of India.
              </h2>
              <div className="space-y-5 mb-10">
                {INFO.map(item => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-11 h-11 bg-[rgba(255,101,0,0.1)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[0.67rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1">{item.label}</div>
                      <div className="font-semibold text-[0.95rem]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Founder intro */}
              <div className="bg-white border border-cream-300 rounded-2xl p-6 flex gap-4 items-start">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white font-extrabold text-2xl flex-shrink-0">A</div>
                <div>
                  <div className="font-bold text-base mb-1">{SITE.founder}</div>
                  <div className="text-[#7C7268] text-sm mb-2">Founder, {SITE.name}</div>
                  <p className="text-[#44403C] text-sm leading-relaxed">
                    7+ years in digital marketing. Helped 200+ businesses across India grow their revenue online.
                    Based in Ranchi — deeply understands the Hindi-belt market.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <LeadForm
                title="Book Free Strategy Call"
                subtitle="30 minutes with Arvind Gupta, Founder"
                source="Contact Page"
                showMessage
                showService
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
