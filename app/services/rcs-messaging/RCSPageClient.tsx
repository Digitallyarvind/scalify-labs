'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Shield, BarChart3, MessageSquare, Image as ImageIcon,
  MousePointerClick, Smartphone, BadgeCheck, Send,
  Zap, Globe, Clock, Layers, Activity, Sparkles,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Sofa, Store,
  Check, Minus, Phone, Mail, User, MapPin, Briefcase,
  Rocket, CircleDollarSign,
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const WHY_CARDS = [
  { icon: BadgeCheck, title: 'Verified Brand Identity', desc: 'Carrier-verified sender profile with logo, name, and blue tick', color: 'bg-blue-100 text-blue-600' },
  { icon: ImageIcon, title: 'Rich Media Messaging', desc: 'Send images, videos, GIFs, and PDFs inside the native inbox', color: 'bg-violet-100 text-violet-600' },
  { icon: MousePointerClick, title: 'CTA Buttons', desc: 'Book, Call, Visit, Pay — action buttons built right into the message', color: 'bg-indigo-100 text-indigo-600' },
  { icon: TrendingUp, title: '3.5× Higher Click Rates', desc: 'Richer messages drive dramatically more engagement than plain SMS', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Layers, title: 'Product Carousels', desc: 'Swipeable product cards to showcase multiple offers in one message', color: 'bg-orange-100 text-orange-600' },
  { icon: Activity, title: 'Real-Time Analytics', desc: 'Track delivery, opens, clicks, and conversions per campaign', color: 'bg-rose-100 text-rose-600' },
]

// WhatsApp API marketing conversation rate (India, 2024-25)
const COMPARE_ROWS = [
  { feature: 'App Installation Required', rcs: false, wa: true, rcsLabel: 'Not required', waLabel: 'Required' },
  { feature: 'Default Android Inbox', rcs: true, wa: false, rcsLabel: 'Native inbox', waLabel: 'Separate app' },
  { feature: 'Rich Media (Images / Videos)', rcs: true, wa: true, rcsLabel: 'Full support', waLabel: 'Limited' },
  { feature: 'CTA Buttons', rcs: true, wa: null, rcsLabel: 'Native buttons', waLabel: 'Limited' },
  { feature: 'Bulk Campaign Scale', rcs: true, wa: false, rcsLabel: 'Unlimited', waLabel: 'API rate limits' },
  { feature: 'Promotional Messaging', rcs: true, wa: null, rcsLabel: 'Fully allowed', waLabel: 'Restricted' },
  { feature: 'Cost per Message / Conv.', rcs: true, wa: false, rcsLabel: '₹0.16/msg', waLabel: '₹0.82/conv †' },
  { feature: 'Carrier-Level Verification', rcs: true, wa: false, rcsLabel: 'Yes', waLabel: 'Meta-verified only' },
  { feature: 'Product Carousels', rcs: true, wa: false, rcsLabel: 'Yes', waLabel: 'No' },
]

const STEPS = [
  { icon: BadgeCheck, num: '01', title: 'Business Verification', desc: 'Register your brand with carrier partners. Get your verified sender profile with logo and display name.' },
  { icon: Sparkles, num: '02', title: 'Campaign Setup', desc: 'Our team designs rich message templates — cards, carousels, CTA buttons — and loads your contact list.' },
  { icon: Send, num: '03', title: 'Rich Message Delivery', desc: 'Messages land directly in the native Android messaging app. No app needed, no link clicks required.' },
  { icon: BarChart3, num: '04', title: 'Performance Tracking', desc: 'Monitor delivery rates, opens, button clicks, and conversions in real-time from your dashboard.' },
]

const INDUSTRIES = [
  { icon: GraduationCap, name: 'Education', use: 'Admission alerts, exam reminders, brochure cards', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: HeartPulse, name: 'Clinics & Healthcare', use: 'Appointment reminders, health camps, lab results', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: Building2, name: 'Real Estate', use: 'Property cards, site visit booking, price updates', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: Store, name: 'Retail & Ecommerce', use: 'Product carousels, sale alerts, order tracking', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Sofa, name: 'Home Furnishing', use: 'New arrivals, catalogue carousels, discount offers', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { icon: ShoppingBag, name: 'Local Businesses', use: 'Promo offers, event invites, loyalty campaigns', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
]

const FEATURES = [
  'Verified Sender Branding',
  'Rich Cards & Carousels',
  'CTA Buttons (Book, Call, Visit)',
  'Bulk Campaign Engine',
  'Analytics & Delivery Dashboard',
  'API Integration Support',
  'Rich Media Messaging',
  'Full Campaign Management — Free',
]

const FAQ_ITEMS = [
  { q: 'Does RCS work on all phones?', a: 'RCS works on Android devices running Android 5.0+ with Google Messages (the default messaging app on most Android phones). It covers 500M+ Android users in India. iPhones are not supported — those users automatically receive a plain SMS fallback.' },
  { q: 'Do users need to install an app?', a: 'No. RCS messages arrive in the native Android Messages app already installed on the device. There is nothing to download or set up from the user\'s side.' },
  { q: 'Can I send images, videos, and files?', a: 'Yes. RCS supports images, videos, GIFs, PDFs, and file attachments. You can also send interactive rich cards and product carousels — all inside the default messaging app.' },
  { q: 'Is RCS cheaper than WhatsApp Business API?', a: 'Yes, significantly. RCS costs ₹0.16 per message — flat rate, no per-session charge. WhatsApp Business API charges ₹0.82 per marketing conversation (24-hour session) in India. For a campaign of 1 lakh messages, RCS costs ₹16,000 vs ₹82,000+ on WhatsApp API. That is over 5× cheaper.' },
  { q: 'What is the minimum order quantity?', a: 'The minimum purchase is 50,000 messages (₹8,000). This ensures campaign viability and cost efficiency. For higher volumes, contact us for custom bulk pricing.' },
  { q: 'Can I use my own brand logo and name?', a: 'Yes. After business verification, your brand logo, display name, and description appear inside the user\'s chat thread. This branded sender identity dramatically improves trust and engagement.' },
  { q: 'Who manages the RCS campaign?', a: 'Scalify Labs manages your entire RCS campaign — from template design and verification to scheduling and delivery — at no extra charge. Campaign management is included free with every order.' },
  { q: 'How fast can campaigns start?', a: 'Business verification takes 5–7 business days. Once approved, you can launch campaigns within 24 hours. Scalify Labs handles the entire verification and onboarding process for you.' },
]

// ─── ENQUIRY MODAL ────────────────────────────────────────────────────────────

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
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email || undefined,
        business: form.business || undefined,
        city: form.city || undefined,
        source: 'rcs-page',
        service_interest: 'RCS Messaging',
        message: form.message || undefined,
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="font-bold text-navy text-lg">{title ?? 'Enquire About RCS Messaging'}</h3>
            <p className="text-slate-500 text-sm">We&apos;ll respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-navy mb-2">Enquiry Received!</h4>
            <p className="text-slate-600 text-sm mb-6">Our team will contact you within 2 hours on WhatsApp or phone.</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="WhatsApp no." />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="you@company.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your company" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. Ranchi" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Message / Campaign Size</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="E.g. Need 2 lakh RCS messages for education campaign…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Send Enquiry <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function RCSPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function openEnquiry(title?: string) {
    setModalTitle(title)
    setModalOpen(true)
  }

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                Next-Gen Business Messaging · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                RCS Messaging for{' '}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Modern Business
                </span>{' '}
                Communication
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Send verified, interactive, media-rich business messages directly to Android users — with images, videos, CTA buttons, and branded messaging experiences. Starting at just <strong className="text-navy">16 paisa per message</strong>.
              </p>

              {/* Pricing pill */}
              <div className="inline-flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                <div>
                  <p className="text-[11px] opacity-80 uppercase tracking-wider font-semibold">Starting at</p>
                  <p className="text-3xl font-black">₹0.16<span className="text-sm font-semibold opacity-80">/message</span></p>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div>
                  <p className="text-[11px] opacity-80 uppercase tracking-wider font-semibold">Minimum Order</p>
                  <p className="text-sm font-bold">50,000 Messages</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => openEnquiry()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => openEnquiry('Buy RCS Credits')} className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors">
                  Buy RCS Credits
                </button>
              </div>

              {/* Trust bullets */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Verified Business Messaging',
                  'Rich Media & CTA Buttons',
                  'Better Engagement Than SMS',
                  'Full Campaign Management — Free',
                  'Real-Time Analytics',
                  'No App Required',
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-violet-500 rounded-[3rem] blur-3xl opacity-20 scale-110" />
                <div className="relative bg-slate-900 rounded-[3rem] p-[10px] shadow-[0_40px_80px_rgba(15,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.04)]">
                  <div className="bg-slate-800 rounded-[2.6rem] p-[3px]">
                    <div className="bg-white rounded-[2.4rem] overflow-hidden w-[260px] h-[520px] flex flex-col">
                      <div className="bg-white px-5 pt-3 pb-1 flex justify-between shrink-0">
                        <span className="text-[10px] font-bold text-slate-800">9:41</span>
                        <span className="text-[9px] text-slate-500">●●●</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 border-b border-slate-100 shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-[11px] font-extrabold text-white shrink-0">SL</div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-900 flex items-center gap-1">Scalify Labs <span className="text-blue-500">✓</span></p>
                          <p className="text-[9px] text-blue-600 font-semibold">Verified Business</p>
                        </div>
                      </div>
                      <div className="flex-1 bg-slate-50 p-3 space-y-2.5 overflow-hidden">
                        <div className="max-w-[82%]">
                          <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl rounded-tl-sm px-3 py-2 text-[10px] leading-relaxed shadow-sm">
                            Hi! 👋 Discover exclusive offers curated for you.
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden max-w-[95%]">
                          <div className="h-[80px] bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-600 flex items-center justify-center relative">
                            <div className="text-white text-center"><div className="text-2xl">🎯</div><p className="text-[9px] font-bold">Exclusive Offer</p></div>
                            <span className="absolute top-1.5 right-2 bg-white/20 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">24HRS LEFT</span>
                          </div>
                          <div className="px-2.5 py-1.5">
                            <p className="text-[10px] font-bold text-slate-900">Get 20% Off — Today Only</p>
                            <p className="text-[8px] text-slate-500 mt-0.5">Tap below to claim your offer now</p>
                          </div>
                          <div className="flex divide-x divide-slate-100 border-t">
                            {['Book Now', 'Visit Web', 'Call Now'].map(b => (
                              <button key={b} className="flex-1 py-1.5 text-[8.5px] font-bold text-blue-600">{b}</button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          {[{ e: '🏠', l: 'Property', c: 'from-emerald-400 to-teal-500' }, { e: '📚', l: 'Courses', c: 'from-blue-400 to-indigo-500' }, { e: '💊', l: 'Clinic', c: 'from-red-400 to-pink-500' }].map(i => (
                            <div key={i.l} className="w-[68px] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-shrink-0">
                              <div className={`h-10 bg-gradient-to-br ${i.c} flex items-center justify-center text-base`}>{i.e}</div>
                              <p className="text-[8px] font-semibold text-slate-800 px-1.5 py-1">{i.l}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end items-center gap-1">
                          <span className="text-[8px] text-slate-400">2:34 PM</span>
                          <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <svg className="w-3.5 h-3.5 text-blue-500 -ml-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                  <div><p className="text-[9px] text-slate-500">CTR vs SMS</p><p className="text-sm font-extrabold text-slate-900">3.5× Higher</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2">
                  <p className="text-[9px] text-slate-500 font-medium">Starting from</p>
                  <p className="text-xl font-black text-blue-600">₹0.16<span className="text-xs font-semibold text-slate-500">/msg</span></p>
                </div>
                <div className="absolute top-12 -left-8 bg-blue-600 rounded-xl shadow-xl px-2.5 py-1.5 text-white flex items-center gap-1.5">
                  <BadgeCheck className="w-3 h-3" /><span className="text-[9px] font-bold">Verified Sender</span>
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
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perfect for</span>
            {[
              { icon: GraduationCap, label: 'Education' }, { icon: HeartPulse, label: 'Clinics' },
              { icon: Building2, label: 'Real Estate' }, { icon: Store, label: 'Retail' },
              { icon: ShoppingBag, label: 'Ecommerce' }, { icon: Sofa, label: 'Home Furnishing' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                <Icon className="w-4 h-4" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT IS RCS ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* SMS → RCS illustration */}
            <div className="flex items-center justify-center gap-8">
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider">Old SMS</p>
                <div className="bg-slate-100 rounded-2xl rounded-tl-sm p-4 max-w-[160px] shadow-sm border border-slate-200">
                  <p className="text-xs text-slate-700 leading-relaxed">Hi, we have a 20% discount. Call 9876543210 to know more.</p>
                  <p className="text-[10px] text-slate-400 mt-2 text-right">✓ Delivered</p>
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-[11px] text-red-500 font-semibold">✗ No branding</p>
                  <p className="text-[11px] text-red-500 font-semibold">✗ No images</p>
                  <p className="text-[11px] text-red-500 font-semibold">✗ No buttons</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upgrade</span>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-blue-600 text-center uppercase tracking-wider">RCS Message</p>
                <div className="bg-white rounded-2xl rounded-tl-sm shadow-xl border border-slate-100 overflow-hidden max-w-[165px]">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-violet-50">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-[8px] font-bold text-white">SL</div>
                    <div><p className="text-[9px] font-bold text-slate-900">Scalify Labs ✓</p><p className="text-[7px] text-blue-600">Verified</p></div>
                  </div>
                  <div className="h-16 bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
                    <p className="text-white text-xs font-bold">🎯 Special Offer</p>
                  </div>
                  <div className="p-2"><p className="text-[9px] font-bold text-slate-900">20% Off Today</p><p className="text-[8px] text-slate-500">Limited time deal</p></div>
                  <div className="flex divide-x divide-slate-100 border-t">
                    <button className="flex-1 py-1.5 text-[8px] font-bold text-blue-600">Book</button>
                    <button className="flex-1 py-1.5 text-[8px] font-bold text-blue-600">Call</button>
                  </div>
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-[11px] text-emerald-600 font-semibold">✓ Brand verified</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">✓ Rich media</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">✓ CTA buttons</p>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" /> The Future of Business SMS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">What is RCS Messaging?</h2>
              <p className="text-slate-600 leading-relaxed">RCS (Rich Communication Services) is the next generation of business messaging that upgrades traditional SMS into a rich, interactive communication experience.</p>
              <p className="text-slate-600 leading-relaxed">With RCS messaging, businesses can send images, videos, product cards, CTA buttons, appointment links, and verified branding — <strong className="text-navy">directly inside the user&apos;s native Android messaging inbox. No separate app installation required.</strong></p>
              <ul className="space-y-2">
                {['Images, videos & GIFs', 'Product cards & carousels', 'Book, Call & Visit CTA buttons', 'Verified business branding', 'Appointment & payment links'].map(i => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY RCS ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Next-Gen Messaging</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Are Switching to RCS</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RCS VS WHATSAPP ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Head-to-Head Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">RCS vs WhatsApp Business Messaging</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <div className="grid grid-cols-3 bg-navy text-white">
              <div className="py-4 px-5 text-sm font-semibold text-slate-300">Feature</div>
              <div className="py-4 px-5 text-center border-l border-white/10">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1 rounded-full text-xs font-bold">
                  <Smartphone className="w-3 h-3" /> RCS Messaging
                </div>
              </div>
              <div className="py-4 px-5 text-center border-l border-white/10">
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-slate-300">
                  <MessageSquare className="w-3 h-3" /> WhatsApp Business
                </div>
              </div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/30 transition-colors`}>
                <div className="py-3.5 px-5 text-sm font-medium text-slate-700">{row.feature}</div>
                <div className="py-3.5 px-5 border-l border-slate-100 flex items-center justify-center gap-1.5">
                  {row.rcs ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <X className="w-4 h-4 text-red-400 shrink-0" />}
                  <span className={`text-xs font-semibold ${row.rcs ? 'text-emerald-600' : 'text-red-500'}`}>{row.rcsLabel}</span>
                </div>
                <div className="py-3.5 px-5 border-l border-slate-100 flex items-center justify-center gap-1.5">
                  {row.wa === true ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : row.wa === false ? <X className="w-4 h-4 text-red-400 shrink-0" /> : <Minus className="w-4 h-4 text-amber-400 shrink-0" />}
                  <span className={`text-xs font-semibold ${row.wa === true ? 'text-emerald-600' : row.wa === false ? 'text-red-500' : 'text-amber-600'}`}>{row.waLabel}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 px-1">† WhatsApp API marketing conversation rate, India 2024–25. Rate varies by template category.</p>
        </div>
      </section>

      {/* ─── COST ADVANTAGE ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Cost Advantage</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Lower Cost. Richer Experience.</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">RCS enables predictable bulk campaign costs, interactive experiences, and direct Android inbox delivery — at a fraction of WhatsApp API pricing.</p>
          </div>

          {/* 3-column pricing comparison */}
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {/* RCS — highlighted */}
            <div className="relative bg-gradient-to-b from-blue-600 to-violet-700 rounded-2xl p-6 text-white ring-2 ring-blue-400/40 shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-emerald-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">Best Value</div>
              <p className="text-xs uppercase tracking-wider opacity-70 mb-3 mt-2">RCS Messaging</p>
              <p className="text-5xl font-black">₹0.16</p>
              <p className="text-sm opacity-80 mb-5">per message · flat rate</p>
              <ul className="space-y-2 text-sm">
                {['Rich media + CTA buttons', 'Carrier-verified branding', 'Direct Android inbox', 'Full campaign mgmt — Free', 'No per-session charge'].map(f => (
                  <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* WhatsApp API */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white">
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">WhatsApp Business API</p>
              <p className="text-5xl font-black">₹0.82</p>
              <p className="text-sm text-slate-400 mb-5">per marketing conversation†</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {['App installation required', 'Per 24-hr session billing', 'Promotional restrictions', 'Meta-verified only', 'Higher ongoing cost'].map(f => (
                  <li key={f} className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-red-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* SMS */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white">
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Traditional SMS (A2P)</p>
              <p className="text-5xl font-black">₹0.12</p>
              <p className="text-sm text-slate-400 mb-5">per message · avg market rate</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {['Plain text only', 'No branding or logo', 'No images or buttons', 'No read receipts', 'Low engagement rates'].map(f => (
                  <li key={f} className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-red-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500">† WhatsApp API marketing conversation rate, India 2024–25. Minimum order 50,000 RCS messages.</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Delivery Rate', value: '98.2%', icon: Send, color: 'text-blue-400 bg-blue-400/10' },
              { label: 'CTR vs SMS', value: '3.5×', icon: TrendingUp, color: 'text-emerald-400 bg-emerald-400/10' },
              { label: 'Savings vs WA API', value: '5× cheaper', icon: CircleDollarSign, color: 'text-violet-400 bg-violet-400/10' },
              { label: 'Avg Open Rate', value: '75%+', icon: Activity, color: 'text-amber-400 bg-amber-400/10' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-slate-500 text-xs font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">How RCS Messaging Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-200 via-violet-200 to-blue-200" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-blue-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-blue-400 transition-colors">
                  <step.icon className="w-7 h-7 text-blue-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-3 w-4 h-4 text-blue-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Use Cases</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Industries Using RCS Messaging</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className={`bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${ind.color}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${ind.color}`}>
                  <ind.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-1.5">{ind.name}</h3>
                <p className="text-slate-500 text-sm">{ind.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Full Platform</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Everything Needed for Rich Messaging Campaigns</h2>

              {/* Free Campaign Management callout */}
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-emerald-900 text-sm">Full Campaign Management — Included Free</p>
                  <p className="text-emerald-700 text-sm mt-0.5">Scalify Labs manages your entire RCS campaign — template design, verification, scheduling, delivery, and reporting — at no extra charge.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {FEATURES.map(f => (
                  <div key={f} className={`flex items-center gap-2.5 p-3 rounded-xl border ${f.includes('Free') ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                    <CheckCircle className={`w-[18px] h-[18px] shrink-0 ${f.includes('Free') ? 'text-emerald-500' : 'text-emerald-500'}`} />
                    <span className={`text-sm font-semibold ${f.includes('Free') ? 'text-emerald-800' : 'text-slate-700'}`}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => openEnquiry()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-full shadow-lg shadow-blue-200 hover:opacity-90 transition-opacity">
                Start Your Campaign <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dashboard mockup */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                <span className="text-xs text-slate-500 font-medium mx-auto">RCS Campaign Dashboard</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'Messages Sent', v: '2,50,000', c: 'text-blue-600' }, { l: 'Delivered', v: '2,44,500', c: 'text-emerald-600' }, { l: 'Clicked', v: '28,340', c: 'text-violet-600' }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[{ l: 'Delivery Rate', v: 97.8, c: 'bg-blue-500' }, { l: 'Click-Through Rate', v: 11.3, c: 'bg-violet-500' }, { l: 'Read Rate', v: 75.2, c: 'bg-emerald-500' }].map(b => (
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
                {[{ name: 'Summer Sale Campaign', status: 'Active', msgs: '50,000', ctr: '12.4%', dot: 'bg-emerald-500' }, { name: 'Product Launch — July', status: 'Scheduled', msgs: '1,00,000', ctr: '—', dot: 'bg-blue-500' }].map(c => (
                  <div key={c.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{c.name}</p>
                        <p className="text-[10px] text-slate-500">{c.msgs} messages</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-slate-600">{c.status}</p>
                      <p className="text-xs font-bold text-violet-600">{c.ctr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BULK CAMPAIGN CTA ─────────────────────────────────────────── */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-blue-600 to-violet-700 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">High-Volume Campaigns</p>
              <h3 className="text-2xl font-extrabold text-white">Need More Than 5 Lakh Messages?</h3>
              <p className="text-white/80 text-sm mt-1">Get custom bulk pricing for large-scale RCS campaigns</p>
            </div>
            <button onClick={() => openEnquiry('Bulk RCS Campaign Enquiry')} className="shrink-0 flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap">
              Get Custom Pricing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFAQ === i}
                >
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.06]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-violet-300 rounded-full blur-[100px] opacity-[0.08]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" />
            Upgrade Your Messaging Strategy Today
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Upgrade From Basic SMS to<br />Interactive Messaging
          </h2>
          <p className="text-white/80 text-lg mb-3">Launch branded RCS campaigns with images, buttons, carousels, and verified business messaging at ₹0.16/message.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Full campaign management included — no extra charge
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => openEnquiry()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Enquire Now <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => openEnquiry('Buy RCS Credits')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Buy RCS Credits
            </button>
          </div>
          <p className="text-white/50 text-xs mt-6">Minimum 50,000 messages · Response within 2 hours · Campaign management free</p>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => openEnquiry()} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-xl shadow shadow-blue-200">
          Enquire Now
        </button>
        <button onClick={() => openEnquiry('Buy RCS Credits')} className="flex-1 py-3 border-2 border-blue-600 text-blue-600 text-sm font-bold rounded-xl">
          Buy Credits
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
