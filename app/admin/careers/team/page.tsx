import { createServerClient } from '@/lib/supabase'
export const revalidate = 0

export default async function TeamPage() {
  const db = createServerClient()
  const { data: team } = await db.from('team_members').select('*').order('join_date', { ascending: false })

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Team Directory</h1>
        <span className="text-xs font-mono px-3 py-1.5 bg-white border border-[#E8E3DA] rounded-lg text-[#9C9189]">
          {(team ?? []).filter((m: Record<string,unknown>) => m.status === 'active').length} active
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(team ?? []).map((m: Record<string,unknown>) => (
          <div key={m.id as string} className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-[rgba(255,101,0,0.1)] flex items-center justify-center text-[#FF6500] font-black text-lg">
                {(m.name as string)?.[0]}
              </div>
              <div>
                <p className="font-bold text-[#1A1410]">{m.name as string}</p>
                <p className="text-xs text-[#9C9189]">{m.role as string}</p>
              </div>
            </div>
            <p className="text-xs font-mono text-[#57534E] mb-1">{m.department as string}</p>
            {m.join_date ? (
              <p className="text-[10px] font-mono text-[#9C9189]">
                Joined {new Date(m.join_date as string).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
            ) : null}
            <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: m.status === 'active' ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)', color: m.status === 'active' ? '#16A34A' : '#DC2626' }}>
              {m.status as string}
            </span>
          </div>
        ))}
        {!(team ?? []).length && (
          <div className="col-span-3 text-center py-16 text-[#9C9189]">
            <p className="text-lg mb-2">No team members yet</p>
            <p className="text-sm">Hire candidates from Career Applications to add them here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
