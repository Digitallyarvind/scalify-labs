import Link from 'next/link'
import { LeadForm } from '@/components/ui/LeadForm'
import type { SERVICES } from '@/lib/data'

type Service = typeof SERVICES[number]

interface Props {
  service: Service
  relatedServices: readonly Service[]
}

export function ServiceDetail({ service, relatedServices }: Props) {
  // Simple markdown to HTML for service body
  function bodyToHTML(md: string) {
    return md
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/gs, (m) => `<ul>${m}</ul>`)
      .split('\n\n')
      .map(block => block.startsWith('<') ? block : `<p>${block}</p>`)
      .join('\n')
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-28 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,101,0,0.1)] via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-white/40 font-mono mb-5">
            <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
            <span>›</span>
            <span>Services</span>
            <span>›</span>
            <span className="text-white/60">{service.title}</span>
          </nav>
          <span className="inline-block bg-[rgba(255,101,0,0.15)] text-saffron font-mono text-[0.67rem] uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            {service.tag}
          </span>
          <h1 className="font-sans font-extrabold text-5xl text-white leading-tight tracking-tight mb-4">
            {service.fullTitle}
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">{service.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">

            {/* Body */}
            <div
              className="prose-scalify"
              dangerouslySetInnerHTML={{ __html: bodyToHTML(service.body) }}
            />

            {/* Sidebar */}
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-navy text-white rounded-2xl p-6">
                <div className="font-bold text-base mb-1">Get Started Today</div>
                <div className="text-white/44 text-sm mb-4">Book a free consultation with our team</div>
                <div className="bg-white/7 rounded-xl p-4 text-center mb-5">
                  <div className="font-mono text-[0.67rem] text-white/36 uppercase tracking-wider mb-1">Starting from</div>
                  <div className="font-sans font-extrabold text-4xl text-saffron tracking-tight">{service.price}</div>
                  <div className="text-white/36 text-sm">{service.priceNote}</div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {service.features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="text-saffron flex-shrink-0 mt-0.5">✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-saffron text-white font-bold text-sm px-5 py-3 rounded-xl text-center hover:bg-saffron-dark transition-colors"
                >
                  Get Free Consultation →
                </Link>
              </div>

              {/* Lead form */}
              <LeadForm
                title="Quick Enquiry"
                subtitle="We'll call within 2 hours"
                source={`Service Page — ${service.title}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedServices.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="font-sans font-bold text-2xl tracking-tight mb-6">Other Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map(s => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-cream border border-cream-300 rounded-2xl p-5 hover:border-saffron transition-all block"
                >
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="font-bold text-sm mb-1 group-hover:text-saffron transition-colors">{s.title}</div>
                  <div className="text-[#7C7268] text-xs leading-relaxed">{s.subtitle.slice(0, 60)}…</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
