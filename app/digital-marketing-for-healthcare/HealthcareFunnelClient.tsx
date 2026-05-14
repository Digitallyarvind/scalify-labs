'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  ArrowRight, CheckCircle, X, ChevronRight, ChevronDown,
  Search, Star, Monitor, TrendingUp, MessageCircle, BarChart3,
  Users, Zap, Shield, Heart, Activity, Eye, Microscope,
  MapPin, Phone,
} from 'lucide-react'

// ─── TOKENS ────────────────────────────────────────────────────────────────────
const HC = {
  navy:      '#001F3F',
  gold:      '#FFC300',
  goldDark:  '#E6B000',
  goldLight: '#FFF3B0',
}
const SITE_WHATSAPP = '918788424727'

// ─── DATA ──────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  'Multiple vendors & tools create confusion — nobody owns the full funnel',
  'Ad money wasted with no patient follow-up system in place',
  'No structured process for collecting 5★ reviews consistently',
  'Missed calls = missed patients — no automated callback or reminder',
  'No CRM or dashboard — zero visibility into what is actually working',
]

const DELIVERABLES = [
  { icon: MapPin,        label: 'Local SEO & Google Maps',       desc: 'Rank for "best [clinic type] near me" queries' },
  { icon: Star,          label: 'Review Collection & Reputation', desc: 'Consistent 5★ ratings across Google & Practo' },
  { icon: Monitor,       label: 'Mobile-First Clinic Website',    desc: 'Conversion-optimised, fast, and trustworthy' },
  { icon: TrendingUp,    label: 'Google & Meta Patient Ads',      desc: 'Campaigns targeting patients actively searching' },
  { icon: MessageCircle, label: 'WhatsApp & SMS Reminders',       desc: 'Reduce no-shows, confirm appointments 24/7' },
  { icon: BarChart3,     label: 'CRM Dashboard',                  desc: 'Track every lead from enquiry to booking' },
  { icon: Users,         label: 'Doctor Personal Branding',       desc: 'AI avatar content positioning you as the expert' },
  { icon: Zap,           label: 'Patient Education Reels',        desc: 'Short videos that build trust and drive enquiries' },
]

const CLINIC_TYPES = [
  { icon: '🦷', label: 'Dental' },
  { icon: '🧬', label: 'IVF' },
  { icon: '👁️', label: 'Eye' },
  { icon: '🧪', label: 'Path Labs' },
  { icon: '🏥', label: 'Multi-speciality' },
  { icon: '✨', label: 'Dermatology' },
  { icon: '❤️', label: 'Cardiology' },
  { icon: '🌿', label: 'Wellness' },
]

const RESULTS = [
  { emoji: '🦷', clinic: 'Dental Clinic', metric: '3×', label: 'Verified Calls', period: 'in 60 days',   bar: 75 },
  { emoji: '🧬', clinic: 'IVF Center',    metric: '50%', label: 'More Consultations', period: 'booked',  bar: 60 },
  { emoji: '🧪', clinic: 'Path Lab',      metric: '40%', label: 'Fewer No-Shows',   period: 'with reminders', bar: 50 },
]

const FUNNEL_STEPS = [
  { label: 'Patient Searches', sub: 'SEO + Ads',        color: '#3B82F6' },
  { label: 'Sees Reviews',     sub: 'Reputation',        color: '#8B5CF6' },
  { label: 'Clicks & Enquires',sub: 'Landing Page',      color: HC.gold   },
  { label: 'Gets Reminder',    sub: 'WhatsApp / SMS',    color: '#10B981' },
  { label: 'Books & Attends',  sub: 'CRM Confirmation',  color: '#EF4444' },
]

const WHY_US = [
  '18+ years of local marketing expertise across India',
  'Full funnel: SEO + Ads + Reviews + CRM + Reminders',
  '10+ clinics already growing with Scalify Labs',
  '1,000+ verified patient bookings delivered',
  'Affordable and built for real clinics, not big hospitals',
  'Dedicated healthcare growth team — not a generalist agency',
  'Done-for-you execution — zero stress for your team',
]

const FAQS = [
  {
    q: 'How is this different from hiring a regular agency?',
    a: "We don't just run ads. We integrate the full funnel — from Google search to WhatsApp reminders — so you get verified patient bookings, not just clicks.",
  },
  {
    q: 'Do I need to manage multiple tools separately?',
    a: 'No. We set up and connect everything — SEO, ads, reviews, WhatsApp automation, and CRM. You only focus on treating patients.',
  },
  {
    q: 'How quickly can I see results?',
    a: 'Most clinics see increased calls and bookings within 30–60 days. Reviews and local SEO compound over 3–6 months.',
  },
  {
    q: 'Can you handle multiple clinic branches?',
    a: 'Yes. We provide branch-wise funnels and reporting — each location tracked separately with its own lead source and booking data.',
  },
  {
    q: 'Do reviews really impact patient bookings?',
    a: 'Yes. Over 80% of patients choose a clinic based on online reviews. We actively collect and showcase 5★ ratings on Google and Practo.',
  },
]

// ─── FORM ──────────────────────────────────────────────────────────────────────
function ClinicForm() {
  const [form, setForm] = useState({ name: '', phone: '', clinic_type: '', city: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitting(true)
    setError('')
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city || undefined,
        source: 'healthcare-funnel-page',
        service_interest: 'Healthcare Clinic Growth Funnel',
        message: `Clinic Type: ${form.clinic_type}`,
      })
      trackLead('healthcare-funnel-page', 'Healthcare Clinic Growth Funnel')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: HC.goldLight }}>
          <CheckCircle className="w-8 h-8" style={{ color: HC.goldDark }} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thanks! We'll be in touch.</h3>
        <p className="text-white/50 text-sm">We'll connect on WhatsApp within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 border"
            style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">WhatsApp No. *</label>
          <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 border"
            style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">Clinic Type</label>
          <select value={form.clinic_type} onChange={e => set('clinic_type', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 border"
            style={{ background: '#0a2a4a', borderColor: 'rgba(255,255,255,0.12)', color: form.clinic_type ? 'white' : 'rgba(255,255,255,0.35)' }}>
            <option value="">Select…</option>
            <option>Dental</option>
            <option>IVF</option>
            <option>Eye Clinic</option>
            <option>Path Lab</option>
            <option>Dermatology</option>
            <option>Cardiology</option>
            <option>Multi-speciality</option>
            <option>Wellness</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">City</label>
          <input value={form.city} onChange={e => set('city', e.target.value)}
            placeholder="e.g. Ranchi"
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 border"
            style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
      </div>
      {error && <p className="text-sm text-red-300 bg-red-900/30 px-3 py-2 rounded-lg">{error}</p>}
      <button type="submit" disabled={submitting}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: HC.gold, color: HC.navy }}>
        {submitting
          ? <><span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" /> Submitting…</>
          : <>Book Free Growth Call <ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-center text-[11px] text-white/30">Free consultation · No spam · WhatsApp reply within 24 hours</p>
    </form>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function HealthcareFunnelClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const waLink = `https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent('Hi, I want to know about the Clinic Growth Funnel from Scalify Labs.')}`

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: HC.navy }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,195,0,0.06) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: HC.gold, opacity: 0.07 }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
          {/* breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8" aria-label="Breadcrumb">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/40">Industries</span>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span style={{ color: HC.gold }}>Healthcare Solutions</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{ borderColor: HC.gold + '40', background: HC.gold + '12', color: HC.gold }}>
                <Heart className="w-3.5 h-3.5" />
                Healthcare Clinic Growth Funnel
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                Fill Your Clinic With{' '}
                <span style={{ color: HC.gold }}>Verified Local Patients</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed">
                From SEO to ads, reviews, reminders &amp; CRM — we become your complete growth partner. No juggling tools. No chasing vendors. Just more patients.
              </p>

              {/* Trust counters */}
              <div className="flex flex-wrap gap-3">
                {[
                  { emoji: '🏥', val: '10+',         label: 'Clinics Served' },
                  { emoji: '📞', val: '1,000+',      label: 'Patient Bookings' },
                  { emoji: '💰', val: 'Affordable',  label: 'Growth Service' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                    style={{ borderColor: HC.gold + '30', background: HC.gold + '08' }}>
                    <span className="text-lg">{c.emoji}</span>
                    <div>
                      <p className="text-sm font-black text-white leading-tight">{c.val}</p>
                      <p className="text-[10px] text-white/50">{c.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#enquire"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg"
                  style={{ background: HC.gold, color: HC.navy }}>
                  Book Free Growth Call <ArrowRight className="w-4 h-4" />
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: HC.gold + '50' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: HC.gold }} /> Talk on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[380px] rounded-2xl overflow-hidden shadow-2xl border"
                style={{ borderColor: HC.gold + '20', background: 'rgba(255,255,255,0.03)' }}>

                {/* Google Maps mock */}
                <div className="px-4 py-3 border-b" style={{ borderColor: HC.gold + '15', background: '#0a2a4a' }}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 mb-3">
                    <Search className="w-3.5 h-3.5 text-white/50" />
                    <span className="text-white/50 text-xs">best dental clinic near me</span>
                  </div>
                  {/* Top result */}
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-sm"
                        style={{ background: HC.goldLight }}>🦷</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold" style={{ color: HC.navy }}>City Smiles Dental</p>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: HC.gold, color: HC.navy }}>#1</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[1,2,3,4,5].map(s => <span key={s} className="text-[10px]" style={{ color: HC.gold }}>★</span>)}
                          <span className="text-[9px] text-slate-500 ml-1">4.9 (218 reviews)</span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-0.5">Open · Closes 8 PM · 0.8 km</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WA booking confirmations */}
                <div className="p-4">
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2.5">Today's Bookings</p>
                  <div className="space-y-2">
                    {[
                      { name: 'Anita R.',  time: '10:30 AM', type: 'Root Canal Consult',   status: 'Confirmed ✅' },
                      { name: 'Rohit M.', time: '12:00 PM', type: 'IVF Initial Consult',   status: 'Confirmed ✅' },
                      { name: 'Seema K.', time: '3:00 PM',  type: 'Eye Check-up',          status: 'Reminded 💬' },
                      { name: 'Ajay S.',  time: '5:30 PM',  type: 'Cardio Follow-up',      status: 'Booked ✅' },
                    ].map(b => (
                      <div key={b.name} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black"
                          style={{ background: HC.gold, color: HC.navy }}>{b.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[10px] font-semibold">{b.name} · {b.time}</p>
                          <p className="text-white/40 text-[9px] truncate">{b.type}</p>
                        </div>
                        <span className="text-[8px] font-semibold shrink-0 text-white/60">{b.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    {[
                      { v: '94%', l: 'Show Rate' },
                      { v: '4.9★', l: 'Avg Rating' },
                      { v: '3×', l: 'More Calls' },
                    ].map(s => (
                      <div key={s.l} className="text-center">
                        <p className="text-sm font-black" style={{ color: HC.gold }}>{s.v}</p>
                        <p className="text-[9px] text-white/40">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: HC.goldLight }}>
                  <Star className="w-4 h-4" style={{ color: HC.goldDark }} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400">Google Rating</p>
                  <p className="text-xs font-extrabold" style={{ color: HC.navy }}>4.9 ★ · 218 reviews</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl shadow-xl px-4 py-2.5 border"
                style={{ background: HC.navy, borderColor: HC.gold + '30' }}>
                <p className="text-[9px] font-semibold" style={{ color: HC.gold }}>No-Shows ↓</p>
                <p className="text-xl font-black text-white">40%</p>
                <p className="text-[9px] text-white/40">with WA reminders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HC.gold }}>The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: HC.navy }}>
              Why Most Clinics Struggle With Marketing
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-red-50 shadow-sm">
                <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
          <div className="text-center max-w-xl mx-auto px-5 py-3.5 rounded-2xl border"
            style={{ borderColor: HC.gold + '40', background: HC.goldLight + '60' }}>
            <p className="text-sm font-semibold" style={{ color: HC.navy }}>
              Running a clinic is hard enough. Marketing shouldn't be another burden.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE SOLUTION ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: HC.navy }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HC.gold }}>The Solution</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              One Funnel. One Partner. More Patients.
            </h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">
              We design &amp; manage your full patient funnel — every enquiry tracked, followed up, and converted into bookings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {DELIVERABLES.map(d => (
              <div key={d.label} className="rounded-2xl p-5 border hover:-translate-y-1 transition-all duration-200"
                style={{ borderColor: HC.gold + '20', background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: HC.gold + '15', border: `1px solid ${HC.gold}30` }}>
                  <d.icon className="w-5 h-5" style={{ color: HC.gold }} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{d.label}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Funnel visual */}
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: HC.gold }}>
              Patient Journey Funnel
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              {FUNNEL_STEPS.map((step, i) => (
                <div key={step.label} className="flex sm:flex-col items-center gap-2 w-full sm:w-auto">
                  <div className="w-full sm:w-28 px-3 py-3 rounded-xl text-center"
                    style={{ background: step.color + '20', border: `1px solid ${step.color}40` }}>
                    <p className="font-black text-white text-xs leading-tight">{step.label}</p>
                    <p className="text-[9px] mt-0.5" style={{ color: step.color }}>{step.sub}</p>
                  </div>
                  {i < FUNNEL_STEPS.length - 1 && (
                    <ArrowRight className="w-4 h-4 shrink-0 sm:rotate-90 hidden sm:block mt-1.5" style={{ color: HC.gold + '50' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HC.gold }}>Clinic Types</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: HC.navy }}>
              Built for Clinics Like Yours
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CLINIC_TYPES.map(c => (
              <div key={c.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl"
                  style={{ background: HC.goldLight }}>
                  {c.icon}
                </div>
                <p className="text-sm font-semibold" style={{ color: HC.navy }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HC.gold }}>Proof</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: HC.navy }}>
              Proof That Funnels Work
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {RESULTS.map(r => (
              <div key={r.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="text-3xl mb-4">{r.emoji}</div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{r.clinic}</p>
                <p className="text-4xl font-black mb-1" style={{ color: HC.navy }}>{r.metric}</p>
                <p className="text-sm font-semibold text-slate-700 mb-1">{r.label}</p>
                <p className="text-xs text-slate-400 mb-4">{r.period}</p>
                {/* progress bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${r.bar}%`, background: HC.gold }} />
                </div>
              </div>
            ))}
          </div>

          {/* Funnel waterfall */}
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: HC.navy }}>
              How Every Patient Journey Is Tracked
            </p>
            <div className="space-y-2">
              {FUNNEL_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 px-5 py-3 rounded-xl border"
                  style={{
                    background: step.color + '10',
                    borderColor: step.color + '30',
                    width: `${100 - i * 10}%`,
                    marginLeft: `${i * 5}%`,
                  }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ background: step.color }}>{i + 1}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: HC.navy }}>{step.label}</p>
                    <p className="text-[10px] text-slate-500">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SCALIFY LABS ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: HC.navy }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HC.gold }}>Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Not Just an Agency. Your Growth Partner.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {WHY_US.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
                style={{ borderColor: HC.gold + '20', background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: HC.gold + '20' }}>
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: HC.gold }} />
                </div>
                <p className="text-sm text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: HC.gold }}>FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: HC.navy }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-100 transition-colors"
                  aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-sm pr-4" style={{ color: HC.navy }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}
                    style={{ color: HC.gold }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 pt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section id="enquire" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: HC.navy }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,195,0,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: HC.gold }}>Get Started</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Ready to Stop Chasing Patients — and Start Booking Them?
              </h2>
              <p className="text-white/60 text-base mb-7 leading-relaxed">
                Book a free growth call and see how our complete funnel fills your clinic with verified local patients.
              </p>
              <div className="space-y-3">
                {['Free 30-min strategy call', 'No obligation, no spam', 'WhatsApp reply within 24 hours', 'Dedicated healthcare growth consultant'].map(b => (
                  <div key={b} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: HC.gold }} />
                    <p className="text-white/70 text-sm">{b}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: HC.gold + '40' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: HC.gold }} /> WhatsApp Us
                </a>
                <a href="tel:+918788424727"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: HC.gold + '40' }}>
                  <Phone className="w-4 h-4" style={{ color: HC.gold }} /> Call Us
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: HC.gold + '25' }}>
              <h3 className="font-bold text-white text-lg mb-1">Book Your Free Growth Call</h3>
              <p className="text-white/40 text-xs mb-5">Takes 2 minutes · WhatsApp preferred</p>
              <ClinicForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ───────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <a href="#enquire"
          className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center"
          style={{ background: HC.gold, color: HC.navy }}>
          Book Free Call
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 border-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
          style={{ borderColor: HC.navy, color: HC.navy }}>
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
