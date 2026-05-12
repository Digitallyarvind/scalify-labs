'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { savePost } from '@/lib/actions'
import type { Post } from '@/types/database'

const CATEGORIES = ['SEO', 'Google Ads', 'Meta Ads', 'WhatsApp Marketing', 'Digital Marketing', 'AI Tools', 'Case Studies']

interface Props { post: Post | null }

export function BlogEditor({ post }: Props) {
  const router = useRouter()
  const taRef = useRef<HTMLTextAreaElement>(null)
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const [saving, setSaving] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')
  const [showAI, setShowAI] = useState(false)
  const [aiType, setAiType] = useState('expand')
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    category: post?.category || 'Digital Marketing',
    tags: post?.tags?.join(', ') || '',
    status: post?.status || 'draft' as 'draft' | 'published' | 'scheduled',
    meta_title: post?.meta_title || '',
    meta_description: post?.meta_description || '',
    slug: post?.slug || '',
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    // Auto-generate slug from title
    if (field === 'title' && !post) {
      setForm(f => ({
        ...f,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        meta_title: value,
      }))
    }
  }

  function insertFmt(before: string, after = '') {
    const ta = taRef.current
    if (!ta) return
    const s = ta.selectionStart, e = ta.selectionEnd
    const sel = ta.value.substring(s, e)
    const newVal = ta.value.substring(0, s) + before + sel + after + ta.value.substring(e)
    setForm(f => ({ ...f, content: newVal }))
    setTimeout(() => { ta.selectionStart = s + before.length; ta.selectionEnd = s + before.length + sel.length; ta.focus() }, 0)
  }

  function wc() {
    return (form.content || '').split(/\s+/).filter(Boolean).length
  }

  function seoScore() {
    let score = 0
    if (form.meta_title.length >= 30 && form.meta_title.length <= 60) score += 25
    else if (form.meta_title.length > 0) score += 10
    if (form.meta_description.length >= 100 && form.meta_description.length <= 160) score += 25
    else if (form.meta_description.length > 0) score += 10
    if (form.slug.length > 0) score += 15
    if (wc() >= 1000) score += 20
    else if (wc() >= 300) score += 10
    if (form.content.includes('## ')) score += 10
    if (form.excerpt.length > 0) score += 5
    return score
  }

  function mdToHTML(md: string) {
    return md
      .replace(/^## (.+)$/gm, '<h2 class="font-black text-xl text-white mt-6 mb-2">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="font-bold text-base text-white/80 mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li class="text-white/60 ml-4 list-disc text-sm">$1</li>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-[#FF6500] pl-3 text-white/40 italic my-3">$1</blockquote>')
      .replace(/^---$/gm, '<hr class="border-white/10 my-4">')
      .split('\n\n')
      .map(b => b.startsWith('<') ? b : `<p class="text-white/60 text-sm leading-relaxed mb-3">${b}</p>`)
      .join('\n')
  }

  async function runAI() {
    const apiKey = localStorage.getItem('sl_api_key') || prompt('Enter your Anthropic API key:')
    if (!apiKey) return
    localStorage.setItem('sl_api_key', apiKey)
    setAiLoading(true)
    setAiResult('')

    const prompts: Record<string, string> = {
      expand: `Expand this blog post with more depth, examples, and detail. Keep the same style.\n\nTitle: "${form.title}"\n\nDraft:\n${form.content}`,
      intro: `Write a compelling 150-word introduction for a blog post titled "${form.title}". Target: Indian small business owners. Tone: professional yet conversational.`,
      conclusion: `Write a strong 100-word conclusion for this blog post titled "${form.title}". Include a CTA to contact Scalify Labs (scalifylabs.com).`,
      faq: `Generate a 5-question FAQ section for a blog post titled "${form.title}". Format: Q: ... A: ...`,
      outline: `Create a detailed H2/H3 outline for a 2000-word blog post titled "${form.title}". Include key points per section. Target: Indian SMB audience.`,
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1500,
          messages: [{ role: 'user', content: prompts[aiType] || prompts.expand }],
        }),
      })
      const data = await res.json()
      setAiResult(data.content?.[0]?.text || 'No response')
    } catch {
      setAiResult('Error — check your API key')
    }
    setAiLoading(false)
  }

  async function save(status: 'draft' | 'published') {
    setSaving(true)
    try {
      await savePost({
        id: post?.id,
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt || form.content.replace(/[#*\n]/g, '').substring(0, 160),
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        status,
        meta_title: form.meta_title || form.title,
        meta_description: form.meta_description,
      })
      router.push('/admin/blog')
      router.refresh()
    } catch (e) {
      alert('Save failed: ' + (e instanceof Error ? e.message : 'Unknown error'))
    }
    setSaving(false)
  }

  const score = seoScore()
  const scoreColor = score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="bg-[#0D1117] border-b border-white/6 flex items-center gap-3 px-5 py-3 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="text-white/40 hover:text-white font-mono text-sm transition-colors"
        >
          ← Back
        </button>
        <input
          value={form.title}
          onChange={e => update('title', e.target.value)}
          placeholder="Post title…"
          className="flex-1 bg-transparent text-white font-black text-lg outline-none placeholder:text-white/20 tracking-tight"
        />
        <div className="flex items-center gap-2">
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as 'draft' | 'published' | 'scheduled' }))}
            className="bg-white/6 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-2 py-1.5 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <button
            onClick={() => setMode(m => m === 'write' ? 'preview' : 'write')}
            className="bg-white/6 text-white/50 text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mode === 'write' ? 'Preview' : 'Edit'}
          </button>
          <button
            onClick={() => save('draft')}
            disabled={saving}
            className="bg-white/8 text-white/60 text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-white/12 transition-colors disabled:opacity-40"
          >
            Save Draft
          </button>
          <button
            onClick={() => save('published')}
            disabled={saving}
            className="bg-[#FF6500] text-white font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-[#E05800] transition-colors disabled:opacity-40"
          >
            {saving ? 'Publishing…' : '✓ Publish Live'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor / Preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          {mode === 'write' && (
            <div className="bg-[#0D1117] border-b border-white/6 flex items-center gap-1 px-4 py-2 flex-wrap">
              {[
                { label: 'B', action: () => insertFmt('**', '**'), bold: true },
                { label: 'I', action: () => insertFmt('*', '*'), italic: true },
                { label: 'H2', action: () => insertFmt('\n## ', '') },
                { label: 'H3', action: () => insertFmt('\n### ', '') },
                { label: '• List', action: () => insertFmt('\n- ', '') },
                { label: 'Quote', action: () => insertFmt('\n> ', '') },
                { label: 'Code', action: () => insertFmt('\n```\n', '\n```') },
                { label: '— HR', action: () => insertFmt('\n---\n', '') },
                { label: 'Link', action: () => insertFmt('[', '](https://)') },
              ].map(btn => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  className={`text-white/50 hover:text-white hover:bg-white/8 text-xs px-2.5 py-1.5 rounded transition-colors ${btn.bold ? 'font-bold' : ''} ${btn.italic ? 'italic' : ''}`}
                >
                  {btn.label}
                </button>
              ))}
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button
                onClick={() => setShowAI(!showAI)}
                className="text-[#FF6500] text-xs px-3 py-1.5 rounded bg-[#FF6500]/10 hover:bg-[#FF6500]/20 transition-colors font-mono"
              >
                ✨ AI Assist
              </button>
              <span className="ml-auto text-white/20 text-xs font-mono">{wc().toLocaleString()} words</span>
            </div>
          )}

          {/* AI Assist panel */}
          {showAI && mode === 'write' && (
            <div className="bg-[#111827] border-b border-white/6 p-4">
              <div className="flex gap-3 items-start">
                <select
                  value={aiType}
                  onChange={e => setAiType(e.target.value)}
                  className="bg-white/6 border border-white/10 rounded-lg text-white/70 text-xs font-mono px-2 py-2 outline-none"
                >
                  <option value="expand">Expand draft</option>
                  <option value="intro">Write introduction</option>
                  <option value="conclusion">Write conclusion</option>
                  <option value="faq">Generate FAQ</option>
                  <option value="outline">Article outline</option>
                </select>
                <button
                  onClick={runAI}
                  disabled={aiLoading}
                  className="bg-[#FF6500] text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#E05800] disabled:opacity-40 transition-colors"
                >
                  {aiLoading ? 'Generating…' : '✨ Generate'}
                </button>
                {aiResult && (
                  <button
                    onClick={() => { setForm(f => ({ ...f, content: f.content + '\n\n' + aiResult })); setAiResult(''); setShowAI(false) }}
                    className="bg-green-500/15 text-green-400 font-bold text-xs px-4 py-2 rounded-lg hover:bg-green-500/25 transition-colors"
                  >
                    ↓ Insert into Post
                  </button>
                )}
              </div>
              {aiResult && (
                <div className="mt-3 bg-white/3 border border-white/8 rounded-lg p-3 text-white/60 text-xs leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap font-mono">
                  {aiResult}
                </div>
              )}
            </div>
          )}

          {/* Textarea or preview */}
          {mode === 'write' ? (
            <textarea
              ref={taRef}
              value={form.content}
              onChange={e => update('content', e.target.value)}
              placeholder={`Start writing your post in Markdown…\n\n## Introduction\n\nYour content here…\n\n## Section 2\n\n- Point 1\n- Point 2`}
              className="flex-1 bg-[#0B0F1E] text-white/80 text-sm leading-relaxed p-8 outline-none resize-none font-mono"
            />
          ) : (
            <div
              className="flex-1 bg-[#0B0F1E] p-8 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: mdToHTML(form.content) }}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-[#0D1117] border-l border-white/6 overflow-y-auto p-4 flex-shrink-0">

          {/* SEO Score */}
          <div className="mb-5">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">SEO Score</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${scoreColor} transition-all`} style={{ width: `${score}%` }} />
              </div>
              <span className={`text-xs font-mono font-bold ${score >= 75 ? 'text-green-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                {score}%
              </span>
            </div>
            <div className="text-white/30 text-[10px] font-mono">
              {score >= 75 ? 'Good — ready to publish' : score >= 50 ? 'Needs work' : 'Improve SEO fields below'}
            </div>
          </div>

          {/* Slug */}
          <div className="mb-4">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">URL Slug</div>
            <input
              value={form.slug}
              onChange={e => update('slug', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-[11px] font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-4">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Excerpt</div>
            <textarea
              value={form.excerpt}
              onChange={e => update('excerpt', e.target.value)}
              rows={3}
              placeholder="Short summary shown in blog listing…"
              className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-[11px] font-mono px-3 py-2 outline-none focus:border-[#FF6500] resize-none transition-colors"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Category</div>
            <select
              value={form.category}
              onChange={e => update('category', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-[11px] font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Tags (comma separated)</div>
            <input
              value={form.tags}
              onChange={e => update('tags', e.target.value)}
              placeholder="SEO, Ranchi, tips"
              className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-[11px] font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
            />
          </div>

          <div className="border-t border-white/6 pt-4">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">SEO Meta</div>

            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-mono text-white/30">Meta Title</span>
                <span className={`text-[10px] font-mono ${form.meta_title.length > 60 ? 'text-red-400' : 'text-white/20'}`}>
                  {form.meta_title.length}/60
                </span>
              </div>
              <input
                value={form.meta_title}
                onChange={e => update('meta_title', e.target.value)}
                placeholder="SEO title for Google…"
                className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-[11px] font-mono px-3 py-2 outline-none focus:border-[#FF6500] transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-mono text-white/30">Meta Description</span>
                <span className={`text-[10px] font-mono ${form.meta_description.length > 160 ? 'text-red-400' : 'text-white/20'}`}>
                  {form.meta_description.length}/160
                </span>
              </div>
              <textarea
                value={form.meta_description}
                onChange={e => update('meta_description', e.target.value)}
                rows={4}
                placeholder="Description shown in Google search results…"
                className="w-full bg-white/5 border border-white/10 rounded-lg text-white/70 text-[11px] font-mono px-3 py-2 outline-none focus:border-[#FF6500] resize-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
