'use client'

import { useState } from 'react'
import Image from 'next/image'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  PhoneCall, Mail, MessageSquare, Calendar, ArrowRight, CheckCircle2,
  TrendingUp, Database, BrainCircuit, Zap, Globe, Users, BarChart3,
  Layers, GitBranch, Search, Shield, Lightbulb, Target, Rocket,
  Clock, MapPin, ChevronDown, AlertCircle, Loader2,
} from 'lucide-react'
import { SITE } from '@/lib/data'

// ─── HERO VISUAL ─────────────────────────────────────────────────────────────

function GrowthOpsVisual() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#0d1526] via-[#0f1b30] to-navy rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6 bg-white/2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex-1 bg-white/5 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/30 font-mono text-[0.6rem]">growth-ops.scalifylabs.com</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Active Campaigns', value: '7', icon: Zap, color: 'text-saffron', bg: 'bg-saffron/10' },
              { label: 'Leads Today', value: '48', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { label: 'Avg Response', value: '43s', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
            ].map(k => (
              <div key={k.label} className="bg-white/5 border border-white/8 rounded-xl p-3">
                <div className={`w-7 h-7 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                  <k.icon className={`w-3.5 h-3.5 ${k.color}`} />
                </div>
                <div className="text-white font-extrabold text-xl leading-none mb-0.5">{k.value}</div>
                <div className="text-white/35 text-[0.58rem] font-mono">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="bg-white/5 border border-white/8 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/40 font-mono text-[0.58rem] uppercase">CRM Pipeline</span>
              <span className="text-emerald-400 font-mono text-[0.58rem]">Live</span>
            </div>
            <div className="flex gap-1.5">
              {[
                { stage: 'New', count: 48, color: 'bg-blue-400' },
                { stage: 'Contact', count: 36, color: 'bg-violet-400' },
                { stage: 'Qualify', count: 22, color: 'bg-amber-400' },
                { stage: 'Proposal', count: 14, color: 'bg-orange-400' },
                { stage: 'Won', count: 8, color: 'bg-emerald-400' },
              ].map(s => (
                <div key={s.stage} className="flex-1 text-center">
                  <div className="text-white font-bold text-sm mb-1">{s.count}</div>
                  <div className={`h-1.5 ${s.color} rounded-full mb-1`} />
                  <div className="text-white/30 text-[0.52rem] font-mono">{s.stage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2-col row */}
          <div className="grid grid-cols-2 gap-2">
            {/* Automation flows */}
            <div className="bg-violet-500/10 border border-violet-400/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <BrainCircuit className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-violet-300 font-mono text-[0.58rem]">AI Workflows</span>
              </div>
              {[
                { name: 'Lead Scoring', status: 'Running' },
                { name: 'WhatsApp Seq', status: 'Active' },
                { name: 'Email Nurture', status: 'Active' },
              ].map(f => (
                <div key={f.name} className="flex items-center justify-between mb-1">
                  <span className="text-white/50 text-[0.58rem]">{f.name}</span>
                  <span className="text-emerald-400 text-[0.52rem] font-mono">{f.status}</span>
                </div>
              ))}
            </div>

            {/* SEO snapshot */}
            <div className="bg-emerald-500/8 border border-emerald-400/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-mono text-[0.58rem]">SEO Rankings</span>
              </div>
              {[
                { kw: 'digital marketing ranchi', pos: '#2' },
                { kw: 'seo company jharkhand', pos: '#1' },
                { kw: 'google ads ranchi', pos: '#3' },
              ].map(k => (
                <div key={k.kw} className="flex items-center justify-between mb-1">
                  <span className="text-white/40 text-[0.52rem] truncate max-w-[80px]">{k.kw}</span>
                  <span className="text-emerald-400 font-mono text-[0.58rem] font-bold">{k.pos}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign ROAS */}
          <div className="bg-white/5 border border-white/8 rounded-xl p-3">
            <span className="text-white/40 font-mono text-[0.58rem] uppercase mb-2 block">Campaign Performance</span>
            {[
              { ch: 'Google Ads', roas: '4.2×', pct: 82, color: 'bg-blue-400' },
              { ch: 'Meta Ads', roas: '3.8×', pct: 74, color: 'bg-violet-400' },
              { ch: 'LinkedIn Ads', roas: '5.6×', pct: 94, color: 'bg-sky-400' },
            ].map(c => (
              <div key={c.ch} className="flex items-center gap-2 mb-1.5">
                <span className="text-white/40 text-[0.58rem] w-20 shrink-0">{c.ch}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                </div>
                <span className="text-white/70 font-mono text-[0.6rem] font-bold w-8 text-right">{c.roas}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[0.62rem] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        All Systems Live
      </div>
      <div className="absolute -bottom-3 -left-3 bg-navy border border-white/15 text-white/70 text-[0.62rem] font-mono px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap">
        ⚡ AI-Powered · 43s avg response
      </div>
    </div>
  )
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

const SERVICES_OPTIONS = [
  'Google Ads', 'Meta Ads', 'SEO Services', 'Local SEO & GMB',
  'CRM & Automation', 'WhatsApp Automation', 'Website Development',
  'Lead to Revenue System', 'AI Calling & Agents', 'RCS Messaging',
  'OBD Voice Calls', 'Specialized Platforms (LinkedIn, Quora)', 'Super 30 Program',
  'All Services / Full Growth System', 'Not Sure — Need Guidance',
]

const BUDGET_OPTIONS = [
  'Under ₹10,000/month',
  '₹10,000 – ₹25,000/month',
  '₹25,000 – ₹50,000/month',
  '₹50,000 – ₹1,00,000/month',
  '₹1,00,000+/month',
  'Not sure / Exploring options',
]

function ConsultationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', phone: '', email: '', business: '', city: '',
    website: '', budget: '', service: '', message: '',
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const messageParts = []
      if (form.website) messageParts.push(`Website: ${form.website}`)
      if (form.budget) messageParts.push(`Budget: ${form.budget}`)
      if (form.message) messageParts.push(`Notes: ${form.message}`)

      await submitLead({
        name: form.name, phone: form.phone,
        email: form.email || undefined,
        business: form.business || undefined,
        city: form.city || undefined,
        source: 'Contact Page — Growth Consultation Form',
        service_interest: form.service || undefined,
        message: messageParts.join(' | ') || undefined,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/60 transition-all'
  const labelClass = 'block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5'

  if (status === 'success') {
    return (
      <div className="text-center py-14">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-bold text-white text-xl mb-2">Consultation Request Received!</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto mb-6">
          Our team will call you within 2 hours during business hours (Mon–Sat, 10am–7pm IST).
        </p>
        <button onClick={() => setStatus('idle')} className="text-saffron font-semibold text-sm hover:underline">
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Rajesh Sharma" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Mobile Number *</label>
          <input required value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" type="tel" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Business Name</label>
          <input value={form.business} onChange={set('business')} placeholder="Your Company" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input value={form.city} onChange={set('city')} placeholder="Ranchi, Delhi…" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Website (optional)</label>
          <input value={form.website} onChange={set('website')} placeholder="yoursite.com" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Monthly Marketing Budget</label>
          <select value={form.budget} onChange={set('budget')} className={`${inputClass} cursor-pointer`}>
            <option value="" className="bg-navy text-white">Select range</option>
            {BUDGET_OPTIONS.map(b => <option key={b} value={b} className="bg-navy text-white">{b}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Service Interested In</label>
          <select value={form.service} onChange={set('service')} className={`${inputClass} cursor-pointer`}>
            <option value="" className="bg-navy text-white">Select service</option>
            {SERVICES_OPTIONS.map(s => <option key={s} value={s} className="bg-navy text-white">{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Growth Challenges / Message</label>
        <textarea
          value={form.message} onChange={set('message')}
          placeholder="Tell us about your current marketing situation, challenges, and what you want to achieve…"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please WhatsApp us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,101,0,0.50)] hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'loading'
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
          : <><Rocket className="w-4 h-4" /> Book My Free Strategy Call</>
        }
      </button>

      <p className="text-white/25 text-[0.65rem] text-center font-mono">
        No spam · Free consultation · Response within 2 hours
      </p>
    </form>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Do you offer free consultations?',
    a: 'Yes — all initial strategy calls are completely free. We spend 30 minutes understanding your business, current marketing setup, and growth goals before recommending any solution.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We work across education & coaching institutes, healthcare & clinics, real estate, retail & ecommerce, local service businesses, B2B companies, and more. Our systems are adaptable to any industry with lead generation needs.',
  },
  {
    q: 'Can you help businesses outside Ranchi?',
    a: 'Absolutely. While based in Ranchi, we serve businesses across India — Delhi, Mumbai, Bangalore, Pune, Patna, Jamshedpur, and beyond. All our services are fully remote-deliverable.',
  },
  {
    q: 'Do you provide execution or only strategy?',
    a: 'We do both — strategy AND full execution. From setting up Google Ads campaigns to implementing CRM automation, WhatsApp sequences, SEO systems, and AI workflows. We are an execution-first team.',
  },
  {
    q: 'Which CRM platforms do you support?',
    a: 'We work with Kylas, TeleCRM, Cratio, Bitrix24, Zoho CRM, HubSpot, LeadSquared, Salesforce, and more. We recommend the right platform based on your team size, budget, and workflow requirements.',
  },
  {
    q: 'Can your systems integrate with WhatsApp?',
    a: 'Yes — WhatsApp Business API integration is one of our core strengths. We connect your CRM, lead forms, Google Ads, and Meta Ads to automated WhatsApp nurturing sequences for instant lead engagement.',
  },
  {
    q: 'Do you work with small businesses?',
    a: 'Yes. We work with businesses at all stages — from solo entrepreneurs and local shops to multi-location businesses and growing startups. Our packages are designed to scale with your budget.',
  },
  {
    q: 'How quickly can your team respond to a new inquiry?',
    a: 'For WhatsApp inquiries — within 2 hours during working hours (Mon–Sat, 10am–7pm IST). For form submissions — within 24 hours. Our AI automation systems can trigger instant acknowledgement replies.',
  },
]

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CONTACT_METHODS = [
  {
    icon: Calendar,
    title: 'Book Strategy Call',
    desc: 'Discuss your business goals, growth challenges, and digital systems in a focused 30-minute session.',
    cta: 'Schedule Call',
    href: '#form',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Consultation',
    desc: 'Quick discussions for ads, CRM, SEO, automation, and growth systems on the most responsive channel.',
    cta: 'Start WhatsApp Chat',
    href: `https://wa.me/918788424727?text=Hi%2C%20I%27d%20like%20to%20consult%20about%20growing%20my%20business`,
    color: 'bg-green-50 text-green-600',
    border: 'border-green-100',
    external: true,
  },
  {
    icon: PhoneCall,
    title: 'Call Directly',
    desc: 'Speak directly with the Scalify Labs team during working hours (Mon–Sat, 10am–7pm IST).',
    cta: 'Call Now',
    href: `tel:${SITE.phone}`,
    color: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
  },
  {
    icon: Mail,
    title: 'Email Inquiry',
    desc: 'Share detailed business requirements, project briefs, and partnership discussions over email.',
    cta: 'Send Email',
    href: `mailto:${SITE.email}`,
    color: 'bg-amber-50 text-amber-600',
    border: 'border-amber-100',
  },
]

const HELP_ITEMS = [
  { icon: TrendingUp, label: 'Google Ads & Performance Marketing', color: 'text-blue-500' },
  { icon: Target, label: 'Meta Ads & Lead Generation', color: 'text-violet-500' },
  { icon: Search, label: 'SEO & Organic Growth', color: 'text-emerald-600' },
  { icon: Database, label: 'CRM & Lead Management', color: 'text-indigo-600' },
  { icon: MessageSquare, label: 'WhatsApp Automation Systems', color: 'text-green-600' },
  { icon: BrainCircuit, label: 'AI Workflow Systems', color: 'text-pink-600' },
  { icon: GitBranch, label: 'Lead to Revenue Infrastructure', color: 'text-saffron' },
  { icon: Globe, label: 'Website & Funnel Systems', color: 'text-sky-600' },
]

const WHY_CARDS = [
  { icon: Layers, title: 'Connected Growth Systems', desc: 'Marketing, CRM, automation, and engagement working together as one infrastructure — not separate silos.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Zap, title: 'Automation-First Execution', desc: 'Reduce manual operations through scalable workflows, AI routing, and smart follow-up systems.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Lightbulb, title: 'Business-Focused Strategy', desc: 'Every recommendation is focused on measurable outcomes — leads, conversions, and revenue growth.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: BrainCircuit, title: 'AI-Enabled Infrastructure', desc: 'Modern systems powered by automation and AI workflows — built for speed and scalability.', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: BarChart3, title: 'Multi-Channel Expertise', desc: 'SEO, ads, CRM, WhatsApp, automation, and analytics — expertise across the full growth stack.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Shield, title: 'Execution-Driven Team', desc: 'Practical implementation with transparent reporting. Focused on delivery, not just strategy decks.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ContactPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>

      {/* ══ SECTION 1 — HERO ════════════════════════════════════════════ */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(255,101,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_25%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_460px] gap-14 items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                Start a Growth Conversation
              </span>

              <h1 className="font-extrabold text-4xl lg:text-[3.1rem] text-white leading-tight tracking-tight mb-5">
                Let&apos;s Build a Smarter<br />
                <span className="text-saffron">Growth System</span><br />
                for Your Business
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-5 max-w-[500px]">
                From lead generation and CRM automation to SEO, paid ads, WhatsApp systems, and AI-powered workflows — Scalify Labs helps businesses build connected growth infrastructure.
              </p>

              <p className="text-white/35 font-mono text-sm mb-8 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-saffron" />
                Based in Ranchi. Working with businesses across India.
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-9">
                {[
                  { value: '500K+', label: 'Leads Processed' },
                  { value: 'Multi-Channel', label: 'Growth Systems' },
                  { value: 'CRM + AI', label: 'Automation Experts' },
                  { value: 'Pan India', label: 'Service Reach' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-white font-extrabold text-sm leading-tight">{stat.value}</div>
                    <div className="text-white/35 font-mono text-[0.58rem] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#form"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Book Free Strategy Call
                </a>
                <a
                  href={`https://wa.me/918788424727?text=Hi%2C%20I%27d%20like%20to%20discuss%20growing%20my%20business`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-6 py-3.5 rounded-xl hover:bg-[#25D366]/22 transition-all text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 border border-white/20 text-white/70 font-semibold px-5 py-3.5 rounded-xl hover:bg-white/8 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Right — growth ops visual */}
            <div className="hidden lg:block">
              <GrowthOpsVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — CONTACT METHODS ════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Multiple Ways to Connect</p>
            <h2 className="font-extrabold text-3xl text-navy">Choose How You Want to Connect</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_METHODS.map(m => (
              <a
                key={m.title}
                href={m.href}
                target={m.external ? '_blank' : undefined}
                rel={m.external ? 'noopener noreferrer' : undefined}
                className={`group block border ${m.border} bg-white rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-11 h-11 ${m.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <m.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-base mb-2">{m.title}</h3>
                <p className="text-[#7C7268] text-xs leading-relaxed mb-4">{m.desc}</p>
                <span className="text-saffron font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  {m.cta} <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — MAIN CONSULTATION ══════════════════════════════ */}
      <section id="form" className="bg-[#F7F5F0] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_520px] gap-14 items-start">

            {/* Left */}
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-4">Growth Consultation</p>
              <h2 className="font-extrabold text-3xl text-navy leading-tight mb-5">
                Talk to a Growth Systems Team —<br />Not Just Another Agency
              </h2>
              <p className="text-[#44403C] leading-relaxed mb-6">
                Scalify Labs works with businesses looking to improve lead generation, automation, CRM systems, SEO visibility, paid advertising performance, customer engagement, and conversion workflows.
              </p>
              <p className="text-[#44403C] leading-relaxed mb-8">
                Instead of disconnected services, we focus on building <strong>connected growth systems</strong> — where SEO, ads, CRM, WhatsApp, AI, and analytics work together.
              </p>

              {/* What we help with */}
              <div className="mb-8">
                <p className="font-mono text-xs text-navy uppercase tracking-wider mb-4 font-bold">What We Can Help With</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {HELP_ITEMS.map(item => (
                    <div key={item.label} className="flex items-center gap-2.5 bg-white border border-slate-100 rounded-xl px-3 py-2.5">
                      <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                      <span className="text-navy text-xs font-medium leading-snug">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder card */}
              <div className="relative bg-gradient-to-br from-[#0d1526] to-navy rounded-2xl p-6 border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,101,0,0.08),transparent_60%)]" />
                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 shadow-lg shadow-saffron/30 border-2 border-saffron/30">
                    <Image src="/founder.jpg" alt="Arvind Gupta" fill className="object-cover object-top" sizes="56px" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-white font-bold text-sm">Arvind Gupta</span>
                      <span className="bg-saffron text-white text-[0.58rem] font-bold px-2 py-0.5 rounded-full">Founder</span>
                      <span className="flex items-center gap-1 text-emerald-400 text-[0.62rem] font-mono ml-auto">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                        Available
                      </span>
                    </div>
                    <p className="text-saffron font-mono text-[0.65rem] mb-2">Founder, Scalify Labs</p>
                    <p className="text-white/55 text-xs leading-relaxed mb-2">
                      Works on growth systems combining automation, CRM, performance marketing, SEO, and AI-enabled business workflows.
                    </p>
                    <p className="text-white/35 text-[0.65rem] italic">
                      &quot;Focused on helping businesses build scalable digital growth systems.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-gradient-to-br from-[#0d1526] to-navy rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Form header */}
              <div className="px-7 pt-7 pb-5 border-b border-white/8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-saffron/15 rounded-xl flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-saffron" />
                  </div>
                  <h3 className="font-extrabold text-white text-xl">Book Free Growth Consultation</h3>
                </div>
                <p className="text-white/40 text-sm">Tell us about your business and growth goals.</p>
              </div>
              <div className="p-7">
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — WHY CHOOSE US ═══════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="font-extrabold text-3xl text-navy">Why Businesses Choose Scalify Labs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="group border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h3 className="font-bold text-navy text-base mb-1.5">{card.title}</h3>
                <p className="text-[#7C7268] text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — LOCATION & AVAILABILITY ═══════════════════════ */}
      <section className="bg-[#F7F5F0] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Map visual */}
            <div className="bg-navy rounded-2xl overflow-hidden border border-white/10 relative min-h-[320px] flex flex-col">
              {/* Stylized India map background */}
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 52% 55%, rgba(255,101,0,0.4) 0%, transparent 45%), radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '100% 100%, 28px 28px' }} />

              {/* City dots */}
              <div className="absolute inset-0">
                {[
                  { city: 'Ranchi', top: '54%', left: '52%', main: true },
                  { city: 'Delhi', top: '28%', left: '42%', main: false },
                  { city: 'Mumbai', top: '62%', left: '30%', main: false },
                  { city: 'Bangalore', top: '75%', left: '38%', main: false },
                  { city: 'Kolkata', top: '48%', left: '65%', main: false },
                  { city: 'Patna', top: '42%', left: '56%', main: false },
                  { city: 'Hyderabad', top: '68%', left: '42%', main: false },
                ].map(dot => (
                  <div key={dot.city} className="absolute" style={{ top: dot.top, left: dot.left }}>
                    <div className={`${dot.main ? 'w-4 h-4 bg-saffron shadow-[0_0_12px_rgba(255,101,0,0.8)] animate-pulse' : 'w-2 h-2 bg-white/50'} rounded-full`} />
                    {dot.main && <p className="text-saffron text-[0.6rem] font-bold mt-1 whitespace-nowrap">📍 Ranchi HQ</p>}
                  </div>
                ))}
              </div>

              <div className="relative z-10 p-6 mt-auto">
                <p className="text-white/30 font-mono text-[0.62rem] uppercase tracking-widest mb-1">Coverage</p>
                <p className="text-white font-bold text-lg">Pan India Growth Systems</p>
                <p className="text-white/50 text-sm">All services delivered remotely. No geographic limits.</p>
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7">
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-6">Get In Touch</p>

              <div className="space-y-5 mb-8">
                {[
                  { icon: MapPin, label: 'Office Location', value: 'Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu, Ranchi 835222', color: 'bg-red-50 text-red-600' },
                  { icon: PhoneCall, label: 'Phone / WhatsApp', value: SITE.phone, color: 'bg-emerald-50 text-emerald-600', href: `tel:${SITE.phone}` },
                  { icon: Mail, label: 'Email Address', value: SITE.email, color: 'bg-blue-50 text-blue-600', href: `mailto:${SITE.email}` },
                  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat | 10:00 AM – 7:00 PM IST', color: 'bg-amber-50 text-amber-600' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <item.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="text-[#7C7268] font-mono text-[0.62rem] uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-navy text-sm hover:text-saffron transition-colors">{item.value}</a>
                      ) : (
                        <p className="font-semibold text-navy text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-navy rounded-xl p-4">
                <p className="text-white/50 text-xs mb-3">Quick Connect</p>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/918788424727`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#1fa855] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-white/15 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call Now
                  </a>
                  <a
                    href="#form"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-saffron text-white font-bold py-2.5 rounded-lg text-xs hover:bg-saffron-dark transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — FAQ ═════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Quick Answers</p>
            <h2 className="font-extrabold text-3xl text-navy">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-navy text-sm leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-saffron shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[#7C7268] text-sm leading-relaxed border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — FINAL CTA ════════════════════════════════════════ */}
      <section className="relative bg-navy py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,101,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgba(59,130,246,0.07),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        {[
          'top-10 left-[7%]', 'top-16 right-[10%]', 'bottom-14 left-[18%]', 'bottom-20 right-[7%]'
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-saffron/30 blur-sm`} />
        ))}

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
            <Rocket className="w-3.5 h-3.5" />
            Let&apos;s Get Started
          </span>

          <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-5">
            Ready to Build a Smarter<br />
            <span className="text-saffron">Growth System?</span>
          </h2>

          <p className="text-white/55 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From lead generation to CRM automation and revenue workflows — Scalify Labs helps businesses connect marketing, automation, and growth into one scalable system.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#form"
              className="flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(255,101,0,0.38)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Free Strategy Call
            </a>
            <a
              href={`https://wa.me/918788424727?text=Hi%2C%20I%27d%20like%20to%20build%20a%20growth%20system%20for%20my%20business`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-7 py-4 rounded-xl hover:bg-[#25D366]/22 transition-all text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
