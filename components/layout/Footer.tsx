import Link from 'next/link'
import { SITE } from '@/lib/data'
import { ArrowRight, MapPin } from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Services in 4 columns (mirrors header)
const SERVICES_COLS = [
  {
    label: 'Advertising',
    items: [
      { label: 'Google Ads',               href: '/services/google-ads-services' },
      { label: 'Meta Ads',                 href: '/services/meta-ads' },
      { label: 'Specialized Platform Ads', href: '/services/specialized-ads' },
      { label: 'Email Marketing',          href: '/services/email-marketing' },
    ],
  },
  {
    label: 'Organic Growth',
    items: [
      { label: 'Website Development',  href: '/services/website-development' },
      { label: 'SEO Services',         href: '/services/affordable-seo-services' },
      { label: 'Local SEO & GMB',      href: '/services/gmb' },
      { label: 'Lead Management',      href: '/services/lead-management' },
      { label: 'Lead to Revenue',      href: '/services/lead-to-revenue' },
    ],
  },
  {
    label: 'Communication & Automation',
    items: [
      { label: 'WhatsApp Automation',  href: '/services/whatsapp-marketing-agency' },
      { label: 'RCS Messaging',        href: '/services/rcs-messaging' },
      { label: 'OBD Voice Calls',      href: '/services/obd' },
      { label: 'AI Calling & Agents',  href: '/services/ai-calling' },
    ],
  },
  {
    label: 'Creative',
    items: [
      { label: 'Social Media Marketing', href: '/social-media-marketing' },
      { label: 'Ad Creatives',           href: '#' },
      { label: 'Video Editing',          href: '#' },
      { label: 'Influencer Marketing',   href: '#' },
    ],
  },
]

const SOLUTIONS = [
  { label: 'Education Solutions',       href: '/digital-marketing-agencies-for-education-sector' },
  { label: 'Healthcare Solutions',      href: '/digital-marketing-for-healthcare' },
  { label: 'Real Estate Solutions',     href: '/digital-marketing-services-for-real-estate' },
  { label: 'Home Furnishing Solutions', href: '#' },
  { label: 'Local Business Solutions',  href: '#' },
]

// Programs + Community combined
const PROGRAMS_COMMUNITY = [
  { label: 'Super 30 Program',          href: '/super-30' },
  { label: 'Jharkhand Growth Adda™',    href: '/jharkhand-growth-adda' },
  { label: 'Join Community Free',       href: '/jharkhand-growth-adda' },
  { label: 'Careers at Scalify Labs',   href: '/careers' },
]

const COMPANY = [
  { label: 'Why Scalify Labs', href: '/why-scalify' },
  { label: 'Growth Insights',  href: '/blog' },
  { label: 'Contact Us',       href: '/contact-scalifylabs' },
]

const SOCIAL = [
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/company/scalifylabs/',
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Instagram', href: 'https://www.instagram.com/scalifylabs/',
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    label: 'YouTube', href: 'https://www.youtube.com/@scalifylabs',
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>,
  },
  {
    label: 'Facebook', href: 'https://www.facebook.com/scalifylabs/',
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: 'WhatsApp', href: 'https://wa.me/918788424727',
    svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  },
]

const SEO_SERVICES = [
  { label: 'Digital Marketing in Ranchi',      href: '/cities/ranchi' },
  { label: 'Digital Marketing in Jamshedpur',  href: '/cities/jamshedpur' },
  { label: 'Digital Marketing in Dhanbad',     href: '/cities/dhanbad' },
  { label: 'Digital Marketing in Bokaro',      href: '/cities/bokaro' },
  { label: 'SEO Services Ranchi',              href: '/services/affordable-seo-services' },
  { label: 'Google Ads Agency Ranchi',         href: '/services/google-ads-services' },
  { label: 'Email Marketing Ranchi',           href: '/services/email-marketing' },
  { label: 'Website Development Ranchi',       href: '/services/website-development' },
  { label: 'Lead Generation Ranchi',           href: '/services/lead-to-revenue' },
  { label: 'AI Automation Ranchi',             href: '/services/ai-calling' },
]

const SEO_COURSES = [
  { label: 'Digital Marketing Course Ranchi',     href: '/super-30' },
  { label: 'Digital Marketing Course Jamshedpur', href: '/super-30' },
  { label: 'Performance Marketing Course Ranchi', href: '/super-30' },
  { label: 'SEO Course Ranchi',                   href: '/super-30' },
  { label: 'Google Ads Training Ranchi',          href: '/super-30' },
  { label: 'AI Marketing Course Ranchi',          href: '/super-30' },
  { label: 'CRM Automation Training Ranchi',      href: '/super-30' },
  { label: 'Digital Skills Training Ranchi',      href: '/super-30' },
]

const year = new Date().getFullYear()

export function Footer() {
  return (
    <>
      {/* ── COMMUNITY CTA BANNER ──────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6500 0%, #FF8C00 50%, #FFA500 100%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 bg-white/20 text-white">
              🌱 Free Community
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-3">
              Join Jharkhand Growth Adda™
            </h2>
            <p className="text-xl font-semibold text-white/80 mb-3">Local Connections. Digital Growth.</p>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-[500px]">
              A free community helping Jharkhand business owners connect, learn and grow digitally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/jharkhand-growth-adda"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-white text-[#FF6500] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Join Community Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/jharkhand-growth-adda"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border-2 border-white/50 text-white hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
            <p className="text-sm text-white/60 mt-4">Free for early members</p>
          </div>
        </div>
      </section>

      {/* ── MAIN FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ background: '#F8FAFC' }} className="border-t border-slate-200">

        <div className="max-w-[1400px] mx-auto px-6 pt-14 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_180px] gap-10">

            {/* Column 1 — About */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#FF6500] rounded-[9px] flex items-center justify-center">
                  <span className="text-white font-black text-sm">S</span>
                </div>
                <span className="font-black text-[1.05rem] text-[#0B0F1E]">Scalify<span className="text-[#FF6500]">Labs</span></span>
              </Link>
              <p className="text-xs font-semibold text-[#FF6500] mb-3">Scale Smarter. Grow Faster.</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Growth systems for businesses — SEO, Ads, CRM, Automation, AI & Lead Generation.
              </p>
              <div className="space-y-1.5 text-sm text-slate-500 mb-5">
                <p><a href="tel:+918788424727" className="hover:text-[#FF6500] transition-colors">+91 8788424727</a></p>
                <p><a href="mailto:hello@scalifylabs.com" className="hover:text-[#FF6500] transition-colors">hello@scalifylabs.com</a></p>
                <p className="text-xs leading-relaxed">Lane No 5, Kamlesh Dubey Chowk, Pirra, Ratu, Ranchi 835222</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF6500] border border-slate-200 hover:border-[#FF6500] transition-all">
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Services (4 sub-columns) */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Services</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {SERVICES_COLS.map(col => (
                  <div key={col.label}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6500] mb-2.5">{col.label}</p>
                    <ul className="space-y-1.5">
                      {col.items.map(item => (
                        <li key={item.label}>
                          <Link href={item.href} className="text-xs text-slate-500 hover:text-[#FF6500] transition-colors leading-snug block">{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Solutions row below */}
              <div className="mt-7 pt-5 border-t border-slate-200">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Growth Solutions</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {SOLUTIONS.map(s => (
                    <Link key={s.label} href={s.href} className="text-xs text-slate-500 hover:text-[#FF6500] transition-colors">{s.label}</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3 — Programs / Community / Company */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Programs & Community</p>
              <ul className="space-y-2">
                {PROGRAMS_COMMUNITY.map(s => (
                  <li key={s.label}>
                    <Link href={s.href} className="text-sm text-slate-500 hover:text-[#FF6500] transition-colors">{s.label}</Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Company</p>
                <ul className="space-y-2">
                  {COMPANY.map(s => (
                    <li key={s.label}>
                      <Link href={s.href} className="text-sm text-slate-500 hover:text-[#FF6500] transition-colors">{s.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Legal</p>
                <ul className="space-y-2">
                  {[
                    { label: 'Privacy Policy',    href: '/privacy-policy' },
                    { label: 'Terms & Conditions',href: '/terms-and-conditions' },
                    { label: 'Sitemap',           href: '/sitemap.xml' },
                  ].map(s => (
                    <li key={s.label}>
                      <Link href={s.href} className="text-sm text-slate-500 hover:text-[#FF6500] transition-colors">{s.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Resource Hub */}
        <div className="border-t border-slate-200 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-7">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Explore Growth Resources</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-2">Services by City</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {SEO_SERVICES.map(l => <Link key={l.label} href={l.href} className="text-[11px] text-slate-400 hover:text-[#FF6500] transition-colors">{l.label}</Link>)}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-2">Courses & Training</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {SEO_COURSES.map(l => <Link key={l.label} href={l.href} className="text-[11px] text-slate-400 hover:text-[#FF6500] transition-colors">{l.label}</Link>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200" style={{ background: '#F1F5F9' }}>
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <p>© {year} {SITE.name} · Helping businesses build connected growth systems.</p>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>Built in Jharkhand. Working with businesses across India.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile spacer for sticky nav bar */}
      <div className="h-14 lg:hidden" />
    </>
  )
}

export default Footer
