'use client'

import Link from 'next/link'
import {
  ArrowRight, PhoneCall, CheckCircle2, Zap, Database, BrainCircuit,
  TrendingUp, BarChart3, GitBranch, Globe, Search, MessageSquare,
  Lightbulb, Shield, Award, Rocket, Settings2, RefreshCw, Target,
  Users,
} from 'lucide-react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const DIFFERENTIATORS = [
  {
    icon: TrendingUp,
    title: 'Lead-to-Revenue Thinking',
    desc: 'We connect visibility, lead capture, nurturing, follow-ups, and conversion into one measurable system — not disconnected campaigns.',
    color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', wide: true,
  },
  {
    icon: Database,
    title: 'CRM & Automation Expertise',
    desc: 'Beyond ads and SEO — we build workflows that improve operational efficiency and customer engagement across the full pipeline.',
    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', wide: false,
  },
  {
    icon: BrainCircuit,
    title: 'AI-Enabled Execution',
    desc: 'Modern automation systems powered by AI workflows, smart analytics, and scalable processes your team can actually run.',
    color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', wide: false,
  },
  {
    icon: BarChart3,
    title: 'Full-Funnel Understanding',
    desc: 'From traffic generation to retention and customer nurturing — we understand and optimize the entire revenue growth cycle.',
    color: 'text-saffron', bg: 'bg-orange-50', border: 'border-orange-100', wide: true,
  },
  {
    icon: Globe,
    title: 'Multi-Industry Experience',
    desc: 'Education, healthcare, real estate, institutes, local businesses, and service companies — across Jharkhand and India.',
    color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', wide: false,
  },
  {
    icon: Award,
    title: 'Built by Practitioners',
    desc: 'Hands-on experience across CRM systems, admissions funnels, automation workflows, growth marketing, and scalable operations.',
    color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', wide: true,
  },
]

const TEAM = [
  { name: 'Priya Sharma', role: 'Creative Growth Designer', bio: 'Designs landing pages, ad creatives, and conversion-focused visual systems for performance campaigns.', tags: ['UI/UX', 'Creative Systems', 'Brand Design'], gradient: 'from-pink-500 to-rose-600' },
  { name: 'Ravi Kumar', role: 'CRM & Automation Specialist', bio: 'Builds lead pipelines, automation workflows, CRM systems, and customer engagement infrastructure.', tags: ['CRM', 'Automation', 'Lead Workflows'], gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Anjali Verma', role: 'Content & SEO Strategist', bio: 'Works on SEO systems, content growth, search visibility, and organic lead generation at scale.', tags: ['SEO', 'Content Systems', 'Organic Growth'], gradient: 'from-emerald-500 to-teal-600' },
  { name: 'Akash Singh', role: 'Performance Marketing Specialist', bio: 'Manages multi-channel paid campaigns across Google, Meta, and conversion-focused ad ecosystems.', tags: ['Google Ads', 'Meta Ads', 'Analytics'], gradient: 'from-amber-500 to-orange-600' },
  { name: 'Neha Kapoor', role: 'AI Workflow Specialist', bio: 'Builds AI-powered operational systems, automation workflows, and scalable productivity processes.', tags: ['AI Systems', 'Automation', 'Workflow Design'], gradient: 'from-violet-500 to-purple-600' },
  { name: 'Saurabh Jain', role: 'Lead Systems Strategist', bio: 'Focuses on lead-to-revenue architecture, funnel systems, nurturing logic, and conversion optimization.', tags: ['Funnels', 'Lead Systems', 'CRO'], gradient: 'from-orange-500 to-red-600' },
]

const STATS = [
  { value: '17+', label: 'Years of Experience', sub: 'Growth & marketing across India' },
  { value: '5000+', label: 'Mentor Ecosystem Built', sub: 'Nationwide mentoring community' },
  { value: '300+', label: 'Sessions & Webinars', sub: 'Industry talks & training' },
  { value: '10,000+', label: 'Student Interactions', sub: 'Direct mentorship touchpoints' },
  { value: '10+', label: 'Industries Served', sub: 'Education, health, real estate & more' },
  { value: 'Full-Funnel', label: 'Growth Expertise', sub: 'SEO · CRM · AI · Paid · Automation' },
]

const BRANDS = [
  'Dheya', 'GC Ceramics', 'Brands Outlet', 'Lakshyarth',
  'City Health Guide', 'Career Bloom', 'Sri Sidhi Vinayak & Co', 'SD Plaso Fab',
]

const PHILOSOPHY = [
  { icon: Target, title: 'Business First', desc: 'Growth systems should support measurable business outcomes — revenue, leads, and retention.', color: 'text-blue-500' },
  { icon: GitBranch, title: 'Systems Over Chaos', desc: 'Connected systems outperform disconnected execution every single time.', color: 'text-emerald-500' },
  { icon: Settings2, title: 'Automation Focused', desc: 'Modern businesses scale through operational efficiency and smart automation.', color: 'text-violet-500' },
  { icon: Zap, title: 'Execution Driven', desc: 'Ideas matter only when implemented effectively and consistently.', color: 'text-saffron' },
  { icon: BrainCircuit, title: 'AI Enabled', desc: 'AI improves speed, decision quality, workflows, and scalable operations.', color: 'text-pink-500' },
  { icon: RefreshCw, title: 'Long-Term Thinking', desc: 'Sustainable growth systems outperform short-term hacks by a wide margin.', color: 'text-amber-500' },
]

const FLOW_STEPS = [
  { step: '01', label: 'Train', desc: 'Build execution-focused digital professionals', icon: Lightbulb, color: 'text-blue-400', border: 'border-blue-400/30', glow: 'shadow-blue-500/20' },
  { step: '02', label: 'Build', desc: 'Create connected growth systems for businesses', icon: Settings2, color: 'text-violet-400', border: 'border-violet-400/30', glow: 'shadow-violet-500/20' },
  { step: '03', label: 'Scale', desc: 'Grow digital revenue and market presence', icon: TrendingUp, color: 'text-saffron', border: 'border-saffron/30', glow: 'shadow-saffron/20' },
  { step: '04', label: 'Prosper', desc: 'Create lasting economic momentum locally', icon: Rocket, color: 'text-emerald-400', border: 'border-emerald-400/30', glow: 'shadow-emerald-500/20' },
]

// ─── ECOSYSTEM SVG ───────────────────────────────────────────────────────────

function EcosystemSVG() {
  const cx = 250, cy = 250, r = 165

  const nodes = [
    { label: ['Google', 'Ads'], angle: -90, color: '#3B82F6', fill: 'rgba(59,130,246,0.15)', stroke: 'rgba(59,130,246,0.7)' },
    { label: ['Meta', 'Ads'], angle: -45, color: '#8B5CF6', fill: 'rgba(139,92,246,0.15)', stroke: 'rgba(139,92,246,0.7)' },
    { label: ['CRM'], angle: 0, color: '#10B981', fill: 'rgba(16,185,129,0.15)', stroke: 'rgba(16,185,129,0.7)' },
    { label: ['Analytics'], angle: 45, color: '#F59E0B', fill: 'rgba(245,158,11,0.15)', stroke: 'rgba(245,158,11,0.7)' },
    { label: ['SEO'], angle: 90, color: '#22C55E', fill: 'rgba(34,197,94,0.15)', stroke: 'rgba(34,197,94,0.7)' },
    { label: ['WhatsApp'], angle: 135, color: '#25D366', fill: 'rgba(37,211,102,0.15)', stroke: 'rgba(37,211,102,0.7)' },
    { label: ['AI', 'Workflow'], angle: 180, color: '#EC4899', fill: 'rgba(236,72,153,0.15)', stroke: 'rgba(236,72,153,0.7)' },
    { label: ['Lead', 'Systems'], angle: -135, color: '#FF6500', fill: 'rgba(255,101,0,0.15)', stroke: 'rgba(255,101,0,0.7)' },
  ].map(n => {
    const rad = (n.angle * Math.PI) / 180
    return { ...n, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  })

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full max-h-[440px]" aria-hidden>
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="centerGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,101,0,0.05)" />
          <stop offset="100%" stopColor="rgba(11,15,30,0)" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={200} fill="url(#bgGrad)" />

      {/* Connecting lines */}
      {nodes.map((n, i) => (
        <line
          key={i}
          x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke={n.color} strokeWidth="1" opacity="0.35"
          strokeDasharray="4 4"
        />
      ))}

      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <g key={i} filter="url(#glow)">
          <circle cx={n.x} cy={n.y} r={34} fill={n.fill} stroke={n.stroke} strokeWidth="1.2" />
          {n.label.map((line, li) => (
            <text
              key={li}
              x={n.x} y={n.y + (n.label.length === 1 ? 4 : li === 0 ? -4 : 10)}
              textAnchor="middle" fill="white" fontSize="9.5" fontWeight="600"
              fontFamily="system-ui, sans-serif"
            >
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* Center ring */}
      <circle cx={cx} cy={cy} r={58} fill="rgba(255,101,0,0.08)" stroke="rgba(255,101,0,0.5)" strokeWidth="1.5" filter="url(#centerGlow)" />
      <circle cx={cx} cy={cy} r={44} fill="rgba(11,15,30,0.9)" stroke="rgba(255,101,0,0.7)" strokeWidth="1.5" />

      {/* Center label */}
      <text x={cx} y={cy - 7} textAnchor="middle" fill="#FF6500" fontSize="10.5" fontWeight="800" letterSpacing="1" fontFamily="system-ui, sans-serif">SCALIFY</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="white" fontSize="10.5" fontWeight="700" fontFamily="system-ui, sans-serif">LABS</text>

      {/* Pulse dots on lines */}
      {nodes.map((n, i) => {
        const t = 0.55
        return (
          <circle
            key={i}
            cx={cx + (n.x - cx) * t}
            cy={cy + (n.y - cy) * t}
            r={3} fill={n.color} opacity={0.8}
          />
        )
      })}
    </svg>
  )
}

// ─── FOUNDER VISUAL ───────────────────────────────────────────────────────────

function FounderVisual() {
  return (
    <div className="relative">
      {/* Main dark card */}
      <div className="relative bg-gradient-to-br from-[#0d1526] via-[#111827] to-[#0B0F1E] rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-5">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />

        {/* Browser chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="bg-white/5 text-white/30 font-mono text-[0.6rem] px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            dashboard.scalifylabs.com
          </div>
          <span className="text-white/20 text-xs">↻</span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'Leads Today', value: '48', delta: '+12%', color: 'text-emerald-400' },
            { label: 'CRM Active', value: '234', delta: 'Live', color: 'text-blue-400' },
            { label: 'Revenue', value: '₹4.2L', delta: '+28%', color: 'text-saffron' },
          ].map(m => (
            <div key={m.label} className="bg-white/5 rounded-xl p-3">
              <div className="text-white/35 text-[0.58rem] font-mono uppercase tracking-wide mb-1">{m.label}</div>
              <div className="text-white font-extrabold text-xl leading-none mb-1">{m.value}</div>
              <div className={`text-[0.65rem] font-mono font-bold ${m.color}`}>{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Pipeline bars */}
        <div className="bg-white/5 rounded-xl p-3 mb-3">
          <div className="text-white/35 text-[0.58rem] font-mono uppercase tracking-wide mb-2.5">Sales Pipeline</div>
          {[
            { stage: 'New', count: 48, pct: '100%', color: 'bg-blue-400' },
            { stage: 'Contacted', count: 36, pct: '75%', color: 'bg-violet-400' },
            { stage: 'Qualified', count: 22, pct: '46%', color: 'bg-amber-400' },
            { stage: 'Won', count: 8, pct: '17%', color: 'bg-emerald-400' },
          ].map(s => (
            <div key={s.stage} className="flex items-center gap-2 mb-1.5">
              <span className="text-white/40 text-[0.58rem] w-14 shrink-0 font-mono">{s.stage}</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: s.pct }} />
              </div>
              <span className="text-white/40 text-[0.6rem] font-mono w-5 text-right">{s.count}</span>
            </div>
          ))}
        </div>

        {/* AI flow indicator */}
        <div className="bg-violet-500/10 border border-violet-400/20 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-violet-300 text-[0.65rem] font-mono">AI Lead Scoring Active</span>
            <div className="ml-auto flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1 rounded-full bg-violet-400" style={{ height: `${8 + i * 4}px` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Founder card */}
        <div className="relative bg-gradient-to-r from-saffron/10 to-blue-500/10 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-lg shadow-saffron/25">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm">Arvind Gupta</div>
              <div className="text-saffron font-mono text-[0.65rem]">Founder, Scalify Labs</div>
              <div className="text-white/40 text-[0.6rem] mt-0.5 leading-snug truncate">Performance Marketing · CRM · AI Workflows</div>
            </div>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-mono text-[0.55rem]">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-saffron to-orange-600 text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-saffron/30 whitespace-nowrap">
        17+ Years Experience
      </div>
      <div className="absolute -bottom-3 -left-3 bg-[#0d1526] border border-white/15 text-white text-[0.65rem] font-mono px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap">
        ⚡ Systems Running 24/7
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function WhyScalifyPageClient() {
  return (
    <>

      {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════ */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-24">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,rgba(255,101,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-center">

            {/* Left content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                Built in Jharkhand. Designed for Modern Business Growth.
              </span>

              <h1 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight tracking-tight mb-5">
                We're Building the Next<br />
                Generation of Growth<br />
                <span className="text-saffron">Systems from Jharkhand</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
                Scalify Labs combines performance marketing, CRM automation, AI workflows, SEO, lead nurturing, and revenue-focused systems to help businesses scale smarter — while creating digital opportunities locally.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/services/google-ads"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
                >
                  Explore Growth Systems <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 bg-white/8 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/12 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  Book Strategy Call
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-5">
                {[
                  '17+ Years Experience',
                  'CRM & Automation Expertise',
                  'Full-Funnel Growth Systems',
                  'Multi-Industry Execution',
                ].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-saffron shrink-0" />
                    <span className="text-white/50 text-xs font-mono">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Founder Visual */}
            <div className="hidden lg:block">
              <FounderVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — WHY WE EXIST ══════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — narrative */}
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-4">Origin Story</p>
              <h2 className="font-extrabold text-3xl text-navy mb-5 leading-tight">
                Built from Real Business Experience —<br className="hidden lg:block" /> Not Just Agency Theory
              </h2>

              <p className="text-[#44403C] mb-5 leading-relaxed">
                Over 17+ years, Arvind Gupta has worked across education, university growth, performance marketing, CRM systems, lead funnels, automation workflows, digital admissions systems, SEO, and full-funnel marketing.
              </p>

              <p className="text-[#44403C] mb-5 leading-relaxed">
                Before Scalify Labs, he played a key role in building one of India's largest mentor ecosystems at <strong>Dheya</strong> — helping scale a nationwide mentoring community across thousands of student interactions.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6">
                <p className="font-semibold text-navy text-sm mb-3">Working closely with businesses revealed one common problem:</p>
                <div className="space-y-1.5">
                  {[
                    'Ads work separately. CRM works separately.',
                    'Leads get lost between tools.',
                    'Follow-ups remain manual and inconsistent.',
                    'Marketing lacks visibility into actual revenue.',
                  ].map(p => (
                    <div key={p} className="flex items-start gap-2 text-sm text-[#7C7268]">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span> {p}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-saffron pl-5 mb-6">
                <p className="text-navy font-bold text-base mb-1">Scalify Labs was created to solve this.</p>
                <p className="text-[#7C7268] text-sm leading-relaxed">
                  Through connected growth infrastructure powered by automation, CRM, AI workflows, SEO, paid growth, lead nurturing, analytics, and operational systems.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="font-bold text-navy text-sm">We don't just market businesses.</p>
                <p className="text-saffron font-bold text-base">We help build scalable digital growth systems.</p>
              </div>
            </div>

            {/* Right — Ecosystem Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[440px]">
                <div className="bg-gradient-to-br from-[#0d1526] to-navy rounded-3xl border border-white/10 p-6 shadow-2xl">
                  <div className="text-center mb-2">
                    <p className="text-white/30 font-mono text-[0.65rem] uppercase tracking-widest">Connected Growth Infrastructure</p>
                  </div>
                  <EcosystemSVG />
                </div>
                {/* Floating label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-saffron text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  8 Systems · 1 Connected Ecosystem
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — WHAT MAKES US DIFFERENT ══════════════════════════ */}
      <section className="bg-[#F7F5F0] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Differentiation</p>
            <h2 className="font-extrabold text-4xl text-navy mb-3">Most Agencies Sell Services.<br />We Build Systems.</h2>
            <p className="text-[#7C7268] max-w-xl mx-auto text-lg">
              Modern businesses don't need disconnected vendors. They need connected growth infrastructure.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 — wide */}
            <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group">
              <div className={`w-11 h-11 ${DIFFERENTIATORS[0].bg} ${DIFFERENTIATORS[0].border} border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <TrendingUp className={`w-5 h-5 ${DIFFERENTIATORS[0].color}`} />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{DIFFERENTIATORS[0].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{DIFFERENTIATORS[0].desc}</p>
              {/* Mini visual */}
              <div className="mt-5 flex items-center gap-2">
                {['Traffic', '→', 'Leads', '→', 'Nurture', '→', 'Revenue'].map((s, i) => (
                  <span key={i} className={`text-xs font-mono ${s === '→' ? 'text-saffron font-bold' : 'bg-slate-50 border border-slate-200 text-navy px-2 py-0.5 rounded-md font-medium'}`}>{s}</span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group">
              <div className={`w-11 h-11 ${DIFFERENTIATORS[1].bg} ${DIFFERENTIATORS[1].border} border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Database className={`w-5 h-5 ${DIFFERENTIATORS[1].color}`} />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{DIFFERENTIATORS[1].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{DIFFERENTIATORS[1].desc}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group">
              <div className={`w-11 h-11 ${DIFFERENTIATORS[2].bg} ${DIFFERENTIATORS[2].border} border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <BrainCircuit className={`w-5 h-5 ${DIFFERENTIATORS[2].color}`} />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{DIFFERENTIATORS[2].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{DIFFERENTIATORS[2].desc}</p>
            </div>

            {/* Card 4 — wide */}
            <div className="md:col-span-2 bg-navy text-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,101,0,0.08),transparent_60%)]" />
              <div className="relative">
                <div className="w-11 h-11 bg-saffron/15 border border-saffron/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-saffron" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{DIFFERENTIATORS[3].title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{DIFFERENTIATORS[3].desc}</p>
                {/* Loop visual */}
                <div className="mt-5 flex items-center gap-3 flex-wrap">
                  {['Awareness', 'Leads', 'Nurture', 'Convert', 'Retain', 'Grow'].map((s, i, arr) => (
                    <div key={s} className="flex items-center gap-3">
                      <span className="bg-white/10 border border-white/15 text-white/80 text-xs px-2.5 py-1 rounded-lg font-mono">{s}</span>
                      {i < arr.length - 1 && <span className="text-saffron text-xs">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group">
              <div className={`w-11 h-11 ${DIFFERENTIATORS[4].bg} ${DIFFERENTIATORS[4].border} border rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Globe className={`w-5 h-5 ${DIFFERENTIATORS[4].color}`} />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{DIFFERENTIATORS[4].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{DIFFERENTIATORS[4].desc}</p>
            </div>

            {/* Card 6 — wide */}
            <div className="md:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group">
              <div className="w-11 h-11 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{DIFFERENTIATORS[5].title}</h3>
              <p className="text-[#7C7268] text-sm leading-relaxed">{DIFFERENTIATORS[5].desc}</p>
            </div>

            {/* Card 7 — full width summary */}
            <div className="md:col-span-1 bg-gradient-to-br from-navy to-[#1a2340] text-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_60%)]" />
              <div className="relative">
                <div className="w-11 h-11 bg-blue-400/15 border border-blue-400/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">One Partner.<br />Complete System.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Strategy, execution, automation, and reporting — all connected under one growth infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — IMPACT ══════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Local Impact</p>
            <h2 className="font-extrabold text-4xl text-navy mb-4">Building Local Capability<br />for Global Digital Growth</h2>
            <p className="text-[#7C7268] max-w-2xl mx-auto leading-relaxed">
              Scalify Labs believes business growth should also create long-term local capability. Every business that scales through connected systems creates jobs, income, digital skills, and economic momentum.
            </p>
          </div>

          {/* Flow */}
          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-blue-400/40 via-saffron/50 to-emerald-400/40" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FLOW_STEPS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center text-center group">
                  <div className={`relative w-[104px] h-[104px] rounded-2xl bg-navy border ${s.border} shadow-xl ${s.glow} shadow-lg flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    {/* Glow ring */}
                    <div className={`absolute inset-0 rounded-2xl border ${s.border} scale-110 opacity-40`} />
                    <div className="flex flex-col items-center gap-1">
                      <s.icon className={`w-8 h-8 ${s.color}`} />
                      <span className={`font-mono text-xs ${s.color} opacity-60`}>{s.step}</span>
                    </div>
                  </div>
                  <h3 className={`font-extrabold text-2xl mb-2 ${s.color}`}>{s.label}</h3>
                  <p className="text-[#7C7268] text-sm leading-relaxed max-w-[180px]">{s.desc}</p>

                  {/* Mobile arrow */}
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="lg:hidden mt-4 text-slate-300 text-2xl">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 bg-navy rounded-2xl p-7 text-center">
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Every student trained and every business scaled contributes to a stronger digital ecosystem in Jharkhand — creating real opportunities in one of India&apos;s most promising states.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — TEAM ══════════════════════════════════════════════ */}
      <section className="bg-navy py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">The Team</p>
            <h2 className="font-extrabold text-4xl text-white mb-3">Meet the Growth &<br />Automation Team</h2>
            <p className="text-white/50 max-w-lg mx-auto">
              A team of growth strategists, automation specialists, and modern digital operators — not a traditional agency roster.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map(member => (
              <div
                key={member.name}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,101,0,0.08)] transition-all duration-300 overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-saffron/3 transition-all duration-500 rounded-2xl" />

                <div className="relative flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-lg shrink-0`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{member.name}</h3>
                    <p className="text-white/50 text-xs leading-snug mt-0.5">{member.role}</p>
                  </div>
                </div>

                <p className="text-white/55 text-xs leading-relaxed mb-4 relative">{member.bio}</p>

                <div className="flex flex-wrap gap-1.5 relative">
                  {member.tags.map(tag => (
                    <span key={tag} className="bg-white/8 border border-white/15 text-white/60 text-[0.65rem] font-mono px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Founder highlight */}
          <div className="mt-6 bg-gradient-to-r from-saffron/10 via-saffron/5 to-transparent border border-saffron/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-saffron/30 shrink-0">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-bold text-white text-base">Arvind Gupta</h3>
                <span className="bg-saffron text-white text-[0.6rem] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">Founder</span>
              </div>
              <p className="text-saffron font-mono text-xs mb-2">Performance Marketing · CRM Automation · AI Workflows · Growth Systems</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Helping businesses connect marketing, automation, and revenue systems into scalable growth infrastructure. 17+ years building growth ecosystems across India.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-saffron text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-saffron-dark transition-colors shrink-0 whitespace-nowrap"
            >
              Work with Arvind <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — STATS ══════════════════════════════════════════════ */}
      <section className="relative bg-[#070b14] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,101,0,0.05),transparent_60%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Authority & Experience</p>
            <h2 className="font-extrabold text-4xl text-white">Experience Across Growth,<br />Automation & Digital Systems</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STATS.map(stat => (
              <div
                key={stat.label}
                className="group relative bg-white/4 border border-white/8 rounded-2xl p-7 hover:bg-white/6 hover:border-white/15 hover:shadow-[0_0_40px_rgba(255,101,0,0.07)] transition-all duration-300"
              >
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-saffron/40 group-hover:bg-saffron animate-pulse" />
                <div className="font-extrabold text-4xl text-white mb-2 leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="font-bold text-white/80 text-sm mb-1">{stat.label}</div>
                <div className="text-white/35 text-xs font-mono">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — BRANDS ══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Portfolio</p>
            <h2 className="font-extrabold text-3xl text-navy mb-2">Businesses & Brands We've Worked With</h2>
            <p className="text-[#7C7268] max-w-lg mx-auto text-sm">
              Experience across education, healthcare, local businesses, growth ecosystems, and digital transformation projects.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRANDS.map(brand => (
              <div
                key={brand}
                className="group flex items-center justify-center h-20 bg-slate-50 border border-slate-100 rounded-2xl px-4 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <span className="font-bold text-slate-400 group-hover:text-navy text-sm text-center transition-colors leading-snug">
                  {brand}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-[#7C7268] text-xs font-mono mt-6">
            + many more businesses across Ranchi, Jharkhand, and national clients
          </p>
        </div>
      </section>

      {/* ══ SECTION 8 — HOW WE THINK ══════════════════════════════════════ */}
      <section className="bg-[#F7F5F0] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Philosophy</p>
            <h2 className="font-extrabold text-3xl text-navy">What Drives Scalify Labs</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PHILOSOPHY.map(item => (
              <div
                key={item.title}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="font-bold text-navy text-base mb-1.5">{item.title}</h3>
                <p className="text-[#7C7268] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — FINAL CTA ══════════════════════════════════════════ */}
      <section className="relative bg-navy py-28 overflow-hidden">
        {/* Rich background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,101,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(59,130,246,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        {/* Floating connection nodes decoration */}
        <div className="absolute top-16 left-[8%] w-3 h-3 rounded-full bg-blue-400/40 blur-sm" />
        <div className="absolute top-24 right-[12%] w-2 h-2 rounded-full bg-saffron/50" />
        <div className="absolute bottom-16 left-[15%] w-2 h-2 rounded-full bg-violet-400/40" />
        <div className="absolute bottom-24 right-[8%] w-3 h-3 rounded-full bg-emerald-400/30 blur-sm" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
            <Rocket className="w-3.5 h-3.5" />
            Ready to Scale
          </span>

          <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-5">
            Build Smarter Growth Systems<br />
            <span className="text-saffron">With Scalify Labs</span>
          </h2>

          <p className="text-white/55 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From SEO and paid growth to CRM automation and AI workflows — Scalify Labs helps businesses build scalable, connected digital growth systems.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(255,101,0,0.40)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Book Free Strategy Call
            </Link>
            <Link
              href="/services/google-ads"
              className="flex items-center gap-2 bg-white/8 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl hover:bg-white/12 transition-all text-sm"
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27d%20like%20to%20learn%20about%20Scalify%20Labs%20growth%20systems"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-7 py-4 rounded-xl hover:bg-[#25D366]/20 transition-all text-sm"
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
