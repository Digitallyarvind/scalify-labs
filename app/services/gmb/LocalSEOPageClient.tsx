'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import {
  CheckCircle, X, ChevronDown, ArrowRight, TrendingUp,
  Search, Star, MapPin, Phone, MessageCircle,
  BarChart3, Activity, Zap, Shield, RefreshCw,
  GraduationCap, HeartPulse, Building2, ShoppingBag, Store,
  Check, Sparkles, Rocket,
  PhoneCall, Mail, User, MapPin as MapPinIcon, Briefcase,
  Users, Clock, Layers, FileText, Globe,
  Navigation, Eye, ThumbsUp, TrendingDown,
} from 'lucide-react'

// ─── DATA ──────────────────────────────────────────────────────────────────────

const WHO_IT_SERVES = [
  { icon: HeartPulse, name: 'Clinics & Hospitals', desc: 'Help patients find you when searching "clinic near me"', color: 'bg-red-50 text-red-600 border-red-100' },
  { icon: Store, name: 'Restaurants & Cafes', desc: 'Attract nearby diners and tourists through Maps', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: GraduationCap, name: 'Coaching Institutes', desc: 'Rank for "coaching centre near me" searches', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: Building2, name: 'Real Estate Offices', desc: 'Capture property seekers searching your area', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: Sparkles, name: 'Salons & Spas', desc: 'Fill appointment books from local discovery', color: 'bg-pink-50 text-pink-600 border-pink-100' },
  { icon: Activity, name: 'Gyms & Fitness', desc: 'Show up when locals search for fitness centres', color: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: ShoppingBag, name: 'Furniture Stores', desc: 'Drive showroom visits from nearby searches', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Zap, name: 'Local Service Providers', desc: 'Plumbers, electricians, repair shops and more', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
]

const SERVICES = [
  { icon: Globe, name: 'GBP Optimization', desc: 'Complete Google Business Profile setup, categories, services, and attributes', color: 'bg-blue-100 text-blue-600' },
  { icon: MapPin, name: 'Google Maps Ranking', desc: 'Targeted optimization to appear in Google Maps local 3-pack', color: 'bg-red-100 text-red-600' },
  { icon: Layers, name: 'NAP Consistency', desc: 'Ensure Name, Address, Phone match exactly across all platforms', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Globe, name: 'Local Listings Management', desc: 'Presence on JustDial, Sulekha, Indiamart, and 40+ directories', color: 'bg-violet-100 text-violet-600' },
  { icon: Search, name: 'Category Optimization', desc: 'Right categories and service keywords to attract the right customers', color: 'bg-orange-100 text-orange-600' },
  { icon: Star, name: 'Review Management Guidance', desc: 'Strategy to grow authentic positive reviews and respond professionally', color: 'bg-amber-100 text-amber-600' },
  { icon: FileText, name: 'Weekly Google Posts', desc: 'Regular posts, offers, events, and updates to keep profile active', color: 'bg-cyan-100 text-cyan-600' },
  { icon: TrendingUp, name: 'Local Keyword Optimization', desc: 'Target "near me" and city-level keywords for maximum local reach', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Users, name: 'Competitor Analysis', desc: 'Understand what top-ranked local competitors are doing differently', color: 'bg-rose-100 text-rose-600' },
  { icon: BarChart3, name: 'Monthly Performance Reports', desc: 'Profile views, calls, clicks, and search impressions tracked monthly', color: 'bg-teal-100 text-teal-600' },
]

const WHY_MATTERS = [
  { icon: MapPin, title: 'More Nearby Discovery', desc: 'Appear when customers search "near me" on Google and Maps.' },
  { icon: TrendingUp, title: 'Higher Maps Visibility', desc: 'Rank in the Google Maps 3-pack where 80% of clicks go.' },
  { icon: Star, title: 'Better Local Trust', desc: 'Strong reviews and optimized profiles build customer confidence.' },
  { icon: PhoneCall, title: 'More Calls & Enquiries', desc: 'Direct phone calls from Google Maps results — the highest intent leads.' },
  { icon: Navigation, title: 'Increased Footfall', desc: 'Direction requests from Google Maps drive real walk-in customers.' },
  { icon: Phone, title: 'Better Mobile Visibility', desc: '76% of local searches happen on mobile. Optimized profiles win.' },
  { icon: Shield, title: 'Stronger Local Brand', desc: 'Consistent presence builds brand recognition in your local market.' },
  { icon: Users, title: 'Competitive Positioning', desc: 'Outrank competitors in local search before they outrank you.' },
]

const STEPS = [
  { icon: Search, num: '01', title: 'Business Profile Audit', desc: 'We assess your current Google Business Profile, listings accuracy, review score, and local ranking position.' },
  { icon: Globe, num: '02', title: 'Optimization & Listing Setup', desc: 'Complete GBP optimization, photo updates, service menu, attributes, and multi-platform listing setup.' },
  { icon: MapPin, num: '03', title: 'Local Search Optimization', desc: 'Category optimization, local keyword targeting, and Maps ranking improvement strategies applied.' },
  { icon: Star, num: '04', title: 'Reviews & Content Updates', desc: 'Weekly Google posts, review response management, and profile freshness maintained consistently.' },
  { icon: BarChart3, num: '05', title: 'Tracking & Reporting', desc: 'Monthly report on profile views, calls, direction requests, search queries, and ranking movement.' },
]

const FAQ_ITEMS = [
  { q: 'Do I need a website to start Local SEO?', a: 'No. Google Business Profile optimization works independently of having a website. Many local businesses — clinics, salons, restaurants, shops — rank highly on Google Maps without a website. We optimise your GBP profile, local listings, and Maps presence, which is often the most important channel for local customer discovery.' },
  { q: 'Can you improve my Google Maps rankings?', a: 'Yes. Through Google Business Profile optimization, NAP consistency, category and keyword alignment, review growth strategy, and regular profile activity, we systematically improve your position in Google Maps local results. Most clients see measurable improvement in 60–90 days.' },
  { q: 'How long does Local SEO take to show results?', a: 'Initial improvements in profile completeness and listing accuracy are immediate. Ranking improvements on Google Maps typically become visible in 4–8 weeks, with significant ranking movement in 3–6 months. Local SEO is an ongoing process — the longer you maintain it, the stronger your position becomes.' },
  { q: 'Do you manage Google reviews?', a: 'We provide review management guidance — strategies to generate authentic reviews, templates for responding to reviews (both positive and negative), and best practices for maintaining a high rating. We do not generate fake reviews; all strategies comply with Google\'s policies.' },
  { q: 'What is NAP consistency and why does it matter?', a: 'NAP stands for Name, Address, Phone number. Google uses the consistency of this information across the web (your GBP, JustDial, Sulekha, social media, directories) as a trust signal for local rankings. Inconsistencies confuse Google and customers, reducing your ranking potential. We audit and correct NAP across 40+ platforms.' },
  { q: 'Can Local SEO help generate more customer calls?', a: 'Yes. Google Maps results prominently display a "Call" button. Businesses ranking in the local 3-pack receive significantly more direct phone calls from high-intent local customers. Our clients typically see a 40–100% increase in calls from Google within 3 months of optimization.' },
  { q: 'Do you support multi-location businesses?', a: 'Yes. We manage Local SEO for businesses with multiple branches — each location gets its own Google Business Profile optimization, individual listing management, and location-specific ranking strategy. Custom pricing is available for 3+ location businesses.' },
  { q: 'Is Google Business Profile setup included?', a: 'Yes. If you don\'t have a Google Business Profile, we set it up, verify it, and fully optimize it as part of the service. If you already have one, we audit and optimize the existing profile. GBP setup, verification, and ongoing management are all included in the ₹9,999/month plan.' },
]

const WHY_CARDS = [
  { icon: MapPin, title: 'Local Business Growth Focus', desc: 'We specialise in helping SMBs, clinics, and service businesses get discovered by nearby customers.' },
  { icon: Globe, title: 'Google Maps Expertise', desc: 'Deep experience in ranking businesses in the Google Maps local 3-pack across Indian cities.' },
  { icon: Layers, title: 'Multi-Platform Listings', desc: '40+ directory listings managed — JustDial, Sulekha, IndiaMart, and more.' },
  { icon: TrendingUp, title: 'Local Visibility Systems', desc: 'Systematic monthly processes keep your profile active, fresh, and consistently ranking.' },
  { icon: BarChart3, title: 'Monthly Reporting', desc: 'Clear monthly reports showing calls, views, ranking movement, and profile actions.' },
  { icon: Users, title: 'Business-Focused Execution', desc: 'We focus on business outcomes — more calls, more footfall, more local customers — not just rankings.' },
]

// ─── STAR RATING ─────────────────────────────────────────────────────────────

function StarRating({ count = 5, filled = 5 }: { count?: number; filled?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      ))}
    </div>
  )
}

// ─── ENQUIRY MODAL ─────────────────────────────────────────────────────────────

function EnquiryModal({ onClose, title }: { onClose: () => void; title?: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', business: '', city: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setSubmitting(true); setError('')
    try {
      await submitLead({
        name: form.name.trim(), phone: form.phone.trim(),
        email: form.email || undefined, business: form.business || undefined,
        city: form.city || undefined, source: 'local-seo-page',
        service_interest: 'Local SEO & GMB',
        message: form.message || undefined,
      })
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="font-bold text-navy text-lg">{title ?? 'Book Local SEO Consultation'}</h3>
            <p className="text-slate-500 text-sm">We respond within 2 hours</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"><X className="w-4 h-4" /></button>
        </div>
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-600" /></div>
            <h4 className="text-xl font-bold text-navy mb-2">Consultation Booked!</h4>
            <p className="text-slate-600 text-sm mb-6">Our local SEO team will call you within 2 hours.</p>
            <button onClick={onClose} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your name" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone *</label>
                <div className="relative"><PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="WhatsApp no." /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="you@business.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Business Name</label>
                <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.business} onChange={e => set('business', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your business" /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                <div className="relative"><MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" /><input value={form.city} onChange={e => set('city', e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Ranchi" /></div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Business Type / Goal</label>
              <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="E.g. I run a dental clinic and want to rank higher on Google Maps…" />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>) : (<>Book Consultation <ArrowRight className="w-4 h-4" /></>)}
            </button>
            <p className="text-center text-[11px] text-slate-400">We respond within 2 hours · No spam ever</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function LocalSEOPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  function open(title?: string) { setModalTitle(title); setModalOpen(true) }

  return (
    <main>
      {modalOpen && <EnquiryModal onClose={() => setModalOpen(false)} title={modalTitle} />}

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                Local Visibility Growth Partner · India
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Rank Higher on{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Google Maps
                </span>{' '}
                &amp; Local Searches
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Improve your visibility in Google Maps, &ldquo;near me&rdquo; searches, and local business results with professional Google Business Profile optimization and local SEO systems.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-800">
                  <Globe className="w-3.5 h-3.5" />
                  Perfect for businesses with or without websites
                </div>
              </div>

              {/* Pricing highlight */}
              <div className="inline-flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl text-white shadow-lg shadow-emerald-200">
                <MapPin className="w-6 h-6 shrink-0 opacity-80" />
                <div>
                  <p className="text-[11px] opacity-80 uppercase tracking-wider font-semibold">Local Visibility Package</p>
                  <p className="text-2xl font-black">₹9,999<span className="text-sm font-semibold opacity-80">/month</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => open()} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-full shadow-lg shadow-emerald-200 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Book Local SEO Consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => open('Improve My Maps Ranking')} className="flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-colors">
                  Improve My Maps Ranking
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Google Business Profile Optimization', 'Local Listing Management', 'NAP Consistency', 'Review Optimization', 'Local Keyword Visibility', 'Monthly Performance Reporting'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Google Maps UI Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-blue-400 rounded-3xl blur-3xl opacity-15 scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-[400px]">
                  {/* Search bar */}
                  <div className="p-3 border-b border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-slate-200 shadow-sm">
                      <Search className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-slate-700 text-sm font-medium flex-1">best dentist near me</span>
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Mini map */}
                  <div className="relative h-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 50%, #e8f5e9 100%)' }}>
                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#a5d6a7 1px, transparent 1px), linear-gradient(90deg, #90caf9 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    {/* Roads */}
                    <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-white/80" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-white/80" />
                    {/* Map pins */}
                    {[{ x: '35%', y: '25%', rank: 1, color: '#EA4335' }, { x: '60%', y: '55%', rank: 2, color: '#4285F4' }, { x: '20%', y: '65%', rank: 3, color: '#4285F4' }].map(pin => (
                      <div key={pin.rank} className="absolute flex flex-col items-center" style={{ left: pin.x, top: pin.y, transform: 'translate(-50%, -100%)' }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black shadow-md border-2 border-white" style={{ backgroundColor: pin.color }}>
                          {pin.rank}
                        </div>
                        <div className="w-0.5 h-1.5" style={{ backgroundColor: pin.color }} />
                      </div>
                    ))}
                  </div>

                  {/* Business listings */}
                  <div>
                    {/* #1 */}
                    <div className="px-3 py-2.5 border-b border-slate-100 bg-emerald-50/60 border-l-[3px] border-l-emerald-500">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">#1</span>
                            <span className="text-[13px] font-bold text-navy truncate">City Dental Clinic</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarRating filled={5} />
                            <span className="text-[9px] text-slate-500">4.9 (238 reviews)</span>
                          </div>
                          <p className="text-[9px] text-slate-400 mt-0.5">0.3 km · Dental Clinic · Lalpur, Ranchi</p>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <span className="text-[9px] text-emerald-600 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">Open Now</span>
                          <button className="flex items-center gap-0.5 text-[9px] text-blue-600 font-semibold">
                            <PhoneCall className="w-2.5 h-2.5" /> Call
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* #2 */}
                    <div className="px-3 py-2.5 border-b border-slate-100">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">#2</span>
                            <span className="text-[12px] font-semibold text-navy truncate">Sharma Dental Care</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarRating filled={5} />
                            <span className="text-[9px] text-slate-500">4.7 (124 reviews)</span>
                          </div>
                          <p className="text-[9px] text-slate-400 mt-0.5">0.8 km · Dentist</p>
                        </div>
                        <button className="flex items-center gap-0.5 text-[9px] text-blue-600 font-semibold shrink-0">
                          <PhoneCall className="w-2.5 h-2.5" /> Call
                        </button>
                      </div>
                    </div>
                    {/* #3 */}
                    <div className="px-3 py-2.5">
                      <div className="flex items-start gap-1.5">
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full shrink-0">#3</span>
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-navy truncate">Ranchi Dental Centre</p>
                          <div className="flex items-center gap-1">
                            <StarRating filled={4} />
                            <span className="text-[9px] text-slate-500">4.5 (87 reviews)</span>
                          </div>
                          <p className="text-[9px] text-slate-400 mt-0.5">1.2 km · Dental Clinic</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center"><PhoneCall className="w-4 h-4 text-emerald-600" /></div>
                  <div><p className="text-[9px] text-slate-500">Monthly Calls</p><p className="text-sm font-extrabold text-slate-900">+89%</p></div>
                </div>
                <div className="absolute -bottom-4 -left-6 bg-emerald-600 rounded-2xl shadow-xl px-4 py-2.5 text-white">
                  <p className="text-[9px] opacity-70 font-medium uppercase tracking-wider">Maps Visibility</p>
                  <p className="text-lg font-black flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +156%</p>
                </div>
                <div className="absolute top-16 -left-10 bg-white rounded-xl shadow-xl border border-slate-100 px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-[9px] font-bold text-slate-700">Reviews Growing</span>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5">Profile views: +3.2K/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Perfect For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Built for Local Businesses</h2>
            <p className="text-slate-500 mt-3 text-sm"><strong className="text-navy">No website required</strong> to get started.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO_IT_SERVES.map(biz => (
              <div key={biz.name} className={`bg-white rounded-2xl p-5 border hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${biz.color}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${biz.color}`}><biz.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{biz.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT IS LOCAL SEO ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Customer journey illustration */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Local Customer Discovery Journey</p>
              <div className="space-y-3">
                {/* Search */}
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shrink-0"><Search className="w-4 h-4 text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">Customer searches Google</p>
                    <p className="text-xs text-blue-700 font-mono mt-0.5">&ldquo;best dentist near me&rdquo;</p>
                  </div>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-slate-400 rotate-90" /></div>

                {/* Google Maps */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
                  <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">Your business appears in Maps</p>
                    <p className="text-xs text-emerald-700 mt-0.5">Ranked in Google Maps local 3-pack</p>
                  </div>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-slate-400 rotate-90" /></div>

                {/* Customer views profile */}
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                  <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shrink-0"><Eye className="w-4 h-4 text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">Customer views your profile</p>
                    <p className="text-xs text-amber-700 mt-0.5">Reviews, photos, hours, services</p>
                  </div>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-slate-400 rotate-90" /></div>

                {/* Customer calls */}
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                  <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shrink-0"><PhoneCall className="w-4 h-4 text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">Customer calls or visits</p>
                    <p className="text-xs text-green-700 font-semibold mt-0.5">New customer acquired ✓</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> Local Discovery Intelligence
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">What is Local SEO?</h2>
              <p className="text-slate-600 leading-relaxed">Local SEO helps businesses appear when nearby customers search for products or services on Google. The most powerful element is <strong className="text-navy">Google Maps visibility</strong> — the local 3-pack that appears above regular search results.</p>
              <p className="text-slate-600 leading-relaxed">Scalify Labs helps local businesses improve Google Business Profile visibility, local rankings, and customer discovery — <strong className="text-navy">without requiring a large website setup.</strong></p>
              <div className="grid grid-cols-2 gap-2">
                {['Google Maps rankings', '"Near me" search results', 'Local business profiles', 'City-level keyword search', 'Competitor displacement', 'Mobile local discovery'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Everything Included</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Local SEO Services Included</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{s.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY LOCAL SEO MATTERS ─────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">The ROI of Local Visibility</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Local Visibility Matters</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_MATTERS.map(f => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-emerald-600" /></div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">How Scalify Labs Improves Local Visibility</h2>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-emerald-100 via-green-200 to-emerald-100" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl border-2 border-emerald-100 shadow-lg flex flex-col items-center justify-center mb-5 group-hover:border-emerald-400 transition-colors">
                  <step.icon className="w-7 h-7 text-emerald-600 mb-0.5" />
                  <span className="text-[10px] font-black text-slate-400">{step.num}</span>
                </div>
                <h3 className="font-bold text-navy text-sm mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && <ArrowRight className="hidden lg:block absolute top-9 -right-2 w-4 h-4 text-emerald-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE VS AFTER ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">The Transformation</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">The Difference Better Local Visibility Makes</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"><TrendingDown className="w-4 h-4 text-red-500" /></div>
                <p className="font-bold text-red-700 text-sm uppercase tracking-wider">Before Optimization</p>
              </div>
              <div className="space-y-3">
                {[
                  { issue: 'Low or no Google Maps visibility', icon: MapPin },
                  { issue: 'Incomplete / unverified GBP profile', icon: Globe },
                  { issue: 'Inconsistent business info across platforms', icon: Layers },
                  { issue: 'Missing or negative reviews', icon: Star },
                  { issue: 'Fewer customer calls from Google', icon: PhoneCall },
                  { issue: 'Competitors outranking you locally', icon: Users },
                ].map(item => (
                  <div key={item.issue} className="flex items-center gap-2.5">
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-sm text-red-800">{item.issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                <p className="font-bold text-emerald-700 text-sm uppercase tracking-wider">After Optimization</p>
              </div>
              <div className="space-y-3">
                {[
                  { result: 'Ranked in Google Maps top 3 locally', highlight: true },
                  { result: 'Fully optimized, verified GBP profile' },
                  { result: 'Consistent NAP across 40+ platforms' },
                  { result: 'Growing authentic review count' },
                  { result: '40–100% more calls from Google Maps' },
                  { result: 'Outranking local competitors' },
                ].map(item => (
                  <div key={item.result} className="flex items-center gap-2.5">
                    <CheckCircle className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-emerald-600' : 'text-emerald-500'}`} />
                    <span className={`text-sm ${item.highlight ? 'text-emerald-900 font-semibold' : 'text-emerald-800'}`}>{item.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Avg increase in profile views', value: '+156%', color: 'text-blue-600' },
              { label: 'Avg increase in direction requests', value: '+74%', color: 'text-emerald-600' },
              { label: 'Avg increase in phone calls', value: '+89%', color: 'text-amber-600' },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[120px] opacity-[0.08]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-600 rounded-full blur-[100px] opacity-[0.08]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent Local SEO Pricing</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-8 text-center text-white">
              <p className="text-xs uppercase tracking-widest opacity-80 font-semibold mb-2">Local Visibility Package</p>
              <p className="text-6xl font-black">₹9,999</p>
              <p className="text-lg font-semibold opacity-80 mt-1">per month</p>
            </div>

            <div className="px-8 py-6 grid sm:grid-cols-2 gap-3">
              {['Google Business Profile Optimization', 'Local Listings Management (40+ platforms)', 'NAP Consistency Audit & Fix', 'Weekly Google Posts & Updates', 'Local Ranking Optimization', 'Monthly Performance Report & Dashboard'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />{f}
                </div>
              ))}
            </div>

            <div className="px-8 pb-7 pt-2 space-y-3">
              <button onClick={() => open('Start Local SEO')} className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Start Local SEO <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => open()} className="w-full py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">
                Book Free Consultation
              </button>
            </div>

            <div className="px-8 pb-6 text-center">
              <p className="text-xs text-slate-500">Custom plans available for multi-location businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY SCALIFY LABS ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Your Local Partner</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Why Businesses Choose Scalify Labs</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm font-medium">&ldquo;We help businesses get discovered locally — more calls, more visits, more customers.&rdquo;</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CARDS.map(card => (
              <div key={card.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4"><card.icon className="w-5 h-5 text-emerald-600" /></div>
                <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors" aria-expanded={openFAQ === i}>
                  <span className="font-semibold text-navy text-sm sm:text-base pr-4">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFAQ === i ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-64' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.04]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-300 rounded-full blur-[120px] opacity-[0.07]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5 text-white" /> Local Visibility Growth Partner
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Improve Your Google Maps Visibility &amp; Local Discovery
          </h2>
          <p className="text-white/80 text-lg mb-3">Help nearby customers find your business through optimized Google Business Profiles and local visibility systems.</p>
          <p className="text-white/60 text-sm mb-8 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Starting ₹9,999/month · No website required · Results in 60–90 days
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => open()} className="flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Book Local SEO Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => open('Improve My Maps Ranking')} className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Improve My Maps Ranking
            </button>
          </div>
        </div>
      </section>

      {/* ─── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-lg">
        <button onClick={() => open()} className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-bold rounded-xl shadow shadow-emerald-200">
          Book Consultation
        </button>
        <button onClick={() => open('Improve My Maps Ranking')} className="flex-1 py-3 border-2 border-emerald-600 text-emerald-700 text-sm font-bold rounded-xl">
          Improve Maps
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  )
}
