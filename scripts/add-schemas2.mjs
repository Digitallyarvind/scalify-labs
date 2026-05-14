import { readFileSync, writeFileSync } from 'fs'

const SITE_URL = 'https://scalifylabs.com'

const pages = [
  {
    file: 'app/services/meta-ads/page.tsx',
    client: 'MetaAdsPageClient',
    slug: 'services/meta-ads',
    name: 'Meta Ads Management',
    faqs: [
      ['What is Meta Ads management at Scalify Labs?', 'Scalify Labs manages Facebook and Instagram ad campaigns including lead generation ads, retargeting, Reels ads, ecommerce campaigns, and lookalike audience campaigns. Management starts from ₹10,000/month for ad budgets up to ₹50,000/month.'],
      ['What creatives are included in Meta Ads management?', 'Each plan includes 4–5 static ad creatives per month. Video production is not included — clients provide video content or arrange separately. Copywriting for all ads is included.'],
      ['How does Meta Ads targeting work?', 'Scalify Labs builds custom audiences based on demographics, interests, behaviors, location, and custom data. We also create lookalike audiences from your existing customers and website visitors for the most relevant targeting.'],
      ['What results can I expect from Meta Ads?', 'Average cost per lead for Indian businesses ranges ₹150–₹400 depending on industry. Week 1–2: campaigns launched and data gathered. Week 3–4: optimization begins and cost per lead drops. Month 2+: stable lead flow and scaling of profitable ad sets.'],
    ],
  },
  {
    file: 'app/services/gmb/page.tsx',
    client: 'LocalSEOPageClient',
    slug: 'services/gmb',
    name: 'Local SEO & Google Business Profile',
    faqs: [
      ['What is Local SEO and Google Business Profile optimization?', 'Local SEO improves your business visibility in Google Maps and local search results. Google Business Profile (GMB) optimization ensures your listing appears in the local 3-pack for searches like "digital marketing agency near me" or "best clinic in Ranchi".'],
      ['How much does local SEO cost at Scalify Labs?', 'Local SEO and Google Business Profile management starts from ₹9,999/month. This includes GMB optimization, 8 Google Posts per month, review management, 25-directory citation building, and monthly Maps ranking reports.'],
      ['How long does it take to rank in Google Maps?', 'Most businesses appear in the local 3-pack for their primary keywords within 60 days. Results depend on competition, review count, citation consistency, and proximity to the searcher.'],
      ['Can Scalify Labs get my business to appear in Google Maps in Ranchi?', 'Yes — local SEO and Maps optimization for Ranchi, Jamshedpur, Dhanbad, Bokaro, and other Jharkhand cities is a core specialty. Scalify Labs has helped local businesses achieve top-3 Maps positions for competitive searches.'],
    ],
  },
  {
    file: 'app/services/lead-management/page.tsx',
    client: 'LeadManagementPageClient',
    slug: 'services/lead-management',
    name: 'CRM & Lead Management Setup',
    faqs: [
      ['What CRM platforms does Scalify Labs set up?', 'Scalify Labs sets up Kylas CRM (recommended for Indian SMBs), TeleCRM (for telecalling teams), Cratio CRM (Indian B2B), Bitrix24, Zoho CRM, HubSpot, LeadSquared (education/healthcare), and Salesforce. Platform recommendation is based on team size, budget, and workflow.'],
      ['How much does CRM setup cost?', 'Starter CRM (up to 10 users): ₹40,000 one-time. Growth CRM (up to 25 users): ₹60,000 one-time. Enterprise CRM (unlimited users, custom development): custom pricing. All packages include platform setup, integrations, team training, and post-setup support.'],
      ['Can Scalify Labs integrate CRM with IndiaMART and JustDial?', 'Yes — leads from IndiaMART, JustDial, 99acres, and other portals can be auto-captured into CRM via API integration or Zapier. Every new inquiry auto-creates a lead and notifies the salesperson within 60 seconds.'],
      ['How long does CRM setup take?', 'Starter CRM: 5–7 business days. Growth CRM: 10–14 business days. Enterprise CRM: 3–6 weeks depending on custom development requirements. Data migration from existing Excel/spreadsheets is included in all packages.'],
    ],
  },
  {
    file: 'app/services/email-marketing/page.tsx',
    client: 'EmailMarketingPageClient',
    slug: 'services/email-marketing',
    name: 'Email Marketing Services',
    faqs: [
      ['What email marketing services does Scalify Labs offer?', 'Scalify Labs offers bulk email campaigns, cold email outreach (Apollo, Instantly, Lemlist), SMTP server setup, SendGrid integration, lead nurturing funnels, email automation, CRM email workflows, AI-personalized sequences, newsletter systems, domain warmup, and deliverability optimization.'],
      ['What platforms does Scalify Labs use for email marketing?', 'Email and SMTP: SendGrid, Mailgun, Amazon SES, Brevo, Mailchimp, HubSpot, ActiveCampaign, MailerLite. Cold outreach: Apollo, Instantly, Lemlist, Smartlead. Automation: Zapier, Make.com, n8n. AI: ChatGPT, Claude, Gemini for content personalization.'],
      ['What open rates can I expect?', 'With proper SMTP setup, domain warmup, and AI personalization, clients typically achieve 40%+ open rates versus the industry average of 20%. Cold email outreach campaigns achieve 30–45% open rates with proper infrastructure and personalization.'],
      ['Does Scalify Labs set up SMTP infrastructure?', 'Yes — Scalify Labs sets up dedicated SMTP servers including SPF, DKIM, and DMARC authentication, domain warmup protocols, sending reputation management, inbox monitoring, and multi-domain scaling for high-volume outreach.'],
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
    updated = updated.replace(
      `      <${p.client} />`,
      `      ${injection}<${p.client} />`
    )
  }

  writeFileSync(p.file, updated, 'utf8')
  console.log('updated:', p.file)
}

console.log('Done!')
