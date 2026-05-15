'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { href: '/admin/dashboard', icon: '⊞', label: 'Dashboard' },
      { href: '/admin/seo', icon: '📈', label: 'Analytics (GSC)' },
    ],
  },
  {
    label: 'Website',
    items: [
      { href: '/admin/cms', icon: '🗂', label: 'Pages' },
      { href: '/admin/blog', icon: '✍️', label: 'Blog Posts' },
      { href: '/admin/city-pages', icon: '📍', label: 'City Pages' },
      { href: '/admin/media', icon: '🖼', label: 'Media Library' },
    ],
  },
  {
    label: 'CRM',
    items: [
      { href: '/admin/crm', icon: '🎯', label: 'Pipeline' },
      { href: '/admin/contacts', icon: '👥', label: 'All Contacts' },
      { href: '/admin/tasks', icon: '✅', label: 'Tasks' },
      { href: '/admin/whatsapp', icon: '💬', label: 'WhatsApp' },
    ],
  },
  {
    label: 'Super 30',
    items: [
      { href: '/admin/super-30', icon: '🎓', label: 'Applications' },
      { href: '/admin/super-30/merit', icon: '🏆', label: 'Merit List' },
      { href: '/admin/super-30/batches', icon: '📦', label: 'Batches' },
    ],
  },
  {
    label: 'Careers',
    items: [
      { href: '/admin/careers', icon: '💼', label: 'Job Listings' },
      { href: '/admin/careers/applications', icon: '📋', label: 'Applications' },
      { href: '/admin/careers/team', icon: '👤', label: 'Team' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: '', pass: '' })
  const [loginErr, setLoginErr] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const ok = sessionStorage.getItem('sl_admin_auth')
    if (ok === 'true') setAuthed(true)
    setChecking(false)
  }, [])

  function login() {
    if (loginForm.email === 'admin@scalifylabs.com' && loginForm.pass === 'scalify2026') {
      sessionStorage.setItem('sl_admin_auth', 'true')
      setAuthed(true)
      setLoginErr('')
    } else {
      setLoginErr('Invalid email or password')
    }
  }

  function logout() {
    sessionStorage.removeItem('sl_admin_auth')
    setAuthed(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#FF6500] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg shadow-orange-200">S</div>
            <h1 className="text-[#1A1410] font-black text-2xl tracking-tight">Scalify Admin</h1>
            <p className="text-[#9C9189] text-sm mt-1">Sign in to continue</p>
          </div>
          <div className="bg-white border border-[#E8E3DA] rounded-2xl p-7 shadow-sm">
            {loginErr && <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-red-600 text-sm mb-4">{loginErr}</div>}
            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-[10px] font-mono text-[#9C9189] uppercase tracking-widest mb-1.5">Email</label>
                <input type="email" value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && login()}
                  placeholder="admin@scalifylabs.com"
                  className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-[#1A1410] text-sm px-3 py-2.5 outline-none focus:border-[#FF6500] focus:shadow-[0_0_0_3px_rgba(255,101,0,0.1)] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#9C9189] uppercase tracking-widest mb-1.5">Password</label>
                <input type="password" value={loginForm.pass}
                  onChange={e => setLoginForm(f => ({ ...f, pass: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && login()}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F4EF] border border-[#E8E3DA] rounded-lg text-[#1A1410] text-sm px-3 py-2.5 outline-none focus:border-[#FF6500] focus:shadow-[0_0_0_3px_rgba(255,101,0,0.1)] transition-all" />
              </div>
            </div>
            <button onClick={login} className="w-full bg-[#FF6500] text-white font-bold text-sm py-3 rounded-lg hover:bg-[#E05800] transition-colors">
              Sign In →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F7F4EF] overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} bg-white border-r border-[#E8E3DA] flex flex-col flex-shrink-0 transition-all duration-200 overflow-hidden`}>
        <div className="px-3 py-3.5 border-b border-[#E8E3DA] flex items-center gap-2.5 flex-shrink-0">
          <div className="w-7 h-7 bg-[#FF6500] rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0">S</div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-[#1A1410] font-black text-sm tracking-tight leading-none">
                Scalify<span className="text-[#FF6500]">Labs</span>
              </div>
              <div className="text-[#9C9189] font-mono text-[9px] mt-0.5">Admin Panel</div>
            </div>
          )}
        </div>
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-4">
              {sidebarOpen && <p className="px-2 mb-1 text-[9px] font-mono uppercase tracking-widest text-[#9C9189]">{group.label}</p>}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link key={item.href} href={item.href}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[0.8rem] font-medium transition-all ${
                        active ? 'bg-[rgba(255,101,0,0.08)] text-[#FF6500] font-semibold' : 'text-[#57534E] hover:text-[#1A1410] hover:bg-[#F7F4EF]'
                      }`}>
                      <span className="text-sm w-4 text-center flex-shrink-0">{item.icon}</span>
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-2 border-t border-[#E8E3DA] space-y-0.5 flex-shrink-0">
          <a href="/" target="_blank"
            className="flex items-center gap-2 px-2.5 py-2 text-[#9C9189] hover:text-[#57534E] hover:bg-[#F7F4EF] rounded-lg text-xs font-mono transition-colors">
            <span>🌐</span>{sidebarOpen && <span>View Website ↗</span>}
          </a>
          <button onClick={logout}
            className="flex items-center gap-2 px-2.5 py-2 text-[#9C9189] hover:text-red-500 hover:bg-red-50 rounded-lg text-xs font-mono transition-colors w-full">
            <span>→</span>{sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-[52px] bg-white border-b border-[#E8E3DA] flex items-center px-4 gap-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(s => !s)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7F4EF] text-[#9C9189] transition-colors text-base">
            ☰
          </button>
          <div className="flex-1" />
          <a href="/admin/blog/new"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6500] text-white text-xs font-bold rounded-lg hover:bg-[#E05800] transition-colors">
            + New Post
          </a>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FF6500] flex items-center justify-center text-white text-xs font-black">A</div>
            <span className="text-[#57534E] text-xs font-medium hidden sm:block">Arvind Gupta</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
