import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'

interface Props {
  params: { slug: string }
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = createServerClient()
  const { data: post } = await db
    .from('posts')
    .select('title, excerpt, meta_title, meta_description, category, published_at')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

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
      authors: [SITE.founder],
      tags: [post.category],
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

  const { data: post } = await db
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  // Increment view count (fire and forget)
  db.from('posts').update({ views: (post.views || 0) + 1 }).eq('id', post.id).then(() => {})

  // Get related posts
  const { data: related } = await db
    .from('posts')
    .select('id, title, slug, category, published_at')
    .eq('status', 'published')
    .eq('category', post.category)
    .neq('id', post.id)
    .limit(3)

  // Article schema markup
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.meta_description,
    author: {
      '@type': 'Person',
      name: SITE.founder,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
  }

  const CATEGORY_ICONS: Record<string, string> = {
    'SEO': '🔍', 'Google Ads': '📊', 'Meta Ads': '📱',
    'WhatsApp Marketing': '💬', 'Digital Marketing': '📈', 'AI Tools': '🤖',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-navy py-24 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,101,0,0.1)] via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 font-mono mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-saffron transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-white/60">{post.category}</span>
          </nav>

          <span className="inline-block bg-[rgba(255,101,0,0.15)] text-saffron font-mono text-[0.67rem] uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            {CATEGORY_ICONS[post.category] || '📝'} {post.category}
          </span>

          <h1 className="font-sans font-extrabold text-4xl text-white leading-tight tracking-tight mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 text-white/40 text-xs font-mono">
            <span>✍️ {post.author_name || SITE.founder}</span>
            {post.published_at && (
              <span>📅 {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            )}
            <span>👁 {post.views?.toLocaleString() || '0'} views</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Main content */}
            <article>
              {post.excerpt && (
                <p className="text-[#44403C] text-lg leading-relaxed mb-8 p-5 bg-white rounded-xl border border-cream-300 font-serif italic">
                  {post.excerpt}
                </p>
              )}
              <div
                className="prose-scalify"
                dangerouslySetInnerHTML={{ __html: markdownToHTML(post.content) }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-cream-300">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="bg-cream-200 text-[#7C7268] font-mono text-xs px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author box */}
              <div className="mt-10 bg-navy rounded-2xl p-6 flex gap-4 items-center flex-wrap">
                <div className="w-14 h-14 rounded-full bg-saffron flex items-center justify-center text-white font-extrabold text-2xl flex-shrink-0">A</div>
                <div className="flex-1">
                  <div className="text-white font-bold text-base mb-1">{SITE.founder}</div>
                  <div className="text-white/50 text-sm">Founder, {SITE.name} · 7+ years in digital marketing · {SITE.city}</div>
                </div>
                <Link
                  href="/contact"
                  className="bg-saffron text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-saffron-dark transition-colors"
                >
                  Work with Arvind →
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <div className="bg-navy text-white rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-2">Free Strategy Call</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  30 minutes with Arvind Gupta to map out your digital growth plan.
                </p>
                <Link
                  href="/contact"
                  className="block w-full bg-saffron text-white font-bold text-sm px-5 py-3 rounded-lg text-center hover:bg-saffron-dark transition-colors"
                >
                  Book Free Call →
                </Link>
              </div>

              {/* Related Posts */}
              {related && related.length > 0 && (
                <div className="bg-white border border-cream-300 rounded-2xl p-5">
                  <h3 className="font-bold text-sm mb-4">Related Posts</h3>
                  <div className="space-y-3">
                    {related.map(r => (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="block hover:text-saffron transition-colors">
                        <div className="text-sm font-medium leading-snug">{r.title}</div>
                        <div className="text-xs text-[#7C7268] font-mono mt-1">{r.category}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

// Simple markdown → HTML converter (server-side, no client JS)
function markdownToHTML(markdown: string): string {
  if (!markdown) return ''
  // If already HTML, return as-is
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
