import { createServerClient } from '@/lib/supabase'
import { Super30Manager } from '@/components/admin/Super30Manager'

export const revalidate = 0

export default async function Super30AdminPage({
  searchParams,
}: {
  searchParams: { stage?: string; batch?: string }
}) {
  const db = createServerClient()

  const [{ data: batches }, { data: allApplicants }] = await Promise.all([
    db.from('s30_batches').select('*').order('created_at', { ascending: false }),
    db.from('s30_applicants').select('*').order('created_at', { ascending: false }),
  ])

  const activeBatch = batches?.find(b => b.status === 'accepting') || batches?.[0]

  return (
    <Super30Manager
      batches={batches || []}
      allApplicants={allApplicants || []}
      activeBatchId={activeBatch?.id || null}
    />
  )
}
