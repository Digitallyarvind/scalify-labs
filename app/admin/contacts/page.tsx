import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
export const revalidate = 0
export default async function ContactsPage() {
  const db = createServerClient()
  const { data: leads } = await db.from('leads').select('*').order('created_at', { ascending: false })
  const all = leads ?? []
  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>All Contacts</h1>
        <div className="flex gap-2 text-xs font-mono text-[#9C9189]">
          <span className="px-3 py-1.5 bg-white border border-[#E8E3DA] rounded-lg">{all.length} total</span>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#E8E3DA] overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F7F4EF] border-b border-[#E8E3DA]">
              {['Name','Phone','Business','City','Source','Service','Stage','Created'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.map((l: any) => (
              <tr key={l.id} className="border-b border-[#E8E3DA] hover:bg-[#FAFAF8] transition-colors">
                <td className="px-4 py-3 font-semibold text-[#1A1410]">{l.name}</td>
                <td className="px-4 py-3 font-mono text-[#57534E]"><a href={`https://wa.me/${l.phone?.replace(/\D/g,'')}`} target="_blank" className="hover:text-[#16A34A]">{l.phone}</a></td>
                <td className="px-4 py-3 text-[#57534E]">{l.business || '—'}</td>
                <td className="px-4 py-3 text-[#57534E]">{l.city || '—'}</td>
                <td className="px-4 py-3 font-mono text-[#9C9189] text-xs">{l.source}</td>
                <td className="px-4 py-3 text-[#57534E]">{l.service_interest || '—'}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize"
                    style={{ background: l.stage === 'won' ? 'rgba(22,163,74,0.08)' : l.stage === 'lost' ? 'rgba(220,38,38,0.08)' : 'rgba(255,101,0,0.08)', color: l.stage === 'won' ? '#16A34A' : l.stage === 'lost' ? '#DC2626' : '#FF6500' }}>
                    {l.stage || 'new'}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#9C9189]">{new Date(l.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
            {!all.length && <tr><td colSpan={8} className="px-4 py-12 text-center text-[#9C9189] text-sm">No contacts yet. <Link href="/admin/crm" className="text-[#FF6500]">Add via CRM →</Link></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
