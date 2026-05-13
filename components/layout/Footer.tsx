import Link from 'next/link'
import { SITE } from '@/lib/data'

const FOOTER_SERVICES = [
  { label: 'SEO Services', href: '/services/seo' },
  { label: 'Google Ads', href: '/services/google-ads' },
  { label: 'Meta Ads', href: '/services/meta-ads' },
  { label: 'WhatsApp Marketing', href: '/services/whatsapp-marketing' },
  { label: 'CRM Automation', href: '/services/lead-to-revenue' },
  { label: 'AI Calling & Agents', href: '/services/ai-calling' },
  { label: 'Local SEO & GMB', href: '/services/gmb' },
  { label: 'Lead to Revenue', href: '/services/lead-to-revenue' },
]

const FOOTER_COMPANY = [
  { label: 'Home', href: '/' },
  { label: 'Why Scalify Labs', href: '/why-scalify' },
  { label: 'Super 30 Program', href: '/super-30' },
  { label: 'Growth Insights', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const FOOTER_RESOURCES = [
  { label: 'Growth Insights', href: '/blog' },
  { label: 'Case Studies', href: '/blog' },
  { label: 'AI Marketing Guides', href: '/blog?category=AI+Tools' },
  { label: 'SEO Resources', href: '/blog?category=SEO' },
  { label: 'WhatsApp Playbooks', href: '/blog?category=WhatsApp+Marketing' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', emoji: '📘', href: 'https://www.facebook.com/scalifylabs' },
  { label: 'Instagram', emoji: '📷', href: 'https://www.instagram.com/scalifylabs' },
  { label: 'LinkedIn', emoji: '💼', href: 'https://www.linkedin.com/company/scalifylabs' },
  { label: 'YouTube', emoji: '▶️', href: 'https://www.youtube.com/@scalifylabs' },
  { label: 'WhatsApp', emoji: '💬', href: 'https://wa.me/91XXXXXXXXXX' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white/60">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand — 2 col span */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-saffron rounded-[10px] flex items-center justify-center text-white font-extrabold text-base shadow-[0_2px_10px_rgba(255,101,0,0.35)] shrink-0">S</div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                Scalify<span className="text-saffron">Labs</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[280px] mb-4">
              AI-powered growth infrastructure company helping Indian businesses build connected systems for scalable digital growth — from Ranchi, Jharkhand.
            </p>
            <p className="text-xs font-mono text-white/35 mb-5 italic">
              &quot;We don&apos;t just run ads. We build growth systems.&quot;
            </p>

            {/* Founder mini bio */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
                <div>
                  <p className="text-white font-bold text-xs">Arvind Gupta</p>
                  <p className="text-saffron font-mono text-[0.6rem]">Founder, Scalify Labs</p>
                </div>
              </div>
              <p className="text-white/40 text-[0.7rem] leading-relaxed">
                Focused on helping businesses build connected growth systems using automation, CRM, AI workflows, and multi-channel marketing.
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center text-sm hover:bg-saffron transition-colors"
                  aria-label={s.label}
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Services</div>
            <div className="flex flex-col gap-2.5">
              {FOOTER_SERVICES.map(s => (
                <Link key={s.label} href={s.href} className="text-sm hover:text-saffron transition-colors">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Company</div>
            <div className="flex flex-col gap-2.5">
              {FOOTER_COMPANY.map(s => (
                <Link key={s.label} href={s.href} className="text-sm hover:text-saffron transition-colors">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources + Contact */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Resources</div>
            <div className="flex flex-col gap-2.5 mb-6">
              {FOOTER_RESOURCES.map(s => (
                <Link key={s.label} href={s.href} className="text-sm hover:text-saffron transition-colors">
                  {s.label}
                </Link>
              ))}
            </div>

            <div className="text-white font-bold text-sm mb-3">Contact</div>
            <div className="flex flex-col gap-2.5">
              <a href={`tel:${SITE.phone}`} className="text-sm hover:text-saffron transition-colors">{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="text-sm hover:text-saffron transition-colors">{SITE.email}</a>
              <p className="text-sm">Ranchi, Jharkhand, India</p>
              <Link href="/contact" className="inline-flex items-center gap-1 text-saffron font-bold text-xs mt-1 hover:gap-2 transition-all">
                Book Free Strategy Call →
              </Link>
            </div>
          </div>
        </div>

        {/* Cities we serve */}
        <div className="border-t border-white/7 pt-6 mb-6">
          <p className="text-white/25 font-mono text-[0.6rem] uppercase tracking-widest mb-3">
            Digital Marketing Agency serving businesses in
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {[
              'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Patna',
              'Gaya', 'Lucknow', 'Varanasi', 'Raipur', 'Bhopal', 'Jaipur',
              'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad',
            ].map(city => (
              <span key={city} className="text-white/25 text-xs hover:text-white/45 transition-colors cursor-default">{city}</span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/7 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-white/35">
            © {year} {SITE.name}. All rights reserved. Built in Ranchi 🇮🇳
          </span>
          <div className="flex gap-5">
            <span className="hover:text-saffron cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-saffron cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-saffron cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
