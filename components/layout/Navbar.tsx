'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp, Crosshair, Layers, Mail,
  Search, Star, Database,
  MessageCircle, Smartphone, BrainCircuit, PhoneCall, Monitor,
  Palette, Video, LayoutGrid, Users,
  GraduationCap, HeartPulse, Building2, Sofa, ShoppingBag,
  ChevronDown, X, Menu, ArrowRight, Zap, Rocket,
} from 'lucide-react'

// ─── MEGA MENU DATA ──────────────────────────────────────────────────────────

const SERVICES = [
  {
    group: 'Advertising',
    accent: { label: 'bg-blue-50 text-blue-700', icon: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500' },
    items: [
      { icon: TrendingUp, name: 'Google Ads', desc: 'Search, Display & Shopping campaigns', href: '/services/google-ads-services' },
      { icon: Crosshair, name: 'Meta Ads', desc: 'Facebook & Instagram performance ads', href: '/services/meta-ads' },
      { icon: Layers, name: 'Specialized Platforms', desc: 'LinkedIn, Quora, Truecaller & native ads', href: '/services/specialized-ads' },
      { icon: Mail, name: 'Email Marketing', desc: 'Bulk outreach, SMTP & nurturing systems', href: '/services/email-marketing' },
    ],
  },
  {
    group: 'Organic Growth',
    accent: { label: 'bg-emerald-50 text-emerald-700', icon: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-500' },
    items: [
      { icon: Monitor, name: 'Website Development', desc: 'Growth websites with leads & automation', href: '/services/website-development' },
      { icon: Search, name: 'SEO', desc: 'Rank page 1 and grow organic traffic', href: '/services/affordable-seo-services' },
      { icon: Star, name: 'Local SEO & GMB', desc: 'Dominate Google Maps in your city', href: '/services/gmb' },
      { icon: Database, name: 'Lead Management', desc: 'CRM setup, automation & pipeline control', href: '/services/lead-management' },
    ],
  },
  {
    group: 'Communication',
    accent: { label: 'bg-violet-50 text-violet-700', icon: 'bg-violet-100 text-violet-600', dot: 'bg-violet-500' },
    items: [
      { icon: MessageCircle, name: 'WhatsApp Automation', desc: '98% open-rate nurture sequences', href: '/services/whatsapp-marketing-agency' },
      { icon: Smartphone, name: 'RCS Messaging', desc: 'Rich media messages at scale', href: '/services/rcs-messaging' },
      { icon: PhoneCall, name: 'OBD Voice Calls', desc: 'Bulk voice campaigns with multi-channel flows', href: '/services/obd' },

      { icon: BrainCircuit, name: 'AI Calling & Agents', desc: 'AI voice agents for automated customer calls', href: '/services/ai-calling' },
    ],
  },
  {
    group: 'Creative Services',
    accent: { label: 'bg-orange-50 text-orange-700', icon: 'bg-orange-100 text-orange-600', dot: 'bg-orange-500' },
    items: [
      { icon: Palette, name: 'Ad Creatives', desc: 'Scroll-stopping visuals for every platform', href: '#' },
      { icon: Video, name: 'Video Editing', desc: 'Reels, brand films & ad videos', href: '#' },
      { icon: LayoutGrid, name: 'Social Media Content', desc: 'Consistent content calendar execution', href: '#' },
      { icon: Users, name: 'Influencer Marketing', desc: 'Local & regional creator partnerships', href: '#' },
    ],
  },
]

const INDUSTRIES = [
  { icon: GraduationCap, name: 'Education', desc: 'Coaching institutes, schools & EdTech', href: '#', accent: 'bg-blue-50 text-blue-600' },
  { icon: HeartPulse, name: 'Doctors & Clinics', desc: 'Healthcare & wellness providers', href: '#', accent: 'bg-red-50 text-red-600' },
  { icon: Building2, name: 'Real Estate', desc: 'Builders, brokers & property developers', href: '#', accent: 'bg-emerald-50 text-emerald-600' },
  { icon: Sofa, name: 'Home Furnishing', desc: 'Furniture, interior & décor brands', href: '#', accent: 'bg-amber-50 text-amber-600' },
  { icon: ShoppingBag, name: 'Local Businesses', desc: 'Retail, restaurants & service providers', href: '#', accent: 'bg-purple-50 text-purple-600' },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<'services' | 'industries' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<'services' | 'industries' | null>(null)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hide on admin pages
  if (pathname.startsWith('/admin')) return null

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileSection(null)
  }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function openMenu(name: 'services' | 'industries') {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(name)
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* ── Announcement Bar ────────────────────────────────────────────── */}
      {announcementVisible && (
        <div className="relative bg-navy text-white text-center text-xs sm:text-sm py-2.5 px-4 flex items-center justify-center gap-3">
          <Rocket className="w-3.5 h-3.5 text-saffron shrink-0" />
          <span>
            <span className="font-semibold text-white">Applications Open</span>
            {' '}for{' '}
            <Link
              href="/super-30"
              className="font-bold text-saffron underline underline-offset-2 hover:text-orange-300 transition-colors"
            >
              Super 30 Growth Program
            </Link>
            {' '}— Only 30 seats per batch
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Main Navbar ─────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(11,15,30,0.08)] border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[64px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 bg-saffron rounded-[9px] flex items-center justify-center shadow-[0_2px_8px_rgba(255,101,0,0.35)] group-hover:shadow-[0_4px_12px_rgba(255,101,0,0.45)] transition-shadow">
                <span className="text-white font-extrabold text-sm tracking-tighter">S</span>
              </div>
              <span className="font-extrabold text-[1.05rem] tracking-tight text-navy leading-none">
                Scalify<span className="text-saffron">Labs</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">

              {/* Home */}
              <Link
                href="/"
                className={`relative px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/') && pathname === '/'
                    ? 'text-navy bg-slate-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                Home
                {pathname === '/' && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-saffron rounded-full" />
                )}
              </Link>

              {/* Services */}
              <div
                className="relative"
                onMouseEnter={() => openMenu('services')}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1 px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                    activeMenu === 'services' ? 'text-navy bg-slate-50' : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${activeMenu === 'services' ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Services Mega Menu */}
                <div
                  className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[780px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(11,15,30,0.12)] border border-slate-100 p-5 transition-all duration-200 origin-top ${
                    activeMenu === 'services'
                      ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                      : 'opacity-0 scale-[0.97] pointer-events-none -translate-y-1'
                  }`}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  {/* Arrow */}
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45" />

                  <div className="grid grid-cols-4 gap-4">
                    {SERVICES.map((group) => (
                      <div key={group.group}>
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[0.7rem] font-bold uppercase tracking-wider mb-3 ${group.accent.label}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${group.accent.dot}`} />
                          {group.group}
                        </div>
                        <div className="space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover/item:scale-110 ${group.accent.icon}`}>
                                <item.icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[0.82rem] font-semibold text-navy leading-tight group-hover/item:text-saffron transition-colors">{item.name}</p>
                                <p className="text-[0.72rem] text-slate-500 leading-snug mt-0.5 line-clamp-1">{item.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-saffron" />
                      All services include transparent pricing &amp; weekly reports
                    </p>
                    <Link
                      href="/contact-scalifylabs"
                      className="flex items-center gap-1 text-xs font-semibold text-saffron hover:gap-2 transition-all"
                    >
                      View all services <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Lead to Revenue — Featured */}
              <Link
                href="/services/lead-to-revenue"
                className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/services/lead-to-revenue')
                    ? 'text-saffron bg-saffron/8'
                    : 'text-slate-600 hover:text-saffron hover:bg-saffron/5'
                }`}
              >
                Lead to Revenue
                <span className="bg-saffron text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
              </Link>

              {/* Industries */}
              <div
                className="relative"
                onMouseEnter={() => openMenu('industries')}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1 px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                    activeMenu === 'industries' ? 'text-navy bg-slate-50' : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Industries
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${activeMenu === 'industries' ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Industries Mega Menu */}
                <div
                  className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(11,15,30,0.12)] border border-slate-100 p-4 transition-all duration-200 origin-top ${
                    activeMenu === 'industries'
                      ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                      : 'opacity-0 scale-[0.97] pointer-events-none -translate-y-1'
                  }`}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45" />
                  <p className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">We serve</p>
                  <div className="space-y-0.5">
                    {INDUSTRIES.map((ind) => (
                      <Link
                        key={ind.name}
                        href={ind.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/ind"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/ind:scale-110 ${ind.accent}`}>
                          <ind.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                        </div>
                        <div>
                          <p className="text-[0.83rem] font-semibold text-navy group-hover/ind:text-saffron transition-colors">{ind.name}</p>
                          <p className="text-[0.72rem] text-slate-500 leading-tight">{ind.desc}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover/ind:text-saffron group-hover/ind:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Super 30 */}
              <Link
                href="/super-30"
                className={`px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/super-30')
                    ? 'text-navy bg-slate-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                Super 30
              </Link>

              {/* Why Scalify Labs */}
              <Link
                href="/why-scalify"
                className={`px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/why-scalify')
                    ? 'text-navy bg-slate-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                Why Us
              </Link>

              {/* Insights (Blog) */}
              <Link
                href="/blog"
                className={`px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/blog')
                    ? 'text-navy bg-slate-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                Insights
              </Link>

              {/* Contact */}
              <Link
                href="/contact-scalifylabs"
                className={`px-3.5 py-2 text-[0.845rem] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/contact')
                    ? 'text-navy bg-slate-50'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* ── Right CTAs ── */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/admin"
                className="px-4 py-2 text-[0.83rem] font-semibold text-navy border border-slate-200 rounded-full hover:border-navy hover:bg-slate-50 transition-all duration-150"
              >
                Super 30 Login
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-navy hover:bg-slate-50 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ─────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-navy/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[min(340px,95vw)] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-saffron rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">S</span>
            </div>
            <span className="font-extrabold text-[0.95rem] text-navy tracking-tight">
              Scalify<span className="text-saffron">Labs</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <X className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.9rem] font-semibold text-navy hover:bg-slate-50 transition-colors">
              Home
            </Link>

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.9rem] font-semibold text-navy hover:bg-slate-50 transition-colors"
              >
                Services
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileSection === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSection === 'services' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-2 pb-2 space-y-4 pt-2">
                  {SERVICES.map((group) => (
                    <div key={group.group}>
                      <p className={`text-[0.68rem] font-bold uppercase tracking-wider px-2 mb-1.5 ${group.accent.label.split(' ')[1]}`}>
                        {group.group}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[0.83rem] font-medium text-slate-700 hover:bg-slate-50 hover:text-navy transition-colors"
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${group.accent.icon}`}>
                            <item.icon className="w-3 h-3" />
                          </div>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead to Revenue — Featured Mobile */}
            <Link
              href="/services/lead-to-revenue"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.9rem] font-semibold text-saffron bg-saffron/5 border border-saffron/15 hover:bg-saffron/10 transition-colors"
            >
              <span>Lead to Revenue</span>
              <span className="bg-saffron text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
            </Link>

            {/* Industries accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === 'industries' ? null : 'industries')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.9rem] font-semibold text-navy hover:bg-slate-50 transition-colors"
              >
                Industries
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileSection === 'industries' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSection === 'industries' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-2 pb-2 pt-1 space-y-0.5">
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.name}
                      href={ind.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[0.83rem] font-medium text-slate-700 hover:bg-slate-50 hover:text-navy transition-colors"
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${ind.accent}`}>
                        <ind.icon className="w-3 h-3" />
                      </div>
                      {ind.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {[
              { href: '/super-30', label: 'Super 30' },
              { href: '/why-scalify', label: 'Why Us' },
              { href: '/blog', label: 'Insights' },
              { href: '/contact-scalifylabs', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-xl text-[0.9rem] font-semibold text-navy hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer footer CTAs */}
        <div className="shrink-0 px-4 py-4 border-t border-slate-100 space-y-2.5">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 text-[0.9rem] font-semibold text-navy border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Super 30 Login
          </Link>
        </div>
      </div>
    </>
  )
}
