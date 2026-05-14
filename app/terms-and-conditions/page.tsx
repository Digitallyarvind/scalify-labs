import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/data'
import { FileText, Mail, Phone, MapPin, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Scalify Labs',
  description:
    'Read the Terms & Conditions of Scalify Labs. Learn about services, payments, refunds, liabilities, and usage policies for our digital marketing solutions.',
  keywords: [
    'Scalify Labs terms and conditions',
    'digital marketing terms India',
    'training program terms Ranchi',
    'refund and liability policy',
  ],
  alternates: { canonical: `${SITE.url}/terms-and-conditions` },
  openGraph: {
    title: 'Terms & Conditions | Scalify Labs',
    description:
      'Read the Terms & Conditions of Scalify Labs. Learn about services, payments, refunds, liabilities, and usage policies for our digital marketing solutions.',
    url: `${SITE.url}/terms-and-conditions`,
    type: 'website',
    siteName: SITE.name,
  },
}

const SECTIONS = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    content: [
      "By accessing or using Scalify Labs' website (scalifylabs.com), services, or training programs, you agree to comply with these Terms & Conditions.",
      'If you do not agree, please do not use our website or services.',
    ],
  },
  {
    num: '02',
    title: 'Services Provided',
    content: [
      'Scalify Labs provides digital marketing services, training programs, and consultancy solutions.',
      'Specific inclusions and exclusions are mentioned on service pages or agreements.',
    ],
  },
  {
    num: '03',
    title: 'User Responsibilities',
    content: [
      'Provide accurate and complete information during registration or engagement.',
      'Maintain confidentiality of your account details.',
      'Do not misuse, copy, or resell any training or consultation material.',
    ],
  },
  {
    num: '04',
    title: 'Payments & Fees',
    content: [
      'All payments must be made in full (or as per agreed instalment plan) before services commence.',
      'Prices are exclusive of applicable taxes unless otherwise mentioned.',
    ],
  },
  {
    num: '05',
    title: 'Cancellations & Refunds',
    content: [
      'Refunds are governed by our Refund Policy.',
      'Please review it before enrolling or purchasing services.',
    ],
  },
  {
    num: '06',
    title: 'Intellectual Property',
    content: [
      'All training content, graphics, logos, and campaign materials remain the intellectual property of Scalify Labs unless explicitly transferred in writing.',
    ],
  },
  {
    num: '07',
    title: 'Limitation of Liability',
    content: [
      'Scalify Labs is not responsible for direct, indirect, or consequential losses from the use of our services, training, or website.',
      'Results may vary based on individual effort and external factors.',
    ],
  },
  {
    num: '08',
    title: 'Third-Party Services',
    content: [
      'Some services (e.g., WhatsApp API, Google Ads, hosting) require third-party platforms.',
      'Scalify Labs is not responsible for downtime, errors, or charges related to third-party providers.',
    ],
  },
  {
    num: '09',
    title: 'Governing Law',
    content: [
      'These Terms are governed by the laws of India.',
      'Any disputes will be subject to the jurisdiction of courts in Ranchi, Jharkhand.',
    ],
  },
  {
    num: '10',
    title: 'Changes to Terms',
    content: [
      'Scalify Labs reserves the right to update or modify these Terms & Conditions at any time.',
      'Updates will be published on this page with the revised date.',
    ],
  },
]

export default function TermsAndConditionsPage() {
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
            <span className="text-white/60">Terms & Conditions</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-saffron/10 border border-saffron/20 rounded-2xl flex items-center justify-center shrink-0 mt-1">
              <FileText className="w-7 h-7 text-saffron" />
            </div>
            <div>
              <p className="text-saffron text-xs font-bold uppercase tracking-widest mb-2">Legal</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Terms &amp; Conditions</h1>
              <p className="text-white/50 text-sm mt-2">Last Updated: May 2026</p>
            </div>
          </div>

          <p className="mt-7 text-white/70 text-base leading-relaxed max-w-2xl">
            By accessing or using Scalify Labs&apos; website, services, or training programs, you agree to be bound by these Terms &amp; Conditions. Please read them carefully before proceeding.
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
              11. Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── TERMS SECTIONS ──────────────────────────────────────────────── */}
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

            {/* Section 11 — Contact */}
            <div id="contact" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center text-[11px] font-black text-white shrink-0">
                  11
                </span>
                <h2 className="text-xl font-bold text-navy">Contact Us</h2>
              </div>
              <div className="pl-12">
                <p className="text-slate-600 text-[0.95rem] leading-relaxed mb-5">
                  For any questions about these Terms &amp; Conditions, please reach out:
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
            By using our services, you acknowledge that you have read and agree to these Terms &amp; Conditions.
          </p>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/privacy-policy"
              className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-full hover:border-saffron hover:text-saffron transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact-scalifylabs"
              className="px-5 py-2.5 bg-navy text-white text-sm font-bold rounded-full hover:bg-navy/90 transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
