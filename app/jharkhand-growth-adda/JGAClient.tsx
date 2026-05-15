'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Users, TrendingUp, MessageCircle, BookOpen,
  Star, Check, ChevronRight, Globe, Zap, Target, Heart,
  Building2, GraduationCap, ShoppingBag, HeartPulse, Briefcase,
  Store, UtensilsCrossed, Wrench,
} from 'lucide-react'

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const J = {
  bg: '#FAFAF8', cream: '#FFF9F2', orange: '#FF6500',
  navy: '#0B0F1E', text: '#1A1410', sub: '#57534E',
  border: '#E8E3DA', white: '#FFFFFF',
  green: '#16A34A', amber: '#D97706',
  teal: '#0F766E',
}

const WA_LINK = 'https://chat.whatsapp.com/scalify-jga'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STRUGGLES = [
  'Finding customers',       'Understanding digital marketing',
  'AI adoption',             'Networking with other founders',
  'Getting referrals',       'Building systems',
  'Automation',              'Choosing agencies',
  'Scaling digitally',
]

const BENEFITS = [
  {
    icon: Users,
    title: 'Networking Opportunities',
    color: 'text-blue-600 bg-blue-50',
    desc: 'Build meaningful business relationships',
    items: ['Manufacturers','Clinic owners','Retail businesses','Agencies','Educators','Startups','Consultants','Local brands'],
  },
  {
    icon: TrendingUp,
    title: 'Referrals & Lead Opportunities',
    color: 'text-green-600 bg-green-50',
    desc: 'Community-powered growth',
    items: ['Partnerships','Collaborations','Business referrals','Vendor recommendations','Community opportunities'],
  },
  {
    icon: Globe,
    title: 'Digital Growth Guidance',
    color: 'text-purple-600 bg-purple-50',
    desc: 'Learn what actually works',
    items: ['SEO','Google Ads','Meta Ads','AI tools','WhatsApp marketing','Email marketing','CRM','Automation','Websites','Lead generation'],
  },
  {
    icon: MessageCircle,
    title: 'Founder Discussions',
    color: 'text-orange-600 bg-orange-50',
    desc: 'Ask questions, get real answers',
    items: ['How do I generate leads?','Which CRM works best?','How should I use AI?','How do I automate follow-ups?','What marketing actually works?'],
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    color: 'text-teal-600 bg-teal-50',
    desc: 'Practical tools you can use today',
    items: ['Templates','Playbooks','Prompt libraries','Growth workflows','Business systems','Checklists'],
  },
]

const WHO = [
  { icon: Store,           label: 'Shop Owners' },
  { icon: HeartPulse,      label: 'Doctors & Clinics' },
  { icon: Building2,       label: 'Manufacturers' },
  { icon: Briefcase,       label: 'Agencies' },
  { icon: GraduationCap,   label: 'Coaches' },
  { icon: ShoppingBag,     label: 'Retail Brands' },
  { icon: BookOpen,        label: 'Educators' },
  { icon: Zap,             label: 'Startups' },
  { icon: UtensilsCrossed, label: 'Restaurants' },
  { icon: Wrench,          label: 'Service Businesses' },
]

const ROADMAP = [
  { milestone: '100 Members',              sub: 'Foundation',               icon: '🌱', done: false },
  { milestone: '500 Members',              sub: 'Growing Network',           icon: '🌿', done: false },
  { milestone: '1,000 Businesses',         sub: 'Connected',                 icon: '🤝', done: false },
  { milestone: 'Local Referral Ecosystem', sub: 'Warm introductions',        icon: '🔗', done: false },
  { milestone: 'Offline Meetups',          sub: 'Ranchi & Jharkhand cities', icon: '🎯', done: false },
  { milestone: 'Digital Growth Programs',  sub: 'Workshops & sessions',      icon: '📚', done: false },
  { milestone: '10,000+ Businesses',       sub: 'Supported',                 icon: '🚀', done: false },
]

const VISION_TODAY = ['Free community for all members','Learning & discussion space','Referral opportunities','Digital guidance']
const VISION_TOMORROW = ['Workshops & offline meetups','Business events & summits','Growth sessions & masterclasses','Collaboration networks','Referral systems','Digital adoption support programs']

// ─── JOIN FORM ─────────────────────────────────────────────────────────────
function JoinForm({ onClose }: { onClose?: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', business: '', city: '' })
  const [submitted, setSubmitted] = useState(false)
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="text-center py-8">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <Check className="w-7 h-7 text-green-600" />
      </div>
      <p className="font-black text-xl text-[#1A1410] mb-1">Welcome to Jharkhand Growth Adda!</p>
      <p className="text-[#57534E] text-sm mb-4">Join the WhatsApp community to start connecting.</p>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
        style={{ background: '#25D366' }}>
        <MessageCircle className="w-5 h-5" /> Join WhatsApp Community
      </a>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">Your Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name"
            className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1A1410] bg-white focus:outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[rgba(255,101,0,0.1)] transition-all" />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">WhatsApp *</label>
          <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX"
            className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1A1410] bg-white focus:outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[rgba(255,101,0,0.1)] transition-all" />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">Business / Occupation</label>
          <input value={form.business} onChange={e => set('business', e.target.value)} placeholder="Your business type"
            className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1A1410] bg-white focus:outline-none focus:border-[#FF6500] transition-all" />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#57534E] uppercase tracking-wider mb-1.5">City</label>
          <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Ranchi"
            className="w-full border border-[#E8E3DA] rounded-xl px-4 py-3 text-sm text-[#1A1410] bg-white focus:outline-none focus:border-[#FF6500] transition-all" />
        </div>
      </div>
      <button type="submit"
        className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        style={{ background: J.orange }}>
        Join Community Free <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-center text-xs text-[#57534E]">Free for early members · No spam</p>
    </form>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function JGAClient() {
  const [showModal, setShowModal] = useState(false)

  return (
    <main style={{ background: J.bg, color: J.text, fontFamily: 'Inter, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: J.navy }}>
        {/* Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #FF6500 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[200px] opacity-10"
          style={{ background: J.orange }} />

        <div className="relative max-w-[1200px] mx-auto px-4 pt-14 pb-20 lg:pt-20 lg:pb-28">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border"
              style={{ borderColor: J.orange + '40', background: J.orange + '12', color: J.orange }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Currently free for early members
            </div>
          </div>

          <div className="text-center max-w-[780px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/50">Jharkhand Growth Adda™</p>
            <h1 className="font-black leading-[1.1] tracking-tight mb-3 text-[36px] sm:text-[52px] lg:text-[60px] text-white">
              Local Connections.<br />
              <span style={{ color: J.orange }}>Digital Growth.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-8 text-white/70 max-w-[600px] mx-auto">
              A free community for Jharkhand business owners, founders and professionals to connect, learn, collaborate and grow digitally.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity shadow-lg"
                style={{ background: J.orange, minHeight: 52 }}>
                Join Community Free <ArrowRight className="w-5 h-5" />
              </button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 text-white hover:bg-white/5 transition-colors"
                style={{ borderColor: '#25D366', minHeight: 52 }}>
                <MessageCircle className="w-5 h-5 text-green-400" /> Join WhatsApp Community
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {[
                { val: 'Free', label: 'To Join Forever' },
                { val: 'Jharkhand', label: 'Focused' },
                { val: '10,000+', label: 'Business Goal' },
                { val: 'Digital', label: 'Growth Focused' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black text-white">{s.val}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.cream }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2] mb-5" style={{ color: J.text }}>
                Running A Business<br />
                <span style={{ color: J.orange }}>Shouldn't Mean Growing Alone</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: J.sub }}>
                Thousands of business owners across Jharkhand work hard every day. But many still struggle with:
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {STRUGGLES.map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: J.orange + '15' }}>
                      <Check className="w-2.5 h-2.5" style={{ color: J.orange }} />
                    </div>
                    <span className="text-sm" style={{ color: J.sub }}>{s}</span>
                  </div>
                ))}
              </div>
              <p className="text-base font-semibold italic" style={{ color: J.text }}>
                "We believe local businesses grow faster when they grow together."
              </p>
            </div>

            {/* Visual */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🔍', label: 'Get Found Online', color: 'bg-blue-50' },
                { icon: '🤝', label: 'Build Network', color: 'bg-green-50' },
                { icon: '🤖', label: 'Adopt AI', color: 'bg-purple-50' },
                { icon: '📢', label: 'Get Referrals', color: 'bg-orange-50' },
                { icon: '⚙️', label: 'Build Systems', color: 'bg-teal-50' },
                { icon: '📈', label: 'Scale Digitally', color: 'bg-pink-50' },
              ].map(item => (
                <div key={item.label} className={`rounded-2xl p-4 text-center border ${item.color}`} style={{ borderColor: J.border }}>
                  <span className="text-2xl block mb-1.5">{item.icon}</span>
                  <p className="text-[11px] font-semibold" style={{ color: J.text }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT EXISTS ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.bg }}>
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: J.orange }}>Our Why</p>
          <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2] mb-6" style={{ color: J.text }}>
            Why Jharkhand Growth Adda Exists
          </h2>
          <div className="bg-white rounded-2xl p-8 border shadow-sm mb-8" style={{ borderColor: J.border }}>
            <p className="text-lg leading-relaxed mb-3" style={{ color: J.sub }}>
              Scalify Labs started with one simple belief:
            </p>
            <p className="text-xl font-bold mb-6" style={{ color: J.text }}>
              "If local businesses become stronger digitally,<br className="hidden sm:block" />
              Jharkhand becomes stronger economically."
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Connect founders','Encourage collaboration','Increase digital awareness','Create referrals','Share growth opportunities','Build stronger local businesses'].map(r => (
                <span key={r} className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{ background: J.orange + '08', borderColor: J.orange + '25', color: J.orange }}>
                  ✓ {r}
                </span>
              ))}
            </div>
            <div className="py-6 px-8 rounded-2xl" style={{ background: J.navy }}>
              <p className="text-sm text-white/60 uppercase tracking-widest font-semibold mb-2">Our Mission</p>
              <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Help <span style={{ color: J.orange }}>10,000+ Jharkhand Businesses</span> Grow Digitally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MEMBERS GET ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.cream }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: J.orange }}>Benefits</p>
            <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2]" style={{ color: J.text }}>
              What Members Get
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${i === 2 ? 'lg:col-span-1' : ''}`}
                style={{ borderColor: J.border }}>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${b.color}`}>
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg mb-1" style={{ color: J.text }}>{b.title}</h3>
                <p className="text-xs mb-4" style={{ color: J.sub }}>{b.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {b.items.map(item => (
                    <span key={item} className="text-[11px] px-2.5 py-1 rounded-full border font-medium"
                      style={{ background: J.bg, borderColor: J.border, color: J.sub }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD JOIN ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.bg }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: J.orange }}>Who Should Join</p>
            <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2]" style={{ color: J.text }}>
              This Community Is For You If You're A…
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {WHO.map(w => (
              <div key={w.label} className="bg-white rounded-2xl p-4 border text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200" style={{ borderColor: J.border }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-2.5"
                  style={{ background: J.orange + '10' }}>
                  <w.icon className="w-5 h-5" style={{ color: J.orange }} />
                </div>
                <p className="text-xs font-semibold" style={{ color: J.text }}>{w.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR VISION ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.cream }}>
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: J.orange }}>Vision</p>
          <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2] mb-4" style={{ color: J.text }}>
            Our Vision For Jharkhand
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: J.sub }}>
            We don't want to build another noisy WhatsApp group. We want to build:
          </p>
          <div className="bg-white rounded-2xl p-8 border shadow-sm mb-8" style={{ borderColor: J.border }}>
            <h3 className="font-black text-xl sm:text-2xl mb-8" style={{ color: J.text }}>
              Jharkhand's Most Valuable Growth Community For Business Owners
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              {['Businesses learn together','Businesses collaborate','Businesses support each other','Businesses grow together'].map(v => (
                <div key={v} className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{ background: J.orange + '06', border: `1px solid ${J.orange}15` }}>
                  <Heart className="w-4 h-4 shrink-0" style={{ color: J.orange }} />
                  <span className="text-sm font-medium" style={{ color: J.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.bg }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: J.orange }}>Community Roadmap</p>
            <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2]" style={{ color: J.text }}>
              Where We're Going
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-5 bottom-5 w-0.5 hidden sm:block" style={{ background: J.border }} />
            <div className="space-y-4">
              {ROADMAP.map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm border"
                    style={{ background: i === 6 ? J.orange : J.white, borderColor: i === 6 ? J.orange : J.border, zIndex: 1 }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 bg-white rounded-2xl px-5 py-4 border shadow-sm" style={{ borderColor: J.border }}>
                    <p className="font-bold text-base" style={{ color: i === 6 ? J.orange : J.text }}>{item.milestone}</p>
                    <p className="text-sm" style={{ color: J.sub }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER MESSAGE ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.navy }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid sm:grid-cols-[200px_1fr] gap-10 items-start">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div className="w-36 h-36 rounded-3xl overflow-hidden border-4 shadow-xl" style={{ borderColor: J.orange + '50' }}>
                <Image src="/founder.jpg" alt="Arvind Gupta" width={144} height={144} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="font-black text-white text-lg">Arvind Gupta</p>
                <p className="text-sm text-white/50">Founder, Scalify Labs</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: J.orange }}>Founder Message</p>
              <h2 className="font-black text-2xl text-white mb-5">Why I Started Jharkhand Growth Adda</h2>
              <div className="space-y-4 text-white/70 text-base leading-relaxed">
                <p>After years working in education, digital systems and business growth, one thing remained common:</p>
                <p>Many local businesses work incredibly hard but lack access to trusted networks, digital awareness and growth support.</p>
                <p className="font-semibold text-white">I believe stronger local businesses create stronger local economies.</p>
                <p>Jharkhand Growth Adda is an attempt to bring business owners together — to learn, connect and grow.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Education','Digital Systems','Business Growth','CRM & Automation','AI Workflows'].map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ background: J.orange + '15', color: J.orange, border: `1px solid ${J.orange}25` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURE VISION ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: J.cream }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: J.orange }}>Future Vision</p>
            <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2]" style={{ color: J.text }}>
              We're Just Getting Started
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: J.border }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🌱</span>
                <p className="font-black text-lg" style={{ color: J.text }}>Today</p>
              </div>
              <div className="space-y-2">
                {VISION_TODAY.map(v => (
                  <div key={v} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 shrink-0" style={{ color: J.green }} />
                    <span className="text-sm" style={{ color: J.sub }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6 shadow-sm" style={{ background: J.orange + '08', border: `1px solid ${J.orange}25` }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🚀</span>
                <p className="font-black text-lg" style={{ color: J.text }}>Tomorrow</p>
              </div>
              <div className="space-y-2">
                {VISION_TOMORROW.map(v => (
                  <div key={v} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: J.orange + '15' }}>
                      <ChevronRight className="w-2.5 h-2.5" style={{ color: J.orange }} />
                    </div>
                    <span className="text-sm" style={{ color: J.sub }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 px-4" style={{ background: J.navy }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: J.orange }}>Join Now</p>
            <h2 className="font-black text-[32px] sm:text-[44px] leading-[1.15] text-white mb-4">
              Join Jharkhand's Growing<br />
              <span style={{ color: J.orange }}>Business Community</span>
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Local Connections. Digital Growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <button onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity shadow-lg"
                style={{ background: J.orange }}>
                Join Free Community <ArrowRight className="w-5 h-5" />
              </button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 text-white hover:bg-white/5 transition-colors"
                style={{ borderColor: '#25D366' }}>
                <MessageCircle className="w-5 h-5 text-green-400" /> Join WhatsApp Community
              </a>
            </div>
            <p className="text-sm text-white/40">Founding members join free · Limited seats</p>
          </div>

          {/* Inline form */}
          <div className="bg-white rounded-2xl p-7 shadow-2xl max-w-[600px] mx-auto">
            <h3 className="font-black text-xl text-[#1A1410] mb-1">Become a Founding Member</h3>
            <p className="text-sm text-[#57534E] mb-5">Fill in below — we'll add you to the community immediately.</p>
            <JoinForm />
          </div>
        </div>
      </section>

      {/* ── POWERED BY ───────────────────────────────────────────────────── */}
      <div className="py-6 px-4 text-center border-t" style={{ background: J.navy, borderColor: 'rgba(255,255,255,0.06)' }}>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
          <div className="w-5 h-5 bg-[#FF6500] rounded-md flex items-center justify-center text-white font-black text-[10px]">S</div>
          Powered by Scalify Labs · Helping Jharkhand Businesses Grow Digitally
        </Link>
      </div>

      {/* ── MODAL ────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: J.border }}>
              <h3 className="font-black text-xl text-[#1A1410]">Join Jharkhand Growth Adda</h3>
              <p className="text-sm text-[#57534E] mt-0.5">Free for founding members</p>
              <button onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-[#F7F4EF] flex items-center justify-center text-[#57534E]">✕</button>
            </div>
            <div className="p-6">
              <JoinForm onClose={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
