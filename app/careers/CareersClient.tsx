'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, Briefcase, MapPin, Clock, Users } from 'lucide-react'
import { SITE } from '@/lib/data'

type Job = { id: string; title: string; department: string; type: string; location: string; salary_range?: string; description?: string; requirements?: string[] }

const VALUES = [
  { icon: '🚀', title: 'Growth First', desc: 'We believe in growing together — your success is our success.' },
  { icon: '🧠', title: 'Learning Culture', desc: 'Weekly upskilling, access to premium tools and courses.' },
  { icon: '🤝', title: 'Real Ownership', desc: 'Work on real client campaigns from day one.' },
  { icon: '📍', title: 'Ranchi HQ', desc: 'Based in Ranchi — building the digital future of Jharkhand.' },
]

async function submitApplication(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  await fetch('/api/careers/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
}

function ApplyForm({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', occupation: '', experience_years: '', skills: '', portfolio_url: '', linkedin_url: '', why_join: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) return
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, job_id: job.id, experience_years: Number(form.experience_years), skills: form.skills.split(',').map(s => s.trim()) })
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  if (submitted) return (
    <div className="text-center py-10">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-[#1A1410] mb-2">Application Submitted!</h3>
      <p className="text-slate-500 text-sm">We'll review your application and reach out on WhatsApp within 48 hours.</p>
      <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl bg-[#FF6500] text-white font-bold text-sm hover:bg-[#E05800] transition-colors">Close</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">WhatsApp Number *</label>
          <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
      </div>
      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
        <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">Current Role</label>
          <input value={form.occupation} onChange={e => set('occupation', e.target.value)} placeholder="e.g. Digital Marketer" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">Years of Experience</label>
          <input type="number" min={0} value={form.experience_years} onChange={e => set('experience_years', e.target.value)} placeholder="0" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
      </div>
      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Skills (comma separated)</label>
        <input value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="SEO, Google Ads, Canva, Excel…" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">Portfolio / LinkedIn URL</label>
          <input type="url" value={form.portfolio_url} onChange={e => set('portfolio_url', e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">LinkedIn URL</label>
          <input type="url" value={form.linkedin_url} onChange={e => set('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
      </div>
      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Why do you want to work at Scalify Labs? *</label>
        <textarea required rows={4} value={form.why_join} onChange={e => set('why_join', e.target.value)} placeholder="Tell us what excites you about this role and Scalify Labs…" className="w-full border border-slate-200 rounded-xl text-sm px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400" /></div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#FF6500] hover:bg-[#E05800] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
        {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</> : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-center text-[11px] text-slate-400">We respond within 48 hours on WhatsApp</p>
    </form>
  )
}

export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1A1410] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border border-[#FF6500]/40 bg-[#FF6500]/10 text-[#FF6500] mb-6">
            <Briefcase className="w-3.5 h-3.5" /> We're Hiring
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            Build India's Growth<br /><span style={{ color: '#FF6500' }}>Infrastructure</span> With Us
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Scalify Labs is Ranchi's leading digital marketing agency. We help businesses grow with SEO, ads, CRM, and AI automation. Join a team that ships real results.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F7F4EF] px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-[#1A1410] mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>Why Work at Scalify Labs?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white border border-[#E8E3DA] rounded-2xl p-5 shadow-sm">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-[#1A1410] mb-1">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-[#1A1410] mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>Open Positions</h2>
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white border border-[#E8E3DA] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1A1410] mb-1">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        {job.salary_range && <span className="font-semibold text-[#FF6500]">{job.salary_range}</span>}
                      </div>
                      {job.description && <p className="text-slate-600 text-sm leading-relaxed mb-4">{job.description}</p>}
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((r, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#F7F4EF] text-slate-600 border border-[#E8E3DA]">{r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button onClick={() => setSelectedJob(job)}
                      className="ml-4 shrink-0 px-5 py-2.5 rounded-xl bg-[#FF6500] text-white font-bold text-sm hover:bg-[#E05800] transition-colors flex items-center gap-1.5">
                      Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold mb-2">No open positions right now</p>
              <p className="text-sm">We're always looking for exceptional talent. Send your resume to{' '}
                <a href={`mailto:${SITE.email}`} className="text-[#FF6500]">{SITE.email}</a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="font-bold text-[#1A1410]">Apply — {selectedJob.title}</h3>
                <p className="text-slate-500 text-xs">{selectedJob.location} · {selectedJob.type}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500">✕</button>
            </div>
            <div className="p-5">
              <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
