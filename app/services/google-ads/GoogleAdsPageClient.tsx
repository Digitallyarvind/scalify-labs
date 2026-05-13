'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Search, BarChart3, Target, Zap, Activity, Shield,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  Check, Sparkles, Rocket, Users, Globe, PhoneCall,
  Phone, Mail, User, MapPin, Briefcase,
  Play, Layers, RefreshCw, MousePointerClick,
  TrendingDown, CircleDollarSign, Eye,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const WHO_IT_SERVES = [
  { icon: HeartPulse, name: 'Clinics & Healthcare', desc: 'Appointment bookings, doctor consultation calls, health camp signups', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: GraduationCap, name: 'Education & Coaching', desc: 'Admission leads, demo class signups, counsellor call requests', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: Building2, name: 'Real Estate', desc: 'Site visit leads, property enquiries, NRI targeting campaigns', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: ShoppingBag, name: 'Ecommerce', desc: 'Product sales, Shopping Ads, Performance Max campaigns', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Store, name: 'Home Furnishing', desc: 'Showroom visits, product catalogue ads, local targeting', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: Zap, name: 'Service Businesses', desc: 'Inbound calls, service enquiry leads, local reach campaigns', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: Sparkles, name: 'Startups', desc: 'Rapid lead generation, product launch visibility, growth scaling', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: Globe, name: 'Local Businesses', desc: 'Google Maps ads, nearby customer targeting, call campaigns', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
]

const AD_SERVICES = [
  { icon: Search, name: 'Search Ads', desc: 'Capture high-intent searches on Google with text ads targeting active buyers', color: 'bg-blue-100 text-blue-600' },
  { icon: Eye, name: 'Display Ads', desc: 'Visual banner ads across Google Display Network for awareness and retargeting', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Play, name: 'YouTube Ads', desc: 'Video campaigns on YouTube for awareness, engagement, and conversion', color: 'bg-red-100 text-red-600' },
  { icon: Zap, name: 'Performance Max', desc: 'AI-driven campaigns across all Google channels for maximum conversion', color: 'bg-violet-100 text-violet-600' },
  { icon: RefreshCw, name: 'Remarketing', desc: 'Re-engage users who visited your site but did not convert', color: 'bg-amber-100 text-amber-600' },
  { icon: PhoneCall, name: 'Call Campaigns', desc: 'Drive direct phone calls from Google Ads for service businesses', color: 'bg-emerald-100 text-emerald-600' },
  { icon: MapPin, name: 'Local Ads', desc: 'Reach nearby customers through location-targeted Google campaigns', color: 'bg-orange-100 text-orange-600' },
  { icon: ShoppingBag, name: 'Shopping Ads', desc: 'Product listing ads on Google Search and Shopping tab for ecommerce', color: 'bg-pink-100 text-pink-600' },
  { icon: Activity, name: 'Conversion Tracking', desc: 'Setup call tracking, form fills, and analytics for precise ROI measurement', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Target, name: 'Landing Page Guidance', desc: 'Recommendations to improve landing pages for better conversion rates', color: 'bg-rose-100 text-rose-600' },
]

const CAMPAIGN_TYPES = [
  { icon: Users, title: 'Lead Generation Campaigns', desc: 'Search and display campaigns designed to generate qualified calls and form fills from high-intent users', color: 'border-blue-200 bg-blue-50/50', accent: 'bg-blue-600 text-white', tag: 'Most Common' },
  { icon: PhoneCall, title: 'Appointment Booking Campaigns', desc: 'Call-focused campaigns for clinics, consultants, and service businesses that need phone bookings', color: 'border-emerald-200 bg-emerald-50/50', accent: 'bg-emerald-600 text-white', tag: 'Clinics & Services' },
  { icon: ShoppingBag, title: 'Ecommerce Sales Campaigns', desc: 'Shopping Ads and Performance Max campaigns driving product purchases and ROAS optimization', color: 'border-amber-200 bg-amber-50/50', accent: 'bg-amber-600 text-white', tag: 'Ecommerce' },
  { icon: MapPin, title: 'Local Business Campaigns', desc: 'Location-targeted campaigns reaching nearby customers to drive store visits, calls, and enquiries', color: 'border-violet-200 bg-violet-50/50', accent: 'bg-violet-600 text-white', tag: 'Local Reach' },
  { icon: Play, title: 'YouTube Video Campaigns', desc: 'Skippable and non-skippable video ads on YouTube to build awareness, trust, and brand recall', color: 'border-red-200 bg-red-50/50', accent: 'bg-red-600 text-white', tag: 'Awareness' },
  { icon: RefreshCw, title: 'Remarketing Campaigns', desc: 'Re-engage website visitors who showed intent but did not convert — at a lower cost per conversion', color: 'border-cyan-200 bg-cyan-50/50', accent: 'bg-cyan-600 text-white', tag: 'Re-engagement' },
]

const WHY_GOOGLE = [
  { icon: Zap, title: 'Fast Lead Generation', desc: 'Google Ads can deliver leads within hours of campaign launch.' },
  { icon: Target, title: 'Intent-Based Targeting', desc: 'Reach users actively searching for your products and services.' },
  { icon: MapPin, title: 'Local Customer Reach', desc: 'Target users in specific cities, neighbourhoods, or radius zones.' },
  { icon: BarChart3, title: 'Measurable ROI', desc: 'Every click, call, and conversion tracked and reported.' },
  { icon: TrendingUp, title: 'Scalable Campaigns', desc: 'Increase budgets and reach as campaigns prove profitable.' },
  { icon: RefreshCw, title: 'Remarketing Power', desc: 'Re-engage users who visited your site without converting.' },
  { icon: CircleDollarSign, title: 'Flexible Budget Control', desc: 'Start with any budget and scale based on results.' },
  { icon: Eye, title: 'Immediate Visibility', desc: 'Appear at the top of Google search results from day one.' },
]

const STEPS = [
  { icon: Search, num: '01', title: 'Business & Audience Research', desc: 'Deep analysis of your market, competitors, keywords, and target audience to build the right campaign strategy.' },
  { icon: Target, num: '02', title: 'Campaign Planning & Setup', desc: 'Campaign structure, ad groups, keyword lists, bidding strategy, audience targeting, and conversion tracking configured.' },
  { icon: BarChart3, num: '03', title: 'Ad Copy & Creative Strategy', desc: 'Compelling ad headlines, descriptions, extensions, and creative assets crafted for maximum click-through rates.' },
  { icon: Zap, num: '04', title: 'Optimization & Scaling', desc: 'Weekly performance reviews — pause underperforming keywords, scale winning ads, improve Quality Scores and CPL.' },
  { icon: TrendingUp, num: '05', title: 'Reporting & Growth Tracking', desc: 'Monthly reports with leads generated, cost per lead, ROAS, impression share, and next month\'s growth plan.' },
]

const WHY_CARDS = [
  { icon: Target, title: 'Performance-Focused Campaigns', desc: 'Every campaign is built around business outcomes — leads, calls, and sales — not just impressions and clicks.' },
  { icon: Users, title: 'Lead Generation Expertise', desc: 'Specialized experience in lead gen campaigns for education, healthcare, real estate, and service businesses.' },
  { icon: Activity, title: 'Conversion-Focused Execution', desc: 'Conversion tracking, Quality Score optimization, and landing page recommendations on every campaign.' },
  { icon: Globe, title: 'Multi-Industry Experience', desc: 'Google Ads campaigns across 10+ industries with proven keyword libraries and creative templates.' },
  { icon: BarChart3, title: 'Analytics-Driven Optimization', desc: 'Weekly performance analysis with data-backed decisions on keyword bids, targeting, and budget allocation.' },
  { icon: Shield, title: 'Scalable Paid Growth Systems', desc: 'Campaigns designed to scale profitably — from ₹10K/month to ₹5 lakh/month ad budgets.' },
]

const FAQ_ITEMS = [
  { q: 'What is included in Google Ads management?', a: 'Google Ads management includes: campaign strategy, keyword research, ad copy creation, campaign setup, bid management, audience targeting, negative keyword management, A/B testing, weekly optimization, conversion tracking setup, and a monthly performance report. Ad creative production (videos, display banners) is available as an add-on.' },
  { q: 'Is ad budget included in the management fee?', a: 'No. The management fee (₹10,000/month for budgets up to ₹50,000, or 20% above that) is paid to Scalify Labs for campaign management. The advertising budget is paid directly to Google through your Google Ads account. You retain full ownership and control of your Google Ads account.' },
  { q: 'What is the minimum campaign duration?', a: 'Minimum campaign duration is 3 months. Google Ads campaigns require time to collect data, optimize targeting, and improve Quality Scores. Most campaigns show meaningful improvement in CPL (cost per lead) between months 2 and 3. A 10% discount applies on 3-month upfront payment.' },
  { q: 'Do you create ad creatives and copy?', a: 'Yes. We write all ad headlines, descriptions, and extensions. For YouTube Ads and Display Ads, we provide creative direction and scripting. Video production and graphic design can be arranged as a separate service. Landing page copy recommendations are included at no additional charge.' },
  { q: 'Can you manage YouTube Ads?', a: 'Yes. We manage YouTube video campaigns including skippable in-stream ads, non-skippable ads, bumper ads, and YouTube Search ads. YouTube Ads are particularly effective for awareness-stage targeting, brand recall, and remarketing to website visitors.' },
  { q: 'Do you provide landing page support?', a: 'We provide landing page recommendations — structural advice, copy suggestions, CTA placement, and form optimization — based on campaign performance data. For full landing page development, that is handled through our Website Development service.' },
  { q: 'How do you track leads from campaigns?', a: 'We set up comprehensive conversion tracking covering: form submission tracking (Google Tag Manager), call tracking (Google Ads call extensions), Google Analytics goal tracking, and WhatsApp click tracking. Monthly reports show total leads, cost per lead, and campaign-wise breakdown.' },
  { q: 'Which businesses should run Google Ads?', a: 'Google Ads works best for businesses where customers actively search for your products or services — clinics, coaching institutes, real estate builders, service companies, ecommerce brands, and local businesses. Businesses with no digital presence or very long sales cycles may see slower results.' },
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
        city: form.city || undefined, source: 'google-ads-page',
        service_interest: 'Google Ads',
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
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book Google Ads Consultation'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-blue-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Consultation Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our Google Ads team will call you within 2 hours.</p>
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
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your business" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Ad Budget</label>
                <div className="relative"><CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. ₹30,000" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Campaign Goals / Industry</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="E.g. Need lead generation ads for dental clinic in Ranchi, budget ₹30,000/month…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
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

export default function GoogleAdsPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  const weeklyLeads = [12, 18, 15, 22, 28, 31, 27, 35, 42, 38, 47, 52]

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                <Target className="w-3.5 h-3.5" />
                Performance-Focused Paid Growth Partner · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Google Ads Campaigns Focused on{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Leads, Calls &amp;
                </span>{' '}
                Business Growth
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Scale your business with conversion-focused Google Ads campaigns including Search, YouTube, Display, Performance Max, local ads, remarketing, and lead generation systems.
              </p>

              {/* Pricing highlight */}
              <div className="bg-navy rounded-2xl px-5 py-4 text-white">
                <p className="text-xs uppercase tracking-wider opacity-70 font-semibold mb-2">Campaign Management Pricing</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xl font-black">₹10,000<span className="text-sm font-semibold opacity-80">/month</span></p>
                    <p className="text-[10px] opacity-60 mt-0.5">For ad budgets up to ₹50,000/month</p>
                  </div>
                  <div className="border-l border-white/20 pl-3">
                    <p className="text-xl font-black">20%<span className="text-sm font-semibold opacity-80"> of spend</span></p>
                    <p className="text-[10px] opacity-60 mt-0.5">For budgets above ₹50,000/month</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <p className="text-[10px] opacity-60">Minimum 3-month campaign duration</p>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">10% off — 3-month upfront</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book Google Ads Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Get Campaign Proposal')} className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors">
                  Get Campaign Proposal
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Search Ads', 'YouTube Ads', 'Performance Max', 'Call Campaigns', 'Remarketing', 'Conversion Tracking'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Google Ads Dashboard */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-3xl blur-3xl opacity-15 scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* Dashboard header */}
                  <div className="bg-navy px-5 py-3 flex items-center justify-between">
                    <span className="text-white text-sm font-bold flex items-center gap-2"><BarChart3 className="w-4 h-4 text-blue-300" /> Google Ads Performance</span>
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-emerald-400 text-[10px] font-bold">Live</span></div>
                  </div>

                  {/* KPI bar */}
                  <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100">
                    {[{ l: 'Impressions', v: '84.2K', c: 'text-navy' }, { l: 'Clicks', v: '3,847', c: 'text-blue-600' }, { l: 'Leads', v: '247', c: 'text-emerald-600' }, { l: 'CPL', v: '₹312', c: 'text-amber-600' }].map(s => (
                      <div key={s.l} className="py-2.5 px-1.5 text-center border-r last:border-r-0 border-slate-100">
                        <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
                        <p className="text-[8px] text-slate-500 font-medium">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Leads chart */}
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold text-slate-600">Weekly Leads Generated</p>
                        <p className="text-xl font-black text-navy">247 <span className="text-sm font-semibold text-emerald-600">↑ 89%</span></p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">This Month</span>
                    </div>
                    <div className="flex items-end gap-0.5 h-16">
                      {weeklyLeads.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all"
                          style={{
                            height: `${(h / 52) * 100}%`,
                            background: i >= weeklyLeads.length - 3
                              ? 'linear-gradient(to top, #2563eb, #0891b2)'
                              : '#e2e8f0',
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {['W1', 'W2', 'W3', 'W4'].map(w => <span key={w} className="text-[8px] text-slate-400 font-medium">{w}</span>)}
                    </div>
                  </div>

                  {/* Active campaigns */}
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Campaigns</p>
                    {[
                      { name: 'Dental Clinic — Search', spend: '₹18,400', leads: '87', cpl: '₹211', dot: 'bg-emerald-400', status: '↑ Scaling' },
                      { name: 'Education — Lead Gen', spend: '₹22,100', leads: '96', cpl: '₹230', dot: 'bg-blue-400', status: '↑ Optimizing' },
                      { name: 'Real Estate — YouTube', spend: '₹9,500', leads: '64', cpl: '₹148', dot: 'bg-violet-400', status: '↑ Strong' },
                    ].map(c => (
                      <div key={c.name} className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                        <span className="text-[10px] font-semibold text-navy flex-1 truncate">{c.name}</span>
                        <span className="text-[9px] text-slate-500 shrink-0">{c.spend}</span>
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full shrink-0">{c.leads} leads</span>
                      </div>
                    ))}
                  </div>

                  {/* ROAS metrics */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100">
                    {[{ l: 'Avg ROAS', v: '4.2×', c: 'text-blue-600' }, { l: 'Conv. Rate', v: '6.4%', c: 'text-emerald-600' }, { l: 'Quality Score', v: '8.2/10', c: 'text-violet-600' }].map(m => (
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
                  <div><p className="text-[9px] text-slate-500">Cost Per Lead</p><p className="text-sm font-extrabold text-slate-900">₹211 avg</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">ROAS</p>
                  <p className="text-lg font-black flex items-center gap-1"><BarChart3 className="w-4 h-4" /> 4.2× avg</p>
                </div>
                <div className="absolute top-16 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[9px] font-bold text-slate-700">247 Leads This Month</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">↑ 89% vs last month</p>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Google Ads Services for Growth-Focused Businesses</h2>
            <p className="text-slate-500 mt-3 text-sm">Perfect for businesses looking for <strong className="text-navy">leads, calls, appointments, and sales growth</strong>.</p>
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
            {/* Customer journey flow */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Google Ads Customer Journey</p>
              <div className="space-y-2">
                {[
                  { icon: Search, label: 'Search / YouTube Ad Shown', sub: 'User sees your ad at the exact right moment', color: 'bg-blue-100 text-blue-600', note: 'Intent trigger' },
                  { icon: MousePointerClick, label: 'User Clicks Your Ad', sub: 'Lands on optimized landing page', color: 'bg-indigo-100 text-indigo-600', note: 'High intent' },
                  { icon: Users, label: 'Lead Captured', sub: 'Form submitted or call made', color: 'bg-violet-100 text-violet-600', note: 'Conversion' },
                  { icon: Target, label: 'CRM & WhatsApp Triggered', sub: 'Instant follow-up automation fires', color: 'bg-cyan-100 text-cyan-600', note: 'Automation' },
                  { icon: TrendingUp, label: 'Sales Follow-Up', sub: 'Lead converted to customer', color: 'bg-emerald-100 text-emerald-600', note: 'Revenue' },
                ].map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}><s.icon className="w-4 h-4" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-navy">{s.label}</p>
                        <p className="text-xs text-slate-500">{s.sub}</p>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">{s.note}</span>
                    </div>
                    {i < 4 && <div className="ml-4 w-px h-3 bg-slate-200 mt-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> Outcome-First Strategy
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Google Ads Built Around Business Outcomes</h2>
              <p className="text-slate-600 leading-relaxed">Most agencies focus only on impressions and clicks. Scalify Labs focuses on <strong className="text-navy">qualified leads, appointment bookings, and real sales opportunities</strong> — the outcomes that actually grow your business.</p>
              <p className="text-slate-600 leading-relaxed">We combine ad strategy, audience targeting, landing page optimization, conversion tracking, and automation to build <strong className="text-navy">scalable paid growth systems.</strong></p>
              <div className="grid grid-cols-2 gap-2">
                {['Qualified lead generation', 'Appointment booking flows', 'Conversion optimization', 'Campaign profitability focus', 'Audience intelligence', 'Transparent ROI reporting'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AD SERVICES ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Full Service Scope</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Google Ads Services Included</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AD_SERVICES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{s.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAMPAIGN TYPES ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Campaign Intelligence</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Campaign Types We Manage</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAMPAIGN_TYPES.map(ct => (
              <div key={ct.title} className={`rounded-2xl border p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${ct.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ct.accent}`}><ct.icon className="w-5 h-5" /></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-100">{ct.tag}</span>
                </div>
                <h3 className="font-bold text-navy text-base mb-2">{ct.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{ct.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONVERSION & TRACKING ─────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Performance dashboard */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                <span className="text-xs text-slate-500 font-medium mx-auto">Conversion Tracking Dashboard</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[{ l: 'Total Leads', v: '247', c: 'text-blue-600' }, { l: 'Calls Tracked', v: '89', c: 'text-emerald-600' }, { l: 'Form Fills', v: '158', c: 'text-violet-600' }, { l: 'Avg CPL', v: '₹312', c: 'text-amber-600' }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className={`text-xl font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5">
                  {[{ l: 'Search Ad Conversion Rate', v: 7.2, c: 'bg-blue-500' }, { l: 'YouTube Ad View Rate', v: 62, c: 'bg-red-500' }, { l: 'Remarketing Conversion', v: 11.8, c: 'bg-violet-500' }, { l: 'Call-Through Rate', v: 4.3, c: 'bg-emerald-500' }].map(b => (
                    <div key={b.l}>
                      <div className="flex justify-between mb-1"><span className="text-xs font-semibold text-slate-600">{b.l}</span><span className="text-xs font-bold text-slate-900">{b.v}%</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${b.c}`} style={{ width: `${b.v}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                  <p className="text-xs font-semibold text-blue-800">89 tracked calls generated this month via Google Ads</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> Conversion Intelligence
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Conversion-Focused Campaign Management</h2>
              <p className="text-slate-600 leading-relaxed">Impressions and clicks don&apos;t grow businesses. Leads, calls, and sales do. Scalify Labs builds conversion tracking infrastructure that gives you complete visibility into which campaigns, keywords, and ads are actually generating revenue.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Conversion tracking setup', 'Google Tag Manager integration', 'Call tracking configuration', 'WhatsApp click tracking', 'Audience optimization', 'Monthly lead reports'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Execution Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Our Google Ads Execution Process</h2>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-blue-100 via-cyan-200 to-blue-100" />
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

      {/* ─── WHY GOOGLE ADS ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">The Case for PPC</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Use Google Ads</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_GOOGLE.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-blue-600" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-[0.1]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600 rounded-full blur-[120px] opacity-[0.1]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent Google Ads Management Pricing</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {/* Starter */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Starter Campaigns</p>
              <p className="text-4xl font-black text-white mb-1">₹10,000</p>
              <p className="text-sm font-semibold text-slate-400 mb-2">/month management</p>
              <p className="text-xs text-slate-500 mb-5 pb-5 border-b border-white/10">Best for businesses spending up to ₹50,000/month on ads</p>
              <ul className="space-y-2.5 mb-6">
                {['Campaign Setup & Structure', 'Search Ads Management', 'Weekly Optimization', 'Monthly Performance Report', 'Conversion Tracking Setup'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => open()} className="w-full py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl text-sm hover:bg-white/15 transition-colors">Book Consultation</button>
            </div>

            {/* Scaling — highlight */}
            <div className="relative bg-gradient-to-b from-blue-600 to-cyan-700 rounded-3xl p-6 shadow-2xl shadow-blue-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">Best for Growth</div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-white/70 mb-2 mt-2">Scaling Campaigns</p>
              <div className="flex items-end gap-1 mb-1">
                <p className="text-4xl font-black text-white">20%</p>
                <p className="text-sm font-semibold text-white/70 mb-1">of ad spend</p>
              </div>
              <p className="text-xs text-white/60 mb-5 pb-5 border-b border-white/20">Best for ad budgets above ₹50,000/month</p>
              <ul className="space-y-2.5 mb-6">
                {['Multi-Campaign Management', 'Advanced Bidding Optimization', 'Audience Scaling Strategy', 'Detailed Insights & Reporting', 'Dedicated Strategy Support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 text-white shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => open()} className="w-full py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-white/90 transition-colors">Get Campaign Proposal</button>
            </div>

            {/* 3-month offer */}
            <div className="bg-white/5 border border-amber-400/30 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full blur-2xl" />
              <p className="text-[11px] uppercase tracking-widest font-bold text-amber-400 mb-2">Special Offer</p>
              <p className="text-3xl font-black text-white mb-1">10% Off</p>
              <p className="text-sm font-semibold text-slate-400 mb-2">3-Month Upfront Commitment</p>
              <p className="text-xs text-slate-500 mb-5 pb-5 border-b border-white/10">Save on management fees when you commit for 3 months upfront</p>
              <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3 mb-5">
                <p className="text-xs font-bold text-amber-400">Example savings:</p>
                <p className="text-[11px] text-slate-400 mt-1">₹10,000 × 3 = ₹30,000 → Pay ₹27,000 (save ₹3,000)</p>
              </div>
              <ul className="space-y-2 mb-6">
                {['All Starter features included', 'Priority onboarding', 'Minimum 3-month duration', 'Full ROI tracking'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => open('Claim 3-Month Discount')} className="w-full py-3 bg-amber-400 text-amber-900 font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors">Claim Discount</button>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">Ad budget paid directly to Google · Management fee paid to Scalify Labs · Minimum 3-month campaign duration</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity">
              Book Google Ads Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Campaign Proposal')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get Campaign Proposal
            </button>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Our Advantage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We focus on business outcomes, not just ad clicks.&rdquo;</p>
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
            <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Common Questions</p>
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.04]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-cyan-300 rounded-full blur-[120px] opacity-[0.07]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Performance-Focused Paid Growth Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Scale Your Business With Conversion-Focused Google Ads
          </h2>
          <p className="text-white/80 text-lg mb-3">Generate leads, calls, appointments, and business growth with professionally managed Google Ads campaigns built for measurable performance.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Search · YouTube · Display · Performance Max · Remarketing
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Book Google Ads Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Campaign Proposal')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get Campaign Proposal
            </button>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-xl shadow shadow-blue-200">Book Consultation</button>
        <button onClick={() => open('Get Campaign Proposal')} className="flex-1 py-3 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-xl">Get Proposal</button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
