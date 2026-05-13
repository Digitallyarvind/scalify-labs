import Link from 'next/link'

export function Hero() {
  const stats = [
    { value: '200', suffix: '+', label: 'Happy Clients' },
    { value: '₹50', suffix: 'Cr+', label: 'Revenue Generated' },
    { value: '7', suffix: '+', label: 'Years Experience' },
    { value: '30', suffix: '+', label: 'Cities Served' },
  ]

  const cards = [
    { icon: '🎯', title: 'Lead Generation', sub: '847 leads generated this month', badge: '+34% vs last month', anim: 'animate-float' },
    { icon: '📈', title: 'SEO Rankings', sub: 'Page 1 for 120+ keywords', badge: 'Ranchi · Jharkhand', anim: 'animate-float-slow' },
    { icon: '💬', title: 'WhatsApp Campaigns', sub: '98% open rate · 24 leads today', badge: 'Automated', anim: 'animate-float-delayed' },
  ]

  return (
    <section className="min-h-screen bg-navy flex items-center pt-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_50%,rgba(255,101,0,0.13),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(37,99,235,0.07),transparent_45%)]" />
      <div className="absolute inset-0 grid-bg" />

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="relative z-10">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/12 text-white font-mono text-[0.67rem] uppercase tracking-wider px-4 py-2 rounded-full border border-white/10">
                🇮🇳 Ranchi&apos;s #1 Digital Marketing Agency
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-5xl md:text-6xl text-white leading-tight tracking-tight mb-5">
              Grow Your Business<br />
              <span className="text-saffron">10× Faster</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              From SEO to AI systems — complete digital growth engines for Indian businesses.
              Results in 90 days, guaranteed.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href="/contact-scalifylabs"
                className="bg-saffron text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-saffron-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,101,0,0.3)]"
              >
                Free Strategy Call →
              </Link>
              <Link
                href="/super-30"
                className="border-2 border-white/30 text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-white hover:text-navy transition-all"
              >
                Super 30 Course
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/9">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-sans font-extrabold text-3xl text-white tracking-tight leading-none">
                    {s.value}<em className="not-italic text-saffron">{s.suffix}</em>
                  </div>
                  <div className="font-mono text-[0.67rem] text-white/38 uppercase tracking-wider mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:flex flex-col gap-3 relative z-10">
            {cards.map(card => (
              <div
                key={card.title}
                className={`bg-white/6 border border-white/10 rounded-2xl p-5 backdrop-blur-md ${card.anim}`}
              >
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className="text-white font-bold text-[0.92rem] mb-1">{card.title}</div>
                <div className="text-white/46 text-sm mb-3">{card.sub}</div>
                <span className="inline-block bg-saffron text-white font-mono font-bold text-[0.6rem] px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {card.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
