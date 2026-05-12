import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CITIES, SERVICES, SITE } from '@/lib/data'
import { LeadForm } from '@/components/ui/LeadForm'
import { CTABanner } from '@/components/sections/CTABanner'

interface Props {
  params: { city: string }
}

export function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = CITIES.find(c => c.slug === params.city)
  if (!city) return {}

  const canonical = `${SITE.url}/cities/${city.slug}`

  return {
    title: `Digital Marketing Agency ${city.name} | SEO, Google Ads, Meta Ads | Scalify Labs`,
    description: `Top digital marketing agency serving ${city.name}, ${city.state}. Expert SEO, Google Ads, Meta Ads, WhatsApp Marketing. Super 30 course available. Free strategy call.`,
    alternates: { canonical },
    openGraph: {
      title: `Digital Marketing Agency ${city.name} | Scalify Labs`,
      description: `Expert digital marketing services in ${city.name}. SEO, Google Ads, Meta Ads, WhatsApp Marketing. Free strategy call.`,
      url: canonical,
    },
  }
}

export default function CityPage({ params }: Props) {
  const city = CITIES.find(c => c.slug === params.city)
  if (!city) notFound()

  // Local Business schema for this city
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${SITE.name} — ${city.name}`,
    description: `Digital marketing services in ${city.name}, ${city.state}`,
    url: `${SITE.url}/cities/${city.slug}`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Digital Marketing Services in ${city.name}`,
      itemListElement: SERVICES.slice(0, 5).map(s => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${s.title} in ${city.name}`,
        },
      })),
    },
  }

  const cityKeywords = [
    `Digital marketing agency ${city.name}`,
    `SEO services ${city.name}`,
    `Google Ads ${city.name}`,
    `Meta Ads ${city.name}`,
    `WhatsApp marketing ${city.name}`,
    `Website development ${city.name}`,
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-navy py-28 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,101,0,0.12)] via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-white/40 font-mono mb-5">
            <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
            <span>›</span>
            <Link href="/cities/ranchi" className="hover:text-saffron transition-colors">Cities</Link>
            <span>›</span>
            <span className="text-white/60">{city.name}</span>
          </nav>
          <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-4">{city.state}</p>
          <h1 className="font-sans font-extrabold text-5xl text-white leading-tight tracking-tight mb-4">
            Digital Marketing Agency<br />
            <span className="text-saffron">{city.name}</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Expert digital marketing services in {city.name}. SEO, Google Ads, Meta Ads, WhatsApp Marketing, and the Super 30 programme.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 items-start">
            {/* Left: content */}
            <div>
              <h2 className="font-sans font-bold text-3xl tracking-tight mb-4">
                Scalify Labs Serves {city.name}
              </h2>
              <p className="text-[#44403C] text-base leading-relaxed mb-8">
                Scalify Labs provides complete digital marketing services to businesses in {city.name}, {city.state}.
                Whether you&apos;re a local shop, coaching institute, real estate company, or service business —
                we help you generate leads, rank on Google, and grow revenue with proven digital strategies.
              </p>

              {/* Services list */}
              <h3 className="font-sans font-bold text-xl mb-4">Services Available in {city.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {SERVICES.map(s => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 p-4 bg-white border border-cream-300 rounded-xl hover:border-saffron hover:text-saffron transition-all group"
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-semibold text-sm group-hover:text-saffron transition-colors">
                      {s.title} — {city.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Keywords section (good for SEO) */}
              <h3 className="font-sans font-bold text-xl mb-4">Top Keywords We Rank For in {city.name}</h3>
              <div className="flex flex-wrap gap-3 mb-10">
                {cityKeywords.map(kw => (
                  <span
                    key={kw}
                    className="bg-cream-200 text-[#44403C] border border-cream-300 font-mono text-xs px-3 py-2 rounded-lg"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Super 30 mention */}
              <div className="bg-navy rounded-2xl p-6">
                <div className="font-mono text-xs text-saffron uppercase tracking-wider mb-3">Super 30 Programme</div>
                <h3 className="font-sans font-bold text-2xl text-white mb-3">
                  Digital Marketing Course — {city.name} Students Welcome
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  The Super 30 Digital Marketing Programme by Scalify Labs accepts applications from {city.name} and across {city.state}.
                  90-day intensive training, psychometric assessment, career counselling. Only 30 seats per batch.
                </p>
                <Link
                  href="/super-30"
                  className="inline-flex bg-saffron text-white font-bold text-sm px-5 py-3 rounded-lg hover:bg-saffron-dark transition-colors"
                >
                  Apply for Super 30 →
                </Link>
              </div>
            </div>

            {/* Right: Lead form */}
            <div className="sticky top-24">
              <LeadForm
                title={`Get Services in ${city.name}`}
                subtitle={`Free strategy call for ${city.name} businesses`}
                source={`City Page — ${city.name}`}
                defaultCity={city.name}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={`Ready to Grow Your ${city.name} Business?`}
        subtitle="Book a free 30-minute strategy call with Arvind Gupta. No obligations."
        primaryCTA={{ label: 'Book Free Strategy Call →', href: '/contact' }}
      />
    </>
  )
}
