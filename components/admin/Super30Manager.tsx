'use client'

import { useState } from 'react'

type Applicant = {
  id: string; name: string; phone: string; email?: string; city?: string; age?: number; gender?: string
  occupation?: string; education?: string; why_join?: string; goal_1yr?: string
  status?: string; batch_id?: string; source?: string; ban_until?: string; fee_paid?: boolean
  academic_score?: number; interview_score?: number; motivation_score?: number; psychometric_score?: number
  rapd_r?: number; rapd_a?: number; rapd_p?: number; rapd_d?: number; rapd_s?: number
  weighted_total?: number; counselling_notes?: string; created_at: string
}

type Batch = {
  id: string; name: string; batch_number?: number; year?: number; seats?: number; fee?: number
  start_date?: string; end_date?: string; app_open?: string; app_close?: string
  mode?: string; description?: string; status?: string; created_at: string
}

const STAGES = ['applied','counselling','psychometric','interview','selected','enrolled','rejected']
const STAGE_LABELS: Record<string,string> = {
  applied:'Applied', counselling:'Counselling Call', psychometric:'Psychometric Test',
  interview:'Interview', selected:'Selected', enrolled:'Enrolled', rejected:'Rejected'
}
const STAGE_COLORS: Record<string,string> = {
  applied:'#2563EB', counselling:'#7C3AED', psychometric:'#D97706',
  interview:'#FF6500', selected:'#16A34A', enrolled:'#059669', rejected:'#DC2626'
}

async function saveScores(id: string, scores: Record<string, number>) {
  const academic = scores.academic_score ?? 0
  const interview = scores.interview_score ?? 0
  const motivation = scores.motivation_score ?? 0
  const psychometric = scores.psychometric_score ?? 0
  const weighted = academic * 0.3 + psychometric * 0.3 + interview * 0.25 + motivation * 0.15
  await fetch('/api/admin/s30/scores', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...scores, weighted_total: Math.round(weighted * 10) / 10 })
  })
}

async function updateStage(id: string, status: string) {
  await fetch('/api/admin/s30/stage', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status })
  })
}

async function applyBanFn(id: string) {
  const until = new Date(); until.setFullYear(until.getFullYear() + 1)
  await fetch('/api/admin/s30/ban', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ban_until: until.toISOString().split('T')[0] })
  })
}

function RAPDBar({ label, value, max = 20 }: { label: string; value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="flex justify-between text-[10px] font-mono mb-0.5">
        <span className="text-[#9C9189]">{label}</span>
        <span className="font-bold text-[#1A1410]">{value}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E8E3DA]">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#FF6500' }} />
      </div>
    </div>
  )
}

function ApplicantProfile({ app, onClose, onUpdate }: { app: Applicant; onClose: () => void; onUpdate: (a: Applicant) => void }) {
  const [scores, setScores] = useState({
    academic_score: app.academic_score ?? 0,
    interview_score: app.interview_score ?? 0,
    motivation_score: app.motivation_score ?? 0,
    psychometric_score: app.psychometric_score ?? 0,
    rapd_r: app.rapd_r ?? 0, rapd_a: app.rapd_a ?? 0,
    rapd_p: app.rapd_p ?? 0, rapd_d: app.rapd_d ?? 0, rapd_s: app.rapd_s ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [notes, setNotes] = useState(app.counselling_notes ?? '')

  const weighted = scores.academic_score * 0.3 + scores.psychometric_score * 0.3 + scores.interview_score * 0.25 + scores.motivation_score * 0.15

  const offerLetter = `OFFER LETTER — SUPER 30 GROWTH ACCELERATOR
Scalify Labs | Ranchi, Jharkhand

Dear ${app.name},

We are pleased to inform you that you have been SELECTED for the Super 30 Growth Accelerator Program.

Batch Details:
• Duration: 45 days (Offline, Ranchi)
• Program Fee: ₹12,000
• Start Date: [DATE]
• Seat: Reserved for you until [DATE + 7 days]

To confirm your seat, please:
1. Pay the program fee via UPI: [UPI ID]
2. Send payment screenshot to +91 87884 24727
3. Collect your welcome kit on Day 1

Congratulations! We look forward to transforming your digital marketing career.

Regards,
Arvind Gupta
Founder, Scalify Labs
+91 87884 24727 | scalifylabs.com`

  async function handleSaveScores() {
    setSaving(true)
    await saveScores(app.id, scores)
    setSaving(false)
    onUpdate({ ...app, ...scores, weighted_total: Math.round(weighted * 10) / 10 })
  }

  async function handleStageChange(status: string) {
    await updateStage(app.id, status)
    onUpdate({ ...app, status })
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-white border-l border-[#E8E3DA] shadow-2xl z-50 flex flex-col overflow-hidden" style={{ top: 52 }}>
      <div className="p-5 border-b border-[#E8E3DA] flex items-start justify-between">
        <div>
          <h2 className="font-black text-lg text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>{app.name}</h2>
          <p className="text-sm text-[#9C9189]">{app.city} · {app.occupation}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#F7F4EF] text-[#9C9189] flex items-center justify-center">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[['Phone',app.phone],['Email',app.email||'—'],['Education',app.education||'—'],['Source',app.source||'—']].map(([k,v])=>(
            <div key={k}><p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-wider">{k}</p><p className="font-mono text-[#1A1410]">{v}</p></div>
          ))}
        </div>

        {/* Why join */}
        {app.why_join && (
          <div><p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-wider mb-1">Why Join</p>
          <p className="text-sm text-[#57534E] bg-[#F7F4EF] rounded-lg p-3">{app.why_join}</p></div>
        )}

        {/* Stage */}
        <div>
          <p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-wider mb-2">Stage</p>
          <div className="flex flex-wrap gap-1.5">
            {STAGES.map(s => (
              <button key={s} onClick={() => handleStageChange(s)}
                className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-all"
                style={{ background: app.status===s ? STAGE_COLORS[s]+'15' : 'transparent', color: app.status===s ? STAGE_COLORS[s] : '#9C9189', borderColor: app.status===s ? STAGE_COLORS[s]+'40' : '#E8E3DA', fontWeight: app.status===s ? 700 : 400 }}>
                {STAGE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Scores */}
        <div>
          <p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-wider mb-3">Score Entry</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[['Academic (30%)', 'academic_score'],['Interview (25%)', 'interview_score'],['Motivation (15%)', 'motivation_score'],['Psychometric (30%)', 'psychometric_score']].map(([label, key]) => (
              <div key={key}>
                <label className="block text-[10px] font-mono text-[#9C9189] mb-1">{label}</label>
                <input type="number" min={0} max={100} value={scores[key as keyof typeof scores]}
                  onChange={e => setScores(s => ({ ...s, [key]: Number(e.target.value) }))}
                  className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-sm px-3 py-2 text-center font-mono font-bold focus:outline-none focus:border-[#FF6500]" />
              </div>
            ))}
          </div>
          <div className="bg-[rgba(255,101,0,0.06)] rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-wider">RAPD Dimensions</p>
              <p className="text-xs font-mono text-[#9C9189]">max 20 each</p>
            </div>
            <div className="space-y-2">
              {[['R — Rational','rapd_r'],['A — Aesthetic','rapd_a'],['P — Power','rapd_p'],['D — Dependence','rapd_d'],['S — Social','rapd_s']].map(([label,key])=>(
                <div key={key} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#57534E] w-28">{label}</span>
                  <input type="number" min={0} max={20} value={scores[key as keyof typeof scores]}
                    onChange={e => setScores(s => ({ ...s, [key]: Number(e.target.value) }))}
                    className="w-16 bg-white border border-[#E8E3DA] rounded-lg text-xs px-2 py-1 text-center font-mono font-bold focus:outline-none focus:border-[#FF6500]" />
                  <div className="flex-1 h-1.5 rounded-full bg-[#E8E3DA]">
                    <div className="h-full rounded-full" style={{ width: `${(scores[key as keyof typeof scores]/20)*100}%`, background: '#FF6500' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F4EF] mb-3">
            <span className="text-sm font-bold text-[#1A1410]">Weighted Total</span>
            <span className="text-2xl font-black text-[#FF6500]" style={{ fontFamily: 'Syne, sans-serif' }}>{weighted.toFixed(1)}</span>
          </div>
          <button onClick={handleSaveScores} disabled={saving}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-[#FF6500] hover:bg-[#E05800] transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Scores'}
          </button>
        </div>

        {/* Notes */}
        <div>
          <p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-wider mb-2">Counselling Notes</p>
          <textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Add notes from counselling call, interview observations…"
            className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-xl text-sm p-3 resize-none focus:outline-none focus:border-[#FF6500]" />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[#E8E3DA] space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigator.clipboard.writeText(offerLetter)}
            className="py-2 rounded-lg text-xs font-semibold bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20 hover:bg-[#16A34A]/15 transition-colors">
            📄 Copy Offer Letter
          </button>
          <a href={`https://wa.me/${app.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
            className="py-2 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-100 text-center block">
            💬 WhatsApp
          </a>
        </div>
        {app.ban_until ? (
          <p className="text-xs text-center text-red-500 font-mono">🚫 Banned until {app.ban_until}</p>
        ) : (
          <button onClick={() => { if(confirm('Apply 1-year ban?')) applyBanFn(app.id) }}
            className="w-full py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors">
            🚫 Apply 1-Year Ban (Declined After Selection)
          </button>
        )}
      </div>
    </div>
  )
}

export function Super30Manager({ batches: initialBatches, applicants: initialApplicants }: {
  batches: Batch[]; applicants: Applicant[]
}) {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants)
  const [batches] = useState<Batch[]>(initialBatches)
  const [selected, setSelected] = useState<Applicant | null>(null)
  const [activeTab, setActiveTab] = useState<'pipeline'|'list'>('pipeline')
  const [search, setSearch] = useState('')

  const filtered = applicants.filter(a =>
    !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.phone?.includes(search)
  )

  function updateApplicant(updated: Applicant) {
    setApplicants(prev => prev.map(a => a.id === updated.id ? updated : a))
    if (selected?.id === updated.id) setSelected(updated)
  }

  const stageCounts = STAGES.reduce((acc, s) => {
    acc[s] = applicants.filter(a => a.status === s).length
    return acc
  }, {} as Record<string, number>)

  const activeBatch = batches[0]
  const enrolled = applicants.filter(a => a.status === 'enrolled').length
  const revenue = enrolled * (activeBatch?.fee ?? 12000)

  const banned = applicants.filter(a => a.ban_until && new Date(a.ban_until) > new Date())

  return (
    <div className="flex flex-col h-full bg-[#F7F4EF]">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-[#E8E3DA] flex items-center gap-4">
        <h1 className="text-xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Super 30</h1>
        {activeBatch && (
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[rgba(255,101,0,0.08)] text-[#FF6500]">
            {activeBatch.name} · {enrolled}/{activeBatch.seats ?? 30} seats · ₹{(revenue / 1000).toFixed(0)}K revenue
          </span>
        )}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicants…"
          className="ml-auto bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:border-[#FF6500] w-48" />
        <div className="flex border border-[#E8E3DA] rounded-lg overflow-hidden">
          {(['pipeline','list'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="px-3 py-1.5 text-xs font-mono capitalize transition-colors"
              style={{ background: activeTab === t ? '#FF6500' : 'white', color: activeTab === t ? 'white' : '#57534E' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stage counts */}
      <div className="px-6 py-3 bg-white border-b border-[#E8E3DA] flex gap-4 overflow-x-auto">
        {STAGES.map(s => (
          <div key={s} className="text-center shrink-0">
            <p className="text-lg font-black" style={{ color: STAGE_COLORS[s], fontFamily: 'Syne, sans-serif' }}>{stageCounts[s] ?? 0}</p>
            <p className="text-[9px] font-mono uppercase tracking-widest text-[#9C9189]">{STAGE_LABELS[s]}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-5">
        {activeTab === 'pipeline' ? (
          <div className="flex gap-4" style={{ minWidth: `${STAGES.length * 220}px` }}>
            {STAGES.map(stage => {
              const stageApps = filtered.filter(a => a.status === stage)
              return (
                <div key={stage} className="w-52 flex-shrink-0">
                  <div className="mb-2 px-3 py-2 rounded-lg text-xs font-bold" style={{ background: STAGE_COLORS[stage] + '10', color: STAGE_COLORS[stage] }}>
                    {STAGE_LABELS[stage]} ({stageApps.length})
                  </div>
                  <div className="space-y-2">
                    {stageApps.map(a => (
                      <div key={a.id} className="bg-white border border-[#E8E3DA] rounded-xl p-3 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => setSelected(a)}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-[#1A1410] truncate">{a.name}</p>
                          {a.ban_until && <span className="text-xs">🚫</span>}
                        </div>
                        <p className="text-[10px] font-mono text-[#9C9189]">{a.city} · {a.source}</p>
                        {a.weighted_total ? (
                          <div className="mt-2">
                            <div className="flex justify-between text-[10px] font-mono mb-0.5">
                              <span className="text-[#9C9189]">Score</span>
                              <span className="font-bold text-[#FF6500]">{a.weighted_total}</span>
                            </div>
                            <div className="h-1 rounded-full bg-[#E8E3DA]">
                              <div className="h-full rounded-full bg-[#FF6500]" style={{ width: `${a.weighted_total}%` }} />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                    {!stageApps.length && <div className="border-2 border-dashed border-[#E8E3DA] rounded-xl p-4 text-center text-[10px] font-mono text-[#9C9189]">Empty</div>}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E8E3DA] overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#F7F4EF] border-b border-[#E8E3DA]">
                {['Name','Phone','City','Education','Stage','Score','Applied','Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} className="border-b border-[#E8E3DA] hover:bg-[#FAFAF8] transition-colors cursor-pointer" onClick={() => setSelected(a)}>
                    <td className="px-4 py-3 font-semibold text-[#1A1410]">{a.name} {a.ban_until ? '🚫' : ''}</td>
                    <td className="px-4 py-3 font-mono text-[#57534E]">{a.phone}</td>
                    <td className="px-4 py-3 text-[#57534E]">{a.city}</td>
                    <td className="px-4 py-3 text-[#57534E]">{a.education}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: STAGE_COLORS[a.status??'applied']+'15', color: STAGE_COLORS[a.status??'applied'] }}>
                        {STAGE_LABELS[a.status??'applied']}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-[#FF6500]">{a.weighted_total?.toFixed(1) ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#9C9189]">{new Date(a.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs px-2 py-1 rounded-lg bg-[rgba(255,101,0,0.08)] text-[#FF6500] font-mono hover:bg-[rgba(255,101,0,0.15)] transition-colors">Open</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {banned.length > 0 && (
          <div className="mt-6 bg-white rounded-xl border border-red-100 p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-3">🚫 Banned Applicants ({banned.length})</p>
            {banned.map(a => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-[#E8E3DA] last:border-0">
                <div>
                  <p className="text-sm font-semibold text-[#1A1410]">{a.name}</p>
                  <p className="text-xs font-mono text-[#9C9189]">{a.phone}</p>
                </div>
                <p className="text-xs font-mono text-red-500">Until {a.ban_until}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/10 z-40" onClick={() => setSelected(null)} />
          <ApplicantProfile app={selected} onClose={() => setSelected(null)} onUpdate={updateApplicant} />
        </>
      )}
    </div>
  )
}
