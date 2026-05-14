import { createServerClient } from '@/lib/supabase'
import { SITE } from '@/lib/data'
import type { Post } from '@/types/database'

export const revalidate = 3600 // regenerate every hour

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500)
}

export async function GET() {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('posts')
    .select('title, slug, excerpt, content, category, author_name, published_at, updated_at, og_image')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50)

  const posts = (data ?? []) as Pick<Post, 'title' | 'slug' | 'excerpt' | 'content' | 'category' | 'author_name' | 'published_at' | 'updated_at' | 'og_image'>[]

  const items = posts.map(post => {
    const url = `${SITE.url}/blog/${post.slug}`
    const pubDate = new Date(post.published_at ?? post.updated_at).toUTCString()
    const description = post.excerpt
      ? escapeXml(post.excerpt)
      : escapeXml(stripHtml(post.content))
    const image = post.og_image ?? `${SITE.url}/og-image.jpg`

    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <category>${escapeXml(post.category)}</category>
      <author>hello@scalifylabs.com (${escapeXml(post.author_name)})</author>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${escapeXml(image)}" type="image/jpeg" length="0" />
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(SITE.name)} — Digital Marketing Intelligence</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Research-backed digital marketing guides, SEO playbooks, Google Ads strategies, and AI marketing frameworks for Indian businesses.</description>
    <language>en-IN</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE.name)}. All rights reserved.</copyright>
    <managingEditor>hello@scalifylabs.com (${escapeXml(SITE.founder)})</managingEditor>
    <webMaster>hello@scalifylabs.com (${escapeXml(SITE.founder)})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE.url}/logo.png</url>
      <title>${escapeXml(SITE.name)}</title>
      <link>${SITE.url}</link>
    </image>${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
