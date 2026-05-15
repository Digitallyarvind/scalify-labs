import { createServerClient } from '@/lib/supabase'
export const revalidate = 0

export default async function CareerAppsPage() {
  const db = createServerClient()
  const { data: apps } = await db.from('career_applications').select('*').order('created_at', { ascending: false })
  const STAGES = ['applied','shortlisted','interview scheduled','interviewed','offer made','hired','rejected']
  const SC: Record<string,string> = { applied:'#2563EB', shortlisted:'#7C3AED', 'interview scheduled':'#D97706', interviewed:'#FF6500', 'offer made':'#16A34A', hired:'#059669', rejected:'#DC2626' }

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full space-y-6">
      <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Career Applications</h1>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {STAGES.map(s => (
          <div key={s} className="text-center p-3 bg-white border border-[#E8E3DA] rounded-xl shadow-sm">
            <p className="text-xl font-black" style={{ color: SC[s], fontFamily: 'Syne, sans-serif' }}>
              {(apps ?? []).filter((a: Record<string,unknown>) => a.stage === s).length}
            </p>
            <p className="text-[9px] font-mono uppercase text-[#9C9189] leading-tight capitalize">{s}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-[#E8E3DA] overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="bg-[#F7F4EF] border-b border-[#E8E3DA]">
            {['Name','Phone','Skills','Experience','Stage','CV','Applied'].map(h => (
              <th key={h} className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {(apps ?? []).map((a: Record<string,unknown>) => (
              <tr key={a.id as string} className="border-b border-[#E8E3DA] hover:bg-[#FAFAF8] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#1A1410]">{a.name as string}</p>
                  <p className="text-[10px] font-mono text-[#9C9189]">{a.occupation as string}</p>
                </td>
                <td className="px-4 py-3 font-mono text-[#57534E]">
                  <a href={`https://wa.me/${(a.phone as string)?.replace(/\D/g,'')}`} target="_blank" className="hover:text-[#16A34A]">{a.phone as string}</a>
                </td>
                <td className="px-4 py-3 text-[#9C9189] text-xs">{(a.skills as string[])?.join(', ') || '—'}</td>
                <td className="px-4 py-3 font-mono text-[#9C9189]">{a.experience_years as number}yr</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize"
                    style={{ background: (SC[a.stage as string] || '#9C9189') + '15', color: SC[a.stage as string] || '#9C9189' }}>
                    {a.stage as string}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {a.cv_url ? <a href={a.cv_url as string} target="_blank" className="text-xs text-[#2563EB] hover:underline">Download</a> : '—'}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#9C9189]">{new Date(a.created_at as string).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
            {!(apps ?? []).length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#9C9189]">No applications yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
