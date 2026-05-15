import { createServerClient } from '@/lib/supabase'
export const revalidate = 0

export default async function BatchesPage() {
  const db = createServerClient()
  const [{ data: batches }, { data: applicants }] = await Promise.all([
    db.from('s30_batches').select('*').order('created_at', { ascending: false }),
    db.from('s30_applicants').select('batch_id,status'),
  ])

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full">
      <h1 className="text-2xl font-black text-[#1A1410] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>Batches</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(batches ?? []).map((b: Record<string, unknown>) => {
          const batchApps = (applicants ?? []).filter((a: Record<string, unknown>) => a.batch_id === b.id)
          const enrolled = batchApps.filter((a: Record<string, unknown>) => a.status === 'enrolled').length
          const seats = (b.seats as number) ?? 30
          const fee = (b.fee as number) ?? 12000
          const revenue = enrolled * fee
          const fillPct = Math.round((enrolled / seats) * 100)
          const STATUS_COLORS: Record<string, string> = { upcoming: '#2563EB', accepting: '#16A34A', closed: '#DC2626', completed: '#9C9189' }
          return (
            <div key={b.id as string} className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-black text-lg text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>{b.name as string}</p>
                  <p className="text-xs font-mono text-[#9C9189]">{b.mode as string} · ₹{fee.toLocaleString()}/seat</p>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full capitalize"
                  style={{ background: (STATUS_COLORS[b.status as string] || '#9C9189') + '15', color: STATUS_COLORS[b.status as string] || '#9C9189' }}>
                  {b.status as string}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="bg-[#F7F4EF] rounded-lg p-2">
                  <p className="text-lg font-black text-[#FF6500]">{enrolled}</p>
                  <p className="text-[9px] font-mono text-[#9C9189] uppercase">Enrolled</p>
                </div>
                <div className="bg-[#F7F4EF] rounded-lg p-2">
                  <p className="text-lg font-black text-[#1A1410]">{seats}</p>
                  <p className="text-[9px] font-mono text-[#9C9189] uppercase">Seats</p>
                </div>
                <div className="bg-[#F7F4EF] rounded-lg p-2">
                  <p className="text-lg font-black text-[#16A34A]">₹{Math.round(revenue / 1000)}K</p>
                  <p className="text-[9px] font-mono text-[#9C9189] uppercase">Revenue</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#9C9189]">Seats filled</span>
                  <span className="font-bold text-[#1A1410]">{fillPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#E8E3DA] overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${fillPct}%`, background: fillPct >= 90 ? '#16A34A' : fillPct >= 60 ? '#FF6500' : '#2563EB' }} />
                </div>
              </div>

              {(b.start_date || b.end_date) ? (
                <div className="flex gap-4 text-xs font-mono text-[#9C9189]">
                  {b.start_date ? <span>Start: {new Date(b.start_date as string).toLocaleDateString('en-IN')}</span> : null}
                  {b.end_date ? <span>End: {new Date(b.end_date as string).toLocaleDateString('en-IN')}</span> : null}
                </div>
              ) : null}
            </div>
          )
        })}
        {!(batches ?? []).length && (
          <div className="col-span-3 text-center py-16 text-[#9C9189]">
            No batches created yet. Create batches from Super 30 settings.
          </div>
        )}
      </div>
    </div>
  )
}
