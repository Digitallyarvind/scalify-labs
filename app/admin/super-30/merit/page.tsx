import { createServerClient } from '@/lib/supabase'
export const revalidate = 0

export default async function MeritListPage() {
  const db = createServerClient()
  const { data: applicants } = await db
    .from('s30_applicants')
    .select('*')
    .not('weighted_total', 'is', null)
    .gt('weighted_total', 0)
    .order('weighted_total', { ascending: false })

  const all = applicants ?? []
  const RANK_BADGES = ['🥇', '🥈', '🥉']

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Merit List</h1>
        <span className="text-xs font-mono px-3 py-1.5 bg-white border border-[#E8E3DA] rounded-lg text-[#9C9189]">
          {all.length} ranked applicants
        </span>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E3DA] overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F7F4EF] border-b border-[#E8E3DA]">
              {['Rank','Name','City','Academic','Psychometric','Interview','Motivation','Total Score','Stage'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.map((a: Record<string, unknown>, i: number) => (
              <tr key={a.id as string} className={`border-b border-[#E8E3DA] hover:bg-[#FAFAF8] transition-colors ${i < 3 ? 'bg-[rgba(255,101,0,0.02)]' : ''}`}>
                <td className="px-4 py-3">
                  <span className="text-lg">{i < 3 ? RANK_BADGES[i] : null}</span>
                  <span className="font-mono font-bold text-[#9C9189] text-xs ml-1">#{i + 1}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#1A1410]">{a.name as string}</p>
                  <p className="text-[10px] font-mono text-[#9C9189]">{a.phone as string}</p>
                </td>
                <td className="px-4 py-3 text-[#57534E]">{a.city as string}</td>
                <td className="px-4 py-3 font-mono text-center font-bold" style={{ color: '#2563EB' }}>{a.academic_score as number}</td>
                <td className="px-4 py-3 font-mono text-center font-bold" style={{ color: '#7C3AED' }}>{a.psychometric_score as number}</td>
                <td className="px-4 py-3 font-mono text-center font-bold" style={{ color: '#FF6500' }}>{a.interview_score as number}</td>
                <td className="px-4 py-3 font-mono text-center font-bold" style={{ color: '#D97706' }}>{a.motivation_score as number}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black" style={{ color: '#FF6500', fontFamily: 'Syne, sans-serif' }}>
                      {(a.weighted_total as number)?.toFixed(1)}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-[#E8E3DA] min-w-[60px]">
                      <div className="h-full rounded-full" style={{ width: `${a.weighted_total as number}%`, background: i < 30 ? '#16A34A' : '#FF6500' }} />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize text-[#57534E] bg-[#F7F4EF]">
                    {a.status as string}
                  </span>
                </td>
              </tr>
            ))}
            {!all.length && (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-[#9C9189]">
                No scored applicants yet. Add scores from the Applications page.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
