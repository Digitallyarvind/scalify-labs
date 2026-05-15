'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp, Crosshair, Layers, Mail,
  Search, Star, Database, MessageCircle,
  Smartphone, BrainCircuit, PhoneCall, Monitor,
  Palette, Video, LayoutGrid, Users,
  GraduationCap, HeartPulse, Building2, Sofa, ShoppingBag,
  ChevronDown, X, Menu, ArrowRight, Zap, Rocket,
  Target, BarChart3, Globe, Repeat2,
} from 'lucide-react'

// ─── MEGA MENU DATA ───────────────────────────────────────────────────────────
const SERVICES_COLS = [
  {
    label: 'Advertising',
    accent: '#2563EB',
    items: [
      { icon: TrendingUp, name: 'Google Ads',          sub: 'Search, Display & Shopping',          href: '/services/google-ads-services' },
      { icon: Crosshair,  name: 'Meta Ads',             sub: 'Facebook & Instagram campaigns',       href: '/services/meta-ads' },
      { icon: Layers,     name: 'Specialized Platform Ads', sub: 'LinkedIn, Quora, Truecaller & more', href: '/services/specialized-ads' },
      { icon: Mail,       name: 'Email Marketing',      sub: 'Bulk outreach, SMTP & nurturing',      href: '/services/email-marketing' },
    ],
  },
  {
    label: 'Organic Growth',
    accent: '#16A34A',
    items: [
      { icon: Monitor,    name: 'Website Development',  sub: 'Growth websites & lead systems',       href: '/services/website-development' },
      { icon: Search,     name: 'SEO',                  sub: 'Rank page 1 & grow organic traffic',   href: '/services/affordable-seo-services' },
      { icon: Star,       name: 'Local SEO & GMB',      sub: 'Dominate Google Maps in your city',    href: '/services/gmb' },
      { icon: Database,   name: 'Lead Management',      sub: 'CRM setup, automation & pipelines',    href: '/services/lead-management' },
    ],
  },
  {
    label: 'Communication & Automation',
    accent: '#7C3AED',
    items: [
      { icon: MessageCircle, name: 'WhatsApp Automation',  sub: '98% open-rate nurture sequences',      href: '/services/whatsapp-marketing-agency' },
      { icon: Smartphone,    name: 'RCS Messaging',         sub: 'Rich media messages at scale',          href: '/services/rcs-messaging' },
      { icon: PhoneCall,     name: 'OBD Voice Calls',       sub: 'Bulk voice campaigns & flows',          href: '/services/obd' },
      { icon: BrainCircuit,  name: 'AI Calling & Agents',   sub: 'AI voice agents for automated calls',   href: '/services/ai-calling' },
    ],
  },
  {
    label: 'Creative',
    accent: '#EA580C',
    items: [
      { icon: Palette,    name: 'Ad Creatives',          sub: 'Scroll-stopping visuals',              href: '#' },
      { icon: Video,      name: 'Video Editing',         sub: 'Reels, brand films & ad videos',       href: '#' },
      { icon: LayoutGrid, name: 'Social Media Marketing',sub: 'Content, ads & lead gen',              href: '/social-media-marketing' },
      { icon: Users,      name: 'Influencer Marketing',  sub: 'Local & regional creators',            href: '#' },
    ],
  },
]

const L2R_ITEMS = [
  { label: 'Lead Management',         href: '/services/lead-management' },
  { label: 'CRM Automation',          href: '/services/lead-management' },
  { label: 'WhatsApp Systems',        href: '/services/whatsapp-marketing-agency' },
  { label: 'Email Marketing',         href: '/services/email-marketing' },
  { label: 'AI Calling',              href: '/services/ai-calling' },
  { label: 'Lead Nurturing',          href: '/services/lead-to-revenue' },
  { label: 'Funnels & Landing Pages', href: '/services/website-development' },
  { label: 'Analytics & Tracking',    href: '/services/affordable-seo-services' },
  { label: 'Website + CRM Integration', href: '/services/lead-management' },
]

const GROWTH_SOLUTIONS = [
  { icon: GraduationCap, label: 'Education Solutions',     sub: 'Schools, coaching & EdTech',     href: '/digital-marketing-agencies-for-education-sector', color: 'text-blue-600 bg-blue-50' },
  { icon: HeartPulse,    label: 'Healthcare Solutions',    sub: 'Clinics, doctors & wellness',     href: '/digital-marketing-for-healthcare',                 color: 'text-red-600 bg-red-50' },
  { icon: Building2,     label: 'Real Estate Solutions',   sub: 'Builders, brokers & developers',  href: '/digital-marketing-services-for-real-estate',       color: 'text-amber-600 bg-amber-50' },
  { icon: Sofa,          label: 'Home Furnishing Solutions',sub: 'Furniture & interior brands',    href: '#',                                                 color: 'text-orange-600 bg-orange-50' },
  { icon: ShoppingBag,   label: 'Local Business Solutions', sub: 'Retail, F&B & service brands',   href: '#',                                                 color: 'text-purple-600 bg-purple-50' },
]

const TICKERS = [
  {
    icon: '🚀', tag: 'Community',
    text: 'Join Jharkhand Growth Adda™ — Local Connections. Digital Growth. Free community for Jharkhand business owners.',
    cta: 'Join Free', href: '/jharkhand-growth-adda',
  },
  {
    icon: '🔥', tag: 'Applications Open',
    text: 'Super 30 Growth Accelerator — 45-Day Execution-Based Program · SEO + Ads + AI + CRM + Growth Systems',
    cta: 'Apply Now', href: '/super-30',
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tickerIdx, setTickerIdx]   = useState(0)
  const [tickerBar, setTickerBar]   = useState(true)
  const [active, setActive]         = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (pathname?.startsWith('/admin')) return null

  // Ticker rotation
  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKERS.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Scroll detect
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setMobileSection(null) }, [pathname])

  function openMenu(name: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActive(name)
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActive(null), 120)
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')
  const tick = TICKERS[tickerIdx]

  return (
    <>
      {/* ── TICKER BAR ────────────────────────────────────────────────────── */}
      {tickerBar && (
        <div className="relative flex items-center justify-center px-4 text-sm font-medium"
          style={{ background: '#0B0F1E', minHeight: 42 }}>
          <div className="flex items-center gap-3 text-center">
            <span className="text-base">{tick.icon}</span>
            <span className="inline-flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-bold px-2 py-0.5 rounded-full text-[#FF6500]"
                style={{ background: 'rgba(255,101,0,0.15)', border: '1px solid rgba(255,101,0,0.3)' }}>
                {tick.tag}
              </span>
              <span className="text-white/80 text-xs sm:text-sm line-clamp-1 max-w-[460px]">{tick.text}</span>
            </span>
            <Link href={tick.href}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B0F1E] hover:opacity-90 transition-opacity"
              style={{ background: '#FF6500' }}>
              {tick.cta} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <button onClick={() => setTickerBar(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
      <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-slate-100' : 'border-b border-slate-100/60'
      } bg-white`}>
        <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between" style={{ height: 76 }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 bg-[#FF6500] rounded-[10px] flex items-center justify-center shadow-[0_2px_12px_rgba(255,101,0,0.35)] group-hover:shadow-[0_4px_16px_rgba(255,101,0,0.45)] transition-shadow">
              <span className="text-white font-black text-base tracking-tighter">S</span>
            </div>
            <div className="leading-none">
              <div className="font-black text-[1.1rem] tracking-tight text-[#0B0F1E] leading-tight">
                Scalify<span className="text-[#FF6500]">Labs</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5 hidden sm:block">Scale Smarter. Grow Faster.</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <NavLink href="/" active={isActive('/') && pathname === '/'}>Home</NavLink>

            {/* Services */}
            <DropItem label="Services" active={active === 'services'} onOpen={() => openMenu('services')} onClose={scheduleClose}>
              <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[820px] bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden"
                onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45" />
                <div className="grid grid-cols-4 gap-0 divide-x divide-slate-100">
                  {SERVICES_COLS.map(col => (
                    <div key={col.label} className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1"
                        style={{ color: col.accent }}>{col.label}</p>
                      <div className="space-y-0.5">
                        {col.items.map(item => (
                          <Link key={item.name} href={item.href}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover/item:scale-110"
                              style={{ background: col.accent + '12' }}>
                              <item.icon className="w-3.5 h-3.5" style={{ color: col.accent }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[0.8rem] font-semibold text-[#0B0F1E] group-hover/item:text-[#FF6500] transition-colors leading-tight">{item.name}</p>
                              <p className="text-[0.7rem] text-slate-400 mt-0.5 leading-snug line-clamp-1">{item.sub}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-slate-50/50">
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[#FF6500]" />Transparent pricing & weekly reporting
                  </p>
                  <Link href="/contact-scalifylabs" className="flex items-center gap-1 text-xs font-semibold text-[#FF6500] hover:gap-2 transition-all">
                    View All Services <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </DropItem>

            <NavLink href="/services/lead-to-revenue" active={isActive('/services/lead-to-revenue')}>Lead to Revenue</NavLink>

            {/* Growth Solutions */}
            <DropItem label="Growth Solutions" active={active === 'solutions'} onOpen={() => openMenu('solutions')} onClose={scheduleClose}>
              <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[380px] bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden"
                onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45" />
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-400 mb-3">How We Help Different Businesses Grow</p>
                  <div className="space-y-1">
                    {GROWTH_SOLUTIONS.map(s => (
                      <Link key={s.label} href={s.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/sol">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/sol:scale-110 ${s.color}`}>
                          <s.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                        </div>
                        <div>
                          <p className="text-[0.82rem] font-semibold text-[#0B0F1E] group-hover/sol:text-[#FF6500] transition-colors">{s.label}</p>
                          <p className="text-[0.72rem] text-slate-400">{s.sub}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-200 ml-auto group-hover/sol:text-[#FF6500] group-hover/sol:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <Link href="/digital-marketing-agencies-for-education-sector"
                      className="flex items-center justify-center gap-1 text-xs font-semibold text-[#FF6500] hover:gap-2 transition-all">
                      Explore All Growth Solutions <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </DropItem>

            <NavLink href="/super-30" active={isActive('/super-30')}>Super 30</NavLink>
            <NavLink href="/why-scalify" active={isActive('/why-scalify')}>Why Us</NavLink>
            <NavLink href="/blog" active={isActive('/blog')}>Insights</NavLink>
            <NavLink href="/contact-scalifylabs" active={isActive('/contact-scalifylabs')}>Contact</NavLink>
          </div>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link href="/contact-scalifylabs"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-[#E05800] transition-colors shadow-[0_2px_12px_rgba(255,101,0,0.3)]"
              style={{ background: '#FF6500' }}>
              Book Growth Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors">
            {mobileOpen ? <X className="w-5 h-5 text-[#0B0F1E]" /> : <Menu className="w-5 h-5 text-[#0B0F1E]" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white overflow-y-auto" style={{ maxHeight: '85vh' }}>
            <div className="p-4 space-y-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/contact-scalifylabs', label: 'Contact' },
                { href: '/why-scalify', label: 'Why Us' },
                { href: '/blog', label: 'Insights' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="flex items-center px-4 py-3 rounded-xl text-[0.9rem] font-semibold text-[#0B0F1E] hover:bg-slate-50 transition-colors">
                  {link.label}
                </Link>
              ))}

              {/* Services accordion */}
              {[
                { key: 'services', label: 'Services', items: SERVICES_COLS.flatMap(c => c.items.map(i => ({ label: i.name, href: i.href }))) },
                { key: 'l2r', label: 'Lead to Revenue', items: L2R_ITEMS.map(i => ({ label: i.label, href: i.href })) },
                { key: 'solutions', label: 'Growth Solutions', items: GROWTH_SOLUTIONS.map(s => ({ label: s.label, href: s.href })) },
              ].map(section => (
                <div key={section.key}>
                  <button onClick={() => setMobileSection(mobileSection === section.key ? null : section.key)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[0.9rem] font-semibold text-[#0B0F1E] hover:bg-slate-50 transition-colors">
                    {section.label}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileSection === section.key ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSection === section.key && (
                    <div className="px-4 pb-2 pt-1 space-y-0.5">
                      {section.items.map(item => (
                        <Link key={item.label} href={item.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0B0F1E] transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link href="/super-30" className="flex items-center px-4 py-3 rounded-xl text-[0.9rem] font-semibold text-[#0B0F1E] hover:bg-slate-50 transition-colors">Super 30</Link>

              <div className="pt-3 flex flex-col gap-2">
                <Link href="/contact-scalifylabs"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm"
                  style={{ background: '#FF6500' }}>
                  Book Growth Call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-100 bg-white/95 backdrop-blur-md shadow-lg">
        <a href="tel:+918788424727" className="flex-1 flex flex-col items-center py-2.5 text-slate-500 hover:text-[#FF6500] transition-colors gap-0.5">
          <PhoneCall className="w-4 h-4" /><span className="text-[9px] font-semibold">Call</span>
        </a>
        <a href="https://wa.me/918788424727" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center py-2.5 text-slate-500 hover:text-green-600 transition-colors gap-0.5">
          <MessageCircle className="w-4 h-4" /><span className="text-[9px] font-semibold">WhatsApp</span>
        </a>
        <Link href="/super-30"
          className="flex-1 flex flex-col items-center py-2.5 text-white gap-0.5"
          style={{ background: '#FF6500' }}>
          <Rocket className="w-4 h-4" /><span className="text-[9px] font-bold">Super 30</span>
        </Link>
      </div>
    </>
  )
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`relative px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
      active ? 'text-[#0B0F1E] bg-slate-50' : 'text-slate-500 hover:text-[#0B0F1E] hover:bg-slate-50'
    }`}>
      {children}
      {active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF6500] rounded-full" />}
    </Link>
  )
}

function DropItem({ label, active, onOpen, onClose, children }: {
  label: string; active: boolean; onOpen: () => void; onClose: () => void; children: React.ReactNode
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className={`flex items-center gap-1 px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
        active ? 'text-[#0B0F1E] bg-slate-50' : 'text-slate-500 hover:text-[#0B0F1E] hover:bg-slate-50'
      }`}>
        {label}
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${active ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-200 origin-top ${active ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-[0.97] pointer-events-none -translate-y-1'}`}>
        {children}
      </div>
    </div>
  )
}
