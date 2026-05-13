'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/lib/actions'
import {
  CheckCircle2, ArrowRight, PhoneCall, MessageSquare, Rocket,
  TrendingUp, Database, BrainCircuit, Search, BarChart3,
  Globe, Zap, GitBranch, Layers, Shield, Lightbulb,
  ChevronDown, AlertCircle, Loader2, Users,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Target, RefreshCw,
} from 'lucide-react'

// ─── ECOSYSTEM SVG ─────────────────────────────────────────────────────────────

function EcosystemSVG() {
  const cx = 250, cy = 250, r = 172
  const nodes = [
    { label: 'Website', angle: -90, color: '#3B82F6', fill: 'rgba(59,130,246,0.15)', stroke: 'rgba(59,130,246,0.8)' },
    { label: 'Google Ads', angle: -45, color: '#FBBF24', fill: 'rgba(251,191,36,0.15)', stroke: 'rgba(251,191,36,0.8)' },
    { label: 'Meta Ads', angle: 0, color: '#8B5CF6', fill: 'rgba(139,92,246,0.15)', stroke: 'rgba(139,92,246,0.8)' },
    { label: 'SEO', angle: 45, color: '#10B981', fill: 'rgba(16,185,129,0.15)', stroke: 'rgba(16,185,129,0.8)' },
    { label: 'WhatsApp', angle: 90, color: '#25D366', fill: 'rgba(37,211,102,0.15)', stroke: 'rgba(37,211,102,0.8)' },
    { label: 'CRM', angle: 135, color: '#FF6500', fill: 'rgba(255,101,0,0.15)', stroke: 'rgba(255,101,0,0.8)' },
    { label: 'Analytics', angle: 180, color: '#06B6D4', fill: 'rgba(6,182,212,0.15)', stroke: 'rgba(6,182,212,0.8)' },
    { label: 'Landing\nPages', angle: -135, color: '#EC4899', fill: 'rgba(236,72,153,0.15)', stroke: 'rgba(236,72,153,0.8)' },
  ].map(n => {
    const rad = (n.angle * Math.PI) / 180
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  })

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full" aria-hidden>
      <defs>
        <filter id="ecoglow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hubglow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6500" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6500" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={220} fill="url(#hubGrad)" />
      {nodes.map((n, i) => (
        <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke={n.color} strokeWidth="1.2" opacity="0.4" strokeDasharray="5 4" />
      ))}
      {/* Pulse dots on lines */}
      {nodes.map((n, i) => (
        <circle key={i} cx={cx + (n.x - cx) * 0.52} cy={cy + (n.y - cy) * 0.52}
          r="3.5" fill={n.color} opacity="0.9" />
      ))}
      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <g key={i} filter="url(#ecoglow)">
          <circle cx={n.x} cy={n.y} r={32} fill={n.fill} stroke={n.stroke} strokeWidth="1.2" />
          {n.label.split('\n').map((line, li, arr) => (
            <text key={li} x={n.x} y={n.y + (arr.length === 1 ? 4 : li === 0 ? -3 : 10)}
              textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="system-ui">
              {line}
            </text>
          ))}
        </g>
      ))}
      {/* Center hub */}
      <circle cx={cx} cy={cy} r={62} fill="rgba(11,15,30,0.95)" stroke="rgba(255,101,0,0.6)" strokeWidth="1.5" filter="url(#hubglow)" />
      <circle cx={cx} cy={cy} r={50} fill="rgba(255,101,0,0.08)" stroke="rgba(255,101,0,0.3)" strokeWidth="1" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#FF6500" fontSize="9.5" fontWeight="800" letterSpacing="1" fontFamily="system-ui">REVENUE</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="white" fontSize="9.5" fontWeight="700" fontFamily="system-ui">HUB</text>
    </svg>
  )
}

// ─── HERO VISUAL ──────────────────────────────────────────────────────────────

function HeroVisual() {
  const EVENTS = [
    { icon: '🟢', text: 'Lead Captured', sub: 'Google Ads → CRM', pos: 'top-4 right-4' },
    { icon: '💬', text: 'WhatsApp Triggered', sub: '43s response time', pos: 'top-24 right-2' },
    { icon: '📊', text: 'CRM Updated', sub: 'Pipeline: Qualified', pos: 'bottom-24 right-4' },
    { icon: '📈', text: 'Revenue +28%', sub: 'vs last month', pos: 'top-4 left-4' },
    { icon: '⚡', text: 'Campaign Optimized', sub: 'ROAS improved', pos: 'bottom-4 left-4' },
  ]
  return (
    <div className="relative h-[500px]">
      <div className="absolute inset-4 bg-gradient-to-br from-[#0d1526] to-navy rounded-3xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <EcosystemSVG />
        </div>
      </div>
      {/* Floating event cards */}
      {EVENTS.map(ev => (
        <div key={ev.text} className={`absolute ${ev.pos} bg-navy/90 backdrop-blur-sm border border-white/15 rounded-xl px-3 py-2 shadow-xl z-10`}>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{ev.icon}</span>
            <div>
              <p className="text-white font-bold text-[0.65rem] leading-tight">{ev.text}</p>
              <p className="text-white/40 font-mono text-[0.55rem]">{ev.sub}</p>
            </div>
          </div>
        </div>
      ))}
      {/* Live badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 font-mono text-[0.62rem] px-3 py-1 rounded-full flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
        Connected Growth Infrastructure · Live
      </div>
    </div>
  )
}

// ─── CONSULTATION FORM ─────────────────────────────────────────────────────────

function ConsultationForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', city: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitLead({ ...form, source: 'lead-to-revenue-system-page', service_interest: 'Lead to Revenue Growth System' })
      setStatus('success')
    } catch { setStatus('error') }
  }

  const ic = 'w-full bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/60 transition-all'

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-bold text-white text-xl mb-2">Consultation Request Received!</h3>
        <p className="text-white/50 text-sm max-w-xs mx-auto">Our growth team will contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5">Full Name *</label>
          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={ic} /></div>
        <div><label className="block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5">Phone *</label>
          <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" type="tel" className={ic} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5">Business Email</label>
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className={ic} /></div>
        <div><label className="block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5">Business Name</label>
          <input value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))} placeholder="Your company" className={ic} /></div>
      </div>
      <div><label className="block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5">City</label>
        <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Ranchi, Delhi, Mumbai…" className={ic} /></div>
      <div><label className="block text-white/50 font-mono text-[0.62rem] uppercase tracking-wider mb-1.5">Current Challenge / Goals</label>
        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={3} placeholder="Tell us about your lead generation and revenue goals…" className={`${ic} resize-none`} /></div>
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/20 text-red-400 text-xs p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" /> Something went wrong. Please WhatsApp us directly.
        </div>
      )}
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,101,0,0.50)] hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60">
        {status === 'loading'
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
          : <><Rocket className="w-4 h-4" /> Book Growth Consultation</>
        }
      </button>
      <p className="text-white/25 text-[0.65rem] text-center font-mono">Free consultation · No obligation · Response within 24 hrs</p>
    </form>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const INCLUDED = [
  { icon: TrendingUp, title: 'Performance Marketing', desc: 'Google Ads, Meta Ads, YouTube, remarketing — multi-channel paid growth managed end-to-end.', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
  { icon: Search, title: 'SEO & Organic Growth', desc: 'Technical SEO, content strategy, local SEO, and visibility systems for sustainable traffic.', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  { icon: Database, title: 'CRM & Lead Management', desc: 'Lead pipelines, automated assignment, follow-up workflows, and sales visibility systems.', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-100' },
  { icon: MessageSquare, title: 'WhatsApp Automation', desc: 'Instant lead engagement, nurture sequences, and automated follow-up via WhatsApp Business API.', color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
  { icon: Globe, title: 'Website & Landing Pages', desc: 'Conversion-focused pages, lead capture systems, and funnel infrastructure.', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-100' },
  { icon: GitBranch, title: 'Lead Nurturing Workflows', desc: 'Multi-step automated engagement journeys that keep prospects moving toward conversion.', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
  { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Performance dashboards, revenue tracking, channel attribution, and weekly reporting.', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
  { icon: Target, title: 'Sales Process Optimization', desc: 'Better lead handling, response automation, and conversion system improvements.', color: 'text-pink-600', bg: 'bg-pink-50 border-pink-100' },
]

const FLOW_STEPS = [
  { step: '01', label: 'SEO · Ads · Social · Campaigns', sub: 'Multi-channel traffic generation', color: 'border-blue-400/40 bg-blue-400/8 text-blue-300' },
  { step: '02', label: 'Website & Landing Pages', sub: 'Optimized conversion layer', color: 'border-cyan-400/40 bg-cyan-400/8 text-cyan-300' },
  { step: '03', label: 'Lead Capture', sub: 'Forms · Chatbots · WhatsApp', color: 'border-violet-400/40 bg-violet-400/8 text-violet-300' },
  { step: '04', label: 'CRM Assignment', sub: 'Instant automated routing', color: 'border-emerald-400/40 bg-emerald-400/8 text-emerald-300' },
  { step: '05', label: 'WhatsApp & Automation', sub: 'Instant engagement triggered', color: 'border-green-400/40 bg-green-400/8 text-green-300' },
  { step: '06', label: 'Lead Nurturing', sub: 'Multi-step engagement sequences', color: 'border-amber-400/40 bg-amber-400/8 text-amber-300' },
  { step: '07', label: 'Sales Follow-Up', sub: 'CRM alerts · Calls · Proposals', color: 'border-saffron/40 bg-saffron/8 text-saffron' },
  { step: '08', label: 'Revenue Tracking', sub: 'ROI · Attribution · Reports', color: 'border-pink-400/40 bg-pink-400/8 text-pink-300' },
]

const WHY_FEATURES = [
  { icon: BarChart3, text: 'Better lead visibility across all channels' },
  { icon: Zap, text: 'Faster 60-second response systems' },
  { icon: TrendingUp, text: 'Higher conversion through optimized journeys' },
  { icon: RefreshCw, text: 'Automated engagement — no manual work' },
  { icon: Database, text: 'Unified customer data across tools' },
  { icon: Users, text: 'Better sales team coordination' },
  { icon: Target, text: 'Revenue-focused growth optimization' },
  { icon: Layers, text: 'Scalable connected infrastructure' },
]

const INDUSTRIES = [
  { icon: HeartPulse, name: 'Clinics & Healthcare', color: 'bg-red-100 text-red-600' },
  { icon: GraduationCap, name: 'Education Companies', color: 'bg-blue-100 text-blue-600' },
  { icon: Building2, name: 'Real Estate Businesses', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Layers, name: 'Multi-Location Brands', color: 'bg-violet-100 text-violet-600' },
  { icon: Globe, name: 'Service Businesses', color: 'bg-amber-100 text-amber-600' },
  { icon: ShoppingBag, name: 'Ecommerce Brands', color: 'bg-pink-100 text-pink-600' },
  { icon: TrendingUp, name: 'High-Lead Businesses', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Users, name: 'Growing SMBs', color: 'bg-sky-100 text-sky-600' },
]

const WHY_CARDS = [
  { icon: Layers, title: 'Connected Growth Systems', desc: 'Marketing, CRM, automation, and engagement working together as one infrastructure.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Zap, title: 'Automation-First Execution', desc: 'Reduce manual operations through scalable workflows and smart automation triggers.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Lightbulb, title: 'Business-Focused Strategy', desc: 'Every recommendation is focused on measurable outcomes — leads, conversions, revenue.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: BrainCircuit, title: 'AI-Enabled Infrastructure', desc: 'Modern systems powered by automation, AI scoring, and intelligent workflows.', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: Shield, title: 'Multi-Channel Expertise', desc: 'SEO, ads, CRM, WhatsApp, automation, and analytics across the full growth stack.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Target, title: 'Revenue-Driven Strategy', desc: 'Performance tracked from traffic to revenue — not just vanity metrics and impressions.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
]

const FAQS = [
  { q: 'Is this a marketing agency service?', a: 'Lead to Revenue is more than an agency service — it\'s a complete growth infrastructure system where Scalify Labs becomes your outsourced revenue growth team. We connect marketing, automation, CRM, and analytics into one managed system.' },
  { q: 'What platforms and tools are included?', a: 'Google Ads, Meta Ads, SEO tools, CRM platforms (Kylas, Zoho, TeleCRM), WhatsApp Business API, Google Analytics 4, landing page builders, email marketing tools, and automation platforms — all connected and managed.' },
  { q: 'Is CRM setup and management included?', a: 'Yes. CRM setup, lead pipeline configuration, automation workflows, team training, and ongoing management are all part of the Lead to Revenue system.' },
  { q: 'Can existing tools and systems be connected?', a: 'Absolutely. We audit your existing tools first and integrate them into the unified growth infrastructure wherever possible — minimizing disruption and maximizing ROI on existing investments.' },
  { q: 'Is ad spend included in the ₹75,000/month?', a: 'No — ad spend is billed separately directly to the platforms (Google, Meta, etc.). The ₹75,000/month covers management, strategy, execution, CRM, automation, SEO, and reporting.' },
  { q: 'Which businesses benefit most from this system?', a: 'Businesses generating 50+ leads per month who struggle with conversion, businesses spending ₹1L+ monthly on ads without clear ROI visibility, multi-location businesses with complex lead flows, and service businesses that need scalable follow-up systems.' },
  { q: 'Can workflows be customized for our industry?', a: 'Yes. Every Lead to Revenue implementation is custom-built for your industry, lead flow, team structure, and sales process. We don\'t use templates — we build systems.' },
  { q: 'How is performance tracked and reported?', a: 'Weekly performance reports covering all channels, monthly growth review calls, real-time dashboards, lead attribution from source to closed deal, and revenue tracking across all active channels.' },
]

const TEAM_FUNCTIONS = [
  { title: 'Growth Strategy', desc: 'CMO-level direction', icon: Lightbulb, color: 'text-saffron' },
  { title: 'Performance Marketing', desc: 'Ads management', icon: TrendingUp, color: 'text-blue-400' },
  { title: 'SEO & Content', desc: 'Organic growth', icon: Search, color: 'text-emerald-400' },
  { title: 'CRM & Automation', desc: 'Lead systems', icon: Database, color: 'text-violet-400' },
  { title: 'Analytics', desc: 'Revenue tracking', icon: BarChart3, color: 'text-amber-400' },
]

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function LeadToRevenuePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════════ */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(255,101,0,0.09),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,rgba(59,130,246,0.07),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                Growth Infrastructure System
              </span>

              <h1 className="font-extrabold text-4xl lg:text-[3rem] text-white leading-tight tracking-tight mb-5">
                From Leads to Revenue —<br />
                <span className="text-saffron">A Connected Growth System</span><br />
                for Scaling Businesses
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-[520px]">
                Scalify Labs connects your website, ads, SEO, CRM, WhatsApp, automation, lead nurturing, and analytics into one integrated growth infrastructure focused on lead conversion and revenue growth.
              </p>

              <p className="text-white/35 text-sm font-mono mb-8 italic">
                More than an agency. Your outsourced growth and revenue team.
              </p>

              {/* Pricing callout */}
              <div className="bg-white/5 border border-white/12 rounded-2xl p-5 mb-8 inline-flex items-center gap-5 flex-wrap">
                <div>
                  <div className="text-white/35 font-mono text-[0.62rem] uppercase tracking-widest">Monthly Retainer</div>
                  <div className="text-white font-extrabold text-3xl">₹75,000<span className="text-white/40 text-lg font-semibold">/month</span></div>
                </div>
                <div className="h-10 w-px bg-white/10 hidden sm:block" />
                <p className="text-white/40 text-xs max-w-[200px] leading-snug">Best suited for businesses serious about scaling operations and revenue growth.</p>
              </div>

              {/* Trust points */}
              <div className="flex flex-wrap gap-3 mb-8">
                {['Multi-Channel Lead Generation','CRM & Automation Systems','SEO & Paid Growth','WhatsApp Engagement','Lead Nurturing Workflows','Revenue Tracking'].map(t => (
                  <div key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span className="text-white/50 text-xs font-mono">{t}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#consult"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm">
                  <PhoneCall className="w-4 h-4" /> Book Growth Consultation
                </a>
                <a href="#included"
                  className="flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/8 transition-all text-sm">
                  Build My System <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right — Ecosystem Visual */}
            <div className="hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — PROBLEM ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">The Core Problem</p>
            <h2 className="font-extrabold text-4xl text-navy">Most Businesses Run Disconnected<br />Growth Systems</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">✗</div>
                <span className="font-bold text-red-700 uppercase tracking-wide text-sm">Disconnected Business</span>
              </div>
              <div className="space-y-3.5">
                {['Ads not connected to CRM — leads lost in transit','Manual follow-ups — slow response, cold leads','Scattered customer data across 5+ tools','No nurturing — prospects go cold unattended','No conversion tracking — no visibility on ROI','Disconnected teams — marketing vs sales gap'].map(p => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-500 text-xs">✗</span>
                    </div>
                    <p className="text-slate-600 text-sm">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                <span className="font-bold text-emerald-700 uppercase tracking-wide text-sm">Lead to Revenue System</span>
              </div>
              <div className="space-y-3.5">
                {['Connected lead flow — every inquiry captured automatically','Automated nurturing — 60-sec WhatsApp response on leads','Centralized CRM — one source of truth for all prospects','Multi-channel engagement — prospects stay warm through sequences','Full performance visibility — ROI tracked from source to sale','Revenue-focused optimization — every team aligned on growth'].map(p => (
                  <div key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm font-medium">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — WHAT IS L2R ════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Journey flow visual */}
            <div className="bg-navy rounded-3xl p-8 border border-white/10">
              <p className="text-white/30 font-mono text-[0.62rem] uppercase tracking-widest mb-6">Customer Journey</p>
              <div className="space-y-3">
                {[
                  { label: 'Traffic', sub: 'SEO · Ads · Social', color: 'bg-blue-400' },
                  { label: 'Lead Capture', sub: 'Website · WhatsApp · Forms', color: 'bg-violet-400' },
                  { label: 'CRM', sub: 'Auto-assign · Pipeline', color: 'bg-amber-400' },
                  { label: 'WhatsApp', sub: 'Instant engagement', color: 'bg-green-400' },
                  { label: 'Nurturing', sub: 'Sequences · Email · Calls', color: 'bg-orange-400' },
                  { label: 'Sales', sub: 'Qualified → Closed', color: 'bg-saffron' },
                  { label: 'Revenue Tracking', sub: 'Attribution · Reports', color: 'bg-emerald-400' },
                ].map((s, i, arr) => (
                  <div key={s.label}>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0`} />
                      <div>
                        <span className="text-white font-bold text-sm">{s.label}</span>
                        <span className="text-white/40 text-xs ml-2 font-mono">{s.sub}</span>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="flex justify-center py-1"><div className={`w-0.5 h-4 bg-gradient-to-b from-${s.color.replace('bg-', '')} to-transparent opacity-50`} /></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-4">System Overview</p>
              <h2 className="font-extrabold text-3xl text-navy leading-tight mb-5">What is the Lead to Revenue System?</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Lead to Revenue is a connected growth infrastructure designed to help businesses generate leads, organize inquiries, automate engagement, nurture prospects, improve conversions, track sales performance, and optimize customer journeys.
              </p>
              <p className="text-slate-600 leading-relaxed mb-7">
                Instead of managing separate tools and vendors for ads, SEO, CRM, WhatsApp, and analytics, Scalify Labs creates one unified growth ecosystem — where every channel and tool works in sync.
              </p>
              <div className="space-y-2.5">
                {['Generate high-quality leads across multiple channels','Organize all inquiries automatically into one CRM','Automate engagement within 60 seconds of lead capture','Nurture prospects through multi-channel sequences','Improve conversion with optimized sales workflows','Track revenue attribution from source to closed deal'].map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
                    <span className="text-slate-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — WHAT'S INCLUDED ════════════════════════════════════════ */}
      <section id="included" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Full Ecosystem</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Everything Connected Into<br />One Growth System</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Eight fully managed modules working as one connected revenue engine.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INCLUDED.map(item => (
              <div key={item.title} className={`group border ${item.bg} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                <div className={`w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="font-bold text-navy text-base mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — HOW IT WORKS ═══════════════════════════════════════════ */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">The Engine</p>
            <h2 className="font-extrabold text-4xl text-white">A Connected Growth Engine</h2>
          </div>
          <div className="space-y-3">
            {FLOW_STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4 group">
                <div className={`w-10 h-10 rounded-xl border ${s.color} flex items-center justify-center shrink-0 font-mono font-bold text-sm group-hover:scale-110 transition-transform`}>
                  {s.step}
                </div>
                <div className={`flex-1 border ${s.color} rounded-2xl px-5 py-3 group-hover:shadow-md transition-all`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-white text-sm">{s.label}</span>
                    <span className="text-white/40 font-mono text-[0.62rem]">{s.sub}</span>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && <ArrowRight className="w-4 h-4 text-white/20 shrink-0 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — MULTI-CHANNEL ══════════════════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Omnichannel Engagement</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Multi-Channel Customer Engagement</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Customers interact across multiple touchpoints. Scalify Labs connects all channels into one seamless customer journey.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Paid Ads', color: 'from-blue-500 to-blue-600', icon: TrendingUp },
              { label: 'SEO', color: 'from-emerald-500 to-emerald-600', icon: Search },
              { label: 'WhatsApp', color: 'from-green-500 to-green-600', icon: MessageSquare },
              { label: 'Email', color: 'from-violet-500 to-violet-600', icon: Target },
              { label: 'CRM', color: 'from-amber-500 to-amber-600', icon: Database },
              { label: 'Voice Calls', color: 'from-pink-500 to-pink-600', icon: PhoneCall },
              { label: 'Automation', color: 'from-indigo-500 to-indigo-600', icon: Zap },
              { label: 'Landing Pages', color: 'from-cyan-500 to-cyan-600', icon: Globe },
              { label: 'Analytics', color: 'from-rose-500 to-rose-600', icon: BarChart3 },
              { label: 'RCS Messaging', color: 'from-saffron to-orange-500', icon: Layers },
            ].map(ch => (
              <div key={ch.label} className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <ch.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-navy text-xs">{ch.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — WHY BUSINESSES NEED THIS ══════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Business Impact</p>
            <h2 className="font-extrabold text-4xl text-navy">Why Businesses Move Beyond<br />Traditional Agencies</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_FEATURES.map(f => (
              <div key={f.text} className="flex items-center gap-3 bg-[#F5F7FB] border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
                <div className="w-9 h-9 bg-navy/8 rounded-xl flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-saffron" />
                </div>
                <p className="text-navy font-medium text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — OUTSOURCED GROWTH TEAM ════════════════════════════════ */}
      <section className="bg-navy py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_440px] gap-12 items-center">
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-4">CMO-as-a-Service</p>
              <h2 className="font-extrabold text-4xl text-white mb-5">Like Having a Digital Growth &amp;<br />Revenue Team for Your Business</h2>
              <p className="text-white/60 leading-relaxed mb-5">
                Instead of hiring separate agencies, CRM consultants, automation specialists, SEO teams, ad managers, and analytics experts — Scalify Labs manages everything through one connected growth system.
              </p>
              <p className="text-saffron font-semibold text-base mb-7">
                CMO-style growth infrastructure for modern businesses.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#consult"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_14px_rgba(255,101,0,0.30)] hover:bg-saffron-dark transition-all text-sm">
                  Start the Conversation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Growth Team Visual */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white/40 font-mono text-[0.62rem] uppercase tracking-widest">Growth Operations Center</p>
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[0.62rem]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />Active
                </span>
              </div>
              <div className="space-y-3">
                {TEAM_FUNCTIONS.map(fn => (
                  <div key={fn.title} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-3">
                    <div className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center shrink-0">
                      <fn.icon className={`w-4 h-4 ${fn.color}`} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{fn.title}</p>
                      <p className="text-white/40 text-[0.62rem] font-mono">{fn.desc}</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 pt-5 border-t border-white/8">
                {[{ v: '8', l: 'Systems Active' }, { v: '24/7', l: 'Automation' }, { v: '₹75K', l: 'Monthly' }].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="text-white font-extrabold text-xl">{s.v}</div>
                    <div className="text-white/30 font-mono text-[0.58rem]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — WHO THIS IS FOR ════════════════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Ideal Fit</p>
            <h2 className="font-extrabold text-4xl text-navy">Best Suited For Businesses<br />Ready to Scale</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group text-center">
                <div className={`w-12 h-12 ${ind.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <ind.icon className="w-5.5 h-5.5 w-[22px] h-[22px]" />
                </div>
                <p className="font-semibold text-navy text-sm">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 10 — PRICING ═══════════════════════════════════════════════ */}
      <section className="relative bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,101,0,0.07),transparent_60%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Investment</p>
          <h2 className="font-extrabold text-4xl text-white mb-10">Lead to Revenue Growth System</h2>

          <div className="bg-gradient-to-b from-white/8 to-white/4 border border-saffron/40 rounded-3xl p-10 shadow-[0_0_60px_rgba(255,101,0,0.12)]">
            <div className="inline-flex items-center gap-2 bg-saffron text-white font-bold text-sm px-4 py-1.5 rounded-full mb-6">
              <Rocket className="w-3.5 h-3.5" /> Full Growth System — Monthly Retainer
            </div>

            <div className="mb-8">
              <div className="text-white font-extrabold text-6xl leading-none mb-2">₹75,000</div>
              <div className="text-white/40 font-mono text-sm">/month · Minimum 3-month engagement</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left">
              {['Multi-Channel Growth Management','CRM & Lead Management','SEO & Organic Growth','Paid Ads Management','WhatsApp Automation','Lead Nurturing Systems','Analytics & Reporting','Growth Strategy Support'].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
                  <span className="text-white/80 text-sm">{f}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 space-y-1.5 text-left">
              <p className="text-white/35 text-xs font-mono uppercase tracking-wider mb-2">Additional Costs (Billed Separately)</p>
              {['Ad spend — billed directly to platforms (Google, Meta, etc.)','CRM / platform subscriptions — based on selected tools','Custom workflow development — quoted separately if required'].map(n => (
                <p key={n} className="text-white/40 text-xs flex items-start gap-2"><span className="text-white/20">·</span>{n}</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#consult"
                className="flex items-center justify-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm">
                <PhoneCall className="w-4 h-4" /> Book Growth Consultation
              </a>
              <a href="#consult"
                className="flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl hover:bg-white/8 transition-all text-sm">
                Build My System <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 11 — WHY SCALIFY LABS ═════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Our Advantage</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 max-w-lg mx-auto">We connect marketing, automation, and sales into one growth ecosystem — not a collection of isolated services.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="group border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h3 className="font-bold text-navy text-base mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 12 — FAQ ════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="font-extrabold text-3xl text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-navy text-sm leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-saffron shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 13 — FINAL CTA + FORM ════════════════════════════════════ */}
      <section id="consult" className="relative bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(255,101,0,0.09),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_520px] gap-14 items-start">
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                <Rocket className="w-3.5 h-3.5" /> Start Building Your System
              </span>
              <h2 className="font-extrabold text-4xl text-white leading-tight mb-5">
                Build a Connected Growth System<br />
                <span className="text-saffron">That Turns Leads Into Revenue</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-[480px]">
                Unify marketing, CRM, automation, nurturing, analytics, and sales workflows into one scalable revenue-focused growth infrastructure.
              </p>
              <div className="space-y-3 mb-8">
                {['Full system strategy and architecture designed for your business','All channels — ads, SEO, CRM, WhatsApp — connected and managed','Weekly reporting + monthly growth review calls','Dedicated growth team — not a ticket queue'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
                    <span className="text-white/70 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={`https://wa.me/918788424727?text=Hi%2C%20I%27d%20like%20to%20build%20a%20Lead%20to%20Revenue%20system`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-5 py-3 rounded-xl hover:bg-[#25D366]/22 transition-all text-sm">
                  <MessageSquare className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/5 border border-white/12 rounded-3xl overflow-hidden">
              <div className="px-7 pt-7 pb-5 border-b border-white/8">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-saffron/15 rounded-xl flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-saffron" />
                  </div>
                  <h3 className="font-extrabold text-white text-xl">Book Growth Consultation</h3>
                </div>
                <p className="text-white/40 text-sm">Tell us about your business and revenue goals.</p>
              </div>
              <div className="p-7"><ConsultationForm /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
