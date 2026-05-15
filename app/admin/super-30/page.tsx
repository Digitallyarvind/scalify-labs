import { createServerClient } from '@/lib/supabase'
import { Super30Manager } from '@/components/admin/Super30Manager'

export const revalidate = 0

export default async function Super30Page() {
  const db = createServerClient()
  const [{ data: batches }, { data: applicants }] = await Promise.all([
    db.from('s30_batches').select('*').order('created_at', { ascending: false }),
    db.from('s30_applicants').select('*').order('created_at', { ascending: false }),
  ])
  return <Super30Manager batches={batches ?? []} applicants={applicants ?? []} />
}
