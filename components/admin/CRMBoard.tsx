'use client'

import { useState } from 'react'
import { updateLead, addLeadActivity, submitLead } from '@/lib/actions'
import type { Lead } from '@/types/database'

const STAGES = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] as const
const STAGE_LABEL: Record<string, string> = {
  new: 'New Lead', contacted: 'Contacted', qualified: 'Qualified',
  proposal: 'Proposal Sent', negotiation: 'Negotiation', won: '✅ Won', lost: '❌ Lost',
}
const STAGE_COLOR: Record<string, string> = {
  new: 'border-blue-500/40', contacted: 'border-purple-500/40', qualified: 'border-teal-500/40',
  proposal: 'border-amber-500/40', negotiation: 'border-orange-500/40', won: 'border-green-500/40', lost: 'border-red-500/40',
}
const STAGE_DOT: Record<string, string> = {
  new: 'bg-blue-400', contacted: 'bg-purple-400', qualified: 'bg-teal-400',
  proposal: 'bg-amber-400', negotiation: 'bg-orange-400', won: 'bg-green-400', lost: 'bg-red-400',
}
const BUDGET_LABEL: Record<string, string> = {
  '5-10k': '₹5K–10K/mo', '10-20k': '₹10K–20K/mo', '20-50k': '₹20K–50K/mo', '50k+': '₹50K+/mo'
}
const BUDGET_MID: Record<string, number> = { '5-10k': 7500, '10-20k': 15000, '20-50k': 35000, '50k+': 75000 }

interface Props {
  initialLeads: Lead[]
  summary: { stage: string; count: number }[]
  totalPipeline: number
}

export function CRMBoard({ initialLeads, summary, totalPipeline }: Props) {
  const [leads, setLeads] = useState(initialLeads)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [noteText, setNoteText] = useState('')
  const [noteType, setNoteType] = useState<'note' | 'call' | 'email' | 'meeting'>('note')
  const [showNewLead, setShowNewLead] = useState(false)
  const [newLead, setNewLead] = useState({ name: '', phone: '', business: '', city: 'Ranchi', source: 'direct', service_interest: 'SEO Services', budget: '' })
  const [saving, setSaving] = useState(false)
  const [sourceFilter, setSourceFilter] = useState('all')

  const filtered = sourceFilter === 'all' ? leads : leads.filter(l => l.source?.toLowerCase().includes(sourceFilter))

  async function moveStage(id: string, newStage: Lead['stage']) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage: newStage } : l))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, stage: newStage } : null)
    await updateLead(id, { stage: newStage })
    await addLeadActivity({ lead_id: id, type: 'stage_change', content: `Stage changed to: ${STAGE_LABEL[newStage]}` })
  }

  async function addNote() {
    if (!selected || !noteText.trim()) return
    setSaving(true)
    await addLeadActivity({ lead_id: selected.id, type: noteType, content: noteText.trim() })
    setNoteText('')
    setSaving(false)
  }

  async function saveNewLead() {
    if (!newLead.name || !newLead.phone) return
    setSaving(true)
    await submitLead({ ...newLead, source: newLead.source })
    setShowNewLead(false)
    setNewLead({ name: '', phone: '', business: '', city: 'Ranchi', source: 'direct', service_interest: 'SEO Services', budget: '' })
    setSaving(false)
    window.location.reload()
  }

  function scoreColor(score: number) {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const won = leads.filter(l => l.stage === 'won').length
  const convRate = leads.length ? Math.round((won / leads.length) * 100) : 0

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"

  return (
    <div className="flex h-full">
      {/* Main pipeline */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/6 flex items-center gap-4 flex-wrap bg-[#0D1117]">
          <div>
            <h1 className="text-white font-black text-xl tracking-tight">CRM Pipeline</h1>
            <p className="text-white/30 text-xs font-mono mt-0.5">{leads.length} leads · ₹{(totalPipeline / 1000).toFixed(0)}K pipeline · {convRate}% conversion</p>
          </div>
          <div className="flex gap-2 ml-auto flex-wrap">
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg text-white/50 text-xs font-mono px-3 py-2 outline-none"
            >
              <option value="all">All Sources</option>
              {['website', 'whatsapp', 'referral', 'facebook', 'google', 'instagram', 'event'].map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <button
              onClick={() => setShowNewLead(true)}
              className="bg-[#FF6500] text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#E05800] transition-colors"
            >
              + New Lead
            </button>
          </div>
        </div>

        {/* Kanban */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-3 h-full p-4 min-w-max">
            {STAGES.map(stage => {
              const cards = filtered.filter(l => l.stage === stage)
              const stageVal = cards.reduce((s, l) => s + (BUDGET_MID[l.budget || ''] || 0), 0)
              return (
                <div key={stage} className={`w-56 flex-shrink-0 flex flex-col border-t-2 ${STAGE_COLOR[stage]}`}>
                  <div className="flex items-center justify-between px-2 py-2 mb-2">
                    <div>
                      <div className="text-white/80 font-bold text-xs">{STAGE_LABEL[stage]}</div>
                      <div className="text-white/25 text-[10px] font-mono">₹{(stageVal / 1000).toFixed(0)}K pipeline</div>
                    </div>
                    <span className="bg-white/8 text-white/40 font-mono text-[10px] px-1.5 py-0.5 rounded-full">{cards.length}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pb-2">
                    {cards.map(lead => (
                      <div
                        key={lead.id}
                        onClick={() => setSelected(lead)}
                        className={`bg-[#111827] border border-white/8 rounded-xl p-3 cursor-pointer hover:border-[#FF6500]/40 transition-all ${selected?.id === lead.id ? 'border-[#FF6500]/50 bg-[#FF6500]/5' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="text-white font-semibold text-xs leading-snug">{lead.name}</div>
                          <span className={`text-[10px] font-mono font-bold ${scoreColor(lead.score || 50)}`}>{lead.score}</span>
                        </div>
                        <div className="text-white/35 text-[10px] font-mono mb-2 truncate">{lead.business}</div>
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                          {lead.budget && (
                            <span className="bg-[#FF6500]/10 text-[#FF6500] text-[9px] font-mono px-1.5 py-0.5 rounded">
                              {BUDGET_LABEL[lead.budget]}
                            </span>
                          )}
                          <span className="text-white/25 text-[9px] font-mono">{lead.source}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {STAGES.indexOf(stage) > 0 && (
                              <button
                                onClick={e => { e.stopPropagation(); moveStage(lead.id, STAGES[STAGES.indexOf(stage) - 1] as Lead['stage']) }}
                                className="text-white/20 hover:text-white/60 text-xs px-1"
                              >←</button>
                            )}
                            {STAGES.indexOf(stage) < STAGES.length - 1 && (
                              <button
                                onClick={e => { e.stopPropagation(); moveStage(lead.id, STAGES[STAGES.indexOf(stage) + 1] as Lead['stage']) }}
                                className="text-white/20 hover:text-white/60 text-xs px-1"
                              >→</button>
                            )}
                          </div>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              const msg = `Hi ${lead.name.split(' ')[0]}! 👋\n\nMain Arvind Gupta hoon, Scalify Labs se. ${lead.service_interest || 'Digital marketing'} ke baare mein baat karni thi. Kya aap free hain?\n\n— Arvind, Scalify Labs`
                              window.open(`https://wa.me/${lead.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
                            }}
                            className="text-green-400/50 hover:text-green-400 text-xs transition-colors"
                          >💬</button>
                        </div>
                      </div>
                    ))}

                    <div
                      onClick={() => setShowNewLead(true)}
                      className="border border-dashed border-white/10 rounded-xl p-2 text-white/20 text-xs text-center cursor-pointer hover:border-white/20 hover:text-white/30 transition-all font-mono"
                    >
                      + add
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lead Detail Panel */}
      {selected && (
        <div className="w-80 bg-[#0D1117] border-l border-white/6 flex flex-col overflow-hidden flex-shrink-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
            <div className="font-bold text-white text-sm">{selected.name}</div>
            <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white text-lg">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Info */}
            <div className="space-y-2">
              {[
                { label: 'Phone', value: selected.phone, icon: '📞' },
                { label: 'Email', value: selected.email || '—', icon: '📧' },
                { label: 'Business', value: selected.business || '—', icon: '🏢' },
                { label: 'City', value: selected.city || '—', icon: '📍' },
                { label: 'Service', value: selected.service_interest || '—', icon: '🎯' },
                { label: 'Source', value: selected.source, icon: '📌' },
                { label: 'Budget', value: BUDGET_LABEL[selected.budget || ''] || 'Not set', icon: '💰' },
              ].map(f => (
                <div key={f.label} className="flex gap-2 items-start">
                  <span className="text-sm w-5 text-center flex-shrink-0">{f.icon}</span>
                  <div>
                    <div className="text-white/25 text-[9px] font-mono uppercase tracking-wider">{f.label}</div>
                    <div className="text-white/70 text-xs">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stage */}
            <div>
              <div className="text-white/25 text-[9px] font-mono uppercase tracking-wider mb-1.5">Move Stage</div>
              <select
                value={selected.stage}
                onChange={e => moveStage(selected.id, e.target.value as Lead['stage'])}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-3 py-2 outline-none"
              >
                {STAGES.map(s => <option key={s} value={s}>{STAGE_LABEL[s]}</option>)}
              </select>
            </div>

            {/* Score */}
            <div>
              <div className="text-white/25 text-[9px] font-mono uppercase tracking-wider mb-1.5">Lead Score</div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-2xl ${scoreColor(selected.score || 50)}`}>{selected.score || 50}</span>
                <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${(selected.score || 50) >= 80 ? 'bg-green-400' : (selected.score || 50) >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                    style={{ width: `${selected.score || 50}%` }}
                  />
                </div>
                <span className="text-white/25 text-[10px] font-mono">/100</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const msg = `Hi ${selected.name.split(' ')[0]}! 👋\n\nMain Arvind Gupta hoon, Scalify Labs se. Aapke saath ${selected.service_interest} ke baare mein baat karni thi.\n\n— Arvind`
                  window.open(`https://wa.me/${selected.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank')
                }}
                className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono py-2 rounded-lg hover:bg-green-500/20 transition-colors"
              >
                💬 WhatsApp
              </button>
              <button
                onClick={() => {
                  const p = `DIGITAL MARKETING PROPOSAL\n${'='.repeat(32)}\nFor: ${selected.business || selected.name}\nContact: ${selected.phone}\nService: ${selected.service_interest}\nDate: ${new Date().toLocaleDateString()}\nBy: Arvind Gupta, Scalify Labs`
                  navigator.clipboard.writeText(p)
                }}
                className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
              >
                📄 Copy Proposal
              </button>
            </div>

            {/* Add note */}
            <div>
              <div className="text-white/25 text-[9px] font-mono uppercase tracking-wider mb-2">Add Activity</div>
              <div className="flex gap-1 mb-2">
                {(['note', 'call', 'email', 'meeting'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setNoteType(t)}
                    className={`flex-1 text-[9px] font-mono py-1.5 rounded-lg transition-colors capitalize ${noteType === t ? 'bg-[#FF6500] text-white' : 'bg-white/5 text-white/30 hover:text-white/60'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                rows={3}
                placeholder="Add a note, call log, meeting summary…"
                className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] resize-none transition-colors mb-2"
              />
              <button
                onClick={addNote}
                disabled={saving || !noteText.trim()}
                className="w-full bg-[#FF6500] text-white font-bold text-xs py-2 rounded-lg hover:bg-[#E05800] disabled:opacity-30 transition-colors"
              >
                {saving ? 'Saving…' : 'Save Activity'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLead && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between mb-5">
              <div className="text-white font-bold text-base">New Lead</div>
              <button onClick={() => setShowNewLead(false)} className="text-white/30 hover:text-white">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Name *</div>
                <input value={newLead.name} onChange={e => setNewLead(f => ({ ...f, name: e.target.value }))} placeholder="Rajesh Sharma" className={inputCls} />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Phone *</div>
                <input value={newLead.phone} onChange={e => setNewLead(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" className={inputCls} />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Business</div>
                <input value={newLead.business} onChange={e => setNewLead(f => ({ ...f, business: e.target.value }))} placeholder="Business name" className={inputCls} />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">City</div>
                <input value={newLead.city} onChange={e => setNewLead(f => ({ ...f, city: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div className="mb-3">
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Source</div>
              <select value={newLead.source} onChange={e => setNewLead(f => ({ ...f, source: e.target.value }))} className={inputCls}>
                {['website', 'whatsapp', 'referral', 'facebook', 'google', 'instagram', 'event', 'cold-call', 'direct'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Service Interest</div>
              <select value={newLead.service_interest} onChange={e => setNewLead(f => ({ ...f, service_interest: e.target.value }))} className={inputCls}>
                {['SEO Services', 'Google Ads', 'Meta Ads', 'WhatsApp Marketing', 'Website Development', 'AI Systems', 'Full Package', 'Lead to Revenue'].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowNewLead(false)} className="flex-1 border border-white/10 text-white/40 text-xs font-mono py-2.5 rounded-xl hover:border-white/20 transition-colors">Cancel</button>
              <button onClick={saveNewLead} disabled={saving || !newLead.name || !newLead.phone} className="flex-1 bg-[#FF6500] text-white font-bold text-xs py-2.5 rounded-xl hover:bg-[#E05800] disabled:opacity-40 transition-colors">
                {saving ? 'Adding…' : 'Add to Pipeline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
