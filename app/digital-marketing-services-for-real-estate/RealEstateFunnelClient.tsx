'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  Building2, Phone, Mail, MapPin, ChevronRight, ArrowRight,
  CheckCircle, X, Search, MessageCircle, BarChart3, Star,
  Users, Zap, Shield, TrendingUp, Home, Store, Layers,
  AlertCircle, ThumbsUp, Calendar, ChevronDown,
} from 'lucide-react'

// ─── COLOUR TOKENS ─────────────────────────────────────────────────────────────
const RE = {
  navy: '#001F3F',
  gold: '#FFC300',
  goldDark: '#E6B000',
  goldLight: '#FFF3B0',
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  { icon: AlertCircle, text: 'Portals give fake or junk leads — wasted ad spend every month' },
  { icon: AlertCircle, text: 'No system to filter real buyers from time-wasters' },
  { icon: AlertCircle, text: 'No follow-up automation = missed site visits every week' },
  { icon: AlertCircle, text: 'Agents waste hours chasing unverified calls that never convert' },
  { icon: AlertCircle, text: 'No CRM tracking = lost deals and no visibility on pipeline' },
  { icon: AlertCircle, text: 'Influencer videos get likes — but without a system, zero site visits' },
]

const DELIVERABLES = [
  { icon: Search, label: 'Local SEO & Project Ranking', desc: 'Rank on Google for "flats in [city]" queries' },
  { icon: TrendingUp, label: 'Google & Meta Buyer Lead Ads', desc: 'Targeted campaigns reaching serious buyers' },
  { icon: Zap, label: 'AI Qualification Calls', desc: 'Filter time-wasters before they reach your team' },
  { icon: MessageCircle, label: 'WhatsApp Automation', desc: 'Reminders, brochures & visit confirmations' },
  { icon: BarChart3, label: 'CRM Integration', desc: 'Track every lead from enquiry to deal closed' },
  { icon: Star, label: 'Reputation & Reviews', desc: 'Build trust with Google ratings & testimonials' },
  { icon: Users, label: 'Personal Branding & AI Avatars', desc: 'Position builders as trusted experts' },
  { icon: Layers, label: 'Influencer Collaboration', desc: 'Integrated into funnel — not standalone' },
]

const WHO_WE_HELP = [
  { icon: Building2, label: 'Builders & Developers' },
  { icon: Home, label: 'Residential Projects' },
  { icon: Store, label: 'Commercial Properties' },
  { icon: Users, label: 'Real Estate Agencies' },
  { icon: Star, label: 'Luxury Projects' },
  { icon: Home, label: 'Affordable Housing' },
  { icon: MapPin, label: 'Plot / Land Sellers' },
  { icon: Building2, label: 'Realtors & Brokers' },
]

const RESULTS = [
  { icon: '🏢', result: '3× site visits', detail: 'Builder achieved 3x more qualified site visits in 90 days', metric: '3×', label: 'Site Visits' },
  { icon: '🏘️', result: '60% faster clearance', detail: 'Residential project cleared 60% inventory faster vs previous quarter', metric: '60%', label: 'Faster Inventory Clearance' },
  { icon: '🏠', result: '40% fewer fake leads', detail: 'Agent reduced fake lead calls by 40% with AI qualification', metric: '40%', label: 'Fewer Fake Leads' },
]

const FUNNEL_STEPS = [
  { label: 'Search', sublabel: 'SEO + Ads', color: '#3B82F6' },
  { label: 'Lead Captured', sublabel: 'Forms + Landing Pages', color: '#8B5CF6' },
  { label: 'AI Verified', sublabel: 'AI Calls + WhatsApp', color: RE.gold },
  { label: 'Site Visit', sublabel: 'Reminders + Booking', color: '#10B981' },
  { label: 'Deal Closed', sublabel: 'CRM + Follow-up', color: '#EF4444' },
]

const WHY_US = [
  'Verified buyer leads — not junk portal enquiries',
  'Complete funnel: SEO + Ads + AI + WhatsApp + CRM',
  '10+ real estate clients already growing with us',
  '5,000+ buyer enquiries generated across projects',
  'Affordable & transparent pricing — no hidden fees',
  'Influencer videos integrated into funnels, not standalone',
  'Dedicated real estate growth team',
  'Done-for-you execution — zero stress for your team',
]

const FAQS = [
  {
    q: 'How do you provide verified buyer leads?',
    a: 'We qualify all leads with AI calls and WhatsApp checks before passing them to your sales team. Only serious, verified buyers reach you — no time-wasters.',
  },
  {
    q: 'Can you reduce fake portal leads?',
    a: 'Yes. Our AI qualification layer filters non-serious leads before they reach your team, dramatically reducing wasted calls and improving sales team productivity.',
  },
  {
    q: 'How do WhatsApp reminders help sell faster?',
    a: 'Buyers are automatically nudged via WhatsApp at key moments — post-enquiry, pre-site visit, and post-visit. More confirmed visits means faster closings.',
  },
  {
    q: 'Do you integrate with my existing CRM?',
    a: 'Yes. We connect to your existing CRM or provide a lightweight dashboard — tracking every lead from first enquiry through to deal closed.',
  },
  {
    q: 'Do influencer videos actually convert to property sales?',
    a: 'Only when part of a complete system. We integrate influencer content into SEO, paid ads, WhatsApp nurturing, and CRM — turning views into verified site visits.',
  },
]

// ─── ENQUIRY FORM ──────────────────────────────────────────────────────────────
function EnquiryForm({ inline = false }: { inline?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', business_type: '', city: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitting(true)
    setError('')
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city || undefined,
        source: 'real-estate-funnel-page',
        service_interest: 'Real Estate Growth Funnel',
        message: `Business Type: ${form.business_type}`,
      })
      trackLead('real-estate-funnel-page', 'Real Estate Growth Funnel')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={`text-center ${inline ? 'py-8' : 'py-10 px-6'}`}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: RE.goldLight }}>
          <CheckCircle className="w-8 h-8" style={{ color: RE.goldDark }} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: RE.navy }}>Thanks! We'll be in touch.</h3>
        <p className="text-slate-500 text-sm">We'll connect with you on WhatsApp within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
          <input
            required value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': RE.gold } as React.CSSProperties}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">WhatsApp No. *</label>
          <input
            required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Business Type</label>
          <select
            value={form.business_type} onChange={e => set('business_type', e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2"
          >
            <option value="">Select…</option>
            <option>Builder / Developer</option>
            <option>Real Estate Agent</option>
            <option>Real Estate Agency</option>
            <option>Property Broker</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
          <input
            value={form.city} onChange={e => set('city', e.target.value)}
            placeholder="e.g. Ranchi"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2"
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <button
        type="submit" disabled={submitting}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: RE.gold, color: RE.navy }}
      >
        {submitting
          ? <><span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" /> Submitting…</>
          : <>Book Free Real Estate Growth Call <ArrowRight className="w-4 h-4" /></>
        }
      </button>
      <p className="text-center text-[11px] text-slate-400">Free consultation · No spam · WhatsApp reply within 24 hours</p>
    </form>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function RealEstateFunnelClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const waLink = `https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent('Hi, I want to know about the Real Estate Growth Funnel from Scalify Labs.')}`

  return (
    <main style={{ fontFamily: 'inherit' }}>

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: RE.navy }}>
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #FFC300 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10"
          style={{ background: RE.gold }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
          {/* breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8 opacity-50" style={{ color: RE.gold }}>
            <Link href="/" className="hover:opacity-80 transition-opacity text-white">Home</Link>
            <ChevronRight className="w-3 h-3 text-white" />
            <span className="text-white">Industries</span>
            <ChevronRight className="w-3 h-3 text-white" />
            <span style={{ color: RE.gold }}>Real Estate</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{ borderColor: RE.gold + '40', background: RE.gold + '12', color: RE.gold }}>
                <Building2 className="w-3.5 h-3.5" />
                Real Estate Growth Funnel
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                Sell Properties Faster With{' '}
                <span style={{ color: RE.gold }}>Verified Buyer Leads</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed">
                From ads to AI qualification &amp; WhatsApp reminders — we bring you real buyers, not time-wasters.
              </p>

              {/* Trust counters */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: '🏢', val: '10+', label: 'Builders & Agents Served' },
                  { icon: '📞', val: '5,000+', label: 'Buyer Enquiries Generated' },
                  { icon: '💰', val: 'Affordable', label: 'Growth Service' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                    style={{ borderColor: RE.gold + '30', background: RE.gold + '08' }}>
                    <span className="text-lg">{c.icon}</span>
                    <div>
                      <p className="text-sm font-black text-white">{c.val}</p>
                      <p className="text-[10px] opacity-60 text-white">{c.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#enquire"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg"
                  style={{ background: RE.gold, color: RE.navy }}>
                  Book Free Real Estate Growth Call <ArrowRight className="w-4 h-4" />
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border hover:bg-white/5 transition-colors text-white"
                  style={{ borderColor: RE.gold + '50' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: RE.gold }} /> Talk on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — visual mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl border"
                style={{ borderColor: RE.gold + '20', background: 'rgba(255,255,255,0.04)' }}>
                {/* header */}
                <div className="px-5 py-4 flex items-center justify-between border-b"
                  style={{ borderColor: RE.gold + '20', background: RE.gold + '10' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                      style={{ background: RE.gold, color: RE.navy }}>SL</div>
                    <div>
                      <p className="text-white text-xs font-bold">Scalify Labs — Real Estate Leads</p>
                      <p className="text-white/40 text-[10px]">Your Growth Funnel Dashboard</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: RE.gold, color: RE.navy }}>LIVE</span>
                </div>

                {/* calendar filling up */}
                <div className="p-4">
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-3">Site Visits This Week</p>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[9px] text-white/30 mb-1">{d}</p>
                        <div className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                          i < 5 ? 'text-white' : 'text-white/20'
                        }`} style={{ background: i < 5 ? RE.gold + (i < 3 ? 'ff' : '60') : 'rgba(255,255,255,0.05)' }}>
                          {i < 5 ? (i === 4 ? '2' : ['4', '3', '5', '4'][i] ?? '4') : '—'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WA confirmations */}
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">WhatsApp Confirmations</p>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Ravi S.', action: 'Site visit confirmed — Thu 3 PM ✅', verified: true },
                      { name: 'Priya M.', action: 'Brochure sent · Follow-up scheduled', verified: true },
                      { name: 'Amit K.', action: 'AI call completed · Qualified buyer ⭐', verified: true },
                    ].map(l => (
                      <div key={l.name} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black"
                          style={{ background: RE.gold, color: RE.navy }}>{l.name[0]}</div>
                        <div className="min-w-0">
                          <p className="text-white text-[10px] font-semibold">{l.name}</p>
                          <p className="text-white/50 text-[9px] truncate">{l.action}</p>
                        </div>
                        {l.verified && <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center" style={{ background: RE.gold + '20' }}>
                          <CheckCircle className="w-3 h-3" style={{ color: RE.gold }} />
                        </div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* floating chips */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: RE.goldLight }}>
                  <CheckCircle className="w-4 h-4" style={{ color: RE.goldDark }} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400">AI Verified</p>
                  <p className="text-xs font-extrabold" style={{ color: RE.navy }}>Buyer Lead</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl px-4 py-2.5"
                style={{ background: RE.navy, border: `1px solid ${RE.gold}30` }}>
                <p className="text-[9px] font-semibold" style={{ color: RE.gold }}>Site Visits ↑</p>
                <p className="text-xl font-black text-white">3×</p>
                <p className="text-[9px] text-white/40">in 90 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY IT FAILS ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: RE.navy }}>
              Why Most Real Estate Marketing Doesn't Work
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-red-50 shadow-sm">
                <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center max-w-2xl mx-auto px-4 py-4 rounded-2xl border"
            style={{ borderColor: RE.gold + '40', background: RE.goldLight + '60' }}>
            <p className="text-sm font-semibold" style={{ color: RE.navy }}>
              An influencer video might get likes — but without SEO, ads, reminders &amp; CRM, it won't fill your site visits.
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE FUNNEL SOLUTION ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: RE.navy }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>The Solution</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              One Funnel. One Partner. More Closings.
            </h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">
              We design your full real estate funnel — so buyer interest becomes verified calls, site visits, and sales.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {DELIVERABLES.map(d => (
              <div key={d.label} className="rounded-2xl p-5 border hover:-translate-y-1 transition-all duration-200"
                style={{ borderColor: RE.gold + '20', background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: RE.gold + '15', border: `1px solid ${RE.gold}30` }}>
                  <d.icon className="w-5 h-5" style={{ color: RE.gold }} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{d.label}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Funnel diagram */}
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: RE.gold }}>
              The Scalify Labs Real Estate Funnel
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              {FUNNEL_STEPS.map((step, i) => (
                <div key={step.label} className="flex sm:flex-col items-center gap-2 sm:gap-0 w-full sm:w-auto">
                  <div className="flex sm:flex-col items-center gap-2 flex-1 sm:flex-none">
                    <div className="relative">
                      <div className="w-full sm:w-28 px-4 sm:px-2 py-3 rounded-xl text-center"
                        style={{ background: step.color + '20', border: `1px solid ${step.color}50` }}>
                        <p className="font-black text-white text-sm">{step.label}</p>
                        <p className="text-[9px] mt-0.5" style={{ color: step.color }}>{step.sublabel}</p>
                      </div>
                    </div>
                    {i < FUNNEL_STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 shrink-0 sm:rotate-90 sm:mt-2" style={{ color: RE.gold + '60' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INFLUENCER MYTH vs SYSTEM ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>The Real Difference</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: RE.navy }}>
              Why Influencer Videos Alone Won't Sell Your Properties
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
              Builders spend lakhs on influencer content. Without SEO, ads, WhatsApp reminders &amp; CRM, those videos rarely convert into site visits.
            </p>
          </div>

          {/* Split comparison */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {/* Left — influencer only */}
            <div className="rounded-2xl p-6 border-2 border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold text-slate-700">Influencer Video Only</span>
                <span className="text-[10px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Low ROI</span>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { icon: ThumbsUp, label: 'Views', val: '45,000', color: 'text-slate-400' },
                  { icon: Star, label: 'Likes', val: '2,300', color: 'text-slate-400' },
                  { icon: MessageCircle, label: 'Comments', val: '180', color: 'text-slate-400' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                      <span className="text-xs text-slate-500">{s.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-400">{s.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 rounded-xl">
                <X className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-xs text-red-600 font-medium">Site visits: 0 · Deals closed: 0</p>
              </div>
            </div>

            {/* Right — full funnel */}
            <div className="rounded-2xl p-6 border-2" style={{ borderColor: RE.gold + '40', background: RE.goldLight + '30' }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold" style={{ color: RE.navy }}>Scalify Labs Full Funnel</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: RE.gold, color: RE.navy }}>High ROI</span>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { icon: TrendingUp, label: 'Verified Leads', val: '120+', color: RE.goldDark },
                  { icon: Calendar, label: 'Site Visits Booked', val: '38', color: RE.goldDark },
                  { icon: CheckCircle, label: 'Deals Closed', val: '11', color: RE.goldDark },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border"
                    style={{ borderColor: RE.gold + '30' }}>
                    <div className="flex items-center gap-2">
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                      <span className="text-xs" style={{ color: RE.navy }}>{s.label}</span>
                    </div>
                    <span className="text-sm font-black" style={{ color: RE.navy }}>{s.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: RE.gold + '20' }}>
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: RE.goldDark }} />
                <p className="text-xs font-medium" style={{ color: RE.navy }}>Influencer + SEO + Ads + WhatsApp + CRM</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm font-semibold" style={{ color: RE.navy }}>
            At Scalify Labs, we don't just create videos — we build the system that makes them convert.
          </p>
        </div>
      </section>

      {/* ─── WHO WE HELP ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>Who We Serve</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: RE.navy }}>
              Perfect for Every Real Estate Business
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {WHO_WE_HELP.map(w => (
              <div key={w.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: RE.goldLight }}>
                  <w.icon className="w-5 h-5" style={{ color: RE.goldDark }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: RE.navy }}>{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: RE.navy }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>Proof</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Results That Speak for Themselves</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {RESULTS.map(r => (
              <div key={r.label} className="rounded-2xl p-6 text-center border"
                style={{ borderColor: RE.gold + '25', background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-3xl mb-3">{r.icon}</div>
                <p className="text-4xl font-black mb-1" style={{ color: RE.gold }}>{r.metric}</p>
                <p className="text-white font-bold text-sm mb-2">{r.label}</p>
                <p className="text-white/50 text-xs leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>

          {/* Funnel visual */}
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: RE.gold }}>
              Lead Journey: Search → Deal Closed
            </p>
            <div className="space-y-2">
              {FUNNEL_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 px-5 py-3 rounded-xl"
                  style={{ background: step.color + '15', border: `1px solid ${step.color}30`,
                    width: `${100 - i * 12}%`, marginLeft: `${i * 6}%` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ background: step.color }}>{i + 1}</div>
                  <div>
                    <p className="text-white font-bold text-sm">{step.label}</p>
                    <p className="text-white/50 text-[10px]">{step.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: RE.navy }}>
              Not Just an Agency. Your Growth Partner.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {WHY_US.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: RE.goldLight }}>
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: RE.goldDark }} />
                </div>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RE.gold }}>FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: RE.navy }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-sm pr-4" style={{ color: RE.navy }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}
                    style={{ color: RE.gold }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section id="enquire" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: RE.navy }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #FFC300 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Copy */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: RE.gold }}>Get Started</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Ready to Sell More Properties With Verified Buyers?
              </h2>
              <p className="text-white/60 text-base mb-7 leading-relaxed">
                Book a free growth call and see how our funnel fills your site visits with real, qualified buyers — not junk leads.
              </p>
              <div className="space-y-3">
                {['Free 30-min strategy call', 'No obligation, no spam', 'WhatsApp reply within 24 hours', 'Dedicated real estate growth consultant'].map(b => (
                  <div key={b} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: RE.gold }} />
                    <p className="text-white/70 text-sm">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: RE.gold + '25' }}>
              <h3 className="font-bold text-white text-lg mb-1">Book Your Free Growth Call</h3>
              <p className="text-white/50 text-xs mb-5">Takes 2 minutes · WhatsApp preferred</p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <a href="#enquire"
          className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center"
          style={{ background: RE.gold, color: RE.navy }}>
          Book Free Call
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 border-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
          style={{ borderColor: RE.navy, color: RE.navy }}>
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}

const SITE_WHATSAPP = '918788424727'
