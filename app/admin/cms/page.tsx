import Link from 'next/link'

export const revalidate = 0

// All live website pages — no DB dependency
const ALL_PAGES = [
  // Core
  { icon: '🏠', title: 'Homepage',            slug: '/',                                          type: 'Core',      status: 'published' },
  { icon: '📞', title: 'Contact',              slug: '/contact-scalifylabs',                       type: 'Core',      status: 'published' },
  { icon: '💡', title: 'Why Scalify Labs',     slug: '/why-scalify',                              type: 'Core',      status: 'published' },
  { icon: '📋', title: 'Privacy Policy',       slug: '/privacy-policy',                            type: 'Core',      status: 'published' },
  { icon: '📄', title: 'Terms & Conditions',   slug: '/terms-and-conditions',                      type: 'Core',      status: 'published' },
  { icon: '💼', title: 'Careers',              slug: '/careers',                                   type: 'Core',      status: 'published' },
  // Services — Advertising
  { icon: '📊', title: 'Google Ads',           slug: '/services/google-ads-services',              type: 'Service',   status: 'published' },
  { icon: '📱', title: 'Meta Ads',             slug: '/services/meta-ads',                         type: 'Service',   status: 'published' },
  { icon: '📧', title: 'Email Marketing',      slug: '/services/email-marketing',                  type: 'Service',   status: 'published' },
  { icon: '🎯', title: 'Specialized Ads',      slug: '/services/specialized-ads',                  type: 'Service',   status: 'published' },
  // Services — Organic
  { icon: '🌐', title: 'Website Development',  slug: '/services/website-development',              type: 'Service',   status: 'published' },
  { icon: '🔍', title: 'Affordable SEO',       slug: '/services/affordable-seo-services',          type: 'Service',   status: 'published' },
  { icon: '📍', title: 'Local SEO & GMB',      slug: '/services/gmb',                             type: 'Service',   status: 'published' },
  { icon: '🗂️', title: 'Lead Management',      slug: '/services/lead-management',                 type: 'Service',   status: 'published' },
  { icon: '📈', title: 'Lead to Revenue',      slug: '/services/lead-to-revenue',                  type: 'Service',   status: 'published' },
  // Services — Communication
  { icon: '💬', title: 'WhatsApp Marketing',   slug: '/services/whatsapp-marketing-agency',        type: 'Service',   status: 'published' },
  { icon: '📟', title: 'RCS Messaging',        slug: '/services/rcs-messaging',                    type: 'Service',   status: 'published' },
  { icon: '📣', title: 'OBD Voice Calls',      slug: '/services/obd',                             type: 'Service',   status: 'published' },
  { icon: '🤖', title: 'AI Calling & Agents',  slug: '/services/ai-calling',                       type: 'Service',   status: 'published' },
  // Social Media
  { icon: '📲', title: 'Social Media Marketing', slug: '/social-media-marketing',                 type: 'Service',   status: 'published' },
  // Industry Pages
  { icon: '🎓', title: 'Education Solutions',  slug: '/digital-marketing-agencies-for-education-sector', type: 'Industry', status: 'published' },
  { icon: '🏥', title: 'Healthcare Solutions', slug: '/digital-marketing-for-healthcare',          type: 'Industry',  status: 'published' },
  { icon: '🏢', title: 'Real Estate Funnel',   slug: '/digital-marketing-services-for-real-estate', type: 'Industry', status: 'published' },
  // Programs
  { icon: '⚡', title: 'Super 30 Program',     slug: '/super-30',                                  type: 'Program',   status: 'published' },
  // Content
  { icon: '✍️', title: 'Blog / Insights',      slug: '/blog',                                      type: 'Content',   status: 'published' },
]

const CITY_SLUGS = [
  'ranchi','jamshedpur','dhanbad','bokaro','hazaribagh','patna','gaya','muzaffarpur',
  'lucknow','varanasi','agra','kanpur','raipur','bhopal','indore','jaipur',
  'delhi','mumbai','bangalore','pune','hyderabad',
]

const TYPE_COLORS: Record<string,string> = {
  Core:     'bg-[rgba(255,101,0,0.08)] text-[#FF6500] border-[rgba(255,101,0,0.2)]',
  Service:  'bg-[rgba(37,99,235,0.08)] text-[#2563EB] border-[rgba(37,99,235,0.2)]',
  Industry: 'bg-[rgba(124,58,237,0.08)] text-[#7C3AED] border-[rgba(124,58,237,0.2)]',
  Program:  'bg-[rgba(217,119,6,0.08)] text-[#D97706] border-[rgba(217,119,6,0.2)]',
  Content:  'bg-[rgba(22,163,74,0.08)] text-[#16A34A] border-[rgba(22,163,74,0.2)]',
  City:     'bg-[rgba(156,145,137,0.08)] text-[#9C9189] border-[rgba(156,145,137,0.2)]',
}

const SITE_URL = 'https://scalifylabs.com'

export default function CMSPage() {
  const groups = [
    { label: 'Core Pages', pages: ALL_PAGES.filter(p => p.type === 'Core') },
    { label: 'Service Pages', pages: ALL_PAGES.filter(p => p.type === 'Service') },
    { label: 'Industry Pages', pages: ALL_PAGES.filter(p => p.type === 'Industry') },
    { label: 'Programs', pages: ALL_PAGES.filter(p => p.type === 'Program') },
    { label: 'Content', pages: ALL_PAGES.filter(p => p.type === 'Content') },
  ]

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Pages (CMS)
          </h1>
          <p className="text-sm text-[#9C9189] mt-0.5">
            {ALL_PAGES.length} pages + {CITY_SLUGS.length} city pages · All published
          </p>
        </div>
        <div className="flex gap-2">
          <a href={SITE_URL} target="_blank"
            className="text-sm px-4 py-2 rounded-lg border border-[#E8E3DA] bg-white text-[#57534E] hover:bg-[#F7F4EF] transition-colors">
            View Website ↗
          </a>
          <Link href="/admin/blog/new"
            className="text-sm px-4 py-2 rounded-lg bg-[#FF6500] text-white font-bold hover:bg-[#E05800] transition-colors">
            + New Blog Post
          </Link>
        </div>
      </div>

      {/* Page groups */}
      {groups.map(group => (
        <div key={group.label}>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">
            {group.label} ({group.pages.length})
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {group.pages.map(page => (
              <PageCard key={page.slug} page={page} siteUrl={SITE_URL} />
            ))}
          </div>
        </div>
      ))}

      {/* City Pages */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">
          City Pages ({CITY_SLUGS.length})
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {CITY_SLUGS.map(city => (
            <div key={city} className="bg-white border border-[#E8E3DA] rounded-xl p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm">📍</span>
                <p className="text-xs font-semibold text-[#1A1410] capitalize truncate">{city}</p>
              </div>
              <p className="text-[10px] font-mono text-[#9C9189] mb-2 truncate">/cities/{city}</p>
              <div className="flex gap-1">
                <Link href={`/admin/city-pages`}
                  className="flex-1 text-center text-[9px] py-1 rounded-lg bg-[rgba(255,101,0,0.08)] text-[#FF6500] font-semibold hover:bg-[rgba(255,101,0,0.15)] transition-colors">
                  Edit
                </Link>
                <a href={`${SITE_URL}/cities/${city}`} target="_blank"
                  className="flex-1 text-center text-[9px] py-1 rounded-lg bg-[#F7F4EF] text-[#57534E] font-semibold hover:bg-[#F0ECE4] transition-colors">
                  View ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO tip */}
      <div className="bg-white border border-[#E8E3DA] rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl mt-0.5">💡</span>
        <div>
          <p className="text-sm font-semibold text-[#1A1410]">Page editing</p>
          <p className="text-xs text-[#9C9189] mt-0.5">
            To edit page content, open the page directly on the live site and update via the source files in VS Code, or use the Blog editor for new content. SEO metadata is managed per-page in the source code.
            <Link href="/admin/seo" className="text-[#FF6500] ml-1">View SEO analytics →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function PageCard({ page, siteUrl }: { page: typeof ALL_PAGES[0]; siteUrl: string }) {
  const typeClass = TYPE_COLORS[page.type] || TYPE_COLORS.Core

  return (
    <div className="bg-white border border-[#E8E3DA] rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group">
      {/* Title row */}
      <div className="flex items-start gap-2.5 mb-3">
        <span className="text-xl shrink-0 mt-0.5">{page.icon}</span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm text-[#1A1410] leading-tight truncate">{page.title}</p>
          <p className="text-[10px] font-mono text-[#9C9189] truncate mt-0.5">{page.slug}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${typeClass}`}>
          {page.type}
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[rgba(22,163,74,0.08)] text-[#16A34A] border border-[rgba(22,163,74,0.2)]">
          {page.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-1.5">
        <a href={`${siteUrl}${page.slug}`} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center text-[10px] py-1.5 rounded-lg bg-[rgba(255,101,0,0.08)] text-[#FF6500] font-semibold hover:bg-[rgba(255,101,0,0.15)] transition-colors border border-[rgba(255,101,0,0.15)]">
          View Live ↗
        </a>
        {page.slug.startsWith('/blog') ? (
          <Link href="/admin/blog"
            className="flex-1 text-center text-[10px] py-1.5 rounded-lg bg-[#F7F4EF] text-[#57534E] font-semibold hover:bg-[#F0ECE4] transition-colors border border-[#E8E3DA]">
            Blog Editor
          </Link>
        ) : (
          <Link href="/admin/seo"
            className="flex-1 text-center text-[10px] py-1.5 rounded-lg bg-[#F7F4EF] text-[#57534E] font-semibold hover:bg-[#F0ECE4] transition-colors border border-[#E8E3DA]">
            SEO Data
          </Link>
        )}
      </div>
    </div>
  )
}
