import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
import { deletePost } from '@/lib/actions'
import type { Post } from '@/types/database'

export const revalidate = 0

const STATUS_COLOR: Record<string, string> = {
  published: 'bg-green-500/15 text-green-400',
  draft: 'bg-amber-500/15 text-amber-400',
  scheduled: 'bg-blue-500/15 text-blue-400',
}

const CAT_ICON: Record<string, string> = {
  'SEO': '🔍', 'Google Ads': '📊', 'Meta Ads': '📱',
  'WhatsApp Marketing': '💬', 'Digital Marketing': '📈', 'AI Tools': '🤖',
}

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string }
}) {
  const db = createServerClient()
  const status = searchParams.status || 'all'
  const search = searchParams.search || ''

  let query = db.from('posts').select('*').order('created_at', { ascending: false })
  if (status !== 'all') query = query.eq('status', status) as typeof query
  if (search) query = query.ilike('title', `%${search}%`) as typeof query

  const { data: posts } = await query as unknown as { data: Post[] | null }

  // Counts for tabs
  const { count: allCount } = await db.from('posts').select('*', { count: 'exact', head: true })
  const { count: pubCount } = await db.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published')
  const { count: draftCount } = await db.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'draft')

  const tabs = [
    { key: 'all', label: 'All', count: allCount || 0 },
    { key: 'published', label: 'Published', count: pubCount || 0 },
    { key: 'draft', label: 'Drafts', count: draftCount || 0 },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-2xl tracking-tight mb-1">Blog Posts</h1>
          <p className="text-white/40 text-sm font-mono">Publish posts — go live on website instantly</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-[#FF6500] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#E05800] transition-colors"
        >
          + New Post
        </Link>
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div className="flex gap-1 bg-[#111827] border border-white/7 rounded-xl p-1">
          {tabs.map(t => (
            <Link
              key={t.key}
              href={`/admin/blog${t.key !== 'all' ? `?status=${t.key}` : ''}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                status === t.key
                  ? 'bg-[#FF6500] text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {t.label} <span className="opacity-60">({t.count})</span>
            </Link>
          ))}
        </div>
        <form method="GET" className="flex gap-2 flex-1 max-w-xs">
          {status !== 'all' && <input type="hidden" name="status" value={status} />}
          <input
            name="search"
            defaultValue={search}
            placeholder="Search posts…"
            className="flex-1 bg-[#111827] border border-white/8 rounded-xl text-white text-sm px-4 py-2 outline-none focus:border-[#FF6500] font-mono transition-colors"
          />
          <button className="bg-white/8 text-white/60 text-sm px-3 py-2 rounded-xl hover:bg-white/12 transition-colors">
            🔍
          </button>
        </form>
      </div>

      {/* Posts table */}
      <div className="bg-[#111827] border border-white/7 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              {['Post', 'Category', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts?.map(post => (
              <tr key={post.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg flex-shrink-0">{CAT_ICON[post.category] || '📝'}</span>
                    <div>
                      <div className="text-white text-sm font-medium leading-snug max-w-xs truncate">{post.title}</div>
                      <div className="text-white/30 text-[10px] font-mono mt-0.5">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-white/50 text-xs font-mono">{post.category}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_COLOR[post.status]}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-white/50 text-xs font-mono">{post.views?.toLocaleString() || '0'}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-white/30 text-[10px] font-mono">
                    {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="text-[#FF6500] text-xs font-mono hover:underline"
                    >
                      Edit
                    </Link>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-white/30 text-xs font-mono hover:text-white/60"
                    >
                      View
                    </a>
                    <form action={async () => { 'use server'; await deletePost(post.id) }}>
                      <button className="text-red-400/60 text-xs font-mono hover:text-red-400 transition-colors">
                        Del
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!posts?.length && (
          <div className="text-center py-16 text-white/30 font-mono text-sm">
            {search ? `No posts matching "${search}"` : 'No posts yet — create your first post'}
          </div>
        )}
      </div>
    </div>
  )
}
