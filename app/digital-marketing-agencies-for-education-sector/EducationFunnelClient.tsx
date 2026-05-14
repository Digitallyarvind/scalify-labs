'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronDown,
  MessageCircle, TrendingUp, Target, Zap, Users, Search,
  GraduationCap, BookOpen, Megaphone, Briefcase, Monitor,
  BarChart3, Phone, Shield, Star, AlertTriangle,
  BarChart2, CheckCircle2, X,
} from 'lucide-react'

const ED = {
  navy: '#001F3F',
  gold: '#FFC300',
  goldDark: '#E6B000',
  goldLight: '#FFF3B0',
  purple: '#5B4FE9',
  purpleLight: '#7B6FFF',
  green: '#22C55E',
}
const WA = '918788424727'

// ─── DATA ───────────────────────────────────────────────────────────────────
const COUNTERS = [
  { icon: '🎓', val: '500,000+', label: 'Student Leads Generated' },
  { icon: '📍', val: '50,000+',  label: 'Students Reached Offline' },
  { icon: '💰', val: '₹95',      label: 'CPL Achieved (vs ₹400 before)' },
  { icon: '✅', val: '100%',     label: 'Verified Lead System' },
]

const PROBLEMS = [
  { icon: X,             color: 'bg-red-50 text-red-500',     title: 'Unqualified Leads',          desc: 'Getting enquiries from students who can\'t afford fees or don\'t meet admission criteria', impact: 'Wastes counsellor time and resources' },
  { icon: BarChart2,     color: 'bg-orange-50 text-orange-500', title: 'High Marketing Costs',      desc: 'Spending thousands on Google Ads and Facebook campaigns with poor ROI', impact: 'Burning budget without sustainable growth' },
  { icon: Search,        color: 'bg-purple-50 text-purple-500', title: 'Poor Online Visibility',    desc: 'Students can\'t find your institution when searching for courses online', impact: 'Missing out on organic student discovery' },
  { icon: Zap,           color: 'bg-blue-50 text-blue-500',    title: 'Seasonal Enrollment Dips',   desc: 'Only getting admissions during peak seasons, empty seats rest of the year', impact: 'Unpredictable revenue and planning challenges' },
  { icon: Target,        color: 'bg-green-50 text-green-500',  title: 'Wrong Target Audience',       desc: 'Marketing to everyone instead of your ideal student profile', impact: 'Low conversion rates and wasted ad spend' },
  { icon: Users,         color: 'bg-cyan-50 text-cyan-500',    title: 'Manual Follow-up Process',   desc: 'Counsellors manually calling hundreds of leads without proper qualification', impact: 'High operational costs and missed opportunities' },
]

const SOLUTIONS = [
  {
    icon: GraduationCap,
    gradient: 'from-blue-500 to-blue-600',
    label: 'Preschools & Schools',
    sub: 'K-12 & Early Education',
    features: ['Parent-focused marketing campaigns', 'Local community targeting', 'Admission timeline optimisation', 'School tour booking system', 'Parent testimonial showcases'],
  },
  {
    icon: AlertTriangle,
    gradient: 'from-green-500 to-emerald-600',
    label: 'Colleges & Universities',
    sub: 'Higher Education Institutions',
    features: ['Course-specific landing pages', 'Student qualification funnels', 'Scholarship program promotion', 'Campus life showcases', 'Alumni success stories'],
  },
  {
    icon: BookOpen,
    gradient: 'from-purple-500 to-violet-600',
    label: 'Coaching Institutes',
    sub: 'Competitive Exam Preparation',
    features: ['Result-oriented marketing', 'Batch-wise enrollment funnels', 'Success rate highlighting', 'Free demo class bookings', 'Educator expertise showcasing'],
  },
  {
    icon: Briefcase,
    gradient: 'from-orange-500 to-red-500',
    label: 'Career Counsellor Pro',
    sub: 'Professional guidance systems',
    features: ['Student assessment tools', 'Career path mapping', 'Industry expert consultations', 'Skill development recommendations', 'University placement assistance'],
  },
  {
    icon: GraduationCap,
    gradient: 'from-teal-500 to-cyan-500',
    label: 'Skill Development Centers',
    sub: 'Vocational training & professional skills',
    features: ['Industry-aligned course promotion', 'Certification program marketing', 'Job placement guarantee campaigns', 'Corporate training solutions', 'Professional network building'],
  },
  {
    icon: Monitor,
    gradient: 'from-pink-500 to-rose-500',
    label: 'EdTech Providers',
    sub: 'Online learning platforms',
    features: ['Awareness + lead nurture at scale', 'App install campaigns', 'Free trial conversion funnels', 'Student retention campaigns', 'Regional language targeting'],
  },
]

const PROCESS = [
  { n: '01', icon: BarChart3,  label: 'Analysis',       desc: "Deep dive into your institution's unique needs, target audience, and competition" },
  { n: '02', icon: Target,     label: 'Strategy',       desc: 'Create customised marketing funnel strategy based on your institution type and goals' },
  { n: '03', icon: Zap,        label: 'Implementation', desc: 'Set up AI-powered lead generation system with automated qualification and nurturing' },
  { n: '04', icon: TrendingUp, label: 'Optimisation',   desc: 'Continuous monitoring and optimisation to maximise qualified leads and enrolments' },
]

const FUNNEL_STAGES = [
  { label: 'Awareness', sub: 'SEO + Ads', color: '#5B4FE9' },
  { label: 'Enquiry',   sub: 'Landing Page', color: ED.gold },
  { label: 'Nurture',   sub: 'WA + CRM', color: '#22C55E' },
  { label: 'Enrolment', sub: 'Counsellor', color: '#EF4444' },
]

const WHY_US = [
  'Specialised digital marketing agency for education sector only',
  'Direct experience with India\'s top institutions as an insider',
  '500,000+ student leads generated across verticals',
  'Funnels built for admissions — not vanity metrics or clicks',
  'Affordable, done-for-you execution with zero stress',
  'Integrated online + offline strategy across all channels',
]

const FAQS = [
  { q: 'Why not hire a general digital marketing agency?', a: "Generalist agencies treat education like e-commerce. They focus on clicks, not admissions. ScalifyLabs is built specifically for student enrollment funnels — from parent trust-building to counsellor handoff." },
  { q: 'Do you provide verified student leads?', a: 'Yes. All leads are verified via form submissions, WhatsApp qualification, and AI nurturing sequences — only genuinely interested students reach your counselling team.' },
  { q: 'When should education marketing start?', a: 'Ideally 3–6 months before the academic year begins. Early campaigns build awareness; closer to admission season they shift to high-intent conversion.' },
  { q: 'Do you manage online and offline marketing?', a: 'Yes. Integrated strategies across Google Ads, Meta Ads, SEO, WhatsApp automation, offline event support, and CRM tracking.' },
  { q: 'What does education digital marketing cost?', a: 'Ad spend is billed directly to platforms. ScalifyLabs charges cover funnel strategy, creative execution, campaign management, CRM setup, and monthly reporting.' },
]

// ─── FORM ───────────────────────────────────────────────────────────────────
function EducationForm() {
  const [form, setForm] = useState({ name: '', phone: '', institute_type: '', city: '' })
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
        name: form.name.trim(), phone: form.phone.trim(),
        city: form.city || undefined,
        source: 'education-funnel-page',
        service_interest: 'Education Marketing Funnel',
        message: `Institute: ${form.institute_type}`,
      })
      trackLead('education-funnel-page', 'Education Marketing Funnel')
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: ED.navy }}>Thanks! We'll reach out within 24 hours.</h3>
        <p className="text-slate-500 text-sm">We'll connect with you on WhatsApp soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">WhatsApp No. *</label>
          <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Institute Type</label>
          <select value={form.institute_type} onChange={e => set('institute_type', e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="">Select…</option>
            <option>Preschool</option>
            <option>School (K-12)</option>
            <option>Coaching Institute</option>
            <option>College / University</option>
            <option>Career Consultant</option>
            <option>EdTech</option>
            <option>Skill Development</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
          <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Ranchi"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <button type="submit" disabled={submitting}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ background: ED.gold, color: ED.navy }}>
        {submitting
          ? <><span className="w-4 h-4 border-2 border-current/40 border-t-current rounded-full animate-spin" />Submitting…</>
          : <>Book Free Education Growth Call <ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-center text-[11px] text-slate-400">Free consultation · No spam · WhatsApp reply within 24 hours</p>
    </form>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function EducationFunnelClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to know about Education Marketing services from Scalify Labs.')}`

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ED.navy} 0%, #0a1a4a 40%, ${ED.purple} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,195,0,0.07) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full blur-[200px] opacity-20"
          style={{ background: ED.purple }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-8">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <span className="text-white/40">Industries</span>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <span style={{ color: ED.gold }}>Education Solutions</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{ borderColor: ED.gold + '50', background: ED.gold + '15', color: ED.gold }}>
                <GraduationCap className="w-3.5 h-3.5" /> Education Marketing Funnel
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                Fill Seats with{' '}
                <span style={{ color: ED.gold }}>AI-Powered<br />Lead Generation</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed">
                Stop struggling with empty seats. Our proven AI-driven marketing funnels help educational institutions attract, qualify, and convert genuine students consistently.
              </p>

              {/* Trust counters */}
              <div className="flex flex-wrap gap-3">
                {[
                  { color: '#5B4FE9', icon: '🎓', val: '6,000+', label: 'Students Guided' },
                  { color: '#22C55E', icon: '📈', val: '40%',    label: 'Admission Increase' },
                  { color: '#EC4899', icon: '✅', val: 'Verified', label: 'Lead System' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border"
                    style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{ background: c.color }}>{c.icon}</div>
                    <span className="text-white/80 text-xs font-semibold">✓ {c.val} {c.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#enquire"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg"
                  style={{ background: ED.gold, color: ED.navy }}>
                  <Zap className="w-4 h-4" /> Get Free Strategy Session
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  <MessageCircle className="w-4 h-4 text-green-400" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right — Our Education Solutions card */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border shadow-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)' }}>
                <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full" style={{ background: ED.gold }} />
                    <h3 className="font-bold text-white text-base">Our Education Solutions</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    { icon: GraduationCap, color: ED.gold,      label: 'School Admissions',       sub: 'K-12 enrollment solutions' },
                    { icon: AlertTriangle, color: '#22C55E',     label: 'University Admissions',   sub: 'AI-powered student qualification' },
                    { icon: BookOpen,      color: ED.purple,     label: 'Coaching Institutes',     sub: 'Custom lead generation funnels' },
                    { icon: Briefcase,     color: '#F97316',     label: 'Career Counsellor Pro',   sub: 'Professional guidance systems' },
                  ].map(s => (
                    <a key={s.label} href="#solutions"
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all hover:bg-white/10 group"
                      style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: s.color + '25', border: `1px solid ${s.color}40` }}>
                        <s.icon className="w-4 h-4" style={{ color: s.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">{s.label}</p>
                        <p className="text-white/40 text-xs">{s.sub}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COUNTERS ─────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COUNTERS.map(c => (
              <div key={c.label} className="text-center p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="text-2xl mb-2">{c.icon}</div>
                <p className="text-3xl font-black mb-1" style={{ color: ED.navy }}>{c.val}</p>
                <p className="text-xs text-slate-500">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: '#fef9f9' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: ED.navy }}>
              Common Education Marketing Problems
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Are you facing these challenges that prevent your institution from reaching its full enrollment potential?
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border-l-4 shadow-sm"
                style={{ borderLeftColor: i < 2 ? '#EF4444' : i < 4 ? '#8B5CF6' : '#22C55E' }}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" style={{ color: ED.navy }}>{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{ background: '#FFF3B0' }}>
                      <span className="text-xs">💡</span>
                      <span className="text-xs font-medium" style={{ color: ED.goldDark }}>Impact: {p.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sound Familiar callout */}
          <div className="rounded-2xl p-8 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)' }}>
            <h3 className="text-2xl font-extrabold mb-2">Sound Familiar?</h3>
            <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">
              These problems cost educational institutions millions in lost revenue and wasted marketing spend every year.
            </p>
            <a href="#enquire"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm bg-white hover:shadow-lg transition-all"
              style={{ color: '#EF4444' }}>
              Let's Solve These Problems Together
            </a>
          </div>
        </div>
      </section>

      {/* ── FOUNDER AUTHORITY ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: ED.goldLight, color: ED.goldDark }}>
                <Star className="w-3.5 h-3.5" /> Why Trust Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: ED.navy }}>
                Why Trust Us With Education Marketing?
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Unlike most digital marketing agencies for the education sector, our founder has worked <strong className="text-slate-700">directly inside India's top education institutions</strong> — not as an outside vendor, but as part of admissions and student acquisition teams.
              </p>
              <div className="space-y-3">
                {[
                  { org: 'IMS Proschool', role: 'Early digital campaigns in test prep market', color: '#3B82F6' },
                  { org: 'Imarticus Learning', role: 'Offline student acquisition expertise across cities', color: '#8B5CF6' },
                  { org: 'Dheya Careers', role: 'Built full digital ecosystem — site, SEO, CRM, ads', color: '#22C55E' },
                  { org: 'KK Modi University', role: 'Cut CPL from ₹400 → ₹95 as Admissions Head', color: ED.gold },
                ].map(e => (
                  <div key={e.org} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: e.color }} />
                    <div>
                      <p className="font-bold text-sm" style={{ color: ED.navy }}>{e.org}</p>
                      <p className="text-slate-500 text-xs">{e.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — founder photo + logos */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4"
                  style={{ borderColor: ED.gold + '40' }}>
                  <Image
                    src="/founder.jpg"
                    alt="Arvind Gupta — Education Growth Strategist"
                    width={224} height={224}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-2xl px-3 py-2 shadow-lg"
                  style={{ background: ED.navy, border: `1px solid ${ED.gold}40` }}>
                  <p className="text-[10px] font-bold" style={{ color: ED.gold }}>CPL Achievement</p>
                  <p className="text-white font-black text-sm">₹400 → ₹95</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold" style={{ color: ED.navy }}>Arvind Gupta</p>
                <p className="text-slate-500 text-xs">Education Growth Strategist · Digital Mentor</p>
              </div>
              {/* Institution logos */}
              <div className="flex flex-wrap justify-center gap-3">
                {['IMS Proschool', 'Imarticus', 'Dheya Careers', 'KK Modi Univ'].map(l => (
                  <div key={l} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ────────────────────────────────────────────────────── */}
      <section id="solutions" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: ED.navy }}>
              Customised Solutions for Every Education Institution
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Our AI-powered marketing funnels are specifically designed for different types of educational institutions, ensuring maximum ROI and qualified student leads.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${s.gradient}`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-extrabold text-lg mb-0.5" style={{ color: ED.navy }}>{s.label}</h3>
                <p className="text-xs font-semibold mb-4" style={{ color: ED.purple }}>{s.sub}</p>
                <div className="space-y-2">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ED.green }} />
                      <span className="text-xs text-slate-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF / CASE HIGHLIGHTS ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: ED.navy }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ED.gold }}>Proof</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Results From Real Institutions</h2>
          </div>

          {/* Case cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { emoji: '🎓', label: 'KK Modi University', result: 'CPL: ₹400 → ₹95', sub: '76% reduction in cost per lead as Admissions Head', bar: 76 },
              { emoji: '🧭', label: 'Dheya Careers',      result: 'Full Digital Stack', sub: 'Built complete ecosystem: site + SEO + CRM + ads', bar: 90 },
              { emoji: '📚', label: 'IMS & Imarticus',    result: 'Real Insights',      sub: 'Deep insider experience in student acquisition challenges', bar: 80 },
            ].map(c => (
              <div key={c.label} className="rounded-2xl p-5 border" style={{ borderColor: ED.gold + '25', background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-3xl mb-3">{c.emoji}</div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: ED.gold }}>{c.label}</p>
                <p className="text-2xl font-black text-white mb-1">{c.result}</p>
                <p className="text-white/50 text-xs mb-4">{c.sub}</p>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.bar}%`, background: ED.gold }} />
                </div>
              </div>
            ))}
          </div>

          {/* Funnel diagram */}
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: ED.gold }}>
              Student Admission Journey
            </p>
            <div className="flex items-center justify-between gap-2">
              {FUNNEL_STAGES.map((stage, i) => (
                <div key={stage.label} className="flex items-center gap-2 flex-1">
                  <div className="flex-1 rounded-xl py-3 px-2 text-center"
                    style={{ background: stage.color + '20', border: `1px solid ${stage.color}40` }}>
                    <p className="font-black text-white text-xs">{stage.label}</p>
                    <p className="text-[9px] mt-0.5" style={{ color: stage.color }}>{stage.sub}</p>
                  </div>
                  {i < FUNNEL_STAGES.length - 1 && (
                    <ArrowRight className="w-4 h-4 shrink-0" style={{ color: ED.gold + '60' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm mt-8 text-white/50">
            This is why ScalifyLabs is among India's top{' '}
            <strong className="text-white/80">digital marketing agencies for the education sector.</strong>
          </p>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: `linear-gradient(135deg, ${ED.purple} 0%, #7B3FE4 100%)` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Our Proven 4-Step Process</h2>
            <p className="text-white/60 text-sm">How we create customised marketing funnels for your institution</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-5 mb-10">
            {PROCESS.map((step, i) => (
              <div key={step.n} className="rounded-2xl p-5 text-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p className="text-3xl font-black mb-3" style={{ color: ED.gold }}>{step.n}</p>
                <step.icon className="w-8 h-8 mx-auto mb-3 text-white/70" />
                <h3 className="font-bold text-white text-sm mb-2">{step.label}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#enquire"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: ED.gold, color: ED.navy }}>
              Start My Custom Solution <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ED.gold }}>Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: ED.navy }}>
              Why Partner With ScalifyLabs?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {WHY_US.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: ED.goldLight }}>
                  <Shield className="w-3.5 h-3.5" style={{ color: ED.goldDark }} />
                </div>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: ED.navy }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-sm pr-4" style={{ color: ED.navy }}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}
                    style={{ color: ED.gold }} />
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
      <section id="enquire" className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ED.navy} 0%, #0a1a4a 50%, ${ED.purple} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,195,0,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ED.gold }}>Get Started</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Ready to Fill Every Classroom, Batch &amp; Counseling Slot?
              </h2>
              <p className="text-white/60 text-base mb-7 leading-relaxed">
                From preschools to universities, we design complete funnels — ads, SEO, content, WhatsApp automation, and more.
              </p>
              <div className="space-y-3 mb-6">
                {['Free 30-min education growth strategy call', 'CPL reduction strategy included', 'WhatsApp reply within 24 hours', 'Dedicated education marketing specialist'].map(b => (
                  <div key={b} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: ED.gold }} />
                    <p className="text-white/70 text-sm">{b}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  <MessageCircle className="w-4 h-4 text-green-400" /> WhatsApp Us
                </a>
                <a href="tel:+918788424727"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border text-white hover:bg-white/5 transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  <Phone className="w-4 h-4" style={{ color: ED.gold }} /> Call Us
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold text-lg mb-1" style={{ color: ED.navy }}>Book Free Education Growth Call</h3>
              <p className="text-slate-400 text-xs mb-5">Takes 2 minutes · No commitment required</p>
              <EducationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <a href="#enquire"
          className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center"
          style={{ background: ED.gold, color: ED.navy }}>
          Book Free Call
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="flex-1 py-3 border-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
          style={{ borderColor: ED.navy, color: ED.navy }}>
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
