import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase'
import { SERVICES, CITIES, SITE } from '@/lib/data'
import type { Post } from '@/types/database'

export const revalidate = 3600 // Regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = createServerClient()

  // Fetch all published blog posts
  const { data: postsRaw } = await db
    .from('posts')
    .select('slug, published_at, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  const posts = postsRaw as Post[] | null

  const now = new Date().toISOString()

  return [
    // Homepage
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // Core pages
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE.url}/super-30`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Service pages (high priority)
    ...SERVICES.map(s => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),

    // City pages (good for local SEO)
    ...CITIES.map(c => ({
      url: `${SITE.url}/cities/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Blog posts
    ...(posts || []).map(post => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: post.updated_at || post.published_at || now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
