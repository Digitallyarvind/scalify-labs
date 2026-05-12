'use client'

import { useState } from 'react'
import { submitS30Application } from '@/lib/actions'

export function Super30Form({ batchId, seatsLeft }: { batchId: string; seatsLeft: number }) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    occupation: '', education: '12th Pass', source: 'instagram',
    why_join: '', one_year_goal: '',
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function nextStep(n: number) {
    if (n === 1 && (!form.name || !form.phone || !form.email)) {
      setErrorMsg('Please fill all required fields')
      return
    }
    if (n === 2 && !form.occupation) {
      setErrorMsg('Please enter your occupation')
      return
    }
    setErrorMsg('')
    setStep(n + 1)
  }

  async function submit() {
    if (!form.why_join) { setErrorMsg('Please tell us why you want to join'); return }
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitS30Application({ ...form, batch_id: batchId })
      setStatus('success')
    } catch (e: unknown) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'Failed to submit. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-bold text-2xl mb-3">Application Received!</h3>
        <p className="text-[#7C7268] text-sm leading-relaxed mb-5 max-w-xs mx-auto">
          Thank you! We&apos;ll call you within 48 hours to schedule your counselling session.
          Keep your phone available.
        </p>
        <div className="bg-cream rounded-xl p-4 text-sm text-[#7C7268]">
          <strong className="text-navy">What&apos;s next:</strong><br />
          Counselling call → Psychometric test → Interview → Result within 7 days
        </div>
      </div>
    )
  }

  const inputCls = "w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron focus:ring-3 focus:ring-[rgba(255,101,0,0.1)] transition-all"
  const labelCls = "block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5"

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
      <h2 className="font-bold text-2xl mb-1">Apply for Super 30</h2>
      <p className="text-[#7C7268] text-sm mb-5">
        Batch 7 · May 9 – Aug 9, 2026 ·{' '}
        <span className={seatsLeft < 10 ? 'text-red-500 font-bold' : 'text-saffron font-bold'}>
          {seatsLeft} seats left
        </span>
      </p>

      {/* Step dots */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`flex-1 h-1 rounded-full transition-all ${
              n < step ? 'bg-saffron' : n === step ? 'bg-saffron/40' : 'bg-cream-300'
            }`}
          />
        ))}
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-4">
          {errorMsg}
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="font-mono text-[0.67rem] text-[#7C7268] uppercase tracking-wider mb-4">Step 1 — Personal Info</p>
          <div><label className={labelCls}>Full Name *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Priya Kumari" className={inputCls} /></div>
          <div><label className={labelCls}>Phone *</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 99001 23456" className={inputCls} /></div>
          <div><label className={labelCls}>Email *</label><input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="priya@gmail.com" className={inputCls} /></div>
          <div><label className={labelCls}>City</label><input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Ranchi" className={inputCls} /></div>
          <button onClick={() => nextStep(1)} className="w-full bg-saffron text-white font-bold text-sm py-3 rounded-xl hover:bg-saffron-dark transition-colors">Continue →</button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-3">
          <p className="font-mono text-[0.67rem] text-[#7C7268] uppercase tracking-wider mb-4">Step 2 — Background</p>
          <div><label className={labelCls}>Current Occupation *</label><input value={form.occupation} onChange={e => update('occupation', e.target.value)} placeholder="Student / Working Professional / Business Owner" className={inputCls} /></div>
          <div>
            <label className={labelCls}>Highest Education</label>
            <select value={form.education} onChange={e => update('education', e.target.value)} className={inputCls}>
              {['12th Pass', 'Pursuing Graduation', 'Graduate', 'Post Graduate', 'Working Professional'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>How did you hear about Super 30?</label>
            <select value={form.source} onChange={e => update('source', e.target.value)} className={inputCls}>
              {[['instagram','Instagram'],['facebook','Facebook'],['website','Website'],['referral','Friend / Referral'],['whatsapp','WhatsApp'],['youtube','YouTube'],['event','Event / Seminar']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border-2 border-cream-300 text-navy font-bold text-sm py-3 rounded-xl hover:border-navy transition-colors">← Back</button>
            <button onClick={() => nextStep(2)} className="flex-1 bg-saffron text-white font-bold text-sm py-3 rounded-xl hover:bg-saffron-dark transition-colors">Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-3">
          <p className="font-mono text-[0.67rem] text-[#7C7268] uppercase tracking-wider mb-4">Step 3 — Your Goals</p>
          <div>
            <label className={labelCls}>Why do you want to join Super 30? *</label>
            <textarea value={form.why_join} onChange={e => update('why_join', e.target.value)} rows={4} placeholder="Tell us your goals and why digital marketing…" className={inputCls + ' resize-none'} />
          </div>
          <div>
            <label className={labelCls}>Your 1-year goal after Super 30</label>
            <textarea value={form.one_year_goal} onChange={e => update('one_year_goal', e.target.value)} rows={3} placeholder="What do you want to achieve…" className={inputCls + ' resize-none'} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border-2 border-cream-300 text-navy font-bold text-sm py-3 rounded-xl hover:border-navy transition-colors">← Back</button>
            <button onClick={submit} disabled={status === 'loading'} className="flex-1 bg-saffron text-white font-bold text-sm py-3 rounded-xl hover:bg-saffron-dark disabled:opacity-50 transition-colors">
              {status === 'loading' ? 'Submitting…' : 'Submit Application →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
