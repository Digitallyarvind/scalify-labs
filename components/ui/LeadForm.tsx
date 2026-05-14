'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/actions'
import { trackLead } from '@/lib/analytics'

interface LeadFormProps {
  title?: string
  subtitle?: string
  source: string
  defaultCity?: string
  showMessage?: boolean
  showService?: boolean
}

const SERVICES_LIST = [
  'SEO Services', 'Google Ads', 'Meta Ads', 'WhatsApp Marketing',
  'Website Development', 'AI Systems', 'GMB Optimisation',
  'RCS Messaging', 'OBD Voice Calls', 'Lead to Revenue System',
  'Full Digital Marketing Package', 'Super 30 Course', 'Not sure — need guidance',
]

export function LeadForm({ title, subtitle, source, defaultCity, showMessage, showService }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const form = e.currentTarget
    const fd = new FormData(form)

    try {
      await submitLead({
        name: fd.get('name') as string,
        phone: fd.get('phone') as string,
        email: fd.get('email') as string || undefined,
        business: fd.get('business') as string || undefined,
        city: fd.get('city') as string || defaultCity,
        source,
        service_interest: fd.get('service') as string || undefined,
        message: fd.get('message') as string || undefined,
      })
      trackLead(source, fd.get('service') as string || undefined)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again or WhatsApp us directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-cream-300 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-lg mb-2">Message Received!</h3>
        <p className="text-[#7C7268] text-sm leading-relaxed mb-4">
          Thank you! We&apos;ll call you within 2 hours during business hours (Mon–Sat, 10am–7pm IST).
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-saffron font-semibold text-sm hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-cream-300 rounded-2xl p-6">
      {title && <div className="font-bold text-base mb-1">{title}</div>}
      {subtitle && <div className="text-[#7C7268] text-sm mb-4">{subtitle}</div>}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5">
            Full Name *
          </label>
          <input
            name="name"
            required
            placeholder="Rajesh Sharma"
            className="w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron focus:ring-3 focus:ring-[rgba(255,101,0,0.1)] transition-all"
          />
        </div>

        <div>
          <label className="block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5">
            Phone *
          </label>
          <input
            name="phone"
            required
            placeholder="+91 98765 43210"
            className="w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron focus:ring-3 focus:ring-[rgba(255,101,0,0.1)] transition-all"
          />
        </div>

        <div>
          <label className="block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5">
            Business Name
          </label>
          <input
            name="business"
            placeholder="Your Business"
            className="w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron focus:ring-3 focus:ring-[rgba(255,101,0,0.1)] transition-all"
          />
        </div>

        <div>
          <label className="block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5">
            City
          </label>
          <input
            name="city"
            defaultValue={defaultCity}
            placeholder="Ranchi"
            className="w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron focus:ring-3 focus:ring-[rgba(255,101,0,0.1)] transition-all"
          />
        </div>

        {showService && (
          <div>
            <label className="block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5">
              Service Interested In
            </label>
            <select
              name="service"
              className="w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron transition-all"
            >
              {SERVICES_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}

        {showMessage && (
          <div>
            <label className="block font-mono text-[0.66rem] text-[#7C7268] uppercase tracking-[0.08em] mb-1.5">
              Message (Optional)
            </label>
            <textarea
              name="message"
              placeholder="Tell us about your business and goals…"
              rows={3}
              className="w-full bg-cream border border-cream-300 rounded-lg text-navy font-sans text-sm px-3 py-2.5 outline-none focus:border-saffron focus:ring-3 focus:ring-[rgba(255,101,0,0.1)] transition-all resize-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-saffron text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-saffron-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Sending…' : 'Book Free Call →'}
        </button>
      </form>
    </div>
  )
}
