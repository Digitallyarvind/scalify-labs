import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
export const revalidate = 0

export default async function CareersAdminPage() {
  const db = createServerClient()
  const [{ data: jobs }, { data: apps }] = await Promise.all([
    db.from('job_listings').select('*').order('created_at', { ascending: false }),
    db.from('career_applications').select('*').order('created_at', { ascending: false }),
  ])
  const SC: Record<string, string> = { applied: '#2563EB', shortlisted: '#7C3AED', 'interview scheduled': '#D97706', interviewed: '#FF6500', 'offer made': '#16A34A', hired: '#059669', rejected: '#DC2626' }
  const JS: Record<string, string> = { open: '#16A34A', closed: '#DC2626', 'on hold': '#D97706' }

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Careers</h1>
        <div className="flex gap-2">
          <Link href="/admin/careers/applications" className="text-sm px-4 py-2 rounded-lg border border-[#E8E3DA] bg-white text-[#57534E] hover:bg-[#F7F4EF]">
            {(apps ?? []).length} Applications
          </Link>
          <Link href="/admin/careers/team" className="text-sm px-4 py-2 rounded-lg border border-[#E8E3DA] bg-white text-[#57534E] hover:bg-[#F7F4EF]">
            Team Directory
          </Link>
          <a href="/careers" target="_blank" className="text-sm px-4 py-2 rounded-lg bg-[#FF6500] text-white font-bold hover:bg-[#E05800]">
            View Public Page ↗
          </a>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-4">Job Listings ({(jobs ?? []).length})</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(jobs ?? []).map((job: Record<string, unknown>) => (
            <div key={job.id as string} className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-[#1A1410]">{job.title as string}</p>
                  <p className="text-xs text-[#9C9189] font-mono">{job.department as string} · {job.type as string}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize"
                  style={{ background: (JS[job.status as string] || '#9C9189') + '15', color: JS[job.status as string] || '#9C9189' }}>
                  {job.status as string}
                </span>
              </div>
              <p className="text-xs text-[#57534E] mb-2">{job.location as string}{job.salary_range ? ' · ' + job.salary_range : ''}</p>
              <p className="text-xs text-[#9C9189] line-clamp-2">{job.description as string}</p>
            </div>
          ))}
          {!(jobs ?? []).length && <div className="col-span-3 text-center py-12 text-[#9C9189]">No job listings yet</div>}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-4">Recent Applications</p>
        <div className="bg-white rounded-xl border border-[#E8E3DA] overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#F7F4EF] border-b border-[#E8E3DA]">
              {['Name','Phone','Position','Experience','Stage','Applied'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {(apps ?? []).slice(0, 10).map((a: Record<string, unknown>) => (
                <tr key={a.id as string} className="border-b border-[#E8E3DA] hover:bg-[#FAFAF8] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#1A1410]">{a.name as string}</td>
                  <td className="px-4 py-3 font-mono text-[#57534E]">{a.phone as string}</td>
                  <td className="px-4 py-3 text-[#57534E]">{a.occupation as string}</td>
                  <td className="px-4 py-3 font-mono text-[#9C9189]">{a.experience_years as number}yr</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize"
                      style={{ background: (SC[a.stage as string] || '#9C9189') + '15', color: SC[a.stage as string] || '#9C9189' }}>
                      {a.stage as string}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#9C9189]">{new Date(a.created_at as string).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
              {!(apps ?? []).length && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#9C9189] text-sm">
                  No applications yet. <a href="/careers" className="text-[#FF6500]">View public careers page →</a>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
