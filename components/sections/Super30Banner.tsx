import Link from 'next/link'

export function Super30Banner() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-saffron to-[#c14800] rounded-3xl px-12 py-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_55%)]" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-white/18 border border-white/25 text-white font-mono text-[0.67rem] uppercase tracking-wider px-4 py-2 rounded-full mb-5">
              🎓 Now Accepting Applications
            </span>
            <h2 className="font-sans font-bold text-4xl text-white tracking-tight mb-4">
              Super 30 Digital Marketing Programme
            </h2>
            <p className="text-white/80 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Only 30 seats. 90-day intensive training. Career counselling, psychometric test,
              and real client projects. ₹12,000 all-inclusive.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/super-30"
                className="bg-white text-navy font-bold text-base px-7 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                Apply Now — Limited Seats
              </Link>
              <Link
                href="/super-30"
                className="border-2 border-white/40 text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-white hover:text-navy transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
