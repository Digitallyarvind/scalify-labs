import { createServerClient } from '@/lib/supabase'
export const revalidate = 0

export default async function MediaPage() {
  const db = createServerClient()
  const { data: files } = await db.from('media').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-6 bg-[#F7F4EF] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1410]" style={{ fontFamily: 'Syne, sans-serif' }}>Media Library</h1>
        <span className="text-xs font-mono px-3 py-1.5 bg-white border border-[#E8E3DA] rounded-lg text-[#9C9189]">
          {(files ?? []).length} files
        </span>
      </div>

      <div className="bg-white border-2 border-dashed border-[#E8E3DA] rounded-2xl p-12 text-center mb-6">
        <div className="text-4xl mb-3">🖼</div>
        <p className="font-semibold text-[#1A1410] mb-1">Drag & drop files here</p>
        <p className="text-sm text-[#9C9189] mb-4">PNG, JPG, WebP, GIF — max 5MB each</p>
        <label className="inline-block px-5 py-2.5 rounded-lg bg-[#FF6500] text-white text-sm font-bold cursor-pointer hover:bg-[#E05800] transition-colors">
          Browse Files
          <input type="file" multiple accept="image/*" className="hidden" />
        </label>
      </div>

      {(files ?? []).length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {(files ?? []).map((f: Record<string, unknown>) => (
            <div key={f.id as string} className="bg-white border border-[#E8E3DA] rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
              <div className="aspect-square bg-[#F7F4EF] flex items-center justify-center">
                {(f.url as string) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.url as string} alt={f.filename as string} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">📄</span>
                )}
              </div>
              <div className="p-2">
                <p className="text-[10px] font-mono text-[#9C9189] truncate">{f.filename as string}</p>
                <button onClick={() => navigator.clipboard.writeText(f.url as string)}
                  className="text-[9px] text-[#FF6500] hover:underline font-mono">Copy URL</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[#9C9189] text-sm">
          No media files yet. Upload your first image above.
        </div>
      )}
    </div>
  )
}
