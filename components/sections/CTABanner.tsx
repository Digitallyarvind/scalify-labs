import Link from 'next/link'

interface CTABannerProps {
  title: string
  subtitle?: string
  primaryCTA?: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  dark?: boolean
}

export function CTABanner({ title, subtitle, primaryCTA, secondaryCTA, dark }: CTABannerProps) {
  return (
    <section className={`py-16 ${dark ? '' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-navy rounded-3xl px-12 py-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,101,0,0.18),transparent_55%)]" />
          <div className="relative z-10">
            <h2 className="font-sans font-bold text-4xl text-white tracking-tight mb-4">{title}</h2>
            {subtitle && (
              <p className="text-white/58 text-base max-w-md mx-auto mb-8 leading-relaxed">{subtitle}</p>
            )}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className="bg-saffron text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-saffron-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,101,0,0.3)]"
                >
                  {primaryCTA.label}
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="border-2 border-white/30 text-white font-bold text-base px-7 py-3.5 rounded-xl hover:bg-white hover:text-navy transition-all"
                >
                  {secondaryCTA.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
