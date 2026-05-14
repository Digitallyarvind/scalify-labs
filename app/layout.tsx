import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { SITE } from '@/lib/data'

const GA_ID = 'G-8847JW5NH1'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Digital Marketing Agency Ranchi`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'digital marketing agency ranchi',
    'seo services ranchi',
    'google ads agency ranchi',
    'crm automation india',
    'whatsapp marketing india',
    'ai marketing agency',
    'lead generation company ranchi',
    'growth marketing agency jharkhand',
    'scalify labs',
  ],
  authors: [{ name: SITE.founder, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Digital Marketing Agency Ranchi`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@scalifylabs',
    creator: '@scalifylabs',
    title: `${SITE.name} — Digital Marketing Agency Ranchi`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE.url },
  verification: {
    // Add Google Search Console verification token here when available
    // google: 'your-verification-token',
  },
}

// ─── GLOBAL STRUCTURED DATA ───────────────────────────────────────────────────

function GlobalSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebSite — enables sitelinks search box in Google
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: 'Growth infrastructure company — SEO, Google Ads, CRM automation, WhatsApp marketing, and AI workflows for Indian businesses.',
        publisher: { '@id': `${SITE.url}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/blog?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-IN',
      },

      // Organization — core entity
      {
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: ['Scalify Labs', 'ScalifyLabs'],
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE.url}/founder.jpg`,
        description: 'Scalify Labs is a digital growth infrastructure company in Ranchi, Jharkhand that builds connected growth systems combining SEO, paid ads, CRM automation, WhatsApp marketing, and AI workflows for Indian businesses.',
        slogan: 'Building Growth Systems That Scale',
        foundingDate: '2024',
        foundingLocation: {
          '@type': 'Place',
          name: 'Ranchi, Jharkhand, India',
        },
        founder: { '@id': `${SITE.url}/#founder` },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu',
          addressLocality: 'Ranchi',
          addressRegion: 'Jharkhand',
          postalCode: '835222',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.3441,
          longitude: 85.3096,
        },
        telephone: SITE.phone,
        email: SITE.email,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        areaServed: [
          { '@type': 'State', name: 'Jharkhand', containedInPlace: { '@type': 'Country', name: 'India' } },
          { '@type': 'Country', name: 'India' },
        ],
        knowsAbout: [
          'SEO Services', 'Google Ads', 'Meta Ads', 'CRM Automation',
          'WhatsApp Marketing', 'AI Workflows', 'Lead Generation',
          'Digital Marketing', 'Growth Systems', 'Marketing Automation',
        ],
        sameAs: [
          'https://www.instagram.com/scalifylabs/',
          'https://www.facebook.com/scalifylabs/',
          'https://www.linkedin.com/company/scalifylabs/',
          'https://www.youtube.com/@scalifylabs',
        ],
      },

      // Person — founder authority signal
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#founder`,
        name: 'Arvind Gupta',
        givenName: 'Arvind',
        familyName: 'Gupta',
        jobTitle: 'Founder & Growth Strategist',
        description: 'Arvind Gupta is a digital growth strategist with 15+ years of experience in SEO, performance marketing, CRM automation, AI workflows, and business growth systems. Based in Ranchi, Jharkhand, India.',
        url: `${SITE.url}/why-scalify`,
        image: `${SITE.url}/founder.jpg`,
        worksFor: { '@id': `${SITE.url}/#organization` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ranchi',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN',
        },
        knowsAbout: [
          'Digital Marketing', 'SEO', 'Google Ads', 'Meta Ads',
          'CRM Systems', 'Marketing Automation', 'AI Marketing',
          'WhatsApp Marketing', 'Lead Generation', 'Growth Systems',
          'EdTech Marketing', 'Performance Marketing',
        ],
        sameAs: [
          'https://www.linkedin.com/company/scalifylabs/',
          'https://www.instagram.com/scalifylabs/',
        ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* AI/LLM context file */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Global structured data */}
        <GlobalSchema />
      </head>
      <body className="bg-cream font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
