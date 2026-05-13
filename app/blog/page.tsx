import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import { NewsletterForm } from '@/components/blog/NewsletterForm'
import { ArrowRight, BookOpen, TrendingUp, Clock, BarChart3 } from 'lucide-react'
import type { Post } from '@/types/database'

export const metadata: Metadata = {
  title: 'Scalify Labs Insights | Digital Marketing Intelligence for Indian Businesses',
  description:
    'Research-backed digital marketing guides, performance playbooks, and growth intelligence — SEO, Google Ads, Meta Ads, WhatsApp Marketing, and AI tools for Indian businesses.',
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: 'Scalify Labs Insights — Growth Intelligence Platform',
    description: 'Research-grade marketing intelligence for Indian businesses. SEO playbooks, ad strategies, automation guides, and AI marketing frameworks.',
    url: `${SITE.url}/blog`,
  },
}

export const revalidate = 60

const CATEGORIES = [
  { name: 'All', icon: '⚡' },
  { name: 'SEO', icon: '🔍' },
  { name: 'Google Ads', icon: '📊' },
  { name: 'Meta Ads', icon: '📱' },
  { name: 'WhatsApp Marketing', icon: '💬' },
  { name: 'Digital Marketing', icon: '📈' },
  { name: 'AI Tools', icon: '🤖' },
]

const CATEGORY_COLORS: Record<string, string> = {
  'SEO': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Google Ads': 'bg-blue-50 text-blue-700 border-blue-200',
  'Meta Ads': 'bg-violet-50 text-violet-700 border-violet-200',
  'WhatsApp Marketing': 'bg-green-50 text-green-700 border-green-200',
  'Digital Marketing': 'bg-amber-50 text-amber-700 border-amber-200',
  'AI Tools': 'bg-pink-50 text-pink-700 border-pink-200',
}

const CATEGORY_GRADIENT: Record<string, string> = {
  'SEO': 'from-emerald-900 to-emerald-700',
  'Google Ads': 'from-blue-900 to-blue-700',
  'Meta Ads': 'from-violet-900 to-violet-700',
  'WhatsApp Marketing': 'from-green-900 to-green-700',
  'Digital Marketing': 'from-amber-900 to-amber-700',
  'AI Tools': 'from-pink-900 to-pink-700',
}

function readingTime(content: string | null): number {
  if (!content) return 5
  return Math.max(3, Math.ceil(content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200))
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const gradient = CATEGORY_GRADIENT[post.category] || 'from-slate-800 to-slate-600'
  const catColor = CATEGORY_COLORS[post.category] || 'bg-slate-50 text-slate-700 border-slate-200'
  const rt = readingTime(post.content)

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="grid lg:grid-cols-[1.4fr_1fr] rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Visual */}
          <div className={`relative bg-gradient-to-br ${gradient} p-8 flex flex-col justify-between min-h-[240px]`}>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider border ${catColor}`}>
                {post.category}
              </span>
              <span className="bg-saffron text-white text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">Featured</span>
            </div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-4">
                {CATEGORIES.find(c => c.name === post.category)?.icon || '📝'}
              </div>
              <div className="flex items-center gap-4 text-white/50 text-xs font-mono">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rt} min read</span>
                <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" />{post.views?.toLocaleString() || '0'} views</span>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="p-7 flex flex-col justify-between">
            <div>
              <h2 className="font-extrabold text-xl text-navy leading-tight mb-3 group-hover:text-saffron transition-colors line-clamp-3">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-[#7C7268] text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-navy font-semibold text-xs">{post.author_name}</p>
                <p className="text-[#7C7268] text-xs font-mono">{formatDate(post.published_at)}</p>
              </div>
              <span className="flex items-center gap-1 text-saffron text-xs font-bold group-hover:gap-2 transition-all">
                Read article <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
        <div className={`bg-gradient-to-br ${gradient} h-36 flex items-end p-4`}>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider border ${catColor}`}>
            {post.category}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-navy text-base leading-snug mb-2 group-hover:text-saffron transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-[#7C7268] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
          )}
          <div className="flex items-center justify-between text-xs text-[#7C7268] font-mono mt-auto pt-3 border-t border-slate-50">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rt} min read</span>
            <span>{formatDate(post.published_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const db = createServerClient()
  const selectedCat = searchParams.category || 'All'

  // Fetch all published posts
  let query = db
    .from('posts')
    .select('id, title, slug, excerpt, content, category, author_name, published_at, views')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (selectedCat !== 'All') {
    query = query.eq('category', selectedCat) as typeof query
  }

  const { data: posts } = await query as unknown as { data: Post[] | null }

  // Featured = most viewed post in current selection
  const featured = posts?.[0] || null
  const rest = posts?.slice(1) || []

  // Trending (top 5 by views from all posts)
  const { data: trendingRaw } = await db
    .from('posts')
    .select('id, title, slug, category, views')
    .eq('status', 'published')
    .order('views', { ascending: false })
    .limit(5) as unknown as { data: Post[] | null }
  const trending = trendingRaw || []

  const totalPosts = posts?.length || 0
  const totalViews = posts?.reduce((sum, p) => sum + (p.views || 0), 0) || 0

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Growth Intelligence Hub`,
    description: 'Research-grade digital marketing intelligence for Indian businesses',
    url: `${SITE.url}/blog`,
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(255,101,0,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-2 bg-saffron/10 border border-saffron/20 text-saffron font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
                <BookOpen className="w-3.5 h-3.5" />
                Growth Intelligence Hub
              </span>
            </div>

            <h1 className="font-extrabold text-5xl text-white leading-tight tracking-tight mb-5">
              Marketing That<br />
              <span className="text-saffron">Actually Works.</span>
            </h1>

            <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-8">
              Research-backed playbooks, performance teardowns, and AI marketing frameworks — written for Indian businesses that want results, not just reach.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: BookOpen, label: `${totalPosts || '12'}+ Guides Published`, color: 'text-saffron' },
                { icon: TrendingUp, label: `${totalViews > 1000 ? Math.floor(totalViews / 1000) + 'K+' : totalViews + '+'} Total Reads`, color: 'text-emerald-400' },
                { icon: BarChart3, label: 'Actionable Insights Only', color: 'text-violet-400' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className={`w-4 h-4 ${stat.color} shrink-0`} />
                  <span className="text-white/60 text-sm font-mono">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 sticky top-[64px] z-40">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                href={cat.name === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat.name)}`}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                  selectedCat === cat.name
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F0] py-12">
        <div className="max-w-6xl mx-auto px-6">

          {posts && posts.length > 0 ? (
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">

              {/* Left — Articles */}
              <div>
                {/* Featured */}
                {featured && (
                  <div className="mb-8">
                    <PostCard post={featured} featured />
                  </div>
                )}

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {rest.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right — Sidebar */}
              <aside className="space-y-6">

                {/* Newsletter */}
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <div className="w-8 h-8 bg-saffron/20 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-4 h-4 text-saffron" />
                  </div>
                  <h3 className="font-bold text-base mb-1.5">Get Weekly Insights</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    Proven tactics for Indian businesses — SEO, ads, automation. No fluff. Free every week.
                  </p>
                  <NewsletterForm variant="dark" />
                </div>

                {/* Free Strategy Call */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-saffron mb-2">Free Offer</p>
                  <h3 className="font-bold text-navy text-sm mb-2">30-Min Strategy Session</h3>
                  <p className="text-[#7C7268] text-xs leading-relaxed mb-4">
                    Book a free 30-minute call with Arvind Gupta. Get a custom digital growth plan for your business — no pitch, just strategy.
                  </p>
                  <Link
                    href="/contact-scalifylabs"
                    className="block w-full bg-saffron text-white font-bold text-xs py-2.5 rounded-lg text-center hover:bg-saffron-dark transition-colors"
                  >
                    Book Free Call →
                  </Link>
                </div>

                {/* Trending */}
                {trending.length > 0 && (
                  <div className="bg-white border border-slate-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-saffron" />
                      <h3 className="font-bold text-navy text-sm">Trending Articles</h3>
                    </div>
                    <div className="space-y-3">
                      {trending.map((t, i) => (
                        <Link key={t.id} href={`/blog/${t.slug}`} className="flex items-start gap-3 group">
                          <span className="font-mono text-xs font-bold text-saffron w-4 shrink-0 mt-0.5">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <p className="text-navy text-xs font-medium leading-snug group-hover:text-saffron transition-colors line-clamp-2">
                              {t.title}
                            </p>
                            <span className="text-[#7C7268] text-[0.65rem] font-mono mt-0.5 block">
                              {t.views?.toLocaleString() || '0'} views
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5">
                  <h3 className="font-bold text-navy text-sm mb-4">Browse by Topic</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.filter(c => c.name !== 'All').map(cat => (
                      <Link
                        key={cat.name}
                        href={`/blog?category=${encodeURIComponent(cat.name)}`}
                        className="flex items-center gap-1 bg-slate-50 text-slate-600 hover:bg-navy hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        {cat.icon} {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-5xl mb-5">📖</div>
              <h2 className="font-extrabold text-2xl text-navy mb-3">No articles yet in this category</h2>
              <p className="text-[#7C7268] mb-6">Check back soon — we publish new guides every week.</p>
              <Link href="/blog" className="inline-flex items-center gap-2 bg-saffron text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-saffron-dark transition-colors">
                View all articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER BANNER ───────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Free Weekly Intelligence</p>
          <h2 className="font-extrabold text-3xl text-white mb-3">
            Get the Edge Your Competitors Don&apos;t Have
          </h2>
          <p className="text-white/50 text-base mb-6 max-w-lg mx-auto">
            Every week: one actionable growth insight, one case study, and the latest from Indian digital marketing — delivered free.
          </p>
          <div className="flex justify-center">
            <NewsletterForm variant="inline" />
          </div>
          <p className="text-white/30 text-xs mt-3 font-mono">No spam · Unsubscribe anytime · 100% free</p>
        </div>
      </section>
    </>
  )
}
