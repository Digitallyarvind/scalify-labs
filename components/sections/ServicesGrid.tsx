// ServicesGrid
import Link from 'next/link'
import { SERVICES } from '@/lib/data'

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-3">What We Do</p>
          <h2 className="font-sans font-bold text-4xl tracking-tight mb-4">Complete Digital Growth Stack</h2>
          <p className="text-[#44403C] text-base max-w-md mx-auto">
            From traffic to leads to revenue — every piece of your digital marketing, in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-white border border-cream-300 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-transparent relative overflow-hidden block"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-[rgba(255,101,0,0.1)] group-hover:bg-[rgba(255,101,0,0.2)] rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors duration-300">
                  {s.icon}
                </div>
                <div className="font-bold text-base mb-2 group-hover:text-white transition-colors duration-300">{s.title}</div>
                <div className="text-[#7C7268] text-sm leading-relaxed mb-4 group-hover:text-white/70 transition-colors duration-300">
                  {s.subtitle}
                </div>
                <span className="text-saffron font-bold text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
