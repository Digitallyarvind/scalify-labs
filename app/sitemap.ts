import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase'
import { CITIES, SITE } from '@/lib/data'
import type { Post } from '@/types/database'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = createServerClient()

  const { data: postsRaw } = await db
    .from('posts')
    .select('slug, published_at, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  const posts = postsRaw as Post[] | null

  const now = new Date().toISOString()

  // All service pages with correct current slugs
  const SERVICE_PAGES = [
    'google-ads-services',
    'affordable-seo-services',
    'meta-ads',
    'whatsapp-marketing-agency',
    'gmb',
    'website-development',
    'rcs-messaging',
    'obd',
    'ai-calling',
    'specialized-ads',
    'email-marketing',
    'lead-management',
    'lead-to-revenue',
  ]

  return [
    // Homepage — highest priority
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },

    // Core pages
    { url: `${SITE.url}/why-scalify`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/super-30`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE.url}/contact-scalifylabs`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Service pages
    ...SERVICE_PAGES.map(slug => ({
      url: `${SITE.url}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),

    // City landing pages (local SEO)
    ...CITIES.map(c => ({
      url: `${SITE.url}/cities/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
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
