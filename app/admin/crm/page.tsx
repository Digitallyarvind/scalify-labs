import { createServerClient } from '@/lib/supabase'
import { CRMBoard } from '@/components/admin/CRMBoard'

export const revalidate = 0

export default async function CRMPage() {
  const db = createServerClient()
  const { data: leads } = await db
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return <CRMBoard leads={leads ?? []} />
}
