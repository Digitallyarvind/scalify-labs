'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Search, BarChart3, FileText, Zap, Shield, Activity,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  BookOpen, Globe, Layers, Check, Sparkles, Rocket,
  Phone, Mail, User, MapPin, Briefcase,
  Users, Clock, RefreshCw, Database, Target,
  TrendingDown,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const WHO_IT_SERVES = [
  { icon: Globe, name: 'SaaS Companies', desc: 'Drive signups through organic search rankings', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: GraduationCap, name: 'Education Platforms', desc: 'Rank for course-related and admission searches', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: ShoppingBag, name: 'Ecommerce Brands', desc: 'Product pages and category SEO for organic sales', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: HeartPulse, name: 'Clinics & Healthcare', desc: 'Rank for medical services and doctor searches', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: Building2, name: 'Real Estate Companies', desc: 'City-level property and project keyword rankings', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: Zap, name: 'Service Businesses', desc: 'Generate inbound enquiries through service keywords', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: BookOpen, name: 'Content Websites', desc: 'Traffic and authority growth through content SEO', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
  { icon: Store, name: 'Multi-Location Brands', desc: 'Scalable SEO across multiple cities and regions', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
]

const SERVICES = [
  { icon: Zap, name: 'Technical SEO', desc: 'Improve crawlability, indexing, page speed, site structure, and schema markup for peak search performance', color: 'bg-blue-100 text-blue-600' },
  { icon: FileText, name: 'On-Page SEO', desc: 'Optimize page titles, meta descriptions, headings, and content for target keywords', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Search, name: 'Keyword Research', desc: 'Identify high-intent, high-volume keyword opportunities aligned with business goals', color: 'bg-violet-100 text-violet-600' },
  { icon: BookOpen, name: 'Content & Blog SEO', desc: 'Build long-term traffic pipelines through SEO-optimized articles and content systems', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Users, name: 'Competitor Analysis', desc: 'Discover ranking gaps, backlink opportunities, and content strategies from competitors', color: 'bg-orange-100 text-orange-600' },
  { icon: Activity, name: 'SEO Audit', desc: 'Comprehensive website SEO analysis covering 100+ technical and content factors', color: 'bg-red-100 text-red-600' },
  { icon: Layers, name: 'Internal Linking', desc: 'Improve authority distribution and page discoverability through strategic linking', color: 'bg-cyan-100 text-cyan-600' },
  { icon: BarChart3, name: 'SEO Reporting', desc: 'Monthly ranking, traffic, and performance reports with actionable insights', color: 'bg-amber-100 text-amber-600' },
  { icon: Target, name: 'SEO Content Strategy', desc: 'Keyword cluster planning and topical authority maps for sustained ranking growth', color: 'bg-rose-100 text-rose-600' },
  { icon: TrendingUp, name: 'Organic Growth Planning', desc: 'Long-term SEO execution roadmaps tied to business growth milestones', color: 'bg-teal-100 text-teal-600' },
  { icon: Layers, name: 'Schema Markup Optimization', desc: 'Structured data for rich snippets, FAQs, reviews, and AI-readable content signals', color: 'bg-purple-100 text-purple-600' },
  { icon: Globe, name: 'AEO & GEO Optimization', desc: 'Answer Engine & Generative Engine Optimization for visibility in AI search results like ChatGPT, Perplexity, and Google AI Overviews', color: 'bg-sky-100 text-sky-600' },
]

const WHY_INVEST = [
  { icon: TrendingUp, title: 'Long-Term Organic Traffic', desc: 'SEO builds a compounding traffic asset that grows in value over time.' },
  { icon: Target, title: 'Lower Acquisition Cost', desc: 'Organic leads cost significantly less than paid traffic over a 12-month horizon.' },
  { icon: Search, title: 'Better Google Visibility', desc: 'High rankings place your business in front of customers actively seeking your services.' },
  { icon: Shield, title: 'Higher Search Trust', desc: 'First-page Google rankings build brand credibility with potential customers.' },
  { icon: Zap, title: 'Sustainable Inbound Leads', desc: 'Ranked pages generate leads 24/7 without ongoing ad spend.' },
  { icon: Globe, title: 'Authority Building', desc: 'Domain authority and topical expertise accumulate month over month.' },
  { icon: BookOpen, title: 'Better Content Discovery', desc: 'SEO content makes your expertise discoverable to the right audience at the right time.' },
  { icon: Activity, title: 'Compounding Digital Growth', desc: 'Unlike ads, SEO returns accelerate — the longer you invest, the stronger the results.' },
]

const STEPS = [
  { icon: Search, num: '01', title: 'SEO Audit & Research', desc: 'Deep dive into your website\'s technical health, existing rankings, content gaps, and competitive landscape.' },
  { icon: BarChart3, num: '02', title: 'Keyword & Competitor Analysis', desc: 'Map high-intent keywords to business goals. Analyse top-ranking competitors to identify quick wins.' },
  { icon: Zap, num: '03', title: 'Technical & On-Page Optimization', desc: 'Fix crawl issues, improve page structure, optimize title tags, meta data, and internal linking.' },
  { icon: BookOpen, num: '04', title: 'Content SEO Execution', desc: 'Publish SEO-optimized articles, landing pages, and cluster content to build topical authority.' },
  { icon: TrendingUp, num: '05', title: 'Tracking & Growth Optimization', desc: 'Monthly ranking reviews, traffic analysis, and continuous optimization to accelerate growth.' },
]

const PRICING_PLANS = [
  {
    name: 'Starter SEO',
    price: '₹15,000',
    period: '/month',
    best: 'Small businesses & early-stage websites',
    highlight: false,
    features: ['Basic Technical SEO', 'On-Page Optimization (5 pages)', '5 Blog Articles/Month', 'Keyword Tracking (30 keywords)', 'Monthly Performance Report'],
  },
  {
    name: 'Growth SEO',
    price: '₹25,000',
    period: '/month',
    best: 'Businesses focused on traffic growth',
    highlight: true,
    badge: 'Most Popular',
    features: ['Advanced Technical SEO', '10 Blog Articles/Month', 'Competitor Gap Analysis', 'Full SEO Strategy', 'Monthly Optimization Reviews', 'Growth Reporting (50+ keywords)'],
  },
  {
    name: 'Authority SEO',
    price: '₹50,000',
    period: '/month',
    best: 'Brands building large-scale organic presence',
    highlight: false,
    features: ['Advanced SEO Systems', '20 Blog Articles/Month', 'AEO & GEO / AI Search Optimization', 'Advanced Reporting (100+ keywords)', 'Schema Markup & Rich Results', 'Dedicated SEO Strategy Sessions'],
  },
]

const WHY_CARDS = [
  { icon: Target, title: 'Business-Focused SEO', desc: 'Every keyword target, content piece, and optimization is tied to measurable business outcomes.' },
  { icon: BarChart3, title: 'Data-Driven Optimization', desc: 'Decisions backed by ranking data, traffic analytics, and competitive intelligence — not guesswork.' },
  { icon: Zap, title: 'Technical + Content Expertise', desc: 'We handle both the technical foundation and content execution required for sustained rankings.' },
  { icon: TrendingUp, title: 'Long-Term Growth Systems', desc: 'Monthly compounding SEO execution that builds ranking strength and traffic over 6–18 months.' },
  { icon: Activity, title: 'Transparent Reporting', desc: 'Clear monthly reports showing keyword positions, organic traffic, and growth progress.' },
  { icon: Globe, title: 'Scalable SEO Strategy', desc: 'SEO systems designed to scale with your business — from startup to enterprise-level authority.' },
]

const FAQ_ITEMS = [
  { q: 'How long does SEO take to show results?', a: 'Initial technical improvements and on-page optimization show measurable results in 4–8 weeks. Keyword ranking improvements typically appear in 3–4 months for moderate competition keywords. Significant organic traffic growth is usually visible in 6–12 months. SEO is a compounding investment — results accelerate over time.' },
  { q: 'How many blog articles are included per month?', a: 'All three plans include blog content: Starter SEO includes 5 blog articles/month, Growth SEO includes 10 blog articles/month, and Authority SEO includes 20 blog articles/month. All articles are SEO-optimized for target keywords, search intent, internal linking, and schema markup where applicable.' },
  { q: 'Do you handle technical SEO and schema markup?', a: 'Yes. All our packages include technical SEO — crawlability, indexing, page speed, Core Web Vitals, mobile usability, and site architecture. Schema markup (structured data for FAQs, reviews, articles, local business, events) is included to improve rich snippet eligibility and AI-readability in Google AI Overviews, Perplexity, and ChatGPT.' },
  { q: 'What is AEO and GEO — do you optimize for AI search?', a: 'AEO (Answer Engine Optimization) helps your content appear as answers in AI tools like ChatGPT, Perplexity, and Google AI Overviews. GEO (Generative Engine Optimization) structures your content for AI models to cite and reference your brand. Both are part of our Authority SEO plan and increasingly important as 20–30% of searches are now influenced by AI-generated answers.' },
  { q: 'Can SEO generate business leads?', a: 'Yes. SEO targets high-intent keywords where searchers are actively looking for your products or services. Well-ranked pages consistently generate inbound enquiries, contact form fills, phone calls, and signups — often at a much lower cost per lead than paid advertising.' },
  { q: 'What reports will I receive?', a: 'You receive a monthly SEO performance report covering: keyword rankings (position changes), organic traffic (sessions, users, conversions), top-performing pages, content published, technical fixes completed, and next month\'s optimization priorities. Growth and Authority plans include advanced analytics dashboards.' },
  { q: 'Which types of businesses benefit most from SEO?', a: 'Businesses with active websites that want long-term inbound traffic benefit most — SaaS companies, ecommerce brands, education platforms, service businesses, healthcare providers, real estate companies, and content websites. SEO is most effective when there\'s an existing online presence to optimize and grow.' },
  { q: 'What is included in monthly SEO services?', a: 'Monthly SEO includes a mix of: keyword rank tracking, technical audits and fixes, on-page optimization, content strategy updates, link building outreach (Growth/Authority plans), performance analysis, and a detailed report. The specific scope depends on your selected package.' },
  { q: 'Which SEO package is right for my business?', a: 'Starter SEO is best for businesses just beginning their SEO journey with a basic website. Growth SEO suits businesses actively looking to grow traffic through both technical and content SEO. Authority SEO is for brands committed to building dominant search presence in competitive industries. Book a free consultation — we\'ll recommend the right plan for your specific goals.' },
]

// ─── ENQUIRY MODAL ─────────────────────────────────────────────────────────────

function EnquiryModal({ onClose, title }: { onClose: () => void; title?: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', city: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitting(true); setError('')
    try {
      await submitLead({
        name: form.name.trim(), phone: form.phone.trim(),
        email: form.email || undefined, business: form.business || undefined,
        city: form.city || undefined, source: 'seo-page',
        service_interest: 'SEO Services',
        message: form.message || undefined,
      })
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book SEO Consultation'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-blue-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Consultation Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our SEO team will contact you within 2 hours.</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Website</label>
                <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="yourwebsite.com" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Ranchi" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">SEO Goal / Industry</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="E.g. Want to rank on page 1 for digital marketing keywords in Ranchi…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Book SEO Consultation <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function SEOPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  // Keyword ranking data for table
  const rankings = [
    { keyword: 'digital marketing ranchi', before: 45, after: 6, change: 39 },
    { keyword: 'seo services jharkhand', before: 28, after: 4, change: 24 },
    { keyword: 'whatsapp marketing india', before: 17, after: 3, change: 14 },
    { keyword: 'google ads agency ranchi', before: 52, after: 8, change: 44 },
  ]

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                Performance-Focused SEO Growth Partner · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                SEO Services Focused on{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Rankings, Traffic
                </span>{' '}
                &amp; Organic Growth
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Scale your business with technical SEO, content optimization, keyword strategy, and search visibility systems designed for long-term organic growth.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-indigo-800">
                <Globe className="w-3.5 h-3.5" />
                Built for businesses that want sustainable inbound traffic and search authority
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book SEO Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Get Free SEO Audit')} className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors">
                  Get SEO Audit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Technical SEO', 'Content & Blog SEO', 'Keyword Strategy', 'On-Page Optimization', 'Schema & Rich Results', 'AEO & AI Search Visibility', 'SEO Reporting', 'Organic Growth Systems'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — SEO Analytics Dashboard */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-3xl blur-3xl opacity-15 scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* Dashboard header */}
                  <div className="bg-navy px-5 py-3 flex items-center justify-between">
                    <span className="text-white text-sm font-bold flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-300" /> SEO Performance Dashboard
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 text-[10px] font-bold">Live</span>
                    </div>
                  </div>

                  {/* Traffic chart */}
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold text-slate-600">Organic Traffic</p>
                        <p className="text-xl font-black text-navy">12,847 <span className="text-sm font-semibold text-emerald-600">↑127%</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400">vs last year</p>
                        <p className="text-[10px] font-semibold text-slate-500">5,640 → 12,847</p>
                      </div>
                    </div>
                    {/* SVG line chart */}
                    <div className="relative h-20 bg-blue-50/40 rounded-xl overflow-hidden">
                      <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="seoGrad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.03" />
                          </linearGradient>
                        </defs>
                        <path d="M0 75 L40 70 L80 62 L120 54 L160 44 L200 36 L240 28 L280 22 L320 16 L360 11 L400 6 L400 80 L0 80 Z" fill="url(#seoGrad)" />
                        <polyline points="0,75 40,70 80,62 120,54 160,44 200,36 240,28 280,22 320,16 360,11 400,6" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="400" cy="6" r="4" fill="#2563eb" stroke="white" strokeWidth="2" />
                      </svg>
                      <div className="absolute bottom-1.5 left-0 right-0 flex justify-between px-2">
                        {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                          <span key={m} className="text-[7px] text-slate-400 font-medium">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Keyword rankings table */}
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Keyword Rankings</p>
                    <div className="space-y-1.5">
                      {rankings.map(r => (
                        <div key={r.keyword} className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-600 flex-1 truncate font-medium">{r.keyword}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[9px] text-slate-400 line-through">#{r.before}</span>
                            <ArrowRight className="w-2.5 h-2.5 text-slate-300" />
                            <span className="text-[10px] font-black text-blue-600">#{r.after}</span>
                            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">↑{r.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom metrics */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100">
                    {[
                      { l: 'Keywords', v: '182', sub: 'ranking', c: 'text-blue-600' },
                      { l: 'Avg Position', v: '#6.2', sub: 'overall', c: 'text-indigo-600' },
                      { l: 'DA Score', v: '48', sub: 'domain', c: 'text-violet-600' },
                    ].map(m => (
                      <div key={m.l} className="px-3 py-2.5 text-center">
                        <p className={`text-base font-black ${m.c}`}>{m.v}</p>
                        <p className="text-[8px] text-slate-500 font-medium">{m.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Organic Traffic</p><p className="text-sm font-extrabold text-slate-900">+127%</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">Ranking Keywords</p>
                  <p className="text-lg font-black flex items-center gap-1"><Search className="w-4 h-4" /> 182 Live</p>
                </div>
                <div className="absolute top-14 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[9px] font-bold text-slate-700">Organic Leads +89%</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">Month over month growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Ideal For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">SEO Services for Growing Businesses</h2>
            <p className="text-slate-500 mt-3 text-sm">Best suited for businesses with <strong className="text-navy">active websites</strong>.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO_IT_SERVES.map(biz => (
              <div key={biz.name} className={`bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${biz.color}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${biz.color}`}><biz.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{biz.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* SEO growth journey */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">SEO Growth Journey</p>
              <div className="space-y-2">
                {[
                  { icon: Globe, label: 'Your Website', sub: 'Existing web presence', color: 'bg-slate-100 text-slate-600', note: 'Starting point' },
                  { icon: Zap, label: 'SEO Optimization', sub: 'Technical + content + on-page', color: 'bg-blue-100 text-blue-600', note: 'Foundation' },
                  { icon: Search, label: 'Google Rankings', sub: 'Page 1 keyword positions', color: 'bg-indigo-100 text-indigo-600', note: 'Visibility' },
                  { icon: TrendingUp, label: 'Organic Traffic', sub: 'Consistent monthly growth', color: 'bg-violet-100 text-violet-600', note: 'Traffic' },
                  { icon: Users, label: 'Leads & Revenue', sub: 'Inbound qualified enquiries', color: 'bg-emerald-100 text-emerald-600', note: 'Growth' },
                ].map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}><s.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-navy">{s.label}</p>
                        <p className="text-xs text-slate-500">{s.sub}</p>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{s.note}</span>
                    </div>
                    {i < 4 && <div className="ml-4 w-px h-3 bg-slate-200 mt-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5" /> Growth-Focused SEO
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">SEO That Supports Real Business Growth</h2>
              <p className="text-slate-600 leading-relaxed">Most SEO work optimises for rankings alone. Scalify Labs optimises for <strong className="text-navy">business outcomes</strong> — more organic traffic, more qualified leads, and more inbound revenue from search.</p>
              <p className="text-slate-600 leading-relaxed">We combine technical SEO, keyword research, content strategy, on-page optimization, and analytics to build <strong className="text-navy">scalable organic growth systems.</strong></p>
              <div className="grid grid-cols-2 gap-2">
                {['Search visibility improvement', 'Organic traffic growth', 'Inbound lead generation', 'Content discoverability', 'Website authority building', 'Long-term business growth'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Full Scope</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">SEO Services Included</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{s.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT SEO ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" /> Content SEO
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Content SEO That Builds Long-Term Traffic</h2>
              <p className="text-slate-600 leading-relaxed">SEO content builds a compounding traffic engine — each article targeting a keyword cluster continues attracting organic visitors for months and years without additional spend.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Blog planning & content calendar', 'Search intent optimization', 'Keyword cluster targeting', 'Topical authority building', 'Internal linking strategy', 'SEO content optimization'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>

            {/* Content dashboard mockup */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                <span className="text-xs text-slate-500 font-medium mx-auto">Content SEO Strategy</span>
              </div>
              <div className="p-5 space-y-3">
                {/* Topic clusters */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Keyword Clusters</p>
                  {[
                    { cluster: 'Digital Marketing', articles: 8, traffic: '2.3K', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
                    { cluster: 'SEO Services', articles: 6, traffic: '1.8K', icon: Search, color: 'bg-indigo-100 text-indigo-600' },
                    { cluster: 'WhatsApp Marketing', articles: 5, traffic: '1.4K', icon: BarChart3, color: 'bg-violet-100 text-violet-600' },
                  ].map(c => (
                    <div key={c.cluster} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-1.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${c.color}`}><c.icon className="w-3.5 h-3.5" /></div>
                      <span className="text-xs font-semibold text-navy flex-1">{c.cluster}</span>
                      <span className="text-[10px] text-slate-500">{c.articles} articles</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{c.traffic}/mo</span>
                    </div>
                  ))}
                </div>
                {/* Content performance */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Content Performance</p>
                  {[{ l: 'Organic traffic from content', v: '68%', c: 'bg-blue-500' }, { l: 'Keyword coverage', v: '82%', c: 'bg-indigo-500' }, { l: 'Articles ranking page 1', v: '54%', c: 'bg-violet-500' }].map(b => (
                    <div key={b.l} className="mb-2">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[10px] font-semibold text-slate-600">{b.l}</span>
                        <span className="text-[10px] font-bold text-slate-900">{b.v}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${b.c}`} style={{ width: b.v }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECHNICAL SEO ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Tech audit dashboard */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                <span className="text-xs text-slate-500 font-medium mx-auto">Technical SEO Audit</span>
              </div>
              <div className="p-5">
                {/* Health score */}
                <div className="flex items-center gap-4 mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <div className="w-14 h-14 rounded-full border-4 border-emerald-400 flex items-center justify-center shrink-0">
                    <span className="text-lg font-black text-emerald-600">84</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">SEO Health Score</p>
                    <p className="text-xs text-emerald-600 font-semibold">Good · Improving ↑12 pts</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">After 3 months of optimization</p>
                  </div>
                </div>
                {/* Issue categories */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: 'Issues Fixed', val: '47', icon: Check, c: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                    { label: 'Pages Indexed', val: '182', icon: Globe, c: 'bg-blue-50 text-blue-700 border-blue-100' },
                    { label: 'Core Web Vitals', val: 'Pass', icon: Zap, c: 'bg-violet-50 text-violet-700 border-violet-100' },
                    { label: 'Mobile Score', val: '96/100', icon: Activity, c: 'bg-amber-50 text-amber-700 border-amber-100' },
                  ].map(m => (
                    <div key={m.label} className={`flex items-center gap-2 p-2.5 rounded-xl border ${m.c}`}>
                      <m.icon className="w-4 h-4 shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold opacity-70">{m.label}</p>
                        <p className="text-sm font-black">{m.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Checks */}
                {[
                  { l: 'Crawlability & Indexing', ok: true },
                  { l: 'Page Speed (Core Web Vitals)', ok: true },
                  { l: 'Schema / Structured Data', ok: true },
                  { l: 'Mobile Usability', ok: true },
                ].map(c => (
                  <div key={c.l} className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-0">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">{c.l}</span>
                    <span className="ml-auto text-[10px] text-emerald-600 font-bold">Optimized</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> Technical SEO
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Technical SEO for Better Search Performance</h2>
              <p className="text-slate-600 leading-relaxed">A technically optimized website gives search engines the signals they need to crawl, index, and rank your pages. Technical SEO is the invisible foundation that determines how much of your content Google actually sees and ranks.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Site crawl audits', 'Schema markup optimization', 'Page speed improvements', 'Indexing fixes & sitemaps', 'Core Web Vitals', 'Mobile usability optimization'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY BUSINESSES INVEST IN SEO ─────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">The ROI Case</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Invest in SEO</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_INVEST.map(f => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-blue-600" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Our SEO Execution Process</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">Structured monthly SEO execution aligned with measurable growth milestones.</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-blue-100 via-indigo-200 to-blue-100" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-blue-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-blue-400 transition-colors">
                  <step.icon className="w-7 h-7 text-blue-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-2 w-4 h-4 text-blue-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600 rounded-full blur-[120px] opacity-[0.08]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Investment</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">SEO Packages for Different Growth Stages</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PRICING_PLANS.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl overflow-hidden ${plan.highlight ? 'bg-gradient-to-b from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/20' : 'bg-white/5 border border-white/10'}`}>
                {plan.highlight && plan.badge && (
                  <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">{plan.badge}</div>
                )}
                <div className="px-6 py-8">
                  <p className="text-[11px] uppercase tracking-widest font-bold mb-2" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>{plan.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-white/70' : 'text-slate-400'}`}>{plan.period}</span>
                  </div>
                  <p className={`text-xs mb-5 ${plan.highlight ? 'text-white/70' : 'text-slate-500'}`}>{plan.best}</p>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white/90' : 'text-slate-300'}`}>
                        <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-white' : 'text-blue-400'}`} />{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => open()} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.highlight ? 'bg-white text-blue-700 hover:bg-white/90' : 'bg-white/10 text-white border border-white/20 hover:bg-white/15'}`}>
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity">
              Book SEO Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Free SEO Audit')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get SEO Audit
            </button>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We focus on SEO that supports measurable business growth — not vanity rankings.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-blue-600" /></div>
                <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors" aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-64' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.04]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-300 rounded-full blur-[120px] opacity-[0.06]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Performance-Focused SEO Growth Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Build Sustainable Organic Growth With SEO
          </h2>
          <p className="text-white/80 text-lg mb-3">Improve rankings, traffic, search visibility, and inbound lead generation with scalable SEO systems designed for business growth.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Technical SEO + Content SEO + Analytics · Packages from ₹15,000/month
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Book SEO Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Free SEO Audit')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get SEO Audit
            </button>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow shadow-blue-200">
          Book Consultation
        </button>
        <button onClick={() => open('Get Free SEO Audit')} className="flex-1 py-3 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-xl">
          Get SEO Audit
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
