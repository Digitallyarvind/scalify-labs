'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Target, BarChart3, Zap, Activity, Shield, Layers,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  Check, Sparkles, Rocket, Users, Globe, Eye,
  Phone, Mail, User, MapPin, Briefcase, CircleDollarSign,
  Play, Image as ImageIcon, RefreshCw, MessageCircle,
  Heart, Share2, MousePointerClick,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const WHO_IT_SERVES = [
  { icon: ShoppingBag, name: 'Ecommerce Brands', desc: 'Product sales, catalogue ads, ROAS-optimized campaigns', color: 'bg-pink-50 text-pink-600 border-pink-100' },
  { icon: HeartPulse, name: 'Clinics & Healthcare', desc: 'Appointment leads, health awareness, WhatsApp campaigns', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: GraduationCap, name: 'Education & Coaching', desc: 'Admission leads, demo signups, course promotion campaigns', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: Building2, name: 'Real Estate', desc: 'Property enquiries, site visit leads, project launches', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: Store, name: 'Local Businesses', desc: 'Local visibility, offer promotions, WhatsApp lead campaigns', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: Zap, name: 'Startups', desc: 'Brand launch, rapid lead gen, audience building campaigns', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: Sparkles, name: 'Personal Brands', desc: 'Thought leadership, course sales, audience engagement', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { icon: Globe, name: 'Service Businesses', desc: 'Inbound enquiry campaigns, local and national targeting', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
]

const AD_SERVICES = [
  { icon: Globe, name: 'Facebook Ads', desc: 'Reach targeted audiences on the world\'s largest social platform', color: 'bg-blue-100 text-blue-600' },
  { icon: ImageIcon, name: 'Instagram Ads', desc: 'Visual-first campaigns on Instagram Feed, Stories, and Explore', color: 'bg-pink-100 text-pink-600' },
  { icon: Users, name: 'Lead Generation Ads', desc: 'Instant lead forms capturing name, phone, and email inside Meta', color: 'bg-violet-100 text-violet-600' },
  { icon: MousePointerClick, name: 'Conversion Campaigns', desc: 'Drive website purchases, bookings, and form completions at scale', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Play, name: 'Reels Ads', desc: 'Reach younger audiences with full-screen immersive Reels placements', color: 'bg-orange-100 text-orange-600' },
  { icon: Play, name: 'Video Advertising', desc: 'In-feed and Story video ads for engagement, awareness, and recall', color: 'bg-red-100 text-red-600' },
  { icon: RefreshCw, name: 'Remarketing Campaigns', desc: 'Re-engage users who visited your site, viewed your ads, or messaged', color: 'bg-amber-100 text-amber-600' },
  { icon: ShoppingBag, name: 'Ecommerce Campaigns', desc: 'Catalogue ads, Dynamic Product Ads, and ROAS-focused sales campaigns', color: 'bg-rose-100 text-rose-600' },
  { icon: Target, name: 'Audience Retargeting', desc: 'Custom audiences, Lookalike audiences, and interest-based targeting', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Activity, name: 'Pixel & Conversion Tracking', desc: 'Meta Pixel setup, event tracking, and CAPI integration for accurate data', color: 'bg-teal-100 text-teal-600' },
]

const CAMPAIGN_TYPES = [
  { icon: Users, title: 'Lead Generation Campaigns', desc: 'Instant lead forms on Facebook and Instagram capturing enquiries without requiring a website visit', color: 'border-purple-200 bg-purple-50/50', accent: 'bg-purple-600 text-white', tag: 'Most Common' },
  { icon: MessageCircle, title: 'WhatsApp Lead Campaigns', desc: 'Click-to-WhatsApp ads driving direct conversations — the highest converting Meta ad format in India', color: 'border-green-200 bg-green-50/50', accent: 'bg-green-600 text-white', tag: 'India-Focused' },
  { icon: HeartPulse, title: 'Appointment Booking Campaigns', desc: 'Ads designed for clinics, salons, and service businesses to fill their appointment calendars', color: 'border-red-200 bg-red-50/50', accent: 'bg-red-600 text-white', tag: 'Healthcare & Services' },
  { icon: ShoppingBag, title: 'Ecommerce Conversion Campaigns', desc: 'Dynamic product ads and catalogue campaigns driving online purchases with ROAS optimization', color: 'border-orange-200 bg-orange-50/50', accent: 'bg-orange-600 text-white', tag: 'Ecommerce' },
  { icon: Eye, title: 'Brand Awareness Campaigns', desc: 'Reach and frequency campaigns building brand recall, visibility, and audience trust at scale', color: 'border-blue-200 bg-blue-50/50', accent: 'bg-blue-600 text-white', tag: 'Brand Building' },
  { icon: RefreshCw, title: 'Remarketing Campaigns', desc: 'Re-engage past visitors, video viewers, and profile interactions who showed intent but did not convert', color: 'border-violet-200 bg-violet-50/50', accent: 'bg-violet-600 text-white', tag: 'Re-engagement' },
]

const WHY_META = [
  { icon: Target, title: 'Advanced Audience Targeting', desc: 'Interest, behaviour, demographic, and Lookalike audience targeting capabilities.' },
  { icon: ImageIcon, title: 'Visual-First Advertising', desc: 'Creatives that stop the scroll — images, carousels, Reels, and video ads.' },
  { icon: TrendingUp, title: 'Scalable Lead Generation', desc: '500M+ Indians on Facebook and Instagram — the largest captive audience.' },
  { icon: ShoppingBag, title: 'Ecommerce Sales Growth', desc: 'Dynamic product ads that show the right products to the right audience at the right time.' },
  { icon: RefreshCw, title: 'Retargeting Opportunities', desc: 'Re-engage website visitors, video viewers, and Instagram story engagers.' },
  { icon: Globe, title: 'Brand Visibility', desc: 'Build brand recognition across feeds, stories, reels, and explore pages.' },
  { icon: MessageCircle, title: 'WhatsApp Lead Campaigns', desc: 'India\'s highest-converting ad format — direct WhatsApp conversations from ads.' },
  { icon: Zap, title: 'Mobile-First Customer Reach', desc: 'Reach customers where they spend the most time — on their phones.' },
]

const STEPS = [
  { icon: Users, num: '01', title: 'Business & Audience Research', desc: 'Deep analysis of your target customer, competitors, and market to define the right audience segments and campaign strategy.' },
  { icon: ImageIcon, num: '02', title: 'Creative & Campaign Planning', desc: 'Campaign structure, creative briefs, ad copy strategy, and audience targeting map built before launch.' },
  { icon: Zap, num: '03', title: 'Campaign Launch', desc: 'Ads live with full Pixel tracking, conversion events, and WhatsApp integration configured correctly from day one.' },
  { icon: BarChart3, num: '04', title: 'Optimization & Scaling', desc: 'Weekly creative refresh, audience expansion, budget reallocation to top-performing ad sets, and CPL reduction.' },
  { icon: TrendingUp, num: '05', title: 'Reporting & Performance Tracking', desc: 'Monthly reports with leads, reach, CPL, ROAS, creative performance, and next month\'s growth strategy.' },
]

const WHY_CARDS = [
  { icon: ImageIcon, title: 'Creative-First Execution', desc: 'We lead with strong creatives — 4–5 static ads per month designed to stop the scroll and drive action.' },
  { icon: Target, title: 'Conversion-Focused Advertising', desc: 'Every campaign is optimized for business outcomes — leads, sales, and bookings — not likes and reach.' },
  { icon: Users, title: 'Audience Targeting Expertise', desc: 'Custom audiences, Lookalike stacks, interest layering, and retargeting flows built from industry experience.' },
  { icon: Globe, title: 'Multi-Industry Experience', desc: 'Meta campaign expertise across education, healthcare, real estate, ecommerce, and local businesses.' },
  { icon: BarChart3, title: 'Analytics-Driven Optimization', desc: 'Weekly creative and audience analysis with data-backed decisions to improve CPL and ROAS consistently.' },
  { icon: Shield, title: 'Scalable Paid Social Systems', desc: 'Campaigns designed to scale — from ₹10,000/month ad spend to ₹5 lakh/month with consistent profitability.' },
]

const FAQ_ITEMS = [
  { q: 'What is included in Meta Ads management?', a: 'Meta Ads management includes: campaign strategy, audience research, ad copy writing, 4–5 static creative designs per month, campaign setup, weekly optimization, A/B testing, retargeting configuration, Meta Pixel & conversion tracking setup, and a monthly performance report. Video production is not included — clients provide their own video content or can arrange production at an additional charge.' },
  { q: 'Is the ad budget included in the management fee?', a: 'No. The management fee (₹10,000/month for budgets up to ₹50,000, or 20% above that) is paid to Scalify Labs. The advertising budget is paid directly to Meta (Facebook) through your own Meta Ads account. You retain full ownership and control of your ad account and all campaign data.' },
  { q: 'What is the minimum campaign duration?', a: 'Minimum campaign duration is 3 months. Meta campaigns require time to exit the learning phase, optimize audiences, and improve creative performance. Most campaigns show meaningful CPL reduction and ROAS improvement between months 2 and 3. A 10% discount applies on 3-month upfront payment.' },
  { q: 'Do you create ad creatives?', a: 'Yes. We create 4–5 static ad creatives per month (image ads, carousel cards, graphic designs) included in the management fee. Video ads (Reels, Story videos) are not included — clients either provide their own video content or can arrange video production as a separate service. Video ad setup and optimization is included when client provides videos.' },
  { q: 'Can Meta campaigns generate WhatsApp leads?', a: 'Yes. Click-to-WhatsApp ads are one of the highest-converting Meta ad formats in India — especially for local businesses, clinics, coaching institutes, and service businesses. When users click the ad, they are taken directly to a WhatsApp conversation with your business. We set up and optimize these campaigns as part of our standard management.' },
  { q: 'Do you manage Instagram Ads separately?', a: 'Meta Ads Manager manages both Facebook and Instagram ads in one platform. We run campaigns across Facebook Feed, Instagram Feed, Stories, Reels, Explore, and Audience Network simultaneously — whichever placements perform best for your specific audience and campaign objective.' },
  { q: 'How do you track conversions and leads?', a: 'We set up Meta Pixel on your website (tracking form fills, button clicks, purchases), Meta Lead Form tracking (for in-platform lead ads), WhatsApp click tracking, and event-based conversion tracking. Monthly reports show leads generated, cost per lead, audience performance, and creative performance breakdowns.' },
  { q: 'Which businesses should run Meta Ads?', a: 'Meta Ads work best for businesses with visual products or services and a defined target audience — ecommerce brands, coaching institutes, clinics, real estate developers, restaurants, salons, gyms, and service businesses. Businesses with strong offers and the ability to follow up on leads typically see the strongest results.' },
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
        city: form.city || undefined, source: 'meta-ads-page',
        service_interest: 'Meta Ads',
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
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book Meta Ads Consultation'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-pink-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Consultation Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our Meta Ads team will call you within 2 hours.</p>
            <button onClick={onClose} className="bg-pink-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-pink-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your business" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Ad Budget</label>
                <div className="relative"><CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="e.g. ₹30,000" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Campaign Goals / Industry</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" placeholder="E.g. Lead generation for coaching institute in Ranchi, budget ₹25,000/month…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
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

export default function MetaAdsPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  const weeklyLeads = [8, 14, 11, 19, 24, 21, 28, 32, 29, 38, 41, 47]

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-pink-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold">
                <Target className="w-3.5 h-3.5" />
                Performance-Focused Social Advertising Partner · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Meta Ads Campaigns Designed for{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Leads, Sales &amp;
                </span>{' '}
                Audience Growth
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Run high-performing Facebook and Instagram ad campaigns focused on customer acquisition, ecommerce sales, lead generation, bookings, and scalable business growth.
              </p>

              {/* Pricing card */}
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
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] opacity-60">Minimum 3-month campaign duration</p>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">10% off — 3-month upfront</span>
                  </div>
                  <p className="text-[10px] opacity-50 mt-1.5">Includes 4–5 static ad creatives/month · Video production extra or client-provided</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-pink-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book Meta Ads Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Get Campaign Proposal')} className="flex items-center gap-2 px-6 py-3 border-2 border-pink-500 text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-colors">
                  Get Campaign Proposal
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Facebook Ads', 'Instagram Ads', 'Lead Generation', 'Remarketing Campaigns', 'Reels & Video Ads', 'Conversion Tracking'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-pink-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Meta Ads Dashboard */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-400 rounded-3xl blur-3xl opacity-15 scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* Instagram-style gradient header */}
                  <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #833AB4 0%, #C13584 50%, #E1306C 100%)' }}>
                    <span className="text-white text-sm font-bold flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Meta Ads Performance</span>
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" /><span className="text-white/80 text-[10px] font-bold">Live</span></div>
                  </div>

                  {/* KPI bar */}
                  <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100">
                    {[{ l: 'Reach', v: '2.4L', c: 'text-navy' }, { l: 'Results', v: '312', c: 'text-purple-600' }, { l: 'CPR', v: '₹226', c: 'text-pink-600' }, { l: 'ROAS', v: '3.8×', c: 'text-emerald-600' }].map(s => (
                      <div key={s.l} className="py-2.5 px-1.5 text-center border-r last:border-r-0 border-slate-100">
                        <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
                        <p className="text-[8px] text-slate-500 font-medium">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Results chart */}
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold text-slate-600">Weekly Results</p>
                        <p className="text-xl font-black text-navy">312 <span className="text-sm font-semibold text-emerald-600">↑ 94%</span></p>
                      </div>
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">This Month</span>
                    </div>
                    <div className="flex items-end gap-0.5 h-14">
                      {weeklyLeads.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${(h / 47) * 100}%`,
                            background: i >= weeklyLeads.length - 3
                              ? 'linear-gradient(to top, #9333ea, #db2777)'
                              : '#f1f5f9',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ad previews */}
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Ad Creatives</p>
                    <div className="grid grid-cols-2 gap-2">
                      {/* FB Feed ad */}
                      <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50">
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center"><span className="text-white text-[6px] font-black">f</span></div>
                          <span className="text-[8px] font-semibold text-navy">Scalify Labs</span>
                          <span className="ml-auto text-[7px] text-slate-400">Sponsored</span>
                        </div>
                        <div className="h-20 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">🎯 Free Consultation</span>
                        </div>
                        <div className="px-2 py-1.5">
                          <p className="text-[8px] font-bold text-navy">Digital Marketing that Works</p>
                          <div className="mt-1 bg-blue-600 text-white text-[7px] font-bold py-0.5 px-2 rounded text-center">Learn More</div>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 border-t border-slate-100">
                          <Heart className="w-2.5 h-2.5 text-slate-400" />
                          <Share2 className="w-2.5 h-2.5 text-slate-400" />
                          <span className="text-[7px] text-slate-400 ml-auto">2.4K reactions</span>
                        </div>
                      </div>
                      {/* IG Story ad */}
                      <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50">
                          <div className="w-4 h-4 rounded-full p-0.5" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C)' }}><div className="w-full h-full bg-white rounded-full flex items-center justify-center"><div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C)' }} /></div></div>
                          <span className="text-[8px] font-semibold text-navy">Story Ad</span>
                        </div>
                        <div className="h-20 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #833AB4, #C13584, #E1306C)' }}>
                          <div className="text-white text-center px-2">
                            <p className="text-[9px] font-black">🔥 Limited Offer</p>
                            <p className="text-[7px] opacity-80 mt-0.5">Swipe Up to Learn More</p>
                          </div>
                        </div>
                        <div className="px-2 py-1.5">
                          <p className="text-[8px] font-bold text-navy">Instagram Story</p>
                          <div className="mt-1 rounded text-[7px] font-bold py-0.5 px-2 text-center text-white" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C)' }}>Swipe Up</div>
                        </div>
                        <div className="flex items-center px-2 py-1 border-t border-slate-100">
                          <span className="text-[7px] text-pink-600 font-bold">Reach: 45.2K</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active campaigns */}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Campaign Performance</p>
                    {[
                      { name: 'Lead Gen — Education', results: '124 leads', cpr: '₹198', dot: 'bg-purple-400' },
                      { name: 'WA Click — Clinic', results: '88 chats', cpr: '₹241', dot: 'bg-pink-400' },
                      { name: 'Retargeting — Ecom', results: '₹84K sales', cpr: 'ROAS 4.2×', dot: 'bg-emerald-400' },
                    ].map(c => (
                      <div key={c.name} className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                        <span className="text-[10px] font-semibold text-navy flex-1 truncate">{c.name}</span>
                        <span className="text-[9px] text-slate-500 shrink-0">{c.results}</span>
                        <span className="text-[9px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-full shrink-0">{c.cpr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center"><TrendingUp className="w-4 h-4 text-pink-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Cost Per Result</p><p className="text-sm font-extrabold text-slate-900">₹226 avg</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 rounded-2xl shadow-xl px-4 py-2.5 text-white" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C)' }}>
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">ROAS</p>
                  <p className="text-lg font-black flex items-center gap-1"><BarChart3 className="w-4 h-4" /> 3.8× avg</p>
                </div>
                <div className="absolute top-16 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-[9px] font-bold text-slate-700">312 Results This Month</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">↑ 94% vs last month</p>
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
            <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Ideal For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Meta Ads Services for Growth-Focused Brands</h2>
            <p className="text-slate-500 mt-3 text-sm">Perfect for businesses looking for <strong className="text-navy">leads, visibility, and customer engagement</strong>.</p>
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
            {/* Customer journey */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Meta Ads Customer Journey</p>
              <div className="space-y-2">
                {[
                  { icon: ImageIcon, label: 'Instagram / Facebook Ad Shown', sub: 'Creative stops the scroll at the right moment', color: 'bg-pink-100 text-pink-600', note: 'Awareness' },
                  { icon: MousePointerClick, label: 'User Clicks or Swipes', sub: 'Goes to landing page, lead form, or WhatsApp', color: 'bg-purple-100 text-purple-600', note: 'Intent' },
                  { icon: Users, label: 'Lead or Enquiry Captured', sub: 'Form fill, WhatsApp chat, or website visit', color: 'bg-violet-100 text-violet-600', note: 'Conversion' },
                  { icon: MessageCircle, label: 'WhatsApp / CRM Follow-Up', sub: 'Automated message or sales team outreach', color: 'bg-cyan-100 text-cyan-600', note: 'Automation' },
                  { icon: TrendingUp, label: 'Sale or Appointment Booked', sub: 'Business outcome delivered', color: 'bg-emerald-100 text-emerald-600', note: 'Revenue' },
                ].map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}><s.icon className="w-4 h-4" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-navy">{s.label}</p>
                        <p className="text-xs text-slate-500">{s.sub}</p>
                      </div>
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full shrink-0">{s.note}</span>
                    </div>
                    {i < 4 && <div className="ml-4 w-px h-3 bg-slate-200 mt-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> Outcome-First Strategy
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Meta Ads Built Around Business Outcomes</h2>
              <p className="text-slate-600 leading-relaxed">Most advertisers focus only on reach, likes, and engagement. Scalify Labs focuses on <strong className="text-navy">qualified leads, customer acquisition, and measurable sales</strong> — the outcomes that actually grow your business.</p>
              <p className="text-slate-600 leading-relaxed">We combine creative strategy, audience targeting, ad optimization, retargeting, and automation to build <strong className="text-navy">scalable paid social growth systems.</strong></p>
              <div className="grid grid-cols-2 gap-2">
                {['Qualified lead generation', 'Customer acquisition systems', 'Ecommerce sales optimization', 'WhatsApp lead campaigns', 'Audience retargeting logic', 'Transparent ROAS reporting'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-pink-500 shrink-0" />{b}
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
            <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Full Service Scope</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Meta Ads Services Included</h2>
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
          {/* Creative deliverables note */}
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 flex items-start gap-3">
            <ImageIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-900">Creative Deliverables Note</p>
              <p className="text-xs text-amber-700 mt-0.5">Management includes <strong>4–5 static ad creatives</strong> per month (images, carousels, graphics). Video production for Reels and Story Ads is charged separately or can be provided by the client.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAMPAIGN TYPES ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Campaign Intelligence</p>
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

      {/* ─── CREATIVE & AUDIENCE ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Creative performance dashboard */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C)' }}>
                <span className="text-white text-sm font-bold">Creative & Audience Performance</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[{ l: 'Total Reach', v: '2.4L', c: 'text-purple-600' }, { l: 'Avg CPR', v: '₹226', c: 'text-pink-600' }, { l: 'Link Clicks', v: '8.4K', c: 'text-blue-600' }, { l: 'CTR', v: '3.5%', c: 'text-emerald-600' }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className={`text-xl font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Creative performance */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Creative Performance (Static Ads)</p>
                  {[
                    { name: 'Carousel Ad — Products', ctr: '4.2%', results: '89', bar: 85 },
                    { name: 'Image Ad — Lead Form', ctr: '3.8%', results: '124', bar: 92 },
                    { name: 'Stories Ad — Offer', ctr: '2.9%', results: '64', bar: 65 },
                  ].map(c => (
                    <div key={c.name} className="mb-2.5">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] font-semibold text-navy">{c.name}</span>
                        <span className="text-[9px] font-bold text-pink-600">{c.results} results · CTR {c.ctr}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.bar}%`, background: 'linear-gradient(to right, #9333ea, #db2777)' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-pink-50 border border-pink-100 rounded-xl p-3 flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-pink-600 shrink-0" />
                  <p className="text-xs font-semibold text-pink-800">4–5 static ad creatives refreshed monthly to prevent audience fatigue</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> Creative Intelligence
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Creative-Driven Advertising Meets Audience Intelligence</h2>
              <p className="text-slate-600 leading-relaxed">Successful Meta campaigns require strong creatives, precise audience understanding, and continuous optimization. Scalify Labs manages all three — with <strong className="text-navy">4–5 fresh static ad creatives per month</strong> designed to stop the scroll and drive conversions.</p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-amber-800 mb-1.5">Creative Scope Clarification</p>
                <p className="text-xs text-amber-700">Static image and carousel ad creatives (4–5/month) are included. Video production for Reels or Story videos is <strong>not included</strong> — clients provide video content or can arrange production separately.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Audience segmentation strategy', 'Creative A/B testing', 'Retargeting audience logic', 'Engagement optimization', 'CPR reduction focus', 'Lookalike audience scaling'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-pink-500 shrink-0" />{b}
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
            <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Execution Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Our Meta Ads Execution Process</h2>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(to right, #e9d5ff, #fbcfe8, #e9d5ff)' }} />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-pink-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-pink-400 transition-colors">
                  <step.icon className="w-7 h-7 text-pink-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-2 w-4 h-4 text-pink-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY META ADS ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">The Case for Social Ads</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Invest in Meta Advertising</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_META.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-pink-600" /></div>
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
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[150px] opacity-[0.1]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-600 rounded-full blur-[120px] opacity-[0.1]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #db2777 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent Meta Ads Management Pricing</h2>
            <p className="text-slate-400 mt-3 text-sm">All plans include 4–5 static ad creatives/month · Video production extra or client-provided</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {/* Starter */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Starter Campaigns</p>
              <p className="text-4xl font-black text-white mb-1">₹10,000</p>
              <p className="text-sm font-semibold text-slate-400 mb-2">/month management</p>
              <p className="text-xs text-slate-500 mb-5 pb-5 border-b border-white/10">Businesses spending up to ₹50,000/month on Meta Ads</p>
              <ul className="space-y-2.5 mb-6">
                {['Campaign Setup & Structure', 'Facebook & Instagram Ads', '4–5 Static Creatives/Month', 'Weekly Optimization', 'Monthly Performance Report'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => open()} className="w-full py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl text-sm hover:bg-white/15 transition-colors">Book Consultation</button>
            </div>

            {/* Scaling — highlight */}
            <div className="relative rounded-3xl p-6 shadow-2xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">Best for Growth</div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-white/70 mb-2 mt-2">Scaling Campaigns</p>
              <div className="flex items-end gap-1 mb-1">
                <p className="text-4xl font-black text-white">20%</p>
                <p className="text-sm font-semibold text-white/70 mb-1">of ad spend</p>
              </div>
              <p className="text-xs text-white/60 mb-5 pb-5 border-b border-white/20">Ad budgets above ₹50,000/month</p>
              <ul className="space-y-2.5 mb-6">
                {['Multi-Campaign Management', 'Advanced Audience Optimization', '4–5 Static Creatives/Month', 'Retargeting Systems', 'Scaling Strategy & Insights'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 text-white shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => open('Get Campaign Proposal')} className="w-full py-3 bg-white text-purple-700 font-bold rounded-xl text-sm hover:bg-white/90 transition-colors">Get Campaign Proposal</button>
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
                {['All Starter features included', 'Priority creative production', 'Minimum 3-month duration', 'Full pixel & tracking setup'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => open('Claim 3-Month Discount')} className="w-full py-3 bg-amber-400 text-amber-900 font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors">Claim Discount</button>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-4">Ad budget paid directly to Meta · 4–5 static creatives/month included · Video production separate · Min. 3-month duration</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
              Book Meta Ads Consultation <ArrowRight className="w-4 h-4" />
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
            <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Our Advantage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We focus on customer acquisition and growth, not vanity metrics.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-pink-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-pink-600" /></div>
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
            <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors" aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-pink-600' : ''}`} />
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
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #831843 50%, #92400e 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.04]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-pink-200 rounded-full blur-[120px] opacity-[0.07]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Performance-Focused Social Advertising Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Scale Your Business With Conversion-Focused Meta Ads
          </h2>
          <p className="text-white/80 text-lg mb-3">Generate leads, sales, bookings, and audience growth with professionally managed Facebook and Instagram advertising systems.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Facebook · Instagram · Reels · Lead Gen · WhatsApp Campaigns · Remarketing
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Book Meta Ads Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Campaign Proposal')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get Campaign Proposal
            </button>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 text-white text-sm font-bold rounded-xl shadow" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>Book Consultation</button>
        <button onClick={() => open('Get Campaign Proposal')} className="flex-1 py-3 border-2 border-pink-500 text-pink-600 text-sm font-bold rounded-xl">Get Proposal</button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
