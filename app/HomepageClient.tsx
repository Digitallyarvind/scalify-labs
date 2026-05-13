'use client'

import Link from 'next/link'
import {
  ArrowRight, PhoneCall, CheckCircle2, TrendingUp, Search, Database,
  BrainCircuit, MessageSquare, BarChart3, Globe, Zap, Rocket,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Users, Layers,
  GitBranch, Shield, Lightbulb, RefreshCw, Settings2, Target,
  Monitor, Smartphone, PhoneIncoming, Mail, Star, Award,
} from 'lucide-react'

// ─── HERO DASHBOARD VISUAL ────────────────────────────────────────────────────

function SparkLine({ color = '#10B981' }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 36" className="w-full h-9">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="0,32 12,28 28,25 44,22 60,17 76,13 92,9 108,6 120,3 120,36 0,36"
        fill={`url(#sg-${color.replace('#', '')})`} />
      <polyline points="0,32 12,28 28,25 44,22 60,17 76,13 92,9 108,6 120,3"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DonutChart() {
  return (
    <div className="relative w-16 h-16 mx-auto">
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'conic-gradient(#3B82F6 0% 45%, #10B981 45% 75%, #25D366 75% 90%, #64748B 90% 100%)' }} />
      <div className="absolute inset-[22%] rounded-full bg-[#0d1526]" />
    </div>
  )
}

function HeroDashboard() {
  return (
    <div className="relative select-none">
      {/* Main container */}
      <div className="bg-gradient-to-br from-[#0d1526] via-[#0f1a2e] to-navy rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex-1 bg-white/5 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/30 font-mono text-[0.6rem]">dashboard.scalifylabs.com</span>
          </div>
          <span className="text-white/20 text-xs">⚙</span>
        </div>

        <div className="p-4 space-y-3">
          {/* Row 1: Revenue + Channels */}
          <div className="grid grid-cols-2 gap-3">
            {/* Revenue Overview */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
              <p className="text-white/40 font-mono text-[0.6rem] uppercase tracking-wide mb-1">Revenue Overview</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-white font-extrabold text-xl leading-none">₹2.45 Cr</span>
              </div>
              <span className="text-emerald-400 font-mono text-[0.65rem]">+32.6% vs last month</span>
              <SparkLine color="#10B981" />
            </div>

            {/* Top Channels */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
              <p className="text-white/40 font-mono text-[0.6rem] uppercase tracking-wide mb-2">Top Channels</p>
              <DonutChart />
              <div className="mt-2 space-y-0.5">
                {[
                  { label: 'Paid Ads', pct: '45%', color: 'bg-blue-500' },
                  { label: 'SEO', pct: '30%', color: 'bg-emerald-500' },
                  { label: 'WhatsApp', pct: '15%', color: 'bg-green-400' },
                  { label: 'Direct', pct: '10%', color: 'bg-slate-500' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.color} shrink-0`} />
                    <span className="text-white/50 text-[0.58rem] flex-1">{c.label}</span>
                    <span className="text-white/60 text-[0.58rem] font-mono">{c.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Leads Funnel */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
            <p className="text-white/40 font-mono text-[0.6rem] uppercase tracking-wide mb-2">Leads Funnel</p>
            <div className="flex gap-4">
              {/* Visual funnel */}
              <div className="flex flex-col items-center gap-1 w-12">
                {[100, 78, 52, 18].map((w, i) => (
                  <div key={i} className="h-3 rounded-sm" style={{ width: `${w}%`, background: `rgba(59,130,246,${0.9 - i * 0.2})` }} />
                ))}
              </div>
              {/* Stats */}
              <div className="flex-1 space-y-1">
                {[
                  { label: 'Visitors', value: '25,140', color: 'text-blue-400' },
                  { label: 'Leads', value: '4,428', color: 'text-violet-400' },
                  { label: 'Qualified', value: '1,265', color: 'text-amber-400' },
                  { label: 'Customers', value: '312', color: 'text-emerald-400' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-white/40 text-[0.6rem]">{s.label}</span>
                    <span className={`font-mono font-bold text-[0.65rem] ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Campaign + WhatsApp */}
          <div className="grid grid-cols-[1fr_auto] gap-3">
            {/* Campaign Performance */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
              <p className="text-white/40 font-mono text-[0.6rem] uppercase tracking-wide mb-2">Campaign Performance</p>
              {[
                { channel: 'Google Ads', roas: '4.2x ROAS', pct: 82, color: 'bg-blue-400', icon: 'G' },
                { channel: 'Meta Ads', roas: '3.8x ROAS', pct: 72, color: 'bg-violet-400', icon: 'M' },
                { channel: 'LinkedIn Ads', roas: '5.6x ROAS', pct: 95, color: 'bg-blue-300', icon: 'in' },
              ].map(c => (
                <div key={c.channel} className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-white text-[0.5rem] font-bold">{c.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-white/60 font-mono text-[0.58rem] whitespace-nowrap">{c.roas}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp Automation */}
            <div className="bg-[#075E54]/20 border border-[#25D366]/25 rounded-2xl p-4 w-[130px]">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageSquare className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-white/60 text-[0.6rem] font-mono">WhatsApp</span>
              </div>
              <p className="text-white/40 text-[0.58rem] mb-0.5">Active Workflows</p>
              <p className="text-white font-bold text-2xl mb-2">28</p>
              <p className="text-white/40 text-[0.58rem] mb-0.5">Messages Sent</p>
              <p className="text-[#25D366] font-bold text-sm">12.5K</p>
              <SparkLine color="#25D366" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 whitespace-nowrap flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
        Live Dashboard
      </div>
      <div className="absolute -bottom-3 -left-3 bg-navy border border-white/15 text-white text-[0.65rem] font-mono px-3 py-1.5 rounded-xl shadow-xl">
        ⚡ AI-Powered · Updated Live
      </div>
    </div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CLIENTS = ['Brands Outlet', 'Sri Sidhi Vinayak & Co', 'SD Plaso Fab', 'GC Ceramics', 'Dheya', 'City Health Guide', 'Lakshyarth', 'Career Bloom']

const PROBLEMS = [
  { icon: Search, title: 'Invisible on Google', desc: 'Competitors rank while your business gets ignored by potential customers.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: BarChart3, title: 'Ad Spend Without Clarity', desc: 'Campaigns running without measurable ROI — money spent but no clear results.', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Database, title: 'No Lead Management', desc: 'Leads scattered across WhatsApp groups, Excel sheets, and forgotten notes.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: RefreshCw, title: 'Weak Follow-Up Systems', desc: 'Potential customers lost after the first inquiry due to manual processes.', color: 'text-violet-500', bg: 'bg-violet-50' },
  { icon: Zap, title: 'No Automation', desc: 'Teams doing repetitive manual work daily instead of focusing on growth.', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: GitBranch, title: 'Disconnected Marketing', desc: 'SEO, ads, CRM, and sales all running separately — no connected system.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

const FLOW_STEPS = [
  { label: 'SEO · Ads · Social', sub: 'Traffic Generation', color: 'border-blue-500/40 bg-blue-500/8 text-blue-400' },
  { label: 'Website · Landing Pages', sub: 'Conversion Layer', color: 'border-violet-500/40 bg-violet-500/8 text-violet-400' },
  { label: 'Lead Capture', sub: 'Forms · Chatbots · WhatsApp', color: 'border-amber-500/40 bg-amber-500/8 text-amber-400' },
  { label: 'CRM Integration', sub: 'Pipeline Management', color: 'border-emerald-500/40 bg-emerald-500/8 text-emerald-400' },
  { label: 'WhatsApp · Automation', sub: 'Instant Follow-up', color: 'border-green-500/40 bg-green-500/8 text-green-400' },
  { label: 'Lead Nurturing', sub: 'Sequences · Retargeting', color: 'border-pink-500/40 bg-pink-500/8 text-pink-400' },
  { label: 'Sales Follow-Up', sub: 'CRM Alerts · Calls', color: 'border-saffron/40 bg-saffron/8 text-saffron' },
  { label: 'Revenue Tracking', sub: 'ROI · Analytics · Reports', color: 'border-emerald-400/40 bg-emerald-400/8 text-emerald-300' },
]

const CHANNELS = [
  { name: 'Google Ads', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Meta Ads', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { name: 'SEO', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'WhatsApp', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Email', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { name: 'OBD Calls', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'RCS Messaging', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { name: 'CRM Systems', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { name: 'AI Automation', color: 'bg-orange-50 text-orange-700 border-orange-200' },
]

const SERVICE_GROUPS = [
  {
    label: 'Visibility',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-100',
    dot: 'bg-blue-500',
    services: [
      { name: 'SEO Services', desc: 'Page-1 organic rankings', href: '/services/seo', icon: Search },
      { name: 'Local SEO & GMB', desc: 'Dominate Google Maps', href: '/services/gmb', icon: Star },
      { name: 'Google Ads', desc: 'Search & Display campaigns', href: '/services/google-ads', icon: TrendingUp },
      { name: 'Meta Ads', desc: 'Facebook & Instagram growth', href: '/services/meta-ads', icon: Target },
    ],
  },
  {
    label: 'Communication',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
    dot: 'bg-emerald-500',
    services: [
      { name: 'WhatsApp Marketing', desc: '98% open-rate automation', href: '/services/whatsapp-marketing', icon: MessageSquare },
      { name: 'RCS Messaging', desc: 'Rich media at scale', href: '/services/rcs-messaging', icon: Smartphone },
      { name: 'OBD Voice Calls', desc: 'Automated bulk calling', href: '/services/obd', icon: PhoneIncoming },
      { name: 'Email Marketing', desc: 'Nurture & conversion flows', href: '#', icon: Mail },
    ],
  },
  {
    label: 'Systems',
    color: 'text-violet-600',
    bg: 'bg-violet-50 border-violet-100',
    dot: 'bg-violet-500',
    services: [
      { name: 'CRM Automation', desc: 'Pipeline & workflow setup', href: '/services/lead-to-revenue', icon: Database },
      { name: 'AI Calling & Agents', desc: 'AI voice for lead follow-up', href: '/services/ai-calling', icon: BrainCircuit },
      { name: 'Lead Management', desc: 'Capture, nurture & convert', href: '/services/lead-to-revenue', icon: GitBranch },
      { name: 'Website Development', desc: 'Conversion-focused sites', href: '/services/website-development', icon: Monitor },
    ],
  },
]

const WHY_CARDS = [
  { icon: Target, title: 'ROI-Focused Execution', desc: 'Every campaign and system is built around measurable business growth — leads, revenue, and retention.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Database, title: 'CRM & Automation Expertise', desc: 'We build workflows that reduce manual dependency and improve customer engagement consistently.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: BrainCircuit, title: 'AI-Enabled Workflows', desc: 'Modern automation systems powered by AI — faster responses, smarter routing, and scalable processes.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Layers, title: 'Full-Stack Growth Thinking', desc: 'SEO, ads, CRM, automation, and analytics connected together — not managed as separate silos.', color: 'text-saffron', bg: 'bg-orange-50' },
  { icon: Lightbulb, title: 'Business-First Strategy', desc: 'Built around your revenue goals and lead generation priorities — not vanity metrics.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: BarChart3, title: 'Transparent Reporting', desc: 'Clear visibility into campaigns, pipelines, and performance — delivered weekly.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
]

const INDUSTRIES = [
  { icon: GraduationCap, name: 'Education & Institutes', desc: 'Admission funnels, lead nurturing, automation systems.', color: 'bg-blue-100 text-blue-600' },
  { icon: HeartPulse, name: 'Clinics & Healthcare', desc: 'Patient lead generation and CRM workflows.', color: 'bg-red-100 text-red-600' },
  { icon: Building2, name: 'Real Estate', desc: 'Project lead systems and nurturing automation.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: ShoppingBag, name: 'Local Businesses', desc: 'Local SEO, ads, WhatsApp engagement systems.', color: 'bg-amber-100 text-amber-600' },
  { icon: Globe, name: 'Ecommerce & Retail', desc: 'Performance campaigns and customer retention systems.', color: 'bg-violet-100 text-violet-600' },
  { icon: Users, name: 'Service Businesses', desc: 'Lead generation and scalable automation infrastructure.', color: 'bg-indigo-100 text-indigo-600' },
]

const CASES = [
  { brand: 'GC Ceramics', tag: 'Local Business', outcome: 'Built local visibility systems with Google and Meta lead generation campaigns.', metric: '3× Leads', color: 'border-amber-200 bg-amber-50' },
  { brand: 'Dheya', tag: 'Education', outcome: 'Growth-focused digital systems for career guidance and education outreach.', metric: '5000+ Students', color: 'border-blue-200 bg-blue-50' },
  { brand: 'Brands Outlet', tag: 'Retail', outcome: 'Performance campaigns and customer engagement workflows for fashion retail.', metric: '+42% Revenue', color: 'border-violet-200 bg-violet-50' },
  { brand: 'City Health Guide', tag: 'Healthcare', outcome: 'Healthcare-focused visibility and patient lead generation systems.', metric: '2× Appointments', color: 'border-emerald-200 bg-emerald-50' },
  { brand: 'Lakshyarth', tag: 'Education', outcome: 'Education marketing and lead nurturing automation for institute growth.', metric: '+60% Enquiries', color: 'border-indigo-200 bg-indigo-50' },
  { brand: 'Career Bloom', tag: 'Education', outcome: 'Digital visibility and admission-focused campaign support systems.', metric: '+80% Visibility', color: 'border-pink-200 bg-pink-50' },
]

const INSIGHTS_ARTICLES = [
  { title: 'AI Marketing Trends for Indian Businesses in 2025', category: 'AI Marketing', read: '6 min', gradient: 'from-pink-600 to-violet-600' },
  { title: 'WhatsApp Automation Playbook: From Leads to Revenue', category: 'WhatsApp Marketing', read: '8 min', gradient: 'from-green-600 to-emerald-600' },
  { title: 'Local SEO Checklist for Small Businesses in Jharkhand', category: 'SEO & Organic', read: '5 min', gradient: 'from-blue-600 to-indigo-600' },
  { title: 'CRM Setup Guide for Indian SMBs (Step-by-Step)', category: 'CRM & Automation', read: '10 min', gradient: 'from-amber-600 to-orange-600' },
]

const INSIDE_PANELS = [
  { label: 'Campaign Reviews', icon: BarChart3, color: 'text-blue-400', items: ['Google Ads ROAS: 4.2×', 'Meta CPL: ₹187', 'Quality Score: 9/10'] },
  { label: 'CRM Pipeline', icon: Database, color: 'text-emerald-400', items: ['New Leads: 48', 'Follow-ups Due: 12', 'Won This Week: 6'] },
  { label: 'AI Workflow', icon: BrainCircuit, color: 'text-violet-400', items: ['Automation Active: 28', 'Avg Response: 43s', 'Leads Qualified: 91%'] },
  { label: 'SEO Rankings', icon: TrendingUp, color: 'text-amber-400', items: ['Page 1 Keywords: 34', 'Organic Traffic: +38%', 'New Backlinks: 12'] },
  { label: 'Growth Planning', icon: Rocket, color: 'text-pink-400', items: ['Q2 Goal: ₹50L', 'Channels Active: 7', 'Markets: 3 cities'] },
  { label: 'Team Execution', icon: Users, color: 'text-sky-400', items: ['Sprints: On Track', 'Deliverables: 18/20', 'Client Calls: 6'] },
]

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function HomepageClient() {
  return (
    <>

      {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════════ */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(255,101,0,0.09),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,rgba(59,130,246,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.04),transparent_45%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_520px] gap-14 items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                AI-Powered Growth Infrastructure Company
              </span>

              <h1 className="font-extrabold text-4xl lg:text-[3.2rem] text-white leading-[1.15] tracking-tight mb-5">
                We Don&apos;t Just Run Ads.<br />
                <span className="text-saffron">We Build Growth Systems.</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-[520px]">
                Scalify Labs helps businesses connect SEO, paid ads, CRM, WhatsApp automation, AI workflows, websites, and lead nurturing into one scalable revenue-focused system.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  Book Free Strategy Call
                </Link>
                <Link
                  href="/services/lead-to-revenue"
                  className="flex items-center gap-2 bg-white/8 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/13 transition-all text-sm"
                >
                  Explore Lead to Revenue <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-5 mb-10">
                {['CRM & Automation', 'SEO & Paid Growth', 'AI Workflow Systems', 'Multi-Channel Lead Generation'].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span className="text-white/50 text-xs font-mono">{t}</span>
                  </div>
                ))}
              </div>

              {/* Client logos */}
              <div>
                <p className="text-white/25 font-mono text-[0.65rem] uppercase tracking-widest mb-3">Trusted by growing businesses including</p>
                <div className="flex flex-wrap gap-2">
                  {CLIENTS.map(c => (
                    <span key={c} className="bg-white/6 border border-white/10 text-white/40 font-medium text-xs px-3 py-1.5 rounded-lg hover:border-white/25 hover:text-white/60 transition-colors">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Dashboard */}
            <div className="hidden lg:block">
              <HeroDashboard />
            </div>
          </div>
        </div>

        {/* Founder strip */}
        <div className="relative max-w-7xl mx-auto px-6 mt-14">
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-lg shadow-saffron/30">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white font-bold text-sm">Arvind Gupta</span>
                <span className="text-white/30 text-sm">·</span>
                <span className="text-saffron font-mono text-xs">Founder, Scalify Labs</span>
              </div>
              <p className="text-white/50 text-sm leading-snug max-w-xl">
                &quot;Helping businesses build connected growth systems focused on leads, automation, and revenue scalability.&quot;
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-mono text-xs">Available for consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — PROBLEMS ══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Common Challenges</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">What&apos;s Slowing Your<br />Business Growth?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PROBLEMS.map(p => (
              <div key={p.title} className="group border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className={`w-10 h-10 ${p.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <h3 className="font-bold text-navy text-base mb-1.5">{p.title}</h3>
                <p className="text-[#7C7268] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy rounded-2xl p-7 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg mb-1">Every disconnected system costs you revenue.</p>
              <p className="text-white/50 text-sm">Get a free audit — we'll identify exactly where you're losing leads.</p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(255,101,0,0.30)] hover:bg-saffron-dark transition-all text-sm whitespace-nowrap"
            >
              Get Free Growth Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — GROWTH SYSTEM FLOW ══════════════════════════════════ */}
      <section className="bg-navy py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Connected Infrastructure</p>
            <h2 className="font-extrabold text-4xl text-white mb-3">From Traffic to Revenue —<br />Connected Growth Infrastructure</h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              Modern businesses don&apos;t need 6 disconnected vendors. They need one connected growth system.
            </p>
          </div>

          {/* Flow steps */}
          <div className="relative">
            {/* Vertical connector on desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-saffron/30 to-emerald-500/30" />

            <div className="space-y-4">
              {FLOW_STEPS.map((s, i) => (
                <div key={s.label} className={`flex items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Card */}
                  <div className={`flex-1 lg:max-w-[45%] border ${s.color} rounded-2xl p-5 ${i % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold opacity-60`}>0{i + 1}</span>
                      <div>
                        <p className="font-bold text-white text-sm">{s.label}</p>
                        <p className="text-white/45 text-xs font-mono">{s.sub}</p>
                      </div>
                    </div>
                  </div>
                  {/* Center dot on desktop */}
                  <div className={`hidden lg:flex w-8 h-8 rounded-full border-2 ${s.color.split(' ')[0]} bg-navy items-center justify-center shrink-0 z-10`}>
                    <div className={`w-2 h-2 rounded-full ${s.color.split('text-')[1] === s.color.split('text-')[1] ? '' : ''} bg-current`} style={{ background: 'currentColor' }} />
                  </div>
                  {/* Spacer */}
                  <div className="hidden lg:block flex-1 lg:max-w-[45%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div className="mt-12">
            <p className="text-white/30 font-mono text-[0.65rem] uppercase tracking-widest text-center mb-4">Supported Channels & Systems</p>
            <div className="flex flex-wrap justify-center gap-2">
              {CHANNELS.map(c => (
                <span key={c.name} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${c.color}`}>
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services/lead-to-revenue"
              className="inline-flex items-center gap-2 bg-saffron text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(255,101,0,0.30)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
            >
              Explore Lead to Revenue System <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — GROWTH STACK ══════════════════════════════════════════ */}
      <section className="bg-[#F7F5F0] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Modular Architecture</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Complete Digital Growth Stack</h2>
            <p className="text-[#7C7268] max-w-xl mx-auto">
              Every service is a module in your growth system — built to connect, not compete.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {SERVICE_GROUPS.map(group => (
              <div key={group.label} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <div className={`px-5 py-3 border-b border-slate-100 flex items-center gap-2 ${group.bg} border`}>
                  <span className={`w-2 h-2 rounded-full ${group.dot}`} />
                  <span className={`font-bold text-xs uppercase tracking-wider ${group.color}`}>{group.label}</span>
                </div>
                <div className="p-4 space-y-2">
                  {group.services.map(svc => (
                    <Link
                      key={svc.name}
                      href={svc.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:border-saffron/30 transition-colors">
                        <svc.icon className="w-4 h-4 text-slate-500 group-hover:text-saffron transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm group-hover:text-saffron transition-colors">{svc.name}</p>
                        <p className="text-[#7C7268] text-xs">{svc.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-saffron transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — WHY SCALIFY ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="font-extrabold text-4xl text-navy">Why Businesses Choose<br />Scalify Labs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 — wide */}
            <div className="md:col-span-2 border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all group">
              <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{WHY_CARDS[0].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed mb-4">{WHY_CARDS[0].desc}</p>
              <div className="flex gap-2 flex-wrap">
                {['Leads', 'Revenue', 'Retention', 'ROI'].map(t => (
                  <span key={t} className="bg-blue-50 border border-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-mono">{t}</span>
                ))}
              </div>
            </div>
            <div className="border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all group">
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{WHY_CARDS[1].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{WHY_CARDS[1].desc}</p>
            </div>
            <div className="border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all group">
              <div className="w-11 h-11 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{WHY_CARDS[2].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{WHY_CARDS[2].desc}</p>
            </div>
            {/* Dark wide card */}
            <div className="md:col-span-2 bg-navy rounded-2xl p-7 hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,101,0,0.07),transparent_60%)]" />
              <div className="relative">
                <div className="w-11 h-11 bg-saffron/15 border border-saffron/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5 text-saffron" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{WHY_CARDS[3].title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{WHY_CARDS[3].desc}</p>
              </div>
            </div>
            <div className="border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all group">
              <div className="w-11 h-11 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{WHY_CARDS[4].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{WHY_CARDS[4].desc}</p>
            </div>
            <div className="md:col-span-2 border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all group">
              <div className="w-11 h-11 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{WHY_CARDS[5].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed mb-4">{WHY_CARDS[5].desc}</p>
              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Campaign Reports', val: 'Weekly' }, { label: 'Pipeline Visibility', val: 'Real-time' }, { label: 'ROI Tracking', val: 'Always On' }].map(m => (
                  <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="font-bold text-navy text-sm">{m.val}</div>
                    <div className="text-[#7C7268] text-xs font-mono">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy to-[#1a2340] text-white rounded-2xl p-7 hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.10),transparent_60%)]" />
              <div className="relative">
                <div className="w-11 h-11 bg-blue-400/15 border border-blue-400/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Growth-First Agency</h3>
                <p className="text-white/55 text-sm leading-relaxed">We measure success by your growth — not our invoices.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/why-scalify" className="inline-flex items-center gap-2 border border-slate-200 text-navy font-semibold px-6 py-3 rounded-xl hover:border-navy hover:shadow-sm transition-all text-sm">
              Why Scalify Labs Exists <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — INDUSTRIES ════════════════════════════════════════════ */}
      <section className="bg-[#F7F5F0] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Sector Expertise</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Industries We Understand Deeply</h2>
            <p className="text-[#7C7268] max-w-lg mx-auto">
              Every industry has unique lead flows, decision cycles, and growth constraints. We know yours.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className={`w-12 h-12 ${ind.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <ind.icon className="w-5.5 h-5.5 w-[22px] h-[22px]" />
                </div>
                <h3 className="font-bold text-navy text-base mb-1.5">{ind.name}</h3>
                <p className="text-[#7C7268] text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — RESULTS ══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Proven Impact</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Real Businesses. Real Growth Systems.</h2>
            <p className="text-[#7C7268] max-w-lg mx-auto">
              Growth systems built for Indian businesses across Jharkhand and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {CASES.map(c => (
              <div key={c.brand} className={`border ${c.color} rounded-2xl p-6 hover:shadow-sm transition-shadow`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-navy text-base">{c.brand}</h3>
                    <span className="text-[#7C7268] font-mono text-xs">{c.tag}</span>
                  </div>
                  <span className="bg-navy text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{c.metric}</span>
                </div>
                <p className="text-[#7C7268] text-sm leading-relaxed">{c.outcome}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 border border-slate-200 text-navy font-semibold px-6 py-3 rounded-xl hover:border-navy transition-all text-sm">
              View More Success Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — SUPER 30 ══════════════════════════════════════════════ */}
      <section className="relative bg-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,101,0,0.08),transparent_55%)]" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center relative">
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <Rocket className="w-3 h-3" /> Selective Growth Accelerator
              </span>
              <h2 className="font-extrabold text-4xl text-white mb-4">
                Super 30 — Digital<br />Growth Accelerator
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                A 45-day in-person growth accelerator focused on SEO, ads, AI tools, CRM, automation, real campaign execution, and growth systems — with only 30 seats per batch.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Laptop Mandatory', 'Selection Process', 'Real Campaign Execution', 'Portfolio Building', 'Certification Guidance'].map(h => (
                  <div key={h} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span className="text-white/60 text-xs font-mono">{h}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/super-30" className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(255,101,0,0.30)] hover:bg-saffron-dark transition-all text-sm">
                  Apply for Super 30 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/super-30" className="flex items-center gap-2 bg-white/8 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/12 transition-all text-sm">
                  Explore Program
                </Link>
              </div>
            </div>

            {/* Super 30 Card */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <div className="text-center mb-5">
                <span className="text-white font-extrabold text-3xl">30</span>
                <span className="text-white/40 font-mono text-xs block">Seats per batch only</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Duration', value: '45 Days In-Person' },
                  { label: 'Format', value: 'Hands-on Execution' },
                  { label: 'Focus', value: 'Real Campaign Work' },
                  { label: 'Mode', value: 'Offline — Ranchi' },
                  { label: 'Selection', value: 'Application-Based' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/8 last:border-0">
                    <span className="text-white/40 text-xs font-mono">{item.label}</span>
                    <span className="text-white font-semibold text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/super-30"
                className="block w-full text-center bg-saffron text-white font-bold py-3 rounded-xl mt-5 hover:bg-saffron-dark transition-colors text-sm"
              >
                View Full Program Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — INSIGHTS ══════════════════════════════════════════════ */}
      <section className="bg-[#F7F5F0] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Growth Intelligence</p>
              <h2 className="font-extrabold text-4xl text-navy">Growth Insights & Research</h2>
            </div>
            <Link href="/blog" className="flex items-center gap-1 text-saffron font-semibold text-sm hover:gap-2 transition-all">
              Explore All Insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['AI Marketing', 'SEO & Organic Growth', 'CRM & Automation', 'Lead Generation', 'Research & Insights'].map(cat => (
              <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-navy hover:text-navy font-medium text-xs rounded-full transition-colors">
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSIGHTS_ARTICLES.map(a => (
              <Link key={a.title} href="/blog" className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className={`bg-gradient-to-br ${a.gradient} h-32 flex items-end p-4`}>
                  <span className="bg-white/20 text-white text-[0.65rem] font-mono px-2.5 py-1 rounded-full">{a.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-navy text-sm leading-snug mb-2 group-hover:text-saffron transition-colors line-clamp-2">{a.title}</h3>
                  <span className="text-[#7C7268] text-xs font-mono">{a.read} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 10 — INSIDE SCALIFY LABS ═══════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Culture & Execution</p>
            <h2 className="font-extrabold text-4xl text-navy">Inside Scalify Labs</h2>
            <p className="text-[#7C7268] mt-3 max-w-lg mx-auto">Startup-like. Execution-focused. Intelligence-driven. This is how we operate.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INSIDE_PANELS.map(panel => (
              <div key={panel.label} className="bg-gradient-to-br from-[#0d1526] to-navy rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all group">
                <div className="flex items-center gap-2 mb-4">
                  <panel.icon className={`w-4 h-4 ${panel.color}`} />
                  <span className={`font-mono text-xs font-bold ${panel.color} uppercase tracking-wider`}>{panel.label}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  {panel.items.map(item => (
                    <div key={item} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-white/60 text-xs font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 11 — FINAL CTA ════════════════════════════════════════════ */}
      <section className="relative bg-navy py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,101,0,0.09),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(59,130,246,0.07),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        {/* Decorative nodes */}
        {['top-12 left-[8%]', 'top-20 right-[12%]', 'bottom-16 left-[15%]', 'bottom-20 right-[8%]'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-saffron/30 blur-sm`} />
        ))}

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
            <Rocket className="w-3.5 h-3.5" /> Start Your Growth System
          </span>

          <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-5">
            Build a Smarter Growth System<br />
            <span className="text-saffron">for Your Business</span>
          </h2>

          <p className="text-white/55 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From SEO and lead generation to CRM automation and AI workflows — Scalify Labs helps businesses build connected systems designed for scalable growth.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(255,101,0,0.38)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Book Free Strategy Call
            </Link>
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27d%20like%20to%20grow%20my%20business%20with%20Scalify%20Labs"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-7 py-4 rounded-xl hover:bg-[#25D366]/22 transition-all text-sm"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>

          <div>
            <p className="text-white/25 font-mono text-[0.65rem] uppercase tracking-widest mb-3">Serving businesses across</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Ranchi', 'Jamshedpur', 'Dhanbad', 'Patna', 'Delhi', 'Pune', 'Mumbai', 'Bangalore', 'and across India'].map(city => (
                <span key={city} className="text-white/35 font-mono text-xs">{city} ·</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
