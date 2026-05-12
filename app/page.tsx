import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Super30Banner } from '@/components/sections/Super30Banner'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABanner } from '@/components/sections/CTABanner'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  title: `${SITE.name} — Digital Marketing Agency Ranchi | SEO, Google Ads, Meta Ads`,
  description: `${SITE.name} is Ranchi's leading digital marketing agency. Expert SEO, Google Ads, Meta Ads, WhatsApp Marketing, and AI systems for Indian businesses. 200+ clients. 7+ years. Free strategy call.`,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.name} — Digital Marketing Agency Ranchi`,
    description: 'Ranchi\'s leading digital marketing agency. SEO, Google Ads, Meta Ads, WhatsApp Marketing, AI Systems. 200+ clients. Free strategy call.',
    url: SITE.url,
  },
}

// Structured data for homepage
function HomeSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.phone,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['Hindi', 'English'],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.state,
          addressCountry: 'IN',
        },
        sameAs: [
          'https://www.facebook.com/scalifylabs',
          'https://www.instagram.com/scalifylabs',
          'https://www.linkedin.com/company/scalifylabs',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE.url}/#localbusiness`,
        name: SITE.name,
        image: `${SITE.url}/og-image.jpg`,
        priceRange: '₹₹',
        telephone: SITE.phone,
        email: SITE.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ranchi',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.3441,
          longitude: 85.3096,
        },
        url: SITE.url,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <HomeSchema />
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Process />
      <Super30Banner />
      <Testimonials />
      <CTABanner
        title="Ready to Scale Your Business?"
        subtitle="Join 200+ businesses that trust Scalify Labs for their digital growth. First strategy call is always free."
        primaryCTA={{ label: 'Book Free Strategy Call →', href: '/contact' }}
        secondaryCTA={{ label: 'Read Our Blog', href: '/blog' }}
      />
    </>
  )
}
