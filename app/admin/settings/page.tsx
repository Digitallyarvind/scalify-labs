'use client'

import { useState } from 'react'

const WEIGHTS = [
  { key: 'academic', label: 'Academic Score', default: 30 },
  { key: 'psychometric', label: 'Psychometric Score', default: 30 },
  { key: 'interview', label: 'Interview Score', default: 25 },
  { key: 'motivation', label: 'Motivation Score', default: 15 },
]

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm">
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-4">{title}</p>
      {children}
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-[#9C9189] uppercase tracking-widest mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-sm px-3 py-2.5 text-[#1A1410] focus:outline-none focus:border-[#FF6500] focus:shadow-[0_0_0_3px_rgba(255,101,0,0.1)] transition-all" />
    </div>
  )
}

export default function SettingsPage() {
  const [weights, setWeights] = useState({ academic: 30, psychometric: 30, interview: 25, motivation: 15 })
  const [business, setBusiness] = useState({
    name: 'Scalify Labs', founder: 'Arvind Gupta', phone: '+91 87884 24727',
    email: 'hello@scalifylabs.com', city: 'Ranchi', website: 'https://scalifylabs.com'
  })
  const [adminPhone, setAdminPhone] = useState('918788424727')
  const [anthropicKey, setAnthropicKey] = useState('')
  const [notifications, setNotifications] = useState({
    new_lead: true, s30_application: true, career_application: true, seo_cron: true
  })
  const [saved, setSaved] = useState(false)

  const weightTotal = Object.values(weights).reduce((s, v) => s + v, 0)

  function save() {
    // In production, save to Supabase settings table via API
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Settings</h1>
        <button onClick={save}
          className="px-5 py-2.5 rounded-lg bg-[#FF6500] text-white font-bold text-sm hover:bg-[#E05800] transition-colors">
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Business Profile */}
        <Card title="Business Profile">
          <div className="space-y-3">
            <Field label="Business Name" value={business.name} onChange={v => setBusiness(b => ({ ...b, name: v }))} />
            <Field label="Founder Name" value={business.founder} onChange={v => setBusiness(b => ({ ...b, founder: v }))} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" value={business.phone} onChange={v => setBusiness(b => ({ ...b, phone: v }))} />
              <Field label="City" value={business.city} onChange={v => setBusiness(b => ({ ...b, city: v }))} />
            </div>
            <Field label="Email" type="email" value={business.email} onChange={v => setBusiness(b => ({ ...b, email: v }))} />
            <Field label="Website" type="url" value={business.website} onChange={v => setBusiness(b => ({ ...b, website: v }))} />
          </div>
        </Card>

        {/* Super 30 Score Weights */}
        <Card title="Super 30 — Score Weights">
          <div className="space-y-4">
            {WEIGHTS.map(w => (
              <div key={w.key}>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs text-[#57534E] font-medium">{w.label}</label>
                  <span className="text-xs font-mono font-bold text-[#FF6500]">{weights[w.key as keyof typeof weights]}%</span>
                </div>
                <input type="range" min={0} max={60} step={5}
                  value={weights[w.key as keyof typeof weights]}
                  onChange={e => setWeights(prev => ({ ...prev, [w.key]: Number(e.target.value) }))}
                  className="w-full accent-[#FF6500]" />
              </div>
            ))}
            <div className={`flex justify-between p-3 rounded-lg font-mono text-sm ${weightTotal === 100 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              <span>Total Weight</span>
              <span className="font-black">{weightTotal}%</span>
            </div>
            {weightTotal !== 100 && <p className="text-xs text-red-500">⚠️ Weights must total exactly 100%</p>}
          </div>
        </Card>

        {/* API Keys */}
        <Card title="API Configuration">
          <div className="space-y-3">
            <Field label="Admin WhatsApp Number" value={adminPhone} onChange={setAdminPhone} placeholder="918788424727" />
            <div>
              <label className="block text-[10px] font-mono text-[#9C9189] uppercase tracking-widest mb-1.5">Anthropic API Key (Claude AI)</label>
              <input type="password" value={anthropicKey} onChange={e => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-sm px-3 py-2.5 text-[#1A1410] focus:outline-none focus:border-[#FF6500] focus:shadow-[0_0_0_3px_rgba(255,101,0,0.1)] transition-all font-mono" />
              <p className="text-[10px] text-[#9C9189] mt-1">Used for AI blog writing, SEO optimisation, and social repurposer</p>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#9C9189] uppercase tracking-widest mb-1.5">GSC Connection Status</label>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F4EF]">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm text-[#57534E]">Not connected</span>
                <button className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-[#FF6500]/10 text-[#FF6500] font-semibold">Connect GSC</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="WhatsApp Notifications">
          <div className="space-y-3">
            {[
              { key: 'new_lead', label: 'New lead submitted' },
              { key: 's30_application', label: 'New Super 30 application' },
              { key: 'career_application', label: 'New career application' },
              { key: 'seo_cron', label: 'SEO cron job completed' },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between py-2">
                <span className="text-sm text-[#57534E]">{n.label}</span>
                <button onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                  className="relative w-10 h-5 rounded-full transition-colors"
                  style={{ background: notifications[n.key as keyof typeof notifications] ? '#FF6500' : '#E8E3DA' }}>
                  <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 shadow transition-all"
                    style={{ left: notifications[n.key as keyof typeof notifications] ? '22px' : '2px' }} />
                </button>
              </div>
            ))}
            <p className="text-[10px] text-[#9C9189] font-mono mt-2">
              Notifications sent to: {adminPhone ? `+${adminPhone}` : 'Not configured'}
            </p>
          </div>
        </Card>
      </div>

      {/* Security */}
      <Card title="Security">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Admin Email" type="email" value="admin@scalifylabs.com" onChange={() => {}} />
          <Field label="New Password" type="password" value="" onChange={() => {}} placeholder="Leave blank to keep current" />
        </div>
        <p className="text-xs text-[#9C9189] mt-3">Current credentials: admin@scalifylabs.com · scalify2026</p>
      </Card>
    </div>
  )
}
