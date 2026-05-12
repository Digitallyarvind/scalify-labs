'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    biz: 'Scalify Labs', name: 'Arvind Gupta', phone: '+91 XXXXX XXXXX',
    email: 'hello@scalifylabs.com', city: 'Ranchi, Jharkhand', web: 'https://scalifylabs.com',
  })
  const [weights, setWeights] = useState({ acad: 30, psych: 30, interview: 25, motivation: 15 })
  const [apiKey, setApiKey] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sl_api_key') || '' : '')

  function save() {
    if (typeof window !== 'undefined') localStorage.setItem('sl_api_key', apiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const total = weights.acad + weights.psych + weights.interview + weights.motivation
  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-sm px-3 py-2.5 outline-none focus:border-[#FF6500] transition-colors"

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-white font-black text-2xl tracking-tight mb-1">Settings</h1>
        <p className="text-white/30 text-sm font-mono">Business profile, scoring weights, API keys</p>
      </div>

      {/* Business Profile */}
      <div className="bg-[#111827] border border-white/7 rounded-xl p-5 mb-4">
        <div className="text-white font-bold text-base mb-1">Business Profile</div>
        <div className="text-white/30 text-xs font-mono mb-4">Used in offer letters, proposals, and admin</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Business Name', key: 'biz', placeholder: 'Scalify Labs' },
            { label: 'Founder Name', key: 'name', placeholder: 'Arvind Gupta' },
            { label: 'Phone', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
            { label: 'Email', key: 'email', placeholder: 'hello@scalifylabs.com' },
            { label: 'City', key: 'city', placeholder: 'Ranchi, Jharkhand' },
            { label: 'Website', key: 'web', placeholder: 'https://scalifylabs.com' },
          ].map(f => (
            <div key={f.key}>
              <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-1.5">{f.label}</div>
              <input
                value={profile[f.key as keyof typeof profile]}
                onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>

      {/* S30 Score Weights */}
      <div className="bg-[#111827] border border-white/7 rounded-xl p-5 mb-4">
        <div className="text-white font-bold text-base mb-1">Super 30 Score Weights</div>
        <div className="text-white/30 text-xs font-mono mb-4">
          Must total 100% — currently {total}%{' '}
          {total !== 100 && <span className="text-red-400">(adjust to equal 100)</span>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Academic Score', key: 'acad' },
            { label: 'Psychometric Score', key: 'psych' },
            { label: 'Interview Score', key: 'interview' },
            { label: 'Motivation Score', key: 'motivation' },
          ].map(f => (
            <div key={f.key}>
              <div className="flex justify-between mb-1.5">
                <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest">{f.label}</div>
                <div className="text-[#FF6500] text-[10px] font-mono">{weights[f.key as keyof typeof weights]}%</div>
              </div>
              <input
                type="range" min={0} max={100}
                value={weights[f.key as keyof typeof weights]}
                onChange={e => setWeights(w => ({ ...w, [f.key]: +e.target.value }))}
                className="w-full accent-[#FF6500]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI API Key */}
      <div className="bg-[#111827] border border-white/7 rounded-xl p-5 mb-5">
        <div className="text-white font-bold text-base mb-1">Anthropic API Key</div>
        <div className="text-white/30 text-xs font-mono mb-3">Used for AI writing assistant in the blog editor</div>
        <input
          type="password"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="sk-ant-api03-…"
          className={inputCls}
        />
        <div className="text-white/20 text-[10px] font-mono mt-2">
          Get your key at console.anthropic.com — stored locally in browser only
        </div>
      </div>

      {/* Admin Password hint */}
      <div className="bg-amber-500/8 border border-amber-500/15 rounded-xl p-4 mb-5">
        <div className="text-amber-400 font-bold text-sm mb-1">⚠️ Change Admin Password</div>
        <div className="text-amber-400/60 text-xs leading-relaxed">
          The default password is <code className="font-mono">scalify2026</code>. Change it in{' '}
          <code className="font-mono">app/admin/layout.tsx</code> line ~60 before going live.
          In production, replace with Supabase Auth.
        </div>
      </div>

      <button
        onClick={save}
        className={`bg-[#FF6500] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#E05800] transition-all ${saved ? 'bg-green-500 hover:bg-green-500' : ''}`}
      >
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  )
}
