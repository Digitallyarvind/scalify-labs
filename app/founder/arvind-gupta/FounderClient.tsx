'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, ChevronDown, ChevronRight, ExternalLink,
  MessageCircle, Linkedin, Mail, Globe,
  TrendingUp, Search, Database, BarChart3, Users, Zap, Brain,
  Check, Star,
} from 'lucide-react'

const WA = 'https://wa.me/918788424727?text=' + encodeURIComponent('Hi Arvind, I want to discuss growth systems for my business.')
const LI = 'https://www.linkedin.com/in/digitallyarvind'

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EXPERTISE = [
  {
    icon: TrendingUp, title: 'Performance Marketing', color: '#2563EB',
    items: ['Google Ads', 'Meta Ads', 'Lead Funnels', 'Campaign Optimisation'],
  },
  {
    icon: Search, title: 'SEO & Organic Growth', color: '#16A34A',
    items: ['Technical SEO', 'Content Systems', 'AI SEO', 'Local SEO'],
  },
  {
    icon: Database, title: 'CRM & Automation', color: '#FF6500',
    items: ['Kylas CRM', 'TeleCRM', 'WhatsApp Automation', 'Workflow Design'],
  },
  {
    icon: BarChart3, title: 'Analytics & Tracking', color: '#7C3AED',
    items: ['GA4', 'Google Search Console', 'Conversion Tracking', 'Dashboards'],
  },
  {
    icon: Users, title: 'Community Building', color: '#D97706',
    items: ['Growth Communities', 'Mentoring Ecosystems', 'Digital Programs', 'Cohort Management'],
  },
  {
    icon: Brain, title: 'Education Marketing', color: '#0891B2',
    items: ['Admissions Funnels', 'Student Acquisition', 'Lead Nurturing', 'CPL Optimisation'],
  },
]

const TIMELINE = [
  {
    period: '2007–2010', org: 'ICICI Bank', role: 'Assistant Manager',
    tags: ['Operations', 'Customer Management'],
    desc: 'Started career in banking, building strong foundations in operations, customer management and process excellence.',
    color: '#2563EB',
  },
  {
    period: '2010–2013', org: 'IMS Proschool', role: 'Center Manager',
    tags: ['Growth', 'Operations', 'Education'],
    desc: 'Managed center operations and growth for one of India\'s leading test prep and professional education brands.',
    color: '#7C3AED',
  },
  {
    period: '2013–2014', org: 'Imarticus Learning', role: 'AVP Sales & Marketing',
    tags: ['Marketing Systems', 'Student Acquisition'],
    desc: 'Led marketing and sales strategy for a premium fintech education brand. Built early digital acquisition systems.',
    color: '#D97706',
  },
  {
    period: '2014–2025', org: 'Dheya Career Mentors', role: 'Digital Growth & Product',
    tags: ['Digital Growth', 'Product', 'Community', 'Ecosystems'],
    desc: 'Contributed to building one of India\'s largest mentor ecosystems. Led digital growth, product strategy, community building and scalable learning systems. 5000+ mentors supported.',
    color: '#16A34A',
  },
  {
    period: '2025', org: 'KK Modi University', role: 'Head of Marketing',
    tags: ['Admissions Funnels', 'Performance Marketing', 'CRM'],
    desc: 'Led performance marketing and CRM for admissions. Cut CPL from ₹400 to ₹95. Delivered batch-filling campaigns.',
    color: '#FF6500',
  },
  {
    period: '2025 – Present', org: 'ScalifyLabs', role: 'Founder',
    tags: ['Growth Systems', 'CRM', 'SEO', 'AI Workflows'],
    desc: 'Founded ScalifyLabs to help businesses build connected growth systems — SEO, ads, CRM, WhatsApp automation, websites and AI workflows.',
    color: '#FF6500',
    isCurrent: true,
  },
]

const CERTS = [
  { label: 'Google Analytics 4', icon: '📊', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { label: 'Six Sigma Green Belt', icon: '🎯', color: 'bg-green-50 text-green-700 border-green-100' },
  { label: 'Six Sigma Black Belt', icon: '⚫', color: 'bg-slate-50 text-slate-700 border-slate-100' },
  { label: 'Financial Modeling', icon: '💹', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { label: 'Growth Marketing', icon: '🚀', color: 'bg-orange-50 text-orange-700 border-orange-100' },
]

const FAQS = [
  { q: 'Who is Arvind Gupta?', a: 'Arvind Gupta is the founder of ScalifyLabs, a growth systems company based in Ranchi, Jharkhand. He has 17+ years of experience across banking, education, performance marketing, CRM automation, SEO, and community building.' },
  { q: 'What industries has he worked with?', a: 'Banking (ICICI Bank), education (IMS Proschool, Imarticus Learning), career services (Dheya Career Mentors), higher education (KK Modi University), healthcare, real estate, retail, and local businesses.' },
  { q: 'Does he provide consulting?', a: 'Yes. Through ScalifyLabs, Arvind provides growth system consulting — SEO strategy, CRM setup, performance marketing, WhatsApp automation, and connected growth infrastructure for businesses.' },
  { q: 'What is ScalifyLabs?', a: 'ScalifyLabs is a growth systems company based in Ranchi, Jharkhand, building connected growth infrastructure: SEO, ads, CRM, WhatsApp automation, websites and AI workflows for businesses across India.' },
  { q: 'What are his main expertise areas?', a: 'Performance marketing (Google Ads, Meta Ads), SEO and organic growth, CRM and automation, community building, education marketing, analytics (GA4, GSC), AI workflows, and growth system design.' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function FounderClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <main className="overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif', color: '#1A1410' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-12 pb-20 lg:pt-18 lg:pb-28 px-4"
        style={{ background: 'linear-gradient(160deg, #ffffff 55%, #FFF9F5 100%)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 border"
                style={{ background: 'rgba(255,101,0,0.06)', borderColor: 'rgba(255,101,0,0.2)', color: '#FF6500' }}>
                17+ Years Experience
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Growth Systems','AI SEO','Performance Marketing','Automation'].map(tag => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: '#F8FAFC', color: '#57534E', border: '1px solid #E8E3DA' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-black leading-[1.1] tracking-tight mb-4 text-[34px] sm:text-[46px] lg:text-[52px]"
                style={{ color: '#0B0F1E' }}>
                Helping Businesses Build{' '}
                <span style={{ color: '#FF6500' }}>Predictable Growth Systems</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-[520px]" style={{ color: '#57534E' }}>
                From education and healthcare to local businesses — building connected systems across SEO, Ads, CRM, automation and customer journeys.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
                <a href={LI} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ background: '#0A66C2' }}>
                  <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                </a>
                <Link href="/contact-scalifylabs"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ background: '#FF6500' }}>
                  Book Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border-2 hover:bg-slate-50 transition-colors"
                  style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
                  <Globe className="w-4 h-4" /> Explore ScalifyLabs
                </Link>
              </div>
              {/* Social row */}
              <div className="flex items-center gap-4">
                {[
                  { href: LI, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
                  { href: 'mailto:hello@scalifylabs.com', icon: <Mail className="w-4 h-4" />, label: 'Email' },
                  { href: '/', icon: <Globe className="w-4 h-4" />, label: 'Website' },
                ].map(s => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#FF6500] transition-colors">
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — founder photo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[340px]">
                {/* Decorative bg */}
                <div className="absolute inset-0 rounded-3xl translate-x-3 translate-y-3"
                  style={{ background: 'rgba(255,101,0,0.08)', borderRadius: 24 }} />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image src="/founder.jpg" alt="Arvind Gupta — Founder, ScalifyLabs"
                    width={340} height={420} priority
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '4/5' }}
                    onError={() => {}} />
                  {/* Fallback if no image */}
                </div>
                {/* Floating chips */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Founder</p>
                  <p className="text-base font-black" style={{ color: '#FF6500' }}>ScalifyLabs</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2.5 shadow-lg border border-slate-100">
                  <p className="text-[9px] text-slate-400">Experience</p>
                  <p className="text-lg font-black" style={{ color: '#0B0F1E' }}>17+ <span className="text-sm">Yrs</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SNAPSHOT CARDS ────────────────────────────────────────────────── */}
      <section className="py-12 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid sm:grid-cols-3 gap-5">
            {/* Experience */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
              <p className="text-4xl font-black mb-1" style={{ color: '#FF6500', fontFamily: 'Syne, sans-serif' }}>17+</p>
              <p className="font-bold text-[#0B0F1E] mb-2">Years Experience</p>
              <p className="text-xs text-slate-400 leading-relaxed">Across banking, education, digital growth and business systems</p>
            </div>
            {/* Industries */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="font-bold text-[#0B0F1E] mb-3">Industries Worked In</p>
              <div className="flex flex-wrap gap-1.5">
                {['Education','Healthcare','Real Estate','Career Services','Local Businesses','SMEs','Banking'].map(ind => (
                  <span key={ind} className="text-[11px] px-2.5 py-1 rounded-full border font-medium"
                    style={{ borderColor: '#E8E3DA', color: '#57534E', background: '#F8FAFC' }}>
                    {ind}
                  </span>
                ))}
              </div>
            </div>
            {/* Communities */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="font-bold text-[#0B0F1E] mb-3">Communities & Impact</p>
              <div className="space-y-2">
                {[
                  { val: '5,000+', label: 'Mentor ecosystem supported' },
                  { val: '300+',   label: 'Webinars conducted' },
                  { val: '10,000+',label: 'Students reached' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-sm font-black" style={{ color: '#FF6500', minWidth: 56 }}>{s.val}</span>
                    <span className="text-xs text-slate-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-4">Background</p>
          <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2] mb-7" style={{ color: '#0B0F1E' }}>
            From Banking → Education → Growth Systems
          </h2>
          <div className="space-y-4 text-base leading-[1.8]" style={{ color: '#57534E' }}>
            <p>Arvind Gupta has spent over 17 years working across banking, education, admissions, marketing and digital transformation.</p>
            <p>His journey moved from operational roles at ICICI Bank into scaling education ecosystems at IMS Proschool and Imarticus Learning, before building and leading digital growth for one of India's largest career mentor communities at Dheya Career Mentors.</p>
            <p>His most recent corporate role as Head of Marketing at KK Modi University involved building complete admissions funnels, cutting cost per lead from ₹400 to ₹95, and implementing CRM and performance marketing infrastructure.</p>
            <p className="font-semibold text-[#0B0F1E]">Today, through ScalifyLabs, he focuses on building connected growth systems for businesses — combining SEO, performance marketing, CRM, WhatsApp automation, AI workflows and community building.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {['SEO','Performance Marketing','CRM','WhatsApp Automation','AI Workflows','Lead Nurturing','Community Building'].map(skill => (
              <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium"
                style={{ background: 'rgba(255,101,0,0.04)', borderColor: 'rgba(255,101,0,0.2)', color: '#57534E' }}>
                <Check className="w-3.5 h-3.5" style={{ color: '#FF6500' }} /> {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER TIMELINE ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Career Journey</p>
          <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2] mb-12" style={{ color: '#0B0F1E' }}>
            17 Years of Growth Systems Experience
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[20px] top-5 bottom-5 w-0.5 hidden sm:block" style={{ background: '#E8E3DA' }} />
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative shrink-0 hidden sm:block" style={{ paddingTop: 3 }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm z-10 relative"
                      style={{ background: item.isCurrent ? item.color : item.color + '15', border: `2px solid ${item.color}40` }}>
                      {item.isCurrent
                        ? <span className="text-white text-[10px] font-black">NOW</span>
                        : <span className="text-[10px] font-black" style={{ color: item.color }}>{i + 1}</span>
                      }
                    </div>
                  </div>
                  {/* Card */}
                  <div className={`flex-1 bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow ${item.isCurrent ? 'border-[rgba(255,101,0,0.3)]' : 'border-slate-100'}`}>
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black text-lg" style={{ color: '#0B0F1E' }}>{item.org}</p>
                          {item.isCurrent && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#FF6500' }}>CURRENT</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: '#FF6500' }}>{item.role}</p>
                      </div>
                      <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full shrink-0"
                        style={{ background: item.color + '10', color: item.color, border: `1px solid ${item.color}20` }}>
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#57534E' }}>{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                          style={{ borderColor: '#E8E3DA', color: '#9C9189', background: '#FAFAF8' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE EXPERTISE ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">Expertise</p>
            <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Core Expertise Areas
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERTISE.map((exp, i) => (
              <div key={i} className="bg-[#FAFAF8] rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: exp.color + '12' }}>
                  <exp.icon className="w-5 h-5" style={{ color: exp.color }} />
                </div>
                <h3 className="font-bold text-base mb-3" style={{ color: '#0B0F1E' }}>{exp.title}</h3>
                <div className="space-y-1.5">
                  {exp.items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                      <span className="text-sm" style={{ color: '#57534E' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────────────────────── */}
      <section className="py-12 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-5 text-center">Certifications</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTS.map(c => (
              <div key={c.label} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${c.color}`}>
                <span className="text-base">{c.icon}</span> {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-4">Current Mission</p>
          <h2 className="font-black text-[28px] sm:text-[36px] leading-[1.2] mb-8" style={{ color: '#0B0F1E' }}>
            What Drives the Work
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-[#FFF9F5] rounded-2xl p-6 border" style={{ borderColor: 'rgba(255,101,0,0.2)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl font-black text-white"
                style={{ background: '#FF6500' }}>1</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#0B0F1E' }}>Help 10,000 Learners</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>
                Help 10,000 learners become digitally employable through practical, execution-based growth skills via Super 30 and community programs.
              </p>
              <Link href="/super-30" className="inline-flex items-center gap-1 mt-4 text-xs font-bold hover:gap-2 transition-all" style={{ color: '#FF6500' }}>
                Super 30 Program <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="bg-[#F0FDF4] rounded-2xl p-6 border border-green-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl font-black text-white bg-green-600">2</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#0B0F1E' }}>Support 1,000 Businesses</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>
                Support 1,000 businesses with scalable, connected growth systems — combining SEO, ads, CRM, automation and AI into one compounding engine.
              </p>
              <Link href="/" className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-green-700 hover:gap-2 transition-all">
                Explore ScalifyLabs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LINKEDIN CONNECT ──────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: '#0A66C2' }}>
              <Linkedin className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-black text-2xl mb-2" style={{ color: '#0B0F1E' }}>Connect With Arvind</h2>
            <p className="text-slate-500 text-sm mb-6">
              Follow for insights on growth systems, SEO, CRM automation and digital marketing for businesses.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={LI} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: '#0A66C2' }}>
                <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
              <a href="mailto:hello@scalifylabs.com"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 hover:bg-slate-50 transition-colors"
                style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
                <Mail className="w-4 h-4" /> Send Email
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-mono">linkedin.com/in/digitallyarvind</p>
          </div>
        </div>
      </section>

      {/* ── BOOK SESSION ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #FFF9F5 0%, #FFF3E8 50%, #FFF9F5 100%)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-5">Work Together</p>
          <h2 className="font-black text-[28px] sm:text-[40px] leading-[1.2] mb-5" style={{ color: '#0B0F1E' }}>
            Need Help With Growth Systems, Funnels or Digital Execution?
          </h2>
          <p className="text-base text-slate-500 mb-9 leading-relaxed">
            Book a free strategy call to discuss your business growth challenges and explore connected system solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-scalifylabs"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: '#FF6500' }}>
              Book Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 hover:bg-white transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              <MessageCircle className="w-5 h-5 text-green-600" /> WhatsApp
            </a>
            <Link href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 hover:bg-white transition-colors"
              style={{ color: '#0B0F1E', borderColor: '#E8E3DA' }}>
              <Globe className="w-5 h-5" /> Explore ScalifyLabs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-4" style={{ background: '#FAFAF8' }}>
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6500] mb-3">FAQs</p>
            <h2 className="font-black text-[26px] sm:text-[34px] leading-[1.2]" style={{ color: '#0B0F1E' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
                  style={{ minHeight: 56 }}>
                  <span className="font-semibold pr-4" style={{ color: '#0B0F1E' }}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180' : ''}`}
                    style={{ color: '#FF6500' }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 pt-3 text-sm leading-relaxed border-t border-slate-100" style={{ color: '#57534E' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
