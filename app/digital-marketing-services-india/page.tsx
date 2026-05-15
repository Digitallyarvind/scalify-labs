import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/data'
import { MapPin, ArrowRight, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Digital Marketing Services Across India | ScalifyLabs — City-Wise Growth',
  description:
    'ScalifyLabs offers digital marketing services, SEO, Google Ads, CRM and growth systems across India. Find your city and explore local digital marketing solutions.',
  keywords: [
    'digital marketing services India', 'digital marketing agency by city',
    'SEO services India', 'Google Ads agency India', 'local digital marketing India',
    'digital marketing course India', 'growth systems India',
  ],
  alternates: { canonical: `${SITE.url}/digital-marketing-services-india` },
  openGraph: {
    title: 'Digital Marketing Services Across India | ScalifyLabs',
    description: 'Find digital marketing services, SEO, ads, CRM & training near you. Coverage across Jharkhand, Bihar, UP, MP, Chhattisgarh, Rajasthan & major metros.',
    url: `${SITE.url}/digital-marketing-services-india`, type: 'website', siteName: SITE.name,
  },
}

const STATES: {
  state: string
  code: string
  cities: { name: string; slug: string; hasPage: boolean }[]
}[] = [
  {
    state: 'Jharkhand', code: 'JH',
    cities: [
      { name: 'Ranchi',       slug: 'ranchi',       hasPage: true },
      { name: 'Jamshedpur',   slug: 'jamshedpur',   hasPage: true },
      { name: 'Dhanbad',      slug: 'dhanbad',      hasPage: true },
      { name: 'Bokaro',       slug: 'bokaro',       hasPage: true },
      { name: 'Hazaribagh',   slug: 'hazaribagh',   hasPage: true },
      { name: 'Deoghar',      slug: 'deoghar',      hasPage: true },
      { name: 'Dumka',        slug: 'dumka',        hasPage: false },
      { name: 'Giridih',      slug: 'giridih',      hasPage: false },
    ],
  },
  {
    state: 'Bihar', code: 'BR',
    cities: [
      { name: 'Patna',        slug: 'patna',        hasPage: true },
      { name: 'Gaya',         slug: 'gaya',         hasPage: true },
      { name: 'Muzaffarpur',  slug: 'muzaffarpur',  hasPage: true },
      { name: 'Bhagalpur',    slug: 'bhagalpur',    hasPage: true },
      { name: 'Darbhanga',    slug: 'darbhanga',    hasPage: false },
      { name: 'Purnia',       slug: 'purnia',       hasPage: false },
    ],
  },
  {
    state: 'Uttar Pradesh', code: 'UP',
    cities: [
      { name: 'Lucknow',      slug: 'lucknow',      hasPage: true },
      { name: 'Varanasi',     slug: 'varanasi',     hasPage: true },
      { name: 'Agra',         slug: 'agra',         hasPage: true },
      { name: 'Kanpur',       slug: 'kanpur',       hasPage: true },
      { name: 'Allahabad',    slug: 'allahabad',    hasPage: true },
      { name: 'Gorakhpur',    slug: 'gorakhpur',    hasPage: false },
      { name: 'Meerut',       slug: 'meerut',       hasPage: false },
      { name: 'Noida',        slug: 'noida',        hasPage: false },
    ],
  },
  {
    state: 'Madhya Pradesh', code: 'MP',
    cities: [
      { name: 'Bhopal',       slug: 'bhopal',       hasPage: true },
      { name: 'Indore',       slug: 'indore',       hasPage: true },
      { name: 'Jabalpur',     slug: 'jabalpur',     hasPage: true },
      { name: 'Gwalior',      slug: 'gwalior',      hasPage: false },
      { name: 'Ujjain',       slug: 'ujjain',       hasPage: false },
    ],
  },
  {
    state: 'Chhattisgarh', code: 'CG',
    cities: [
      { name: 'Raipur',       slug: 'raipur',       hasPage: true },
      { name: 'Bhilai',       slug: 'bhilai',       hasPage: false },
      { name: 'Bilaspur',     slug: 'bilaspur',     hasPage: false },
      { name: 'Durg',         slug: 'durg',         hasPage: false },
    ],
  },
  {
    state: 'Rajasthan', code: 'RJ',
    cities: [
      { name: 'Jaipur',       slug: 'jaipur',       hasPage: true },
      { name: 'Jodhpur',      slug: 'jodhpur',      hasPage: true },
      { name: 'Udaipur',      slug: 'udaipur',      hasPage: false },
      { name: 'Kota',         slug: 'kota',         hasPage: false },
      { name: 'Ajmer',        slug: 'ajmer',        hasPage: false },
    ],
  },
  {
    state: 'Delhi NCR', code: 'DL',
    cities: [
      { name: 'Delhi',        slug: 'delhi',        hasPage: true },
      { name: 'Gurugram',     slug: 'gurugram',     hasPage: false },
      { name: 'Faridabad',    slug: 'faridabad',    hasPage: false },
    ],
  },
  {
    state: 'Maharashtra', code: 'MH',
    cities: [
      { name: 'Mumbai',       slug: 'mumbai',       hasPage: true },
      { name: 'Pune',         slug: 'pune',         hasPage: true },
      { name: 'Nagpur',       slug: 'nagpur',       hasPage: false },
      { name: 'Nashik',       slug: 'nashik',       hasPage: false },
      { name: 'Aurangabad',   slug: 'aurangabad',   hasPage: false },
    ],
  },
  {
    state: 'Karnataka', code: 'KA',
    cities: [
      { name: 'Bangalore',    slug: 'bangalore',    hasPage: true },
      { name: 'Mysore',       slug: 'mysore',       hasPage: false },
      { name: 'Hubli',        slug: 'hubli',        hasPage: false },
    ],
  },
  {
    state: 'Telangana', code: 'TS',
    cities: [
      { name: 'Hyderabad',    slug: 'hyderabad',    hasPage: true },
      { name: 'Warangal',     slug: 'warangal',     hasPage: false },
    ],
  },
  {
    state: 'West Bengal', code: 'WB',
    cities: [
      { name: 'Kolkata',      slug: 'kolkata',      hasPage: false },
      { name: 'Durgapur',     slug: 'durgapur',     hasPage: false },
      { name: 'Siliguri',     slug: 'siliguri',     hasPage: false },
    ],
  },
  {
    state: 'Odisha', code: 'OD',
    cities: [
      { name: 'Bhubaneswar',  slug: 'bhubaneswar',  hasPage: false },
      { name: 'Cuttack',      slug: 'cuttack',      hasPage: false },
    ],
  },
]

const COURSE_CITIES = [
  'Ranchi','Jamshedpur','Dhanbad','Bokaro','Patna','Gaya','Lucknow','Bhopal','Indore','Raipur',
]

function CityLink({ city }: { city: { name: string; slug: string; hasPage: boolean } }) {
  if (city.hasPage) {
    return (
      <Link href={`/cities/${city.slug}`}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all hover:border-[#FF6500]/40 hover:bg-[rgba(255,101,0,0.04)] hover:text-[#FF6500] group"
        style={{ borderColor: '#E8E3DA', color: '#57534E' }}>
        <MapPin className="w-3.5 h-3.5 shrink-0 group-hover:text-[#FF6500] transition-colors" style={{ color: '#9C9189' }} />
        {city.name}
        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    )
  }
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border"
      style={{ borderColor: '#F0EDE8', color: '#9C9189', background: '#FAFAF8' }}>
      <MapPin className="w-3.5 h-3.5 shrink-0" />
      {city.name}
      <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400">Soon</span>
    </div>
  )
}

export default function LocationHubPage() {
  const totalCities = STATES.reduce((s, st) => s + st.cities.length, 0)
  const liveCities = STATES.reduce((s, st) => s + st.cities.filter(c => c.hasPage).length, 0)

  return (
    <main className="bg-[#FAFAF8] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100 py-14 px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF6500] uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" /> Service Coverage
          </div>
          <h1 className="font-black text-[32px] sm:text-[44px] leading-tight mb-4" style={{ color: '#0B0F1E', fontFamily: 'Syne, sans-serif' }}>
            Digital Marketing Services<br />
            <span style={{ color: '#FF6500' }}>Across India</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-6">
            ScalifyLabs delivers SEO, Google Ads, CRM, WhatsApp Automation and Growth Systems to businesses across India. Select your city to explore local solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold" style={{ color: '#0B0F1E' }}>
              <span style={{ color: '#FF6500' }}>{liveCities}</span> live city pages
            </div>
            <div className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold" style={{ color: '#0B0F1E' }}>
              <span style={{ color: '#FF6500' }}>{totalCities}</span> cities covered
            </div>
            <div className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold" style={{ color: '#0B0F1E' }}>
              <span style={{ color: '#FF6500' }}>{STATES.length}</span> states & UTs
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 py-12 space-y-12">

        {/* Services by City */}
        <div>
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C9189] mb-2">Browse by Location</p>
            <h2 className="font-black text-[26px] sm:text-[32px]" style={{ color: '#0B0F1E', fontFamily: 'Syne, sans-serif' }}>
              Digital Marketing Services by City
            </h2>
            <p className="text-slate-500 text-sm mt-2">Click your city to find tailored digital marketing solutions for local businesses.</p>
          </div>

          <div className="space-y-8">
            {STATES.map(state => (
              <div key={state.state} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-3" style={{ background: '#F8FAFC' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: '#0B0F1E' }}>
                    {state.code}
                  </div>
                  <h3 className="font-bold text-[#0B0F1E]">{state.state}</h3>
                  <span className="text-xs text-slate-400 font-mono">{state.cities.filter(c => c.hasPage).length}/{state.cities.length} live</span>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {state.cities.map(city => <CityLink key={city.slug} city={city} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses & Training by City */}
        <div>
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C9189] mb-2">Training Programs</p>
            <h2 className="font-black text-[26px] sm:text-[32px]" style={{ color: '#0B0F1E', fontFamily: 'Syne, sans-serif' }}>
              Digital Marketing Courses & Training
            </h2>
            <p className="text-slate-500 text-sm mt-2">Super 30 Career Accelerator — 45-day offline execution-based program in Ranchi, with future city expansions planned.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-3" style={{ background: '#FFF9F5' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#FF6500' }}>🎓</div>
              <h3 className="font-bold text-[#0B0F1E]">Course Availability</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#FF6500' }}>Offline · Ranchi</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
                {COURSE_CITIES.map((city, i) => (
                  <Link key={city} href="/super-30"
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all hover:border-[#FF6500]/40 hover:bg-[rgba(255,101,0,0.04)] group"
                    style={{ borderColor: i === 0 ? '#FF6500' : '#E8E3DA', background: i === 0 ? 'rgba(255,101,0,0.04)' : 'white' }}>
                    <span className="text-lg">{i === 0 ? '🟢' : '⚪'}</span>
                    <p className="text-xs font-bold" style={{ color: i === 0 ? '#FF6500' : '#57534E' }}>{city}</p>
                    <p className="text-[9px] font-semibold" style={{ color: i === 0 ? '#FF6500' : '#9C9189' }}>
                      {i === 0 ? 'Live' : 'Planned'}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Link href="/super-30"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity"
                  style={{ background: '#FF6500' }}>
                  Apply for Super 30 — Ranchi <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-slate-400">45 days · Only 30 seats · ₹10,000 launch price</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular services CTA grid */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C9189] mb-4">Popular Services</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'SEO Services',          href: '/services/affordable-seo-services',     icon: '🔍' },
              { label: 'Google Ads',             href: '/services/google-ads-services',         icon: '📊' },
              { label: 'Meta Ads',               href: '/services/meta-ads',                    icon: '📱' },
              { label: 'WhatsApp Automation',    href: '/services/whatsapp-marketing-agency',   icon: '💬' },
              { label: 'CRM & Lead Management',  href: '/services/lead-management',             icon: '🗂️' },
              { label: 'Website Development',    href: '/services/website-development',         icon: '🌐' },
            ].map(s => (
              <Link key={s.label} href={s.href}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#FF6500]/30 transition-all group">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-sm group-hover:text-[#FF6500] transition-colors" style={{ color: '#0B0F1E' }}>{s.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-[#FF6500] transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
          <p className="font-black text-2xl mb-2" style={{ color: '#0B0F1E' }}>Don't See Your City?</p>
          <p className="text-slate-500 mb-5">We work with businesses across India remotely. Book a free call to discuss your growth needs.</p>
          <Link href="/contact-scalifylabs"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: '#FF6500' }}>
            Book Free Growth Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
