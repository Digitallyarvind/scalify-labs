'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  PhoneCall, MessageCircle, Smartphone, MessageSquare,
  BarChart3, Send, Zap, Globe, Shield, RefreshCw,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  Megaphone, CreditCard, Calendar, Gift, Layers,
  Check, Activity, Sparkles, Rocket,
  Phone, Mail, User, MapPin, Briefcase,
  Users, Clock, Database, Wifi,
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURE_CARDS = [
  { icon: TrendingUp, title: 'Better Reach', desc: 'Not every customer responds on the same channel. Cover all bases.', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Activity, title: 'Higher Engagement', desc: 'Multiple touchpoints increase response rates significantly.', color: 'bg-blue-100 text-blue-600' },
  { icon: Zap, title: 'Automated Follow-Ups', desc: 'Reduce manual effort — journeys run automatically after each trigger.', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Layers, title: 'Smart User Journeys', desc: 'Trigger the right message based on what each user actually does.', color: 'bg-violet-100 text-violet-600' },
  { icon: Sparkles, title: 'Rich Customer Experience', desc: 'Voice + media + messaging together for deeper engagement.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Database, title: 'Campaign Scalability', desc: 'Run large campaigns reaching lakhs of users efficiently.', color: 'bg-orange-100 text-orange-600' },
]

const FLOWS = [
  {
    title: 'Answered → Rich Follow-Up',
    color: 'border-emerald-200 bg-emerald-50/50',
    accent: 'text-emerald-700 bg-emerald-100',
    steps: [
      { icon: PhoneCall, label: 'OBD Call', color: 'bg-indigo-100 text-indigo-600' },
      { icon: Check, label: 'User Answers', color: 'bg-emerald-100 text-emerald-600' },
      { icon: MessageCircle, label: 'WhatsApp Brochure', color: 'bg-green-100 text-green-600' },
    ],
  },
  {
    title: 'No Answer → SMS Reminder',
    color: 'border-blue-200 bg-blue-50/50',
    accent: 'text-blue-700 bg-blue-100',
    steps: [
      { icon: PhoneCall, label: 'OBD Call', color: 'bg-indigo-100 text-indigo-600' },
      { icon: X, label: 'No Answer', color: 'bg-red-100 text-red-500' },
      { icon: MessageSquare, label: 'SMS Triggered', color: 'bg-blue-100 text-blue-600' },
    ],
  },
  {
    title: 'RCS Click → Sales Action',
    color: 'border-violet-200 bg-violet-50/50',
    accent: 'text-violet-700 bg-violet-100',
    steps: [
      { icon: Smartphone, label: 'RCS Campaign', color: 'bg-violet-100 text-violet-600' },
      { icon: TrendingUp, label: 'CTA Clicked', color: 'bg-cyan-100 text-cyan-600' },
      { icon: PhoneCall, label: 'Sales Follow-Up', color: 'bg-indigo-100 text-indigo-600' },
    ],
  },
  {
    title: 'WhatsApp Open → Appointment',
    color: 'border-cyan-200 bg-cyan-50/50',
    accent: 'text-cyan-700 bg-cyan-100',
    steps: [
      { icon: MessageCircle, label: 'WhatsApp Opened', color: 'bg-green-100 text-green-600' },
      { icon: Activity, label: 'User Engaged', color: 'bg-amber-100 text-amber-600' },
      { icon: Calendar, label: 'Reminder Sent', color: 'bg-cyan-100 text-cyan-600' },
    ],
  },
]

const USE_CASES = [
  { icon: Megaphone, name: 'Political Outreach', channels: ['OBD', 'SMS', 'WA'], desc: 'Voter awareness, rally invitations, candidate messaging at scale', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: GraduationCap, name: 'Admission Campaigns', channels: ['OBD', 'WA', 'RCS'], desc: 'Reach prospective students with course details and counselling links', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: CreditCard, name: 'EMI & Payment Reminders', channels: ['OBD', 'SMS'], desc: 'Automate loan, EMI, and bill payment reminder workflows', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: HeartPulse, name: 'Healthcare Follow-Ups', channels: ['OBD', 'WA'], desc: 'Appointment reminders, health camps, lab report notifications', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { icon: Building2, name: 'Real Estate Leads', channels: ['OBD', 'RCS', 'WA'], desc: 'Site visit scheduling, property alerts, and lead nurturing', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: Calendar, name: 'Event Promotions', channels: ['OBD', 'WA', 'SMS'], desc: 'Drive event attendance with voice invites and rich media passes', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: Gift, name: 'Festival Offer Campaigns', channels: ['OBD', 'RCS', 'SMS'], desc: 'Seasonal sale alerts with interactive product carousels', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: RefreshCw, name: 'Customer Reactivation', channels: ['OBD', 'WA'], desc: 'Re-engage dormant customers with personalised voice + message journeys', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
]

const STEPS = [
  { icon: Megaphone, num: '01', title: 'Share Campaign Goal', desc: 'Tell us your target audience, campaign objective, and preferred messaging. We design the communication strategy.' },
  { icon: Database, num: '02', title: 'Upload Customer Data', desc: 'Provide your contact list in any standard format. We handle data validation and list hygiene.' },
  { icon: Layers, num: '03', title: 'Communication Flow Setup', desc: 'We configure the OBD, WhatsApp, RCS, and SMS workflows based on user action triggers.' },
  { icon: Rocket, num: '04', title: 'Campaign Launch', desc: 'Your campaign goes live. Thousands of calls and automated follow-ups run in parallel.' },
  { icon: BarChart3, num: '05', title: 'Track Responses & Engagement', desc: 'Real-time dashboard shows call status, channel deliveries, engagement rates, and lead triggers.' },
]

const ALL_FEATURES = [
  { icon: PhoneCall, name: 'Bulk OBD Calling', color: 'bg-indigo-100 text-indigo-600' },
  { icon: MessageCircle, name: 'WhatsApp Automation', color: 'bg-green-100 text-green-600' },
  { icon: Smartphone, name: 'RCS Messaging', color: 'bg-violet-100 text-violet-600' },
  { icon: MessageSquare, name: 'SMS Follow-Ups', color: 'bg-blue-100 text-blue-600' },
  { icon: Zap, name: 'Workflow Automation', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Wifi, name: 'API Support', color: 'bg-orange-100 text-orange-600' },
  { icon: Globe, name: 'Multi-Language Campaigns', color: 'bg-emerald-100 text-emerald-600' },
  { icon: BarChart3, name: 'Real-Time Reporting', color: 'bg-rose-100 text-rose-600' },
  { icon: Phone, name: 'IVR Support', color: 'bg-amber-100 text-amber-600' },
  { icon: Activity, name: 'Delivery Analytics', color: 'bg-teal-100 text-teal-600' },
  { icon: RefreshCw, name: 'Retry Logic', color: 'bg-slate-100 text-slate-600' },
  { icon: Sparkles, name: 'Campaign Assistance', color: 'bg-purple-100 text-purple-600' },
]

const WHY_CARDS = [
  { icon: Users, title: 'Multi-Channel Expertise', desc: 'OBD + WhatsApp + RCS + SMS — a single team managing your entire outreach stack.' },
  { icon: Sparkles, title: 'Campaign Execution Partner', desc: 'We don\'t just provide credits. We design, run, and optimise your campaigns end-to-end.' },
  { icon: Database, title: 'High-Volume Infrastructure', desc: 'Carrier-grade systems capable of handling lakhs of calls and messages per campaign.' },
  { icon: Zap, title: 'Automation Workflows', desc: 'Action-based triggers automatically route each user to the next relevant channel.' },
  { icon: Clock, title: 'Fast Campaign Deployment', desc: 'From goal-sharing to campaign launch in 48–72 hours for most campaign types.' },
  { icon: Shield, title: 'Enterprise Communication Systems', desc: 'Compliance-first approach with proper opt-out, DND filtering, and TRAI guidelines.' },
]

const FAQ_ITEMS = [
  { q: 'What is OBD calling?', a: 'OBD (Outbound Dialling) is an automated calling system that delivers pre-recorded voice messages to thousands of users simultaneously. It is used for promotional campaigns, reminders, alerts, and customer engagement at scale across India.' },
  { q: 'Can campaigns combine WhatsApp and SMS automatically?', a: 'Yes. Scalify Labs sets up multi-channel workflows where the system automatically sends a WhatsApp message, RCS message, or SMS based on how a user responds to the OBD call — answered, not answered, or callback requested.' },
  { q: 'Can workflows trigger automatically based on user actions?', a: 'Yes. The entire journey is automated. If a user answers the call, the system triggers a WhatsApp brochure. If they don\'t answer, it queues an SMS reminder. If they press a key response (IVR), the system flags them as a lead and initiates a follow-up.' },
  { q: 'Do you support regional languages?', a: 'Yes. We support campaign recordings and messaging in Hindi, Bengali, Odia, Tamil, Telugu, Kannada, Marathi, Gujarati, and other regional Indian languages. Custom voice recordings are available.' },
  { q: 'Can campaigns scale to lakhs of users?', a: 'Yes. Our infrastructure is designed for high-volume bulk campaigns. We regularly execute campaigns reaching 1 lakh to 50 lakh+ users across India for education, political, healthcare, and retail clients.' },
  { q: 'Do you provide campaign management support?', a: 'Yes. Campaign management is included — from content creation and flow design to scheduling, monitoring, and post-campaign analytics. You share the goal; we execute the entire campaign.' },
  { q: 'Is pricing volume based?', a: 'Yes. Pricing depends on the total number of calls, channels used (OBD only vs. multi-channel), workflow automation complexity, and campaign type. Starting from ₹0.15 per call for high-volume campaigns. Contact us for a custom quote.' },
  { q: 'Can I track reports and analytics?', a: 'Yes. You get access to real-time campaign dashboards showing call delivery rates, answered vs. not-answered breakdowns, channel-wise engagement, lead triggers, and response summaries.' },
]

// ─── ENQUIRY MODAL ─────────────────────────────────────────────────────────────

function EnquiryModal({ onClose, title }: { onClose: () => void; title?: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', city: '', message: '' })
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
        name: form.name.trim(), phone: form.phone.trim(),
        email: form.email || undefined, business: form.business || undefined,
        city: form.city || undefined, source: 'obd-page',
        service_interest: 'OBD Voice Calls',
        message: form.message || undefined,
      })
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="font-bold text-navy text-lg">{title ?? 'Start Your Campaign'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Enquiry Received!</h4>
            <p className="text-slate-600 text-sm mb-6">Our campaign team will contact you within 2 hours.</p>
            <button onClick={onClose} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Your company" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="e.g. Ranchi" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Campaign Details / Volume</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" placeholder="E.g. Need OBD + WhatsApp campaign for 5 lakh users, education sector…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Start Campaign <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── CHANNEL PILL ─────────────────────────────────────────────────────────────

function ChannelPill({ ch }: { ch: string }) {
  const map: Record<string, string> = { OBD: 'bg-indigo-100 text-indigo-700', WA: 'bg-green-100 text-green-700', RCS: 'bg-violet-100 text-violet-700', SMS: 'bg-blue-100 text-blue-700' }
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${map[ch] ?? 'bg-slate-100 text-slate-600'}`}>{ch}</span>
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function OBDPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                Multi-Channel Campaign Execution · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Automated OBD Call Campaigns With{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  WhatsApp, RCS &amp; SMS Journeys
                </span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Launch scalable voice campaigns and automatically continue customer engagement using WhatsApp, RCS, and SMS based on user actions and responses.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
                <PhoneCall className="w-4 h-4 text-indigo-600" />
                <span className="text-indigo-800 text-sm font-semibold">Starting from just <strong>₹0.15 per call</strong> for higher volumes</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-full shadow-lg shadow-indigo-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Start Campaign <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Talk to an Expert')} className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-colors">
                  Talk to Expert
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['High-Volume Campaign Support', 'Multi-Channel Communication Flows', 'Automated Follow-Up Journeys', 'Real-Time Reports & Analytics', 'Campaign Management Support', 'Regional Language Support'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Campaign Dashboard Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-3xl blur-3xl opacity-15 scale-105" />

                {/* Dashboard card */}
                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* Title bar */}
                  <div className="bg-navy px-5 py-3 flex items-center justify-between">
                    <span className="text-white text-sm font-bold flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-indigo-300" /> Live Campaign Dashboard
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-xs font-bold">LIVE</span>
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100">
                    {[{ l: 'Total', v: '2,50,000', c: 'text-navy' }, { l: 'Answered', v: '1,87,500', c: 'text-emerald-600' }, { l: 'No Answer', v: '62,500', c: 'text-red-500' }, { l: 'Triggered', v: '45,230', c: 'text-indigo-600' }].map(s => (
                      <div key={s.l} className="py-3 px-2 text-center border-r last:border-r-0 border-slate-100">
                        <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
                        <p className="text-[9px] text-slate-500 font-medium mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  {/* Flow diagram */}
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Automation Flow</p>
                    <div className="space-y-2">
                      {/* Answered flow */}
                      <div className="flex items-center gap-1.5 bg-emerald-50 rounded-xl px-3 py-2">
                        <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><PhoneCall className="w-3 h-3 text-indigo-600" /></div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-emerald-600" /></div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center shrink-0"><MessageCircle className="w-3 h-3 text-green-600" /></div>
                        <span className="text-[10px] font-semibold text-slate-600 ml-1">OBD → Answered → WhatsApp</span>
                      </div>
                      {/* No answer flow */}
                      <div className="flex items-center gap-1.5 bg-blue-50 rounded-xl px-3 py-2">
                        <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><PhoneCall className="w-3 h-3 text-indigo-600" /></div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center shrink-0"><X className="w-3 h-3 text-red-500" /></div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center shrink-0"><MessageSquare className="w-3 h-3 text-blue-600" /></div>
                        <span className="text-[10px] font-semibold text-slate-600 ml-1">OBD → No Answer → SMS</span>
                      </div>
                      {/* RCS flow */}
                      <div className="flex items-center gap-1.5 bg-violet-50 rounded-xl px-3 py-2">
                        <div className="w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center shrink-0"><Smartphone className="w-3 h-3 text-violet-600" /></div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0"><TrendingUp className="w-3 h-3 text-cyan-600" /></div>
                        <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><PhoneCall className="w-3 h-3 text-indigo-600" /></div>
                        <span className="text-[10px] font-semibold text-slate-600 ml-1">RCS → Click → Sales Call</span>
                      </div>
                    </div>
                  </div>
                  {/* Live activity */}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Activity</p>
                    <div className="space-y-1.5">
                      {[
                        { num: '+91 98765...', status: 'Answered', next: 'WA Sent', dot: 'bg-emerald-400' },
                        { num: '+91 87654...', status: 'No Answer', next: 'SMS Queued', dot: 'bg-amber-400' },
                        { num: '+91 76543...', status: 'Interested', next: 'Lead Created', dot: 'bg-indigo-400' },
                        { num: '+91 65432...', status: 'Callback', next: 'RCS Sent', dot: 'bg-violet-400' },
                      ].map(a => (
                        <div key={a.num} className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-b-0">
                          <div className={`w-1.5 h-1.5 rounded-full ${a.dot} shrink-0`} />
                          <span className="text-[10px] font-mono text-slate-500 w-24 shrink-0">{a.num}</span>
                          <span className="text-[10px] font-semibold text-slate-700 flex-1">{a.status}</span>
                          <span className="text-[10px] text-indigo-600 font-bold">{a.next}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Response Rate</p><p className="text-sm font-extrabold text-slate-900">75% Answered</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-indigo-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">High Volume</p>
                  <p className="text-lg font-black">₹0.15<span className="text-xs font-semibold opacity-80">/call</span></p>
                </div>
                <div className="absolute top-14 -left-8 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center"><MessageCircle className="w-2.5 h-2.5 text-green-600" /></div>
                    <div className="w-5 h-5 bg-violet-100 rounded-md flex items-center justify-center"><Smartphone className="w-2.5 h-2.5 text-violet-600" /></div>
                    <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center"><MessageSquare className="w-2.5 h-2.5 text-blue-600" /></div>
                  </div>
                  <p className="text-[8px] font-bold text-slate-700 mt-1">3 Channels Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Built for</span>
            {[
              { icon: GraduationCap, label: 'Education' }, { icon: HeartPulse, label: 'Healthcare' },
              { icon: Megaphone, label: 'Political Campaigns' }, { icon: Building2, label: 'Real Estate' },
              { icon: Store, label: 'Retail' }, { icon: CreditCard, label: 'Financial Services' },
              { icon: ShoppingBag, label: 'Local Businesses' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                <Icon className="w-4 h-4" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT MAKES THIS DIFFERENT ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Traditional vs Modern illustration */}
            <div className="space-y-6">
              {/* Traditional */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Traditional Approach</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center shrink-0"><MessageSquare className="w-5 h-5 text-slate-500" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Single SMS Blast</p>
                    <p className="text-xs text-slate-500">Send → forget. No follow-up. No tracking.</p>
                  </div>
                  <div className="ml-auto text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded-lg">Low ROI</div>
                </div>
              </div>

              {/* Modern journey */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Scalify Labs Journey</p>
                <div className="space-y-2">
                  {[
                    { icon: PhoneCall, label: 'OBD Voice Call', color: 'bg-indigo-100 text-indigo-600', note: 'Trigger' },
                    { icon: MessageCircle, label: 'WhatsApp follow-up', color: 'bg-green-100 text-green-600', note: 'If answered' },
                    { icon: Smartphone, label: 'RCS campaign triggered', color: 'bg-violet-100 text-violet-600', note: 'Android users' },
                    { icon: MessageSquare, label: 'SMS reminder', color: 'bg-blue-100 text-blue-600', note: 'If no answer' },
                    { icon: RefreshCw, label: 'Follow-up reminder', color: 'bg-cyan-100 text-cyan-600', note: 'Auto-retry' },
                    { icon: BarChart3, label: 'Response tracking', color: 'bg-emerald-100 text-emerald-600', note: 'Live data' },
                  ].map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      {i > 0 && <div className="absolute ml-4 -mt-3 w-0.5 h-3 bg-indigo-200" />}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}><s.icon className="w-4 h-4" /></div>
                      <span className="text-sm font-semibold text-slate-700 flex-1">{s.label}</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{s.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> The Scalify Labs Difference
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
                More Than Bulk Calling.<br />Complete Communication Journeys.
              </h2>
              <p className="text-slate-600 leading-relaxed">Most providers only offer bulk calling credits. Scalify Labs helps businesses execute <strong className="text-navy">complete communication campaigns</strong> using multiple channels working together.</p>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Example Workflow</p>
                <div className="space-y-1.5 text-sm text-slate-700">
                  <p>📞 User receives OBD voice call</p>
                  <p>→ If unanswered → <strong>SMS reminder triggered</strong></p>
                  <p>→ If interested → <strong>WhatsApp brochure sent</strong></p>
                  <p>→ If Android user → <strong>RCS campaign triggered</strong></p>
                  <p>→ Continue engagement automatically</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Better campaign reach', 'Higher customer response', 'Improved conversion rates', 'Fully automated follow-ups'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SMART CAMPAIGN FLOWS ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Automation Intelligence</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Smart Campaign Flows Based on Customer Actions</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">Every user action automatically triggers the right next step — no manual intervention required.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {FLOWS.map((flow) => (
              <div key={flow.title} className={`rounded-2xl border p-5 ${flow.color}`}>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${flow.accent}`}>{flow.title}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {flow.steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${step.color}`}>
                          <step.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-600 text-center max-w-[60px] leading-tight">{step.label}</span>
                      </div>
                      {i < flow.steps.length - 1 && (
                        <div className="flex flex-col items-center mb-4">
                          <div className="w-6 h-0.5 bg-slate-300 rounded" />
                          <ArrowRight className="w-3 h-3 text-slate-400 -mt-0.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY MULTI-CHANNEL ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Omnichannel Advantage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Reach Customers Across Multiple Communication Channels</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_CARDS.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${card.color}`}><card.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Campaign Types</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Campaigns Businesses Run With Scalify Labs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {USE_CASES.map((uc) => (
              <div key={uc.name} className={`bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${uc.color}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${uc.color}`}><uc.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{uc.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{uc.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {uc.channels.map(ch => <ChannelPill key={ch} ch={ch} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Campaign Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">How Campaign Execution Works</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">From goal to go-live in 48–72 hours for most campaigns.</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-indigo-100 via-blue-200 to-indigo-100" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-indigo-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-indigo-400 transition-colors">
                  <step.icon className="w-7 h-7 text-indigo-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-2 w-4 h-4 text-indigo-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Full Stack Platform</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Enterprise Communication Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {ALL_FEATURES.map(f => (
                  <div key={f.name} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}><f.icon className="w-4 h-4" /></div>
                    <span className="text-xs font-semibold text-slate-700">{f.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-full shadow-lg shadow-indigo-200 hover:opacity-90 transition-opacity">
                Start Campaign <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Analytics dashboard */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                <span className="text-xs text-slate-500 font-medium mx-auto">Multi-Channel Campaign Analytics</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[{ l: 'Total Calls', v: '5,00,000', c: 'text-indigo-600' }, { l: 'Answered', v: '3,75,000', c: 'text-emerald-600' }, { l: 'WA Sent', v: '2,10,000', c: 'text-green-600' }, { l: 'SMS Triggered', v: '1,25,000', c: 'text-blue-600' }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[{ l: 'Call Answer Rate', v: 75, c: 'bg-indigo-500' }, { l: 'WhatsApp Open Rate', v: 82, c: 'bg-green-500' }, { l: 'SMS Click-Through', v: 18, c: 'bg-blue-500' }, { l: 'Overall Engagement', v: 43, c: 'bg-violet-500' }].map(b => (
                    <div key={b.l}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-600">{b.l}</span>
                        <span className="text-xs font-bold text-slate-900">{b.v}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${b.c}`} style={{ width: `${b.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-indigo-600" /></div>
                  <div>
                    <p className="text-xs font-bold text-navy">Campaign Management — Included</p>
                    <p className="text-[10px] text-indigo-600">Strategy · Execution · Reporting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-10" />
          {/* Network grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Flexible Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">High-Volume Campaign Pricing</h2>
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 mb-8">
            <PhoneCall className="w-6 h-6 text-indigo-300 shrink-0" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Starting from</p>
              <p className="text-3xl font-black text-white">₹0.15<span className="text-base font-semibold text-slate-400"> per call</span></p>
              <p className="text-xs text-slate-400 mt-0.5">For higher campaign volumes</p>
            </div>
          </div>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Pricing varies based on volume, channels used, automation workflow complexity, and campaign type.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Campaign Volume', 'Channels (OBD / WA / RCS / SMS)', 'Automation Workflows', 'Campaign Type'].map(f => (
              <span key={f} className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-slate-300 font-medium">{f}</span>
            ))}
          </div>
          <p className="text-slate-500 text-sm mb-8">Bulk campaign pricing available for enterprises, political parties, and agencies.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all">
              Start Campaign <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Get Custom Pricing')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Get Custom Pricing
            </button>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Your Campaign Partner</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Not just a calling platform. A complete communication campaign execution partner.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map((card) => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFAQ === i}
                >
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-56' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.05]" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400 rounded-full blur-[120px] opacity-[0.06]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Your Communication Campaign Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Launch Smarter Communication Campaigns Across Calls, WhatsApp, RCS &amp; SMS
          </h2>
          <p className="text-white/80 text-lg mb-3">Automate outreach, follow-ups, reminders, and engagement journeys with enterprise-grade campaign execution systems.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Campaign management included — we handle execution end-to-end
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Start Campaign <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Talk to an Expert')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Talk to Expert
            </button>
          </div>
          <p className="text-white/40 text-xs mt-6">OBD · WhatsApp · RCS · SMS · Campaign Management Included</p>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold rounded-xl shadow shadow-indigo-200">
          Start Campaign
        </button>
        <button onClick={() => open('Talk to an Expert')} className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 text-sm font-bold rounded-xl">
          Talk to Expert
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
