import { TESTIMONIALS } from '@/lib/data'

export function Testimonials() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-3">Client Results</p>
          <h2 className="font-sans font-bold text-4xl tracking-tight">Real Businesses. Real Growth.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white border border-cream-300 rounded-2xl p-6">
              <div className="text-saffron text-lg mb-3">{'★'.repeat(t.rating)}</div>
              <blockquote className="font-serif italic text-[#44403C] text-base leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-[#7C7268] text-xs">{t.role}, {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
