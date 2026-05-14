import { readFileSync, writeFileSync } from 'fs'

const SITE_URL = 'https://scalifylabs.com'

const pages = [
  {
    file: 'app/services/affordable-seo-services/page.tsx',
    client: 'SEOPageClient',
    slug: 'services/affordable-seo-services',
    name: 'SEO Services in Ranchi',
    faqs: [
      ['What SEO packages does Scalify Labs offer?', 'Starter at ₹15,000/month (5 blogs, local SEO), Growth at ₹25,000/month (10 blogs, link building), Authority at ₹50,000/month (20 blogs, AEO/AI search optimization, schema markup).'],
      ['How long does SEO take to show results?', 'Month 1–2: technical fixes and indexing. Month 3: first page-1 keywords. Month 4–5: major ranking movement. Month 6+: stable page-1 rankings and growing organic traffic.'],
      ['Does Scalify Labs do local SEO for Ranchi?', 'Yes — local SEO for Ranchi, Jamshedpur, Dhanbad, and across Jharkhand including Google Business Profile optimization, local keywords, citation building in 25+ directories, and Maps rankings.'],
      ['Does Scalify Labs optimize for AI search engines?', 'Yes — the Authority SEO plan includes AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) so content appears in ChatGPT, Perplexity, Google AI Overviews, and other AI answers.'],
    ],
  },
  {
    file: 'app/services/whatsapp-marketing-agency/page.tsx',
    client: 'WhatsAppPageClient',
    slug: 'services/whatsapp-marketing-agency',
    name: 'WhatsApp Marketing Agency',
    faqs: [
      ['What is WhatsApp marketing?', 'WhatsApp marketing uses the WhatsApp Business API to send branded messages, promotions, and automated nurture sequences to customers. It achieves 98% open rates versus 20% for email, making it the most effective marketing channel for Indian businesses.'],
      ['How much does WhatsApp marketing cost at Scalify Labs?', 'Management starts from ₹10,000/month. WhatsApp message costs are separate — charged by Meta at approximately ₹0.35–₹0.82 per conversation. API setup fee applies for first-time integrations.'],
      ['Can WhatsApp be integrated with CRM?', 'Yes — Scalify Labs integrates WhatsApp Business API with CRMs including Kylas, Zoho, TeleCRM, HubSpot, and Bitrix24 so every WhatsApp lead is automatically captured in the sales pipeline.'],
      ['What is WhatsApp automation?', 'WhatsApp automation sends triggered messages based on lead behavior — instant welcome messages on enquiry, multi-step nurture sequences over days or weeks, re-engagement for cold leads, and appointment reminders. Average response time: under 60 seconds.'],
    ],
  },
  {
    file: 'app/services/lead-to-revenue/page.tsx',
    client: 'LeadToRevenuePageClient',
    slug: 'services/lead-to-revenue',
    name: 'Lead to Revenue Growth System',
    faqs: [
      ['What is the Lead to Revenue system?', 'Lead to Revenue is a complete managed growth infrastructure at ₹75,000/month where Scalify Labs connects SEO, Google Ads, Meta Ads, CRM automation, WhatsApp nurturing, lead management, and analytics into one system for scaling businesses.'],
      ['What is included in the Lead to Revenue retainer?', 'Multi-channel growth management (SEO + paid ads), CRM setup and management, WhatsApp automation, lead nurturing workflows, analytics and revenue reporting, sales process optimization, and dedicated growth strategy support. Ad spend billed separately.'],
      ['Who benefits most from Lead to Revenue?', 'Businesses generating 50+ leads/month, businesses spending ₹1 lakh+ on ads without clear ROI, multi-location brands, clinics, education institutes, real estate companies, and service businesses needing scalable follow-up systems.'],
      ['Is ad spend included in the ₹75,000/month fee?', 'No — ad spend is billed directly to Google and Meta platforms. The ₹75,000/month covers strategy, management, CRM, automation, SEO, and reporting. This ensures full transparency and direct platform control for clients.'],
    ],
  },
  {
    file: 'app/contact-scalifylabs/page.tsx',
    client: 'ContactPageClient',
    slug: 'contact-scalifylabs',
    name: 'Contact Scalify Labs',
    faqs: [
      ['How can I contact Scalify Labs?', 'Phone and WhatsApp: +91 87884 24727. Email: hello@scalifylabs.com. Office: Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu, Ranchi 835222, Jharkhand. Working hours: Monday to Saturday, 10 AM to 7 PM IST.'],
      ['Does Scalify Labs offer free consultations?', 'Yes — all initial strategy calls are completely free. A 30-minute session covers business goals, current marketing setup, and growth challenges before any recommendations or pricing is shared.'],
      ['Can Scalify Labs work with businesses outside Ranchi?', 'Yes — all services are delivered remotely. Scalify Labs serves businesses across India including Delhi, Mumbai, Bangalore, Pune, Patna, Jamshedpur, and beyond.'],
      ['How quickly does Scalify Labs respond to inquiries?', 'WhatsApp inquiries are answered within 2 hours during working hours. Form submissions and emails are responded to within 24 hours. For urgent queries, WhatsApp at +91 87884 24727 is the fastest channel.'],
    ],
  },
  {
    file: 'app/why-scalify/page.tsx',
    client: 'WhyScalifyPageClient',
    slug: 'why-scalify',
    name: 'Why Scalify Labs',
    faqs: [
      ['What makes Scalify Labs different from other digital marketing agencies?', 'Scalify Labs builds connected growth infrastructure — not isolated services. SEO, ads, CRM, WhatsApp, AI workflows, and analytics work together in one system. This connected approach delivers 2–3x better results than managing separate vendors.'],
      ['Who is the founder of Scalify Labs?', 'Arvind Gupta is the founder of Scalify Labs with 15+ years of experience in SEO, performance marketing, CRM systems, and EdTech growth. He previously built the Dheya career mentoring ecosystem which scaled to thousands of student interactions across India.'],
      ['What is Scalify Labs experience and track record?', 'Scalify Labs has 15+ years of combined experience, 100+ businesses helped, 5000+ students guided, and 10,000+ leads generated across education, healthcare, real estate, retail, and service businesses.'],
    ],
  },
]

for (const p of pages) {
  const content = readFileSync(p.file, 'utf8')

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  })

  const breadcrumb = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: p.name, item: `${SITE_URL}/${p.slug}` },
    ],
  })

  // Check if already has faqPageSchema import or inline FAQ
  if (content.includes('FAQPage')) {
    console.log('already has FAQ schema, skipping:', p.file)
    continue
  }

  // Add import for schema helpers if not present
  let updated = content

  // Replace the default export to add schema scripts before the client component
  const exportDefault = `export default function`
  const exportIdx = updated.indexOf(exportDefault)
  if (exportIdx === -1) { console.log('no export default found in', p.file); continue }

  // Find the return statement's first child — inject schemas before existing scripts
  const scriptTag = `      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(`
  const firstScriptIdx = updated.indexOf(scriptTag)

  if (firstScriptIdx !== -1) {
    // Inject BEFORE the existing script tag
    const faqAndBreadcrumb = `      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${faqSchema}\` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${breadcrumb}\` }} />
      `
    updated = updated.slice(0, firstScriptIdx) + faqAndBreadcrumb + updated.slice(firstScriptIdx)
  } else {
    // No existing script — add around the client component render
    updated = updated.replace(
      `      <${p.client} />`,
      `      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${faqSchema}\` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${breadcrumb}\` }} />
      <${p.client} />`
    )
  }

  writeFileSync(p.file, updated, 'utf8')
  console.log('updated:', p.file)
}

console.log('Done!')
