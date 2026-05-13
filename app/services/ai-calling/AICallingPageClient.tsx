'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  MessageCircle, BrainCircuit, BarChart3, Send, Zap, Shield, RefreshCw,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store, CreditCard,
  BookOpen, Check, Activity, Sparkles, Rocket, Megaphone,
  Phone, Mail, User, MapPin, Briefcase,
  Database, Globe, Clock, Calendar, Users, Layers,
  Mic, PhoneCall, Cpu, Wifi, FileText, Star,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { icon: Users, title: 'Lead Qualification', desc: 'Automatically identify interested leads using AI-driven voice conversations.', glow: 'shadow-blue-500/20 border-blue-500/20' },
  { icon: Calendar, title: 'Appointment Booking', desc: 'Schedule meetings, demos, and consultations with automated voice confirmation.', glow: 'shadow-violet-500/20 border-violet-500/20' },
  { icon: RefreshCw, title: 'Follow-Up Calls', desc: 'Automate multi-step customer nurturing sequences across days and weeks.', glow: 'shadow-cyan-500/20 border-cyan-500/20' },
  { icon: PhoneCall, title: 'Customer Support', desc: 'Handle high-volume repetitive support queries without human agents.', glow: 'shadow-indigo-500/20 border-indigo-500/20' },
  { icon: CreditCard, title: 'Payment Reminders', desc: 'Send automated EMI, due-date, and subscription renewal voice reminders.', glow: 'shadow-emerald-500/20 border-emerald-500/20' },
  { icon: Star, title: 'Survey & Feedback', desc: 'Collect structured customer feedback and satisfaction ratings at scale.', glow: 'shadow-amber-500/20 border-amber-500/20' },
  { icon: TrendingUp, title: 'Sales Outreach', desc: 'Run scalable outbound sales calling campaigns with intelligent routing.', glow: 'shadow-rose-500/20 border-rose-500/20' },
  { icon: MessageCircle, title: 'WhatsApp Triggering', desc: 'Continue customer journeys on WhatsApp automatically after each call.', glow: 'shadow-green-500/20 border-green-500/20' },
]

const FLOWS = [
  {
    title: 'Lead Qualification Flow',
    tag: 'Lead Gen',
    color: 'border-blue-500/20 bg-blue-950/30',
    accent: 'bg-blue-900/50 text-blue-300',
    steps: [
      { icon: Megaphone, label: 'Ad Lead', color: 'bg-blue-900 text-blue-300' },
      { icon: Mic, label: 'AI Call', color: 'bg-indigo-900 text-indigo-300' },
      { icon: Check, label: 'Qualified', color: 'bg-emerald-900 text-emerald-300' },
      { icon: MessageCircle, label: 'WA Brochure', color: 'bg-green-900 text-green-300' },
    ],
  },
  {
    title: 'Appointment Reminder',
    tag: 'Scheduling',
    color: 'border-violet-500/20 bg-violet-950/30',
    accent: 'bg-violet-900/50 text-violet-300',
    steps: [
      { icon: Calendar, label: 'Reminder Due', color: 'bg-violet-900 text-violet-300' },
      { icon: Mic, label: 'AI Call', color: 'bg-indigo-900 text-indigo-300' },
      { icon: Check, label: 'Confirmed', color: 'bg-emerald-900 text-emerald-300' },
      { icon: Database, label: 'CRM Updated', color: 'bg-blue-900 text-blue-300' },
    ],
  },
  {
    title: 'Payment Reminder',
    tag: 'Finance',
    color: 'border-cyan-500/20 bg-cyan-950/30',
    accent: 'bg-cyan-900/50 text-cyan-300',
    steps: [
      { icon: CreditCard, label: 'Due Date', color: 'bg-cyan-900 text-cyan-300' },
      { icon: Mic, label: 'AI Call', color: 'bg-indigo-900 text-indigo-300' },
      { icon: PhoneCall, label: 'IVR Press', color: 'bg-amber-900 text-amber-300' },
      { icon: Send, label: 'SMS Sent', color: 'bg-blue-900 text-blue-300' },
    ],
  },
  {
    title: 'Missed Call Callback',
    tag: 'Re-engagement',
    color: 'border-emerald-500/20 bg-emerald-950/30',
    accent: 'bg-emerald-900/50 text-emerald-300',
    steps: [
      { icon: X, label: 'Missed Call', color: 'bg-red-900 text-red-300' },
      { icon: Mic, label: 'AI Callback', color: 'bg-indigo-900 text-indigo-300' },
      { icon: Users, label: 'Lead Captured', color: 'bg-emerald-900 text-emerald-300' },
    ],
  },
]

const WHY_FEATURES = [
  { icon: Clock, title: '24×7 Automated Calling', desc: 'AI agents work around the clock, calling leads at the optimal time.' },
  { icon: Users, title: 'Reduce Manual Calling Teams', desc: 'Replace repetitive dialling tasks with intelligent automation.' },
  { icon: TrendingUp, title: 'Scalable Outreach', desc: 'Call thousands of customers simultaneously without infrastructure investment.' },
  { icon: Zap, title: 'Instant Follow-Ups', desc: 'Trigger a call seconds after a lead fills a form or clicks an ad.' },
  { icon: Mic, title: 'Human-Like Conversations', desc: 'Natural language AI that sounds and responds like a real human agent.' },
  { icon: Activity, title: 'Smart Lead Routing', desc: 'Interested leads are instantly routed to the right sales representative.' },
  { icon: BrainCircuit, title: 'Faster Response Handling', desc: 'No more waiting — every lead gets an immediate, intelligent response.' },
  { icon: Layers, title: 'Automated Engagement Workflows', desc: 'Multi-touch journeys that combine calls, WhatsApp, and SMS automatically.' },
]

const INTEGRATIONS = [
  { icon: MessageCircle, name: 'WhatsApp', color: 'bg-green-900/50 text-green-400 border-green-500/20' },
  { icon: Database, name: 'CRM Systems', color: 'bg-blue-900/50 text-blue-400 border-blue-500/20' },
  { icon: FileText, name: 'Google Sheets', color: 'bg-emerald-900/50 text-emerald-400 border-emerald-500/20' },
  { icon: Megaphone, name: 'Lead Forms', color: 'bg-orange-900/50 text-orange-400 border-orange-500/20' },
  { icon: Send, name: 'SMS Gateway', color: 'bg-cyan-900/50 text-cyan-400 border-cyan-500/20' },
  { icon: PhoneCall, name: 'RCS Messaging', color: 'bg-violet-900/50 text-violet-400 border-violet-500/20' },
  { icon: Calendar, name: 'Calendar Apps', color: 'bg-red-900/50 text-red-400 border-red-500/20' },
  { icon: Wifi, name: 'REST APIs', color: 'bg-slate-700/50 text-slate-300 border-slate-500/20' },
]

const INDUSTRIES = [
  { icon: GraduationCap, name: 'Education Admissions', use: 'Admission inquiries, counsellor assignment, document reminders', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: HeartPulse, name: 'Clinics & Hospitals', use: 'Appointment reminders, post-visit follow-ups, health alerts', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: Building2, name: 'Real Estate', use: 'Site visit scheduling, property alerts, NRI buyer outreach', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: CreditCard, name: 'Financial Services', use: 'EMI reminders, loan offers, policy renewals, KYC follow-ups', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: ShoppingBag, name: 'Ecommerce', use: 'Order confirmations, delivery alerts, return follow-ups', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: BookOpen, name: 'Coaching Institutes', use: 'Batch reminders, result alerts, admission follow-ups', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: Megaphone, name: 'Political Campaigns', use: 'Voter outreach, rally invitations, candidate messaging at scale', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { icon: Store, name: 'Local Businesses', use: 'Offer alerts, event invites, customer reactivation campaigns', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
]

const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '₹15,000',
    period: '/month',
    desc: 'For businesses starting with AI calling automation',
    highlight: false,
    features: ['Basic AI voice workflow', 'Up to 1 active AI campaign', 'Reporting dashboard', 'CRM integration support', 'Email & chat support'],
  },
  {
    name: 'Growth',
    price: '₹35,000',
    period: '/month',
    desc: 'For growing businesses with multi-channel automation',
    highlight: true,
    badge: 'Most Popular',
    features: ['Advanced AI workflows', 'WhatsApp integration', 'Lead qualification flows', 'Multi-step automation', 'Analytics & reporting', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    desc: 'For large-scale AI communication infrastructure',
    highlight: false,
    features: ['Dedicated AI workflows', 'Full API integrations', 'Multi-language AI agents', 'Large-scale automation', 'Dedicated account manager', 'SLA & priority support'],
  },
]

const WHY_CARDS = [
  { icon: BrainCircuit, title: 'AI Workflow Expertise', desc: 'We build conversation flows, qualification logic, and multi-step journeys — not just auto-dialers.' },
  { icon: Zap, title: 'Automation-First Approach', desc: 'Every call triggers the right next action automatically — WhatsApp, CRM, SMS, or escalation.' },
  { icon: Globe, title: 'Communication Infrastructure', desc: 'End-to-end AI calling infrastructure tailored to your industry, team, and customer journey.' },
  { icon: Layers, title: 'Multi-Channel Integration', desc: 'Connect AI calls seamlessly with WhatsApp, RCS, SMS, CRM, and calendar systems.' },
  { icon: Activity, title: 'Real-Time Analytics', desc: 'Every call scored, transcribed, and logged. Know what\'s working at every step.' },
  { icon: Shield, title: 'Scalable Execution Systems', desc: 'From 1,000 to 10 lakh+ calls — our infrastructure scales with your growth.' },
]

const FAQ_ITEMS = [
  { q: 'What is AI calling?', a: 'AI calling uses conversational voice AI technology to conduct real phone conversations with customers. The AI understands what the customer says, responds naturally in real-time, asks qualification questions, books appointments, and triggers follow-up actions — exactly like a human agent, but operating 24/7 at scale.' },
  { q: 'Can AI calls sound human-like?', a: 'Yes. Modern AI voice technology uses natural language processing and neural text-to-speech to produce very natural-sounding voices in multiple languages and accents. Most callers cannot distinguish an AI call from a human call in standard business scenarios.' },
  { q: 'Can AI call workflows connect with WhatsApp?', a: 'Yes. AI call workflows can automatically trigger WhatsApp messages based on call outcomes — for example, sending a brochure to interested leads, an appointment confirmation to booked customers, or an SMS reminder to those who missed the call.' },
  { q: 'Do you support regional languages?', a: 'Yes. AI calling systems support Hindi, Bengali, Tamil, Telugu, Kannada, Marathi, Gujarati, Odia, and other major Indian regional languages, enabling localised voice conversations for better customer connect.' },
  { q: 'Can AI qualify leads automatically?', a: 'Yes. AI agents ask pre-defined qualification questions (budget, timeline, interest level, location), analyse responses, score leads, tag them in your CRM, and route hot leads to your sales team in real-time.' },
  { q: 'Is CRM integration supported?', a: 'Yes. AI calling systems integrate with major CRM platforms including Zoho, HubSpot, Salesforce, and custom CRMs via API. Call outcomes, lead scores, and conversation summaries sync automatically after each call.' },
  { q: 'How is pricing calculated?', a: 'Our plans start at ₹15,000/month for basic AI calling workflows. Voice minutes (actual call duration) and telecom usage are billed separately based on actual consumption. Enterprise plans with custom volumes and dedicated AI agents are priced on scope.' },
  { q: 'Can AI handle inbound calls?', a: 'Yes. AI agents can handle both outbound campaigns (calling leads proactively) and inbound calls (answering customer queries, booking appointments, collecting information). Inbound AI agents can operate as virtual receptionists 24/7.' },
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
    setSubmitting(true); setError('')
    try {
      await submitLead({
        name: form.name.trim(), phone: form.phone.trim(),
        email: form.email || undefined, business: form.business || undefined,
        city: form.city || undefined, source: 'ai-calling-page',
        service_interest: 'AI Calling & Voice Automation',
        message: form.message || undefined,
      })
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book AI Calling Demo'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-blue-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Demo Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our AI calling team will contact you within 2 hours to schedule your live demo.</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your company" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Ranchi" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Use Case / Business Goal</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="E.g. Need AI calling to qualify 500 daily leads for coaching institute…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Book AI Demo <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function AICallingPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  // Voice waveform bars
  const waveBars = [3, 6, 10, 14, 8, 16, 5, 12, 15, 7, 11, 9, 13, 6, 10, 4, 12, 15, 8, 11]

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                <BrainCircuit className="w-3.5 h-3.5" />
                AI-Powered Communication Infrastructure · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                AI Calling Agents for{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Automated Customer
                </span>{' '}
                Conversations
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Automate lead qualification, follow-ups, appointment booking, reminders, customer engagement, and sales communication using AI-powered voice calling systems built for Indian businesses.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
                <Mic className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800 text-sm font-semibold">Available for <strong>inbound and outbound</strong> calling workflows</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book AI Calling Demo <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Talk to Expert')} className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors">
                  Talk to Expert
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['AI Voice Conversations', 'Automated Follow-Ups', 'Multi-Language Support', 'CRM & WhatsApp Integration', 'Scalable Calling Infrastructure', 'Real-Time Call Analytics'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — AI Calling Terminal */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-3xl blur-3xl opacity-20 scale-105" />

                {/* Dark AI terminal */}
                <div className="relative bg-[#050810] rounded-3xl border border-blue-500/25 shadow-2xl shadow-blue-500/10 overflow-hidden w-full max-w-[420px]">
                  {/* Terminal bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-blue-300 text-xs font-mono font-bold tracking-widest">AI CALLING SYSTEM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-blue-400 text-[10px] font-mono">LIVE · 0:42</span>
                    </div>
                  </div>

                  {/* Active call */}
                  <div className="px-4 py-4 border-b border-blue-500/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
                          <Mic className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-[11px] font-bold leading-tight">AI Voice Agent</p>
                          <p className="text-blue-400 text-[9px]">Scalify Labs · Active</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-300 text-[10px] font-mono">+91 98765-43210</p>
                        <p className="text-slate-500 text-[9px]">Ravi Sharma · Lead #4521</p>
                      </div>
                    </div>

                    {/* Waveform */}
                    <div className="flex items-center justify-center gap-[2px] h-10 py-1 bg-blue-950/40 rounded-xl px-3">
                      {waveBars.map((h, i) => (
                        <div
                          key={i}
                          className="rounded-full bg-gradient-to-t from-blue-600 to-cyan-400"
                          style={{
                            width: '3px',
                            height: `${(h / 16) * 100}%`,
                            opacity: 0.5 + (h / 16) * 0.5,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Live transcript */}
                  <div className="px-4 py-3 border-b border-blue-500/10">
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wider mb-2">Live Transcript</p>
                    <div className="space-y-1.5">
                      <div className="flex gap-2">
                        <span className="text-blue-400 text-[9px] font-bold shrink-0 w-6">AI:</span>
                        <p className="text-slate-300 text-[10px] leading-relaxed">&quot;Hi Ravi, I&apos;m calling from Scalify Labs. You recently enquired about digital marketing. Are you still looking for services?&quot;</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400 text-[9px] font-bold shrink-0 w-6">User:</span>
                        <p className="text-slate-400 text-[10px] leading-relaxed">&quot;Yes, I&apos;m interested. Can you tell me about pricing?&quot;</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-blue-400 text-[9px] font-bold shrink-0 w-6">AI:</span>
                        <div className="flex items-center gap-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                          </div>
                          <p className="text-blue-400 text-[10px] italic">Generating response…</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Automation triggers */}
                  <div className="px-4 py-3">
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wider mb-2">Automation Triggered</p>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Lead Qualified', action: 'CRM Updated', dot: 'bg-emerald-400' },
                        { label: 'High Interest Detected', action: 'WA Brochure Sent', dot: 'bg-blue-400' },
                        { label: 'Appointment Offered', action: 'Calendar Synced', dot: 'bg-violet-400' },
                      ].map(t => (
                        <div key={t.label} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${t.dot} shrink-0`} />
                          <span className="text-slate-300 text-[9px] font-semibold flex-1">{t.label}</span>
                          <span className="text-[9px] font-bold text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded-full">{t.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center"><CheckCircle className="w-4 h-4 text-emerald-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Lead</p><p className="text-sm font-extrabold text-slate-900">Qualified ✓</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">AI Agent</p>
                  <p className="text-sm font-black flex items-center gap-1"><Mic className="w-3.5 h-3.5" /> Live Call</p>
                </div>
                <div className="absolute top-16 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-700">Appointment Booked</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">15 May · 11:00 AM</p>
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
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Calling Use Cases Across</span>
            {[{ icon: GraduationCap, l: 'Education' }, { icon: HeartPulse, l: 'Healthcare' }, { icon: Building2, l: 'Real Estate' }, { icon: CreditCard, l: 'Financial Services' }, { icon: ShoppingBag, l: 'Ecommerce' }, { icon: Store, l: 'Local Businesses' }].map(({ icon: Icon, l }) => (
              <div key={l} className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                <Icon className="w-4 h-4" />{l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT IS AI CALLING ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="bg-[#050810] rounded-3xl border border-blue-500/20 p-6 shadow-xl shadow-blue-500/5">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-5">AI Communication Flow</p>
              {/* Customer → AI Agent → Systems */}
              <div className="flex flex-col items-center gap-0">
                {/* Customer */}
                <div className="bg-blue-900/30 border border-blue-500/20 rounded-2xl px-5 py-3 text-center">
                  <div className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center mx-auto mb-1"><User className="w-5 h-5 text-blue-300" /></div>
                  <p className="text-white text-sm font-bold">Customer</p>
                  <p className="text-blue-400 text-[10px]">Speaks naturally</p>
                </div>
                {/* Arrow + waveform */}
                <div className="flex flex-col items-center py-2 gap-1">
                  <ArrowRight className="w-4 h-4 text-blue-500 rotate-90" />
                  <div className="flex items-center gap-[2px] h-6">
                    {[4, 8, 12, 6, 14, 5, 10, 13, 7].map((h, i) => (
                      <div key={i} className="rounded-full bg-blue-500" style={{ width: '2px', height: `${(h / 14) * 100}%`, opacity: 0.5 + (h / 14) * 0.5 }} />
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-500 rotate-90" />
                </div>
                {/* AI Agent */}
                <div className="bg-gradient-to-br from-blue-900/60 to-violet-900/60 border border-blue-400/30 rounded-2xl px-6 py-4 text-center w-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-1.5 shadow-lg shadow-blue-500/30"><BrainCircuit className="w-6 h-6 text-white" /></div>
                  <p className="text-white text-sm font-bold">AI Voice Agent</p>
                  <p className="text-blue-300 text-[10px]">Understands · Responds · Acts</p>
                  <div className="flex justify-center gap-1.5 mt-2">
                    <span className="text-[8px] bg-blue-800/60 text-blue-300 px-2 py-0.5 rounded-full">NLP</span>
                    <span className="text-[8px] bg-violet-800/60 text-violet-300 px-2 py-0.5 rounded-full">Neural TTS</span>
                    <span className="text-[8px] bg-indigo-800/60 text-indigo-300 px-2 py-0.5 rounded-full">Real-time</span>
                  </div>
                </div>
                {/* Arrow */}
                <div className="py-2"><ArrowRight className="w-4 h-4 text-blue-500 rotate-90" /></div>
                {/* Systems */}
                <div className="grid grid-cols-3 gap-2 w-full">
                  {[{ icon: Database, label: 'CRM', color: 'bg-blue-900/30 border-blue-500/20 text-blue-300' }, { icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-900/30 border-green-500/20 text-green-300' }, { icon: Calendar, label: 'Calendar', color: 'bg-violet-900/30 border-violet-500/20 text-violet-300' }].map(s => (
                    <div key={s.label} className={`border rounded-xl px-2 py-2.5 text-center ${s.color}`}>
                      <s.icon className="w-4 h-4 mx-auto mb-1" />
                      <p className="text-[9px] font-bold">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" /> Voice AI Technology
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">What is AI Calling?</h2>
              <p className="text-slate-600 leading-relaxed">AI calling systems use conversational voice AI to automate customer communication using <strong className="text-navy">human-like voice interactions</strong> — understanding what the customer says, responding naturally, and triggering the right next action.</p>
              <p className="text-slate-600 leading-relaxed">Businesses deploy AI calling to automate high-volume repetitive conversations at scale, without compromising on personalisation or quality.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Lead qualification', 'Appointment reminders', 'Customer follow-ups', 'Sales outreach calls', 'Support interactions', 'Booking confirmations', 'Survey & feedback calls', 'Onboarding calls'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#050810] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[180px] opacity-[0.07]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-violet-600 rounded-full blur-[150px] opacity-[0.07]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">AI Agent Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">AI Voice Agents Can Handle Complete Customer Workflows</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map(cap => (
              <div key={cap.title} className={`bg-white/5 border backdrop-blur-sm rounded-2xl p-5 hover:bg-white/8 transition-all duration-200 shadow-lg ${cap.glow}`}>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-blue-900/50 border border-blue-500/20`}>
                  <cap.icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{cap.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORKFLOWS ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Automation Intelligence</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Smart AI Communication Workflows</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">Every AI call triggers the next action automatically — no manual step required.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {FLOWS.map(flow => (
              <div key={flow.title} className={`rounded-2xl border p-5 bg-[#050810] ${flow.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-white text-sm">{flow.title}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${flow.accent}`}>{flow.tag}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {flow.steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-400 text-center max-w-[60px] leading-tight">{step.label}</span>
                      </div>
                      {i < flow.steps.length - 1 && <ArrowRight className="w-3 h-3 text-slate-600 mb-4" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY AI CALLING ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">The Shift to Voice AI</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Are Moving to AI Voice Automation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_FEATURES.map(f => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-blue-600" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#050810] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[200px] opacity-[0.05]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Connected Ecosystem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Connect AI Calling With Your Existing Systems</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INTEGRATIONS.map(intg => (
              <div key={intg.name} className={`border rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-white/5 transition-colors ${intg.color}`}>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${intg.color}`}><intg.icon className="w-6 h-6" /></div>
                <span className="font-bold text-sm">{intg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Industry Coverage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Industries Using AI Calling Systems</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className={`bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${ind.color}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${ind.color}`}><ind.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{ind.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{ind.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#050810] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-600 rounded-full blur-[100px] opacity-[0.08]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '35px 35px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Investment</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Flexible AI Calling Pricing</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {PRICING_PLANS.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl overflow-hidden ${plan.highlight ? 'bg-gradient-to-b from-blue-600 to-violet-700 shadow-2xl shadow-blue-500/20' : 'bg-white/5 border border-white/10'}`}>
                {plan.highlight && plan.badge && (
                  <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">{plan.badge}</div>
                )}
                <div className="px-6 py-8">
                  <p className="text-[11px] uppercase tracking-widest font-bold mb-2" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>{plan.name}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-white'}`}>{plan.price}</span>
                    <span className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-white/70' : 'text-slate-400'}`}>{plan.period}</span>
                  </div>
                  <p className={`text-xs mb-5 ${plan.highlight ? 'text-white/70' : 'text-slate-500'}`}>{plan.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white/90' : 'text-slate-300'}`}>
                        <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-white' : 'text-blue-400'}`} />{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => open(plan.name === 'Enterprise' ? 'Get Custom Quote' : 'Book AI Calling Demo')} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.highlight ? 'bg-white text-blue-700 hover:bg-white/90' : 'bg-white/10 text-white border border-white/20 hover:bg-white/15'}`}>
                    {plan.name === 'Enterprise' ? 'Get Custom Quote' : 'Book Demo'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">Voice minutes and telecom usage billed separately based on actual consumption.</p>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We build AI communication systems, not just automated dialers.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-blue-600" /></div>
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
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors" aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-blue-600' : ''}`} />
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
      <section className="py-16 lg:py-24 bg-[#050810] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[200px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-violet-600 rounded-full blur-[120px] opacity-[0.08]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-600 rounded-full blur-[120px] opacity-[0.06]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-300 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5" /> AI-Powered Customer Communication Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Build Smarter Customer Conversations With AI Calling
          </h2>
          <p className="text-slate-400 text-lg mb-3">Automate lead qualification, reminders, customer engagement, follow-ups, and voice workflows using scalable AI-powered calling systems.</p>
          <p className="text-slate-600 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-500">Inbound + outbound · Multi-language · CRM & WhatsApp integration</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:opacity-90 hover:-translate-y-0.5 transition-all">
              Book AI Calling Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Talk to Expert')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-xl shadow shadow-blue-200">
          Book AI Demo
        </button>
        <button onClick={() => open('Talk to Expert')} className="flex-1 py-3 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-xl">
          Talk to Expert
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
