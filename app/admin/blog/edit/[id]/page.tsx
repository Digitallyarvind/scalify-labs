import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { BlogEditor } from '@/components/admin/BlogEditor'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const db = createServerClient()
  const { data: post } = await db.from('posts').select('*').eq('id', params.id).single()
  if (!post) notFound()
  return <BlogEditor post={post} />
}
