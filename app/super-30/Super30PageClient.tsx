'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/data'
import { Super30Form } from '@/components/sections/Super30Form'
import {
  CheckCircle2, ArrowRight, Rocket, ChevronDown, Star, Users,
  TrendingUp, BrainCircuit, Database, Search, BarChart3,
  Zap, MessageSquare, Globe, Target, Award, Lightbulb,
  Monitor, BookOpen, GitBranch, Layers, Settings2,
} from 'lucide-react'
import type { Batch } from '@/types/database'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Props { batch: Batch | null; seatsLeft: number }

// ─── PROGRAM DASHBOARD (Hero Visual) ─────────────────────────────────────────

function ProgramDashboard({ batch, seatsLeft }: Props) {
  const batchName = batch?.name || 'Batch 7 · May 2026'
  const totalSeats = batch?.seats || 30
  const filledPct = Math.round(((totalSeats - seatsLeft) / totalSeats) * 100)

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#040d1e] via-[#081B4B] to-[#0c1535] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6 bg-white/2">
          <div className="flex gap-1.5">
            {['bg-red-500/70','bg-amber-400/70','bg-emerald-400/70'].map(c => <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />)}
          </div>
          <div className="flex-1 bg-white/5 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#20C997] animate-pulse" />
            <span className="text-white/30 font-mono text-[0.6rem]">super30.scalifylabs.com</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Batch badge */}
          <div className="flex items-center justify-between">
            <div className="bg-[#FFC72C]/15 border border-[#FFC72C]/30 rounded-xl px-3 py-2">
              <div className="text-[#FFC72C] font-bold text-xs">{batchName}</div>
              <div className="text-white/40 font-mono text-[0.58rem]">Applications Open</div>
            </div>
            <div className="text-right">
              <div className={`font-extrabold text-2xl ${seatsLeft <= 8 ? 'text-red-400' : 'text-[#20C997]'}`}>{seatsLeft}</div>
              <div className="text-white/35 font-mono text-[0.58rem]">seats left</div>
            </div>
          </div>

          {/* Seats progress */}
          <div className="bg-white/5 border border-white/8 rounded-xl p-3">
            <div className="flex justify-between mb-2">
              <span className="text-white/40 text-[0.58rem] font-mono uppercase">Enrollment Progress</span>
              <span className="text-white/60 text-[0.6rem] font-mono">{filledPct}% filled</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-[#FFC72C] rounded-full transition-all" style={{ width: `${filledPct}%` }} />
            </div>
          </div>

          {/* Skills coverage */}
          <div className="bg-white/5 border border-white/8 rounded-xl p-3">
            <div className="text-white/40 text-[0.58rem] font-mono uppercase mb-2">Skills Covered</div>
            {[
              { skill: 'Paid Ads', pct: 95, color: 'bg-blue-400' },
              { skill: 'SEO & Content', pct: 88, color: 'bg-emerald-400' },
              { skill: 'AI Workflows', pct: 85, color: 'bg-violet-400' },
              { skill: 'CRM & Automation', pct: 80, color: 'bg-[#FFC72C]' },
              { skill: 'Analytics', pct: 78, color: 'bg-cyan-400' },
            ].map(s => (
              <div key={s.skill} className="flex items-center gap-2 mb-1.5">
                <span className="text-white/45 text-[0.58rem] w-28 shrink-0">{s.skill}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-white/50 font-mono text-[0.55rem] w-6 text-right">{s.pct}%</span>
              </div>
            ))}
          </div>

          {/* Outcome chips */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: '45 Days', l: 'Duration', c: 'text-blue-400' },
              { v: '30', l: 'Max Seats', c: 'text-[#FFC72C]' },
              { v: '15+', l: 'Yrs Expert', c: 'text-[#20C997]' },
            ].map(s => (
              <div key={s.l} className="bg-white/5 border border-white/8 rounded-xl p-2.5 text-center">
                <div className={`font-extrabold text-base ${s.c}`}>{s.v}</div>
                <div className="text-white/30 text-[0.52rem] font-mono">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Tool exposure */}
          <div className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-400/20 rounded-xl p-3">
            <div className="text-blue-300 font-mono text-[0.6rem] uppercase mb-2">Tool Exposure</div>
            <div className="flex flex-wrap gap-1">
              {['Google Ads','Meta','GA4','ChatGPT','Kylas CRM','SEMrush','WhatsApp API','Make.com'].map(t => (
                <span key={t} className="bg-white/8 text-white/60 text-[0.55rem] font-mono px-2 py-0.5 rounded-full border border-white/10">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -right-3 bg-[#FFC72C] text-[#081B4B] text-[0.62rem] font-extrabold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
        🔥 {seatsLeft} Seats Left
      </div>
      <div className="absolute -bottom-3 -left-3 bg-[#081B4B] border border-white/15 text-white/70 text-[0.62rem] font-mono px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap">
        ⚡ Execution-First · AI-Powered
      </div>
    </div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TOOL_GROUPS = [
  {
    label: 'Ads & Performance',
    color: 'bg-blue-500/15 border-blue-400/30 text-blue-300',
    dot: 'bg-blue-400',
    tools: ['Google Ads','Meta Ads','LinkedIn Ads','YouTube Ads','Google Merchant Center'],
  },
  {
    label: 'SEO',
    color: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
    dot: 'bg-emerald-400',
    tools: ['Ahrefs','SEMrush','Ubersuggest','Google Search Console','Screaming Frog'],
  },
  {
    label: 'Analytics',
    color: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
    dot: 'bg-amber-400',
    tools: ['Google Analytics 4','Google Tag Manager','Hotjar','Microsoft Clarity'],
  },
  {
    label: 'AI Tools',
    color: 'bg-violet-500/15 border-violet-400/30 text-violet-300',
    dot: 'bg-violet-400',
    tools: ['ChatGPT','Claude','Gemini','Midjourney','Canva AI','Leonardo AI','Perplexity'],
  },
  {
    label: 'CRM & Automation',
    color: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
    dot: 'bg-cyan-400',
    tools: ['Zoho CRM','Bitrix24','TeleCRM','Kylas CRM','Zapier','Make.com'],
  },
  {
    label: 'Content & Design',
    color: 'bg-pink-500/15 border-pink-400/30 text-pink-300',
    dot: 'bg-pink-400',
    tools: ['Canva','Mailchimp','Buffer','Hootsuite','Notion'],
  },
  {
    label: 'WhatsApp & Sales',
    color: 'bg-green-500/15 border-green-400/30 text-green-300',
    dot: 'bg-green-400',
    tools: ['WhatsApp Business API','WATI','Interakt'],
  },
  {
    label: 'Website',
    color: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300',
    dot: 'bg-indigo-400',
    tools: ['WordPress','Elementor'],
  },
]

const PHASES = [
  {
    phase: 1, week: 'Week 1', icon: Lightbulb, color: 'from-blue-500 to-blue-600', border: 'border-blue-400/30',
    title: 'Digital Growth Foundations',
    topics: ['Digital Business Ecosystem','Marketing Funnel Basics','Lead Generation','Traffic Sources','Performance Marketing','AI Workflow Systems','Growth Mindset'],
    practical: ['Funnel Breakdown Exercise','Competitor Research','Customer Journey Mapping'],
  },
  {
    phase: 2, week: 'Week 1–2', icon: Monitor, color: 'from-cyan-500 to-cyan-600', border: 'border-cyan-400/30',
    title: 'Website & Landing Page Systems',
    topics: ['WordPress Overview','AI-Assisted Building','Landing Page Structure','Lead Capture Forms','Mobile Optimization','Conversion Thinking','Funnel Design'],
    practical: ['Landing Page Setup','Website Structure Planning','Lead Capture Optimization'],
  },
  {
    phase: 3, week: 'Week 2–3', icon: TrendingUp, color: 'from-violet-500 to-violet-600', border: 'border-violet-400/30',
    title: 'Performance Marketing Execution',
    topics: ['Google Ads','Search + Display Ads','YouTube Ads','Meta Ads','Facebook & Instagram','Audience Targeting','Campaign Structure','Retargeting','Conversion Tracking'],
    practical: ['Live Campaign Setup','Ad Account Walkthroughs','Funnel-Based Campaign Planning'],
  },
  {
    phase: 4, week: 'Week 3', icon: Search, color: 'from-emerald-500 to-emerald-600', border: 'border-emerald-400/30',
    title: 'SEO & Organic Visibility Systems',
    topics: ['SEO Fundamentals','Keyword Research','On-Page SEO','Technical SEO','Local SEO','Google Business Profile','Content SEO','Blog Strategy','Search Intent'],
    practical: ['SEO Audit Exercise','Keyword Planning','Google Business Optimization'],
  },
  {
    phase: 5, week: 'Week 3–4', icon: BrainCircuit, color: 'from-purple-500 to-pink-500', border: 'border-purple-400/30',
    title: 'AI Tools & Content Workflows',
    topics: ['AI Productivity Workflows','AI Content Generation','Prompt Engineering','AI Ad Creatives','AI Image Generation','Workflow Automation','Content Repurposing'],
    practical: ['AI Workflow Creation','Prompt-Building Exercises','Content Systems Setup'],
  },
  {
    phase: 6, week: 'Week 4', icon: Database, color: 'from-amber-500 to-orange-500', border: 'border-amber-400/30',
    title: 'CRM, Lead Management & Automation',
    topics: ['CRM Fundamentals','Lead Management','WhatsApp Automation','Funnel Automation','Lead Nurturing','Sales Pipeline','Multi-Channel Lead Handling'],
    platforms: ['Kylas','TeleCRM','Bitrix24','Zoho CRM','Make.com','Zapier'],
    practical: ['CRM Workflow Walkthrough','Automation Funnel Planning','Lead Tracking Systems'],
  },
  {
    phase: 7, week: 'Week 5', icon: BarChart3, color: 'from-sky-500 to-sky-600', border: 'border-sky-400/30',
    title: 'Analytics, Tracking & Growth Measurement',
    topics: ['Marketing Analytics','Campaign Tracking','GA4','Google Tag Manager','UTM Tracking','Lead Attribution','Reporting Dashboards'],
    practical: ['Analytics Interpretation','Campaign Performance Analysis','Reporting Exercises'],
  },
  {
    phase: 8, week: 'Week 5–6', icon: Layers, color: 'from-rose-500 to-red-500', border: 'border-rose-400/30',
    title: 'Business Growth Thinking & Strategy',
    topics: ['Business Growth Thinking','Offer Positioning','Funnel Strategy','Customer Psychology','Growth System Design','Client Communication','Solution-Based Approach'],
    practical: ['Business Strategy Case Studies','Growth System Mapping','Client Pitch Practice'],
  },
  {
    phase: 9, week: 'Final Week', icon: Award, color: 'from-[#FFC72C] to-amber-500', border: 'border-[#FFC72C]/30',
    title: 'Portfolio, Certifications & Career Prep',
    topics: ['Resume Building','LinkedIn Optimization','Portfolio Development','Campaign Case Studies','Freelancing Positioning','Personal Branding'],
    certifications: ['Google','SEMrush','Meta','HubSpot','Analytics'],
    practical: ['LinkedIn Review','Mock Interviews','Portfolio Review'],
  },
]

const TESTIMONIALS = [
  { name: 'Priya Kumari', role: 'Digital Marketer · Ranchi', rating: 5, text: 'Super 30 changed how I think about marketing. The AI tools module and CRM setup gave me skills that no online course taught. Got placed within 45 days of completing.', tag: 'Placement' },
  { name: 'Rohit Sharma', role: 'Freelancer · Jamshedpur', rating: 5, text: 'I was running Google Ads without understanding the funnel. After Super 30, I now run campaigns for 3 clients with measurable ROAS. Doubled my freelance income.', tag: 'Freelancing' },
  { name: 'Anjali Verma', role: 'Business Owner · Dhanbad', rating: 5, text: 'My coaching institute was struggling with digital leads. Arvind\'s program helped me understand the full system — Meta Ads + WhatsApp automation together = 5× more admissions.', tag: 'Business Growth' },
  { name: 'Akash Singh', role: 'Agency Founder · Patna', rating: 5, text: 'The CRM module and execution-first approach set this apart from every other course. Built my agency within 3 months of completing Super 30. Real skills, real results.', tag: 'Agency Launch' },
]

const CLIENTS = ['Brands Outlet','Sri Sidhi Vinayak & Co.','SD Plaso Fab','GC Ceramics','Dheya','City Health Guide','Lakshyarth','CareerBloom']

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Super30PageClient({ batch, seatsLeft }: Props) {
  const [openPhase, setOpenPhase] = useState<number | null>(null)

  const batchStart = batch?.start_date
    ? new Date(batch.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'May 2026'
  const appClose = batch?.app_close
    ? new Date(batch.app_close).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })
    : 'Soon'

  return (
    <>
      {/* ══ SECTION 1 — HERO ════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#081B4B] via-[#0a1a42] to-[#0B0F1E] overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_25%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,199,44,0.04),transparent_45%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_480px] gap-14 items-center">

            {/* Left */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <span className="inline-flex items-center gap-2 bg-[#FFC72C]/15 border border-[#FFC72C]/30 text-[#FFC72C] font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC72C] animate-pulse" />
                  Built in Jharkhand · Designed for Modern Growth Careers
                </span>
                {seatsLeft <= 10 && (
                  <span className="bg-red-500 text-white text-[0.62rem] font-bold px-3 py-1 rounded-full animate-pulse">
                    Only {seatsLeft} seats left!
                  </span>
                )}
              </div>

              <h1 className="font-extrabold text-4xl lg:text-[3.2rem] text-white leading-[1.15] tracking-tight mb-5">
                Become the{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Full Stack</span>{' '}
                <span className="bg-gradient-to-r from-[#FFC72C] to-orange-400 bg-clip-text text-transparent">Growth</span>{' '}
                Marketer<br />Businesses Actually Need
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-[540px]">
                Master paid ads, SEO, <span className="text-cyan-400 font-semibold">AI workflows</span>, CRM automation, analytics, websites, content systems, and business growth strategy — in one execution-focused program built for the modern digital economy.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['15+ Years Industry Experience','AI-Powered Curriculum','Real Campaign Exposure','Execution-Based Learning','Business-Focused Training'].map(b => (
                  <div key={b} className="flex items-center gap-1.5 bg-white/6 border border-white/12 rounded-full px-3 py-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#20C997] shrink-0" />
                    <span className="text-white/60 text-xs">{b}</span>
                  </div>
                ))}
              </div>

              {/* Batch info strip */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex flex-wrap gap-4">
                {[
                  { label: 'Batch Start', value: batchStart },
                  { label: 'Mode', value: batch?.mode === 'offline' ? 'Offline · Ranchi' : batch?.mode || 'Offline · Ranchi' },
                  { label: 'Applications Close', value: appClose },
                  { label: 'Seats', value: `${seatsLeft} of ${batch?.seats || 30} left` },
                ].map(info => (
                  <div key={info.label} className="min-w-0">
                    <div className="text-white/30 font-mono text-[0.58rem] uppercase tracking-wider">{info.label}</div>
                    <div className="text-white font-semibold text-sm">{info.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#apply"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#FFC72C] to-orange-400 text-[#081B4B] font-extrabold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(255,199,44,0.35)] hover:shadow-[0_6px_32px_rgba(255,199,44,0.50)] hover:-translate-y-0.5 transition-all text-sm">
                  <Rocket className="w-4 h-4" />
                  Apply for Super 30
                </a>
                <a href="#curriculum"
                  className="flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl hover:bg-white/8 transition-all text-sm">
                  View Curriculum <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right — Program Dashboard */}
            <div className="hidden lg:block">
              <ProgramDashboard batch={batch} seatsLeft={seatsLeft} />
            </div>
          </div>

          {/* Client strip */}
          <div className="mt-16 pt-8 border-t border-white/8">
            <p className="text-white/25 font-mono text-[0.62rem] uppercase tracking-widest mb-4 text-center">Trusted by growing businesses and ambitious founders</p>
            <div className="flex flex-wrap justify-center gap-3">
              {CLIENTS.map(c => (
                <span key={c} className="bg-white/6 border border-white/10 text-white/40 font-medium text-xs px-4 py-2 rounded-xl hover:border-white/25 hover:text-white/60 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — OUTCOMES ════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Purpose-Built Program</p>
            <h2 className="font-extrabold text-4xl text-[#081B4B] mb-3">Why Super 30 Is Built for<br />Modern Growth Careers</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              This program prepares you for the modern digital ecosystem where businesses need execution-focused marketers who understand <strong>systems</strong> — not just isolated tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Perfect For */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#FFC72C]/15 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC72C]" />
                </div>
                <h3 className="font-bold text-[#081B4B] text-lg">Perfect For You If…</h3>
              </div>
              <div className="space-y-3">
                {[
                  'You want high-income digital marketing skills',
                  'You want freelancing & remote work opportunities',
                  'You want job-ready execution capabilities',
                  'You want to work with real businesses',
                  'You want to become AI-ready in marketing',
                  'You want to build a strong personal brand',
                  'You want to grow local or regional businesses',
                ].map(p => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#20C997]/15 flex items-center justify-center mt-0.5 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-[#20C997]" />
                    </div>
                    <span className="text-slate-600 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-gradient-to-br from-[#081B4B] to-[#0d2060] rounded-3xl p-8 text-white">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-400/15 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg">What You&apos;ll Master…</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Paid Ads', icon: TrendingUp, color: 'bg-blue-400/15 text-blue-400' },
                  { label: 'SEO Systems', icon: Search, color: 'bg-emerald-400/15 text-emerald-400' },
                  { label: 'AI Workflows', icon: BrainCircuit, color: 'bg-violet-400/15 text-violet-400' },
                  { label: 'CRM & Automation', icon: Database, color: 'bg-[#FFC72C]/15 text-[#FFC72C]' },
                  { label: 'Analytics', icon: BarChart3, color: 'bg-cyan-400/15 text-cyan-400' },
                  { label: 'Content Systems', icon: Layers, color: 'bg-pink-400/15 text-pink-400' },
                  { label: 'WhatsApp Automation', icon: MessageSquare, color: 'bg-green-400/15 text-green-400' },
                  { label: 'Growth Strategy', icon: Target, color: 'bg-saffron/15 text-saffron' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA banner */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-[#FFC72C] p-0.5 rounded-2xl shadow-lg">
            <div className="bg-[#081B4B] rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white font-semibold text-lg text-center sm:text-left">
                &ldquo;Learn to think like a <span className="text-[#FFC72C]">growth strategist</span> — not just a tool operator.&rdquo;
              </p>
              <a href="#apply"
                className="shrink-0 flex items-center gap-2 bg-[#FFC72C] text-[#081B4B] font-extrabold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap">
                Apply for Next Batch <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — TOOLS ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Industry-Standard Exposure</p>
            <h2 className="font-extrabold text-4xl text-[#081B4B] mb-3">Master Real Industry Tools</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Hands-on exposure to the tools modern businesses actually use — not outdated textbook examples.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOOL_GROUPS.map(group => (
              <div key={group.label} className={`border rounded-2xl p-5 ${group.color}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${group.dot}`} />
                  <span className="font-bold text-xs uppercase tracking-wider">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map(tool => (
                    <span key={tool}
                      className="bg-white/10 border border-white/20 text-white/80 text-[0.65rem] font-mono px-2.5 py-1.5 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all cursor-default">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — CURRICULUM ROADMAP ════════════════════════════════════ */}
      <section id="curriculum" className="bg-[#F5F7FB] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Learning Journey</p>
            <h2 className="font-extrabold text-4xl text-[#081B4B] mb-3">45-Day Full Stack<br />Growth Learning Roadmap</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Structured to build execution ability step-by-step — from digital foundations to real campaign management, automation systems, AI workflows, and business strategy thinking.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 via-[#FFC72C] to-[#20C997] opacity-40" />

            <div className="space-y-4">
              {PHASES.map((phase) => (
                <div key={phase.phase} className="md:pl-20 relative">
                  {/* Phase number on line */}
                  <div className={`hidden md:flex absolute left-0 top-5 w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} items-center justify-center shadow-lg z-10`}>
                    <div className="text-center">
                      <div className="text-white font-extrabold text-xl leading-none">{phase.phase < 10 ? `0${phase.phase}` : phase.phase}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenPhase(openPhase === phase.phase ? null : phase.phase)}
                    className={`w-full text-left bg-white border ${phase.border} rounded-2xl p-5 hover:shadow-md transition-all duration-200 group`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {/* Mobile phase badge */}
                        <div className={`md:hidden w-10 h-10 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shrink-0`}>
                          <phase.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="bg-[#F5F7FB] text-slate-500 font-mono text-[0.62rem] px-2.5 py-0.5 rounded-full border border-slate-200">{phase.week}</span>
                            <span className="text-slate-300 text-xs">Phase {phase.phase}</span>
                          </div>
                          <h3 className="font-bold text-[#081B4B] text-base group-hover:text-blue-700 transition-colors">{phase.title}</h3>

                          {/* Topic pills always visible */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {phase.topics.slice(0, 5).map(t => (
                              <span key={t} className="bg-[#F5F7FB] text-slate-500 text-[0.6rem] font-mono px-2 py-0.5 rounded-full border border-slate-200">{t}</span>
                            ))}
                            {phase.topics.length > 5 && (
                              <span className="text-blue-500 text-[0.62rem] font-mono">+{phase.topics.length - 5} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-200 ${openPhase === phase.phase ? 'rotate-180 text-blue-500' : ''}`} />
                    </div>

                    {/* Expanded content */}
                    {openPhase === phase.phase && (
                      <div className="mt-5 pt-5 border-t border-slate-100 grid sm:grid-cols-2 gap-4 text-left">
                        <div>
                          <p className="text-[#081B4B] font-bold text-xs uppercase tracking-wider mb-2">All Topics</p>
                          <div className="flex flex-wrap gap-1.5">
                            {phase.topics.map(t => (
                              <span key={t} className="bg-blue-50 text-blue-700 border border-blue-100 text-[0.62rem] font-mono px-2.5 py-1 rounded-full">{t}</span>
                            ))}
                          </div>
                          {'platforms' in phase && phase.platforms && (
                            <div className="mt-3">
                              <p className="text-[#081B4B] font-bold text-xs uppercase tracking-wider mb-2">Platforms</p>
                              <div className="flex flex-wrap gap-1.5">
                                {(phase as typeof phase & { platforms: string[] }).platforms.map(p => (
                                  <span key={p} className="bg-amber-50 text-amber-700 border border-amber-100 text-[0.62rem] font-mono px-2.5 py-1 rounded-full">{p}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {'certifications' in phase && phase.certifications && (
                            <div className="mt-3">
                              <p className="text-[#081B4B] font-bold text-xs uppercase tracking-wider mb-2">Certification Support</p>
                              <div className="flex flex-wrap gap-1.5">
                                {(phase as typeof phase & { certifications: string[] }).certifications.map(c => (
                                  <span key={c} className="bg-[#20C997]/10 text-[#20C997] border border-[#20C997]/20 text-[0.62rem] font-mono px-2.5 py-1 rounded-full">{c}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-[#081B4B] font-bold text-xs uppercase tracking-wider mb-2">Practical Exercises</p>
                          <div className="space-y-1.5">
                            {phase.practical.map(p => (
                              <div key={p} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#20C997] shrink-0" />
                                <span className="text-slate-600 text-xs">{p}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap closing message */}
          <div className="mt-12 bg-gradient-to-br from-[#081B4B] to-[#0d2060] rounded-2xl p-7 text-white">
            <h3 className="font-bold text-lg mb-3 text-[#FFC72C]">Program Outcome</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              By the end of Super 30, participants will understand how modern growth systems work together across:
            </p>
            <div className="flex flex-wrap gap-2">
              {['Websites','Paid Ads','SEO','AI Workflows','CRM Systems','Automation','Analytics','Lead Nurturing','Business Growth Strategy'].map(s => (
                <span key={s} className="bg-white/8 border border-white/15 text-white/70 text-xs font-mono px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — TESTIMONIALS ════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Real Stories</p>
            <h2 className="font-extrabold text-4xl text-[#081B4B]">What Learners & Businesses Say</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-[#F5F7FB] border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#081B4B] to-blue-700 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#081B4B] font-bold text-xs">{t.name}</p>
                      <p className="text-slate-400 text-[0.62rem] font-mono">{t.role}</p>
                    </div>
                  </div>
                  <span className="bg-[#20C997]/10 text-[#20C997] text-[0.58rem] font-bold px-2 py-0.5 rounded-full border border-[#20C997]/20">{t.tag}</span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#FFC72C] fill-[#FFC72C]" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — FOUNDER STORY ══════════════════════════════════════ */}
      <section className="bg-[#F5F7FB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Your Mentor</p>
            <h2 className="font-extrabold text-3xl text-[#081B4B]">Learn From Someone Who Has Built<br />Growth Systems for Years</h2>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start">

            {/* Founder visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#081B4B] to-[#0d2060] rounded-3xl border border-white/10 p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,199,44,0.08),transparent_60%)]" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden relative mb-5 shadow-xl shadow-saffron/25 border-2 border-saffron/30">
                    <Image src="/founder.jpg" alt="Arvind Gupta" fill className="object-cover object-top" sizes="112px" />
                  </div>
                  <h3 className="font-extrabold text-xl text-white mb-1">Arvind Gupta</h3>
                  <p className="text-[#FFC72C] font-mono text-sm mb-1">Founder, Scalify Labs</p>
                  <p className="text-white/50 text-xs mb-5">Performance Marketing · CRM · AI · Growth Systems</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                      { v: '15+', l: 'Years Exp' },
                      { v: '100+', l: 'Businesses' },
                      { v: '5000+', l: 'Students' },
                      { v: '10K+', l: 'Leads Gen' },
                    ].map(s => (
                      <div key={s.l} className="bg-white/8 border border-white/12 rounded-xl p-3 text-center">
                        <div className="text-[#FFC72C] font-extrabold text-lg">{s.v}</div>
                        <div className="text-white/40 text-[0.6rem] font-mono">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div>
              <p className="text-[#081B4B] font-bold text-lg mb-4">Arvind Gupta has spent 15+ years building growth systems across education, EdTech, performance marketing, CRM automation, and AI-powered business workflows.</p>

              <p className="text-slate-600 leading-relaxed mb-4">
                Before founding Scalify Labs, he played a key role in building one of India&apos;s largest mentor ecosystems at <strong className="text-[#081B4B]">Dheya</strong> — helping scale a nationwide mentoring community with thousands of student interactions and digital outreach systems.
              </p>

              <p className="text-slate-600 leading-relaxed mb-6">
                His mission with Super 30 is simple: <strong className="text-[#081B4B]">prepare execution-focused growth professionals</strong> who understand the full digital ecosystem — not just individual tools — and can create real business impact from day one.
              </p>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6">
                <p className="text-[#081B4B] font-bold text-sm mb-3">The Super 30 Philosophy</p>
                <div className="space-y-2.5">
                  {[
                    'Teach how businesses actually work — not just how platforms work',
                    'Build execution habits before teaching theory',
                    'Connect every skill to a business outcome',
                    'Train for the AI-powered digital economy — not 2019\'s digital marketing',
                  ].map(p => (
                    <div key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#20C997] shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href="#apply"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC72C] to-orange-400 text-[#081B4B] font-extrabold px-7 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(255,199,44,0.30)] hover:-translate-y-0.5 transition-all text-sm">
                <Rocket className="w-4 h-4" />
                Learn Directly from Arvind
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — FINAL CTA + FORM ═══════════════════════════════════ */}
      <section id="apply" className="relative bg-gradient-to-br from-[#081B4B] via-[#0a1a42] to-[#0B0F1E] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(59,130,246,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgba(255,199,44,0.06),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '38px 38px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_480px] gap-14 items-start">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-[#FFC72C]/15 border border-[#FFC72C]/30 text-[#FFC72C] font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-7">
                <Rocket className="w-3.5 h-3.5" />
                Limited Seats — Apply Now
              </span>

              <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-5">
                Ready to Build Real<br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-[#FFC72C] bg-clip-text text-transparent">
                  Digital Growth Skills?
                </span>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
                Join a practical execution-focused learning system designed for the modern AI-powered business economy. Only 30 seats per batch — by selection only.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: CheckCircle2, text: '45-day intensive execution program', color: 'text-[#20C997]' },
                  { icon: CheckCircle2, text: 'Real campaign execution — not just theory', color: 'text-[#20C997]' },
                  { icon: CheckCircle2, text: 'AI tools, CRM, ads, SEO — all covered', color: 'text-[#20C997]' },
                  { icon: CheckCircle2, text: 'Laptop mandatory · Offline in Ranchi', color: 'text-[#20C997]' },
                  { icon: CheckCircle2, text: 'Selection-based — limited to 30 students', color: 'text-[#20C997]' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/918788424727?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20Super%2030`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold px-5 py-3 rounded-xl hover:bg-[#25D366]/22 transition-all text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Talk on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — Application Form */}
            <div>
              <Super30Form batchId={batch?.id || 'default'} seatsLeft={seatsLeft} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
