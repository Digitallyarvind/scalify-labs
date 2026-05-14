'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  MessageCircle, BrainCircuit, BarChart3, Send, Zap, Shield, RefreshCw,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  CreditCard, BookOpen, Check, Activity, Sparkles, Rocket,
  Phone, Mail, User, MapPin, Briefcase,
  Users, Database, Megaphone, FileText, Layers,
  MousePointerClick, LayoutGrid, Tag, Inbox,
  Image as ImageIcon, Calendar, Clock,
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: Zap, name: 'WhatsApp API Setup', desc: 'WATI, Interakt, or AiSensy account configuration and verification', color: 'bg-green-100 text-green-700' },
  { icon: Layers, name: 'Automation Workflow Design', desc: 'Multi-step customer journeys triggered by user actions and events', color: 'bg-blue-100 text-blue-700' },
  { icon: Megaphone, name: 'Broadcast Campaign Setup', desc: 'Scheduled promotional blasts to segmented customer lists', color: 'bg-violet-100 text-violet-700' },
  { icon: TrendingUp, name: 'Lead Nurturing Logic', desc: 'Automated follow-up sequences converting inquiries to clients', color: 'bg-emerald-100 text-emerald-700' },
  { icon: Database, name: 'CRM Integration', desc: 'Connect WhatsApp to your CRM for automatic lead tagging and tracking', color: 'bg-indigo-100 text-indigo-700' },
  { icon: FileText, name: 'Message Template Design', desc: 'Meta-approved message templates for notifications and campaigns', color: 'bg-cyan-100 text-cyan-700' },
  { icon: BrainCircuit, name: 'Chatbot Flow Design', desc: 'Conversational bots that qualify leads and handle common queries', color: 'bg-orange-100 text-orange-700' },
  { icon: Users, name: 'Customer Segmentation', desc: 'Tag and group contacts for targeted, personalised campaigns', color: 'bg-pink-100 text-pink-700' },
  { icon: BarChart3, name: 'Campaign Management', desc: 'End-to-end campaign planning, execution, and performance tracking', color: 'bg-amber-100 text-amber-700' },
  { icon: Activity, name: 'Analytics & Reporting', desc: 'Delivery rates, read rates, reply rates, and conversion reports', color: 'bg-teal-100 text-teal-700' },
]

const AUTOMATIONS = [
  {
    title: 'Lead Capture Automation',
    tag: 'Lead Gen',
    color: 'border-green-200 bg-green-50/50',
    accent: 'bg-green-100 text-green-700',
    steps: [
      { icon: Megaphone, label: 'Ad Click', color: 'bg-blue-100 text-blue-600' },
      { icon: MessageCircle, label: 'WA Welcome', color: 'bg-green-100 text-green-600' },
      { icon: Check, label: 'Lead Qualified', color: 'bg-emerald-100 text-emerald-600' },
    ],
  },
  {
    title: 'Appointment Booking',
    tag: 'Scheduling',
    color: 'border-blue-200 bg-blue-50/50',
    accent: 'bg-blue-100 text-blue-700',
    steps: [
      { icon: Calendar, label: 'Reminder Sent', color: 'bg-indigo-100 text-indigo-600' },
      { icon: Check, label: 'Confirmed', color: 'bg-emerald-100 text-emerald-600' },
      { icon: Send, label: 'Follow-Up', color: 'bg-cyan-100 text-cyan-600' },
    ],
  },
  {
    title: 'Education Funnel',
    tag: 'Education',
    color: 'border-violet-200 bg-violet-50/50',
    accent: 'bg-violet-100 text-violet-700',
    steps: [
      { icon: BookOpen, label: 'Inquiry', color: 'bg-violet-100 text-violet-600' },
      { icon: FileText, label: 'Brochure Sent', color: 'bg-blue-100 text-blue-600' },
      { icon: Users, label: 'Counsellor', color: 'bg-green-100 text-green-600' },
    ],
  },
  {
    title: 'Clinic Automation',
    tag: 'Healthcare',
    color: 'border-rose-200 bg-rose-50/50',
    accent: 'bg-rose-100 text-rose-700',
    steps: [
      { icon: HeartPulse, label: 'Appointment', color: 'bg-red-100 text-red-600' },
      { icon: Clock, label: 'Reminder', color: 'bg-amber-100 text-amber-600' },
      { icon: Activity, label: 'Feedback', color: 'bg-emerald-100 text-emerald-600' },
    ],
  },
  {
    title: 'Ecommerce Journey',
    tag: 'Ecommerce',
    color: 'border-amber-200 bg-amber-50/50',
    accent: 'bg-amber-100 text-amber-700',
    steps: [
      { icon: ShoppingBag, label: 'Inquiry', color: 'bg-orange-100 text-orange-600' },
      { icon: Tag, label: 'Offer Sent', color: 'bg-green-100 text-green-600' },
      { icon: RefreshCw, label: 'Cart Reminder', color: 'bg-blue-100 text-blue-600' },
    ],
  },
  {
    title: 'Sales Follow-Up',
    tag: 'Sales',
    color: 'border-cyan-200 bg-cyan-50/50',
    accent: 'bg-cyan-100 text-cyan-700',
    steps: [
      { icon: User, label: 'New Lead', color: 'bg-indigo-100 text-indigo-600' },
      { icon: Zap, label: 'Auto Nurture', color: 'bg-violet-100 text-violet-600' },
      { icon: Send, label: 'Sales Alert', color: 'bg-green-100 text-green-600' },
    ],
  },
]

const WA_FEATURES = [
  { icon: Megaphone, name: 'Broadcast Messaging', color: 'bg-green-100 text-green-600' },
  { icon: MousePointerClick, name: 'Button Messages', color: 'bg-blue-100 text-blue-600' },
  { icon: LayoutGrid, name: 'Catalog Sharing', color: 'bg-violet-100 text-violet-600' },
  { icon: ImageIcon, name: 'Media Messages', color: 'bg-pink-100 text-pink-600' },
  { icon: RefreshCw, name: 'Automated Replies', color: 'bg-emerald-100 text-emerald-600' },
  { icon: BrainCircuit, name: 'Chatbot Workflows', color: 'bg-orange-100 text-orange-600' },
  { icon: Tag, name: 'Lead Tagging', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Inbox, name: 'Team Inbox', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Database, name: 'CRM Integration', color: 'bg-amber-100 text-amber-600' },
  { icon: Activity, name: 'Click Tracking', color: 'bg-teal-100 text-teal-600' },
  { icon: Zap, name: 'API Integration', color: 'bg-rose-100 text-rose-600' },
  { icon: Layers, name: 'Drip Campaigns', color: 'bg-purple-100 text-purple-600' },
]

const INDUSTRIES = [
  { icon: GraduationCap, name: 'Education', use: 'Admission inquiries, brochure delivery, counsellor assignment', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: HeartPulse, name: 'Doctors & Clinics', use: 'Appointment reminders, health tips, lab report notifications', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: Building2, name: 'Real Estate', use: 'Property details, site visit booking, price update alerts', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: ShoppingBag, name: 'Ecommerce', use: 'Order updates, offer alerts, cart abandonment recovery', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: BookOpen, name: 'Coaching Institutes', use: 'Batch alerts, study material delivery, doubt session booking', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: CreditCard, name: 'Financial Services', use: 'EMI reminders, policy renewals, lead qualification journeys', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: Store, name: 'Local Businesses', use: 'Promotion alerts, customer feedback, loyalty campaigns', color: 'bg-green-50 text-green-600 border-green-100' },
]

const STEPS = [
  { icon: Users, num: '01', title: 'Business Requirement Analysis', desc: 'We understand your customer journey, business goals, and existing communication gaps.' },
  { icon: Zap, num: '02', title: 'Platform Selection', desc: 'We recommend WATI, Interakt, or AiSensy based on your team size, budget, and use case.' },
  { icon: Layers, num: '03', title: 'Workflow & Automation Design', desc: 'Our team maps every trigger, action, and message in your customer communication journey.' },
  { icon: Send, num: '04', title: 'Campaign & Template Setup', desc: 'Meta-approved message templates, broadcast lists, and automation flows are configured and tested.' },
  { icon: BarChart3, num: '05', title: 'Launch & Optimisation', desc: 'Campaign goes live. We monitor performance and continuously optimise for better engagement.' },
]

const WHY_CARDS = [
  { icon: Zap, title: 'Official API Expertise', desc: 'Certified setup on WATI, Interakt, and AiSensy — the leading WhatsApp Business API platforms in India.' },
  { icon: Layers, title: 'Automation-Focused Execution', desc: 'We build workflows that run 24/7 without manual effort. Your CRM updates automatically.' },
  { icon: MessageCircle, title: 'Communication Strategy Support', desc: 'Message writing, template design, conversation flow logic — we handle the content too.' },
  { icon: TrendingUp, title: 'Lead Nurturing Workflows', desc: 'Automated journeys that move leads from inquiry to booking without your sales team lifting a finger.' },
  { icon: BarChart3, title: 'Campaign Optimisation', desc: 'Monthly reporting with actionable insights. We continuously improve your open and conversion rates.' },
  { icon: Shield, title: 'Multi-Industry Experience', desc: 'From education to healthcare to real estate — we have campaign templates for every major industry.' },
]

const FAQ_ITEMS = [
  { q: 'Which WhatsApp platforms do you support?', a: 'We work with WATI, Interakt, and AiSensy — the three leading official WhatsApp Business API platforms in India. We recommend the best fit based on your budget, team size, and automation requirements.' },
  { q: 'Is platform subscription pricing included in the agency fee?', a: 'No. The agency management fee (starting ₹10,000/month) covers Scalify Labs\' charges — campaign strategy, automation setup, workflow design, and ongoing management. Platform subscription (WATI/Interakt/AiSensy) and Meta conversation charges are billed separately by the respective platforms.' },
  { q: 'Can workflows automate follow-ups automatically?', a: 'Yes. That is the core of what we build. When a user responds, presses a button, or takes an action, the next message or flow triggers automatically without any manual effort from your team.' },
  { q: 'Do you support CRM integration?', a: 'Yes. We integrate WhatsApp platforms with popular CRMs like HubSpot, Zoho, Salesforce, and custom CRMs via API. Leads automatically get tagged, scored, and routed based on WhatsApp interactions.' },
  { q: 'Can WhatsApp campaigns run at scale?', a: 'Yes. With official WhatsApp Business API, there are no limits on broadcast message volumes (subject to contact opt-in and Meta quality rating). We manage campaigns reaching lakhs of contacts per month for our clients.' },
  { q: 'Do you create message templates?', a: 'Yes. We write, design, and get Meta approval for all message templates including promotional, transactional, and utility templates. Template fees, if any, are part of the platform\'s billing, not ours.' },
  { q: 'Are Meta conversation charges included?', a: 'No. Meta charges per conversation (24-hour session). Marketing conversation rates in India are approximately ₹0.82 per session. These charges are billed by Meta directly through the WhatsApp platform you subscribe to.' },
  { q: 'Can you manage campaigns on a monthly basis?', a: 'Yes. Our monthly retainer (starting ₹10,000/month) covers ongoing campaign management — planning new broadcasts, optimising automation flows, monitoring analytics, and adapting strategy based on performance data.' },
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
        city: form.city || undefined, source: 'whatsapp-page',
        service_interest: 'WhatsApp API Marketing',
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
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book WhatsApp Consultation'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Consultation Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our WhatsApp team will contact you within 2 hours.</p>
            <button onClick={onClose} className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Your company" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="e.g. Ranchi" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Business Goal / Use Case</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" placeholder="E.g. Want to automate WhatsApp follow-ups for coaching admissions…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Book Consultation <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function WhatsAppPageClient() {
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
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-800 text-xs font-semibold">
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp API Marketing Agency · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                WhatsApp API Marketing &amp;{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Automation Systems
                </span>{' '}
                for Business Growth
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Build automated customer communication journeys using official WhatsApp Business API platforms like WATI, Interakt, and AiSensy. Scalify Labs helps businesses design, automate, manage, and optimise WhatsApp systems for lead generation, engagement, and conversions.
              </p>

              {/* Pricing card */}
              <div className="bg-green-600 rounded-2xl px-5 py-4 text-white inline-block shadow-lg shadow-green-200">
                <p className="text-[11px] opacity-80 uppercase tracking-wider font-semibold mb-1">Agency Management Charges</p>
                <p className="text-3xl font-black">Starting ₹10k<span className="text-sm font-semibold opacity-80">/month</span></p>
                <p className="text-[11px] opacity-70 mt-1.5">Platform subscription &amp; Meta conversation charges billed separately.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-green-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book WhatsApp Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Start WhatsApp Setup')} className="flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-700 font-bold rounded-full hover:bg-green-50 transition-colors">
                  Start WhatsApp Setup
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Official WhatsApp API Platforms', 'Automation Workflow Design', 'Campaign Management', 'Lead Nurturing Systems', 'WhatsApp Broadcast Campaigns', 'CRM & API Integration Support'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — WhatsApp Dashboard Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-emerald-400 rounded-3xl blur-3xl opacity-15 scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* WA Business header */}
                  <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#075E54' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-green-400 flex items-center justify-center text-white font-extrabold text-sm shrink-0">SL</div>
                      <div>
                        <p className="text-white text-[13px] font-bold leading-tight flex items-center gap-1">Scalify Labs <span className="text-green-300 text-[9px]">✓</span></p>
                        <p className="text-green-300 text-[10px]">WhatsApp Business API</p>
                      </div>
                    </div>
                    <div className="bg-green-400 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-wide">Verified</div>
                  </div>

                  {/* Campaign stats */}
                  <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100">
                    {[{ l: 'Sent', v: '45.2K', c: 'text-navy' }, { l: 'Delivered', v: '98%', c: 'text-emerald-600' }, { l: 'Read', v: '78%', c: 'text-blue-600' }, { l: 'Replied', v: '12%', c: 'text-green-600' }].map(s => (
                      <div key={s.l} className="py-2.5 px-1.5 text-center border-r last:border-r-0 border-slate-100">
                        <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
                        <p className="text-[9px] text-slate-500 font-medium">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Split: workflows + chat */}
                  <div className="grid grid-cols-2 divide-x divide-slate-100" style={{ minHeight: 200 }}>
                    {/* Automation list */}
                    <div className="p-3">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Active Automations</p>
                      {[{ name: 'Lead Welcome Flow', status: 'Running', dot: 'bg-emerald-400' }, { name: 'Appointment Booking', status: 'Active', dot: 'bg-blue-400' }, { name: 'Cart Recovery', status: 'Active', dot: 'bg-green-400' }, { name: 'Re-engagement', status: 'Paused', dot: 'bg-amber-400' }].map(w => (
                        <div key={w.name} className="flex items-start gap-1.5 mb-2 last:mb-0">
                          <div className={`w-1.5 h-1.5 rounded-full ${w.dot} mt-1.5 shrink-0`} />
                          <div>
                            <p className="text-[9.5px] font-semibold text-navy leading-tight">{w.name}</p>
                            <p className="text-[8px] text-slate-400">{w.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp chat */}
                    <div className="p-2" style={{ background: '#ECE5DD20' }}>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">Live Chat</p>
                      <div className="space-y-1.5">
                        {/* Bot message */}
                        <div className="flex justify-end">
                          <div className="rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[90%] shadow-sm text-[9px] text-gray-800" style={{ background: '#DCF8C6' }}>
                            Hi! 👋 Thanks for your interest. How can we help?
                            <p className="text-[7px] text-gray-400 mt-0.5 text-right">2:34 ✓✓</p>
                          </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-end">
                          <div className="bg-white rounded-xl rounded-tr-sm px-2 py-1.5 max-w-[95%] shadow-sm border border-slate-100">
                            <div className="flex gap-1">
                              <button className="flex-1 border border-green-400 text-green-700 text-[8px] font-bold py-1 rounded-lg">Learn More</button>
                              <button className="flex-1 border border-green-400 text-green-700 text-[8px] font-bold py-1 rounded-lg">Book Now</button>
                            </div>
                          </div>
                        </div>
                        {/* User reply */}
                        <div className="flex justify-start">
                          <div className="bg-white rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[75%] shadow-sm">
                            <p className="text-[9px] text-gray-700">Book Now</p>
                            <p className="text-[7px] text-gray-400 mt-0.5">2:35 ✓</p>
                          </div>
                        </div>
                        {/* Auto confirm */}
                        <div className="flex justify-end">
                          <div className="rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[90%] shadow-sm text-[9px] text-gray-800" style={{ background: '#DCF8C6' }}>
                            ✅ Confirmed! Reminder in 1hr.
                            <p className="text-[7px] text-gray-400 mt-0.5 text-right">2:35 ✓✓</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent triggers */}
                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Triggers</p>
                    {[
                      { lead: 'Lead #4521', action: 'Ad Click → WA Welcome', time: '2m', dot: 'bg-green-400' },
                      { lead: 'Lead #4520', action: 'Booked Appointment', time: '5m', dot: 'bg-blue-400' },
                      { lead: 'Lead #4519', action: 'Interested Tag Added', time: '8m', dot: 'bg-amber-400' },
                    ].map(t => (
                      <div key={t.lead} className="flex items-center gap-2 mb-1.5 last:mb-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${t.dot} shrink-0`} />
                        <span className="text-[9px] font-semibold text-slate-600 shrink-0 w-16">{t.lead}</span>
                        <span className="text-[9px] text-slate-500 flex-1 truncate">{t.action}</span>
                        <span className="text-[8px] text-slate-400">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center"><Activity className="w-4 h-4 text-green-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Read Rate</p><p className="text-sm font-extrabold text-slate-900">78% Avg</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-green-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">Starting From</p>
                  <p className="text-lg font-black">₹10K<span className="text-xs font-semibold opacity-80">/mo</span></p>
                </div>
                <div className="absolute top-14 -left-8 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-700">WATI · Interakt · AiSensy</span>
                  </div>
                  <p className="text-[8px] text-slate-500 mt-0.5">Official API Platforms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR (Platforms) ─────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Powered by Official WhatsApp API Platforms</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { name: 'WATI', desc: 'WhatsApp Team Inbox', color: 'text-blue-700 bg-blue-50 border-blue-100' },
                { name: 'Interakt', desc: 'Commerce & Marketing', color: 'text-orange-700 bg-orange-50 border-orange-100' },
                { name: 'AiSensy', desc: 'Campaign Automation', color: 'text-violet-700 bg-violet-50 border-violet-100' },
              ].map(p => (
                <div key={p.name} className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm ${p.color}`}>
                  <MessageCircle className="w-4 h-4" />
                  {p.name}
                  <span className="text-[10px] font-normal opacity-70 hidden sm:inline">· {p.desc}</span>
                </div>
              ))}
            </div>
            <span className="text-[11px] text-slate-400">Platform subscription billed separately.</span>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Flow illustration */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Communication Flow</p>
              {/* Old way */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Old approach</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-200 rounded-xl flex items-center justify-center"><MessageCircle className="w-4 h-4 text-slate-400" /></div>
                  <div><p className="text-sm font-bold text-slate-600">WhatsApp software purchased</p><p className="text-xs text-slate-400">No workflows. No automation. No strategy.</p></div>
                  <span className="ml-auto text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded-lg whitespace-nowrap">Low ROI</span>
                </div>
              </div>
              {/* New way */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-4">Scalify Labs builds →</p>
                <div className="space-y-2">
                  {[
                    { icon: Megaphone, label: 'Facebook / Google Ad', color: 'bg-blue-100 text-blue-600', note: 'Source' },
                    { icon: MessageCircle, label: 'WhatsApp Welcome Message', color: 'bg-green-100 text-green-600', note: 'Instant' },
                    { icon: Zap, label: 'Automated Follow-Up Journey', color: 'bg-emerald-100 text-emerald-600', note: 'Auto' },
                    { icon: FileText, label: 'Brochure / Offer Delivery', color: 'bg-cyan-100 text-cyan-600', note: 'Rich Media' },
                    { icon: Calendar, label: 'Appointment Booking', color: 'bg-violet-100 text-violet-600', note: 'Smart' },
                    { icon: Users, label: 'CRM Tagging & Sales Handoff', color: 'bg-orange-100 text-orange-600', note: 'Automated' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}><s.icon className="w-4 h-4" /></div>
                      <span className="text-sm font-semibold text-slate-700 flex-1">{s.label}</span>
                      <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{s.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> The Scalify Labs Difference
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
                Beyond WhatsApp Software.<br />Complete Communication Systems.
              </h2>
              <p className="text-slate-600 leading-relaxed">Most businesses buy WhatsApp software but never build proper communication systems. They have the tool — but not the strategy, workflows, or automation logic to make it work.</p>
              <p className="text-slate-600 leading-relaxed">Scalify Labs combines strategy, automation, messaging, and execution to build WhatsApp communication systems that <strong className="text-navy">generate leads, convert customers, and retain them — automatically.</strong></p>
              <ul className="space-y-2">
                {['Design customer communication journeys', 'Create multi-step automation workflows', 'Manage campaigns and broadcasts', 'Structure lead capture and nurture flows', 'Optimise message open and reply rates', 'Automate follow-ups and appointment booking'].map(b => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES INCLUDED ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3">Everything Included</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">WhatsApp Marketing Services Included</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{s.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUTOMATION EXAMPLES ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Automation Possibilities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Powerful WhatsApp Automation Possibilities</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">Real workflows we build for businesses across industries — running automatically, 24/7.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUTOMATIONS.map(flow => (
              <div key={flow.title} className={`rounded-2xl border p-5 ${flow.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-navy text-sm">{flow.title}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${flow.accent}`}>{flow.tag}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {flow.steps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${step.color}`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[8.5px] font-semibold text-slate-600 text-center max-w-[56px] leading-tight">{step.label}</span>
                      </div>
                      {i < flow.steps.length - 1 && (
                        <div className="flex items-center mb-4">
                          <ArrowRight className="w-3 h-3 text-slate-400" />
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

      {/* ─── WA FEATURES ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Platform Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Features Businesses Use With WhatsApp API</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {WA_FEATURES.map(f => (
              <div key={f.name} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}><f.icon className="w-4 h-4" /></div>
                <span className="text-sm font-semibold text-slate-700">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Industry Coverage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Industries Using WhatsApp Automation</h2>
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

      {/* ─── HOW WE WORK ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">How Scalify Labs Builds WhatsApp Systems</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">From business requirement to launch — typically 7–10 business days.</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-green-100 via-emerald-200 to-green-100" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-green-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-green-400 transition-colors">
                  <step.icon className="w-7 h-7 text-green-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-2 w-4 h-4 text-green-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600 rounded-full blur-[120px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[100px] opacity-[0.08]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent WhatsApp Management Pricing</h2>
          </div>

          {/* Pricing card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-8 text-center text-white">
              <p className="text-xs uppercase tracking-widest opacity-80 font-semibold mb-2">Agency Management Fee</p>
              <p className="text-6xl font-black">Starting ₹10k</p>
              <p className="text-lg font-semibold opacity-80 mt-1">per month</p>
            </div>

            {/* Includes */}
            <div className="px-8 py-6 grid sm:grid-cols-2 gap-3">
              {['WhatsApp Campaign Management', 'Automation Workflow Design', 'Automation Setup & Configuration', 'Message Logic Design', 'Broadcast Campaign Management', 'Monthly Analytics & Reporting'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />{f}
                </div>
              ))}
            </div>

            {/* Important notes */}
            <div className="px-8 py-4 bg-white/5 border-t border-white/10 space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Additional Charges (Not Included)</p>
              {['Platform subscription: WATI / Interakt / AiSensy billed separately', 'Meta conversation charges: approx. ₹0.82/marketing conversation', 'Creative & media design: based on requirements'].map(n => (
                <p key={n} className="text-xs text-slate-400 flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">•</span>{n}</p>
              ))}
            </div>

            <div className="px-8 pb-7 pt-5 flex flex-col sm:flex-row gap-3">
              <button onClick={() => open()} className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Book WhatsApp Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => open('Talk to Expert')} className="flex-1 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">
                Talk to Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3">Your Growth Partner</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We build communication systems, not just send messages.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-green-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-green-600" /></div>
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
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-green-600' : ''}`} />
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
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 40%, #25D366 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.05]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-300 rounded-full blur-[100px] opacity-[0.08]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Your WhatsApp Growth &amp; Automation Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Build Smarter Customer Communication With WhatsApp Automation
          </h2>
          <p className="text-white/80 text-lg mb-3">Automate engagement, follow-ups, reminders, lead nurturing, and customer journeys using official WhatsApp API systems.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Agency management starting ₹10k/month · Platform subscription separate
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-green-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Book WhatsApp Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Start WhatsApp Setup')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Start WhatsApp Setup
            </button>
          </div>
          <p className="text-white/40 text-xs mt-6">WATI · Interakt · AiSensy · Official WhatsApp Business API</p>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold rounded-xl shadow shadow-green-200">
          Book Consultation
        </button>
        <button onClick={() => open('Start WhatsApp Setup')} className="flex-1 py-3 border-2 border-green-600 text-green-700 text-sm font-bold rounded-xl">
          Start Setup
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
