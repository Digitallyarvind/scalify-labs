'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, ChevronDown, Star, MessageCircle,
  TrendingUp, Database, Zap, Globe, Target, Shield,
  BarChart3, Search, Monitor, Users, Activity,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Sofa, Store,
  CheckCircle, Layers, Repeat2, Brain,
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const WA = 'https://wa.me/918788424727?text=' + encodeURIComponent('Hi ScalifyLabs, I want to learn more about your growth systems.')

const PIPELINE = [
  { step: 'Traffic',      icon: Globe,        color: '#2563EB', sub: 'SEO + Ads' },
  { step: 'Website',      icon: Monitor,      color: '#7C3AED', sub: 'Convert visitors' },
  { step: 'Lead Capture', icon: Target,       color: '#FF6500', sub: 'Forms + WhatsApp' },
  { step: 'CRM',          icon: Database,     color: '#D97706', sub: 'Track pipeline' },
  { step: 'WhatsApp',     icon: MessageCircle,color: '#16A34A', sub: 'Instant follow-up' },
  { step: 'Automation',   icon: Zap,          color: '#EA580C', sub: '24/7 workflows' },
  { step: 'Reporting',    icon: BarChart3,    color: '#0891B2', sub: 'Clear dashboards' },
  { step: 'Revenue',      icon: TrendingUp,   color: '#059669', sub: 'Consistent growth' },
]

const PROBLEMS = [
  { icon: '📉', label: 'Low Enquiries' },
  { icon: '📍', label: 'Poor Google Visibility' },
  { icon: '📵', label: 'Weak Follow-up' },
  { icon: '🕳️', label: 'Lost Leads' },
  { icon: '🗂️', label: 'No CRM' },
  { icon: '🔗', label: 'Disconnected Vendors' },
  { icon: '⏰', label: 'Slow Response Times' },
  { icon: '⚙️', label: 'Manual Processes' },
]

const INDUSTRIES = [
  {
    icon: HeartPulse,   label: 'Healthcare',       color: 'text-red-600 bg-red-50',
    problem: 'Low patient enquiries & missed appointments',
    workflow: 'Google Ads → WhatsApp booking → CRM → reminder automation',
    outcome: '3× more monthly enquiries · 40% fewer no-shows',
    href: '/digital-marketing-for-healthcare',
  },
  {
    icon: GraduationCap, label: 'Education',       color: 'text-blue-600 bg-blue-50',
    problem: 'High CPL, low admission conversion',
    workflow: 'SEO + Ads → Landing page → WhatsApp nurture → CRM',
    outcome: 'CPL from ₹400 → ₹95 · Batch filled 15 days early',
    href: '/digital-marketing-agencies-for-education-sector',
  },
  {
    icon: Building2,    label: 'Real Estate',      color: 'text-amber-600 bg-amber-50',
    problem: 'Leads not converting to site visits',
    workflow: 'AI qualification → WhatsApp reminders → CRM pipeline',
    outcome: '18% site visit rate · 40% fewer fake leads',
    href: '/digital-marketing-services-for-real-estate',
  },
  {
    icon: ShoppingBag,  label: 'Retail',           color: 'text-purple-600 bg-purple-50',
    problem: 'Low footfall & poor online visibility',
    workflow: 'Local SEO + GMB → Google Ads → WhatsApp offers',
    outcome: 'Higher walk-ins · Catalogue marketing via WhatsApp',
    href: '#',
  },
  {
    icon: Store,        label: 'Local Businesses', color: 'text-green-600 bg-green-50',
    problem: 'Invisible on Google Maps & poor lead flow',
    workflow: 'GMB optimisation → Local SEO → Lead capture + CRM',
    outcome: 'Top-3 Maps ranking · Consistent local leads',
    href: '#',
  },
  {
    icon: Sofa,         label: 'Furniture & Tiles', color: 'text-orange-600 bg-orange-50',
    problem: 'No system for WhatsApp catalogue & lead follow-up',
    workflow: 'Meta Ads → WhatsApp catalogue → CRM pipeline',
    outcome: 'Qualified buyer leads · Automated follow-up journeys',
    href: '#',
  },
  {
    icon: Users,        label: 'SMEs',             color: 'text-teal-600 bg-teal-50',
    problem: 'Multiple vendors, disconnected tools, no ROI clarity',
    workflow: 'Connected system: Ads + SEO + CRM + WhatsApp + Reporting',
    outcome: 'One partner, one system, clear monthly reporting',
    href: '#',
  },
]

const METRICS = [
  { val: '50+',  label: 'Projects Supported',    icon: Target,   color: '#FF6500' },
  { val: '100+', label: 'Campaigns Managed',      icon: Layers,   color: '#2563EB' },
  { val: '20+',  label: 'Industries Worked With', icon: Globe,    color: '#16A34A' },
  { val: '80%',  label: 'Client Retention Rate',  icon: Shield,   color: '#7C3AED' },
  { val: '100%', label: 'Focus on Measurable Systems', icon: CheckCircle, color: '#059669' },
]

const CLIENTS = [
  'Dheya','GC Ceramics','Brands Outlet','City Health Guide',
  'Sri Sidhi Vinayak & Co','Lakshyarth','Career Bloom','SD Plasto Fab',
  'KK Modi University','IMS Proschool','Imarticus Learning',
]

const TEAM = [
  { name: 'Priya Sharma',   role: 'Creative Designer',              exp: '5+ Years', skills: ['UI Design','Branding','Ad Creatives'] },
  { name: 'Ravi Kumar',     role: 'WordPress & Funnel Specialist',  exp: '5+ Years', skills: ['Website Systems','Landing Pages','Optimization'] },
  { name: 'Anjali Verma',   role: 'Video Editor & Content',         exp: '4+ Years', skills: ['Reels','Video Editing','Creative Production'] },
  { name: 'Kavita Kumari',  role: 'Business Consultant',            exp: '6+ Years', skills: ['Business Ops','Client Consulting','Growth Planning'] },
  { name: 'Archana Gupta',  role: 'Blog & Content Strategy',        exp: '5+ Years', skills: ['SEO Content','Blog Strategy','Content Planning'] },
  { name: 'Smita C',        role: 'UI & Graphic Designer',          exp: '5+ Years', skills: ['Brand Design','Social Creatives','UI Systems'] },
  { name: 'Amit Singh',     role: 'CRM & Automation Specialist',    exp: '6+ Years', skills: ['Kylas CRM','WhatsApp Automation','Workflows'] },
  { name: 'Nitesh Kumar',   role: 'Performance Marketing',          exp: '5+ Years', skills: ['Google Ads','Meta Ads','Analytics'] },
]

const WHY_STAY = [
  { icon: BarChart3,  title: 'Transparent Reporting',        desc: 'Weekly and monthly dashboards. You always know exactly what\'s working and what needs improvement.' },
  { icon: Globe,      title: 'Local Market Understanding',   desc: 'We know Jharkhand markets — seasonal patterns, buyer behaviour, and local search trends.' },
  { icon: Layers,     title: 'Connected Systems Thinking',   desc: 'We don\'t run isolated campaigns. Every channel is designed to feed the next stage of your pipeline.' },
  { icon: Shield,     title: 'Long-Term Growth Support',     desc: 'Not project-based. We build partnerships focused on compounding growth over 6, 12 and 24 months.' },
  { icon: Zap,        title: 'Execution-Focused Approach',   desc: 'We plan, build, launch and optimise. Real execution — not just strategy decks and presentations.' },
  { icon: Brain,      title: 'Automation Capability',        desc: 'CRM, WhatsApp automation, AI workflows — we build systems that run 24/7 without manual effort.' },
]

const PROCESS_STEPS = [
  { n: '01', icon: Target,    title: 'Strategy Session',  desc: 'Deep-dive into your business, goals, current gaps and competitive landscape.' },
  { n: '02', icon: Layers,    title: 'Growth Blueprint',  desc: 'Design the right connected system — channels, tools, workflows, and priorities.' },
  { n: '03', icon: Zap,       title: 'Implementation',    desc: 'Build, launch and integrate your full growth infrastructure.' },
  { n: '04', icon: BarChart3, title: 'Analysis',          desc: 'Track KPIs, identify what\'s working, spot conversion opportunities.' },
  { n: '05', icon: Activity,  title: 'Reporting',         desc: 'Transparent weekly updates. You always know your numbers.' },
]

const REVIEWS = [
  { name: 'Neha Singh',     biz: 'Zero to Hero Stock Market', stars: 5, text: 'ScalifyLabs transformed our online presence completely. Leads increased 3x in just 2 months!' },
  { name: 'Kavya Shruti',   biz: 'Education Consultant',      stars: 5, text: 'The WhatsApp automation they built saved us hours every single day. Highly recommended.' },
  { name: 'Deepak Chauhan', biz: 'Local Business Owner',      stars: 5, text: 'Our Google Maps ranking went from nowhere to top 3. More walk-ins than ever before.' },
  { name: 'Priya Mishra',   biz: 'Clinic Owner, Ranchi',      stars: 5, text: 'CRM setup was flawless. We never lose a patient enquiry anymore. Great team.' },
]

const FAQS = [
  { q: 'Why choose ScalifyLabs over a traditional agency?', a: 'ScalifyLabs builds connected growth systems — SEO, CRM, WhatsApp automation, ads and websites working together. Traditional agencies run isolated campaigns without connecting the full lead-to-revenue pipeline.' },
  { q: 'What industries does ScalifyLabs work with?', a: 'We work with healthcare clinics, education institutes, real estate developers, retail brands, local businesses, furniture companies, and SMEs across Jharkhand and India.' },
  { q: 'Does ScalifyLabs offer CRM setup?', a: 'Yes. We set up and manage CRM systems including Kylas, TeleCRM and Zoho — integrated with WhatsApp, ads, and lead capture for a complete pipeline.' },
  { q: 'Do you provide SEO services?', a: 'Yes. Technical SEO, local SEO, Google Business Profile optimisation, and content SEO — all designed to drive consistent organic traffic and local visibility.' },
  { q: 'Do you help local businesses in Jharkhand?', a: 'Yes. Local business growth in Ranchi, Jamshedpur, Dhanbad and across Jharkhand is our core strength. We understand local markets, seasonal patterns and buyer behaviour.' },
  { q: 'Do you provide WhatsApp automation?', a: 'Yes. WhatsApp Business API systems with instant lead response, nurture sequences, appointment reminders, and CRM integration.' },
  { q: 'What is a connected growth system?', a: 'A connected growth system links every stage of your customer journey — traffic, website, lead capture, CRM, WhatsApp follow-up, automation, and reporting — so no lead is lost and every channel feeds the next.' },
]

// ─── MINI DASHBOARD (hero right panel) ────────────────────────────────────────
function MiniDashboard() {
  const [tick, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 2500); return () => clearInterval(t) }, [])
  const rows = [
    { label: 'Website Traffic',    val: `${8420 + tick * 38}`,   pct: 68, color: '#2563EB' },
    { label: 'Leads This Month',   val: `${94 + tick * 2}`,      pct: 75, color: '#FF6500' },
    { label: 'CRM Pipeline',       val: `₹${(3.2 + tick * 0.01).toFixed(1)}L`, pct: 55, color: '#7C3AED' },
    { label: 'WhatsApp Responses', val: `${62 + tick}`,          pct: 82, color: '#16A34A' },
    { label: 'Revenue Growth',     val: `+${24 + Math.floor(tick * 0.08)}%`,  pct: 70, color: '#059669' },
  ]
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
      <div className="bg-[#0B0F1E] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#FF6500] rounded-md flex items-center justify-center">
            <span className="text-white text-[9px] font-black">S</span>
          </div>
          <span className="text-white text-xs font-bold">Connected Growth Dashboard</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-green-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />LIVE
        </span>
      </div>
      <div className="p-4 space-y-3">
        {rows.map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 font-medium">{r.label}</span>
              <span className="font-black" style={{ color: r.color }}>{r.val}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(r.pct + tick * 0.5, 95)}%`, background: r.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <div className="bg-[#FFF3E8] rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">All systems connected</span>
          <span className="text-xs font-black text-[#FF6500]">✓ Running 24/7</span>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function WhyScalifyPageClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [activeIndustry, setActiveIndustry] = useState(0)

  return (
    <main className="overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif', color: '#1A1410' }}>

      {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
      <section className="bg-white pt-14 pb-20 lg:pt-20 lg:pb-28 px-4"
        style={{ background: 'linear-gradient(160deg, #ffffff 60%, #FFF9F5 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 border"
                style={{ background: 'rgba(255,101,0,0.06)', borderColor: 'rgba(255,101,0,0.2)', color: '#FF6500' }}>
                Why Businesses Choose ScalifyLabs
              </div>
              <h1 className="font-black leading-[1.1] tracking-tight mb-5 text-[34px] sm:text-[46px] lg:text-[54px]"
                style={{ color: '#0B0F1E' }}>
                We Build Connected Growth Systems —{' '}
                <span style={{ color: '#FF6500' }}>Not Just Marketing Campaigns</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-[520px]" style={{ color: '#57534E' }}>
                Modern businesses need more than SEO, ads or websites in isolation. ScalifyLabs connects traffic, websites, CRM, WhatsApp, automation and reporting into one growth ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact-scalifylabs"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity shadow-lg"
                  style={{ background: '#FF6500', minHeight: 52 }}>
                  Book Growth Consultation <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#how-it-works"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 hover:bg-slate-50 transition-colors"
                  style={{ color: '#0B0F1E', borderColor: '#E8E3DA', minHeight: 52 }}>
                  Explore Growth Systems
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <MiniDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHAT MAKES US DIFFERENT ─────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">The Difference</p>
            <h2 className="font-black text-[28px] sm:text-[38px] lg:text-[44px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Most Vendors Sell Services.<br />We Build Systems.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Traditional */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100" style={{ background: '#F8FAFC' }}>
                <p className="font-bold text-slate-500">Traditional Agency</p>
              </div>
              <div className="p-5 space-y-3">
                {['Runs isolated campaigns','Works with separate vendors','Manual lead follow-up','Limited monthly reporting','Short-term execution focus','No CRM or automation'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-xs font-bold">✕</span>
                    </div>
                    <span className="text-sm text-slate-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* ScalifyLabs */}
            <div className="bg-white rounded-2xl border overflow-hidden shadow-md"
              style={{ borderColor: 'rgba(255,101,0,0.3)' }}>
              <div className="px-5 py-3.5 border-b" style={{ background: 'rgba(255,101,0,0.06)', borderColor: 'rgba(255,101,0,0.15)' }}>
                <p className="font-bold" style={{ color: '#FF6500' }}>ScalifyLabs Growth Systems</p>
              </div>
              <div className="p-5 space-y-3">
                {['Connected SEO + Ads + CRM + WhatsApp','One partner — all systems integrated','Automated CRM workflows & follow-up','Weekly & monthly revenue dashboards','Long-term growth focus','AI + automation across all channels'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(22,163,74,0.1)' }}>
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#0B0F1E' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-[#F4F0E8] transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              See How Growth Systems Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROBLEMS WE SOLVE ─────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Challenges We Solve</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Problems Businesses Commonly Face
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#FAFAF8] rounded-2xl px-4 py-4 border border-slate-100 hover:shadow-sm hover:border-[#FF6500]/20 transition-all">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <span className="text-sm font-semibold" style={{ color: '#0B0F1E' }}>{p.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-semibold" style={{ color: '#57534E' }}>
            Growth often breaks when systems stay disconnected.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: HOW GROWTH SYSTEMS WORK ──────────────────────────── */}
      <section id="how-it-works" className="py-16 lg:py-24 px-4 scroll-mt-20" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">The System</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              How Connected Growth Systems Work
            </h2>
            <p className="text-base mt-3 max-w-[500px] mx-auto" style={{ color: '#57534E' }}>
              Every stage should work together. When they do, leads stop leaking and revenue compounds.
            </p>
          </div>
          {/* Pipeline */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 overflow-x-auto pb-2">
            {PIPELINE.map((item, i) => (
              <div key={item.step} className="flex sm:flex-col items-center gap-2 sm:gap-0 flex-1 min-w-[100px]">
                <div className="flex sm:flex-col items-center sm:mb-3">
                  {i > 0 && <div className="hidden sm:block w-full h-px mb-3" style={{ background: `linear-gradient(to right, ${PIPELINE[i-1].color}40, ${item.color}40)` }} />}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: item.color + '12', border: `2px solid ${item.color}25` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm" style={{ color: '#0B0F1E' }}>{item.step}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#9C9189' }}>{item.sub}</p>
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

      {/* ── SECTION 5: INDUSTRIES ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Industries</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Industries We Support
            </h2>
          </div>
          {/* Tab pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {INDUSTRIES.map((ind, i) => (
              <button key={ind.label} onClick={() => setActiveIndustry(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                style={{
                  background: activeIndustry === i ? '#FF6500' : 'white',
                  borderColor: activeIndustry === i ? '#FF6500' : '#E8E3DA',
                  color: activeIndustry === i ? 'white' : '#57534E',
                }}>
                <ind.icon className="w-4 h-4" />
                {ind.label}
              </button>
            ))}
          </div>
          {/* Active industry detail */}
          {(() => {
            const ind = INDUSTRIES[activeIndustry]
            return (
              <div className="bg-[#FAFAF8] rounded-2xl p-7 border border-slate-100 max-w-[700px] mx-auto">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ind.color}`}>
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl" style={{ color: '#0B0F1E' }}>{ind.label}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500 w-20 shrink-0 pt-0.5">Problem</span>
                    <p className="text-sm text-slate-500">{ind.problem}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider w-20 shrink-0 pt-0.5" style={{ color: '#FF6500' }}>Workflow</span>
                    <p className="text-sm font-mono text-slate-600 text-xs leading-relaxed">{ind.workflow}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600 w-20 shrink-0 pt-0.5">Outcome</span>
                    <p className="text-sm font-semibold text-green-800">{ind.outcome}</p>
                  </div>
                </div>
                {ind.href !== '#' && (
                  <Link href={ind.href}
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-bold hover:gap-2 transition-all"
                    style={{ color: '#FF6500' }}>
                    See {ind.label} Solutions <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── SECTION 6: COMPANY IMPACT ────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Our Impact</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Company Metrics That Matter
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {METRICS.map(m => (
              <div key={m.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: m.color + '12' }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <p className="text-3xl font-black mb-1" style={{ color: m.color, fontFamily: 'Syne, sans-serif' }}>{m.val}</p>
                <p className="text-xs text-slate-500 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: BRANDS MARQUEE ────────────────────────────────────── */}
      <section className="py-10 border-y border-slate-100 bg-white overflow-hidden">
        <p className="text-center text-sm font-semibold text-slate-400 mb-5">Brands & Businesses We Have Worked With</p>
        <div className="flex gap-10 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="text-lg font-black text-slate-200 hover:text-[#FF6500] transition-colors cursor-default shrink-0">{c}</span>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">Experience across education, healthcare, retail and local businesses.</p>
      </section>

      {/* ── SECTION 8: TEAM ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Our Team</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              People Behind ScalifyLabs
            </h2>
            <p className="text-base mt-3 max-w-[500px] mx-auto" style={{ color: '#57534E' }}>
              Specialists working across growth systems, content, CRM and automation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(member => (
              <div key={member.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden">
                {/* Avatar placeholder */}
                <div className="h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F8FAFC, #F0EDE8)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
                    style={{ background: '#FF6500', color: 'white' }}>
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-bold text-[#0B0F1E]">{member.name}</p>
                  <p className="text-xs text-[#FF6500] font-semibold mb-1">{member.role}</p>
                  <p className="text-[10px] font-mono text-slate-400 mb-2.5">{member.exp}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map(skill => (
                      <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                        style={{ borderColor: '#E8E3DA', color: '#57534E', background: '#F8FAFC' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: WHY CLIENTS STAY ──────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Client Retention</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Why Businesses Continue Working With Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_STAY.map((w, i) => (
              <div key={i} className="bg-[#FAFAF8] rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,101,0,0.08)' }}>
                  <w.icon className="w-6 h-6 text-[#FF6500]" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0B0F1E' }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: PROCESS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">How We Work</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Simple Process. Clear Execution.
            </h2>
          </div>
          <div className="grid sm:grid-cols-5 gap-5 relative">
            <div className="hidden sm:block absolute top-10 left-[10%] right-[10%] h-px"
              style={{ background: 'linear-gradient(to right, #FFE4D1, #FF6500, #FFE4D1)' }} />
            {PROCESS_STEPS.map((step, i) => (
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

      {/* ── SECTION 11: REVIEWS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Reviews</p>
            <h2 className="font-black text-[28px] sm:text-[38px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              What Businesses Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#FAFAF8] rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#FF6500] text-[#FF6500]" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#57534E' }}>"{r.text}"</p>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#0B0F1E' }}>{r.name}</p>
                  <p className="text-xs text-slate-400">{r.biz}</p>
                  <p className="text-[10px] text-green-600 font-semibold mt-1">✓ Google Verified</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <a href="https://share.google/XyPWkBexhOxDt2nuA" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-slate-50 transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              Read More Reviews <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: COMMUNITY ────────────────────────────────────────── */}
      <section className="py-12 px-4" style={{ background: '#FFF9F5' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
              style={{ background: '#FFF3E8', color: '#FF6500' }}>
              🌱 Free Community
            </div>
            <h2 className="font-black text-[26px] sm:text-[32px] mb-2" style={{ color: '#0B0F1E' }}>
              Join Jharkhand Growth Adda™
            </h2>
            <p className="text-lg font-semibold text-[#FF6500] mb-3">Local Connections. Digital Growth.</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['Networking','Growth Discussions','Local Opportunities','Business Referrals'].map(b => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full border font-semibold"
                  style={{ background: 'rgba(255,101,0,0.06)', borderColor: 'rgba(255,101,0,0.2)', color: '#FF6500' }}>
                  ✓ {b}
                </span>
              ))}
            </div>
            <Link href="/jharkhand-growth-adda"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: '#FF6500' }}>
              Join Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 px-4"
        style={{ background: 'linear-gradient(135deg, #FFF9F5 0%, #FFF3E8 50%, #FFF9F5 100%)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-5">Get Started</p>
          <h2 className="font-black text-[32px] sm:text-[44px] leading-[1.15] mb-5" style={{ color: '#0B0F1E' }}>
            Ready To Build Growth Systems That Actually Scale?
          </h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed">
            Book a free consultation and see exactly how we'll connect your marketing, CRM, and automation into one consistent growth engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-scalifylabs"
              className="flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-white text-lg hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: '#FF6500' }}>
              Book Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-lg border-2 hover:bg-white transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              <MessageCircle className="w-5 h-5 text-green-600" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 14: FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">FAQs</p>
            <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
                  style={{ minHeight: 56 }}>
                  <span className="font-semibold pr-4" style={{ color: '#0B0F1E' }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}
                    style={{ color: '#FF6500' }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 pt-3 text-sm leading-relaxed border-t border-slate-100" style={{ color: '#57534E' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee CSS */}
      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
    </main>
  )
}
