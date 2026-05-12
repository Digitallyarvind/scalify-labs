import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
import type { Lead, Post, Applicant } from '@/types/database'

export const revalidate = 30

async function getDashboardData() {
  const db = createServerClient()
  const [
    { count: totalLeads },
    { count: newLeads },
    { count: wonLeads },
    { count: totalPosts },
    { count: pubPosts },
    { count: totalApps },
    { count: newApps },
    { data: recentLeadsRaw },
    { data: recentAppsRaw },
    { data: topPostsRaw },
  ] = await Promise.all([
    db.from('leads').select('*', { count: 'exact', head: true }),
    db.from('leads').select('*', { count: 'exact', head: true }).eq('stage', 'new'),
    db.from('leads').select('*', { count: 'exact', head: true }).eq('stage', 'won'),
    db.from('posts').select('*', { count: 'exact', head: true }),
    db.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    db.from('s30_applicants').select('*', { count: 'exact', head: true }),
    db.from('s30_applicants').select('*', { count: 'exact', head: true }).eq('stage', 'applied'),
    db.from('leads').select('id,name,phone,business,stage,source,score,created_at').order('created_at', { ascending: false }).limit(6),
    db.from('s30_applicants').select('id,name,city,stage,created_at').order('created_at', { ascending: false }).limit(5),
    db.from('posts').select('id,title,slug,views,category').eq('status', 'published').order('views', { ascending: false }).limit(5),
  ])

  const recentLeads = recentLeadsRaw as Lead[] | null
  const recentApps = recentAppsRaw as Applicant[] | null
  const topPosts = topPostsRaw as Post[] | null

  return { totalLeads, newLeads, wonLeads, totalPosts, pubPosts, totalApps, newApps, recentLeads, recentApps, topPosts }
}

const STAGE_COLOR: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400',
  contacted: 'bg-purple-500/15 text-purple-400',
  qualified: 'bg-teal-500/15 text-teal-400',
  proposal: 'bg-amber-500/15 text-amber-400',
  negotiation: 'bg-orange-500/15 text-orange-400',
  won: 'bg-green-500/15 text-green-400',
  lost: 'bg-red-500/15 text-red-400',
  applied: 'bg-blue-500/15 text-blue-400',
  counselling: 'bg-purple-500/15 text-purple-400',
  psychometric: 'bg-teal-500/15 text-teal-400',
  interview: 'bg-amber-500/15 text-amber-400',
  selected: 'bg-green-500/15 text-green-400',
  enrolled: 'bg-green-500/20 text-green-300',
  rejected: 'bg-red-500/15 text-red-400',
}

export default async function DashboardPage() {
  const d = await getDashboardData()
  const convRate = d.totalLeads ? Math.round(((d.wonLeads || 0) / (d.totalLeads || 1)) * 100) : 0

  const kpis = [
    { label: 'Total Leads', value: d.totalLeads || 0, sub: `${d.newLeads || 0} new today`, color: 'text-blue-400', icon: '🎯' },
    { label: 'Deals Won', value: d.wonLeads || 0, sub: `${convRate}% conversion`, color: 'text-green-400', icon: '✅' },
    { label: 'Blog Posts', value: d.pubPosts || 0, sub: `${d.totalPosts || 0} total`, color: 'text-[#FF6500]', icon: '📝' },
    { label: 'S30 Applications', value: d.totalApps || 0, sub: `${d.newApps || 0} new`, color: 'text-amber-400', icon: '🎓' },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white font-black text-2xl tracking-tight mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm font-mono">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map(k => (
          <div key={k.label} className="bg-[#111827] border border-white/7 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{k.label}</div>
              <span className="text-xl">{k.icon}</span>
            </div>
            <div className={`font-black text-3xl tracking-tight ${k.color} mb-1`}>{k.value}</div>
            <div className="text-white/30 text-xs font-mono">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { href: '/admin/blog/new', label: '+ New Post', icon: '✍️', color: 'border-[#FF6500]/30 hover:border-[#FF6500] hover:bg-[#FF6500]/5' },
          { href: '/admin/crm', label: 'View Pipeline', icon: '🎯', color: 'border-blue-500/20 hover:border-blue-500 hover:bg-blue-500/5' },
          { href: '/admin/super-30', label: 'Applications', icon: '🎓', color: 'border-amber-500/20 hover:border-amber-500 hover:bg-amber-500/5' },
          { href: '/admin/cms', label: 'Edit Pages', icon: '🗂', color: 'border-purple-500/20 hover:border-purple-500 hover:bg-purple-500/5' },
        ].map(a => (
          <Link
            key={a.href}
            href={a.href}
            className={`bg-[#111827] border ${a.color} rounded-xl p-4 flex items-center gap-3 transition-all`}
          >
            <span className="text-xl">{a.icon}</span>
            <span className="text-white/70 font-semibold text-sm">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-[#111827] border border-white/7 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <div className="text-white font-bold text-sm">Recent Leads</div>
            <Link href="/admin/crm" className="text-[#FF6500] text-xs font-mono hover:underline">View All →</Link>
          </div>
          <div>
            {d.recentLeads?.map(lead => (
              <div key={lead.id} className="flex items-center gap-3 px-5 py-3 border-b border-white/5 hover:bg-white/2 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#FF6500]/15 flex items-center justify-center text-[#FF6500] font-bold text-xs flex-shrink-0">
                  {lead.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{lead.name}</div>
                  <div className="text-white/40 text-xs font-mono truncate">{lead.business || lead.phone}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${STAGE_COLOR[lead.stage] || 'bg-white/10 text-white/40'}`}>
                    {lead.stage}
                  </span>
                  <span className={`text-xs font-mono font-bold ${lead.score >= 75 ? 'text-green-400' : lead.score >= 55 ? 'text-amber-400' : 'text-red-400'}`}>
                    {lead.score}
                  </span>
                </div>
              </div>
            ))}
            {!d.recentLeads?.length && (
              <div className="text-white/30 text-sm text-center py-10 font-mono">No leads yet</div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Recent S30 Applications */}
          <div className="bg-[#111827] border border-white/7 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/6">
              <div className="text-white font-bold text-sm">S30 Applications</div>
              <Link href="/admin/super-30" className="text-[#FF6500] text-xs font-mono hover:underline">View →</Link>
            </div>
            {d.recentApps?.map(app => (
              <div key={app.id} className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400 font-bold text-xs flex-shrink-0">
                  {app.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{app.name}</div>
                  <div className="text-white/30 text-[10px] font-mono">{app.city || '—'}</div>
                </div>
                <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${STAGE_COLOR[app.stage] || 'bg-white/10 text-white/40'}`}>
                  {app.stage}
                </span>
              </div>
            ))}
            {!d.recentApps?.length && (
              <div className="text-white/30 text-xs text-center py-6 font-mono">No applications yet</div>
            )}
          </div>

          {/* Top Posts */}
          <div className="bg-[#111827] border border-white/7 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/6">
              <div className="text-white font-bold text-sm">Top Blog Posts</div>
              <Link href="/admin/blog" className="text-[#FF6500] text-xs font-mono hover:underline">View →</Link>
            </div>
            {d.topPosts?.map((post, i) => (
              <div key={post.id} className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <span className="text-white/20 font-mono text-xs w-4">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{post.title}</div>
                  <div className="text-white/30 text-[10px] font-mono">{post.category}</div>
                </div>
                <span className="text-blue-400 font-mono text-xs flex-shrink-0">{post.views?.toLocaleString()}</span>
              </div>
            ))}
            {!d.topPosts?.length && (
              <div className="text-white/30 text-xs text-center py-6 font-mono">No posts yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
