import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import { NewsletterForm } from '@/components/blog/NewsletterForm'
import { ArrowRight, Clock, Eye, Calendar, User, TrendingUp, Tag, ArrowLeft } from 'lucide-react'
import type { Post } from '@/types/database'

interface Props {
  params: { slug: string }
}

export const revalidate = 60

const CATEGORY_GRADIENT: Record<string, string> = {
  'SEO': 'from-[#064e3b] via-emerald-900 to-[#0B0F1E]',
  'Google Ads': 'from-[#1e3a5f] via-blue-900 to-[#0B0F1E]',
  'Meta Ads': 'from-[#2e1065] via-violet-900 to-[#0B0F1E]',
  'WhatsApp Marketing': 'from-[#064e3b] via-green-900 to-[#0B0F1E]',
  'Digital Marketing': 'from-[#78350f] via-amber-900 to-[#0B0F1E]',
  'AI Tools': 'from-[#831843] via-pink-900 to-[#0B0F1E]',
}

const CATEGORY_ACCENT: Record<string, string> = {
  'SEO': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Google Ads': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Meta Ads': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'WhatsApp Marketing': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Digital Marketing': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'AI Tools': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
}

const CATEGORY_ICON: Record<string, string> = {
  'SEO': '🔍', 'Google Ads': '📊', 'Meta Ads': '📱',
  'WhatsApp Marketing': '💬', 'Digital Marketing': '📈', 'AI Tools': '🤖',
}

function readingTime(content: string | null): number {
  if (!content) return 5
  return Math.max(3, Math.ceil(content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = createServerClient()
  const { data: postRaw } = await db
    .from('posts')
    .select('title, excerpt, meta_title, meta_description, category, published_at, author_name')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()
  const post = postRaw as Post | null
  if (!post) return {}

  const canonical = `${SITE.url}/blog/${params.slug}`
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
    alternates: { canonical },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      url: canonical,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author_name || SITE.founder],
      tags: [post.category],
      siteName: SITE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const db = createServerClient()

  const { data: postRaw } = await db
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()
  const post = postRaw as Post | null
  if (!post) notFound()

  // Fire-and-forget view increment
  // @ts-expect-error — Supabase update type collapses to never when chained after cast
  db.from('posts').update({ views: (post.views || 0) + 1 }).eq('id', post.id).then(() => {})

  // Related posts (same category, excluding current)
  const { data: relatedRaw } = await db
    .from('posts')
    .select('id, title, slug, category, published_at, views, excerpt')
    .eq('status', 'published')
    .eq('category', post.category)
    .neq('id', post.id)
    .limit(3)
  const related = relatedRaw as Post[] | null

  // Previous / Next post
  const { data: prevRaw } = await db
    .from('posts')
    .select('title, slug')
    .eq('status', 'published')
    .lt('published_at', post.published_at || new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(1)
    .single()
  const prev = prevRaw as { title: string; slug: string } | null

  const { data: nextRaw } = await db
    .from('posts')
    .select('title, slug')
    .eq('status', 'published')
    .gt('published_at', post.published_at || new Date().toISOString())
    .order('published_at', { ascending: true })
    .limit(1)
    .single()
  const next = nextRaw as { title: string; slug: string } | null

  const rt = readingTime(post.content)
  const gradient = CATEGORY_GRADIENT[post.category] || 'from-slate-900 via-slate-800 to-[#0B0F1E]'
  const accentClass = CATEGORY_ACCENT[post.category] || 'text-saffron bg-saffron/10 border-saffron/20'
  const catIcon = CATEGORY_ICON[post.category] || '📝'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.meta_description || '',
    author: { '@type': 'Person', name: post.author_name || SITE.founder, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` } },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    timeRequired: `PT${rt}M`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-b ${gradient} pt-36 pb-16 overflow-hidden`}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 font-mono mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-white/70 transition-colors">Insights</Link>
            <span>›</span>
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-white/70 transition-colors">{post.category}</Link>
          </nav>

          {/* Category + Reading time */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${accentClass}`}>
              {catIcon} {post.category}
            </span>
            <span className="flex items-center gap-1 text-white/40 text-xs font-mono">
              <Clock className="w-3 h-3" />{rt} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-3xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-7">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-white/40 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author_name || SITE.founder}
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {((post.views || 0) + 1).toLocaleString()} views
            </span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F0] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">

            {/* Main Article */}
            <article>
              {/* Key takeaway box */}
              {post.excerpt && (
                <div className="bg-navy rounded-2xl p-5 mb-8 flex gap-4">
                  <div className="w-1 bg-saffron rounded-full shrink-0" />
                  <div>
                    <p className="text-saffron font-mono text-xs uppercase tracking-widest mb-1">Key Insight</p>
                    <p className="text-white/80 text-sm leading-relaxed italic">{post.excerpt}</p>
                  </div>
                </div>
              )}

              {/* Article body */}
              <div
                className="prose-scalify"
                dangerouslySetInnerHTML={{ __html: markdownToHTML(post.content) }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-slate-400" />
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="bg-white border border-slate-200 text-slate-500 font-mono text-xs px-3 py-1 rounded-full hover:border-saffron hover:text-saffron transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author card */}
              <div className="mt-10 bg-navy rounded-2xl p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-saffron flex items-center justify-center text-white font-extrabold text-xl shrink-0">
                    {(post.author_name || SITE.founder).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-base">{post.author_name || SITE.founder}</p>
                    <p className="text-white/50 text-sm mb-3">Founder, {SITE.name} · 7+ years in digital marketing · {SITE.city}, Jharkhand</p>
                    <p className="text-white/40 text-xs leading-relaxed">
                      Arvind has helped 100+ Indian businesses build profitable digital marketing systems. He writes about performance marketing, SEO, and AI automation.
                    </p>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap gap-3">
                  <Link
                    href="/contact-scalifylabs"
                    className="flex items-center gap-1.5 bg-saffron text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-saffron-dark transition-colors"
                  >
                    Work with Arvind <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/blog"
                    className="flex items-center gap-1.5 border border-white/20 text-white/70 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    More articles
                  </Link>
                </div>
              </div>

              {/* Prev / Next */}
              {(prev || next) && (
                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                  {prev && (
                    <Link href={`/blog/${prev.slug}`} className="group bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-sm hover:border-saffron/30 transition-all">
                      <p className="text-[#7C7268] font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-1">
                        <ArrowLeft className="w-3 h-3" /> Previous
                      </p>
                      <p className="text-navy font-semibold text-sm leading-snug group-hover:text-saffron transition-colors line-clamp-2">{prev.title}</p>
                    </Link>
                  )}
                  {next && (
                    <Link href={`/blog/${next.slug}`} className="group bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-sm hover:border-saffron/30 transition-all text-right ml-auto w-full">
                      <p className="text-[#7C7268] font-mono text-xs uppercase tracking-widest mb-2 flex items-center justify-end gap-1">
                        Next <ArrowRight className="w-3 h-3" />
                      </p>
                      <p className="text-navy font-semibold text-sm leading-snug group-hover:text-saffron transition-colors line-clamp-2">{next.title}</p>
                    </Link>
                  )}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* CTA */}
              <div className="bg-navy text-white rounded-2xl p-5 sticky top-24">
                <p className="text-saffron font-mono text-xs uppercase tracking-widest mb-2">Free Session</p>
                <h3 className="font-bold text-base mb-2">Get a Free Strategy Call</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-4">
                  30 minutes with Arvind Gupta — get a custom growth plan for your business.
                </p>
                <Link
                  href="/contact-scalifylabs"
                  className="block w-full bg-saffron text-white font-bold text-sm py-2.5 rounded-xl text-center hover:bg-saffron-dark transition-colors"
                >
                  Book Free Call →
                </Link>
              </div>

              {/* Newsletter */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="font-bold text-navy text-sm mb-1">Weekly Insights</h3>
                <p className="text-[#7C7268] text-xs leading-relaxed mb-4">Get guides like this in your inbox every week — free.</p>
                <NewsletterForm />
              </div>

              {/* Related Posts */}
              {related && related.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-saffron" />
                    <h3 className="font-bold text-navy text-sm">Related Articles</h3>
                  </div>
                  <div className="space-y-4">
                    {related.map(r => (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="block group">
                        <h4 className="text-navy font-medium text-xs leading-snug group-hover:text-saffron transition-colors line-clamp-2 mb-1">
                          {r.title}
                        </h4>
                        <p className="text-[#7C7268] font-mono text-[0.65rem]">
                          {r.views?.toLocaleString() || '0'} views
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Services CTA */}
              <div className="bg-gradient-to-br from-navy to-[#1a2340] border border-white/5 rounded-2xl p-5 text-white">
                <p className="text-saffron font-mono text-[0.65rem] uppercase tracking-widest mb-2">Services</p>
                <h3 className="font-bold text-sm mb-3">
                  {post.category === 'SEO' ? 'Rank on Page 1 of Google' :
                   post.category === 'Google Ads' ? 'Get More Leads with Google Ads' :
                   post.category === 'Meta Ads' ? 'Scale with Facebook & Instagram' :
                   post.category === 'WhatsApp Marketing' ? '98% Open Rate Marketing' :
                   'Grow Your Business Online'}
                </h3>
                <Link
                  href={
                    post.category === 'SEO' ? '/services/affordable-seo-services' :
                    post.category === 'Google Ads' ? '/services/google-ads-services' :
                    post.category === 'Meta Ads' ? '/services/meta-ads' :
                    post.category === 'WhatsApp Marketing' ? '/services/whatsapp-marketing-agency' :
                    '/contact'
                  }
                  className="flex items-center gap-1 text-saffron text-xs font-bold hover:gap-2 transition-all"
                >
                  See how we can help <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ────────────────────────────────────────── */}
      {related && related.length > 0 && (
        <section className="bg-white py-14 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-extrabold text-2xl text-navy mb-6">More {post.category} Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group bg-[#F7F5F0] border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <p className="text-[#7C7268] font-mono text-[0.65rem] uppercase tracking-wider mb-2">{r.category}</p>
                  <h3 className="font-bold text-navy text-sm leading-snug group-hover:text-saffron transition-colors line-clamp-2 mb-2">
                    {r.title}
                  </h3>
                  {r.excerpt && (
                    <p className="text-[#7C7268] text-xs leading-relaxed line-clamp-2 mb-3">{r.excerpt}</p>
                  )}
                  <span className="text-saffron text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-saffron uppercase tracking-widest mb-3">Next Step</p>
          <h2 className="font-extrabold text-3xl text-white mb-4">
            Ready to Apply This to Your Business?
          </h2>
          <p className="text-white/50 text-base mb-7 max-w-lg mx-auto">
            Book a free strategy call with our team. We&apos;ll build a custom growth plan based on your industry, goals, and budget.
          </p>
          <Link
            href="/contact-scalifylabs"
            className="inline-flex items-center gap-2 bg-saffron text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(255,101,0,0.35)] hover:bg-saffron-dark hover:-translate-y-0.5 transition-all text-sm"
          >
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

function markdownToHTML(markdown: string): string {
  if (!markdown) return ''
  if (markdown.includes('<h2>') || markdown.includes('<p>')) return markdown

  return markdown
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-saffron hover:underline">$1</a>')
    .split('\n\n')
    .map(block => {
      if (block.startsWith('<')) return block
      return `<p>${block}</p>`
    })
    .join('\n')
}
