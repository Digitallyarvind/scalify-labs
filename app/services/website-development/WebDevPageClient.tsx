'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Monitor, Code2, Zap, Globe, Database, MessageCircle,
  BarChart3, FileText, Layers, Shield, Activity, Sparkles,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  Star, Check, Rocket, Users, Clock, RefreshCw,
  Phone, Mail, User, MapPin, Briefcase, Search,
  Layout, Smartphone, Cpu, BookOpen,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const WHO_IT_SERVES = [
  { icon: HeartPulse, name: 'Clinics & Healthcare', desc: 'Appointment booking, patient inquiry, and WhatsApp integration', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: GraduationCap, name: 'Education & Coaching', desc: 'Admission forms, brochure downloads, and lead automation', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: Building2, name: 'Real Estate', desc: 'Property listings, site visit scheduling, and lead pipelines', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: ShoppingBag, name: 'Ecommerce', desc: 'Product catalogues, payment gateways, and order automation', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Store, name: 'Home Furnishing', desc: 'Product showcase, enquiry workflows, and WhatsApp integration', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: Users, name: 'Local Businesses', desc: 'Professional online presence with inquiry and call systems', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: Zap, name: 'Service Companies', desc: 'Multi-service pages, lead forms, and CRM-connected workflows', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: Sparkles, name: 'Startups', desc: 'Fast-loading growth websites with automation from day one', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
]

const DEV_OPTIONS = [
  {
    icon: Globe,
    name: 'WordPress Development',
    tag: 'Most Popular',
    desc: 'Flexible, scalable, SEO-friendly business websites built on WordPress with custom themes, plugins, and automation integrations.',
    features: ['Custom themes & designs', 'Plugin integration', 'SEO-ready structure', 'Easy content management'],
    color: 'from-blue-600 to-indigo-700',
    bg: 'bg-blue-50 border-blue-100',
  },
  {
    icon: Cpu,
    name: 'AI-Assisted Development',
    tag: 'Modern',
    desc: 'Faster modern development workflows using AI-enabled systems, automation infrastructure, and rapid deployment pipelines.',
    features: ['Faster development cycles', 'AI content systems', 'Modern architecture', 'Automated workflows'],
    color: 'from-violet-600 to-purple-700',
    bg: 'bg-violet-50 border-violet-100',
  },
  {
    icon: Database,
    name: 'Custom Business Workflows',
    tag: 'Enterprise',
    desc: 'Lead management dashboards, inquiry automation, CRM integrations, and operational systems built into your website.',
    features: ['CRM integration', 'Lead dashboards', 'Inquiry automation', 'API connections'],
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50 border-emerald-100',
  },
]

const FEATURES = [
  { icon: Users, name: 'Lead Capture Forms', color: 'bg-blue-100 text-blue-600' },
  { icon: Database, name: 'CRM Integration', color: 'bg-indigo-100 text-indigo-600' },
  { icon: MessageCircle, name: 'WhatsApp Integration', color: 'bg-green-100 text-green-600' },
  { icon: BookOpen, name: 'Blog Systems', color: 'bg-violet-100 text-violet-600' },
  { icon: Cpu, name: 'Blog Automation', color: 'bg-purple-100 text-purple-600' },
  { icon: Activity, name: 'Inquiry Management', color: 'bg-orange-100 text-orange-600' },
  { icon: Smartphone, name: 'Mobile Responsive', color: 'bg-cyan-100 text-cyan-600' },
  { icon: Search, name: 'SEO-Ready Structure', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Zap, name: 'Speed Optimization', color: 'bg-amber-100 text-amber-600' },
  { icon: RefreshCw, name: 'Automation Workflows', color: 'bg-rose-100 text-rose-600' },
  { icon: BarChart3, name: 'Analytics Integration', color: 'bg-teal-100 text-teal-600' },
  { icon: TrendingUp, name: 'Conversion-Focused UI', color: 'bg-blue-100 text-blue-600' },
  { icon: Clock, name: 'Appointment Booking', color: 'bg-red-100 text-red-600' },
  { icon: Layout, name: 'Landing Page Systems', color: 'bg-slate-100 text-slate-600' },
  { icon: Layers, name: 'Multi-Page Architecture', color: 'bg-sky-100 text-sky-600' },
]

const WEBSITE_TYPES = [
  { icon: Globe, name: 'Business Websites', desc: 'Full multi-page business presence with services, team, testimonials, and lead systems' },
  { icon: HeartPulse, name: 'Clinic Websites', desc: 'Appointment booking, doctor profiles, service pages, and patient inquiry flows' },
  { icon: GraduationCap, name: 'Education Websites', desc: 'Course listings, admission forms, faculty pages, and lead nurturing systems' },
  { icon: Building2, name: 'Real Estate Websites', desc: 'Property listings, floor plans, site visit booking, and lead pipelines' },
  { icon: TrendingUp, name: 'Landing Pages', desc: 'High-conversion single pages designed to maximize enquiries and ad ROI' },
  { icon: Users, name: 'Lead Generation Websites', desc: 'Inquiry-focused pages with forms, CTAs, WhatsApp integration, and CRM sync' },
  { icon: Sparkles, name: 'Portfolio Websites', desc: 'Showcase work, case studies, and credentials to build brand authority' },
  { icon: Layers, name: 'Multi-Service Websites', desc: 'Complex service companies with multiple verticals, pages, and automation' },
]

const STEPS = [
  { icon: Users, num: '01', title: 'Requirement Discovery', desc: 'We understand your business goals, target customers, required features, and integration needs.' },
  { icon: Layout, num: '02', title: 'Planning & Structure Design', desc: 'Site architecture, page structure, content plan, and automation workflow mapping.' },
  { icon: Code2, num: '03', title: 'UI/UX & Development', desc: 'Modern responsive design with conversion-optimized layouts, built on WordPress or AI-assisted systems.' },
  { icon: Zap, num: '04', title: 'Automation & Lead Setup', desc: 'CRM integration, WhatsApp automation, inquiry workflows, and lead management systems configured.' },
  { icon: TrendingUp, num: '05', title: 'Launch & Optimization', desc: 'Speed optimization, SEO setup, analytics integration, and post-launch performance monitoring.' },
]

const WHY_CARDS = [
  { icon: TrendingUp, title: 'Growth-Focused Systems', desc: 'Every website is designed to generate leads, automate communication, and support business growth.' },
  { icon: Cpu, title: 'AI-Enabled Development', desc: 'Modern AI-assisted workflows deliver faster development, smarter content systems, and automation infrastructure.' },
  { icon: Users, title: 'Lead Generation Infrastructure', desc: 'Built-in inquiry management, CRM connectivity, and WhatsApp triggers from the very first version.' },
  { icon: Zap, title: 'Automation-First Execution', desc: 'Every touchpoint is automated — from inquiry capture to follow-up to CRM tagging.' },
  { icon: Monitor, title: 'Modern UI/UX Approach', desc: 'Clean, fast, mobile-first designs that build trust and drive conversions across devices.' },
  { icon: Globe, title: 'Scalable Business Systems', desc: 'Built to grow — from a basic 5-page site to a multi-section platform with full automation.' },
]

const FAQ_ITEMS = [
  { q: 'Which platform do you use for website development?', a: 'We primarily build on WordPress — the world\'s most widely used CMS, powering 43% of all websites. We also use AI-assisted development workflows for modern, fast-deploying business sites. The right platform depends on your business requirements, budget, and scalability needs.' },
  { q: 'Do you develop custom WordPress websites?', a: 'Yes. We build fully custom WordPress websites — not off-the-shelf templates. This includes custom theme development, plugin integration, SEO structure, lead capture forms, CRM connectivity, WhatsApp integration, and performance optimization.' },
  { q: 'What is AI-assisted development?', a: 'AI-assisted development uses modern AI tools and code generation systems to build websites faster without compromising quality. It enables rapid prototyping, automated code review, content system integration, and modern deployment pipelines — resulting in faster delivery and lower development overhead.' },
  { q: 'Can you integrate lead management into the website?', a: 'Yes. We integrate lead capture forms with CRM systems, WhatsApp notification triggers, inquiry dashboards, follow-up automation, and appointment booking systems. Your website becomes an active lead management tool, not just a static information page.' },
  { q: 'Do you provide blog and content systems?', a: 'Yes. We set up scalable blog systems with SEO-ready architecture, category structures, internal linking frameworks, and AI-assisted content workflows. Blog content is designed to build organic traffic, improve search rankings, and position your business as a category authority.' },
  { q: 'Is SEO structure included in website development?', a: 'Yes. All websites are built with SEO-ready structure — clean URL architecture, semantic HTML, meta tag frameworks, schema markup, image optimization, page speed optimization, and Core Web Vitals compliance. A technically sound website is the foundation of any SEO strategy.' },
  { q: 'Can automation workflows be added to the website?', a: 'Yes. We build automation directly into your website — WhatsApp messages triggered by form submissions, CRM lead creation, appointment reminders, email sequences, and inquiry routing. These systems run automatically after a visitor takes action on your website.' },
  { q: 'How long does website development take?', a: 'Development timelines depend on complexity. A standard 5–7 page business website typically takes 2–3 weeks. A larger multi-service website with full automation integration and CRM connectivity takes 4–6 weeks. Landing pages can be delivered in 5–7 days. All timelines are confirmed during the requirement discovery phase.' },
]

// ─── ENQUIRY MODAL ─────────────────────────────────────────────────────────────

function EnquiryModal({ onClose }: { onClose: () => void }) {
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
        city: form.city || undefined, source: 'website-dev-page',
        service_interest: 'Website Development',
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
            <h3 className="font-bold text-navy text-lg">Enquire About Website Development</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-indigo-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Enquiry Received!</h4>
            <p className="text-slate-600 text-sm mb-6">Our team will send you a custom quote within 2 hours.</p>
            <button onClick={onClose} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@company.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your business" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Ranchi" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Project Requirements</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="E.g. Need a clinic website with appointment booking and WhatsApp integration…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Send Enquiry <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · Custom quote provided</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function WebDevPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                <Monitor className="w-3.5 h-3.5" />
                Growth-Focused Website Infrastructure Partner
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Business Websites Built for{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Growth, Leads
                </span>{' '}
                &amp; Automation
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Scalify Labs builds modern websites using WordPress and AI-assisted development systems with integrated lead management, automation workflows, blog systems, and scalable business infrastructure.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-100 rounded-full text-xs font-semibold text-violet-800">
                <Sparkles className="w-3.5 h-3.5" />
                More than websites — complete digital business systems
              </div>
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-full shadow-lg shadow-indigo-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                {['WordPress Development', 'AI-Assisted Development', 'Lead Management Systems', 'Automation Workflows', 'Blog & Content Systems', 'Conversion-Focused Design'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Website Ecosystem Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-3xl blur-3xl opacity-15 scale-105" />

                {/* Browser frame */}
                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[420px]">
                  {/* Browser chrome */}
                  <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2.5">
                    <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                    <div className="flex-1 bg-slate-700 rounded-full px-3 py-1 text-[9px] text-slate-400 font-mono">https://citydentalclinic.in</div>
                  </div>

                  {/* Website preview */}
                  <div className="bg-white">
                    {/* Site nav */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-white">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center"><HeartPulse className="w-3 h-3 text-white" /></div>
                        <span className="text-[10px] font-extrabold text-navy">City Dental</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {['Home', 'Services', 'Contact'].map(n => <span key={n} className="text-[8px] text-slate-500 font-medium">{n}</span>)}
                        <button className="text-[7.5px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">Book Now</button>
                      </div>
                    </div>

                    {/* Hero area */}
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-3">
                          <p className="text-[11px] font-black text-navy leading-tight">Modern Dental Care in Ranchi</p>
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-2 h-2 text-amber-400 fill-amber-400" />)}
                            <span className="text-[7px] text-slate-500 ml-0.5">4.9 (238)</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <button className="text-[7px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">Book Appt.</button>
                            <button className="text-[7px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-0.5"><MessageCircle className="w-2 h-2" />WA</button>
                          </div>
                        </div>
                        <div className="col-span-2 bg-white rounded-xl p-2 shadow-sm border border-slate-100">
                          <p className="text-[8px] font-bold text-navy mb-1.5">Quick Enquiry</p>
                          <div className="space-y-1">
                            <div className="h-4 bg-slate-100 rounded text-[7px] px-1.5 flex items-center text-slate-400">Name</div>
                            <div className="h-4 bg-slate-100 rounded text-[7px] px-1.5 flex items-center text-slate-400">Phone</div>
                            <button className="w-full h-4 bg-indigo-600 text-white text-[7px] rounded font-bold">Submit →</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Automation bar */}
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Live Automation Triggers</p>
                      <div className="flex gap-1.5">
                        {[
                          { l: 'Ravi S.', s: 'WA Sent ✓', c: 'bg-green-100 text-green-700' },
                          { l: 'Priya K.', s: 'CRM ✓', c: 'bg-blue-100 text-blue-700' },
                          { l: 'Anil M.', s: 'Appt. Set', c: 'bg-violet-100 text-violet-700' },
                        ].map(lead => (
                          <div key={lead.l} className={`flex-1 px-1.5 py-1 rounded-lg ${lead.c}`}>
                            <p className="text-[8px] font-bold">{lead.l}</p>
                            <p className="text-[7px] opacity-70">{lead.s}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blog section preview */}
                    <div className="px-4 py-2 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Blog System</p>
                        <span className="text-[7px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">Auto-publish ON</span>
                      </div>
                      <div className="space-y-1">
                        {['Best dental care in Ranchi — published', 'Teeth whitening guide — scheduled'].map(b => (
                          <div key={b} className="text-[8px] text-slate-600 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />{b}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center"><CheckCircle className="w-4 h-4 text-emerald-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Lead Captured</p><p className="text-sm font-extrabold text-slate-900">CRM Updated ✓</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">Systems Built In</p>
                  <p className="text-sm font-black flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Full Automation</p>
                </div>
                <div className="absolute top-16 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-700">Blog Published</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">Auto-SEO optimized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Ideal For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Built for Businesses That Want More Than Just a Website</h2>
            <p className="text-slate-500 mt-3 text-sm">Perfect for businesses that want <strong className="text-navy">leads, automation, and scalable digital systems</strong>.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO_IT_SERVES.map(biz => (
              <div key={biz.name} className={`bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${biz.color}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${biz.color}`}><biz.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{biz.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT MAKES US DIFFERENT ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Comparison visual */}
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Traditional Website</p>
                <div className="space-y-2">
                  {['Static pages with no lead flow', 'No CRM or automation integration', 'No WhatsApp or follow-up system', 'Outdated structure, slow speed'].map(issue => (
                    <div key={issue} className="flex items-center gap-2"><X className="w-4 h-4 text-red-400 shrink-0" /><span className="text-sm text-red-800">{issue}</span></div>
                  ))}
                </div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">Scalify Labs Website System</p>
                <div className="space-y-2">
                  {['Lead capture connected to CRM', 'WhatsApp automation on every inquiry', 'Blog system for SEO traffic growth', 'Analytics, speed, and conversion UI', 'Scalable infrastructure & automation flows'].map(feat => (
                    <div key={feat} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" /><span className="text-sm text-indigo-900 font-medium">{feat}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> System-First Approach
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Websites Built as Business Growth Systems</h2>
              <p className="text-slate-600 leading-relaxed">Most websites only display information. Scalify Labs builds websites designed to <strong className="text-navy">generate leads, automate communication, improve conversions, and support long-term business growth.</strong></p>
              <p className="text-slate-600 leading-relaxed">We combine design, automation, lead systems, SEO readiness, content infrastructure, and business workflows into one scalable digital platform.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Lead generation systems', 'Automated communication', 'Improved conversion rates', 'Inquiry management', 'Content growth infrastructure', 'Marketing system integration'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEVELOPMENT OPTIONS ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Platforms & Systems</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Development Platforms &amp; Systems</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {DEV_OPTIONS.map(opt => (
              <div key={opt.name} className={`bg-white rounded-3xl border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${opt.bg}`}>
                <div className={`bg-gradient-to-r ${opt.color} px-6 py-5 text-white`}>
                  <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg">{opt.name}</h3>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">{opt.tag}</span>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{opt.desc}</p>
                  <ul className="space-y-1.5">
                    {opt.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-indigo-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Complete Feature Set</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Features Included in Modern Business Websites</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FEATURES.map(f => (
              <div key={f.name} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}><f.icon className="w-4 h-4" /></div>
                <span className="text-xs font-semibold text-slate-700">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEAD MANAGEMENT ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> Lead Management
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Lead Management Built Into Your Website</h2>
              <p className="text-slate-600 leading-relaxed">Your website should not only collect inquiries — it should help manage, automate, and convert them. Scalify Labs integrates lead management directly into your website from launch day.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Lead dashboards', 'CRM system connectivity', 'WhatsApp notifications on enquiry', 'Inquiry routing workflows', 'Follow-up automation sequences', 'Appointment system integration'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>

            {/* CRM dashboard mockup */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-navy px-5 py-3 flex items-center justify-between">
                <span className="text-white text-sm font-bold flex items-center gap-2"><Database className="w-4 h-4 text-indigo-300" /> Lead Management Dashboard</span>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-emerald-400 text-[10px] font-bold">Live</span></div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'New Leads', v: '24', c: 'text-blue-600' }, { l: 'Contacted', v: '18', c: 'text-amber-600' }, { l: 'Converted', v: '7', c: 'text-emerald-600' }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className={`text-xl font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Pipeline */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Lead Pipeline</p>
                  {[
                    { name: 'Ravi Sharma', source: 'Website Form', status: 'WA Sent', dot: 'bg-green-400', time: '2m ago' },
                    { name: 'Priya Singh', source: 'Landing Page', status: 'CRM Tagged', dot: 'bg-blue-400', time: '15m ago' },
                    { name: 'Anil Kumar', source: 'Blog Form', status: 'Appt. Set', dot: 'bg-violet-400', time: '1h ago' },
                    { name: 'Sita Devi', source: 'Home Page', status: 'Following Up', dot: 'bg-amber-400', time: '3h ago' },
                  ].map(lead => (
                    <div key={lead.name} className="flex items-center gap-2.5 py-2 border-b border-slate-50 last:border-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${lead.dot} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy truncate">{lead.name}</p>
                        <p className="text-[9px] text-slate-400">{lead.source}</p>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full shrink-0">{lead.status}</span>
                      <span className="text-[8px] text-slate-400 shrink-0">{lead.time}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <p className="text-xs font-semibold text-green-800">WhatsApp automation triggered for 3 new leads today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG & CONTENT AUTOMATION ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Blog dashboard mockup */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-amber-400" /><div className="w-3 h-3 rounded-full bg-emerald-400" /></div>
                <span className="text-xs text-slate-500 font-medium mx-auto">Blog & Content System</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Content performance */}
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'Articles Live', v: '24', c: 'text-indigo-600' }, { l: 'Monthly Traffic', v: '3.2K', c: 'text-emerald-600' }, { l: 'Blog Leads', v: '18', c: 'text-violet-600' }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
                      <p className="text-[10px] text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Article pipeline */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Content Pipeline</p>
                  {[
                    { title: 'Best dental clinic in Ranchi', status: 'Published', dot: 'bg-emerald-400', traffic: '420/mo' },
                    { title: 'Teeth whitening cost in Jharkhand', status: 'Scheduled', dot: 'bg-blue-400', traffic: '—' },
                    { title: 'Dental implants guide India', status: 'Drafting', dot: 'bg-amber-400', traffic: '—' },
                  ].map(a => (
                    <div key={a.title} className="flex items-center gap-2.5 py-2 border-b border-slate-50 last:border-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${a.dot} shrink-0`} />
                      <span className="text-xs font-medium text-navy flex-1 truncate">{a.title}</span>
                      <span className="text-[9px] text-slate-500 shrink-0">{a.traffic}</span>
                      <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${a.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : a.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{a.status}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                  <p className="text-xs font-semibold text-indigo-800">AI content optimization active — SEO-ready on publish</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" /> Content Systems
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">Blog Systems Designed for Organic Growth</h2>
              <p className="text-slate-600 leading-relaxed">Content helps businesses build SEO visibility, attract organic traffic, and establish authority in their market. Scalify Labs builds blog systems designed to scale — not just a basic WordPress blog.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Scalable blog architecture', 'AI-assisted publishing workflows', 'SEO-ready content structure', 'Content automation systems', 'Topic cluster planning', 'Performance analytics'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-violet-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WEBSITE TYPES ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Website Types</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Types of Websites We Build</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WEBSITE_TYPES.map(wt => (
              <div key={wt.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-3"><wt.icon className="w-5 h-5 text-indigo-600" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{wt.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{wt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Our Website Development Process</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">5-page business websites delivered in 2–3 weeks. Full automation setup included.</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-indigo-100 via-violet-200 to-indigo-100" />
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

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Edge</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We build websites designed to support business growth — not just look good.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-indigo-600" /></div>
                <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
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
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors" aria-expanded={openFAQ === i}>
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[150px] opacity-[0.15]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-600 rounded-full blur-[120px] opacity-[0.15]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Growth-Focused Website Infrastructure Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Build a Website Designed for Leads, Automation &amp; Business Growth
          </h2>
          <p className="text-white/80 text-lg mb-3">Create scalable digital infrastructure with modern websites, lead systems, automation workflows, and AI-enabled business tools.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> WordPress &amp; AI-assisted development · Custom quote provided
          </p>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-full shadow-lg shadow-indigo-500/20 hover:opacity-90 hover:-translate-y-0.5 transition-all mx-auto">
            Enquire Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 shadow-lg">
        <button onClick={() => setModalOpen(true)} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold rounded-xl shadow shadow-indigo-200 flex items-center justify-center gap-2">
          Enquire Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
