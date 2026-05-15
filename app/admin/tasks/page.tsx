import { createServerClient } from '@/lib/supabase'
export const revalidate = 0
export default async function TasksPage() {
  const db = createServerClient()
  const { data: tasks } = await db.from('tasks').select('*,leads(name)').order('due_date', { ascending: true })
  const now = new Date()
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1)
  const next7 = new Date(now); next7.setDate(next7.getDate() + 7)
  const overdue = (tasks??[]).filter((t:any)=>t.status==='pending'&&new Date(t.due_date)<now)
  const today = (tasks??[]).filter((t:any)=>t.status==='pending'&&new Date(t.due_date)>=now&&new Date(t.due_date)<tomorrow)
  const upcoming = (tasks??[]).filter((t:any)=>t.status==='pending'&&new Date(t.due_date)>=tomorrow&&new Date(t.due_date)<next7)
  const done = (tasks??[]).filter((t:any)=>t.status==='completed')
  const PRI = {high:'#DC2626',medium:'#D97706',low:'#16A34A'}
  function Section({label,items,color}:{label:string;items:any[];color:string}) {
    return items.length > 0 ? (
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{color}}>{label} ({items.length})</p>
        <div className="space-y-2">
          {items.map((t:any)=>(
            <div key={t.id} className="bg-white border border-[#E8E3DA] rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="w-1.5 h-8 rounded-full shrink-0" style={{background:PRI[t.priority as keyof typeof PRI]||'#9C9189'}}/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1410]">{t.title}</p>
                {t.description && <p className="text-xs text-[#9C9189] truncate">{t.description}</p>}
                {t.leads?.name && <p className="text-[10px] font-mono text-[#FF6500]">→ {t.leads.name}</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-mono text-[#9C9189]">{t.due_date?new Date(t.due_date).toLocaleDateString('en-IN',{day:'2-digit',month:'short'}):''}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{background:`${PRI[t.priority as keyof typeof PRI]}15`,color:PRI[t.priority as keyof typeof PRI]||'#9C9189'}}>{t.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : null
  }
  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full space-y-6">
      <h1 className="text-2xl font-black text-[#1A1410]" style={{fontFamily:'Syne,sans-serif'}}>Tasks</h1>
      <div className="grid grid-cols-4 gap-4 text-center">
        {[{l:'Overdue',n:overdue.length,c:'#DC2626'},{l:'Today',n:today.length,c:'#D97706'},{l:'Upcoming',n:upcoming.length,c:'#2563EB'},{l:'Done',n:done.length,c:'#16A34A'}].map(s=>(
          <div key={s.l} className="bg-white border border-[#E8E3DA] rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-black" style={{color:s.c,fontFamily:'Syne,sans-serif'}}>{s.n}</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189]">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="space-y-6">
        <Section label="Overdue" items={overdue} color="#DC2626"/>
        <Section label="Due Today" items={today} color="#D97706"/>
        <Section label="Upcoming (7 days)" items={upcoming} color="#2563EB"/>
        <Section label="Completed" items={done} color="#16A34A"/>
        {!overdue.length&&!today.length&&!upcoming.length&&<div className="text-center py-12 text-[#9C9189]">No tasks yet. Add tasks from CRM lead profiles.</div>}
      </div>
    </div>
  )
}
