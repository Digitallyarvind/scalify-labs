'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { trackNewsletterSignup } from '@/lib/analytics'

export function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'inline' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      trackNewsletterSignup()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
        <CheckCircle2 className="w-4 h-4" />
        You&apos;re subscribed! Check your inbox for the welcome guide.
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2.5 bg-saffron text-white font-bold text-sm rounded-lg hover:bg-saffron-dark transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe →'}
        </button>
      </form>
    )
  }

  if (variant === 'dark') {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron/60 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-saffron text-white font-bold text-sm rounded-xl hover:bg-saffron-dark transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Subscribing…' : 'Get Free Insights →'}
        </button>
        {status === 'error' && <p className="text-red-400 text-xs">Something went wrong. Try again.</p>}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-navy text-white font-bold text-sm rounded-xl hover:bg-navy/90 transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe Free →'}
      </button>
      {status === 'error' && <p className="text-red-500 text-xs">Something went wrong. Try again.</p>}
    </form>
  )
}
