import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/data'
import { Shield, Mail, Phone, MapPin, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Scalify Labs',
  description:
    "Read Scalify Labs' Privacy Policy. Learn how we collect, use, and protect your personal data across our digital marketing services and training programs.",
  keywords: [
    'privacy policy Scalify Labs',
    'data protection Ranchi',
    'digital marketing privacy India',
    'user data security',
  ],
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  openGraph: {
    title: 'Privacy Policy | Scalify Labs',
    description:
      "Read Scalify Labs' Privacy Policy. Learn how we collect, use, and protect your personal data across our digital marketing services and training programs.",
    url: `${SITE.url}/privacy-policy`,
    type: 'website',
    siteName: SITE.name,
  },
}

const SECTIONS = [
  {
    num: '01',
    title: 'Information We Collect',
    content: [
      'Personal details such as name, phone number, and email address when you sign up or contact us.',
      'Business details when you request a consultation or enroll in a service.',
      'Technical data such as IP address, device type, and browsing behavior using analytics tools.',
    ],
  },
  {
    num: '02',
    title: 'How We Use Your Information',
    content: [
      'Providing and improving our digital marketing services and training programs.',
      'Sending updates, reminders, or promotional information with your consent.',
      'Generating insights to improve website performance and user experience.',
      'Compliance with legal and regulatory requirements.',
    ],
  },
  {
    num: '03',
    title: 'Sharing of Data',
    content: [
      'We do not sell or rent your personal data to third parties.',
      'We may share your information with trusted partners (e.g., payment gateways, WhatsApp API providers, hosting services) only to deliver our services.',
      'In case of legal obligation, we may share information with regulatory authorities.',
    ],
  },
  {
    num: '04',
    title: 'Data Storage & Security',
    content: [
      'Your data is stored securely on cloud servers with encryption protocols.',
      'Access is limited to authorised Scalify Labs team members only.',
      'While we take strict precautions, no online transmission is 100% secure.',
    ],
  },
  {
    num: '05',
    title: 'Cookies & Tracking',
    content: [
      'Our website uses cookies to improve performance, track usage, and personalise your experience.',
      'You can disable cookies in your browser, though some features may not function properly.',
    ],
  },
  {
    num: '06',
    title: 'Your Rights',
    content: [
      'Request access to your personal data.',
      'Correct or update your information.',
      'Withdraw consent from receiving promotional messages.',
      'Request deletion of your data (subject to legal and contractual obligations).',
    ],
  },
  {
    num: '07',
    title: 'Third-Party Links',
    content: [
      'Our website may contain links to other sites. We are not responsible for the privacy practices or content of third-party websites.',
    ],
  },
  {
    num: '08',
    title: "Children's Privacy",
    content: [
      'Our services are intended for individuals 16 years and above.',
      'We do not knowingly collect personal data from children.',
    ],
  },
  {
    num: '09',
    title: 'Updates to This Policy',
    content: [
      'We may update this Privacy Policy from time to time.',
      'Any changes will be posted on this page with the updated date.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron rounded-full blur-[160px] opacity-[0.05]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[140px] opacity-[0.05]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">Privacy Policy</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-saffron/10 border border-saffron/20 rounded-2xl flex items-center justify-center shrink-0 mt-1">
              <Shield className="w-7 h-7 text-saffron" />
            </div>
            <div>
              <p className="text-saffron text-xs font-bold uppercase tracking-widest mb-2">Legal</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Privacy Policy</h1>
              <p className="text-white/50 text-sm mt-2">Last Updated: May 2026</p>
            </div>
          </div>

          <p className="mt-7 text-white/70 text-base leading-relaxed max-w-2xl">
            At Scalify Labs, your privacy is very important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website, services, or training programs.
          </p>
        </div>
      </section>

      {/* ─── TABLE OF CONTENTS ───────────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-slate-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sections</p>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map(s => (
              <a
                key={s.num}
                href={`#section-${s.num}`}
                className="text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-saffron hover:text-saffron px-3 py-1.5 rounded-full transition-colors"
              >
                {s.num}. {s.title}
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-saffron hover:text-saffron px-3 py-1.5 rounded-full transition-colors"
            >
              10. Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── POLICY SECTIONS ─────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">
            {SECTIONS.map(s => (
              <div key={s.num} id={`section-${s.num}`} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center text-[11px] font-black text-white shrink-0">
                    {s.num}
                  </span>
                  <h2 className="text-xl font-bold text-navy">{s.title}</h2>
                </div>
                <div className="pl-12 space-y-3">
                  {s.content.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-2 shrink-0" />
                      <p className="text-slate-600 text-[0.95rem] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Section 10 — Contact */}
            <div id="contact" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center text-[11px] font-black text-white shrink-0">
                  10
                </span>
                <h2 className="text-xl font-bold text-navy">Contact Us</h2>
              </div>
              <div className="pl-12">
                <p className="text-slate-600 text-[0.95rem] leading-relaxed mb-5">
                  For questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3.5 max-w-md">
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm text-slate-700 hover:text-saffron transition-colors group">
                    <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:border-saffron transition-colors">
                      <Mail className="w-4 h-4 text-saffron" />
                    </div>
                    {SITE.email}
                  </a>
                  <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 text-sm text-slate-700 hover:text-saffron transition-colors group">
                    <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:border-saffron transition-colors">
                      <Phone className="w-4 h-4 text-saffron" />
                    </div>
                    {SITE.phone}
                  </a>
                  <div className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-saffron" />
                    </div>
                    <span className="leading-relaxed">{SITE.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM NOTE ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-100 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            By using our website and services, you agree to this Privacy Policy.
          </p>
          <Link
            href="/contact-scalifylabs"
            className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-bold rounded-full hover:bg-navy/90 transition-colors whitespace-nowrap"
          >
            Have a question? Contact us
          </Link>
        </div>
      </section>

    </main>
  )
}
