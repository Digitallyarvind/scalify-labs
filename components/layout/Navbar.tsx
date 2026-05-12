'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SERVICES } from '@/lib/data'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Don't show public navbar in admin
  if (pathname.startsWith('/admin')) return null

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]' : ''}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
              <span className="text-white font-extrabold text-[0.95rem] tracking-tight">
                Scalify<em className="not-italic text-saffron">Labs</em>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${pathname === '/' ? 'text-saffron' : 'text-white/70 hover:text-white hover:bg-white/7'}`}>
                Home
              </Link>

              {/* Services dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold px-3 py-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/7 transition-colors flex items-center gap-1">
                  Services
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-cream-300 rounded-xl p-2 w-60 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  {SERVICES.map(s => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-navy text-sm font-medium hover:bg-cream transition-colors"
                    >
                      <span className="text-base w-5 text-center">{s.icon}</span>
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/super-30" className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${pathname === '/super-30' ? 'text-saffron' : 'text-white/70 hover:text-white hover:bg-white/7'}`}>
                Super 30
              </Link>
              <Link href="/blog" className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${pathname.startsWith('/blog') ? 'text-saffron' : 'text-white/70 hover:text-white hover:bg-white/7'}`}>
                Blog
              </Link>

              {/* Cities dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold px-3 py-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/7 transition-colors flex items-center gap-1">
                  Cities
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 bg-white border border-cream-300 rounded-xl p-2 w-44 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  {['ranchi','jamshedpur','dhanbad','bokaro','patna','lucknow','bhopal','raipur','jaipur'].map(city => (
                    <Link
                      key={city}
                      href={`/cities/${city}`}
                      className="block px-3 py-2 rounded-lg text-navy text-sm font-medium hover:bg-cream capitalize transition-colors"
                    >
                      {city.charAt(0).toUpperCase() + city.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/contact" className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${pathname === '/contact' ? 'text-saffron' : 'text-white/70 hover:text-white hover:bg-white/7'}`}>
                Contact
              </Link>
              <Link href="/contact" className="ml-2 bg-saffron text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-saffron-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(255,101,0,0.3)]">
                Free Call
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-navy overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center text-white font-extrabold text-sm">S</div>
              <span className="text-white font-extrabold">ScalifyLabs</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="text-white text-2xl p-1">✕</button>
          </div>
          <div className="p-6 flex flex-col gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/super-30', label: '🎓 Super 30' },
              { href: '/blog', label: '📝 Blog' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-white/80 font-semibold text-base py-3 border-b border-white/7 hover:text-saffron transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="mt-3 mb-1">
              <div className="font-mono text-[0.67rem] text-white/40 uppercase tracking-wider mb-3">Services</div>
              {SERVICES.map(s => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-2 text-white/70 text-sm py-2.5 border-b border-white/5 hover:text-saffron transition-colors">
                  <span>{s.icon}</span> {s.title}
                </Link>
              ))}
            </div>
            <Link href="/contact" className="mt-4 bg-saffron text-white font-bold text-base px-5 py-3 rounded-xl text-center hover:bg-saffron-dark transition-colors">
              Book Free Strategy Call →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
