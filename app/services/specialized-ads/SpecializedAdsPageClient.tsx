'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Target, BarChart3, Globe, Layers, Users, Zap, Shield,
  GraduationCap, HeartPulse, Building2, ShoppingBag,
  Check, Sparkles, Rocket, Activity, Search,
  Phone, Mail, User, MapPin, Briefcase, CircleDollarSign,
  Smartphone, BookOpen, RefreshCw, Eye, MessageSquare,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    name: 'LinkedIn Ads',
    tag: 'B2B Targeting',
    tagColor: 'bg-blue-100 text-blue-700',
    bestFor: 'Professionals, decision-makers, enterprise buyers',
    headerColor: 'bg-[#0A66C2]',
    features: ['Job title & seniority targeting', 'Company size & industry filters', 'Lead Gen Forms (native)', 'Account-Based Marketing'],
    stat: '750M+ professionals',
  },
  {
    name: 'Quora Ads',
    tag: 'Intent-Based',
    tagColor: 'bg-red-100 text-red-700',
    bestFor: 'High-intent researchers actively seeking answers',
    headerColor: 'bg-[#B92B27]',
    features: ['Question & topic targeting', 'Keyword intent targeting', 'Decision-stage audience', 'Educational campaigns'],
    stat: '300M+ monthly readers',
  },
  {
    name: 'Truecaller Ads',
    tag: 'Mobile-First',
    tagColor: 'bg-emerald-100 text-emerald-700',
    bestFor: 'Mobile-first campaigns, caller ID visibility, app installs',
    headerColor: 'bg-[#1DAA61]',
    features: ['Caller ID ads', 'Regional mobile targeting', 'App install campaigns', 'Tier 2 & 3 city reach'],
    stat: '300M+ Indian users',
  },
  {
    name: 'Taboola Ads',
    tag: 'Native Discovery',
    tagColor: 'bg-blue-100 text-blue-700',
    bestFor: 'Content discovery, native traffic, article promotion',
    headerColor: 'bg-[#1c64f2]',
    features: ['Recommendation feeds', 'Content amplification', 'Premium publisher network', 'Interest-based targeting'],
    stat: '9K+ premium publishers',
  },
  {
    name: 'Outbrain Ads',
    tag: 'Premium Reach',
    tagColor: 'bg-orange-100 text-orange-700',
    bestFor: 'Premium publisher audiences, content marketing, awareness',
    headerColor: 'bg-[#FF6B35]',
    features: ['Sponsored content', 'Native article placements', 'Top-of-funnel awareness', 'Premium news publishers'],
    stat: 'CNN, BBC, Reuters reach',
  },
  {
    name: 'ShareChat Ads',
    tag: 'Regional Scale',
    tagColor: 'bg-yellow-100 text-yellow-700',
    bestFor: 'Vernacular audience, regional brand campaigns, mass reach',
    headerColor: 'bg-[#EC9B2A]',
    features: ['15+ regional languages', 'Tier 2 & 3 city targeting', 'Social sharing formats', 'Video & image campaigns'],
    stat: '180M+ regional users',
  },
  {
    name: 'Moj Ads',
    tag: 'Short Video',
    tagColor: 'bg-purple-100 text-purple-700',
    bestFor: 'Short-video campaigns reaching regional and rural audiences',
    headerColor: 'bg-[#7C3AED]',
    features: ['In-video native ads', 'Creator partnership ads', 'Regional video reach', 'Young demographic targeting'],
    stat: '160M+ creators & viewers',
  },
  {
    name: 'Inshorts Ads',
    tag: 'Urban News',
    tagColor: 'bg-slate-100 text-slate-700',
    bestFor: 'Urban news readers, mobile professionals, awareness campaigns',
    headerColor: 'bg-slate-800',
    features: ['News-feed placements', 'Urban millennial targeting', 'Premium news context', 'Short-format display ads'],
    stat: '10M+ daily active readers',
  },
]

const CAMPAIGN_GOALS = [
  { icon: Users, name: 'B2B Lead Generation', color: 'bg-blue-100 text-blue-600' },
  { icon: Eye, name: 'Brand Awareness', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Smartphone, name: 'App Installs', color: 'bg-violet-100 text-violet-600' },
  { icon: Users, name: 'Webinar Registrations', color: 'bg-emerald-100 text-emerald-600' },
  { icon: BookOpen, name: 'Content Promotion', color: 'bg-amber-100 text-amber-600' },
  { icon: Globe, name: 'Regional Audience Reach', color: 'bg-orange-100 text-orange-600' },
  { icon: Target, name: 'Decision-Maker Targeting', color: 'bg-blue-100 text-blue-600' },
  { icon: TrendingUp, name: 'Website Traffic Growth', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Search, name: 'High-Intent Lead Capture', color: 'bg-rose-100 text-rose-600' },
  { icon: RefreshCw, name: 'Retargeting Campaigns', color: 'bg-teal-100 text-teal-600' },
]

const STEPS = [
  { icon: Search, num: '01', title: 'Audience & Platform Research', desc: 'We analyse your audience behaviour, industry, and campaign objective to recommend the right platforms and targeting approach.' },
  { icon: Layers, num: '02', title: 'Media Planning', desc: 'Platform selection, budget allocation, audience mapping, and campaign structure planned before any ad spend.' },
  { icon: Zap, num: '03', title: 'Campaign Setup', desc: 'Full campaign configuration — targeting, creatives, placements, tracking pixels, and lead integrations set up correctly.' },
  { icon: BarChart3, num: '04', title: 'Optimization & Scaling', desc: 'Weekly performance reviews — pause underperforming segments, scale winning placements, improve CPL and audience quality.' },
  { icon: TrendingUp, num: '05', title: 'Reporting & Insights', desc: 'Monthly cross-platform reports with leads generated, cost per result, audience insights, and next-phase strategy.' },
]

const WHY_CARDS = [
  { icon: Layers, title: 'Multi-Platform Expertise', desc: 'LinkedIn, Quora, Truecaller, Taboola, Outbrain, ShareChat — we plan and execute across the full specialized advertising ecosystem.' },
  { icon: Users, title: 'Audience-First Media Planning', desc: 'Every platform is chosen based on where your specific audience spends time — not based on habit or convenience.' },
  { icon: Target, title: 'B2B & Niche Targeting', desc: 'Deep experience targeting professionals, decision-makers, intent-driven researchers, and niche industry audiences.' },
  { icon: Globe, title: 'Regional Campaign Capabilities', desc: 'Regional language campaigns across ShareChat, Moj, Truecaller for Tier 2 & 3 city audience reach at scale.' },
  { icon: BarChart3, title: 'Performance-Focused Execution', desc: 'Campaigns built around measurable outcomes — leads, CPL, registrations — not just reach and impressions.' },
  { icon: Shield, title: 'Scalable Advertising Systems', desc: 'Multi-platform campaigns designed to scale — adding new platforms as audience data proves channel effectiveness.' },
]

const FAQ_ITEMS = [
  { q: 'Which advertising platforms do you support?', a: 'We manage campaigns across LinkedIn, Quora, Truecaller, Taboola, Outbrain, ShareChat, Moj, and Inshorts. Platform selection depends on your target audience, industry, and campaign objective. We help businesses choose the right mix based on where their audience actually spends time.' },
  { q: 'Which platform is best for B2B advertising?', a: 'LinkedIn is the primary B2B advertising platform — with job title, seniority, company size, and industry targeting capabilities. Quora is excellent for B2B businesses in SaaS, consulting, finance, and healthcare where high-intent research audiences are looking for solutions. We combine both for most B2B campaigns.' },
  { q: 'Can campaigns target regional language audiences?', a: 'Yes. ShareChat and Moj support 15+ regional Indian languages with native content ad formats. Truecaller supports regional mobile targeting across Tier 2 and Tier 3 cities. These platforms are ideal for mass-market campaigns, regional brand awareness, FMCG, and local businesses reaching non-English audiences.' },
  { q: 'Are ad creatives included in campaign management?', a: 'Creative direction, ad copy, and static image ads are included in campaign management. Video production for Truecaller, Moj, or Taboola video campaigns may require additional production charges or client-provided assets. LinkedIn creative design (static images and copy) is included.' },
  { q: 'Do you manage native advertising on Taboola and Outbrain?', a: 'Yes. We manage native content campaigns on Taboola and Outbrain — including headline writing, visual selection, landing page recommendations, and content amplification strategy. Native ads work best for awareness-stage campaigns, article promotion, and driving qualified traffic to long-form content.' },
  { q: 'Can campaigns run across multiple platforms simultaneously?', a: 'Yes. We regularly design multi-platform media plans — for example, LinkedIn for B2B decision-makers, Quora for high-intent researchers, and Taboola for content amplification, all running simultaneously with different messaging for each audience context.' },
  { q: 'Is reporting included across all platforms?', a: 'Yes. You receive a monthly consolidated report covering all active platforms — showing leads, cost per lead, audience performance, platform-wise spend, and creative performance insights. We use UTM tracking and pixel-based attribution across all campaigns.' },
  { q: 'What is the minimum campaign duration?', a: 'Minimum 3-month campaign engagement is recommended for most platforms to allow sufficient data collection, audience optimization, and meaningful performance improvements. LinkedIn campaigns especially require time to optimize for lead quality given the higher CPL environment.' },
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
        city: form.city || undefined, source: 'specialized-ads-page',
        service_interest: 'Specialized Advertising Platforms',
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
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book Advertising Consultation'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-indigo-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Consultation Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our team will prepare a media plan and call you within 2 hours.</p>
            <button onClick={onClose} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your business" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Campaign Budget</label>
                <div className="relative"><CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. ₹50,000" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Campaign Objective / Platforms of Interest</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="E.g. B2B lead generation via LinkedIn for SaaS product, budget ₹80,000/month…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-slate-800 to-indigo-700 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Book Consultation <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function SpecializedAdsPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-80" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                Multi-Platform Paid Growth Specialists · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Reach High-Intent Audiences{' '}
                <span className="bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
                  Beyond Google &amp; Meta
                </span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Run highly targeted campaigns across LinkedIn, Quora, Truecaller, native advertising platforms, and premium audience networks designed for B2B growth, awareness, and lead generation.
              </p>

              {/* Platform badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'LinkedIn', color: 'bg-[#0A66C2] text-white' },
                  { name: 'Quora', color: 'bg-[#B92B27] text-white' },
                  { name: 'Truecaller', color: 'bg-emerald-600 text-white' },
                  { name: 'Taboola', color: 'bg-blue-600 text-white' },
                  { name: 'Outbrain', color: 'bg-orange-500 text-white' },
                  { name: 'ShareChat', color: 'bg-yellow-500 text-white' },
                  { name: 'Moj', color: 'bg-purple-600 text-white' },
                  { name: 'Inshorts', color: 'bg-slate-700 text-white' },
                ].map(p => (
                  <span key={p.name} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${p.color}`}>{p.name}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-indigo-700 text-white font-bold rounded-full shadow-lg shadow-slate-300 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book Advertising Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Get Media Plan')} className="flex items-center gap-2 px-6 py-3 border-2 border-slate-700 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-colors">
                  Get Media Plan
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['LinkedIn Ads (B2B)', 'Quora Intent Targeting', 'Truecaller Mobile Ads', 'Native Advertising', 'B2B Audience Targeting', 'Regional Platform Campaigns'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Multi-Platform Command Center */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-indigo-300 rounded-3xl blur-3xl opacity-15 scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-slate-900 to-indigo-900 px-5 py-3 flex items-center justify-between">
                    <span className="text-white text-sm font-bold flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-300" /> Multi-Platform Dashboard</span>
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-emerald-400 text-[10px] font-bold">5 Platforms Active</span></div>
                  </div>

                  {/* Platform tabs */}
                  <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-100 overflow-x-auto">
                    {[{ n: 'LinkedIn', c: 'bg-[#0A66C2] text-white' }, { n: 'Quora', c: 'bg-[#B92B27] text-white' }, { n: 'Truecaller', c: 'bg-emerald-600 text-white' }, { n: 'Taboola', c: 'bg-slate-100 text-slate-600' }, { n: 'ShareChat', c: 'bg-slate-100 text-slate-600' }].map(t => (
                      <span key={t.n} className={`text-[8px] font-bold px-2 py-1 rounded-full shrink-0 ${t.c}`}>{t.n}</span>
                    ))}
                  </div>

                  {/* LinkedIn campaign highlight */}
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-[#0A66C2] rounded flex items-center justify-center"><span className="text-white text-[8px] font-black">in</span></div>
                      <p className="text-xs font-bold text-navy">B2B LinkedIn Campaign — SaaS Lead Gen</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[{ l: 'Impressions', v: '284K' }, { l: 'Leads', v: '47' }, { l: 'CPL', v: '₹842' }].map(s => (
                        <div key={s.l} className="bg-blue-50 rounded-xl p-2 text-center">
                          <p className="text-sm font-black text-[#0A66C2]">{s.v}</p>
                          <p className="text-[8px] text-slate-500 font-medium">{s.l}</p>
                        </div>
                      ))}
                    </div>
                    {/* Audience breakdown */}
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Audience Targeting</p>
                    {[{ l: 'CXOs & Founders', pct: 42 }, { l: 'HR Directors', pct: 28 }, { l: 'Tech Decision Makers', pct: 30 }].map(a => (
                      <div key={a.l} className="mb-1.5">
                        <div className="flex justify-between mb-0.5"><span className="text-[9px] font-semibold text-slate-600">{a.l}</span><span className="text-[9px] font-bold text-[#0A66C2]">{a.pct}%</span></div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#0A66C2] rounded-full" style={{ width: `${a.pct}%` }} /></div>
                      </div>
                    ))}
                  </div>

                  {/* Other platforms summary */}
                  <div className="p-4 space-y-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cross-Platform Summary</p>
                    {[
                      { platform: 'Quora', metric: '1,247 clicks', cpl: '₹312 CPL', dot: 'bg-[#B92B27]' },
                      { platform: 'Truecaller', metric: '312 calls', cpl: '8 cities', dot: 'bg-emerald-500' },
                      { platform: 'Taboola Native', metric: '45K views', cpl: '2.8% CTR', dot: 'bg-blue-500' },
                      { platform: 'ShareChat', metric: '2.1L reach', cpl: 'Regional', dot: 'bg-yellow-500' },
                    ].map(p => (
                      <div key={p.platform} className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-0">
                        <div className={`w-2 h-2 rounded-full ${p.dot} shrink-0`} />
                        <span className="text-[10px] font-semibold text-navy flex-1">{p.platform}</span>
                        <span className="text-[9px] text-slate-500">{p.metric}</span>
                        <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full shrink-0">{p.cpl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center"><Users className="w-4 h-4 text-[#0A66C2]" /></div>
                  <div><p className="text-[9px] text-slate-500">B2B Leads</p><p className="text-sm font-extrabold text-slate-900">CPL ₹842</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-gradient-to-r from-slate-800 to-indigo-700 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">Platforms Active</p>
                  <p className="text-lg font-black flex items-center gap-1"><Layers className="w-4 h-4" /> 5 Channels</p>
                </div>
                <div className="absolute top-16 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-700">Intent Audiences Only</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">Higher lead quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY SPECIALIZED ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Platform comparison visual */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Audience-Platform Alignment</p>
              <div className="space-y-3">
                {[
                  { platform: 'LinkedIn', audience: 'Professionals & decision-makers', when: 'B2B products, SaaS, recruitment, enterprise', color: 'bg-[#0A66C2]', icon: '🏢' },
                  { platform: 'Quora', audience: 'High-intent researchers', when: 'Education, finance, SaaS, consulting', color: 'bg-[#B92B27]', icon: '🔍' },
                  { platform: 'Truecaller', audience: 'Mobile-first users', when: 'Local, regional, app installs, mass reach', color: 'bg-emerald-600', icon: '📱' },
                  { platform: 'Taboola / Outbrain', audience: 'Content discovery audiences', when: 'Awareness, articles, brand building', color: 'bg-orange-500', icon: '📰' },
                  { platform: 'ShareChat / Moj', audience: 'Regional language users', when: 'Tier 2/3 cities, FMCG, local brands', color: 'bg-yellow-500', icon: '🗣️' },
                ].map(p => (
                  <div key={p.platform} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-sm ${p.color}`}>{p.icon}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-navy">{p.platform}</p>
                      <p className="text-xs text-slate-500">{p.audience}</p>
                      <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Best for: {p.when}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" /> Audience Intelligence
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Not Every Audience Lives on Google or Instagram</h2>
              <p className="text-slate-600 leading-relaxed">Different audiences live in different contexts. A B2B decision-maker researches solutions on LinkedIn and Quora — not on Instagram. A regional mobile user is reachable on ShareChat, Moj, and Truecaller — not Google Search.</p>
              <p className="text-slate-600 leading-relaxed">Scalify Labs helps businesses <strong className="text-navy">advertise where their audience actually spends time</strong> — choosing the right platforms based on industry, audience behaviour, and campaign objective.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Platform selection strategy', 'Audience behaviour mapping', 'Multi-platform media planning', 'Lead quality optimization', 'B2B decision-maker reach', 'Regional language campaigns'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORMS ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Platform Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Platforms We Work With</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORMS.map(p => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`${p.headerColor} px-4 py-3 flex items-center justify-between`}>
                  <span className="text-white text-sm font-bold">{p.name}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 mb-3 italic">{p.bestFor}</p>
                  <ul className="space-y-1.5">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3 h-3 text-indigo-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-semibold">{p.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAMPAIGN GOALS ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">What We Help You Achieve</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Campaign Goals We Support</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CAMPAIGN_GOALS.map(g => (
              <div key={g.name} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${g.color}`}><g.icon className="w-4 h-4" /></div>
                <span className="text-xs font-semibold text-slate-700">{g.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LINKEDIN SECTION ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#EEF3FB', color: '#0A66C2' }}>
                <Users className="w-3.5 h-3.5" /> LinkedIn Advertising
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">LinkedIn Ads for B2B Growth</h2>
              <p className="text-slate-600 leading-relaxed">LinkedIn is the world&apos;s most powerful B2B advertising platform — with job title, seniority level, company size, industry, and skill-based targeting unavailable anywhere else. It&apos;s the only platform where you can reach a <strong className="text-navy">CFO, CTO, or HR Director</strong> with precision.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Founder & CXO targeting', 'Company & industry filters', 'Lead Gen Forms (in-platform)', 'Account-Based Marketing', 'Webinar & event promotion', 'Recruitment campaigns'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 shrink-0" style={{ color: '#0A66C2' }} />{b}
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn dashboard mockup */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-2.5" style={{ background: '#0A66C2' }}>
                <div className="w-7 h-7 bg-white rounded flex items-center justify-center"><span className="font-black text-sm" style={{ color: '#0A66C2' }}>in</span></div>
                <span className="text-white text-sm font-bold">LinkedIn Campaign Manager</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'Impressions', v: '284K', c: 'text-navy' }, { l: 'Lead Forms', v: '47', c: 'text-blue-700' }, { l: 'CPL', v: '₹842', c: 'text-indigo-700' }].map(s => (
                    <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: '#EEF3FB' }}>
                      <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Audience Targeting Active</p>
                  {[{ l: 'Job Title: CXO, Founders, Directors', v: '42%' }, { l: 'Company Size: 50–500 employees', v: '35%' }, { l: 'Industry: SaaS, Finance, Education', v: '23%' }].map(a => (
                    <div key={a.l} className="mb-2">
                      <div className="flex justify-between mb-0.5"><span className="text-[10px] font-semibold text-slate-600">{a.l}</span><span className="text-[10px] font-bold" style={{ color: '#0A66C2' }}>{a.v}</span></div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: a.v, background: '#0A66C2' }} /></div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-3 border flex items-center gap-2.5" style={{ background: '#EEF3FB', borderColor: '#cfe0f9' }}>
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#0A66C2' }} />
                  <p className="text-xs font-semibold" style={{ color: '#0A66C2' }}>47 qualified B2B leads captured via LinkedIn Lead Gen Forms this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUORA & INTENT ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Quora dashboard */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-2" style={{ background: '#B92B27' }}>
                <div className="w-7 h-7 bg-white rounded flex items-center justify-center"><span className="font-black text-sm" style={{ color: '#B92B27' }}>Q</span></div>
                <span className="text-white text-sm font-bold">Quora Ads Manager</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'Traffic', v: '1.2K', c: 'text-red-700' }, { l: 'Leads', v: '28', c: 'text-navy' }, { l: 'CPL', v: '₹312', c: 'text-emerald-600' }].map(s => (
                    <div key={s.l} className="bg-red-50 rounded-xl p-3 text-center">
                      <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Keyword Targeting Active</p>
                  {['"best digital marketing course"', '"SEO services for startups"', '"how to generate leads online"'].map(kw => (
                    <div key={kw} className="flex items-center gap-2 mb-1.5 p-2 rounded-lg bg-red-50 border border-red-100">
                      <Search className="w-3 h-3 text-red-600 shrink-0" />
                      <span className="text-[10px] font-mono text-red-800">{kw}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" /> Intent-Based Advertising
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Reach Users Already Searching for Answers</h2>
              <p className="text-slate-600 leading-relaxed">Quora users are actively researching products, comparing services, and seeking expert recommendations. Advertising here means reaching people who are <strong className="text-navy">already in a decision-making mindset</strong> — not interrupting passive scrollers.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Education & courses', 'SaaS & technology', 'Finance & insurance', 'Healthcare decisions', 'B2B service comparisons', 'Consulting & advisory'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-red-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NATIVE ADVERTISING ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> Native Advertising
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Native Advertising Across Premium Content Platforms</h2>
              <p className="text-slate-600 leading-relaxed">Native ads blend seamlessly into content experiences — on news sites, blogs, and article feeds — reaching audiences in a non-disruptive, context-relevant environment that drives significantly higher engagement than banner ads.</p>
              <div className="grid grid-cols-2 gap-3">
                {[{ name: 'Taboola', color: '#1c64f2', desc: 'Recommendation feeds on major Indian news sites' }, { name: 'Outbrain', color: '#FF6B35', desc: 'Premium publishers including CNN, TOI, and ET' }, { name: 'Inshorts', color: '#333', desc: '60-word news cards reaching urban professionals' }].map(p => (
                  <div key={p.name} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="w-6 h-6 rounded flex items-center justify-center mb-2 text-white text-[8px] font-black" style={{ background: p.color }}>{p.name[0]}</div>
                    <p className="text-xs font-bold text-navy">{p.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{p.desc}</p>
                  </div>
                ))}
                <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100 flex flex-col justify-center items-center">
                  <p className="text-2xl font-black text-indigo-600">2.8%</p>
                  <p className="text-[10px] text-slate-500 font-medium">avg native CTR</p>
                </div>
              </div>
            </div>

            {/* Native ad preview */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-800 px-5 py-3 flex items-center gap-2">
                <span className="text-white text-sm font-bold">Native Content Feed Preview</span>
                <span className="ml-auto text-[10px] text-slate-400 bg-slate-700 px-2 py-0.5 rounded">TOI / ET / Deccan Chronicle</span>
              </div>
              <div className="p-4 space-y-3">
                {/* Regular article */}
                <div className="flex gap-3 p-2 border-b border-slate-100">
                  <div className="w-16 h-12 bg-slate-100 rounded shrink-0" />
                  <div><p className="text-[11px] font-semibold text-navy leading-tight">Budget 2025 key highlights for small businesses</p><p className="text-[9px] text-slate-400 mt-0.5">ET Now · 2h ago</p></div>
                </div>
                {/* Native ad - highlighted */}
                <div className="flex gap-3 p-2 bg-orange-50 border border-orange-100 rounded-xl">
                  <div className="w-16 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded shrink-0 flex items-center justify-center text-white text-[8px] font-bold text-center leading-tight px-1">Your Brand Here</div>
                  <div>
                    <p className="text-[11px] font-semibold text-navy leading-tight">How Indian SMBs are growing 3x faster with digital marketing</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[8px] text-orange-600 font-bold bg-orange-100 px-1 rounded">Sponsored</span>
                      <span className="text-[9px] text-slate-400">Scalify Labs · Promoted</span>
                    </div>
                  </div>
                </div>
                {/* Another article */}
                <div className="flex gap-3 p-2 border-b border-slate-100">
                  <div className="w-16 h-12 bg-slate-100 rounded shrink-0" />
                  <div><p className="text-[11px] font-semibold text-navy leading-tight">RBI keeps repo rate unchanged for 5th consecutive time</p><p className="text-[9px] text-slate-400 mt-0.5">Mint · 3h ago</p></div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-500 shrink-0" />
                  <p className="text-xs text-slate-600"><strong>Native ads</strong> drive 53% more engagement than traditional display advertising</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REGIONAL & MOBILE ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">Regional Reach</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Reach Regional &amp; Mobile-First Audiences</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm">600M+ Indians online in regional languages. ShareChat, Moj, and Truecaller reach the audiences Google and Meta often miss.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'ShareChat', color: '#EC9B2A', logo: 'SC', stat: '180M+ users', desc: '15+ regional languages · Social sharing ads · Tier 2 & 3 city dominance', best: 'FMCG, Local Brands, Political, Entertainment' },
              { name: 'Moj', color: '#7C3AED', logo: 'M', stat: '160M+ users', desc: 'Short-video format · Creator ecosystem · Regional entertainment reach', best: 'Brand awareness, Youth campaigns, Regional FMCG' },
              { name: 'Truecaller', color: '#1DAA61', logo: 'TC', stat: '300M+ Indian users', desc: 'Caller ID ads · Mobile-first targeting · Pan-India and regional reach', best: 'Finance, Telecom, Local businesses, App installs' },
            ].map(p => (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="px-5 py-4 text-white flex items-center gap-3" style={{ background: p.color }}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-black">{p.logo}</div>
                  <div>
                    <p className="font-bold text-base">{p.name}</p>
                    <p className="text-[11px] opacity-80">{p.stat}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-600 mb-3">{p.desc}</p>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Best For</p>
                    <p className="text-xs font-semibold text-navy">{p.best}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Execution Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Our Campaign Execution Process</h2>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-slate-100 via-indigo-200 to-slate-100" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-slate-200 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-indigo-400 transition-colors">
                  <step.icon className="w-7 h-7 text-indigo-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-2 w-4 h-4 text-slate-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[150px] opacity-[0.1]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600 rounded-full blur-[120px] opacity-[0.1]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Custom Pricing Based on Platform &amp; Campaign Goals</h2>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
            <p className="text-slate-300 mb-5">Pricing for specialized advertising platforms depends on multiple factors:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {['Advertising platform(s) selected', 'Audience targeting complexity', 'Campaign scale & ad spend', 'Creative production requirements', 'Number of platforms managed', 'Reporting & analytics depth'].map(f => (
                <div key={f} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />{f}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-slate-400 text-sm">Minimum 3-month campaign engagement recommended for audience optimization and meaningful performance data.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all">
              Book Advertising Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Media Plan')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get Media Plan
            </button>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We help businesses advertise where their audience actually spends time.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-indigo-600" /></div>
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
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors" aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-indigo-600' : ''}`} />
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Platform color blobs */}
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: '#0A66C2' }} />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full blur-3xl opacity-15" style={{ background: '#B92B27' }} />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full blur-3xl opacity-15" style={{ background: '#1DAA61' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Multi-Platform Paid Growth Specialists
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Reach the Right Audience Across Premium Advertising Platforms
          </h2>
          <p className="text-white/80 text-lg mb-3">Run highly targeted campaigns across LinkedIn, Quora, Truecaller, native advertising networks, and regional audience platforms with performance-focused execution.</p>
          {/* Platform pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {[{ n: 'LinkedIn', c: '#0A66C2' }, { n: 'Quora', c: '#B92B27' }, { n: 'Truecaller', c: '#1DAA61' }, { n: 'Taboola', c: '#1c64f2' }, { n: 'Outbrain', c: '#FF6B35' }, { n: 'ShareChat', c: '#EC9B2A' }, { n: 'Moj', c: '#7C3AED' }, { n: 'Inshorts', c: '#64748b' }].map(p => (
              <span key={p.n} className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: `${p.c}33`, border: `1px solid ${p.c}55` }}>{p.n}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-800 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Book Advertising Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Media Plan')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get Media Plan
            </button>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-slate-800 to-indigo-700 text-white text-sm font-bold rounded-xl shadow">Book Consultation</button>
        <button onClick={() => open('Get Media Plan')} className="flex-1 py-3 border-2 border-slate-700 text-slate-700 text-sm font-bold rounded-xl">Get Media Plan</button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
