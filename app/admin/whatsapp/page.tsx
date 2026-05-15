'use client'
import { useState } from 'react'
const SEGMENTS = ['All Leads','Hot Leads (80+ score)','New Leads (today)','Proposal Stage','Won Clients','Super 30 Enquiries','Career Applicants']
const TEMPLATES = [
  {name:'Agency Introduction',msg:'Hi {name}! I am Arvind from Scalify Labs. We help businesses like {business} grow with digital marketing. Can I share how we helped similar businesses in {city}? — Arvind | +91 87884 24727'},
  {name:'Follow-up After Meeting',msg:'Hi {name}! Great speaking with you about {service}. As discussed, here is what we can do for {business}: [details]. Ready to move forward? — Arvind | Scalify Labs'},
  {name:'Proposal Follow-up',msg:'Hi {name}, just checking in on the proposal I sent for {business}. Any questions? Happy to jump on a quick call. — Arvind | Scalify Labs'},
  {name:'Special Offer',msg:'Hi {name}! Special offer for {business} this month — 20% off our {service} package. Limited to 5 clients. Interested? — Arvind | Scalify Labs'},
  {name:'Monthly Check-in',msg:'Hi {name}! Checking in on how {business} is doing. Would love to explore how we can help you grow this month. — Arvind | Scalify Labs'},
  {name:'Super 30 Announcement',msg:'Hi {name}! Our Super 30 Growth Accelerator next batch is now open. Only 30 seats. 45 days, Ranchi. Interested? Reply YES for details. — Arvind | Scalify Labs'},
  {name:'Course Reminder',msg:'Hi {name}! Reminder — Super 30 batch starts soon. Only a few seats left. Confirm your seat today! — Arvind | Scalify Labs'},
  {name:'Festival Greeting',msg:'Hi {name}! Warm wishes from Team Scalify Labs 🎉 Wishing you and {business} a prosperous season ahead! — Arvind & Team'},
  {name:'Testimonial Request',msg:'Hi {name}! Working with {business} has been great. Would you mind sharing a quick Google review? It really helps us. Here is the link: [GSC link] — Arvind'},
  {name:'Re-engagement',msg:'Hi {name}! It has been a while. Hope {business} is doing well! We have some new strategies for {service} that might interest you. Can we reconnect? — Arvind | Scalify Labs'},
]
export default function WhatsAppPage() {
  const [seg, setSeg] = useState(SEGMENTS[0])
  const [tmpl, setTmpl] = useState(TEMPLATES[0])
  const preview = tmpl.msg.replace(/{name}/g,'Rahul').replace(/{business}/g,'TechCo').replace(/{service}/g,'SEO').replace(/{city}/g,'Ranchi').replace(/{price}/g,'₹15,000')
  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full space-y-6">
      <h1 className="text-2xl font-black text-[#1A1410]" style={{fontFamily:'Syne,sans-serif'}}>WhatsApp Broadcast</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Select Segment</p>
            <div className="space-y-1.5">
              {SEGMENTS.map(s=>(
                <button key={s} onClick={()=>setSeg(s)} className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors" style={{background:seg===s?'rgba(255,101,0,0.08)':'transparent',color:seg===s?'#FF6500':'#57534E',fontWeight:seg===s?600:400}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Select Template</p>
            <div className="space-y-1.5">
              {TEMPLATES.map(t=>(
                <button key={t.name} onClick={()=>setTmpl(t)} className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors" style={{background:tmpl.name===t.name?'rgba(255,101,0,0.08)':'transparent',color:tmpl.name===t.name?'#FF6500':'#57534E',fontWeight:tmpl.name===t.name?600:400}}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Message Preview</p>
            <div className="bg-[#F7F4EF] rounded-xl p-4 text-sm text-[#1A1410] leading-relaxed whitespace-pre-wrap">{preview}</div>
            <p className="text-[10px] font-mono text-[#9C9189] mt-2">Variables: {'{name} {business} {service} {city} {price}'}</p>
          </div>
          <div className="bg-white border border-[#E8E3DA] rounded-xl p-5 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Send Broadcast</p>
            <p className="text-sm text-[#57534E] mb-4">Segment: <strong className="text-[#1A1410]">{seg}</strong></p>
            <a href={`https://web.whatsapp.com/send?text=${encodeURIComponent(preview)}`} target="_blank" rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2">
              💬 Open WhatsApp Web with Message
            </a>
            <p className="text-[10px] text-[#9C9189] text-center mt-2">Opens WhatsApp Web — send manually to each contact in segment</p>
          </div>
        </div>
      </div>
    </div>
  )
}
