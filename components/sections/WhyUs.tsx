import Link from 'next/link'

const REASONS = [
  { n: '01', title: 'Local Market Expertise', desc: 'Deep knowledge of Ranchi, Jharkhand, and Hindi-belt consumer behaviour — our strategies speak your customers\' language.' },
  { n: '02', title: 'Results in 30 Days', desc: 'Paid campaigns start generating leads within the first month. We set measurable targets from day one.' },
  { n: '03', title: 'Full-Stack Team', desc: 'SEO, ads, WhatsApp, website, AI — everything from one team. No coordination headaches, no passing the blame.' },
  { n: '04', title: 'Transparent Reporting', desc: 'Weekly reports with real numbers. No fluff, no vanity metrics — just clear ROI data you can act on.' },
]

export function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-4">Why Scalify Labs</p>
            <h2 className="font-sans font-bold text-4xl tracking-tight mb-5">
              We Don&apos;t Just Run Ads.<br />We Build Growth Machines.
            </h2>
            <p className="text-[#44403C] text-base leading-relaxed mb-7">
              Most agencies focus on vanity metrics. We obsess over one thing — your revenue.
              Every campaign, every strategy is made with your bottom line in mind.
            </p>
            <Link
              href="/contact"
              className="inline-flex bg-navy text-white font-bold text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Talk to Arvind Gupta →
            </Link>
          </div>

          {/* Right — 2x2 grid */}
          <div className="grid grid-cols-2 border border-cream-300 rounded-2xl overflow-hidden bg-white">
            {REASONS.map((r, i) => (
              <div
                key={r.n}
                className={`p-6 ${i % 2 === 0 ? 'border-r border-cream-300' : ''} ${i < 2 ? 'border-b border-cream-300' : ''}`}
              >
                <div className="font-sans font-extrabold text-4xl text-saffron opacity-20 leading-none tracking-tight mb-3">
                  {r.n}
                </div>
                <div className="font-bold text-sm mb-2">{r.title}</div>
                <div className="text-[#7C7268] text-sm leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
