'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import {
  CheckCircle2, ArrowRight, PhoneCall, Database, Zap, BarChart3,
  X, AlertCircle, Users, GitBranch, Bell, RefreshCw, Shield, Clock,
  TrendingUp, MessageSquare, Globe, Smartphone, Search, Mail,
} from 'lucide-react'

// ─── ENQUIRY MODAL ────────────────────────────────────────────────────────────
function EnquiryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', city: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitLead({ ...form, source: 'lead-management-page', service_interest: 'Lead Management & CRM Automation' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="bg-gradient-to-r from-navy to-[#1a2340] p-6 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-saffron/20 rounded-xl flex items-center justify-center mb-3">
            <Database className="w-5 h-5 text-saffron" />
          </div>
          <h3 className="font-bold text-lg mb-1">Get CRM Setup Consultation</h3>
          <p className="text-white/60 text-sm">We'll assess your lead flow and recommend the right CRM stack.</p>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h4 className="font-bold text-navy text-lg mb-1">Consultation Request Received</h4>
            <p className="text-[#7C7268] text-sm">We'll call you within 24 hours to understand your lead management needs.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-saffron text-white font-bold rounded-lg text-sm hover:bg-saffron-dark transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {[
              { id: 'name', label: 'Full Name *', placeholder: 'Your name', type: 'text', required: true },
              { id: 'phone', label: 'Phone Number *', placeholder: '+91 98765 43210', type: 'tel', required: true },
              { id: 'email', label: 'Business Email', placeholder: 'you@company.com', type: 'email', required: false },
              { id: 'business', label: 'Business / Company', placeholder: 'Your business name', type: 'text', required: false },
              { id: 'city', label: 'City', placeholder: 'Ranchi, Jamshedpur, Delhi…', type: 'text', required: false },
            ].map(field => (
              <div key={field.id}>
                <label className="block text-xs font-semibold text-[#44403C] mb-1.5" htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={form[field.id as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-colors"
                />
              </div>
            ))}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" /> Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-saffron text-white font-bold py-3 rounded-xl hover:bg-saffron-dark transition-colors disabled:opacity-60 text-sm mt-1"
            >
              {status === 'loading' ? 'Submitting…' : 'Get Free CRM Consultation →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const CRM_PLATFORMS = [
  { name: 'Kylas CRM', tag: 'Best for Sales Teams', color: 'bg-blue-50 text-blue-700 border-blue-100', badge: 'Most Recommended' },
  { name: 'TeleCRM', tag: 'Telemarketing & Calls', color: 'bg-violet-50 text-violet-700 border-violet-100', badge: null },
  { name: 'Cratio CRM', tag: 'Indian B2B & SMB', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', badge: null },
  { name: 'Bitrix24', tag: 'Full Business Suite', color: 'bg-red-50 text-red-700 border-red-100', badge: null },
  { name: 'Zoho CRM', tag: 'Enterprise & Mid-Market', color: 'bg-orange-50 text-orange-700 border-orange-100', badge: null },
  { name: 'HubSpot CRM', tag: 'Inbound Marketing Focus', color: 'bg-amber-50 text-amber-700 border-amber-100', badge: null },
  { name: 'LeadSquared', tag: 'EdTech & Healthcare', color: 'bg-indigo-50 text-indigo-700 border-indigo-100', badge: null },
  { name: 'Salesforce', tag: 'Enterprise Scale', color: 'bg-sky-50 text-sky-700 border-sky-100', badge: null },
]

const LEAD_SOURCES = [
  { icon: TrendingUp, name: 'Google Ads', color: 'bg-blue-100 text-blue-600' },
  { icon: Smartphone, name: 'Meta Ads', color: 'bg-violet-100 text-violet-600' },
  { icon: Globe, name: 'Website Forms', color: 'bg-emerald-100 text-emerald-600' },
  { icon: MessageSquare, name: 'WhatsApp', color: 'bg-green-100 text-green-600' },
  { icon: Search, name: 'IndiaMART', color: 'bg-orange-100 text-orange-600' },
  { icon: PhoneCall, name: 'JustDial', color: 'bg-yellow-100 text-yellow-700' },
  { icon: Mail, name: 'Email Campaigns', color: 'bg-pink-100 text-pink-600' },
  { icon: Users, name: 'Referrals', color: 'bg-indigo-100 text-indigo-600' },
]

const WHAT_WE_SETUP = [
  { icon: Database, title: 'CRM Platform Setup', desc: 'Account creation, pipeline stages, custom fields, and user roles tailored to your sales process.', },
  { icon: GitBranch, title: 'Lead Source Integration', desc: 'Auto-capture leads from Meta Ads, Google Ads, website forms, IndiaMART, JustDial, and WhatsApp directly into CRM.', },
  { icon: Zap, title: 'Automated Lead Assignment', desc: 'Round-robin or territory-based auto-assignment to your sales team. No manual distribution.', },
  { icon: Bell, title: 'Follow-Up Automation', desc: 'Automated reminders, task creation, and WhatsApp/SMS alerts when a lead has not been contacted.', },
  { icon: RefreshCw, title: 'Lead Nurturing Sequences', desc: 'Multi-step email + WhatsApp sequences that warm up cold leads while your sales team focuses on hot ones.', },
  { icon: BarChart3, title: 'Sales Pipeline & Reporting', desc: 'Stage-wise pipeline views, conversion reports, team performance dashboards, and revenue forecasting.', },
  { icon: Shield, title: 'Data Security & Backup', desc: 'Role-based access control, data export policies, and regular backup configuration.', },
  { icon: Clock, title: 'Training & Handover', desc: '2-hour live training session with your sales team + recorded walkthrough videos for onboarding.', },
]

const BEFORE_AFTER = [
  { before: 'Leads scattered across WhatsApp, emails, and notebooks', after: 'All leads in one CRM — automatically captured and organized' },
  { before: 'No visibility on which salesperson has which lead', after: 'Real-time pipeline view with lead ownership and status' },
  { before: 'Follow-ups missed because of no reminders', after: 'Automated daily task lists and follow-up reminders' },
  { before: 'No data on conversion rates or drop-off stages', after: 'Full-funnel analytics — see exactly where leads are lost' },
  { before: 'Same lead contacted multiple times by different people', after: 'Duplicate detection and single source of truth' },
  { before: 'Slow response time — leads go cold before contact', after: 'Auto-reply + instant lead notification in under 60 seconds' },
]

const PACKAGES = [
  {
    name: 'Starter CRM',
    price: '₹40,000',
    note: 'One-time setup',
    tag: 'Up to 10 users',
    color: 'border-slate-200',
    features: [
      'CRM platform setup (Kylas / Cratio / TeleCRM)',
      'Up to 3 lead source integrations',
      'Basic pipeline with 5 stages',
      'Auto lead assignment (round-robin)',
      'Follow-up reminders & tasks',
      'Email templates (5)',
      '2-hour team training session',
      '30-day post-setup support',
    ],
  },
  {
    name: 'Growth CRM',
    price: '₹60,000',
    note: 'One-time setup',
    tag: 'Up to 25 users',
    color: 'border-saffron',
    popular: true,
    features: [
      'Everything in Starter CRM',
      'Up to 6 lead source integrations',
      'Multi-pipeline setup (Sales + Support)',
      'WhatsApp automation sequences',
      'Lead scoring & priority routing',
      'Custom reporting dashboard',
      'Email + WhatsApp templates (20)',
      'Recorded training + SOP documentation',
      '60-day post-setup support',
    ],
  },
  {
    name: 'Enterprise CRM',
    price: 'Custom',
    note: 'Based on scope',
    tag: 'Unlimited users',
    color: 'border-navy',
    features: [
      'Everything in Growth CRM',
      'Custom CRM development / API work',
      'Salesforce / Zoho / HubSpot setup',
      'ERP / tally / accounting integration',
      'Custom AI lead scoring model',
      'Dedicated CRM manager (3 months)',
      'Quarterly CRM health reviews',
    ],
  },
]

const FAQS = [
  {
    q: 'Which CRM do you recommend for a small sales team in India?',
    a: 'For most Indian SMBs with 2–15 salespeople, we recommend Kylas CRM — it\'s made in India, affordable, and has excellent WhatsApp integration. For telecalling-heavy teams, TeleCRM is better. We assess your specific use case before recommending.',
  },
  {
    q: 'Can you integrate with IndiaMART and JustDial?',
    a: 'Yes. We connect IndiaMART and JustDial leads directly into your CRM via API or Zapier integration. Every new inquiry from these portals auto-creates a lead in CRM and notifies your salesperson within 60 seconds.',
  },
  {
    q: 'Do you provide ongoing CRM management or just setup?',
    a: 'Our packages are one-time setup + training. We do offer a monthly CRM management add-on (₹8,000–₹15,000/month) for businesses that want ongoing optimization, new workflow additions, and reporting.',
  },
  {
    q: 'How long does the setup take?',
    a: 'Starter CRM: 5–7 business days. Growth CRM: 10–14 business days. Enterprise: 3–6 weeks depending on complexity and custom development required.',
  },
  {
    q: 'Do you need access to our existing data?',
    a: 'We\'ll ask you to export your existing lead data (Excel or CSV format) and we\'ll import and clean it into the new CRM. Data migration is included in all packages.',
  },
]

export default function LeadManagementPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} />}

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,101,0,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <Database className="w-3.5 h-3.5" />
                Lead Management & CRM Automation
              </span>
              <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5">
                Stop Losing Leads.<br />
                <span className="text-saffron">Start Closing More.</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                We set up, integrate, and automate your entire lead management system — from the first touchpoint to closed deal. One CRM. All your leads. Zero chaos.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
                >
                  Get Free CRM Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27d%20like%20to%20know%20about%20CRM%20setup%20for%20my%20business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/15 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { label: '100% Lead Capture', sub: 'Zero missed inquiries' },
                  { label: '60-sec Response', sub: 'Automated alerts' },
                  { label: '8 CRM Platforms', sub: 'We support all major CRMs' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
                    <div>
                      <div className="text-white font-bold text-sm">{stat.label}</div>
                      <div className="text-white/40 text-xs">{stat.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual — CRM Pipeline Mockup */}
            <div className="hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                {/* Pipeline header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Sales Pipeline</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono px-2.5 py-1 rounded-full">Live</span>
                </div>
                {/* Pipeline stages */}
                {[
                  { stage: 'New Leads', count: 24, color: 'bg-blue-400', width: '100%' },
                  { stage: 'Contacted', count: 18, color: 'bg-violet-400', width: '75%' },
                  { stage: 'Qualified', count: 12, color: 'bg-amber-400', width: '50%' },
                  { stage: 'Proposal Sent', count: 8, color: 'bg-orange-400', width: '33%' },
                  { stage: 'Negotiation', count: 5, color: 'bg-saffron', width: '21%' },
                  { stage: 'Won', count: 3, color: 'bg-emerald-400', width: '12%' },
                ].map(s => (
                  <div key={s.stage} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-xs">{s.stage}</span>
                      <span className="text-white font-bold text-xs">{s.count}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: s.width }} />
                    </div>
                  </div>
                ))}
                {/* Footer stats */}
                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Conversion', value: '12.5%' },
                    { label: 'Avg Response', value: '48s' },
                    { label: 'Revenue', value: '₹4.2L' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <div className="text-white font-bold text-base">{stat.value}</div>
                      <div className="text-white/40 text-[0.65rem] font-mono uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ─────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">The Transformation</p>
            <h2 className="font-sans font-extrabold text-3xl text-navy mb-3">Before CRM vs After CRM</h2>
            <p className="text-[#7C7268] max-w-lg mx-auto">Most Indian businesses run their sales on WhatsApp groups and spreadsheets. This is what changes when you implement a proper CRM.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">✗</span>
                <span className="font-bold text-red-700 text-sm uppercase tracking-wide">Without CRM</span>
              </div>
              <div className="space-y-3">
                {BEFORE_AFTER.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[#7C7268] text-sm leading-relaxed">{item.before}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="font-bold text-emerald-700 text-sm uppercase tracking-wide">With Scalify CRM Setup</span>
              </div>
              <div className="space-y-3">
                {BEFORE_AFTER.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[#44403C] text-sm leading-relaxed font-medium">{item.after}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE SET UP ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Full-Stack Setup</p>
            <h2 className="font-sans font-extrabold text-3xl text-navy mb-3">Everything We Configure For You</h2>
            <p className="text-[#7C7268] max-w-lg mx-auto">End-to-end CRM implementation — from platform selection to team training.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_WE_SETUP.map(item => (
              <div key={item.title} className="border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-bold text-navy text-sm mb-2">{item.title}</h3>
                <p className="text-[#7C7268] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD SOURCES ──────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Multi-Source Integration</p>
            <h2 className="font-sans font-extrabold text-3xl text-navy mb-3">Every Lead Source, One CRM</h2>
            <p className="text-[#7C7268] max-w-lg mx-auto">We connect all your lead sources so no inquiry falls through the cracks — ever.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {LEAD_SOURCES.map(src => (
              <div key={src.name} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${src.color}`}>
                  <src.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-navy text-sm">{src.name}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-[#7C7268] text-sm mt-6">
            + IndiaBulls, 99acres, Sulekha, NoBroker, LinkedIn, and 20+ more via Zapier/API
          </p>
        </div>
      </section>

      {/* ── CRM PLATFORMS ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Platform Expertise</p>
            <h2 className="font-sans font-extrabold text-3xl text-navy mb-3">CRMs We Implement</h2>
            <p className="text-[#7C7268] max-w-md mx-auto">We're platform-agnostic — we recommend the best CRM for your business, then set it up completely.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CRM_PLATFORMS.map(crm => (
              <div key={crm.name} className={`relative border rounded-2xl p-5 hover:shadow-sm transition-all ${crm.color}`}>
                {crm.badge && (
                  <span className="absolute -top-2.5 left-4 bg-saffron text-white text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full">
                    {crm.badge}
                  </span>
                )}
                <h3 className="font-bold text-sm mb-1">{crm.name}</h3>
                <p className="text-xs opacity-70">{crm.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Investment</p>
            <h2 className="font-sans font-extrabold text-3xl text-navy mb-3">One-Time Setup Packages</h2>
            <p className="text-[#7C7268] max-w-md mx-auto">Pay once, benefit forever. No monthly licensing fees from us — just CRM platform costs (usually ₹2,000–₹8,000/month for the platform itself).</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl border-2 ${pkg.color} p-7 flex flex-col shadow-sm ${pkg.popular ? 'shadow-saffron/10 shadow-lg' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-saffron text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-navy text-lg mb-1">{pkg.name}</h3>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="font-extrabold text-3xl text-navy">{pkg.price}</span>
                  </div>
                  <p className="text-[#7C7268] text-xs">{pkg.note} · {pkg.tag}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#44403C]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setModalOpen(true)}
                  className={`w-full font-bold py-3 rounded-xl text-sm transition-all ${
                    pkg.popular
                      ? 'bg-saffron text-white hover:bg-saffron-dark shadow-[0_4px_14px_rgba(255,101,0,0.3)]'
                      : 'bg-navy text-white hover:bg-navy/90'
                  }`}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-[#7C7268] text-sm mt-6">
            All packages include free CRM platform recommendation consultation before purchase.
          </p>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────────── */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Implementation Process</p>
            <h2 className="font-sans font-extrabold text-3xl text-white mb-3">From Chaos to Clarity in 4 Steps</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Audit & Recommend', desc: 'We map your current lead flow, existing tools, and team size to recommend the perfect CRM.' },
              { step: '02', title: 'Configure & Integrate', desc: 'CRM setup, pipeline stages, custom fields, and all lead source integrations connected.' },
              { step: '03', title: 'Automate & Test', desc: 'Lead assignment, follow-up workflows, notification rules, and data migration completed.' },
              { step: '04', title: 'Train & Launch', desc: 'Live training session, recorded walkthroughs, SOP docs, and 30-day post-launch support.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-saffron/10 border border-saffron/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="font-mono font-bold text-saffron text-sm">{s.step}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="font-sans font-extrabold text-3xl text-navy">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-navy text-sm pr-4">{faq.q}</span>
                  <span className={`text-saffron transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[#7C7268] text-sm leading-relaxed border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-sans font-extrabold text-3xl text-white mb-4">
            Ready to Stop Losing Leads?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Get a free 30-minute CRM audit call. We'll identify exactly which leads you're losing and how to capture them.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all"
            >
              Book Free CRM Audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
