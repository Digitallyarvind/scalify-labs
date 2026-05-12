import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import { CTABanner } from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Digital Marketing Blog | SEO, Google Ads, WhatsApp Tips',
  description: 'Practical digital marketing strategies, SEO guides, Google Ads tips, and WhatsApp marketing tactics for Indian businesses by Scalify Labs.',
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: 'Digital Marketing Blog | Scalify Labs',
    description: 'Practical strategies for Indian businesses — SEO, ads, WhatsApp marketing, AI tools and more.',
    url: `${SITE.url}/blog`,
  },
}

// Revalidate every 60 seconds — new posts appear automatically
export const revalidate = 60

const CATEGORIES = ['All', 'SEO', 'Google Ads', 'Meta Ads', 'WhatsApp Marketing', 'Digital Marketing', 'AI Tools']

const CATEGORY_ICONS: Record<string, string> = {
  'SEO': '🔍',
  'Google Ads': '📊',
  'Meta Ads': '📱',
  'WhatsApp Marketing': '💬',
  'Digital Marketing': '📈',
  'AI Tools': '🤖',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const db = createServerClient()
  const selectedCat = searchParams.category || 'All'

  let query = db
    .from('posts')
    .select('id, title, slug, excerpt, category, published_at, views')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (selectedCat !== 'All') {
    query = query.eq('category', selectedCat)
  }

  const { data: posts } = await query

  // Blog listing schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Blog`,
    description: 'Digital marketing insights and guides for Indian businesses',
    url: `${SITE.url}/blog`,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-navy py-28 pt-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,101,0,0.1)] via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <p className="font-mono text-xs text-saffron uppercase tracking-[0.14em] mb-4">Knowledge Hub</p>
          <h1 className="font-sans font-extrabold text-5xl text-white leading-tight tracking-tight mb-4">
            Digital Marketing<br />Insights & Guides
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Practical strategies, case studies, and how-to guides for Indian businesses.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-cream py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-3 flex-wrap mb-10">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-md font-sans font-bold text-sm transition-all ${
                  selectedCat === cat
                    ? 'bg-navy text-white'
                    : 'bg-white border border-cream-300 text-[#44403C] hover:border-saffron hover:text-saffron'
                }`}
              >
                {CATEGORY_ICONS[cat] && <span className="mr-1">{CATEGORY_ICONS[cat]}</span>}
                {cat}
              </Link>
            ))}
          </div>

          {/* Posts Grid */}
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-cream-300 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200 block"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-navy flex items-center justify-center text-5xl">
                    {CATEGORY_ICONS[post.category] || '📝'}
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-[rgba(255,101,0,0.1)] text-saffron font-mono text-[0.67rem] uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                      {post.category}
                    </span>
                    <h2 className="font-sans font-bold text-base leading-snug mb-2 text-navy line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[#7C7268] text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-[#7C7268] font-mono">
                      <span>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                          : ''}
                      </span>
                      <span>{post.views?.toLocaleString() || '0'} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#7C7268]">
              <p className="text-4xl mb-4">📝</p>
              <p className="font-sans font-bold text-xl text-navy mb-2">No posts yet</p>
              <p className="text-sm">Check back soon — we're always publishing new guides.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Want More Like This?"
        subtitle="Get free digital marketing tips and strategies for your business every week."
        primaryCTA={{ label: 'Book Free Strategy Call →', href: '/contact' }}
      />
    </>
  )
}
