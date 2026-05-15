'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  ArrowRight, Check, ChevronDown, ChevronRight, X,
  TrendingUp, Database, MessageCircle, BarChart3, Zap, Shield,
  Search, Globe, PhoneCall, Users, CheckCircle, Clock,
  AlertTriangle, DollarSign, Target, Activity,
} from 'lucide-react'

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg: '#FAFAF8', altBg: '#F4F6F8', primary: '#FF6B00',
  text: '#222222', sub: '#616161', border: '#E5E7EB',
  success: '#2E7D32', white: '#FFFFFF',
}

const WA = '918788424727'

// ─── DATA ────────────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  { icon: Clock,         title: 'Slow follow-up',      desc: 'Leads wait hours or days. Competitor responds in minutes. You lose.' },
  { icon: Database,      title: 'No CRM',               desc: 'Leads live in spreadsheets, WhatsApp DMs, and sticky notes. Nothing tracked.' },
  { icon: MessageCircle, title: 'Zero automation',      desc: 'Every follow-up is manual. Sales team spends 60% of time on admin, not selling.' },
  { icon: BarChart3,     title: 'No revenue visibility', desc: 'You don\'t know which channel brings the best leads or what they convert at.' },
  { icon: AlertTriangle, title: 'Siloed tools',         desc: 'Ads, CRM, WhatsApp, SEO all disconnected. No single source of truth.' },
  { icon: TrendingUp,    title: 'Ad spend leaking',    desc: 'Spending on ads with no nurture system. Leads go cold within 48 hours.' },
]

const SYSTEM_STEPS = [
  { n: '01', icon: Search,        title: 'Traffic & Lead Generation', desc: 'SEO + Google Ads + Meta Ads — calibrated for your buyer profile. Every rupee tracked.' },
  { n: '02', icon: Zap,           title: 'Instant Lead Capture',      desc: 'Forms, WhatsApp click-to-chat, and landing pages built for speed. Under 2-second response.' },
  { n: '03', icon: Database,      title: 'CRM Integration',            desc: 'Every lead auto-enters CRM with source, intent, and contact details. Nothing manual.' },
  { n: '04', icon: MessageCircle, title: 'WhatsApp Automation',        desc: 'Instant reply, qualification questions, brochure delivery, appointment booking — all automated.' },
  { n: '05', icon: Users,         title: 'Sales Team Handoff',         desc: 'Only qualified leads reach your team. Full context: source, interest, conversation history.' },
  { n: '06', icon: BarChart3,     title: 'Revenue Reporting',          desc: 'Monthly dashboard: leads by source, cost per lead, pipeline value, conversion rate.' },
]

const COMPARISON = [
  { label: 'Connected CRM + Ads + WhatsApp', scalify: true,  agency: false, freelancer: false, internal: '?' },
  { label: 'Revenue-focused reporting',      scalify: true,  agency: false, freelancer: false, internal: false },
  { label: 'WhatsApp automation system',     scalify: true,  agency: false, freelancer: false, internal: false },
  { label: 'Fixed monthly retainer',         scalify: true,  agency: true,  freelancer: true,  internal: false },
  { label: 'Industry-specific playbooks',    scalify: true,  agency: false, freelancer: false, internal: false },
  { label: 'No vendor coordination needed',  scalify: true,  agency: false, freelancer: false, internal: false },
  { label: 'Dedicated growth strategist',    scalify: true,  agency: false, freelancer: false, internal: true },
  { label: 'Transparent ad spend control',   scalify: true,  agency: false, freelancer: true,  internal: true },
]

const CASE_STUDIES = [
  {
    industry: 'Healthcare', icon: '🏥',
    problem: 'Clinic generating 150 leads/month but converting only 12%',
    solution: 'WhatsApp automation + CRM + appointment reminder sequences',
    result: '31% conversion rate in 60 days. ₹4.2L additional monthly revenue.',
    metric: '31%', metricLabel: 'Conversion Rate',
  },
  {
    industry: 'Education', icon: '🎓',
    problem: 'Coaching institute spending ₹80K/month on ads, CPL ₹400+',
    solution: 'Restructured Google Ads + SEO + WhatsApp nurture funnel',
    result: 'CPL dropped to ₹95. 3× admissions from same budget.',
    metric: '₹95', metricLabel: 'Cost Per Lead',
  },
  {
    industry: 'Real Estate', icon: '🏢',
    problem: 'Builder getting 200 leads/month with <5% site visit conversion',
    solution: 'AI qualification + WhatsApp visit reminders + CRM tracking',
    result: '18% site visit rate. 40% fewer fake leads wasting team time.',
    metric: '18%', metricLabel: 'Site Visit Rate',
  },
]

const INDUSTRIES = [
  { icon: '🏥', label: 'Healthcare & Clinics',    sub: 'Appointment funnels, OPD growth' },
  { icon: '🎓', label: 'Education & Coaching',    sub: 'Admission season campaigns, batch filling' },
  { icon: '🏢', label: 'Real Estate',              sub: 'Site visit funnels, verified buyer leads' },
  { icon: '🛍️', label: 'Retail & eCommerce',       sub: 'Repeat purchase automation, cart recovery' },
  { icon: '⚖️', label: 'Professional Services',    sub: 'Consultant lead generation, retainer funnels' },
  { icon: '💰', label: 'Financial Services',        sub: 'Insurance, lending, investment lead nurture' },
]

const FAQS = [
  { q: 'What exactly is included in ₹75,000/month?', a: 'Strategy, CRM setup and management, WhatsApp automation, ad campaign management (Google + Meta), SEO management, monthly reporting. Ad spend is billed directly to platforms — not through us.' },
  { q: 'Is ad spend included in the ₹75,000/month?', a: 'No. Ad spend goes directly to Google/Meta from your account. This ensures full transparency — you see every rupee spent on ads. Our fee covers the management, systems, and strategy layer.' },
  { q: 'How fast will I see results?', a: 'Lead response time improves from day 1 (WhatsApp automation live). Conversion rate improvement shows in 30-45 days. Significant revenue impact is typically visible within 60-90 days.' },
  { q: 'My business already runs ads. Can you still help?', a: 'Yes. We audit your existing setup, fix what\'s leaking, and connect the missing layers — CRM, WhatsApp, nurturing, reporting. Most clients see immediate improvement in existing lead conversion before we even scale the ads.' },
  { q: 'Do I need to hire more people?', a: 'No. The system is designed to do more with your current team. Automation handles follow-ups, qualification, and scheduling — so your sales team only handles ready-to-convert leads.' },
  { q: 'What CRM do you use?', a: 'We recommend based on your team size and budget — Kylas, Zoho, HubSpot, or TeleCRM. We handle full setup, integration, and training. If you already have a CRM, we integrate with it.' },
]

// ─── FORM ─────────────────────────────────────────────────────────────────────
function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: '', phone: '', business: '', monthly_leads: '' })
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
        business: form.business || undefined,
        source: 'lead-to-revenue-page', service_interest: 'Lead to Revenue Growth System',
        message: `Monthly leads: ${form.monthly_leads}`,
      })
      trackLead('lead-to-revenue-page', 'Lead to Revenue Growth System')
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  if (submitted) return (
    <div className="text-center py-8">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <CheckCircle className="w-7 h-7 text-green-600" />
      </div>
      <p className="font-bold text-lg text-[#222] mb-1">We'll call you within 2 hours</p>
      <p className="text-[#616161] text-sm">Check WhatsApp for confirmation.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={compact ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        <div>
          <label className="block text-xs font-semibold text-[#616161] mb-1.5 uppercase tracking-wide">Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name"
            className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#222] bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.1)] transition-all" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#616161] mb-1.5 uppercase tracking-wide">WhatsApp *</label>
          <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX"
            className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#222] bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.1)] transition-all" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#616161] mb-1.5 uppercase tracking-wide">Business Name</label>
          <input value={form.business} onChange={e => set('business', e.target.value)} placeholder="Your company"
            className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#222] bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.1)] transition-all" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#616161] mb-1.5 uppercase tracking-wide">Monthly Leads</label>
          <select value={form.monthly_leads} onChange={e => set('monthly_leads', e.target.value)}
            className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#222] bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[rgba(255,107,0,0.1)] transition-all">
            <option value="">Select range…</option>
            <option>10–30 leads/month</option>
            <option>30–100 leads/month</option>
            <option>100–500 leads/month</option>
            <option>500+ leads/month</option>
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <button type="submit" disabled={submitting}
        className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60 text-base"
        style={{ background: C.primary, minHeight: 56 }}>
        {submitting
          ? <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</>
          : <>Find My Revenue Leaks <ArrowRight className="w-5 h-5" /></>}
      </button>
      <p className="text-center text-xs text-[#616161]">Free · No commitment · WhatsApp confirmation within 2 hours</p>
    </form>
  )
}

// ─── ROI CALCULATOR ─────────────────────────────────────────────────────────
function ROICalculator() {
  const [leads, setLeads] = useState(100)
  const [rate, setRate] = useState(10)
  const [ticket, setTicket] = useState(15000)

  const current = Math.round(leads * (rate / 100) * ticket)
  const improved = Math.round(leads * ((rate + 15) / 100) * ticket)
  const lost = improved - current
  const annual = lost * 12

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary + '15' }}>
          <DollarSign className="w-4 h-4" style={{ color: C.primary }} />
        </div>
        <h3 className="text-lg font-bold text-[#222]">Revenue Leak Calculator</h3>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        {[
          { label: 'Monthly Leads', value: leads, set: setLeads, min: 10, max: 1000, step: 10, fmt: (v: number) => v.toString() },
          { label: 'Current Conversion %', value: rate, set: setRate, min: 1, max: 50, step: 1, fmt: (v: number) => `${v}%` },
          { label: 'Avg Ticket Size (₹)', value: ticket, set: setTicket, min: 1000, max: 200000, step: 1000, fmt: (v: number) => `₹${v.toLocaleString()}` },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#616161] uppercase tracking-wide">{s.label}</label>
              <span className="text-sm font-bold" style={{ color: C.primary }}>{s.fmt(s.value)}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
              onChange={e => s.set(Number(e.target.value))}
              className="w-full" style={{ accentColor: C.primary }} />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-[#F4F6F8] rounded-xl p-4 text-center">
          <p className="text-xs font-semibold text-[#616161] uppercase tracking-wide mb-1">Current Monthly Revenue</p>
          <p className="text-2xl font-black text-[#222]">₹{current.toLocaleString()}</p>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: C.primary + '10', border: `1px solid ${C.primary}30` }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.primary }}>Revenue Being Lost</p>
          <p className="text-2xl font-black" style={{ color: C.primary }}>₹{lost.toLocaleString()}/mo</p>
          <p className="text-xs mt-0.5" style={{ color: C.primary }}>₹{Math.round(annual / 100000) * 100000 === 0 ? annual.toLocaleString() : (annual / 100000).toFixed(1) + 'L'}/year</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">With System (Est.)</p>
          <p className="text-2xl font-black text-green-700">₹{improved.toLocaleString()}/mo</p>
        </div>
      </div>

      <div className="mt-5 p-3 rounded-xl bg-[#F4F6F8] text-center">
        <p className="text-sm text-[#616161]">
          Based on our clients achieving <strong className="text-[#222]">+15% conversion rate improvement</strong> on average within 90 days.
        </p>
      </div>
    </div>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function LeadToRevenuePageClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [activeIndustry, setActiveIndustry] = useState(0)
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to discuss the Lead to Revenue Growth System from Scalify Labs.')}`

  return (
    <main style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-14 pb-20 lg:pt-20 lg:pb-28 px-4" style={{ background: C.bg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{ background: C.primary + '10', color: C.primary, borderColor: C.primary + '25' }}>
                <Activity className="w-3.5 h-3.5" /> Lead to Revenue Growth System
              </div>

              <h1 className="font-black leading-[1.15] tracking-tight mb-5 text-[34px] sm:text-[44px] lg:text-[54px]"
                style={{ color: C.text }}>
                Stop Losing Leads<br />
                <span style={{ color: C.primary }}>After Inquiry Generation</span>
              </h1>

              <p className="text-[18px] leading-[1.7] mb-7 max-w-[540px]" style={{ color: C.sub }}>
                Most businesses lose revenue because marketing, CRM, WhatsApp and follow-ups stay disconnected. We build the system that connects them all.
              </p>

              <div className="flex flex-col gap-2.5 mb-8">
                {['Instant lead response — under 5 minutes','CRM setup, training & management','WhatsApp automation sequences','Revenue reporting & pipeline visibility'].map(b => (
                  <div key={b} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: C.success + '15' }}>
                      <Check className="w-3 h-3" style={{ color: C.success }} />
                    </div>
                    <span className="text-[15px]" style={{ color: C.sub }}>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#audit"
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity"
                  style={{ background: C.primary, minHeight: 56 }}>
                  Get Free Growth Leak Audit <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#how-it-works"
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base border-2 transition-colors hover:bg-[#F4F6F8]"
                  style={{ color: C.text, borderColor: C.border, minHeight: 56 }}>
                  See How It Works
                </a>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t" style={{ borderColor: C.border }}>
                {[['50+', 'Businesses served'],['3×', 'Avg revenue growth'],['90', 'Days to see results']].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-2xl font-black" style={{ color: C.primary }}>{n}</p>
                    <p className="text-xs" style={{ color: C.sub }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Lead funnel diagram */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-[420px]">
                {/* Flow diagram */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
                  <p className="text-xs font-semibold text-[#616161] uppercase tracking-widest mb-5">Without Our System</p>
                  <div className="space-y-2 mb-6">
                    {[
                      { label: 'Lead Enquires', icon: '📞', status: 'ok' },
                      { label: 'Wait 2–6 hours for reply', icon: '⏰', status: 'warn' },
                      { label: 'Manual WhatsApp follow-up', icon: '😓', status: 'warn' },
                      { label: 'Lead goes cold', icon: '❄️', status: 'bad' },
                      { label: 'Competitor wins the deal', icon: '💔', status: 'bad' },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: step.status === 'bad' ? '#FEE2E2' : step.status === 'warn' ? '#FEF9C3' : '#F0FDF4' }}>
                        <span className="text-base">{step.icon}</span>
                        <span className="text-sm font-medium" style={{ color: step.status === 'bad' ? '#DC2626' : step.status === 'warn' ? '#92400E' : C.success }}>{step.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs font-semibold text-[#616161] uppercase tracking-widest mb-3">With Lead to Revenue System</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Lead Enquires', icon: '📞' },
                      { label: 'Instant WhatsApp reply (< 2 min)', icon: '⚡' },
                      { label: 'CRM auto-qualifies lead', icon: '🎯' },
                      { label: 'Nurture sequence begins', icon: '🔄' },
                      { label: 'Sales team gets qualified lead', icon: '🏆' },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                        <span className="text-base">{step.icon}</span>
                        <span className="text-sm font-medium text-green-800">{step.label}</span>
                        {i === 4 && <Check className="w-4 h-4 text-green-600 ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating metric */}
                <div className="absolute -bottom-4 -right-4 bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-[10px] text-[#616161] font-semibold uppercase tracking-widest">Avg result</p>
                  <p className="text-2xl font-black" style={{ color: C.primary }}>+31%</p>
                  <p className="text-xs text-[#616161]">Conversion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ─────────────────────────────────────────────── */}
      <section className="py-8 border-y" style={{ background: C.white, borderColor: C.border }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <p className="text-xs font-semibold text-[#616161] uppercase tracking-widest shrink-0">Trusted by</p>
            {[['50K+','Leads Processed'],['24/7','Automation Active'],['6+','Industries Served'],['₹95','Lowest CPL Achieved']].map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="text-2xl font-black" style={{ color: C.primary }}>{n}</p>
                <p className="text-xs text-[#616161]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN SECTION ───────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.altBg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>The Problem</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2] mb-4" style={{ color: C.text }}>
              Every Missed Lead Costs Revenue
            </h2>
            <p className="text-[18px] leading-[1.7] max-w-[600px] mx-auto" style={{ color: C.sub }}>
              The gap between lead generation and revenue is where most businesses bleed money. Here's exactly where it leaks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200" style={{ borderColor: C.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: '#FEE2E2' }}>
                  <p.icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: C.text }}>{p.title}</h3>
                <p className="text-[15px] leading-[1.7]" style={{ color: C.sub }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border shadow-sm" style={{ borderColor: C.border }}>
            <p className="text-sm font-bold text-center mb-6" style={{ color: C.text }}>What happens in the first 24 hours after a lead enquires</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
              {[
                { time: '0 min', event: 'Lead enquires', color: C.success, icon: '📞' },
                { time: '0–30 min', event: 'Your competitor calls back', color: '#D97706', icon: '⚡' },
                { time: '2–6 hrs', event: 'Your team calls', color: '#DC2626', icon: '📵' },
                { time: '24 hrs', event: 'Lead is gone', color: '#9CA3AF', icon: '👋' },
              ].map((s, i) => (
                <div key={i} className="flex sm:flex-col items-center gap-3 sm:gap-1 flex-1">
                  <div className="flex sm:flex-col items-center gap-2 sm:gap-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0" style={{ background: s.color + '15' }}>{s.icon}</div>
                    {i < 3 && <div className="hidden sm:block h-px w-full" style={{ background: C.border }} />}
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wide" style={{ color: s.color }}>{s.time}</p>
                    <p className="text-xs mt-0.5" style={{ color: C.sub }}>{s.event}</p>
                  </div>
                  {i < 3 && <ArrowRight className="sm:hidden w-4 h-4 shrink-0 rotate-90 sm:rotate-0" style={{ color: C.border }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.white }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>Revenue Calculator</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2]" style={{ color: C.text }}>
              How Much Revenue Are You Losing?
            </h2>
          </div>
          <ROICalculator />
          <div className="text-center mt-8">
            <a href="#audit" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity" style={{ background: C.primary }}>
              Get My Free Revenue Audit <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW THE SYSTEM WORKS ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 lg:py-28 px-4 scroll-mt-20" style={{ background: C.altBg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>The System</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2] mb-4" style={{ color: C.text }}>
              6 Connected Layers. One Revenue Engine.
            </h2>
            <p className="text-[18px] leading-[1.7] max-w-[600px] mx-auto" style={{ color: C.sub }}>
              Every layer is connected. No gaps, no silos. Lead enters — revenue exits.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SYSTEM_STEPS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative overflow-hidden" style={{ borderColor: C.border }}>
                <div className="absolute top-4 right-4 text-[44px] font-black leading-none opacity-[0.06]" style={{ color: C.primary }}>{step.n}</div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: C.primary + '12' }}>
                  <step.icon className="w-5 h-5" style={{ color: C.primary }} />
                </div>
                <p className="text-xs font-mono text-[#616161] mb-1">{step.n}</p>
                <h3 className="font-bold text-lg mb-2" style={{ color: C.text }}>{step.title}</h3>
                <p className="text-[15px] leading-[1.7]" style={{ color: C.sub }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.white }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>Proof</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2]" style={{ color: C.text }}>
              Real Results From Real Businesses
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {CASE_STUDIES.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200" style={{ borderColor: C.border }}>
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: C.altBg, borderBottom: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.icon}</span>
                    <span className="font-bold text-sm" style={{ color: C.text }}>{c.industry}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: C.primary }}>{c.metric}</p>
                    <p className="text-[10px] text-[#616161] font-semibold">{c.metricLabel}</p>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-red-500 mb-1">Problem</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.sub }}>{c.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: C.primary }}>Solution</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.sub }}>{c.solution}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: C.success + '08', border: `1px solid ${C.success}20` }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-green-700 mb-1">Result</p>
                    <p className="text-sm font-semibold text-green-800 leading-relaxed">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.altBg }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>Why Scalify Labs</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2]" style={{ color: C.text }}>
              Not Just an Agency. A Revenue System.
            </h2>
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: C.border }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: C.altBg, borderBottom: `1px solid ${C.border}` }}>
                  <th className="text-left px-5 py-4 text-xs font-mono uppercase tracking-widest" style={{ color: C.sub }}>What you get</th>
                  <th className="px-4 py-4 text-center">
                    <div className="inline-block px-3 py-1.5 rounded-lg font-bold text-xs text-white" style={{ background: C.primary }}>Scalify Labs</div>
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-mono uppercase tracking-widest" style={{ color: C.sub }}>Agency</th>
                  <th className="px-4 py-4 text-center text-xs font-mono uppercase tracking-widest" style={{ color: C.sub }}>Freelancer</th>
                  <th className="px-4 py-4 text-center text-xs font-mono uppercase tracking-widest" style={{ color: C.sub }}>In-house</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b transition-colors" style={{ borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget.style.background = C.altBg)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td className="px-5 py-3.5 font-medium" style={{ color: C.text }}>{row.label}</td>
                    {[row.scalify, row.agency, row.freelancer, row.internal].map((val, j) => (
                      <td key={j} className="px-4 py-3.5 text-center">
                        {val === true ? <Check className="w-4 h-4 mx-auto text-green-600" /> :
                         val === false ? <X className="w-4 h-4 mx-auto text-red-400" /> :
                         <span className="text-[#616161] text-sm">?</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.white }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>Industries</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2]" style={{ color: C.text }}>
              Built for Every Lead-Driven Business
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {INDUSTRIES.map((ind, i) => (
              <button key={i} onClick={() => setActiveIndustry(i)}
                className="p-4 rounded-2xl border text-center transition-all hover:-translate-y-0.5"
                style={{
                  background: activeIndustry === i ? C.primary + '10' : C.white,
                  borderColor: activeIndustry === i ? C.primary + '40' : C.border,
                }}>
                <span className="text-2xl block mb-1.5">{ind.icon}</span>
                <p className="text-xs font-semibold leading-tight" style={{ color: activeIndustry === i ? C.primary : C.text }}>{ind.label}</p>
              </button>
            ))}
          </div>

          <div className="bg-[#F4F6F8] rounded-2xl p-6 border" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{INDUSTRIES[activeIndustry].icon}</span>
              <div>
                <p className="font-bold text-lg" style={{ color: C.text }}>{INDUSTRIES[activeIndustry].label}</p>
                <p style={{ color: C.sub }}>{INDUSTRIES[activeIndustry].sub}</p>
              </div>
              <a href="#audit" className="ml-auto hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity" style={{ background: C.primary }}>
                Get Strategy <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.altBg }}>
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.primary }}>Pricing</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2]" style={{ color: C.text }}>
              One Retainer. Everything Connected.
            </h2>
          </div>

          <div className="bg-white rounded-2xl border shadow-lg overflow-hidden" style={{ borderColor: C.border }}>
            {/* Header */}
            <div className="p-8 text-center border-b" style={{ borderColor: C.border }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.sub }}>Monthly Retainer</p>
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-[54px] font-black leading-none" style={{ color: C.primary }}>₹75,000</span>
                <span className="text-lg text-[#616161] mb-2">/month</span>
              </div>
              <p className="text-sm" style={{ color: C.sub }}>Ad spend billed directly to Google/Meta · Full transparency</p>
            </div>

            {/* What's included */}
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: C.sub }}>Everything included</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-7">
                {[
                  'CRM setup, integration & training','WhatsApp automation sequences',
                  'Google Ads management','Meta Ads management',
                  'SEO content & technical SEO','Monthly revenue reporting',
                  'Lead nurturing workflows','Sales team training & handoff process',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: C.success + '12' }}>
                      <Check className="w-3 h-3" style={{ color: C.success }} />
                    </div>
                    <span className="text-sm" style={{ color: C.text }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="bg-[#F4F6F8] rounded-xl p-5 mb-7">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.sub }}>What to expect</p>
                <div className="space-y-3">
                  {[
                    { period: 'Week 1–2', milestone: 'CRM live, WhatsApp automation active, ad campaigns launched' },
                    { period: 'Day 30', milestone: 'First full revenue report, conversion improvements visible' },
                    { period: 'Day 60', milestone: 'Optimized campaigns, nurture sequences refined based on data' },
                    { period: 'Day 90', milestone: 'Full system running, measurable revenue growth documented' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5" style={{ background: C.primary + '12', color: C.primary }}>{t.period}</div>
                      <p className="text-sm" style={{ color: C.sub }}>{t.milestone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#audit"
                  className="flex-1 py-4 rounded-xl font-bold text-white text-base text-center hover:opacity-90 transition-opacity"
                  style={{ background: C.primary }}>
                  Book Free Strategy Call
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-xl font-bold text-base text-center border-2 hover:bg-[#F4F6F8] transition-colors flex items-center justify-center gap-2"
                  style={{ color: C.text, borderColor: C.border }}>
                  <MessageCircle className="w-4 h-4 text-green-600" /> Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4" style={{ background: C.white }}>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2]" style={{ color: C.text }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border rounded-2xl overflow-hidden" style={{ borderColor: C.border }}>
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#FAFAF8] transition-colors"
                  style={{ minHeight: 56 }}>
                  <span className="font-semibold pr-4" style={{ color: C.text }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`} style={{ color: C.primary }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-64' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-[15px] leading-[1.7] border-t" style={{ color: C.sub, borderColor: C.border, paddingTop: 16 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section id="audit" className="py-20 lg:py-28 px-4 scroll-mt-20" style={{ background: C.altBg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.primary }}>Free Audit</p>
              <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.2] mb-5" style={{ color: C.text }}>
                Know Where Your Leads Are Leaking
              </h2>
              <p className="text-[18px] leading-[1.7] mb-7" style={{ color: C.sub }}>
                In a free 30-minute growth audit, we'll map exactly where your leads drop off and estimate the revenue you can recover.
              </p>
              <div className="space-y-3 mb-8">
                {['No pitch — a genuine revenue diagnosis','Specific recommendations, not generic advice','Map of your lead-to-revenue gaps','Roadmap to fix them, with or without us'].map(b => (
                  <div key={b} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: C.success + '15' }}>
                      <Check className="w-3 h-3" style={{ color: C.success }} />
                    </div>
                    <span className="text-[15px]" style={{ color: C.sub }}>{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border-2 hover:bg-white transition-colors"
                  style={{ color: C.text, borderColor: C.border }}>
                  <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp Us
                </a>
                <a href="tel:+918788424727"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border-2 hover:bg-white transition-colors"
                  style={{ color: C.text, borderColor: C.border }}>
                  <PhoneCall className="w-4 h-4" style={{ color: C.primary }} /> Call Us
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border p-7 shadow-md" style={{ borderColor: C.border }}>
              <h3 className="font-bold text-xl mb-1" style={{ color: C.text }}>Get Your Free Growth Audit</h3>
              <p className="text-sm mb-6" style={{ color: C.sub }}>Fill in below — we call within 2 hours</p>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ─────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t px-4 py-3 flex gap-3 shadow-lg" style={{ borderColor: C.border }}>
        <a href="#audit" className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center" style={{ background: C.primary }}>
          Free Audit
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl text-sm font-bold text-center border-2 flex items-center justify-center gap-1.5"
          style={{ color: C.text, borderColor: C.border }}>
          <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp
        </a>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
