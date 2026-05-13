import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES, SITE } from '@/lib/data'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { CTABanner } from '@/components/sections/CTABanner'

interface Props {
  params: { slug: string }
}

// Pre-generate all service pages at build time (SSG)
export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

// Dynamic metadata per service page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES.find(s => s.slug === params.slug)
  if (!service) return {}

  const canonical = `${SITE.url}/services/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonical,
      type: 'website',
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = SERVICES.find(s => s.slug === params.slug)
  if (!service) notFound()

  const relatedServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 4)

  // Service schema markup
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.fullTitle,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    offers: {
      '@type': 'Offer',
      price: service.price.replace('₹', '').replace(',', ''),
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: service.price.replace('₹', '').replace(',', ''),
        priceCurrency: 'INR',
        unitText: service.priceNote,
      },
    },
    url: `${SITE.url}/services/${service.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceDetail service={service} relatedServices={relatedServices} />
      <CTABanner
        title={`Ready to Start with ${service.title}?`}
        subtitle="Book a free 30-minute strategy call. No obligations. We'll map out exactly how this service can grow your business."
        primaryCTA={{ label: 'Book Free Strategy Call →', href: '/contact-scalifylabs' }}
        secondaryCTA={{ label: 'See All Services', href: '/#services' }}
        dark
      />
    </>
  )
}
