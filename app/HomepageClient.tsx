'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, ChevronRight, Star,
  TrendingUp, Search, MessageCircle, BarChart3, Database,
  Zap, Globe, Target, Shield, Users, Activity,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Sofa, Store,
  CheckCircle, BookOpen, Layers, Mail, Monitor, PhoneCall,
  Brain, LineChart, Repeat2, Megaphone,
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const WA = 'https://wa.me/918788424727?text=' + encodeURIComponent('Hi, I want to learn more about Scalify Labs growth systems.')

const CLIENTS = [
  'Dheya', 'City Health Guide', 'SD Plasto Fab', 'Sri Sidhi Vinayak & Co',
  'GC Tiles', 'Brands Outlet', 'Lakshyarth', 'Career Bloom',
  'KK Modi University', 'IMS Proschool', 'Imarticus Learning',
]

const METRICS = [
  { icon: Target,    val: '100+',  label: 'Growth Campaigns Executed',   color: '#FF6500' },
  { icon: Users,     val: '80%',   label: 'Client Retention Rate',        color: '#2563EB' },
  { icon: Shield,    val: '50+',   label: 'Businesses Supported',         color: '#16A34A' },
  { icon: Activity,  val: '100%',  label: 'Focus on Measurable Systems',  color: '#7C3AED' },
]

const PROBLEMS = [
  { icon: '📉', title: 'Low Enquiries',           desc: 'Marketing spend with little or no lead flow.' },
  { icon: '📍', title: 'Poor Google Ranking',      desc: 'Invisible to customers searching locally.' },
  { icon: '📵', title: 'Weak Follow-up',           desc: 'Leads go cold. No system to nurture them.' },
  { icon: '⚙️', title: 'Too Much Manual Work',     desc: 'Hours spent on tasks that should be automated.' },
  { icon: '🕳️', title: 'Leads Getting Lost',       desc: 'No CRM. No pipeline. No visibility.' },
  { icon: '🔗', title: 'Disconnected Tools',       desc: 'Ads, CRM, WhatsApp — all siloed.' },
  { icon: '⏰', title: 'Slow Response Times',      desc: 'Competitors respond in minutes. You respond in hours.' },
  { icon: '💸', title: 'Wasted Ad Spend',          desc: 'Budget flowing to clicks that never convert to customers.' },
]

const PIPELINE = [
  { step: 'Traffic',         icon: Globe,        color: '#2563EB', sub: 'SEO + Ads' },
  { step: 'Website',         icon: Monitor,      color: '#7C3AED', sub: 'Convert visitors' },
  { step: 'Lead Capture',    icon: Target,       color: '#FF6500', sub: 'Forms + WhatsApp' },
  { step: 'CRM',             icon: Database,     color: '#D97706', sub: 'Track every lead' },
  { step: 'WhatsApp',        icon: MessageCircle,color: '#16A34A', sub: 'Instant follow-up' },
  { step: 'Automation',      icon: Zap,          color: '#EA580C', sub: 'Run 24/7' },
  { step: 'Revenue',         icon: TrendingUp,   color: '#059669', sub: 'Grow consistently' },
]

const SOLUTIONS = [
  { icon: Search,        label: 'SEO',                       href: '/services/affordable-seo-services' },
  { icon: TrendingUp,    label: 'Google Ads',                href: '/services/google-ads-services' },
  { icon: Target,        label: 'Meta Ads',                  href: '/services/meta-ads' },
  { icon: Star,          label: 'Local SEO',                 href: '/services/gmb' },
  { icon: Monitor,       label: 'Website Development',       href: '/services/website-development' },
  { icon: Database,      label: 'CRM Setup',                 href: '/services/lead-management' },
  { icon: Mail,          label: 'Email Marketing',           href: '/services/email-marketing' },
  { icon: MessageCircle, label: 'WhatsApp Automation',       href: '/services/whatsapp-marketing-agency' },
  { icon: Layers,        label: 'Lead Management',           href: '/services/lead-management' },
  { icon: Brain,         label: 'AI Automation',             href: '/services/ai-calling' },
  { icon: BarChart3,     label: 'Analytics',                 href: '/services/affordable-seo-services' },
  { icon: Globe,         label: 'Landing Pages',             href: '/services/website-development' },
  { icon: Star,          label: 'Google Business Profile',   href: '/services/gmb' },
  { icon: PhoneCall,     label: 'RCS Messaging',             href: '/services/rcs-messaging' },
  { icon: BookOpen,      label: 'Content Marketing',         href: '/blog' },
  { icon: Megaphone,     label: 'Video Editing',             href: '/services/specialized-ads' },
  { icon: Repeat2,       label: 'Marketing Automation',      href: '/services/whatsapp-marketing-agency' },
]

const INDUSTRIES = [
  { icon: HeartPulse,    label: 'Healthcare',       outcome: 'Patient enquiries + appointment systems',  href: '/digital-marketing-for-healthcare',                   color: 'text-red-600 bg-red-50' },
  { icon: GraduationCap, label: 'Education',        outcome: 'Admission funnels + WhatsApp nurturing',    href: '/digital-marketing-agencies-for-education-sector',    color: 'text-blue-600 bg-blue-50' },
  { icon: Building2,     label: 'Real Estate',      outcome: 'Verified buyer leads + site visit funnels', href: '/digital-marketing-services-for-real-estate',         color: 'text-amber-600 bg-amber-50' },
  { icon: ShoppingBag,   label: 'Retail',           outcome: 'Walk-ins + catalogue & offer marketing',    href: '#',                                                   color: 'text-purple-600 bg-purple-50' },
  { icon: Store,         label: 'Local Businesses', outcome: 'Google visibility + call & lead generation', href: '#',                                                  color: 'text-green-600 bg-green-50' },
  { icon: Sofa,          label: 'Home Furnishing',   outcome: 'WhatsApp catalogue + qualified lead funnels', href: '#',                                                color: 'text-orange-600 bg-orange-50' },
]

const WHY = [
  { icon: Layers,    title: 'Connected Systems Thinking',    desc: 'We build ecosystems — not isolated campaigns. Every channel feeds the next.' },
  { icon: BarChart3, title: 'Transparent Reporting',         desc: 'Weekly & monthly dashboards. You always know what\'s working and what isn\'t.' },
  { icon: Globe,     title: 'Local Business Understanding',  desc: 'We understand Jharkhand markets, seasonal patterns, and local buyer psychology.' },
  { icon: Zap,       title: 'Execution-Focused Approach',    desc: 'We don\'t just plan — we build, launch, track, and improve.' },
  { icon: Database,  title: 'CRM + Automation Capability',   desc: 'Beyond ads: CRM setup, WhatsApp automation, and lead nurturing systems.' },
  { icon: Shield,    title: 'Long-Term Growth Support',      desc: 'Partnerships, not projects. Your growth is our long-term commitment.' },
]

const PROCESS = [
  { n: '01', icon: Target,    title: 'Strategy Session',    desc: 'Understand your business, goals, market, and current gaps.' },
  { n: '02', icon: Layers,    title: 'Growth Blueprint',    desc: 'Plan the right systems, channels, and priorities for your stage.' },
  { n: '03', icon: Zap,       title: 'Implementation',      desc: 'Build, launch, and connect your growth infrastructure.' },
  { n: '04', icon: BarChart3, title: 'Analysis',            desc: 'Track KPIs, identify what\'s working, spot opportunities.' },
  { n: '05', icon: Activity,  title: 'Reporting',           desc: 'Transparent weekly updates. You stay informed always.' },
]

const REVIEWS = [
  { name: 'Neha Singh',       biz: 'Zero to Hero Stock Market', stars: 5, text: 'Scalify Labs transformed our online presence. Leads increased 3x in just 2 months!' },
  { name: 'Kavya Shruti',     biz: 'Education Consultant',      stars: 5, text: 'The WhatsApp automation they built saved us hours every day. Highly recommended.' },
  { name: 'Deepak Chauhan',   biz: 'Local Business Owner',      stars: 5, text: 'Our Google Maps ranking went from nowhere to top 3. More walk-ins than ever.' },
  { name: 'Priya Mishra',     biz: 'Clinic Owner',              stars: 5, text: 'CRM setup was flawless. Now we never lose a patient enquiry.' },
]

const CASE_STUDIES = [
  {
    industry: '🏥 Clinic',        emoji: '🏥',
    problem: 'Low patient enquiries despite Google Ads spend',
    solution: 'Local SEO + Google Business Profile + WhatsApp appointment funnel',
    result: '3× more monthly enquiries. 40% reduction in missed appointments.',
    metric: '3×',    metricLabel: 'More Enquiries',
  },
  {
    industry: '🎓 Coaching Institute', emoji: '🎓',
    problem: 'High CPL of ₹400+ with poor admission conversion',
    solution: 'Restructured Google Ads + SEO content + WhatsApp nurture',
    result: 'CPL dropped to ₹95. Batch filled 15 days before deadline.',
    metric: '₹95',   metricLabel: 'Cost Per Lead',
  },
  {
    industry: '🏢 Real Estate', emoji: '🏢',
    problem: 'Getting leads but only 5% converting to site visits',
    solution: 'AI qualification + WhatsApp reminder sequence + CRM pipeline',
    result: '18% site visit rate. 40% fewer fake leads reaching the team.',
    metric: '18%',   metricLabel: 'Site Visit Rate',
  },
]

const BLOGS = [
  { cat: 'SEO',               title: 'Voice Search SEO: Optimize for Hey Google Queries',                      href: '/blog/voice-search-seo-optimize-hey-google',                     date: 'May 2026' },
  { cat: 'AI Tools',          title: 'Chatbot Marketing: 24/7 Lead Capture & Qualification',                   href: '/blog/chatbot-marketing-lead-capture-qualification',              date: 'May 2026' },
  { cat: 'CRM',               title: 'LinkedIn Lead Generation for B2B Services',                              href: '/blog/linkedin-lead-generation-b2b-services',                     date: 'May 2026' },
  { cat: 'Digital Marketing', title: 'Conversion Rate Optimization: Turn Visitors into Leads',                 href: '/blog/conversion-rate-optimization-visitors-to-leads',           date: 'May 2026' },
]

// ─── HERO DASHBOARD MOCKUP ────────────────────────────────────────────────────
function GrowthDashboard() {
  const [tick, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 2000); return () => clearInterval(t) }, [])

  const metrics = [
    { label: 'Website Traffic',    val: `${12400 + tick * 47}`,  delta: '+18%', color: '#2563EB' },
    { label: 'Leads Generated',    val: `${148 + tick * 2}`,     delta: '+31%', color: '#16A34A' },
    { label: 'WhatsApp Responses', val: `${94 + tick}`,          delta: '+24%', color: '#FF6500' },
    { label: 'CRM Pipeline',       val: `₹${(4.2 + tick * 0.01).toFixed(1)}L`, delta: '+12%', color: '#7C3AED' },
    { label: 'Revenue Growth',     val: `+${28 + Math.floor(tick * 0.1)}%`,   delta: 'MoM', color: '#059669' },
  ]

  return (
    <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0B0F1E] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#FF6500] rounded-md flex items-center justify-center">
            <span className="text-white text-[9px] font-black">S</span>
          </div>
          <span className="text-white text-xs font-bold">Growth Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />LIVE
        </div>
      </div>
      {/* Metrics */}
      <div className="p-4 grid grid-cols-1 gap-2.5">
        {metrics.map((m, i) => (
          <div key={m.label} className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: i === 0 ? '#F0F7FF' : i === 1 ? '#F0FDF4' : i === 2 ? '#FFF3E8' : i === 3 ? '#F5F3FF' : '#ECFDF5' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
              <span className="text-xs font-medium text-slate-600">{m.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black" style={{ color: m.color }}>{m.val}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-slate-500">{m.delta}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Mini chart area */}
      <div className="px-4 pb-4">
        <div className="bg-[#F8FAFC] rounded-2xl p-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lead Pipeline</p>
          <div className="flex items-end gap-1 h-12">
            {[40, 55, 48, 70, 62, 85, 78, 90, 82, 95, 88, tick % 30 + 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t transition-all duration-700" style={{ height: `${h}%`, background: i === 11 ? '#FF6500' : '#E8E3DA' }} />
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 text-right">Lead flow this month</p>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomepageClient() {
  const [reviewIdx, setReviewIdx] = useState(0)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif', color: '#1A1410' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-12 pb-20 lg:pt-20 lg:pb-28 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 border"
                style={{ background: 'rgba(255,101,0,0.06)', borderColor: 'rgba(255,101,0,0.2)', color: '#FF6500' }}>
                <Zap className="w-3.5 h-3.5" /> Growth Systems Company
              </div>
              <h1 className="font-black leading-[1.1] tracking-tight mb-6 text-[36px] sm:text-[48px] lg:text-[56px]" style={{ color: '#0B0F1E' }}>
                Get More Leads, Better Follow-Ups & Connected Growth Systems{' '}
                <span style={{ color: '#FF6500' }}>For Your Business</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-[540px]" style={{ color: '#57534E' }}>
                SEO + Ads + CRM + WhatsApp + Automation helping businesses scale consistently.
              </p>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Growth Systems','CRM Automation','Lead Generation','Local SEO','AI Workflows'].map(b => (
                  <div key={b} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border"
                    style={{ background: '#F8FAFC', borderColor: '#E8E3DA', color: '#57534E' }}>
                    <Check className="w-3.5 h-3.5" style={{ color: '#FF6500' }} /> {b}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact-scalifylabs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity shadow-lg"
                  style={{ background: '#FF6500', minHeight: 56 }}>
                  Book Growth Call <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#solutions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 hover:bg-slate-50 transition-colors"
                  style={{ color: '#0B0F1E', borderColor: '#E8E3DA', minHeight: 56 }}>
                  Explore Solutions
                </Link>
              </div>
            </div>
            {/* Right — Dashboard */}
            <div className="flex justify-center lg:justify-end">
              <GrowthDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT MARQUEE ────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-slate-100" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto px-4 mb-5">
          <p className="text-center text-sm font-semibold text-slate-400">Businesses & Brands our founder has Worked With</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-10 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-lg font-black text-slate-200 hover:text-[#FF6500] transition-colors cursor-default shrink-0">{c}</span>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4 px-4">Growth systems built across education, healthcare, retail, local businesses and SMEs.</p>
      </section>

      {/* ── TRUST METRICS ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {METRICS.map(m => (
              <div key={m.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: m.color + '12' }}>
                  <m.icon className="w-6 h-6" style={{ color: m.color }} />
                </div>
                <p className="text-4xl font-black mb-1" style={{ color: m.color, fontFamily: 'Syne, sans-serif' }}>{m.val}</p>
                <p className="text-sm text-slate-500 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">The Problem</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Why Most Businesses Struggle to Grow Digitally
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h3 className="font-bold text-base mb-1.5" style={{ color: '#0B0F1E' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW CONNECTED GROWTH WORKS ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">The System</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              How Connected Growth Works
            </h2>
          </div>
          {/* Pipeline */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 overflow-x-auto">
            {PIPELINE.map((step, i) => (
              <div key={step.step} className="flex sm:flex-col items-center gap-3 sm:gap-0 flex-1 min-w-[90px]">
                <div className="relative flex sm:flex-col items-center sm:mb-2">
                  {/* Connector line */}
                  {i < PIPELINE.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 z-0" style={{ background: `linear-gradient(to right, ${step.color}, ${PIPELINE[i+1].color})`, opacity: 0.3 }} />
                  )}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg relative z-10"
                    style={{ background: step.color + '15', border: `2px solid ${step.color}30` }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm" style={{ color: '#0B0F1E' }}>{step.step}</p>
                  <p className="text-[11px]" style={{ color: '#57534E' }}>{step.sub}</p>
                </div>
                {i < PIPELINE.length - 1 && (
                  <ArrowRight className="sm:hidden w-4 h-4 shrink-0" style={{ color: '#E8E3DA' }} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services/lead-to-revenue"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: '#FF6500' }}>
              Explore Lead to Revenue System <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ────────────────────────────────────────────────── */}
      <section id="solutions" className="py-16 lg:py-24 px-4 scroll-mt-20" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Services</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Growth Systems We Build
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SOLUTIONS.map((s, i) => (
              <Link key={i} href={s.href}
                className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#FF6500]/30 hover:text-[#FF6500] transition-all group">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#FF6500]/10 bg-slate-50 transition-colors">
                  <s.icon className="w-4 h-4 text-slate-400 group-hover:text-[#FF6500] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-[#0B0F1E] group-hover:text-[#FF6500] transition-colors leading-tight">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Industries</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Industries We Support
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map(ind => (
              <Link key={ind.label} href={ind.href}
                className="group flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${ind.color} group-hover:scale-110 transition-transform`}>
                  <ind.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1" style={{ color: '#0B0F1E' }}>{ind.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{ind.outcome}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-[#FF6500] group-hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SCALIFYLABS ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Why Us</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Why Businesses Choose ScalifyLabs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,101,0,0.08)' }}>
                  <w.icon className="w-6 h-6 text-[#FF6500]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0B0F1E' }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Process</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Simple Process. Clear Execution.
            </h2>
          </div>
          <div className="grid sm:grid-cols-5 gap-5 relative">
            <div className="hidden sm:block absolute top-10 left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(to right, #FFE4D1, #FF6500, #FFE4D1)' }} />
            {PROCESS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-[#FF6500] transition-colors"
                  style={{ borderColor: '#E8E3DA' }}>
                  <step.icon className="w-7 h-7 text-[#FF6500] mb-0.5" />
                  <span className="text-[10px] font-black text-slate-300">{step.n}</span>
                </div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: '#0B0F1E' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#57534E' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Reviews</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              What Businesses Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`bg-white rounded-2xl p-5 border shadow-sm transition-all ${i === reviewIdx ? 'border-[#FF6500]/30 shadow-lg scale-[1.01]' : 'border-slate-100'}`}>
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#FF6500] text-[#FF6500]" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#57534E' }}>"{r.text}"</p>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#0B0F1E' }}>{r.name}</p>
                  <p className="text-xs" style={{ color: '#9C9189' }}>{r.biz}</p>
                  <p className="text-[10px] text-green-600 font-semibold mt-1">✓ Google Verified</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://share.google/XyPWkBexhOxDt2nuA" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-slate-50 transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              Read More Reviews <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Proof</p>
            <h2 className="font-black text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Real Growth. Real Results.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {CASE_STUDIES.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="px-5 py-4 flex items-center justify-between" style={{ background: '#FAFAF8', borderBottom: '1px solid #E8E3DA' }}>
                  <span className="font-bold text-sm" style={{ color: '#0B0F1E' }}>{c.industry}</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#FF6500]">{c.metric}</p>
                    <p className="text-[10px] text-slate-400">{c.metricLabel}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Problem</p>
                    <p className="text-sm text-slate-500">{c.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#FF6500] uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-slate-500">{c.solution}</p>
                  </div>
                  <div className="px-3 py-2 rounded-xl" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.15)' }}>
                    <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1">Result</p>
                    <p className="text-sm font-semibold text-green-800">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPER 30 (small) ──────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ background: '#0B0F1E' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: '#FF6500' }}>
                  Applications Open
                </span>
              </div>
              <h3 className="font-black text-xl text-white mb-1">Super 30 Career Accelerator</h3>
              <p className="text-sm text-white/60">45-day offline execution program · Ranchi · Only 30 seats</p>
            </div>
            <Link href="/super-30"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: '#FF6500' }}>
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-2">Insights</p>
              <h2 className="font-black text-[28px] sm:text-[34px]" style={{ color: '#0B0F1E' }}>Latest from the Blog</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#FF6500] hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BLOGS.map((b, i) => (
              <Link key={i} href={b.href}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-3"
                  style={{ background: 'rgba(255,101,0,0.08)', color: '#FF6500' }}>
                  {b.cat}
                </span>
                <h3 className="font-bold text-sm leading-snug mb-3 group-hover:text-[#FF6500] transition-colors" style={{ color: '#0B0F1E' }}>{b.title}</h3>
                <p className="text-xs text-slate-400">{b.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4"
        style={{ background: 'linear-gradient(135deg, #FFF9F5 0%, #FFF3E8 50%, #FFF9F5 100%)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-5">Get Started</p>
          <h2 className="font-black text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.15] mb-5" style={{ color: '#0B0F1E' }}>
            Ready To Build Growth Systems That Actually Work?
          </h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-[500px] mx-auto">
            Book a free strategy call and discover exactly how we can connect your marketing, CRM, and automation into one consistent growth engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-scalifylabs"
              className="flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-white text-lg hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: '#FF6500' }}>
              Book Growth Call <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-lg border-2 hover:bg-white transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              <MessageCircle className="w-5 h-5 text-green-600" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* CSS for marquee */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0) }
          to { transform: translateX(-50%) }
        }
      `}</style>
    </main>
  )
}
