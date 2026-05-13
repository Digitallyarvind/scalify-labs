'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/lib/actions'
import {
  Mail, CheckCircle2, ArrowRight, Zap, Database, BarChart3,
  TrendingUp, RefreshCw, Shield, Layers, GitBranch, Globe,
  ChevronDown, AlertCircle, Loader2, Rocket, MessageSquare,
  Settings2, Target, Users, PhoneCall, BrainCircuit,
} from 'lucide-react'

// ─── HERO DASHBOARD (LIGHT THEME) ──────────────────────────────────────────────

function EmailDashboard() {
  return (
    <div className="relative">
      <div className="bg-white border border-blue-100 rounded-3xl shadow-2xl overflow-hidden">
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-4 text-white">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-60 mb-1">Email Campaign HQ</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">7 Active Campaigns</span>
            <span className="flex items-center gap-1.5 bg-white/20 text-white text-[0.65rem] font-mono px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse inline-block" />
              All Systems Live
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Open Rate', value: '42.8%', delta: '+12% vs avg', color: 'bg-blue-50 border-blue-100 text-blue-900', delta_c: 'text-emerald-600' },
              { label: 'Click Rate', value: '8.6%', delta: 'Industry 2.9%', color: 'bg-cyan-50 border-cyan-100 text-cyan-900', delta_c: 'text-emerald-600' },
              { label: 'Delivery', value: '98.2%', delta: '1.4% bounce', color: 'bg-emerald-50 border-emerald-100 text-emerald-900', delta_c: 'text-slate-500' },
            ].map(m => (
              <div key={m.label} className={`border rounded-xl p-3 ${m.color}`}>
                <p className="font-mono text-[0.58rem] uppercase opacity-60 mb-1">{m.label}</p>
                <p className="font-extrabold text-2xl leading-none mb-0.5">{m.value}</p>
                <p className={`text-[0.6rem] font-mono ${m.delta_c}`}>{m.delta}</p>
              </div>
            ))}
          </div>

          {/* SMTP monitor */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
            <p className="text-slate-500 font-mono text-[0.58rem] uppercase tracking-wide mb-2">SMTP Infrastructure</p>
            {[
              { domain: 'outreach.scalifylabs.com', status: 'Healthy', sent: '12.4K', color: 'bg-emerald-400' },
              { domain: 'nurture.scalifylabs.com', status: 'Warming', sent: '3.2K', color: 'bg-amber-400' },
              { domain: 'campaigns.scalifylabs.com', status: 'Active', sent: '8.9K', color: 'bg-blue-400' },
            ].map(d => (
              <div key={d.domain} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <div className={`w-2 h-2 rounded-full ${d.color} shrink-0`} />
                <span className="text-slate-600 text-[0.62rem] flex-1 truncate font-mono">{d.domain}</span>
                <span className="text-slate-400 text-[0.58rem] font-mono">{d.sent}</span>
                <span className={`text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full ${d.color.replace('bg-', 'bg-').replace('-400', '-100')} ${d.color.replace('bg-', 'text-').replace('-400', '-700')}`}>{d.status}</span>
              </div>
            ))}
          </div>

          {/* Automation flows */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <p className="text-blue-700 font-mono text-[0.6rem] uppercase font-bold">Active Automations</p>
              </div>
              <span className="text-blue-600 font-extrabold text-lg">12</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Welcome Seq','Lead Nurture','Re-Engage','Onboarding','Follow-Up','Cold Outreach'].map(f => (
                <span key={f} className="bg-white border border-blue-100 text-blue-600 text-[0.55rem] font-mono px-2 py-0.5 rounded-full">{f}</span>
              ))}
            </div>
          </div>

          {/* Platform strip */}
          <div>
            <p className="text-slate-400 font-mono text-[0.58rem] uppercase tracking-wide mb-2">Platforms Connected</p>
            <div className="flex flex-wrap gap-1.5">
              {['SendGrid','Apollo','Lemlist','Instantly','Brevo','HubSpot','Mailchimp'].map(p => (
                <span key={p} className="bg-slate-100 text-slate-500 text-[0.6rem] font-mono px-2.5 py-1 rounded-lg border border-slate-200">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[0.62rem] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 whitespace-nowrap flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
        Inbox Warmup Active
      </div>
      <div className="absolute -bottom-3 -left-3 bg-white border border-blue-100 text-blue-700 text-[0.62rem] font-mono font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap">
        ⚡ AI Personalization On
      </div>
    </div>
  )
}

// ─── CTA FORM ─────────────────────────────────────────────────────────────────

function EmailStrategyForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', leads: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitLead({
        name: form.name, phone: form.phone, email: form.email, business: form.business,
        source: 'email-marketing-page',
        service_interest: 'Email Marketing Systems',
        message: `Business Type: ${form.business} | Monthly Leads: ${form.leads} | Goals: ${form.message}`,
      })
      setStatus('success')
    } catch { setStatus('error') }
  }

  const ic = 'w-full border border-slate-200 bg-white rounded-xl text-slate-800 placeholder-slate-400 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all'

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-2">Strategy Call Request Received!</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto">Our email systems team will contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Full Name *</label>
          <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={ic} /></div>
        <div><label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Phone *</label>
          <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" type="tel" className={ic} /></div>
      </div>
      <div><label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Business Email</label>
        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" className={ic} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Business Type</label>
          <select value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))} className={`${ic} cursor-pointer`}>
            <option value="">Select type</option>
            {['B2B Company','B2C / Ecommerce','Education Institute','Clinic / Healthcare','Real Estate','Service Business','Startup','Agency','Other'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div><label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Monthly Leads</label>
          <select value={form.leads} onChange={e => setForm(f => ({ ...f, leads: e.target.value }))} className={`${ic} cursor-pointer`}>
            <option value="">Select range</option>
            {['Under 50','50–200','200–500','500–2000','2000+'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div><label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">What Are You Trying to Improve?</label>
        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={3} placeholder="Describe your current email challenges and goals…" className={`${ic} resize-none`} /></div>
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" /> Something went wrong. Please try again.
        </div>
      )}
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-gradient-to-r from-saffron to-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.30)] hover:shadow-[0_6px_28px_rgba(255,101,0,0.45)] hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60">
        {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <><Mail className="w-4 h-4" /> Get Free Email Strategy Call</>}
      </button>
      <p className="text-slate-400 text-[0.65rem] text-center">Free strategy call · No spam · Response within 24 hours</p>
    </form>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: Mail, name: 'Bulk Email Campaigns', desc: 'High-volume personalized campaigns with SMTP infrastructure at scale.' },
  { icon: Target, name: 'Cold Email Outreach', desc: 'B2B prospecting sequences using Apollo, Instantly, and Lemlist.' },
  { icon: Settings2, name: 'SMTP Server Setup', desc: 'Custom SMTP relay configuration for reliable high-volume sending.' },
  { icon: Zap, name: 'SendGrid Integration', desc: 'API setup, templates, suppression lists, and delivery optimization.' },
  { icon: Globe, name: 'Apollo Outreach Systems', desc: 'Prospect research, contact enrichment, and outreach automation.' },
  { icon: GitBranch, name: 'Lead Nurturing Funnels', desc: 'Multi-step sequences that guide leads from awareness to conversion.' },
  { icon: RefreshCw, name: 'Email Automation', desc: 'Trigger-based workflows across CRM, behavior, and time-based rules.' },
  { icon: Database, name: 'CRM Email Workflows', desc: 'Synced email journeys connected to your sales pipeline and CRM.' },
  { icon: BrainCircuit, name: 'AI Email Personalization', desc: 'AI-assisted subject lines, body copy, and send-time optimization.' },
  { icon: Layers, name: 'Newsletter Systems', desc: 'Branded newsletter infrastructure with audience segmentation.' },
  { icon: Shield, name: 'Domain Warmup Setup', desc: 'Gradual inbox warming for new domains to build sender reputation.' },
  { icon: BarChart3, name: 'Deliverability Optimization', desc: 'SPF, DKIM, DMARC setup + reputation monitoring and recovery.' },
  { icon: TrendingUp, name: 'Drip Campaigns', desc: 'Scheduled nurturing sequences for onboarding, education, and offers.' },
  { icon: Users, name: 'Sales Outreach Sequences', desc: 'Multi-touch outreach across email, LinkedIn, and calls.' },
  { icon: RefreshCw, name: 'Retargeting Email Flows', desc: 'Re-engage website visitors and abandoned checkout audiences.' },
  { icon: ShoppingBag, name: 'Ecommerce Email Funnels', desc: 'Cart recovery, post-purchase, and loyalty campaign systems.' },
  { icon: Globe, name: 'B2B Outreach Systems', desc: 'Industry-targeted prospecting and multi-domain outreach infrastructure.' },
  { icon: MessageSquare, name: 'Customer Re-Engagement', desc: 'Win back inactive subscribers with behavioral trigger campaigns.' },
  { icon: BarChart3, name: 'Email Analytics & Tracking', desc: 'UTM tracking, heatmaps, conversion attribution, and dashboard reporting.' },
  { icon: Layers, name: 'Multi-Domain Infrastructure', desc: 'Scalable sending architecture across multiple domains for high-volume outreach.' },
]

const TOOL_GROUPS = [
  { label: 'Email & SMTP', color: 'bg-blue-50 border-blue-100 text-blue-700', tools: ['SendGrid','Mailgun','Amazon SES','Brevo','Mailchimp','Zoho Campaigns','HubSpot','ActiveCampaign','ConvertKit','MailerLite'] },
  { label: 'Cold Outreach', color: 'bg-violet-50 border-violet-100 text-violet-700', tools: ['Apollo','Instantly','Lemlist','Smartlead'] },
  { label: 'CRM', color: 'bg-emerald-50 border-emerald-100 text-emerald-700', tools: ['HubSpot','Zoho CRM','Bitrix24','TeleCRM','Kylas'] },
  { label: 'Automation', color: 'bg-amber-50 border-amber-100 text-amber-700', tools: ['Zapier','Make.com','n8n'] },
  { label: 'AI', color: 'bg-pink-50 border-pink-100 text-pink-700', tools: ['ChatGPT','Claude','Gemini'] },
  { label: 'Analytics', color: 'bg-sky-50 border-sky-100 text-sky-700', tools: ['GA4','Looker Studio'] },
]

const STATS = [
  { value: '40%+', label: 'Average Open Rate', sub: 'vs 20% industry avg', color: 'from-blue-500 to-blue-600' },
  { value: '3×', label: 'Response Rate Lift', sub: 'with AI personalization', color: 'from-cyan-500 to-cyan-600' },
  { value: '98%+', label: 'Delivery Rate', sub: 'with SMTP infrastructure', color: 'from-emerald-500 to-emerald-600' },
  { value: '5×', label: 'Outreach Scale', sub: 'vs manual sending', color: 'from-violet-500 to-violet-600' },
  { value: '60s', label: 'Lead Response Speed', sub: 'with automation triggers', color: 'from-amber-500 to-orange-500' },
  { value: '30%+', label: 'Repeat Customer Rate', sub: 'with nurture sequences', color: 'from-pink-500 to-rose-500' },
  { value: '-70%', label: 'Follow-Up Time', sub: 'automated workflows', color: 'from-indigo-500 to-blue-500' },
  { value: '100%', label: 'Campaign Tracking', sub: 'UTM + attribution', color: 'from-teal-500 to-cyan-500' },
]

const CASE_STUDIES = [
  { tag: 'B2B Outreach', brand: 'B2B SaaS Company', challenge: 'Manual cold outreach with 5% open rates and no tracking', system: 'Apollo + Instantly multi-domain outreach system with AI personalization', outcome: '38% open rate · 12% reply rate · 60+ qualified meetings/month', color: 'border-blue-200 bg-blue-50' },
  { tag: 'Education', brand: 'Coaching Institute', challenge: 'Leads going cold after initial inquiry due to no nurturing', system: 'HubSpot lead nurturing funnel with 8-email drip sequence', outcome: '3× admission conversion · ₹8L additional monthly revenue', color: 'border-violet-200 bg-violet-50' },
  { tag: 'Ecommerce', brand: 'D2C Fashion Brand', challenge: 'High cart abandonment with no recovery automation', system: 'Klaviyo abandoned cart + post-purchase + loyalty funnel', outcome: '22% cart recovery rate · 34% repeat purchase increase', color: 'border-emerald-200 bg-emerald-50' },
  { tag: 'Healthcare', brand: 'Multi-City Clinic', challenge: 'No-show rate of 35% with zero follow-up automation', system: 'Appointment reminder + follow-up sequence via email + WhatsApp', outcome: 'No-show reduced to 12% · 2× rebooking rate', color: 'border-amber-200 bg-amber-50' },
  { tag: 'Hybrid Workflow', brand: 'Real Estate Developer', challenge: 'Leads not followed up across email and WhatsApp channels', system: 'CRM + email + WhatsApp unified automation pipeline via Make.com', outcome: '45% faster lead response · 28% more site visits booked', color: 'border-pink-200 bg-pink-50' },
]

const AUTOMATION_FLOW = [
  { step: '01', label: 'Lead Capture', sub: 'Form · Landing Page · WhatsApp', color: 'bg-blue-500' },
  { step: '02', label: 'CRM Sync', sub: 'Auto-assign · Tag · Score', color: 'bg-violet-500' },
  { step: '03', label: 'Welcome Email', sub: 'Instant triggered send', color: 'bg-cyan-500' },
  { step: '04', label: 'Value Sequence', sub: '3–5 educational emails', color: 'bg-emerald-500' },
  { step: '05', label: 'Behavior Tracking', sub: 'Opens · Clicks · Visits', color: 'bg-amber-500' },
  { step: '06', label: 'Offer Email', sub: 'Personalized based on behavior', color: 'bg-orange-500' },
  { step: '07', label: 'Follow-Up Automation', sub: 'No-reply triggers · Re-engage', color: 'bg-saffron' },
  { step: '08', label: 'Conversion', sub: 'Demo · Purchase · Inquiry', color: 'bg-pink-500' },
  { step: '09', label: 'Retention Campaign', sub: 'Loyalty · Upsell · Referral', color: 'bg-indigo-500' },
]

const INFRA_PLATFORMS = ['SendGrid','Mailgun','Amazon SES','Apollo','Instantly','Lemlist','Brevo','Mailchimp','HubSpot','Zoho Campaigns']
const INFRA_FEATURES = [
  { icon: Shield, label: 'SPF / DKIM / DMARC Setup' },
  { icon: TrendingUp, label: 'Inbox Warmup Protocol' },
  { icon: BarChart3, label: 'Deliverability Monitoring' },
  { icon: RefreshCw, label: 'Sender Reputation Management' },
  { icon: BrainCircuit, label: 'AI-Assisted Personalization' },
  { icon: Layers, label: 'Multi-Domain Scaling' },
  { icon: Zap, label: 'Outreach Automation' },
  { icon: Database, label: 'CRM Data Sync' },
]

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function EmailMarketingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ══ SECTION 1 — HERO ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-36 pb-20 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(6,182,212,0.06),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_480px] gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <Mail className="w-3.5 h-3.5" />
                Bulk Outreach · Automation · CRM Email Systems
              </span>

              <h1 className="font-extrabold text-4xl lg:text-[3rem] text-slate-900 leading-tight tracking-tight mb-5">
                Email Marketing Systems That<br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Generate Leads, Nurture Customers
                </span><br />
                &amp; Scale Revenue
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mb-5 max-w-[530px]">
                From bulk outreach infrastructure to automated nurturing funnels, Scalify Labs helps businesses build modern email systems using SMTP servers, AI workflows, CRM automation, and high-converting campaign strategies.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Improve Follow-Ups','Automate Communication','Run Cold Outreach','Nurture Leads at Scale','Increase Repeat Business','Optimize Deliverability'].map(b => (
                  <div key={b} className="flex items-center gap-1.5 bg-white border border-blue-100 rounded-full px-3 py-1.5 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="text-slate-600 text-xs font-medium">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#cta"
                  className="flex items-center gap-2 bg-saffron text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.30)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm">
                  <PhoneCall className="w-4 h-4" /> Book Free Strategy Call
                </a>
                <a href="#automation"
                  className="flex items-center gap-2 border border-blue-200 text-blue-700 bg-blue-50 font-semibold px-6 py-3.5 rounded-xl hover:bg-blue-100 transition-all text-sm">
                  See Email Workflows <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <EmailDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — WHY MODERN EMAIL MATTERS ══════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Core Need</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">Why Businesses Need Modern<br />Email Infrastructure</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { icon: Layers, title: 'Bulk Outreach at Scale', desc: 'Run personalized outreach campaigns using SMTP infrastructure and scalable sending systems without hitting limits.', color: 'bg-blue-100 text-blue-600' },
              { icon: GitBranch, title: 'Lead Nurturing Automation', desc: 'Automatically follow up with leads across the customer journey — from first contact to closed deal.', color: 'bg-cyan-100 text-cyan-600' },
              { icon: Shield, title: 'Higher Deliverability', desc: 'Domain warmup, sender reputation, authentication setup, and inbox optimization for reliable delivery.', color: 'bg-emerald-100 text-emerald-600' },
              { icon: Database, title: 'CRM + Email Sync', desc: 'Keep leads connected across email, WhatsApp, CRM, and automation — one unified customer journey.', color: 'bg-violet-100 text-violet-600' },
            ].map(c => (
              <div key={c.title} className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-11 h-11 ${c.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <c.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-2">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl px-8 py-5 text-white text-center">
            <p className="font-semibold text-lg">
              &ldquo;Most businesses lose leads because follow-up systems break.{' '}
              <span className="text-cyan-200">Modern automation fixes that.</span>&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — SERVICES GRID ════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Service Scope</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">Complete Email Marketing<br />&amp; Outreach Systems</h2>
            <p className="text-slate-500 max-w-lg mx-auto">From infrastructure setup to AI-powered campaigns — every email growth capability in one partner.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(svc => (
              <div key={svc.name}
                className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svc.icon className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{svc.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — INFRASTRUCTURE ════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Technical Foundation</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">Advanced Bulk Email<br />Infrastructure Setup</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Enterprise-grade email infrastructure built for reliability, deliverability, and scale.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Architecture visual */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-blue-500 mb-5">Email Infrastructure Architecture</p>
              <div className="space-y-3">
                {[
                  { layer: 'Sending Domain Layer', items: ['Primary Domain','Warmup Domain','Outreach Domain'], color: 'bg-blue-100 text-blue-700' },
                  { layer: 'SMTP Relay Layer', items: ['SendGrid','Amazon SES','Mailgun'], color: 'bg-cyan-100 text-cyan-700' },
                  { layer: 'Delivery Monitoring', items: ['Bounce Rate','Spam Score','Inbox Rate'], color: 'bg-emerald-100 text-emerald-700' },
                  { layer: 'CRM Integration Layer', items: ['Lead Sync','Behavior Tags','Pipeline Update'], color: 'bg-violet-100 text-violet-700' },
                ].map(layer => (
                  <div key={layer.layer} className="bg-white border border-blue-100 rounded-xl p-4">
                    <p className="font-bold text-slate-700 text-xs mb-2">{layer.layer}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map(item => (
                        <span key={item} className={`text-[0.65rem] font-mono px-2.5 py-1 rounded-full border ${layer.color}`}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-blue-100">
                <p className="text-blue-600 font-mono text-[0.62rem] uppercase tracking-wide mb-3">Platform Integrations</p>
                <div className="flex flex-wrap gap-2">
                  {INFRA_PLATFORMS.map(p => (
                    <span key={p} className="bg-white border border-blue-100 text-slate-600 text-[0.62rem] font-mono px-2.5 py-1 rounded-lg">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {INFRA_FEATURES.map(f => (
                <div key={f.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <f.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-700 text-sm">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — AUTOMATION ROADMAP ════════════════════════════════ */}
      <section id="automation" className="bg-gradient-to-br from-blue-50/50 to-cyan-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Workflow Design</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">How Automated Email<br />Funnels Work</h2>
            <p className="text-slate-500 max-w-lg mx-auto">A 9-stage connected email automation system that converts leads into customers — automatically.</p>
          </div>

          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 via-emerald-400 to-indigo-400 opacity-40" />
            <div className="space-y-4">
              {AUTOMATION_FLOW.map((step, i) => (
                <div key={step.label} className="flex items-center gap-5 group">
                  <div className={`w-11 h-11 rounded-xl ${step.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform z-10`}>
                    <span className="text-white font-extrabold text-xs">{step.step}</span>
                  </div>
                  <div className="flex-1 bg-white border border-slate-100 rounded-2xl px-5 py-3.5 group-hover:border-blue-200 group-hover:shadow-md transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-slate-800 text-sm">{step.label}</span>
                      <span className="text-slate-400 font-mono text-[0.62rem]">{step.sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — PLATFORMS ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Tool Ecosystem</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">Platforms &amp; Tools We Work With</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Hands-on expertise across the modern email and outreach technology stack.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOL_GROUPS.map(group => (
              <div key={group.label} className={`border rounded-2xl p-5 ${group.color}`}>
                <p className="font-bold text-xs uppercase tracking-wider mb-4">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map(t => (
                    <span key={t} className="bg-white border border-current/15 text-current text-[0.65rem] font-mono px-2.5 py-1.5 rounded-lg hover:shadow-sm transition-shadow">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — RESULTS ═══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Business Impact</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">What Better Email Systems<br />Can Improve</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label}
                className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
                <div className="font-extrabold text-3xl mb-1">{s.value}</div>
                <div className="font-bold text-sm mb-1">{s.label}</div>
                <div className="text-white/60 text-[0.65rem] font-mono">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — CASE STUDIES ══════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-3">Real Systems</p>
            <h2 className="font-extrabold text-4xl text-slate-900 mb-3">Email Systems Built for<br />Real Business Growth</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CASE_STUDIES.map(cs => (
              <div key={cs.brand} className={`border rounded-2xl p-6 hover:shadow-md transition-all ${cs.color}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-white border border-current/20 text-current text-[0.62rem] font-bold px-2.5 py-0.5 rounded-full">{cs.tag}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-3">{cs.brand}</h3>
                <div className="space-y-2.5 text-sm">
                  <div>
                    <p className="font-semibold text-slate-600 text-[0.65rem] uppercase tracking-wider mb-0.5">Challenge</p>
                    <p className="text-slate-600 text-xs">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-600 text-[0.65rem] uppercase tracking-wider mb-0.5">System Built</p>
                    <p className="text-slate-600 text-xs">{cs.system}</p>
                  </div>
                  <div className="bg-white/80 border border-current/20 rounded-xl p-3">
                    <p className="font-bold text-slate-700 text-xs">{cs.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — WHY SCALIFYLABS ════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-50/50 to-cyan-50/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-center">
            {/* Founder card */}
            <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-saffron/20">A</div>
                <div>
                  <p className="font-bold text-slate-800 text-base">Arvind Gupta</p>
                  <p className="text-saffron font-mono text-xs">Founder, Scalify Labs</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                &ldquo;Email marketing done right is a business growth engine — not a newsletter. We build infrastructure, automation, and systems that work 24/7 to convert leads and retain customers.&rdquo;
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[{ v: '15+', l: 'Years Exp' }, { v: '100+', l: 'Businesses' }, { v: '10K+', l: 'Emails/Day' }].map(s => (
                  <div key={s.l} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
                    <div className="font-extrabold text-blue-600 text-base">{s.v}</div>
                    <div className="text-slate-400 text-[0.58rem] font-mono">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why points */}
            <div>
              <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-4">Our Differentiators</p>
              <h2 className="font-extrabold text-3xl text-slate-900 mb-6">Why Businesses Work<br />With Scalify Labs</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, title: 'Business-Focused Systems', desc: 'Every email system is built around revenue and lead generation — not just metrics.' },
                  { icon: Database, title: 'CRM + Automation Expertise', desc: 'Email connected to CRM, WhatsApp, and sales pipeline for unified customer journeys.' },
                  { icon: BrainCircuit, title: 'AI-Assisted Workflows', desc: 'AI personalization, subject line optimization, and behavioral trigger systems.' },
                  { icon: Layers, title: 'Modern Infrastructure', desc: 'SMTP setup, domain warmup, deliverability — built to actually land in inboxes.' },
                  { icon: GitBranch, title: 'Funnel-First Execution', desc: 'We design email systems around the customer journey — not isolated campaigns.' },
                  { icon: BarChart3, title: 'Real Campaign Understanding', desc: '15+ years of actual campaign experience across B2B, B2C, and outreach contexts.' },
                ].map(card => (
                  <div key={card.title} className="bg-white border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-sm transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <card.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-xs mb-1">{card.title}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 10 — FINAL CTA ══════════════════════════════════════════ */}
      <section id="cta" className="relative py-24 bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,101,0,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(59,130,246,0.06),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_520px] gap-14 items-start">
            <div>
              <p className="font-mono text-xs text-blue-600 uppercase tracking-widest mb-4">Free Strategy Call</p>
              <h2 className="font-extrabold text-4xl text-slate-900 leading-tight mb-5">
                Ready to Build Smarter<br />
                <span className="bg-gradient-to-r from-saffron to-orange-500 bg-clip-text text-transparent">Email Growth Systems?</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-7 max-w-[420px]">
                Let&apos;s design email systems that improve follow-ups, automate communication, and help your business scale consistently.
              </p>
              <div className="space-y-2.5 mb-8">
                {['SMTP + infrastructure setup for reliable sending','AI-powered personalization and automation','CRM + WhatsApp + email connected workflows','Full deliverability audit and optimization'].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-slate-600 text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/918788424727?text=Hi%2C%20I%27d%20like%20to%20discuss%20email%20marketing%20systems%20for%20my%20business`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/30 text-green-700 font-semibold px-5 py-3 rounded-xl hover:bg-[#25D366]/22 transition-all text-sm">
                <MessageSquare className="w-4 h-4" /> Talk on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xl">Get Free Email Strategy Call</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6">Tell us about your email goals and current challenges.</p>
              <EmailStrategyForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── ICON FIX ─────────────────────────────────────────────────────────────────
function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}
