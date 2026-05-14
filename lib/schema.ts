import { SITE } from './data'

export interface FAQ { q: string; a: string }

/** FAQPage schema — highest impact for AEO/AI answer boxes */
export function faqPageSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

/** BreadcrumbList schema */
export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

/** ProfessionalService schema (stronger than Service for agency pages) */
export function servicePageSchema(opts: {
  name: string
  description: string
  url: string
  offers?: { name: string; price: string; description?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@id': `${SITE.url}/#organization`,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: opts.url,
      servicePhone: SITE.phone,
    },
    ...(opts.offers && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${opts.name} Packages`,
        itemListElement: opts.offers.map(o => ({
          '@type': 'Offer',
          name: o.name,
          price: o.price,
          priceCurrency: 'INR',
          ...(o.description && { description: o.description }),
        })),
      },
    }),
  }
}

/** SpeakableSpecification — marks content for voice assistants + AI reading */
export function speakableSchema(cssSelectors: string[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

/** HowTo schema for process/steps sections */
export function howToSchema(opts: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
