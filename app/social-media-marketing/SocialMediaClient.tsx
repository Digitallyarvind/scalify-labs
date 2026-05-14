'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  ArrowRight, Check, X, ChevronDown, ChevronRight,
  MessageCircle, BarChart3, Star, Zap, Shield, TrendingUp,
  Users, FileText, Megaphone, Phone, Mail, MapPin,
  Calendar, CheckCircle, Sparkles, Rocket,
  GraduationCap, HeartPulse, ShoppingBag, Building2, Briefcase,
} from 'lucide-react'

const SM = { navy: '#001F3F', gold: '#FFC300', goldDark: '#E6B000', goldLight: '#FFF3B0' }
const WA = '918788424727'

// ─── DATA ──────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  'Random posting with no clear goal or audience strategy',
  'No consistent brand look, tone, or visual identity',
  'No engagement or lead generation strategy in place',
  'No paid ads to boost reach beyond existing followers',
  'No tracking or reporting — impossible to measure ROI',
]

const SOLUTIONS = [
  'Custom strategy tailored to your business & audience',
  'Monthly content calendar planned in advance',
  'Post design, copywriting & branded graphics',
  'Page management & inbox replies handled for you',
  'Paid ads on Facebook, Instagram & LinkedIn',
  'Local lead-gen campaigns with WhatsApp CTAs',
  'Monthly performance reports with clear metrics',
  'WhatsApp integration for instant lead capture',
]

const PLANS = [
  {
    name: 'Starter',
    price: '₹9,999',
    period: '/month',
    color: '#22C55E',
    popular: false,
    badge: null,
    features: [
      '12 posts/month (3 per week)',
      'Custom graphics & branded templates',
      'Basic captions + hashtags',
      'FB + IG page management',
      'Inbox monitoring (basic replies)',
      'Monthly performance report',
      'WhatsApp CTA integration',
    ],
    best: 'Local shops, solo consultants, coaching classes',
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    price: '₹19,999',
    period: '/month',
    color: SM.gold,
    popular: true,
    badge: '⭐ Most Popular',
    features: [
      '20 posts/month (5/week + Reels & Stories)',
      'Custom graphics + video snippets',
      'Lead-gen focused captions & copy',
      'FB + IG + LinkedIn pages managed',
      'Inbox replies + follow-ups',
      '1 Paid Ads campaign setup (budget extra)',
      'Content calendar + dashboard',
      'WhatsApp lead integration',
    ],
    best: 'Schools, clinics, coaching institutes, real estate',
    cta: 'Choose Growth Plan',
  },
  {
    name: 'Scale',
    price: '₹29,999',
    period: '/month',
    color: '#8B5CF6',
    popular: false,
    badge: null,
    features: [
      '30+ posts/month (daily + Reels + Stories)',
      'Video content creation included',
      'FB + IG + LinkedIn + YouTube Shorts',
      'Advanced community engagement (DMs, comments)',
      'Paid Ads management — Google + Social (budget extra)',
      '2 lead-gen campaigns/month',
      'CRM integration for lead tracking',
      'Dedicated account manager',
      'Bi-weekly optimisation reviews',
    ],
    best: 'Builders, large coaching centers, healthcare chains',
    cta: 'Go Scale',
  },
]

const WHO = [
  { icon: GraduationCap, label: 'Schools & Coaching', color: 'bg-blue-50 text-blue-600' },
  { icon: HeartPulse,    label: 'Clinics & Path Labs', color: 'bg-red-50 text-red-600' },
  { icon: ShoppingBag,   label: 'Local Shops & SMBs', color: 'bg-amber-50 text-amber-600' },
  { icon: Building2,     label: 'Real Estate & Builders', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Briefcase,     label: 'Consultants & Trainers', color: 'bg-purple-50 text-purple-600' },
]

const STEPS = [
  { n: '01', icon: Phone,       label: 'Free Strategy Call',        desc: 'We learn your goals, audience & competitors' },
  { n: '02', icon: Calendar,    label: 'Monthly Content Plan',      desc: 'Custom calendar approved before we post' },
  { n: '03', icon: Sparkles,    label: 'We Create & Post',          desc: 'Designs, captions, scheduling — all handled' },
  { n: '04', icon: Megaphone,   label: 'Engage & Boost',            desc: 'Replies, ads & campaigns to grow reach' },
  { n: '05', icon: BarChart3,   label: 'Report & Improve',          desc: 'Monthly review with clear data & next steps' },
]

const RESULTS = [
  { emoji: '🏫', label: 'School',        result: '3× Parent Enquiries', period: 'in 60 days',           bar: 75 },
  { emoji: '🏥', label: 'Clinic',        result: 'Local Awareness ↑',   period: 'via Instagram Reels',  bar: 60 },
  { emoji: '📚', label: 'Coaching Class', result: '120 Leads',           period: 'in 1 month',           bar: 80 },
]

const WHY = [
  '18+ years of local marketing expertise across India',
  'In-house design & copywriting team — no freelancers',
  'Strategy + reporting delivered every single month',
  'WhatsApp + CRM integrated into every campaign',
  'Fully managed service — zero stress for you',
]

const FAQS = [
  { q: 'What is included in social media management?', a: 'Depending on plan: content calendar, custom graphics, captions, hashtags, FB/IG/LinkedIn management, inbox replies, paid ad campaigns, WhatsApp integration, and monthly performance reports.' },
  { q: 'How many posts per month do I get?', a: 'Starter: 12 posts/month. Growth: 20 posts + Reels/Stories. Scale: 30+ posts including daily content, Reels, Stories, and YouTube Shorts.' },
  { q: 'Is ad spend included in the monthly fee?', a: 'No. Ad spend is billed directly to Meta/Google platforms. ScalifyLabs charges cover strategy, creatives, and management only — full transparency guaranteed.' },
  { q: 'Which social media platforms do you manage?', a: 'Starter & Growth: Facebook and Instagram. Growth also includes LinkedIn. Scale adds YouTube Shorts.' },
  { q: 'Can social media actually generate leads for local businesses?', a: 'Yes. With a local lead-gen strategy — targeted content, paid ads, WhatsApp CTAs, and CRM integration — social media consistently generates qualified local leads.' },
  { q: 'Do you create the content graphics and captions?', a: 'Yes. Our in-house design and copywriting team handles everything: graphics, video snippets, captions, hashtags, and scheduling.' },
  { q: 'How do you track and report results?', a: 'We provide a monthly performance report covering reach, engagement, follower growth, lead count, and ad performance — with clear recommendations for next month.' },
  { q: 'Which industries do you specialise in?', a: 'We have specific playbooks for education (schools, coaching), healthcare (clinics, path labs), real estate (agents, builders), and local service businesses.' },
]

// ─── LEAD FORM ─────────────────────────────────────────────────────────────────
function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business_type: '', city: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitting(true); setError('')
    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email || undefined,
        city: form.city || undefined,
        source: 'social-media-marketing-page',
        service_interest: 'Social Media Marketing',
        message: `Business: ${form.business_type}. ${form.message}`.trim(),
      })
      trackLead('social-media-marketing-page', 'Social Media Marketing')
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: SM.goldLight }}>
          <CheckCircle className="w-8 h-8" style={{ color: SM.goldDark }} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: SM.navy }}>Thanks! We'll be in touch.</h3>
        <p className="text-slate-500 text-sm">We'll connect with you on WhatsApp within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Phone (WhatsApp) *</label>
          <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@company.com"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
          <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Ranchi"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Business Type</label>
        <select value={form.business_type} onChange={e => set('business_type', e.target.value)}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
          <option value="">Select your business…</option>
          <option>School / Coaching Institute</option>
          <option>Clinic / Healthcare</option>
          <option>Real Estate</option>
          <option>Local Shop / SMB</option>
          <option>Consultant / Trainer</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Short Message</label>
        <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)}
          placeholder="Tell us your current challenge or goal…"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400" />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <button type="submit" disabled={submitting}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: SM.gold, color: SM.navy }}>
        {submitting
          ? <><span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />Submitting…</>
          : <>Book Free Social Strategy Call <ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-center text-[11px] text-slate-400">Free consultation · No spam · WhatsApp reply within 24 hours</p>
    </form>
  )
}

// ─── SOCIAL FEED MOCKUP ────────────────────────────────────────────────────────
function FeedMockup() {
  return (
    <div className="relative w-full max-w-[340px]">
      {/* Phone frame */}
      <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10"
        style={{ background: '#0a2a4a' }}>
        {/* Status bar */}
        <div className="px-5 py-2 flex items-center justify-between">
          <span className="text-white/60 text-[10px]">9:41</span>
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/40" />)}
          </div>
        </div>
        {/* IG-style header */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-white/10">
          <span className="text-white font-bold text-sm">scalifylabs</span>
          <div className="flex gap-3">
            <MessageCircle className="w-5 h-5 text-white/70" />
          </div>
        </div>
        {/* Post 1 */}
        <div className="bg-white mx-2 my-2 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
              style={{ background: SM.gold, color: SM.navy }}>SL</div>
            <div>
              <p className="text-[11px] font-bold" style={{ color: SM.navy }}>Scalify Labs</p>
              <p className="text-[9px] text-slate-400">Sponsored</p>
            </div>
          </div>
          <div className="h-24 flex items-center justify-center text-center px-3"
            style={{ background: `linear-gradient(135deg, ${SM.navy}, #0a4080)` }}>
            <p className="text-white text-xs font-bold leading-tight">120 Leads in 30 Days<br /><span style={{ color: SM.gold }}>Social Media Strategy 🚀</span></p>
          </div>
          <div className="px-3 py-2">
            <p className="text-[10px] text-slate-600 line-clamp-2">Stop posting randomly. Our social media strategy turned this coaching center's page into a lead machine…</p>
            <div className="flex items-center gap-3 mt-2">
              {[['❤️', '1.2K'], ['💬', '84'], ['📤', '203']].map(([e, v]) => (
                <span key={v} className="text-[10px] text-slate-500">{e} {v}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Story row */}
        <div className="px-3 pb-3 flex gap-2 overflow-hidden">
          {['🏥', '🏫', '🏠', '📚', '💼'].map((em, i) => (
            <div key={i} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg border-2"
                style={{ borderColor: SM.gold, background: SM.navy }}>
                {em}
              </div>
              <span className="text-[8px] text-white/50">{['Clinic','School','Realty','Coach','Consult'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating engagement chips */}
      <div className="absolute -top-3 -right-6 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-1.5 border border-slate-100">
        <span className="text-sm">❤️</span>
        <div><p className="text-[9px] text-slate-400">Likes</p><p className="text-xs font-black" style={{ color: SM.navy }}>+1,240</p></div>
      </div>
      <div className="absolute top-24 -left-6 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-1.5 border border-slate-100">
        <span className="text-sm">💬</span>
        <div><p className="text-[9px] text-slate-400">Comments</p><p className="text-xs font-black" style={{ color: SM.navy }}>+84</p></div>
      </div>
      <div className="absolute bottom-8 -right-6 rounded-2xl shadow-xl px-3 py-2 border"
        style={{ background: SM.navy, borderColor: SM.gold + '30' }}>
        <p className="text-[9px]" style={{ color: SM.gold }}>Leads ↑</p>
        <p className="text-lg font-black text-white">120</p>
        <p className="text-[9px] text-white/40">this month</p>
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function SocialMediaClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to know about Social Media Marketing services from Scalify Labs.')}`

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: SM.navy }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,195,0,0.06) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.08]"
          style={{ background: SM.gold }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <Link href="/#services" className="text-white/40 hover:text-white/70 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <span style={{ color: SM.gold }}>Social Media Marketing</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Copy */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{ borderColor: SM.gold + '40', background: SM.gold + '12', color: SM.gold }}>
                <TrendingUp className="w-3.5 h-3.5" /> Social Media Marketing
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                Stop Posting for Likes —{' '}
                <span style={{ color: SM.gold }}>Start Getting Leads</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed">
                We turn your social media into a local trust magnet — with strategic posts, real engagement, and measurable results.
              </p>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-3">
                {['18+ Years Experience', 'Local Market Experts', 'Zero-Stress Monthly Plans'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: SM.gold }} /> {t}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#enquire"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg"
                  style={{ background: SM.gold, color: SM.navy }}>
                  Book Free Social Strategy Call <ArrowRight className="w-4 h-4" />
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: SM.gold + '50' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: SM.gold }} /> Talk on WhatsApp
                </a>
              </div>

              {/* Pricing anchor */}
              <p className="text-white/40 text-xs">Plans starting <strong className="text-white/70">₹9,999/month</strong> · No lock-in contracts</p>
            </div>

            {/* Visual */}
            <div className="flex justify-center lg:justify-end">
              <FeedMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: SM.navy }}>
              Why Most Social Media Efforts Fail
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
          <div className="text-center max-w-lg mx-auto px-5 py-3.5 rounded-2xl border font-semibold text-sm"
            style={{ borderColor: SM.gold + '40', background: SM.goldLight + '60', color: SM.navy }}>
            If your posts don't build trust &amp; drive real action, you're wasting time.
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: SM.navy }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>The Solution</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Social Media That Brings You Business —{' '}
              <span style={{ color: SM.gold }}>Not Just Followers</span>
            </h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">
              From monthly content to paid ads, we handle everything — planning, creating, posting, replies, and campaigns that bring leads.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-4 rounded-2xl border"
                style={{ borderColor: SM.gold + '20', background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: SM.gold + '20' }}>
                  <Check className="w-3.5 h-3.5" style={{ color: SM.gold }} />
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white" id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: SM.navy }}>
              Simple, Transparent Plans That Fit Your Business
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 ${
                plan.popular ? 'shadow-2xl ring-2' : 'shadow-md border border-slate-100'
              }`} style={plan.popular ? { ringColor: SM.gold } as React.CSSProperties : {}}>
                {plan.popular && (
                  <div className="text-center py-2 text-xs font-black tracking-wider"
                    style={{ background: SM.gold, color: SM.navy }}>
                    {plan.badge}
                  </div>
                )}
                {/* Header */}
                <div className="px-6 pt-7 pb-5" style={{ background: plan.popular ? SM.navy : '#f8fafc' }}>
                  <p className="text-sm font-bold mb-1" style={{ color: plan.popular ? SM.gold : SM.navy }}>{plan.name} Plan</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black" style={{ color: plan.popular ? 'white' : SM.navy }}>{plan.price}</span>
                    <span className="text-sm font-semibold mb-1" style={{ color: plan.popular ? 'rgba(255,255,255,0.5)' : 'rgba(0,31,63,0.4)' }}>{plan.period}</span>
                  </div>
                </div>
                {/* Features */}
                <div className="flex-1 px-6 py-5 space-y-2.5 bg-white">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: plan.color + '18' }}>
                        <Check className="w-3 h-3" style={{ color: plan.color }} />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>
                {/* Best for */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Best for</p>
                  <p className="text-xs text-slate-500">{plan.best}</p>
                </div>
                {/* CTA */}
                <div className="px-6 pb-6 pt-4 bg-white">
                  <a href="#enquire"
                    className="block text-center py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
                    style={{ background: plan.popular ? SM.gold : SM.navy, color: plan.popular ? SM.navy : 'white' }}>
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-6 text-xs text-slate-400">
            ⚠️ Ad spend is billed directly to platforms. ScalifyLabs charges cover strategy, creatives &amp; management only.
          </p>
        </div>
      </section>

      {/* ── WHO WE SERVE ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>Industries</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: SM.navy }}>Perfect For…</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {WHO.map(w => (
              <div key={w.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${w.color}`}>
                  <w.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold" style={{ color: SM.navy }}>{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAID ADS ADD-ON ───────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: SM.navy }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border mb-5"
            style={{ borderColor: SM.gold + '40', background: SM.gold + '12', color: SM.gold }}>
            <Zap className="w-3.5 h-3.5" /> Add-On
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Want Faster Results? Add Paid Ads!
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed mb-7">
            Organic posts build trust, but ads bring leads fast. We manage Facebook, Instagram, LinkedIn &amp; YouTube ads — with landing pages, WhatsApp &amp; CRM integration.
          </p>
          <a href="#enquire"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border text-white hover:bg-white/5 transition-colors"
            style={{ borderColor: SM.gold + '50' }}>
            Add Paid Ads to My Plan <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: SM.navy }}>
              How We Make You Social &amp; Successful
            </h2>
          </div>
          <div className="grid sm:grid-cols-5 gap-5 relative">
            <div className="hidden sm:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-slate-100 via-yellow-200 to-slate-100" />
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-slate-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-yellow-400 transition-colors"
                  style={{ borderColor: 'transparent', boxShadow: '0 4px 24px rgba(0,31,63,0.08)' }}>
                  <step.icon className="w-7 h-7 mb-0.5" style={{ color: SM.gold }} />
                  <span className="text-[10px] font-black text-slate-300">{step.n}</span>
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: SM.navy }}>{step.label}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden sm:block absolute top-9 -right-2 w-4 h-4 text-slate-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>Proof</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: SM.navy }}>Real Local Growth Stories</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {RESULTS.map(r => (
              <div key={r.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{r.emoji}</div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{r.label}</p>
                <p className="text-3xl font-black mb-1" style={{ color: SM.navy }}>{r.result}</p>
                <p className="text-xs text-slate-400 mb-4">{r.period}</p>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.bar}%`, background: SM.gold }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SCALIFY ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: SM.navy }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Trust Us With Your Brand</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {WHY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
                style={{ borderColor: SM.gold + '20', background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: SM.gold + '20' }}>
                  <Shield className="w-3.5 h-3.5" style={{ color: SM.gold }} />
                </div>
                <p className="text-sm text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: SM.gold }}>FAQs</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: SM.navy }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-100 transition-colors"
                  aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-sm pr-4" style={{ color: SM.navy }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}
                    style={{ color: SM.gold }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 pt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section id="enquire" className="py-16 lg:py-24 relative overflow-hidden" style={{ background: SM.navy }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,195,0,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: SM.gold }}>Get Started</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Ready To Get Real Results From Social?
              </h2>
              <p className="text-white/60 text-base mb-7 leading-relaxed">
                Book your free strategy call — see exactly how we'll grow your audience &amp; leads.
              </p>
              <div className="space-y-3 mb-6">
                {['Free 30-min strategy call', 'Custom plan for your business', 'WhatsApp reply within 24 hours', 'No lock-in contract required'].map(b => (
                  <div key={b} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: SM.gold }} />
                    <p className="text-white/70 text-sm">{b}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: SM.gold + '40' }}>
                  <MessageCircle className="w-4 h-4" style={{ color: SM.gold }} /> WhatsApp
                </a>
                <a href="tel:+918788424727"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: SM.gold + '40' }}>
                  <Phone className="w-4 h-4" style={{ color: SM.gold }} /> Call Us
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold text-lg mb-1" style={{ color: SM.navy }}>Book Your Free Strategy Call</h3>
              <p className="text-slate-400 text-xs mb-5">Takes 2 minutes · No commitment required</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <a href="#enquire"
          className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center"
          style={{ background: SM.gold, color: SM.navy }}>
          Book Free Call
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 border-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
          style={{ borderColor: SM.navy, color: SM.navy }}>
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
