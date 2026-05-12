import { createServerClient } from '@/lib/supabase'
import { CRMBoard } from '@/components/admin/CRMBoard'
import type { Lead } from '@/types/database'

export const revalidate = 0

export default async function CRMPage({
  searchParams,
}: {
  searchParams: { source?: string }
}) {
  const db = createServerClient()
  const source = searchParams.source || 'all'

  let query = db.from('leads').select('*, lead_activities(*)').order('created_at', { ascending: false })
  if (source !== 'all') query = query.ilike('source', `%${source}%`) as typeof query

  const { data: leads } = await query as unknown as { data: Lead[] | null }

  // Pipeline summary
  const stages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost']
  const summary = stages.map(stage => ({
    stage,
    count: leads?.filter(l => l.stage === stage).length || 0,
  }))

  const totalPipeline = leads
    ?.filter(l => !['won', 'lost'].includes(l.stage))
    .reduce((sum, l) => sum + budgetMid(l.budget), 0) || 0

  return (
    <CRMBoard
      initialLeads={leads || []}
      summary={summary}
      totalPipeline={totalPipeline}
    />
  )
}

function budgetMid(b: string | null): number {
  const map: Record<string, number> = { '5-10k': 7500, '10-20k': 15000, '20-50k': 35000, '50k+': 75000 }
  return map[b || ''] || 0
}
