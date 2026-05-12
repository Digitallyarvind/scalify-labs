import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { BlogEditor } from '@/components/admin/BlogEditor'
import type { Post } from '@/types/database'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const db = createServerClient()
  const { data: postRaw } = await db.from('posts').select('*').eq('id', params.id).single()
  const post = postRaw as Post | null
  if (!post) notFound()
  return <BlogEditor post={post} />
}
