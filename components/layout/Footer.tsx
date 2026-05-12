import Link from 'next/link'
import { SERVICES, CITIES, SITE } from '@/lib/data'
import { usePathname } from 'next/navigation'

// Server component — no 'use client' needed
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">S</div>
              <span className="text-white font-extrabold text-[0.95rem] tracking-tight">
                Scalify<em className="not-italic text-saffron">Labs</em>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[240px] mb-5">
              Ranchi's leading digital marketing agency. Helping Indian businesses grow with SEO, ads, WhatsApp, and AI systems.
            </p>
            <div className="flex gap-2">
              {['📘', '📷', '💼', '▶️', '💬'].map((icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-white/7 flex items-center justify-center text-sm cursor-pointer hover:bg-saffron transition-colors">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Services</div>
            <div className="flex flex-col gap-2.5">
              {SERVICES.map(s => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm hover:text-saffron transition-colors">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Company</div>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/super-30', label: 'Super 30' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact Us' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-sm hover:text-saffron transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Cities We Serve</div>
            <div className="flex flex-col gap-2.5">
              {CITIES.slice(0, 8).map(city => (
                <Link key={city.slug} href={`/cities/${city.slug}`} className="text-sm hover:text-saffron transition-colors">
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/7 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>© {year} {SITE.name}. All rights reserved. Made in Ranchi 🇮🇳</span>
          <div className="flex gap-5">
            <span className="hover:text-saffron cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-saffron cursor-pointer transition-colors">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
