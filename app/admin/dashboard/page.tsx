import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 0

const STAGE_ORDER = ['new','contacted','qualified','proposal','negotiation','won','lost']
const STAGE_COLORS: Record<string,string> = {
  new:'#2563EB', contacted:'#7C3AED', qualified:'#FF6500',
  proposal:'#D97706', negotiation:'#EA580C', won:'#16A34A', lost:'#DC2626'
}

function KPI({ icon, label, value, sub, color='#FF6500' }: {
  icon: string; label: string; value: string|number; sub?: string; color?: string
}) {
  const isPos = sub?.startsWith('+')
  const isNeg = sub?.startsWith('-')
  return (
    <div className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white border border-[#E8E3DA]">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xl">{icon}</span>
        {sub && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: isPos ? 'rgba(22,163,74,0.1)' : isNeg ? 'rgba(220,38,38,0.1)' : 'rgba(255,101,0,0.1)',
              color: isPos ? '#16A34A' : isNeg ? '#DC2626' : '#FF6500' }}>
            {sub}
          </span>
        )}
      </div>
      <p className="text-3xl font-black tracking-tight mb-1" style={{ color, fontFamily: 'Syne, sans-serif' }}>{value}</p>
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{label}</p>
    </div>
  )
}

export default async function DashboardPage() {
  const db = createServerClient()
  const now = new Date()
  const som = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const solm = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const eolm = new Date(now.getFullYear(), now.getMonth(), 0).toISOString()
  const tod = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

  const [
    { count: lm }, { count: llm }, { count: lt }, { count: lw }, { count: la },
    { data: pipe }, { count: pm }, { count: s30 }, { count: ca },
    { data: rleads }, { data: tposts }, { data: ttasks }, { data: stagesRaw },
  ] = await Promise.all([
    db.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', som),
    db.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', solm).lt('created_at', eolm),
    db.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', tod),
    db.from('leads').select('*', { count: 'exact', head: true }).eq('stage', 'won'),
    db.from('leads').select('*', { count: 'exact', head: true }),
    db.from('leads').select('deal_value'),
    db.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published').gte('published_at', som),
    db.from('s30_applicants').select('*', { count: 'exact', head: true }).eq('status', 'applied'),
    db.from('career_applications').select('*', { count: 'exact', head: true }).eq('stage', 'applied'),
    db.from('leads').select('name,source,service_interest,created_at,stage').order('created_at', { ascending: false }).limit(8),
    db.from('posts').select('title,views,slug').eq('status', 'published').order('views', { ascending: false }).limit(5),
    db.from('tasks').select('title,priority,due_date').eq('status', 'pending').lte('due_date', new Date(Date.now() + 86400000).toISOString()).limit(6),
    db.from('leads').select('stage'),
  ])

  const pv = (pipe ?? []).reduce((s: number, l: Record<string, unknown>) => s + ((l.deal_value as number) || 0), 0)
  const cr = la ? Math.round(((lw ?? 0) / (la ?? 1)) * 100) : 0
  const lg = llm ? Math.round((((lm ?? 0) - (llm ?? 0)) / (llm ?? 1)) * 100) : 0
  const sm: Record<string, number> = {}
  ;(stagesRaw ?? []).forEach((l: Record<string, unknown>) => {
    const stage = l.stage as string
    if (stage) sm[stage] = (sm[stage] || 0) + 1
  })

  const QUICK = [
    { href: '/admin/blog/new', icon: '✍️', label: 'New Blog Post', color: '#FF6500' },
    { href: '/admin/crm', icon: '🎯', label: 'Add Lead', color: '#2563EB' },
    { href: '/admin/super-30', icon: '🎓', label: 'New S30 Applicant', color: '#7C3AED' },
    { href: '/admin/seo', icon: '📈', label: 'GSC Report', color: '#16A34A' },
    { href: '/admin/whatsapp', icon: '💬', label: 'WhatsApp Broadcast', color: '#16A34A' },
  ]

  return (
    <div className="p-6 space-y-6 bg-[#F7F4EF] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Good morning, Arvind 👋
          </h1>
          <p className="text-sm mt-0.5 text-[#9C9189]">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/blog/new"
          className="px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#FF6500] hover:bg-[#E05800] transition-colors">
          + New Post
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon="📊" label="Leads This Month" value={lm ?? 0}
          sub={`${lg >= 0 ? '+' : ''}${lg}% vs last`} color="#FF6500" />
        <KPI icon="🔥" label="New Today" value={lt ?? 0} color="#D97706" />
        <KPI icon="🏆" label="Conversion Rate" value={`${cr}%`} color="#16A34A" sub={`${lw ?? 0} won`} />
        <KPI icon="💰" label="Pipeline Value" value={`₹${Math.round(pv / 1000)}K`} color="#7C3AED" />
        <KPI icon="📝" label="Posts This Month" value={pm ?? 0} color="#2563EB" />
        <KPI icon="🎓" label="S30 Applications" value={s30 ?? 0} sub="pending" color="#7C3AED" />
        <KPI icon="💼" label="Career Apps" value={ca ?? 0} sub="pending" color="#D97706" />
        <KPI icon="📈" label="Total Leads" value={la ?? 0} color="#16A34A" />
      </div>

      {/* Quick Actions */}
      <div className="p-4 rounded-xl bg-white border border-[#E8E3DA]">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {QUICK.map(a => (
            <Link key={a.href} href={a.href}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ background: a.color + '12', color: a.color, border: `1px solid ${a.color}25` }}>
              <span>{a.icon}</span> {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Funnel */}
        <div className="p-5 rounded-xl bg-white border border-[#E8E3DA]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-4">CRM Stage Funnel</p>
          <div className="space-y-2.5">
            {STAGE_ORDER.map(s => {
              const n = sm[s] || 0
              const max = Math.max(...Object.values(sm), 1)
              return (
                <div key={s}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize font-mono text-[#57534E]">{s}</span>
                    <span className="font-bold font-mono" style={{ color: STAGE_COLORS[s] }}>{n}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8E3DA]">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.round((n / max) * 100)}%`, background: STAGE_COLORS[s] }} />
                  </div>
                </div>
              )
            })}
          </div>
          <Link href="/admin/crm" className="block mt-4 text-xs font-semibold text-center py-2 rounded-lg text-[#FF6500] bg-[rgba(255,101,0,0.08)]">
            Open Pipeline →
          </Link>
        </div>

        {/* Recent Leads */}
        <div className="p-5 rounded-xl bg-white border border-[#E8E3DA]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-4">Recent Leads</p>
          <div className="space-y-1">
            {(rleads ?? []).map((l: Record<string, unknown>, i: number) => (
              <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[#E8E3DA] last:border-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[rgba(255,101,0,0.1)] text-[#FF6500] shrink-0">
                  {(l.name as string)?.[0] ?? '?'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#1A1410] truncate">{l.name as string}</p>
                  <p className="text-[10px] font-mono text-[#9C9189] truncate">{l.service_interest as string}</p>
                </div>
                <span className="text-[10px] font-mono text-[#9C9189] shrink-0">
                  {new Date(l.created_at as string).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            ))}
            {!(rleads ?? []).length && <p className="text-xs text-[#9C9189] text-center py-4">No leads yet</p>}
          </div>
        </div>

        {/* Top Posts + Tasks */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-[#E8E3DA]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Top Blog Posts</p>
            {(tposts ?? []).map((p: Record<string, unknown>, i: number) => (
              <div key={i} className="flex items-center gap-2 py-1.5">
                <span className="text-[10px] font-mono text-[#9C9189] w-4">{i + 1}</span>
                <p className="text-xs text-[#1A1410] flex-1 truncate">{p.title as string}</p>
                <span className="text-[10px] font-mono text-[#FF6500]">{(p.views as number) ?? 0}</span>
              </div>
            ))}
            {!(tposts ?? []).length && <p className="text-xs text-[#9C9189]">No published posts</p>}
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E8E3DA]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Tasks Due Today</p>
            {(ttasks ?? []).map((t: Record<string, unknown>, i: number) => (
              <div key={i} className="flex items-center gap-2 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{
                  background: t.priority === 'high' ? '#DC2626' : t.priority === 'medium' ? '#D97706' : '#16A34A'
                }} />
                <p className="text-xs text-[#1A1410] truncate">{t.title as string}</p>
              </div>
            ))}
            {!(ttasks ?? []).length && <p className="text-xs text-[#9C9189]">All clear ✓</p>}
            <Link href="/admin/tasks" className="block mt-3 text-xs font-semibold text-center py-1.5 rounded-lg text-[#D97706] bg-[rgba(217,119,6,0.08)]">
              View all tasks →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
