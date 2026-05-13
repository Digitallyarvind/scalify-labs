'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, CheckCircle2, PhoneCall, MessageSquare,
  TrendingUp, Search, Database, BrainCircuit, BarChart3,
  Globe, Zap, GitBranch, Layers, Target, Users,
  GraduationCap, HeartPulse, Building2, ShoppingBag,
  Mail, Smartphone, Rocket, Star,
} from 'lucide-react'

// ─── FOUNDER VISUAL ───────────────────────────────────────────────────────────

function FounderHeroCard() {
  return (
    <div className="relative max-w-sm mx-auto lg:mx-0">
      {/* Portrait container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
        <Image
          src="/founder.jpg"
          alt="Arvind Gupta, Founder Scalify Labs"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
        />
        {/* Bottom name gradient overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-6">
          <p className="text-white font-bold text-lg">Arvind Gupta</p>
          <p className="text-saffron font-mono text-xs tracking-wide">Founder & Growth Strategist · Scalify Labs</p>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute top-5 -right-4 bg-emerald-500 text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
        Lead Captured
      </div>
      <div className="absolute top-24 -left-5 bg-white text-slate-700 text-[0.65rem] font-semibold px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-1.5">
        <TrendingUp className="w-3 h-3 text-saffron" /> Revenue +28%
      </div>
      <div className="absolute bottom-24 -right-5 bg-white text-slate-700 text-[0.65rem] font-semibold px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-1.5">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> CRM Active
      </div>
    </div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { icon: Search, title: 'Invisible on Google', desc: 'Competitors rank while your business goes unnoticed by potential customers.', color: 'text-blue-500 bg-blue-50' },
  { icon: BarChart3, title: 'Wasted Ad Spend', desc: 'Campaigns running with no measurable ROI or conversion visibility.', color: 'text-red-500 bg-red-50' },
  { icon: Database, title: 'No Lead Tracking', desc: 'Inquiries arriving across WhatsApp, email, and calls with zero organization.', color: 'text-amber-600 bg-amber-50' },
  { icon: Zap, title: 'Weak Follow-Up', desc: 'Potential customers lost because response systems are manual and slow.', color: 'text-violet-500 bg-violet-50' },
  { icon: GitBranch, title: 'No CRM System', desc: 'Sales pipeline operating from spreadsheets and memory — not systems.', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Layers, title: 'Disconnected Marketing', desc: 'SEO, ads, website, CRM, and WhatsApp running separately with no connection.', color: 'text-indigo-600 bg-indigo-50' },
]

const FLOW_STEPS = [
  { label: 'SEO / Paid Ads / Social', desc: 'Traffic generation across channels', color: '#3B82F6' },
  { label: 'Website & Landing Pages', desc: 'Conversion-optimized entry points', color: '#8B5CF6' },
  { label: 'Lead Capture', desc: 'Forms, chatbots, WhatsApp', color: '#06B6D4' },
  { label: 'CRM Integration', desc: 'Auto-capture and pipeline assignment', color: '#10B981' },
  { label: 'WhatsApp Automation', desc: 'Instant 60-second response', color: '#25D366' },
  { label: 'Lead Nurturing', desc: 'Multi-step engagement sequences', color: '#F59E0B' },
  { label: 'Sales Follow-Up', desc: 'Qualified lead routing and proposals', color: '#FF6500' },
  { label: 'Analytics & Revenue Tracking', desc: 'Full attribution and ROI reporting', color: '#EC4899' },
]

const PLATFORMS = ['Google Ads','Meta Ads','GA4','Google Tag Manager','WhatsApp','HubSpot','Zoho','WordPress','Mailchimp','SendGrid','Apollo','Bitrix24','SEMrush','Search Console']

const GROWTH_STACK = [
  {
    group: 'Visibility Systems',
    color: 'bg-blue-50 border-blue-100',
    accent: 'bg-blue-600',
    icon: Search,
    services: [
      { name: 'SEO Services', desc: 'Page-1 organic rankings', href: '/services/affordable-seo-services' },
      { name: 'Google Ads', desc: 'Search, Display & Shopping', href: '/services/google-ads-services' },
      { name: 'Meta Ads', desc: 'Facebook & Instagram growth', href: '/services/meta-ads' },
      { name: 'Local SEO & GMB', desc: 'Google Maps domination', href: '/services/gmb' },
      { name: 'Content Marketing', desc: 'Authority-building content', href: '/services/affordable-seo-services' },
      { name: 'Specialized Platforms', desc: 'LinkedIn, Quora & native', href: '/services/specialized-ads' },
    ],
  },
  {
    group: 'Communication Systems',
    color: 'bg-emerald-50 border-emerald-100',
    accent: 'bg-emerald-600',
    icon: MessageSquare,
    services: [
      { name: 'WhatsApp Marketing', desc: '98% open-rate automation', href: '/services/whatsapp-marketing-agency' },
      { name: 'Email Marketing', desc: 'Bulk outreach & SMTP', href: '/services/email-marketing' },
      { name: 'RCS Messaging', desc: 'Rich media at scale', href: '/services/rcs-messaging' },
      { name: 'OBD Voice Calls', desc: 'Automated bulk calling', href: '/services/obd' },
      { name: 'AI Calling & Agents', desc: 'AI voice follow-up systems', href: '/services/ai-calling' },
      { name: 'Website Development', desc: 'Conversion-first websites', href: '/services/website-development' },
    ],
  },
  {
    group: 'Automation & CRM',
    color: 'bg-violet-50 border-violet-100',
    accent: 'bg-violet-600',
    icon: Database,
    services: [
      { name: 'CRM Automation', desc: 'Lead pipeline & workflows', href: '/services/lead-management' },
      { name: 'Lead to Revenue System', desc: 'Complete growth infrastructure', href: '/services/lead-to-revenue' },
      { name: 'Lead Nurturing', desc: 'Multi-channel sequences', href: '/services/lead-to-revenue' },
      { name: 'Funnel Automation', desc: 'End-to-end lead journeys', href: '/services/lead-to-revenue' },
      { name: 'AI Workflows', desc: 'Intelligent automation', href: '/services/ai-calling' },
      { name: 'Analytics & Reporting', desc: 'Revenue tracking & ROI', href: '/services/lead-to-revenue' },
    ],
  },
]

const INDUSTRIES = [
  { icon: HeartPulse, name: 'Clinics & Healthcare', desc: 'Patient lead generation, appointment booking automation, and CRM follow-up workflows.', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: GraduationCap, name: 'Education & Institutes', desc: 'Admission funnels, lead nurturing automation, and multi-channel student engagement.', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: Building2, name: 'Real Estate', desc: 'Property lead systems, site visit automation, and CRM pipeline management.', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: ShoppingBag, name: 'Local Businesses', desc: 'Local SEO, Google Business optimization, WhatsApp engagement, and ads.', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Globe, name: 'Ecommerce & Retail', desc: 'Performance campaigns, cart recovery, repeat customer automation.', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: Users, name: 'Service Businesses', desc: 'Lead generation, CRM workflows, WhatsApp nurturing, and conversion optimization.', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
]

const CLIENTS = [
  { name: 'GC Ceramics', type: 'Local Business', challenge: 'Low local visibility and no digital lead flow', system: 'Google Ads + Meta Ads + Local SEO', outcome: 'Significant increase in walk-in enquiries and digital leads' },
  { name: 'Dheya', type: 'Education / EdTech', challenge: 'Scaling mentor ecosystem reach and student engagement', system: 'Multi-channel outreach + automation + CRM', outcome: 'Nationwide digital mentoring community built at scale' },
  { name: 'Brands Outlet', type: 'Retail Fashion', challenge: 'Low repeat customer rate and no digital engagement system', system: 'Meta Ads + WhatsApp automation + retargeting', outcome: 'Improved repeat buyer rate and customer engagement' },
  { name: 'City Health Guide', type: 'Healthcare', challenge: 'No patient lead generation or follow-up system', system: 'Local SEO + Google Ads + appointment automation', outcome: 'Consistent patient leads and appointment bookings' },
  { name: 'Lakshyarth', type: 'Education', challenge: 'Low admission enquiries from digital channels', system: 'SEO + lead nurturing funnel + WhatsApp workflows', outcome: 'Increased admission enquiry volume and CRM visibility' },
  { name: 'Career Bloom', type: 'Career Guidance', challenge: 'Weak digital presence and no lead capture system', system: 'Website + SEO + Google Ads + lead management', outcome: 'Improved digital visibility and consistent lead flow' },
  { name: 'Sri Sidhi Vinayak & Co', type: 'Chartered Accountants', challenge: 'No systematic lead capture from digital platforms', system: 'Local SEO + Google Business + contact automation', outcome: 'Improved local discoverability and client enquiries' },
  { name: 'SD Plaso Fab', type: 'Manufacturing / B2B', challenge: 'No B2B outreach or digital visibility system', system: 'LinkedIn outreach + email system + SEO', outcome: 'Better B2B visibility and structured enquiry management' },
]

const SUPER30_TOOLS = ['Google Ads','Meta Business','WordPress','GA4','Tag Manager','SEMrush','HubSpot','Zoho','ChatGPT','Claude','Canva','Zapier','Mailchimp','Apollo','Search Console']

const INSIGHTS = [
  { title: 'AI Marketing Trends for Indian Businesses in 2025', category: 'AI Marketing', read: '6 min', color: 'from-violet-600 to-purple-700' },
  { title: 'WhatsApp Automation Playbook: Leads to Revenue', category: 'WhatsApp Marketing', read: '8 min', color: 'from-green-600 to-emerald-700' },
  { title: 'Local SEO Checklist for Small Businesses in Jharkhand', category: 'SEO', read: '5 min', color: 'from-blue-600 to-indigo-700' },
  { title: 'CRM Setup Guide for Indian SMBs', category: 'CRM Automation', read: '10 min', color: 'from-amber-600 to-orange-700' },
]

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function HomepageClient() {
  return (
    <>

      {/* ══ SECTION 1 — HERO (dark) ══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-navy to-[#0c1830] overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_60%,rgba(255,101,0,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse inline-block" />
                Growth Infrastructure Company · Ranchi, Jharkhand
              </div>

              <h1 className="font-extrabold text-4xl lg:text-[3.25rem] text-white leading-[1.12] tracking-tight mb-6">
                We Build{' '}
                <span className="bg-gradient-to-r from-saffron via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Connected Growth Systems
                </span>{' '}
                for Modern Businesses
              </h1>

              <p className="text-white/65 text-xl leading-relaxed mb-8 max-w-[540px]">
                Scalify Labs helps clinics, institutes, local businesses, and brands generate leads using SEO, paid ads, CRM automation, AI workflows, WhatsApp systems, and conversion-focused websites.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {['15+ Years Experience','CRM & Automation Focused','Built for Indian Businesses','AI-Enabled Growth Systems'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 bg-white/8 border border-white/12 text-white/70 text-xs font-medium px-3.5 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-saffron shrink-0" /> {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/contact-scalifylabs"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.32)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm">
                  <PhoneCall className="w-4 h-4" /> Book Free Growth Audit
                </Link>
                <Link href="/services/lead-to-revenue"
                  className="flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-4 rounded-xl hover:bg-white/8 transition-all text-sm">
                  Explore Growth Systems <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { v: '50+', l: 'Businesses Helped' },
                  { v: '10K+', l: 'Leads Generated' },
                  { v: 'Multi-Channel', l: 'Automation Systems' },
                  { v: 'Ranchi-Based', l: 'Growth Team' },
                ].map(m => (
                  <div key={m.l} className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-center">
                    <p className="text-white font-extrabold text-base leading-tight">{m.v}</p>
                    <p className="text-white/40 font-mono text-[0.6rem] mt-0.5">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Founder */}
            <div className="hidden lg:flex justify-center">
              <FounderHeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — PROBLEMS (white) ════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Common Challenges</p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900 mb-4">
              What&apos;s Slowing Your<br />Business Growth?
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Many businesses lose revenue because marketing, follow-up, and customer systems operate separately — creating invisible gaps in the growth cycle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PROBLEMS.map(p => (
              <div key={p.title} className="group border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 ${p.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <p.icon className="w-5.5 h-5.5 w-[22px] h-[22px]" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA bar */}
          <div className="bg-gradient-to-r from-slate-900 to-navy rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-white font-semibold text-lg text-center sm:text-left">
              Every disconnected system costs revenue. <span className="text-white/50 text-base font-normal">Fix the gaps before your competition does.</span>
            </p>
            <Link href="/contact-scalifylabs"
              className="shrink-0 flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl hover:bg-saffron-dark transition-colors text-sm whitespace-nowrap">
              Get Free Growth Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — TRAFFIC TO REVENUE (dark) ══════════════════════════ */}
      <section className="bg-navy py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Connected Infrastructure</p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-white mb-4">
              From Traffic to Revenue —<br />Connected Growth Infrastructure
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Modern businesses don&apos;t need separate agencies. They need one connected system where every channel feeds into the next.
            </p>
          </div>

          {/* Flow */}
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start mb-12">
            {/* Left steps */}
            <div className="space-y-3">
              {FLOW_STEPS.slice(0, 4).map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-sm text-white border"
                    style={{ borderColor: s.color + '50', backgroundColor: s.color + '20', color: s.color }}>
                    0{i + 1}
                  </div>
                  <div className="flex-1 border rounded-2xl px-4 py-3 group-hover:shadow-sm transition-all"
                    style={{ borderColor: s.color + '30', backgroundColor: s.color + '08' }}>
                    <p className="text-white font-semibold text-sm">{s.label}</p>
                    <p className="text-white/40 text-xs font-mono">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center arrow */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-3 self-center">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-saffron/40" />
              ))}
              <div className="text-saffron text-2xl font-bold">↓</div>
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-saffron/40" />
              ))}
            </div>

            {/* Right steps */}
            <div className="space-y-3">
              {FLOW_STEPS.slice(4).map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-sm border"
                    style={{ borderColor: s.color + '50', backgroundColor: s.color + '20', color: s.color }}>
                    0{i + 5}
                  </div>
                  <div className="flex-1 border rounded-2xl px-4 py-3 group-hover:shadow-sm transition-all"
                    style={{ borderColor: s.color + '30', backgroundColor: s.color + '08' }}>
                    <p className="text-white font-semibold text-sm">{s.label}</p>
                    <p className="text-white/40 text-xs font-mono">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform strip */}
          <div className="border-t border-white/8 pt-8">
            <p className="text-white/25 font-mono text-[0.62rem] uppercase tracking-widest text-center mb-4">Platforms & Tools We Connect</p>
            <div className="flex flex-wrap justify-center gap-2">
              {PLATFORMS.map(p => (
                <span key={p} className="bg-white/6 border border-white/10 text-white/50 font-mono text-xs px-3 py-1.5 rounded-lg">{p}</span>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/services/lead-to-revenue"
              className="inline-flex items-center gap-2 bg-saffron text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(255,101,0,0.28)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm">
              Explore Lead-to-Revenue Systems <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — GROWTH STACK (light grey) ══════════════════════════ */}
      <section className="bg-[#F5F7FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Complete Service Range</p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900 mb-4">Complete Digital Growth Stack</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">Every service is a module in your growth system — built to connect, not operate in isolation.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {GROWTH_STACK.map(group => (
              <div key={group.group} className={`border rounded-3xl overflow-hidden ${group.color}`}>
                <div className="px-6 py-5 border-b border-current/10 flex items-center gap-3">
                  <div className={`w-9 h-9 ${group.accent} rounded-xl flex items-center justify-center shrink-0`}>
                    <group.icon className="w-4.5 h-4.5 w-[18px] h-[18px] text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">{group.group}</h3>
                </div>
                <div className="p-4 space-y-2">
                  {group.services.map(svc => (
                    <Link key={svc.name} href={svc.href}
                      className="flex items-center gap-3 bg-white/70 hover:bg-white border border-white rounded-xl px-4 py-3 hover:shadow-sm transition-all group">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm group-hover:text-saffron transition-colors">{svc.name}</p>
                        <p className="text-slate-400 text-xs">{svc.desc}</p>
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

      {/* ══ SECTION 5 — WHY SCALIFY / FOUNDER (white) ════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[420px_1fr] gap-16 items-center">

            {/* Founder image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[3/4]">
                <Image
                  src="/founder.jpg"
                  alt="Arvind Gupta, Founder Scalify Labs"
                  fill
                  className="object-cover object-top"
                  sizes="420px"
                />
                {/* Bottom overlay with name */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                  <p className="text-white font-bold text-base">Arvind Gupta</p>
                  <p className="text-saffron font-mono text-xs">Founder, Scalify Labs · 15+ Years</p>
                </div>
              </div>
              {/* Years badge */}
              <div className="absolute -bottom-4 -right-4 bg-saffron text-white font-extrabold text-lg w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-saffron/30">
                <span>15+</span>
                <span className="text-[0.6rem] font-normal opacity-80">Years Exp</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-4">Our Approach</p>
              <h2 className="font-extrabold text-4xl text-slate-900 leading-tight mb-6">
                Built by Someone Who Has Worked<br />Inside Growth Systems
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Arvind Gupta has spent 15+ years working across EdTech, digital growth, admissions funnels, CRM systems, automation workflows, performance marketing, and revenue operations — not just running campaigns, but building the systems behind them.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Before Scalify Labs, he helped scale a nationwide mentor ecosystem at Dheya — connecting student outreach, CRM, and conversion systems at scale. That experience drives how we build growth infrastructure for every client today.
              </p>

              {/* Quote */}
              <div className="relative bg-slate-50 border-l-4 border-saffron rounded-r-2xl px-7 py-6 mb-8">
                <p className="text-slate-700 text-base leading-relaxed italic mb-3">
                  &ldquo;Most businesses don&apos;t fail because of poor marketing alone. They fail because leads, follow-up, communication, and systems are disconnected.&rdquo;
                </p>
                <p className="text-saffron font-bold text-sm">— Arvind Gupta</p>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-3">
                {['ROI-Focused Execution','CRM & Automation Thinking','AI Workflow Integration','Business-First Strategy','Transparent Reporting','Long-Term Growth Focus'].map(f => (
                  <div key={f} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — INDUSTRIES (light) ══════════════════════════════════ */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Sector Expertise</p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900 mb-4">Industries We Understand Deeply</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">Every industry has unique lead flows, decision cycles, and growth constraints. We know yours.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className={`border rounded-2xl p-7 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
                <div className={`w-12 h-12 ${ind.color} border rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <ind.icon className="w-5.5 h-5.5 w-[22px] h-[22px]" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{ind.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — CLIENT STORIES (white) ══════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Proven Impact</p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900 mb-4">Real Businesses. Real Growth Systems.</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">Growth systems built for businesses across Ranchi, Jharkhand, and India.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLIENTS.map(c => (
              <div key={c.name} className="group bg-[#F9FAFB] border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-4">
                  <span className="bg-saffron/10 text-saffron font-mono text-[0.62rem] uppercase tracking-wider px-2.5 py-1 rounded-full">{c.type}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-3">{c.name}</h3>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <p className="text-slate-400 font-mono uppercase tracking-wider text-[0.58rem] mb-0.5">Challenge</p>
                    <p className="text-slate-600">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-mono uppercase tracking-wider text-[0.58rem] mb-0.5">System</p>
                    <p className="text-slate-600">{c.system}</p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-xl p-2.5">
                    <p className="text-slate-700 font-medium">{c.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — SUPER 30 (light) ════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-slate-900 to-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,101,0,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(59,130,246,0.05),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                <Rocket className="w-3.5 h-3.5" /> Growth Accelerator
              </span>
              <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-5">
                Building the Next Generation of<br />
                <span className="text-saffron">Full Stack Growth Professionals</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-7 max-w-[500px]">
                A hands-on accelerator focused on SEO, paid ads, CRM systems, automation, AI workflows, analytics, and business growth thinking — not just tool operation.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {['Real Campaign Execution','AI Tools & Workflows','CRM & Automation','Google & Meta Ads','SEO & Content','Analytics & Reporting'].map(f => (
                  <span key={f} className="flex items-center gap-1.5 bg-white/8 border border-white/12 text-white/70 text-xs px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-saffron shrink-0" /> {f}
                  </span>
                ))}
              </div>
              <Link href="/super-30"
                className="inline-flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_16px_rgba(255,101,0,0.30)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm">
                Explore Super 30 Program <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tools ecosystem */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <p className="text-white/30 font-mono text-[0.62rem] uppercase tracking-widest mb-4">Tools You&apos;ll Master</p>
              <div className="flex flex-wrap gap-2">
                {SUPER30_TOOLS.map(t => (
                  <span key={t} className="bg-white/8 border border-white/12 text-white/70 text-[0.65rem] font-mono px-3 py-1.5 rounded-xl hover:bg-white/14 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/8 grid grid-cols-3 gap-3">
                {[{ v: '45', l: 'Days' }, { v: '30', l: 'Max Seats' }, { v: 'Offline', l: 'Ranchi' }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="text-white font-extrabold text-xl">{s.v}</p>
                    <p className="text-white/35 font-mono text-[0.6rem]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — INSIGHTS (light grey) ══════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Knowledge Hub</p>
              <h2 className="font-extrabold text-4xl text-slate-900">Growth Insights & Resources</h2>
            </div>
            <Link href="/blog" className="flex items-center gap-1.5 text-saffron font-semibold text-sm hover:gap-2.5 transition-all">
              View All Insights <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['AI Marketing','SEO & Organic','CRM Automation','Lead Generation','WhatsApp Marketing','Growth Systems'].map(cat => (
              <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 hover:border-saffron hover:text-saffron font-medium text-xs rounded-full transition-colors">
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSIGHTS.map(a => (
              <Link key={a.title} href="/blog" className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`bg-gradient-to-br ${a.color} h-36 flex items-end p-4`}>
                  <span className="bg-white/20 text-white text-[0.65rem] font-mono font-medium px-2.5 py-1 rounded-full">{a.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-sm leading-snug mb-3 group-hover:text-saffron transition-colors line-clamp-2">{a.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs font-mono">{a.read} read</span>
                    <span className="text-saffron font-bold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 10 — FINAL CTA (dark) ══════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-navy to-[#0c1830] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,101,0,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(59,130,246,0.06),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-5">Start Growing</p>
          <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-6">
            Build a Smarter Growth System<br />
            <span className="text-saffron">for Your Business</span>
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From SEO and lead generation to CRM automation and AI workflows — Scalify Labs helps businesses build connected systems for scalable, measurable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mb-12">
            <Link href="/contact-scalifylabs"
              className="flex items-center gap-2 bg-saffron text-white font-bold px-9 py-4 rounded-xl shadow-[0_4px_24px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all">
              <PhoneCall className="w-4.5 h-4.5 w-[18px] h-[18px]" /> Book Free Strategy Call
            </Link>
            <a href={`https://wa.me/918788424727?text=Hi%20Scalify%20Labs%2C%20I%27d%20like%20to%20discuss%20growing%20my%20business`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-8 py-4 rounded-xl hover:bg-[#25D366]/22 transition-all">
              <MessageSquare className="w-4.5 h-4.5 w-[18px] h-[18px]" /> WhatsApp Us
            </a>
          </div>

          {/* Serving cities */}
          <div>
            <p className="text-white/20 font-mono text-[0.62rem] uppercase tracking-widest mb-3">Serving businesses in</p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {['Ranchi','Jamshedpur','Dhanbad','Bokaro','Patna','Delhi','Mumbai','Bangalore','Pune','and across India'].map(city => (
                <span key={city} className="text-white/25 text-xs font-mono">{city}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
