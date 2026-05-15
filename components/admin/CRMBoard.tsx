'use client'

import { useState, useTransition } from 'react'

type Lead = {
  id: string; name: string; phone: string; email?: string; business?: string
  city?: string; source: string; service_interest?: string; message?: string
  stage?: string; score?: number; deal_value?: number; follow_up_date?: string
  created_at: string; utm_source?: string; utm_campaign?: string
}

const STAGES = ['new','contacted','qualified','proposal','negotiation','won','lost']
const STAGE_LABELS: Record<string,string> = {
  new:'New Lead', contacted:'Contacted', qualified:'Qualified',
  proposal:'Proposal Sent', negotiation:'Negotiation', won:'Won', lost:'Lost'
}
const STAGE_COLORS: Record<string,string> = {
  new:'#2563EB', contacted:'#7C3AED', qualified:'#FF6500',
  proposal:'#D97706', negotiation:'#EA580C', won:'#16A34A', lost:'#DC2626'
}
const SOURCE_ICONS: Record<string,string> = {
  'google-ads':'📊', 'meta-ads':'📱', 'organic':'🌱', 'whatsapp':'💬',
  'referral':'👥', 'direct':'🌐', default:'📋'
}

async function moveStage(leadId: string, newStage: string) {
  await fetch('/api/admin/leads/stage', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: leadId, stage: newStage })
  })
}

async function addActivity(leadId: string, type: string, content: string) {
  await fetch('/api/admin/leads/activity', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lead_id: leadId, type, content })
  })
}

function ScoreBar({ score = 50 }: { score?: number }) {
  const color = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626'
  return (
    <div className="h-1 rounded-full bg-[#E8E3DA] overflow-hidden mt-1">
      <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
    </div>
  )
}

function LeadCard({ lead, onSelect, onMove }: { lead: Lead; onSelect: (l: Lead) => void; onMove: (id: string, stage: string) => void }) {
  const stageIdx = STAGES.indexOf(lead.stage || 'new')
  const overdue = lead.follow_up_date && new Date(lead.follow_up_date) < new Date()
  const srcIcon = SOURCE_ICONS[lead.source] || SOURCE_ICONS.default
  const daysInStage = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / 86400000)

  return (
    <div className="bg-white border border-[#E8E3DA] rounded-xl p-3 cursor-pointer hover:shadow-md hover:border-[#FF6500]/30 transition-all group"
      onClick={() => onSelect(lead)}>
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#1A1410] truncate">{lead.name}</p>
          {lead.business && <p className="text-[10px] text-[#9C9189] truncate">{lead.business}</p>}
        </div>
        <span className="text-base ml-1 shrink-0">{srcIcon}</span>
      </div>
      {lead.service_interest && (
        <span className="inline-block text-[10px] font-mono px-1.5 py-0.5 rounded text-[#FF6500] bg-[rgba(255,101,0,0.08)] mb-2">
          {lead.service_interest}
        </span>
      )}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#9C9189] mb-1.5">
        <span>{lead.city || '—'}</span>
        <span className={overdue ? 'text-red-500 font-bold' : ''}>
          {lead.follow_up_date ? new Date(lead.follow_up_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : `${daysInStage}d`}
        </span>
      </div>
      {lead.deal_value ? (
        <p className="text-[10px] font-mono font-bold text-[#FF6500] mb-1.5">₹{(lead.deal_value/1000).toFixed(0)}K/mo</p>
      ) : null}
      <ScoreBar score={lead.score} />
      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          {stageIdx > 0 && (
            <button onClick={e => { e.stopPropagation(); onMove(lead.id, STAGES[stageIdx - 1]) }}
              className="w-6 h-6 rounded-lg bg-[#F7F4EF] text-[#9C9189] hover:text-[#1A1410] text-xs flex items-center justify-center">←</button>
          )}
          {stageIdx < STAGES.length - 1 && (
            <button onClick={e => { e.stopPropagation(); onMove(lead.id, STAGES[stageIdx + 1]) }}
              className="w-6 h-6 rounded-lg bg-[#F7F4EF] text-[#9C9189] hover:text-[#1A1410] text-xs flex items-center justify-center">→</button>
          )}
        </div>
        <a href={`https://wa.me/${lead.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs text-green-600 bg-green-50 hover:bg-green-100">💬</a>
      </div>
    </div>
  )
}

function DetailPanel({ lead, onClose, onStageChange }: { lead: Lead; onClose: () => void; onStageChange: (id: string, stage: string) => void }) {
  const [actType, setActType] = useState('Note')
  const [actText, setActText] = useState('')
  const [saving, startSaving] = useTransition()

  const proposal = `Hi ${lead.name},

Thank you for your interest in Scalify Labs.

Based on our conversation, here is our proposal for ${lead.service_interest || 'digital marketing services'}:

✅ Monthly Retainer: ₹${lead.deal_value?.toLocaleString() || '15,000'}/month
✅ Services: ${lead.service_interest || 'SEO + Google Ads + Content'}
✅ Duration: 3-month minimum engagement
✅ Reporting: Weekly + Monthly

Ready to start? Reply YES to proceed.

— Arvind Gupta | Scalify Labs
+91 87884 24727`

  const waMsg = `Hi ${lead.name}! This is Arvind from Scalify Labs 🚀\n\nThanks for your enquiry about ${lead.service_interest || 'digital marketing'}. I'd love to understand your goals better.\n\nWhen would be a good time for a quick 15-min call?\n\n— Arvind | +91 87884 24727`

  async function saveActivity() {
    if (!actText.trim()) return
    startSaving(async () => {
      await addActivity(lead.id, actType, actText)
      setActText('')
    })
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-[#E8E3DA] shadow-2xl z-50 flex flex-col" style={{ top: 52 }}>
      {/* Header */}
      <div className="p-5 border-b border-[#E8E3DA] flex items-start justify-between">
        <div>
          <h2 className="font-black text-lg text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>{lead.name}</h2>
          {lead.business && <p className="text-sm text-[#9C9189]">{lead.business}</p>}
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#F7F4EF] text-[#9C9189] hover:text-[#1A1410] flex items-center justify-center">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Contact info */}
        <div className="space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">Contact</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-[10px] font-mono text-[#9C9189]">Phone</span><p className="font-mono text-[#1A1410]">{lead.phone}</p></div>
            <div><span className="text-[10px] font-mono text-[#9C9189]">City</span><p className="text-[#1A1410]">{lead.city || '—'}</p></div>
            <div><span className="text-[10px] font-mono text-[#9C9189]">Email</span><p className="text-[#1A1410] truncate">{lead.email || '—'}</p></div>
            <div><span className="text-[10px] font-mono text-[#9C9189]">Source</span><p className="text-[#1A1410]">{lead.source}</p></div>
          </div>
        </div>

        {/* Service + Score */}
        <div className="flex gap-3">
          {lead.service_interest && (
            <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-[rgba(255,101,0,0.08)] text-[#FF6500]">
              {lead.service_interest}
            </span>
          )}
          {lead.deal_value ? (
            <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-[rgba(22,163,74,0.08)] text-[#16A34A]">
              ₹{lead.deal_value.toLocaleString()}/mo
            </span>
          ) : null}
        </div>

        {/* Score bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-mono text-[#9C9189]">Lead Score</span>
            <span className="font-bold text-[#1A1410]">{lead.score ?? 50}/100</span>
          </div>
          <ScoreBar score={lead.score} />
        </div>

        {/* Stage */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-2">Move Stage</p>
          <div className="flex flex-wrap gap-1.5">
            {STAGES.map(s => (
              <button key={s} onClick={() => onStageChange(lead.id, s)}
                className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-all"
                style={{
                  background: lead.stage === s ? STAGE_COLORS[s] + '15' : 'transparent',
                  color: lead.stage === s ? STAGE_COLORS[s] : '#9C9189',
                  borderColor: lead.stage === s ? STAGE_COLORS[s] + '40' : '#E8E3DA',
                  fontWeight: lead.stage === s ? 700 : 400,
                }}>
                {STAGE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        {lead.message && (
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-1">Message</p>
            <p className="text-sm text-[#57534E] bg-[#F7F4EF] rounded-lg p-3">{lead.message}</p>
          </div>
        )}

        {/* Activity Logger */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-2">Add Activity</p>
          <div className="flex gap-1.5 mb-2">
            {['Note','Call','Email','Meeting','WhatsApp'].map(t => (
              <button key={t} onClick={() => setActType(t)}
                className="text-[10px] px-2 py-1 rounded-lg border transition-colors font-mono"
                style={{ background: actType === t ? '#FF6500' : '#F7F4EF', color: actType === t ? 'white' : '#57534E', borderColor: '#E8E3DA' }}>
                {t}
              </button>
            ))}
          </div>
          <textarea rows={3} value={actText} onChange={e => setActText(e.target.value)}
            placeholder={`Add ${actType} note…`}
            className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-sm p-3 resize-none focus:outline-none focus:border-[#FF6500] focus:ring-2 focus:ring-[rgba(255,101,0,0.1)]" />
          <button onClick={saveActivity} disabled={saving || !actText.trim()}
            className="mt-2 w-full py-2 rounded-lg bg-[#FF6500] text-white text-sm font-bold hover:bg-[#E05800] transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Activity'}
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 border-t border-[#E8E3DA] space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { navigator.clipboard.writeText(proposal) }}
            className="py-2 rounded-lg text-xs font-semibold bg-[#F7F4EF] text-[#57534E] border border-[#E8E3DA] hover:bg-[#F0ECE4] transition-colors">
            📋 Copy Proposal
          </button>
          <a href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`}
            target="_blank" rel="noopener noreferrer"
            className="py-2 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-100 hover:bg-green-100 transition-colors text-center">
            💬 Open WhatsApp
          </a>
        </div>
        <button
          onClick={() => onStageChange(lead.id, 'won')}
          className="w-full py-2 rounded-lg text-xs font-semibold bg-[rgba(22,163,74,0.08)] text-[#16A34A] border border-[rgba(22,163,74,0.2)] hover:bg-[rgba(22,163,74,0.15)] transition-colors">
          🏆 Mark as Won
        </button>
      </div>
    </div>
  )
}

export function CRMBoard({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [search, setSearch] = useState('')
  const [filterSource, setFilterSource] = useState('all')

  const filtered = leads.filter(l => {
    const matchSearch = !search ||
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.business?.toLowerCase().includes(search.toLowerCase())
    const matchSource = filterSource === 'all' || l.source === filterSource
    return matchSearch && matchSource
  })

  function handleMove(id: string, stage: string) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, stage } : null)
    moveStage(id, stage).catch(console.error)
  }

  const sources = [...new Set(leads.map(l => l.source).filter(Boolean))]
  const pipelineValue = leads.filter(l => l.stage !== 'lost').reduce((s, l) => s + (l.deal_value || 0), 0)
  const hotLeads = leads.filter(l => (l.score ?? 0) >= 80 && l.stage !== 'won' && l.stage !== 'lost')

  return (
    <div className="flex h-full bg-[#F7F4EF]">
      {/* Board */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="px-5 py-3 bg-white border-b border-[#E8E3DA] flex items-center gap-3">
          <h1 className="text-lg font-black text-[#1A1410] mr-2" style={{ fontFamily: 'Syne, sans-serif' }}>CRM Pipeline</h1>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search leads…"
            className="flex-1 max-w-xs bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:border-[#FF6500]" />
          <select value={filterSource} onChange={e => setFilterSource(e.target.value)}
            className="text-xs bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg px-3 py-1.5 text-[#57534E] focus:outline-none">
            <option value="all">All Sources</option>
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-widest">Pipeline</p>
              <p className="text-sm font-black text-[#FF6500]">₹{Math.round(pipelineValue / 1000)}K/mo</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-[#9C9189] uppercase tracking-widest">Hot Leads</p>
              <p className="text-sm font-black text-[#16A34A]">{hotLeads.length}</p>
            </div>
          </div>
        </div>

        {/* Kanban columns */}
        <div className="flex-1 overflow-x-auto p-4">
          <div className="flex gap-3 h-full" style={{ minWidth: `${STAGES.length * 240}px` }}>
            {STAGES.map(stage => {
              const stageLeads = filtered.filter(l => (l.stage || 'new') === stage)
              const stageValue = stageLeads.reduce((s, l) => s + (l.deal_value || 0), 0)
              return (
                <div key={stage} className="w-56 flex-shrink-0 flex flex-col">
                  {/* Column header */}
                  <div className="mb-2 px-3 py-2 rounded-lg" style={{ background: STAGE_COLORS[stage] + '10' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: STAGE_COLORS[stage] }}>{STAGE_LABELS[stage]}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: STAGE_COLORS[stage] }}>
                        {stageLeads.length}
                      </span>
                    </div>
                    {stageValue > 0 && (
                      <p className="text-[10px] font-mono text-[#9C9189] mt-0.5">₹{Math.round(stageValue / 1000)}K/mo</p>
                    )}
                  </div>
                  {/* Cards */}
                  <div className="flex-1 space-y-2 overflow-y-auto pr-0.5">
                    {stageLeads.map(l => (
                      <LeadCard key={l.id} lead={l} onSelect={setSelected} onMove={handleMove} />
                    ))}
                    {!stageLeads.length && (
                      <div className="border-2 border-dashed border-[#E8E3DA] rounded-xl p-4 text-center">
                        <p className="text-[10px] font-mono text-[#9C9189]">No leads</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/10 z-40" onClick={() => setSelected(null)} />
          <DetailPanel lead={selected} onClose={() => setSelected(null)} onStageChange={handleMove} />
        </>
      )}
    </div>
  )
}
