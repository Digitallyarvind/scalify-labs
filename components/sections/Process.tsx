// Process
export function Process() {
  const steps = [
    { n: 1, title: 'Free Strategy Call', desc: '30-min deep-dive into your business, goals, and competition.' },
    { n: 2, title: 'Custom Growth Plan', desc: '90-day roadmap specific to your industry and city.' },
    { n: 3, title: 'Execute & Optimise', desc: 'Launch campaigns and continuously improve performance.' },
    { n: 4, title: 'Scale & Grow', desc: 'Double down on what works. Scale revenue month after month.' },
  ]

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-3">How It Works</p>
          <h2 className="font-sans font-bold text-4xl tracking-tight">From Strategy to Revenue in 4 Steps</h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-7 left-14 right-14 h-px bg-cream-300 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map(step => (
              <div key={step.n} className="text-center">
                <div className="w-14 h-14 rounded-full bg-navy text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4 border-4 border-cream">
                  {step.n}
                </div>
                <div className="font-bold text-base mb-2">{step.title}</div>
                <div className="text-[#7C7268] text-sm leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
