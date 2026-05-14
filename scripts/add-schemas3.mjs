import { readFileSync, writeFileSync } from 'fs'

const SITE_URL = 'https://scalifylabs.com'

const pages = [
  {
    file: 'app/services/obd/page.tsx',
    client: 'OBDPageClient',
    slug: 'services/obd',
    name: 'OBD Voice Calls',
    faqs: [
      ['What are OBD voice calls?', 'OBD (Outbound Dialing) voice calls are automated pre-recorded messages delivered to thousands of potential customers simultaneously. Used for lead generation, promotions, appointment reminders, and event announcements.'],
      ['How much does OBD voice calling cost?', 'OBD calls cost ₹0.15 per connected call. Management setup and campaign management fees apply separately. Minimum volume: 10,000 calls per campaign. TRAI-compliant DND scrubbing is included.'],
      ['Is OBD calling legal in India?', 'Yes — TRAI-compliant OBD campaigns are legal in India. Scalify Labs handles DND (Do Not Disturb) scrubbing, TRAI-compliant timing (9 AM–9 PM), and proper header registration to ensure full compliance.'],
    ],
  },
  {
    file: 'app/services/rcs-messaging/page.tsx',
    client: 'RCSPageClient',
    slug: 'services/rcs-messaging',
    name: 'RCS Messaging Services',
    faqs: [
      ['What is RCS messaging?', 'RCS (Rich Communication Services) is the next evolution of SMS that allows businesses to send rich interactive messages with images, carousels, buttons, and analytics — delivered to the native messaging app without requiring any app download.'],
      ['How much does RCS messaging cost?', 'RCS messages cost approximately ₹0.16 per delivered message — significantly lower than WhatsApp API at ₹0.82 per marketing conversation. Campaign management fees apply separately.'],
      ['What are the benefits of RCS over SMS?', 'RCS supports images, videos, carousels, one-tap CTA buttons, verified sender badges, read receipts, delivery confirmation, and campaign analytics — making it 10x more engaging than plain SMS at a similar delivery cost.'],
    ],
  },
  {
    file: 'app/services/ai-calling/page.tsx',
    client: 'AICallingPageClient',
    slug: 'services/ai-calling',
    name: 'AI Calling & Voice Agents',
    faqs: [
      ['What is AI calling?', 'AI calling uses artificial intelligence voice agents to automatically call leads, answer common questions, qualify prospects, schedule appointments, and route hot leads to human sales agents — 24/7 without human intervention.'],
      ['How does AI calling work for lead follow-up?', 'When a new lead submits a form or enquires via WhatsApp, the AI agent automatically calls within minutes, conducts a natural-sounding conversation to understand needs, qualifies the lead based on preset criteria, and notifies the sales team with a complete call summary.'],
      ['What are the pricing plans for AI calling?', 'Starter: ₹15,000/month (up to 500 calls/month, basic qualification). Growth: ₹35,000/month (up to 2,000 calls/month, advanced qualification, CRM integration). Enterprise: custom pricing for unlimited calls, custom AI training, and white-glove setup.'],
    ],
  },
  {
    file: 'app/services/website-development/page.tsx',
    client: 'WebDevPageClient',
    slug: 'services/website-development',
    name: 'Website Development',
    faqs: [
      ['What types of websites does Scalify Labs build?', 'Scalify Labs builds business websites, service business websites, landing pages for campaigns, education and coaching websites, clinic and healthcare websites, real estate websites, and ecommerce websites — all conversion-focused with lead capture and SEO built in.'],
      ['How long does website development take?', 'A standard 5–10 page business website typically takes 2–3 weeks. Landing pages: 3–5 days. eCommerce websites: 4–6 weeks. Timelines depend on content readiness and revision cycles.'],
      ['Does Scalify Labs include SEO in website development?', 'Yes — every website includes: on-page SEO for all pages, structured data (schema markup), mobile-first responsive design, sub-2-second load speed, Google Analytics and Search Console setup, and proper meta tags and canonical URLs.'],
    ],
  },
  {
    file: 'app/services/specialized-ads/page.tsx',
    client: 'SpecializedAdsPageClient',
    slug: 'services/specialized-ads',
    name: 'Specialized Advertising Platforms',
    faqs: [
      ['What specialized advertising platforms does Scalify Labs manage?', 'Scalify Labs manages LinkedIn Ads (B2B targeting), Quora Ads (intent-based advertising), Truecaller Ads (caller ID advertising), Taboola native ads, Outbrain native ads, ShareChat regional ads, Moj ads, and Inshorts sponsored content.'],
      ['When should I use LinkedIn Ads vs Google Ads?', 'LinkedIn Ads are best for B2B businesses targeting professionals by job title, company, industry, or seniority. Google Ads are better for capturing high-intent customers actively searching for your product. LinkedIn typically has higher CPL but better B2B quality.'],
      ['What is native advertising and how does it work?', 'Native advertising (Taboola, Outbrain) shows your content as recommended articles on major news and media websites. It blends with editorial content making it less intrusive and better for awareness and content marketing goals than traditional display ads.'],
    ],
  },
  {
    file: 'app/super-30/page.tsx',
    client: 'Super30PageClient',
    slug: 'super-30',
    name: 'Super 30 Growth Accelerator',
    faqs: [
      ['What is the Super 30 program by Scalify Labs?', 'Super 30 is a 45-day offline growth accelerator in Ranchi, Jharkhand for aspiring digital marketers. It is selection-based with only 30 seats per batch, covering Google Ads, Meta Ads, SEO, AI tools, CRM systems, WhatsApp automation, analytics, and real campaign execution.'],
      ['What is the selection process for Super 30?', 'Application → Counselling call with Arvind Gupta → Psychometric assessment (RAPD framework) → Final interview → Selection and offer letter. If a selected candidate declines, they cannot reapply for 12 months.'],
      ['Is Super 30 online or offline?', 'Super 30 is an offline program held in Ranchi, Jharkhand. Attendance is mandatory. A laptop is required throughout the program. The program runs 45 days with hands-on real campaign execution as the core learning method.'],
      ['Who should apply for Super 30?', 'Super 30 is designed for students, fresh graduates, aspiring freelancers, career switchers, business owners wanting digital skills, and agency aspirants. Prior marketing experience is not required — motivation, commitment, and business thinking matter most.'],
      ['What tools are covered in Super 30?', 'Google Ads, Meta Ads, WordPress, Google Analytics 4, Tag Manager, SEMrush, HubSpot, Zoho CRM, ChatGPT, Claude, Gemini, Canva, Zapier, Mailchimp, Apollo, Google Search Console, and WhatsApp Business API.'],
    ],
  },
]

for (const p of pages) {
  const content = readFileSync(p.file, 'utf8')

  if (content.includes('FAQPage')) {
    console.log('already has FAQ, skipping:', p.file)
    continue
  }

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

  let updated = content
  const scriptTag = `      <script type="application/ld+json"`
  const firstScriptIdx = updated.indexOf(scriptTag)

  const injection = `      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${faqSchema}\` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${breadcrumb}\` }} />
      `

  if (firstScriptIdx !== -1) {
    updated = updated.slice(0, firstScriptIdx) + injection + updated.slice(firstScriptIdx)
  } else {
    const clientTag = `<${p.client}`
    updated = updated.replace(clientTag, injection + clientTag)
  }

  writeFileSync(p.file, updated, 'utf8')
  console.log('updated:', p.file)
}

// Also fix the remaining analytics trackLead calls in service modals
import { readdirSync } from 'fs'
import path from 'path'

const serviceDir = 'app/services'
const serviceDirs = readdirSync(serviceDir)

for (const dir of serviceDirs) {
  const clientFiles = ['GoogleAdsPageClient.tsx', 'MetaAdsPageClient.tsx', 'SEOPageClient.tsx',
    'LocalSEOPageClient.tsx', 'WhatsAppPageClient.tsx', 'OBDPageClient.tsx',
    'RCSPageClient.tsx', 'AICallingPageClient.tsx', 'WebDevPageClient.tsx',
    'SpecializedAdsPageClient.tsx']

  for (const cf of clientFiles) {
    const fp = path.join(serviceDir, dir, cf)
    try {
      let fc = readFileSync(fp, 'utf8')
      if (!fc.includes('trackLead') && fc.includes('submitLead')) {
        // Add import
        fc = fc.replace(
          "import { submitLead } from '@/lib/actions'",
          "import { submitLead } from '@/lib/actions'\nimport { trackLead } from '@/lib/analytics'"
        )
        // Find source value
        const sm = fc.match(/source:\s*['"]([^'"]+)['"]/);
        const vm = fc.match(/service_interest:\s*['"]([^'"]+)['"]/);
        const src = sm ? sm[1] : 'service-page'
        const svc = vm ? vm[1] : ''
        // Add trackLead before setStatus success
        fc = fc.replace(
          "      setStatus('success')",
          `      trackLead('${src}', '${svc}')\n      setStatus('success')`
        )
        writeFileSync(fp, fc, 'utf8')
        console.log('tracking added to:', fp)
      }
    } catch {
      // file doesn't exist, skip
    }
  }
}

console.log('All done!')
