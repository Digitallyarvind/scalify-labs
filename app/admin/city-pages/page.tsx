import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
export const revalidate = 0

const CITIES = [
  { name: 'Ranchi', state: 'Jharkhand', slug: 'ranchi' },
  { name: 'Jamshedpur', state: 'Jharkhand', slug: 'jamshedpur' },
  { name: 'Dhanbad', state: 'Jharkhand', slug: 'dhanbad' },
  { name: 'Bokaro', state: 'Jharkhand', slug: 'bokaro' },
  { name: 'Hazaribagh', state: 'Jharkhand', slug: 'hazaribagh' },
  { name: 'Patna', state: 'Bihar', slug: 'patna' },
  { name: 'Gaya', state: 'Bihar', slug: 'gaya' },
  { name: 'Muzaffarpur', state: 'Bihar', slug: 'muzaffarpur' },
  { name: 'Lucknow', state: 'UP', slug: 'lucknow' },
  { name: 'Varanasi', state: 'UP', slug: 'varanasi' },
  { name: 'Agra', state: 'UP', slug: 'agra' },
  { name: 'Kanpur', state: 'UP', slug: 'kanpur' },
  { name: 'Raipur', state: 'Chhattisgarh', slug: 'raipur' },
  { name: 'Bhopal', state: 'MP', slug: 'bhopal' },
  { name: 'Indore', state: 'MP', slug: 'indore' },
  { name: 'Jaipur', state: 'Rajasthan', slug: 'jaipur' },
  { name: 'Delhi', state: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', state: 'Maharashtra', slug: 'mumbai' },
  { name: 'Bangalore', state: 'Karnataka', slug: 'bangalore' },
  { name: 'Pune', state: 'Maharashtra', slug: 'pune' },
  { name: 'Hyderabad', state: 'Telangana', slug: 'hyderabad' },
]

export default async function CityPagesAdmin() {
  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>City Pages</h1>
          <p className="text-sm text-[#9C9189] mt-0.5">{CITIES.length} city pages · All published</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CITIES.map(city => (
          <div key={city.slug} className="bg-white border border-[#E8E3DA] rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-[#1A1410]">{city.name}</p>
                <p className="text-xs font-mono text-[#9C9189]">{city.state}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[rgba(22,163,74,0.08)] text-[#16A34A]">
                published
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#9C9189] mb-3">/cities/{city.slug}</p>
            <div className="flex gap-2">
              <Link href={`/admin/cms?page=cities-${city.slug}`}
                className="flex-1 text-center text-[10px] py-1.5 rounded-lg bg-[rgba(255,101,0,0.08)] text-[#FF6500] font-semibold hover:bg-[rgba(255,101,0,0.12)] transition-colors">
                Edit
              </Link>
              <a href={`/cities/${city.slug}`} target="_blank"
                className="flex-1 text-center text-[10px] py-1.5 rounded-lg bg-[#F7F4EF] text-[#57534E] font-semibold hover:bg-[#F0ECE4] transition-colors">
                View ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border border-[#E8E3DA] rounded-xl p-6 shadow-sm">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#9C9189] mb-3">Bulk Actions</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded-lg bg-[rgba(255,101,0,0.08)] text-[#FF6500] text-sm font-semibold border border-[rgba(255,101,0,0.2)] hover:bg-[rgba(255,101,0,0.12)] transition-colors">
            🤖 Regenerate All with AI
          </button>
          <button className="px-4 py-2.5 rounded-lg bg-[#F7F4EF] text-[#57534E] text-sm font-semibold border border-[#E8E3DA] hover:bg-[#F0ECE4] transition-colors">
            📊 Export City SEO Report
          </button>
          <button className="px-4 py-2.5 rounded-lg bg-[#F7F4EF] text-[#57534E] text-sm font-semibold border border-[#E8E3DA] hover:bg-[#F0ECE4] transition-colors">
            ✅ Bulk Publish All
          </button>
        </div>
      </div>
    </div>
  )
}
