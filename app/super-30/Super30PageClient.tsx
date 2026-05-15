'use client'

import { useState } from 'react'
import Image from 'next/image'
import { submitS30Application } from '@/lib/actions'
import { trackS30Application } from '@/lib/analytics'
import {
  ArrowRight, Check, X, ChevronDown, ChevronRight,
  Users, Clock, Laptop, Award, Target, Zap,
  BookOpen, BarChart3, MessageCircle, Globe,
  GraduationCap, Briefcase, Shield,
} from 'lucide-react'

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  bg: '#FFFDF9', cream: '#FFF9F2', orange: '#FF6500', navy: '#0B0F1E',
  text: '#1A1410', sub: '#57534E', border: '#E8E3DA', white: '#FFFFFF',
  green: '#16A34A', red: '#DC2626', blue: '#2563EB', purple: '#7C3AED',
}
const WA = '918788424727'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FOR_YOU = [
  'Educated housewife restarting her career',
  'Unemployed & job-seeking youth',
  'Govt exam aspirant exploring new career',
  'College student who wants future-ready skills',
  'Working professional in low-paying job',
  'Freelancer or small business owner',
]
const NOT_FOR_YOU = [
  'Want shortcuts or quick-money tricks',
  'Want only certificates without learning',
  "Can't commit 4–5 hrs daily for 45 days",
  "Don't have a laptop",
  'Want placement guarantee without effort',
  'Looking for passive learning',
]

const STRUGGLES = [
  { icon: '🎬', title: 'No Real Execution',      desc: 'Watching videos won\'t make you job ready.' },
  { icon: '📜', title: 'Too Many Certificates',  desc: 'Employers hire skills, not certificates.' },
  { icon: '💼', title: 'No Portfolio',            desc: 'No proof of work. No opportunities.' },
  { icon: '🧭', title: 'No Mentor',               desc: 'Learning alone is slow and confusing.' },
  { icon: '💬', title: 'Weak Communication',      desc: 'Can\'t explain, present or solve real problems.' },
  { icon: '🧠', title: 'No Business Thinking',   desc: 'Learn tools, not how business actually grows.' },
]

const WHY_EXISTS = [
  { icon: '🤖', label: 'AI Tools' },
  { icon: '📊', label: 'Ads' },
  { icon: '🔍', label: 'SEO' },
  { icon: '🌐', label: 'Websites' },
  { icon: '🗂️', label: 'CRM' },
  { icon: '⚡', label: 'Automation' },
  { icon: '🗂️', label: 'Portfolio' },
  { icon: '💡', label: 'Business Thinking' },
]

const MINI_PROOF = [
  { val: '45 Days', label: 'Intensive' },
  { val: '30', label: 'Learners Only' },
  { val: 'Offline', label: 'Batch' },
  { val: 'Laptop', label: 'Mandatory' },
  { val: 'Selection', label: 'Based' },
  { val: 'Portfolio', label: 'Focused' },
]

const SELECTION_STEPS = [
  { n: '1', title: 'Application',         desc: 'Fill basic details & tell us about yourself.' },
  { n: '2', title: 'Psychometric Test',   desc: 'We assess your thinking, aptitude & learning potential.' },
  { n: '3', title: 'Personal Interview',  desc: 'We understand your goals, commitment & background.' },
  { n: '4', title: 'Selection',           desc: 'Only 30 learners will be selected.' },
  { n: '5', title: 'Admission',           desc: 'Pay fee & complete admission.' },
  { n: '6', title: '45-Day Execution',    desc: 'Build. Practice. Transform.' },
]

const BATCH_TIMELINE = [
  'Applications Open', 'Assessment', 'Interview', 'Selection', 'Admission', 'Batch Start', 'Portfolio', 'Career Launch'
]

const CURRICULUM = [
  { n: '01', title: 'Growth Foundations',     desc: 'Basics of digital marketing, funnels, business models & consumer behavior.' },
  { n: '02', title: 'Web Dev with AI & WordPress', desc: 'Build websites, landing pages & optimise.' },
  { n: '03', title: 'Performance Marketing',  desc: 'Google Ads, Meta Ads, campaign setup, targeting & retargeting.' },
  { n: '04', title: 'SEO & Local SEO',        desc: 'Keyword research, on-page, technical SEO & local rankings.' },
  { n: '05', title: 'AI Tools & Content',     desc: 'AI tools, prompt engineering, content creation & automation.' },
  { n: '06', title: 'CRM + WA + Email Automation', desc: 'CRM setup, lead management, WhatsApp & email automation.' },
  { n: '07', title: 'Analytics & Tracking',   desc: 'GA4, GTM, event tracking, dashboards & reporting.' },
  { n: '08', title: 'Business Strategy',      desc: 'Client handling, growth strategy, offer creation & problem solving.' },
  { n: '09', title: 'Career Launch',          desc: 'Resume, LinkedIn, portfolio, interview prep & freelancing / business setup.' },
]

const TOOLS = [
  { cat: 'Ads', tools: ['Google Ads', 'Meta Ads'] },
  { cat: 'SEO', tools: ['Semrush', 'Ahrefs'] },
  { cat: 'AI & Content', tools: ['ChatGPT', 'Claude', 'Canva'] },
  { cat: 'Automation', tools: ['Zapier', 'Make.com'] },
  { cat: 'CRM', tools: ['Kylas CRM', 'TeleCRM'] },
  { cat: 'Analytics', tools: ['GA4', 'Tag Manager'] },
  { cat: 'Website', tools: ['WordPress', 'Elementor'] },
  { cat: 'Communication', tools: ['WhatsApp Business', 'Mailchimp'] },
]

const JOURNEY = [
  { icon: BookOpen, label: 'Learn Foundations' },
  { icon: Target,   label: 'Build Real Projects' },
  { icon: Zap,      label: 'Master AI + Tools' },
  { icon: Award,    label: 'Create Portfolio' },
  { icon: Users,    label: 'Interview Preparation' },
  { icon: Briefcase,label: 'Get Hired / Freelance' },
]

const ROLES = [
  'Performance Marketer', 'SEO Specialist', 'Growth Executive',
  'Ads Specialist', 'CRM Automation Specialist', 'Marketing Automation Executive',
  'AI Content Creator', 'Local SEO Specialist', 'Digital Marketing Executive',
  'Freelancer / Consultant', 'Website Executive', 'Business Owner',
]

const FAQS = [
  { q: 'Is laptop mandatory?', a: 'Yes. A personal laptop is mandatory throughout the 45-day program. You will use it for live campaign execution, tool practice, and portfolio building.' },
  { q: 'Do I need any prior experience?', a: 'No prior experience required. Selection is based on psychometric assessment, interview, and motivation — not prior knowledge.' },
  { q: 'Can housewives join?', a: 'Yes. Super 30 welcomes homemakers, students, working professionals, and aspiring freelancers.' },
  { q: 'Is this a placement guarantee program?', a: 'No. We provide career support, interview prep, and portfolio building. Outcomes depend on your effort and execution.' },
  { q: 'Do I need coding knowledge?', a: 'No. The program focuses on digital marketing execution — ads, SEO, AI tools, CRM, and automation — no coding needed.' },
  { q: 'What if I am not selected?', a: 'If not selected, you may reapply after 6 months for the next batch. We provide feedback on your assessment.' },
  { q: 'Will I get certificates?', a: 'Yes. Super 30 Completion Certificate plus guidance on Google, Semrush, and Meta certification exams.' },
  { q: 'Can I start freelancing after this program?', a: 'Yes. Portfolio building, client pitch practice, and freelance setup are part of the Career Launch module.' },
]

// ─── 3-STEP APPLICATION FORM ──────────────────────────────────────────────────
function EligibilityForm({ onSuccess }: { onSuccess?: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    // Step 1 — Basic Info
    name: '', phone: '', email: '', city: '', age: '',
    // Step 2 — Background
    status: '', education: '', has_laptop: '', hours_per_day: '',
    // Step 3 — Motivation
    why_join: '', goal_1yr: '', heard_from: '', commitment: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const inp = 'w-full bg-white border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1A1410] focus:outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[rgba(255,101,0,0.1)] transition-all'
  const lbl = 'block text-[10px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5'

  function RadioRow({ label, field, options }: { label: string; field: keyof typeof form; options: string[] }) {
    return (
      <div>
        <label className={lbl}>{label}</label>
        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => set(field, opt)}
              className="px-3 py-2 rounded-xl border text-xs font-medium transition-all"
              style={{ background: form[field] === opt ? 'rgba(255,101,0,0.08)' : 'white', borderColor: form[field] === opt ? 'rgba(255,101,0,0.4)' : '#E8E3DA', color: form[field] === opt ? C.orange : '#57534E', fontWeight: form[field] === opt ? 700 : 400 }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    )
  }

  async function handleFinalSubmit() {
    if (!form.commitment) { setError('Please confirm your commitment to continue.'); return }
    setSubmitting(true); setError('')
    try {
      await submitS30Application({
        name: form.name.trim(), phone: form.phone.trim(),
        email: form.email || '',
        occupation: form.status,
        education: form.education,
        city: form.city,
        why_join: form.why_join,
        one_year_goal: form.goal_1yr,
        batch_id: '',
      })
      trackS30Application()
      setSubmitted(true)
      onSuccess?.()
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  if (submitted) return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <p className="font-black text-xl text-[#1A1410] mb-2">Application Submitted! 🎉</p>
      <p className="text-sm text-[#57534E] mb-1">Our team will call you within 24 hours on WhatsApp.</p>
      <p className="text-xs text-[#9C9189]">If selected, you'll receive a counselling call within 48 hours.</p>
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi, I just applied for Super 30. My name is ' + form.name)}`}
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
        style={{ background: '#25D366' }}>
        💬 Message Us on WhatsApp
      </a>
    </div>
  )

  // Step progress indicator
  const steps = [
    { n: 1, label: 'Basic Info' },
    { n: 2, label: 'Background' },
    { n: 3, label: 'Motivation' },
  ]

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-6">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all"
                style={{ background: step >= s.n ? C.orange : '#E8E3DA', color: step >= s.n ? 'white' : '#9C9189' }}>
                {step > s.n ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <p className="text-[9px] font-semibold mt-1 hidden sm:block" style={{ color: step >= s.n ? C.orange : '#9C9189' }}>{s.label}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 rounded-full transition-all"
                style={{ background: step > s.n ? C.orange : '#E8E3DA' }} />
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: Basic Info ── */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-[#1A1410] mb-4">Let's start with your basic details</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Full Name *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className={inp} />
            </div>
            <div>
              <label className={lbl}>WhatsApp Number *</label>
              <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inp} />
            </div>
            <div>
              <label className={lbl}>Email Address</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" className={inp} />
            </div>
            <div>
              <label className={lbl}>Your City *</label>
              <input required value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Ranchi" className={inp} />
            </div>
            <div>
              <label className={lbl}>Your Age</label>
              <input type="number" min="16" max="50" value={form.age} onChange={e => set('age', e.target.value)} placeholder="e.g. 22" className={inp} />
            </div>
          </div>
          <button
            onClick={() => { if (!form.name.trim() || !form.phone.trim() || !form.city.trim()) { setError('Please fill Name, WhatsApp & City.'); return; } setError(''); setStep(2) }}
            className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: C.orange }}>
            Continue to Step 2 <ArrowRight className="w-5 h-5" />
          </button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>
      )}

      {/* ── STEP 2: Background ── */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-[#1A1410] mb-4">Tell us about your background</p>
          <RadioRow label="Current Status *" field="status" options={['Student','Fresh Graduate','Working Professional','Homemaker','Freelancer','Business Owner','Job Seeker']} />
          <div>
            <label className={lbl}>Highest Education</label>
            <select value={form.education} onChange={e => set('education', e.target.value)} className={inp}>
              <option value="">Select your education…</option>
              <option>10th / High School</option>
              <option>12th / Intermediate</option>
              <option>Pursuing Graduation</option>
              <option>Graduate (Any Stream)</option>
              <option>Post Graduate</option>
              <option>Diploma</option>
            </select>
          </div>
          <RadioRow label="Do You Have a Laptop? *" field="has_laptop" options={['Yes, I own one', 'No, I need to arrange']} />
          <RadioRow label="Hours Available Daily for Program" field="hours_per_day" options={['2–3 hours', '4–5 hours', '6+ hours']} />
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2 hover:bg-[#F4F0E8] transition-colors" style={{ color: C.text, borderColor: C.border }}>← Back</button>
            <button
              onClick={() => { if (!form.status || !form.has_laptop) { setError('Please complete all required fields.'); return; } setError(''); setStep(3) }}
              className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{ background: C.orange }}>
              Continue to Step 3 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>
      )}

      {/* ── STEP 3: Motivation ── */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-[#1A1410] mb-4">This is the most important step — be honest</p>
          <div>
            <label className={lbl}>Why Do You Want to Join Super 30? *</label>
            <textarea required rows={3} value={form.why_join} onChange={e => set('why_join', e.target.value)}
              placeholder="Tell us honestly — what's your current situation, what are you struggling with, and why is this program right for you now?"
              className={`${inp} resize-none`} />
          </div>
          <div>
            <label className={lbl}>Where Do You See Yourself in 1 Year?</label>
            <textarea rows={2} value={form.goal_1yr} onChange={e => set('goal_1yr', e.target.value)}
              placeholder="e.g. Working as a performance marketer, running my own agency, freelancing with ₹50K/month…"
              className={`${inp} resize-none`} />
          </div>
          <RadioRow label="How Did You Hear About Super 30?" field="heard_from" options={['Instagram','WhatsApp','YouTube','Friend/Referral','Google','Website']} />
          {/* Commitment checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all hover:bg-[rgba(255,101,0,0.04)]"
            style={{ borderColor: form.commitment ? 'rgba(255,101,0,0.4)' : '#E8E3DA', background: form.commitment ? 'rgba(255,101,0,0.04)' : 'transparent' }}>
            <div onClick={() => set('commitment', !form.commitment)}
              className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all border"
              style={{ background: form.commitment ? C.orange : 'white', borderColor: form.commitment ? C.orange : '#E8E3DA' }}>
              {form.commitment && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-[#57534E]">
              I commit to attending all 45 days offline in Ranchi, dedicating 4–5 hours daily, bringing my laptop, and approaching this program with full seriousness.
            </span>
          </label>
          {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl font-bold text-sm border-2 hover:bg-[#F4F0E8] transition-colors" style={{ color: C.text, borderColor: C.border }}>← Back</button>
            <button onClick={handleFinalSubmit} disabled={submitting}
              className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ background: C.orange }}>
              {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</> : <>Submit Application 🚀</>}
            </button>
          </div>
          <p className="text-center text-xs text-[#9C9189]">Your application goes directly to Arvind Gupta · Response within 24 hours</p>
        </div>
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
type Stats = { applications: number; selected: number; interview_pending: number; rejected: number; seats_total: number; batch_start: string }

export default function Super30PageClient({ stats }: { stats: Stats }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const seatsLeft = Math.max(0, stats.seats_total - stats.selected)
  const fillPct = Math.round((stats.selected / stats.seats_total) * 100)
  const batchDate = new Date(stats.batch_start).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to know more about Super 30 Career Accelerator by Scalify Labs.')}`

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      {/* ── ANNOUNCEMENT BAR ───────────────────────────────────────────────── */}
      <div className="py-2.5 px-4 text-center text-xs sm:text-sm font-semibold text-white" style={{ background: C.navy }}>
        <span className="animate-pulse mr-2">🔥</span>
        SUPER 30 BATCH 01 APPLICATIONS OPEN &nbsp;|&nbsp; Only {stats.seats_total} Seats &nbsp;|&nbsp; 45 Days &nbsp;|&nbsp; Offline in Ranchi &nbsp;|&nbsp; Laptop Mandatory
        <span className="hidden sm:inline">&nbsp;|&nbsp; <a href="tel:+918788424727" className="underline">Have Questions? +91 8788424727</a></span>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-16 px-4" style={{ background: C.bg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
                style={{ background: C.orange + '12', color: C.orange, border: `1px solid ${C.orange}25` }}>
                <GraduationCap className="w-3.5 h-3.5" /> Super 30 Career Accelerator
              </div>

              <h1 className="font-black leading-[1.15] tracking-tight mb-5 text-[32px] sm:text-[42px] lg:text-[48px]">
                Become a High-Demand<br />
                <span style={{ color: C.orange }}>Performance Marketing</span><br />
                Professional in Just 45 Days
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-7 max-w-[580px]" style={{ color: C.sub }}>
                A selection-only, offline acceleration program for serious learners who want to build real skills, real projects & real careers in Digital Marketing.
              </p>

              {/* Key facts */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Clock,    label: '45 Days Intensive' },
                  { icon: Users,    label: 'Only 30 Learners' },
                  { icon: Clock,    label: '4–5 Hrs Daily' },
                  { icon: Laptop,   label: 'Laptop Mandatory' },
                  { icon: Target,   label: 'Psychometric Test' },
                  { icon: Users,    label: 'Interview Round' },
                  { icon: Shield,   label: 'Real Projects' },
                  { icon: Award,    label: '₹10,000 Launch Fee' },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                    style={{ background: C.white, borderColor: C.border, color: C.sub }}>
                    <f.icon className="w-3 h-3" style={{ color: C.orange }} />
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a href="#apply"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity"
                  style={{ background: C.orange, minHeight: 52 }}>
                  Apply Now — Start Your Journey <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#selection"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 hover:bg-[#F4F0E8] transition-colors"
                  style={{ color: C.text, borderColor: C.border, minHeight: 52 }}>
                  See Selection Process
                </a>
              </div>

              <p className="text-sm font-semibold" style={{ color: C.orange }}>
                ⚡ Applications are filling fast. Don't wait!
              </p>
            </div>

            {/* Right — Live Stats Card */}
            <div className="bg-white rounded-2xl border overflow-hidden shadow-lg" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: C.border, background: '#F9F9F7' }}>
                <p className="font-bold text-sm" style={{ color: C.text }}>SUPER 30 BATCH 01 — LIVE UPDATE</p>
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />LIVE
                </span>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                {[
                  { icon: '👤', label: 'Applications', val: stats.applications, color: C.blue },
                  { icon: '✅', label: 'Selected', val: stats.selected, color: C.green },
                  { icon: '🎤', label: 'Interview Pending', val: stats.interview_pending, color: '#D97706' },
                  { icon: '❌', label: 'Rejected', val: stats.rejected, color: C.red },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F7F4EF' }}>
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className="text-2xl font-black leading-none" style={{ color: s.color }}>{s.val}</p>
                      <p className="text-xs text-[#57534E] mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#FFF3E8] rounded-xl p-4 text-center">
                    <p className="text-3xl font-black" style={{ color: C.orange }}>{seatsLeft}<span className="text-base font-semibold">/{stats.seats_total}</span></p>
                    <p className="text-xs text-[#57534E] mt-0.5 font-semibold">Seats Left</p>
                  </div>
                  <div className="bg-[#EFF6FF] rounded-xl p-4 text-center">
                    <p className="text-lg font-black text-blue-700">{batchDate.split(' ').slice(0,2).join(' ')}</p>
                    <p className="text-xs font-black text-blue-700">{batchDate.split(' ')[2]}</p>
                    <p className="text-xs text-[#57534E] mt-0.5 font-semibold">Batch Starts</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#57534E] mb-1">
                    <span>Seats filled</span><span className="font-bold" style={{ color: C.orange }}>{fillPct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: C.border }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${fillPct}%`, background: C.orange }} />
                  </div>
                </div>
                <a href="#apply"
                  className="block w-full text-center py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ background: C.orange }}>
                  Check Eligibility →
                </a>
                <p className="text-center text-xs mt-2" style={{ color: C.sub }}>⚠️ Applications close once 30 learners are selected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IS FOR / NOT FOR ────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: C.cream }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-4">✅ This Program Is For You If You Are…</p>
              <div className="space-y-2.5">
                {FOR_YOU.map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-[#1A1410]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-4">🚫 This Program Is Not For You If You…</p>
              <div className="space-y-2.5">
                {NOT_FOR_YOU.map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-sm text-[#57534E]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY STUDENTS STRUGGLE ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.bg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-4">
                Why Students Struggle —<br />
                <span style={{ color: C.orange }}>Despite Working Hard</span>
              </h2>
              <p className="text-base leading-relaxed mb-2" style={{ color: C.sub }}>
                Most learners fail not because they are not intelligent, but because the system is broken.
              </p>
              <p className="text-sm font-semibold px-4 py-2.5 rounded-xl inline-block" style={{ background: C.orange + '10', color: C.orange }}>
                ⭐ We focus on execution, systems thinking & real-world outcomes — not theory.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STRUGGLES.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border shadow-sm text-center" style={{ borderColor: C.border }}>
                  <span className="text-2xl block mb-2">{s.icon}</span>
                  <p className="font-bold text-sm text-[#1A1410] mb-1">{s.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: C.sub }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SUPER 30 EXISTS ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.cream }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — founder image */}
            <div className="relative flex justify-center">
              <div className="relative w-[280px] sm:w-[320px]">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image src="/founder.jpg" alt="Arvind Gupta — Founder, Scalify Labs" width={320} height={400}
                    className="w-full object-cover object-top" style={{ aspectRatio: '4/5' }} />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E8E3DA]">
                  <p className="text-[10px] text-[#57534E] font-semibold">Experience</p>
                  <p className="text-xl font-black" style={{ color: C.orange }}>15+ Years</p>
                </div>
              </div>
            </div>
            {/* Right */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Why This Exists</p>
              <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-5">
                Why We Created<br />Super 30 Career Accelerator
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: C.sub }}>
                Thousands complete digital marketing programs but struggle to become employable because they learn platforms without execution.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: C.sub }}>
                Super 30 was built as a <strong className="text-[#1A1410]">45-day selection-based execution lab</strong>. We focus on:
              </p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {WHY_EXISTS.map(w => (
                  <div key={w.label} className="bg-white rounded-xl p-3 text-center border shadow-sm" style={{ borderColor: C.border }}>
                    <span className="text-lg block mb-1">{w.icon}</span>
                    <p className="text-[10px] font-semibold text-[#57534E]">{w.label}</p>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 pl-4 mb-6 italic text-lg font-semibold" style={{ borderColor: C.orange, color: C.text }}>
                "Build before you claim you know."
              </blockquote>
              <div className="flex flex-wrap gap-2 mb-6">
                {MINI_PROOF.map(p => (
                  <div key={p.label} className="px-4 py-2 rounded-full border text-sm font-semibold" style={{ background: C.white, borderColor: C.border, color: C.text }}>
                    <span style={{ color: C.orange }}>{p.val}</span> {p.label}
                  </div>
                ))}
              </div>
              <a href="#apply"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: C.orange }}>
                Check Eligibility <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER NOTE ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ background: C.bg }}>
        <div className="max-w-[720px] mx-auto">
          <div className="bg-white rounded-2xl p-8 border shadow-sm text-center" style={{ borderColor: C.border }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>A Note From The Mentor</p>
            <blockquote className="text-lg sm:text-xl leading-relaxed italic text-[#1A1410] mb-6">
              "People often know tools but struggle to solve business problems. Super 30 aims to create execution-focused professionals — people who can walk in, understand a business, and build results."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: C.orange + '40' }}>
                <Image src="/founder.jpg" alt="Arvind Gupta" width={48} height={48} className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-left">
                <p className="font-black text-[#1A1410]">Arvind Gupta</p>
                <p className="text-sm text-[#57534E]">Founder, Scalify Labs · 15+ years</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {['Education + Growth Systems', 'CRM + AI Workflows', 'Ex-Marketing Head at IMS, Imarticus, Dheya, KK Modi'].map(c => (
                <span key={c} className="text-xs px-3 py-1 rounded-full border text-[#57534E]" style={{ borderColor: C.border }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM PROMISES ──────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ background: C.cream }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Program Promise</p>
          <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-10">What Super 30 Promises</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '⚡', title: 'Execution Before Theory', desc: 'You build live campaigns, not just watch videos.' },
              { icon: '💼', title: 'Portfolio Over Certificates', desc: 'Employers see what you\'ve built, not just what you claim.' },
              { icon: '🎯', title: 'Small Batch Attention', desc: 'Only 30 learners. Every person gets personal attention.' },
              { icon: '🚀', title: 'Career Support', desc: 'Interview prep, portfolio review, and freelance guidance.' },
            ].map(p => (
              <div key={p.title} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: C.border }}>
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h3 className="font-bold text-sm text-[#1A1410] mb-1.5">{p.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C.sub }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BATCH TIMELINE ────────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ background: C.bg }}>
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Batch Timeline</p>
          <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-10">Your Journey with Super 30</h2>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            {BATCH_TIMELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-4 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: i === 5 ? C.green : C.orange + (i < 4 ? 'ff' : '99') }}>
                  {step}
                </div>
                {i < BATCH_TIMELINE.length - 1 && <ArrowRight className="w-4 h-4 shrink-0" style={{ color: C.orange }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTION PROCESS ─────────────────────────────────────────────── */}
      <section id="selection" className="py-16 lg:py-20 px-4 scroll-mt-20" style={{ background: C.cream }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Our Selection Process</p>
          <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-3">We Select Before We Teach</h2>
          <p className="text-base mb-10" style={{ color: C.sub }}>Because we care about your future.</p>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SELECTION_STEPS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border shadow-sm relative" style={{ borderColor: C.border }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-3" style={{ background: i === 5 ? C.green : C.orange }}>
                  {step.n}
                </div>
                <h3 className="font-bold text-sm text-[#1A1410] mb-1.5">{step.title}</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: C.sub }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-6 font-medium" style={{ color: C.sub }}>
            ⚠️ If not selected, you can reapply after 6 months.
          </p>
        </div>
      </section>

      {/* ── 6-STEP JOURNEY ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.bg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Your Journey</p>
              <h2 className="font-black text-[28px] sm:text-[34px] leading-tight">
                Your 6-Step Journey to Become a High-Value{' '}
                <span style={{ color: C.orange }}>Performance Marketing Professional</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {JOURNEY.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center text-center w-20">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm" style={{ background: C.orange + '12', border: `1px solid ${C.orange}25` }}>
                      <step.icon className="w-5 h-5" style={{ color: C.orange }} />
                    </div>
                    <p className="text-[11px] font-semibold leading-tight text-[#1A1410]">{step.label}</p>
                  </div>
                  {i < JOURNEY.length - 1 && <ArrowRight className="w-4 h-4 shrink-0" style={{ color: C.border }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.cream }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Curriculum</p>
            <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-3">What You'll Learn in 45 Days</h2>
            <p className="text-base" style={{ color: C.sub }}>Build real skills. Build real projects. Become employable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRICULUM.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden" style={{ borderColor: C.border }}>
                <div className="absolute top-3 right-4 text-[40px] font-black leading-none opacity-[0.07]" style={{ color: C.orange }}>{m.n}</div>
                <p className="text-xs font-mono font-bold mb-2" style={{ color: C.orange }}>{m.n}</p>
                <h3 className="font-bold text-[#1A1410] mb-2">{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.sub }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: C.orange }}>
              View Detailed Curriculum <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── TOOLS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.bg }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Tools</p>
            <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-2">Tools You'll Work With</h2>
            <p className="text-sm" style={{ color: C.sub }}>Industry-standard tools. Hands-on practice.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map(cat => (
              <div key={cat.cat} className="bg-white rounded-2xl p-4 border shadow-sm" style={{ borderColor: C.border }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: C.orange }}>◉ {cat.cat}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map(tool => (
                    <span key={tool} className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ borderColor: C.border, color: C.text, background: C.cream }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-4" style={{ color: C.sub }}>* Tool exposure in program. Some advanced tools may have limited access.</p>
        </div>
      </section>

      {/* ── ROLES ─────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.cream }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Career Outcomes</p>
              <h2 className="font-black text-[28px] sm:text-[34px] leading-tight mb-6">Roles You Can Target</h2>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(role => (
                  <div key={role} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0" style={{ background: C.orange + '12' }}>
                      <Check className="w-2.5 h-2.5" style={{ color: C.orange }} />
                    </div>
                    <span className="text-sm" style={{ color: C.text }}>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor authority */}
            <div className="bg-[#0B0F1E] rounded-2xl p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Learn From an Industry Mentor</p>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0" style={{ borderColor: C.orange + '50' }}>
                  <Image src="/founder.jpg" alt="Arvind Gupta" width={64} height={64} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-black text-xl">Arvind Gupta</p>
                  <p className="text-sm text-white/60">Founder · Scalify Labs</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  '15+ Years in Marketing, CRM, Automation & Growth Systems',
                  'Ex-Marketing Head at IMS Proschool, Imarticus, Dheya, KK Modi University',
                  '5000+ Learners Impacted',
                  '10K+ Campaigns & Workflows Experience',
                  'Mentor for Incubation Initiatives in Jharkhand',
                ].map(c => (
                  <div key={c} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: C.orange + '20' }}>
                      <Check className="w-2.5 h-2.5" style={{ color: C.orange }} />
                    </div>
                    <p className="text-sm text-white/75">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.bg }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Pricing</p>
            <h2 className="font-black text-[28px] sm:text-[34px] leading-tight">Launching Offer — Batch 01</h2>
            <p className="text-base mt-2" style={{ color: C.sub }}>High Value. Affordable. Accessible.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Value */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm text-center" style={{ borderColor: C.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.sub }}>Total Program Value (Estimated)</p>
              <p className="text-3xl font-black text-[#1A1410]">₹50,000+</p>
            </div>
            {/* Price */}
            <div className="rounded-2xl p-6 text-center shadow-lg text-white" style={{ background: C.navy }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: C.orange }}>Your Investment (Launch Price)</p>
              <p className="text-5xl font-black mb-1" style={{ color: C.orange }}>₹10,000</p>
              <p className="text-xs text-white/60">Includes 45-Day Training, Projects, Mentorship, Certifications Guidance, Career Support & More.</p>
              <p className="text-xs mt-3 text-white/50">Later batches fees will increase.</p>
            </div>
            {/* Why affordable */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: C.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.sub }}>Why So Affordable?</p>
              <div className="space-y-2">
                {["We're building early batches with care.", "We value quality over profit.", "We want to make high-quality education affordable in Jharkhand."].map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: C.green }} />
                    <span className="text-xs leading-relaxed" style={{ color: C.sub }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What you get */}
          <div className="mt-6 bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: C.border }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.sub }}>What You Get</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {['45 Days Intensive Offline Training','Hands-on Projects & Portfolio','Certifications Guidance (Google, Semrush & More)','Interview & Career Support','Lifetime Access to Community'].map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: C.orange + '12' }}>
                    <Check className="w-3 h-3" style={{ color: C.orange }} />
                  </div>
                  <span className="text-sm" style={{ color: C.text }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a href="#apply"
                className="flex-1 py-4 rounded-xl font-bold text-white text-center hover:opacity-90 transition-opacity text-base"
                style={{ background: C.orange }}>
                Check Your Eligibility Now →
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-4 rounded-xl font-bold text-base text-center border-2 flex items-center justify-center gap-2 hover:bg-[#F4F0E8] transition-colors"
                style={{ color: C.text, borderColor: C.border }}>
                <MessageCircle className="w-4 h-4 text-green-600" /> Download Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: C.cream }}>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-black text-[28px] sm:text-[34px] leading-tight">Frequently Asked Questions</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border rounded-2xl overflow-hidden" style={{ borderColor: C.border }}>
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
                  style={{ minHeight: 56 }}>
                  <span className="font-semibold text-sm pr-3" style={{ color: C.text }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`} style={{ color: C.orange }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 pt-3 text-sm leading-relaxed border-t" style={{ color: C.sub, borderColor: C.border }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section id="apply" className="py-16 lg:py-20 px-4 scroll-mt-20" style={{ background: C.navy }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Apply Now</p>
              <h2 className="font-black text-[28px] sm:text-[36px] leading-tight text-white mb-4">
                Applications Close Once<br />
                <span style={{ color: C.orange }}>30 Learners Are Selected</span>
              </h2>
              <p className="text-base leading-relaxed mb-8 text-white/70">
                Take the first step towards your high-growth digital career. The first batch is the most affordable this program will ever be.
              </p>
              <div className="flex gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <MessageCircle className="w-4 h-4 text-green-400" /> WhatsApp Us
                </a>
                <a href="tel:+918788424727"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  📞 +91 8788424727
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 shadow-2xl">
              <h3 className="font-black text-xl text-[#1A1410] mb-1">Apply for Super 30 — Batch 01</h3>
              <p className="text-sm text-[#57534E] mb-6">3 quick steps · Takes 5 minutes · We respond within 24 hrs on WhatsApp</p>
              <EligibilityForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM STICKY CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 text-center py-3.5 px-4 text-white font-semibold text-sm hidden lg:flex items-center justify-center gap-4 shadow-2xl"
        style={{ background: C.navy }}>
        <span className="text-white/70">Applications close once 30 learners are selected.</span>
        <a href="#apply"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          style={{ background: C.orange }}>
          Apply Now — Start Your Journey <ArrowRight className="w-4 h-4" />
        </a>
        <a href="#selection"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm border-2 hover:bg-white/5 transition-colors"
          style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
          See Selection Process
        </a>
      </div>
      <div className="h-16 hidden lg:block" />

      {/* Mobile sticky */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t px-4 py-3 flex gap-3 lg:hidden" style={{ borderColor: C.border }}>
        <a href="#apply" className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center" style={{ background: C.orange }}>
          Check Eligibility
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl text-sm font-bold text-center border-2 flex items-center justify-center gap-1"
          style={{ color: C.text, borderColor: C.border }}>
          <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp
        </a>
      </div>
      <div className="h-16 lg:hidden" />
    </div>
  )
}
