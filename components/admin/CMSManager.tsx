'use client'

import { useState } from 'react'
import { savePage } from '@/lib/actions'
import type { Page } from '@/types/database'

interface DefaultPage {
  title: string; slug: string; type: Page['type']; status: Page['status'];
  content: string; meta_title?: string; meta_description?: string;
}

interface Props {
  initialPages: Page[]
  defaultPages: DefaultPage[]
}

const TYPE_COLOR: Record<string, string> = {
  home: 'bg-[#FF6500]/15 text-[#FF6500]', service: 'bg-blue-500/15 text-blue-400',
  landing: 'bg-purple-500/15 text-purple-400', info: 'bg-teal-500/15 text-teal-400',
  course: 'bg-amber-500/15 text-amber-400',
}

const TYPE_ICON: Record<string, string> = {
  home: '🏠', service: '⚙️', landing: '🎯', info: 'ℹ️', course: '🎓'
}

export function CMSManager({ initialPages, defaultPages }: Props) {
  const [pages, setPages] = useState(initialPages)
  const [editing, setEditing] = useState<Page | null>(null)
  const [form, setForm] = useState({ title: '', content: '', meta_title: '', meta_description: '', slug: '', status: 'published' as Page['status'] })
  const [saving, setSaving] = useState(false)
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [typeFilter, setTypeFilter] = useState('all')
  const [search, setSearch] = useState('')

  function openPage(page: Page) {
    setEditing(page)
    setForm({
      title: page.title, content: page.content, meta_title: page.meta_title || '',
      meta_description: page.meta_description || '', slug: page.slug, status: page.status,
    })
    setMode('write')
  }

  async function save() {
    if (!editing && !form.title) return
    setSaving(true)
    try {
      await savePage({
        id: editing?.id,
        title: form.title, slug: form.slug, content: form.content,
        type: editing?.type || 'info', status: form.status,
        meta_title: form.meta_title, meta_description: form.meta_description,
      })
      setEditing(null)
      window.location.reload()
    } catch (e) {
      alert('Save failed: ' + (e instanceof Error ? e.message : 'Unknown'))
    }
    setSaving(false)
  }

  function mdToHTML(md: string) {
    return md
      .replace(/^## (.+)$/gm, '<h2 class="font-bold text-xl text-white mt-5 mb-2">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="font-semibold text-base text-white/80 mt-3 mb-1.5">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/^- (.+)$/gm, '<li class="text-white/60 ml-4 list-disc text-sm">$1</li>')
      .split('\n\n')
      .map(b => b.startsWith('<') ? b : `<p class="text-white/60 text-sm leading-relaxed mb-3">${b}</p>`)
      .join('\n')
  }

  const filtered = pages.filter(p => {
    const matchType = typeFilter === 'all' || p.type === typeFilter
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search)
    return matchType && matchSearch
  })

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
  const types = ['all', 'home', 'service', 'landing', 'info', 'course']

  // If editing, show full editor
  if (editing) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-[#0D1117] border-b border-white/6 flex items-center gap-3 px-5 py-3">
          <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white font-mono text-sm transition-colors">← Pages</button>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="flex-1 bg-transparent text-white font-black text-lg outline-none placeholder:text-white/20 tracking-tight"
          />
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Page['status'] }))}
            className="bg-white/6 border border-white/10 rounded-lg text-white/60 text-xs font-mono px-2 py-1.5 outline-none"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button onClick={() => setMode(m => m === 'write' ? 'preview' : 'write')} className="bg-white/6 text-white/50 text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
            {mode === 'write' ? 'Preview' : 'Edit'}
          </button>
          <button onClick={save} disabled={saving} className="bg-[#FF6500] text-white font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-[#E05800] disabled:opacity-40 transition-colors">
            {saving ? 'Saving…' : '✓ Save & Publish'}
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {mode === 'write' ? (
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Write your page content in Markdown…"
              className="flex-1 bg-[#0B0F1E] text-white/80 text-sm leading-relaxed p-8 outline-none resize-none font-mono"
            />
          ) : (
            <div className="flex-1 bg-[#0B0F1E] p-8 overflow-y-auto" dangerouslySetInnerHTML={{ __html: mdToHTML(form.content) }} />
          )}

          <div className="w-60 bg-[#0D1117] border-l border-white/6 p-4 overflow-y-auto flex-shrink-0">
            <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">Page Settings</div>
            <div className="space-y-3">
              <div>
                <div className="text-[9px] font-mono text-white/25 uppercase mb-1">URL Slug</div>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/25 uppercase mb-1">Meta Title (60 chars)</div>
                <input value={form.meta_title} onChange={e => setForm(f => ({ ...f, meta_title: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/25 uppercase mb-1">Meta Description (160)</div>
                <textarea value={form.meta_description} onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))} rows={4} className={inputCls + ' resize-none'} />
              </div>
              <div>
                <div className="text-[9px] font-mono text-white/25 uppercase mb-1">View on Site</div>
                <a href={form.slug} target="_blank" className="text-[#FF6500] text-[10px] font-mono hover:underline">
                  scalifylabs.com{form.slug} ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-white font-black text-xl tracking-tight mb-1">Pages (CMS)</h1>
          <p className="text-white/30 text-xs font-mono">Edit website pages — changes go live instantly</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search pages…"
          className="bg-[#111827] border border-white/8 rounded-lg text-white text-xs font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors w-48"
        />
        <div className="flex gap-1 bg-[#111827] border border-white/7 rounded-xl p-1">
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition-all ${typeFilter === t ? 'bg-[#FF6500] text-white' : 'text-white/30 hover:text-white'}`}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Pages grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(page => (
          <div key={page.id} className="bg-[#111827] border border-white/7 rounded-xl overflow-hidden hover:border-[#FF6500]/30 transition-all">
            {/* Thumb */}
            <div className="h-24 bg-[#0D1117] flex flex-col items-center justify-center gap-2 border-b border-white/6">
              <span className="text-3xl">{TYPE_ICON[page.type] || '📄'}</span>
              <span className="font-mono text-white/30 text-[10px]">{page.slug}</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="text-white font-bold text-sm">{page.title}</div>
                <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${TYPE_COLOR[page.type]}`}>
                  {page.type}
                </span>
              </div>
              <div className="text-white/30 text-[10px] font-mono mb-4 line-clamp-2">
                {page.content.replace(/[#*\n]/g, ' ').substring(0, 80)}…
              </div>
              <div className="flex gap-2">
                <button onClick={() => openPage(page)} className="flex-1 bg-[#FF6500]/10 border border-[#FF6500]/20 text-[#FF6500] text-xs font-mono py-1.5 rounded-lg hover:bg-[#FF6500]/20 transition-colors">
                  Edit
                </button>
                <a href={page.slug} target="_blank" className="bg-white/5 border border-white/10 text-white/40 text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="col-span-3 text-center py-16 text-white/20 font-mono text-sm">No pages found</div>
        )}
      </div>
    </div>
  )
}
