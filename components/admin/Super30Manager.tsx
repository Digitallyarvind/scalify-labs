'use client'

import { useState } from 'react'
import { updateApplicant, applyBan } from '@/lib/actions'
import type { Applicant, Batch } from '@/types/database'

const APP_STAGES = ['applied', 'counselling', 'psychometric', 'interview', 'selected', 'enrolled', 'rejected'] as const
const STAGE_LABEL: Record<string, string> = {
  applied: 'Applied', counselling: 'Counselling', psychometric: 'Psychometric',
  interview: 'Interview', selected: 'Selected', enrolled: 'Enrolled', rejected: 'Rejected',
}
const STAGE_COLOR: Record<string, string> = {
  applied: 'bg-blue-500/15 text-blue-400', counselling: 'bg-purple-500/15 text-purple-400',
  psychometric: 'bg-teal-500/15 text-teal-400', interview: 'bg-amber-500/15 text-amber-400',
  selected: 'bg-green-500/15 text-green-400', enrolled: 'bg-green-500/20 text-green-300',
  rejected: 'bg-red-500/15 text-red-400',
}

interface Props {
  batches: Batch[]
  allApplicants: Applicant[]
  activeBatchId: string | null
}

function computeTotal(app: Applicant): number {
  // Default weights: acad 30%, psych 30%, interview 25%, motivation 15%
  return Math.round(
    (app.score_academic || 0) * 0.30 +
    (app.score_psychometric || 0) * 0.30 +
    (app.score_interview || 0) * 0.25 +
    (app.score_motivation || 0) * 0.15
  )
}

export function Super30Manager({ batches, allApplicants, activeBatchId }: Props) {
  const [view, setView] = useState<'applications' | 'merit' | 'batches'>('applications')
  const [selectedBatch, setSelectedBatch] = useState(activeBatchId || batches[0]?.id || '')
  const [stageFilter, setStageFilter] = useState('all')
  const [selected, setSelected] = useState<Applicant | null>(null)
  const [scores, setScores] = useState({ acad: 0, psych: 0, interview: 0, motivation: 0, r: 0, a: 0, p: 0, d: 0, s: 0 })
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('')

  const batchApps = selectedBatch === 'all'
    ? allApplicants
    : allApplicants.filter(a => a.batch_id === selectedBatch)

  const filtered = batchApps.filter(a => {
    const matchStage = stageFilter === 'all' || a.stage === stageFilter
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.city?.toLowerCase().includes(search.toLowerCase())
    return matchStage && matchSearch
  })

  const meritList = [...batchApps]
    .filter(a => ['interview', 'selected', 'enrolled'].includes(a.stage) && computeTotal(a) > 0)
    .sort((a, b) => computeTotal(b) - computeTotal(a))

  function openApplicant(app: Applicant) {
    setSelected(app)
    setScores({
      acad: app.score_academic, psych: app.score_psychometric,
      interview: app.score_interview, motivation: app.score_motivation,
      r: app.rapd_r, a: app.rapd_a, p: app.rapd_p, d: app.rapd_d, s: app.rapd_s,
    })
    setNote('')
  }

  function psychTotal() {
    return scores.r + scores.a + scores.p + scores.d + scores.s
  }

  function totalScore() {
    return Math.round(scores.acad * 0.30 + scores.psych * 0.30 + scores.interview * 0.25 + scores.motivation * 0.15)
  }

  async function saveScores() {
    if (!selected) return
    setSaving(true)
    const updatedPsych = psychTotal() > 0 ? Math.round(psychTotal() / 100 * 100) : scores.psych
    await updateApplicant(selected.id, {
      score_academic: scores.acad,
      score_psychometric: psychTotal() > 0 ? Math.min(100, psychTotal() * 5) : scores.psych,
      score_interview: scores.interview,
      score_motivation: scores.motivation,
      score_total: totalScore(),
      rapd_r: scores.r, rapd_a: scores.a, rapd_p: scores.p, rapd_d: scores.d, rapd_s: scores.s,
    })
    setSaving(false)
  }

  async function moveStage(stage: string) {
    if (!selected) return
    setSaving(true)
    await updateApplicant(selected.id, { stage: stage as Applicant['stage'] })
    setSelected(a => a ? { ...a, stage: stage as Applicant['stage'] } : null)
    setSaving(false)
  }

  async function selectApplicant() {
    if (!selected) return
    setSaving(true)
    await updateApplicant(selected.id, { stage: 'selected', offer_sent: true })
    setSelected(a => a ? { ...a, stage: 'selected', offer_sent: true } : null)
    setSaving(false)
  }

  async function banApplicant() {
    if (!selected) return
    if (!confirm(`Apply 1-year ban to ${selected.name}? They will not be able to reapply until ${new Date(Date.now() + 365 * 86400000).toLocaleDateString()}`)) return
    setSaving(true)
    const result = await applyBan(selected.id)
    alert(`Ban applied until ${result.banUntil}`)
    setSelected(a => a ? { ...a, offer_declined: true, stage: 'rejected' } : null)
    setSaving(false)
  }

  function genOfferLetter(app: Applicant) {
    const batch = batches.find(b => b.id === app.batch_id)
    const letter = `OFFER LETTER — SCALIFY LABS
${'═'.repeat(40)}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

Dear ${app.name},

We are delighted to inform you that you have been SELECTED for the ${batch?.name || 'Super 30'} at Scalify Labs, Ranchi.

After reviewing your application, psychometric assessment, and interview performance, we believe you have the potential, drive, and mindset to excel in digital marketing.

PROGRAMME DETAILS:
• Batch: ${batch?.name || 'Super 30'}
• Start Date: ${batch?.start_date ? new Date(batch.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
• Mode: ${batch?.mode || 'Offline'} — Ranchi
• Duration: 90 days
• Fee: ₹${batch?.fee?.toLocaleString() || '12,000'}

IMPORTANT: Please confirm your enrollment within 5 working days by paying the course fee. Declining this offer will result in a 12-month reapplication restriction.

Warm regards,
Arvind Gupta
Founder, Scalify Labs
Ranchi, Jharkhand
hello@scalifylabs.com | scalifylabs.com`
    navigator.clipboard.writeText(letter)
    alert('Offer letter copied to clipboard!')
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
  const numInputCls = "w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-2 py-1.5 outline-none focus:border-[#FF6500] transition-colors text-center"

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/6 bg-[#0D1117] flex items-center gap-4 flex-wrap">
        <div>
          <h1 className="text-white font-black text-xl tracking-tight">Super 30</h1>
          <p className="text-white/30 text-xs font-mono">{batchApps.length} applicants · {batchApps.filter(a => a.stage === 'enrolled').length} enrolled</p>
        </div>

        {/* View tabs */}
        <div className="flex gap-1 bg-[#111827] border border-white/7 rounded-xl p-1">
          {[['applications', 'Applications'], ['merit', 'Merit List'], ['batches', 'Batches']].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setView(v as 'applications' | 'merit' | 'batches')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${view === v ? 'bg-[#FF6500] text-white' : 'text-white/40 hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Batch selector */}
        <select
          value={selectedBatch}
          onChange={e => setSelectedBatch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg text-white/50 text-xs font-mono px-3 py-2 outline-none ml-auto"
        >
          <option value="all">All Batches</option>
          {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      {/* ── APPLICATIONS VIEW ── */}
      {view === 'applications' && (
        <div className="flex flex-1 overflow-hidden">
          {/* List */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filters */}
            <div className="px-4 py-3 border-b border-white/6 flex gap-2 flex-wrap">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search applicants…"
                className="bg-[#111827] border border-white/8 rounded-lg text-white text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors w-48"
              />
              <div className="flex gap-1 bg-[#111827] border border-white/7 rounded-xl p-1">
                <button onClick={() => setStageFilter('all')} className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${stageFilter === 'all' ? 'bg-[#FF6500] text-white' : 'text-white/30 hover:text-white'}`}>All ({batchApps.length})</button>
                {APP_STAGES.map(s => {
                  const cnt = batchApps.filter(a => a.stage === s).length
                  return cnt > 0 ? (
                    <button key={s} onClick={() => setStageFilter(s)} className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${stageFilter === s ? 'bg-[#FF6500] text-white' : 'text-white/30 hover:text-white'}`}>
                      {STAGE_LABEL[s]} ({cnt})
                    </button>
                  ) : null
                })}
              </div>
            </div>

            {/* Applicant rows */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#0D1117]">
                  <tr className="border-b border-white/6">
                    {['Applicant', 'City', 'Education', 'Source', 'Stage', 'Score', 'Applied', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[9px] font-mono text-white/25 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(app => (
                    <tr
                      key={app.id}
                      onClick={() => openApplicant(app)}
                      className={`border-b border-white/5 hover:bg-white/2 cursor-pointer transition-colors ${selected?.id === app.id ? 'bg-[#FF6500]/5' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 font-bold text-xs flex-shrink-0">{app.name[0]}</div>
                          <div>
                            <div className="text-white text-xs font-medium">{app.name}</div>
                            <div className="text-white/25 text-[9px] font-mono">{app.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs font-mono">{app.city || '—'}</td>
                      <td className="px-4 py-3 text-white/40 text-xs font-mono">{app.education?.substring(0, 16) || '—'}</td>
                      <td className="px-4 py-3 text-white/40 text-[10px] font-mono capitalize">{app.source || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${STAGE_COLOR[app.stage]}`}>
                          {STAGE_LABEL[app.stage]}
                        </span>
                        {app.ban_until && new Date(app.ban_until) > new Date() && (
                          <span className="ml-1 text-[9px] font-mono text-red-400">🚫 Banned</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {computeTotal(app) > 0 ? (
                          <span className={`text-xs font-mono font-bold ${computeTotal(app) >= 75 ? 'text-green-400' : computeTotal(app) >= 55 ? 'text-amber-400' : 'text-red-400'}`}>
                            {computeTotal(app)}/100
                          </span>
                        ) : (
                          <span className="text-white/20 text-xs font-mono">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/25 text-[9px] font-mono">
                        {new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={e => { e.stopPropagation(); openApplicant(app) }} className="text-[#FF6500] text-xs font-mono hover:underline">Open</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filtered.length && (
                <div className="text-center py-16 text-white/20 font-mono text-sm">
                  {search ? `No applicants matching "${search}"` : 'No applicants in this stage'}
                </div>
              )}
            </div>
          </div>

          {/* Applicant detail panel */}
          {selected && (
            <div className="w-80 bg-[#0D1117] border-l border-white/6 flex flex-col overflow-hidden flex-shrink-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                <div>
                  <div className="text-white font-bold text-sm">{selected.name}</div>
                  <div className="text-white/30 text-[10px] font-mono">{selected.occupation}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white text-lg">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Stage */}
                <div>
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-1.5">Stage</div>
                  <select value={selected.stage} onChange={e => moveStage(e.target.value)} className={inputCls}>
                    {APP_STAGES.map(s => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
                  </select>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  {[
                    { l: 'Phone', v: selected.phone },
                    { l: 'Email', v: selected.email },
                    { l: 'City', v: selected.city || '—' },
                    { l: 'Education', v: selected.education || '—' },
                    { l: 'Source', v: selected.source || '—' },
                  ].map(f => (
                    <div key={f.l}>
                      <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest">{f.l}</div>
                      <div className="text-white/60 text-xs">{f.v}</div>
                    </div>
                  ))}
                </div>

                {/* Why join */}
                {selected.why_join && (
                  <div>
                    <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-1">Why Super 30</div>
                    <div className="text-white/50 text-xs leading-relaxed bg-white/3 rounded-lg p-2">{selected.why_join}</div>
                  </div>
                )}

                {/* Score entry */}
                <div>
                  <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest mb-2">Score Entry</div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <div className="text-[9px] font-mono text-white/20 mb-1">Academic (0-100)</div>
                      <input type="number" min={0} max={100} value={scores.acad} onChange={e => setScores(s => ({ ...s, acad: +e.target.value }))} className={numInputCls} />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-white/20 mb-1">Interview (0-100)</div>
                      <input type="number" min={0} max={100} value={scores.interview} onChange={e => setScores(s => ({ ...s, interview: +e.target.value }))} className={numInputCls} />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-white/20 mb-1">Motivation (0-100)</div>
                      <input type="number" min={0} max={100} value={scores.motivation} onChange={e => setScores(s => ({ ...s, motivation: +e.target.value }))} className={numInputCls} />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-white/20 mb-1">Psychometric</div>
                      <input type="number" min={0} max={100} value={scores.psych} onChange={e => setScores(s => ({ ...s, psych: +e.target.value }))} className={numInputCls} />
                    </div>
                  </div>

                  {/* RAPD */}
                  <div className="text-[9px] font-mono text-white/20 mb-1.5">RAPD Dimensions (0-20 each)</div>
                  <div className="grid grid-cols-5 gap-1 mb-3">
                    {(['r', 'a', 'p', 'd', 's'] as const).map(dim => (
                      <div key={dim}>
                        <div className="text-[9px] font-mono text-white/20 text-center uppercase mb-1">{dim}</div>
                        <input type="number" min={0} max={20} value={scores[dim]} onChange={e => setScores(s => ({ ...s, [dim]: +e.target.value }))} className={numInputCls + ' text-[10px]'} />
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[9px] font-mono text-white/25 uppercase tracking-widest">Weighted Total</div>
                    <div className={`font-black text-2xl ${totalScore() >= 75 ? 'text-green-400' : totalScore() >= 55 ? 'text-amber-400' : 'text-red-400'}`}>
                      {totalScore()}<span className="text-white/20 text-sm">/100</span>
                    </div>
                  </div>

                  <button onClick={saveScores} disabled={saving} className="w-full bg-[#FF6500] text-white font-bold text-xs py-2 rounded-lg hover:bg-[#E05800] disabled:opacity-40 transition-colors">
                    {saving ? 'Saving…' : 'Save Scores'}
                  </button>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button onClick={selectApplicant} disabled={saving} className="w-full bg-green-500/15 border border-green-500/25 text-green-400 font-bold text-xs py-2 rounded-lg hover:bg-green-500/25 disabled:opacity-40 transition-colors">
                    ✅ Mark as Selected
                  </button>
                  <button onClick={() => genOfferLetter(selected)} className="w-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs py-2 rounded-lg hover:bg-blue-500/20 transition-colors">
                    📄 Generate Offer Letter
                  </button>
                  <button onClick={banApplicant} disabled={saving} className="w-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs py-2 rounded-lg hover:bg-red-500/20 disabled:opacity-40 transition-colors">
                    🚫 Apply 1-Year Ban
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── MERIT LIST VIEW ── */}
      {view === 'merit' && (
        <div className="flex-1 overflow-y-auto p-5">
          <div className="bg-[#111827] border border-white/7 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
              <div>
                <div className="text-white font-bold">Merit List — {batches.find(b => b.id === selectedBatch)?.name || 'All Batches'}</div>
                <div className="text-white/30 text-xs font-mono">{meritList.length} candidates · auto-ranked by weighted score</div>
              </div>
              <button
                onClick={() => {
                  const csv = ['Rank,Name,Phone,City,Academic,Psychometric,Interview,Motivation,Total\n',
                    ...meritList.map((a, i) => `${i + 1},"${a.name}",${a.phone},"${a.city || ''}",${a.score_academic},${a.score_psychometric},${a.score_interview},${a.score_motivation},${computeTotal(a)}`)
                  ].join('\n')
                  const el = document.createElement('a')
                  el.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
                  el.download = 'merit-list.csv'
                  el.click()
                }}
                className="bg-white/8 text-white/60 text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-white/12 transition-colors"
              >
                📊 Export CSV
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  {['Rank', 'Name', 'City', 'Academic', 'Psychometric', 'Interview', 'Motivation', 'Total', 'Stage', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[9px] font-mono text-white/25 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meritList.map((app, i) => {
                  const total = computeTotal(app)
                  const rankStyle = i === 0 ? 'bg-amber-500 text-white' : i === 1 ? 'bg-white/20 text-white' : i === 2 ? 'bg-amber-700/40 text-amber-600' : 'bg-white/5 text-white/30'
                  return (
                    <tr key={app.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${rankStyle}`}>
                          {i + 1}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white font-medium text-xs">{app.name}</div>
                        <div className="text-white/25 text-[9px] font-mono">{app.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs font-mono">{app.city || '—'}</td>
                      {[app.score_academic, app.score_psychometric, app.score_interview, app.score_motivation].map((s, j) => (
                        <td key={j} className="px-4 py-3 text-white/50 text-xs font-mono">{s}</td>
                      ))}
                      <td className="px-4 py-3">
                        <span className={`font-black text-sm ${total >= 75 ? 'text-green-400' : total >= 55 ? 'text-amber-400' : 'text-red-400'}`}>
                          {total}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${STAGE_COLOR[app.stage]}`}>
                          {STAGE_LABEL[app.stage]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => genOfferLetter(app)} className="text-blue-400 text-[10px] font-mono hover:underline">Offer Letter</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {!meritList.length && (
              <div className="text-center py-16 text-white/20 font-mono text-sm">
                No scored applicants yet — add interview scores to see merit list
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BATCHES VIEW ── */}
      {view === 'batches' && (
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {batches.map(batch => {
              const apps = allApplicants.filter(a => a.batch_id === batch.id)
              const enrolled = apps.filter(a => a.stage === 'enrolled').length
              const pct = Math.round((enrolled / batch.seats) * 100)
              return (
                <div key={batch.id} className="bg-[#111827] border border-white/7 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-white font-bold text-sm leading-snug">{batch.name}</div>
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                      batch.status === 'accepting' ? 'bg-green-500/15 text-green-400' :
                      batch.status === 'completed' ? 'bg-white/10 text-white/30' :
                      'bg-blue-500/15 text-blue-400'
                    }`}>{batch.status}</span>
                  </div>
                  <div className="space-y-1.5 mb-4 text-xs text-white/40 font-mono">
                    <div>📅 {new Date(batch.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div>💰 ₹{batch.fee?.toLocaleString()}</div>
                    <div>📍 {batch.mode} · {batch.seats} seats</div>
                    <div>📋 {apps.length} applications</div>
                  </div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/30 font-mono">Enrolled</span>
                    <span className="text-[#FF6500] font-bold font-mono">{enrolled}/{batch.seats}</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6500] rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
