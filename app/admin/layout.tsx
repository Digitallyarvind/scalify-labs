'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin/dashboard', icon: '⊞', label: 'Dashboard' },
  { href: '/admin/cms', icon: '🗂', label: 'Pages (CMS)' },
  { href: '/admin/blog', icon: '✍️', label: 'Blog Posts' },
  { href: '/admin/crm', icon: '🎯', label: 'CRM Pipeline' },
  { href: '/admin/super-30', icon: '🎓', label: 'Super 30' },
  { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: '', pass: '' })
  const [loginErr, setLoginErr] = useState('')

  useEffect(() => {
    const ok = sessionStorage.getItem('sl_admin_auth')
    if (ok === 'true') setAuthed(true)
    setChecking(false)
  }, [])

  function login() {
    // Simple credential check — replace with Supabase Auth in production
    const ADMIN_EMAIL = 'admin@scalifylabs.com'
    const ADMIN_PASS = 'scalify2026'
    if (loginForm.email === ADMIN_EMAIL && loginForm.pass === ADMIN_PASS) {
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
      <div className="min-h-screen bg-[#0B0F1E] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0B0F1E] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#FF6500] rounded-xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4">S</div>
            <h1 className="text-white font-black text-2xl tracking-tight">Scalify Admin</h1>
            <p className="text-white/40 text-sm mt-1">Sign in to your dashboard</p>
          </div>
          <div className="bg-[#111827] border border-white/8 rounded-2xl p-7">
            {loginErr && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 text-red-400 text-sm mb-4">
                {loginErr}
              </div>
            )}
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && login()}
                  placeholder="admin@scalifylabs.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg text-white text-sm px-3 py-2.5 outline-none focus:border-[#FF6500] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Password</label>
                <input
                  type="password"
                  value={loginForm.pass}
                  onChange={e => setLoginForm(f => ({ ...f, pass: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && login()}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg text-white text-sm px-3 py-2.5 outline-none focus:border-[#FF6500] transition-colors"
                />
              </div>
            </div>
            <button
              onClick={login}
              className="w-full bg-[#FF6500] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#E05800] transition-colors"
            >
              Sign In →
            </button>
            <p className="text-white/20 text-xs text-center mt-4 font-mono">
              admin@scalifylabs.com / scalify2026
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0B0F1E] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0D1117] border-r border-white/6 flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-4 py-4 border-b border-white/6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#FF6500] rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0">S</div>
            <div>
              <div className="text-white font-black text-sm tracking-tight leading-none">ScalifyLabs</div>
              <div className="text-white/30 font-mono text-[9px] mt-0.5">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {NAV.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium mb-0.5 transition-all ${
                  active
                    ? 'bg-[rgba(255,101,0,0.12)] text-[#FF6500]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base w-4 text-center">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Website link */}
        <div className="p-2 border-t border-white/6">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-white/30 hover:text-white/60 text-xs font-mono transition-colors"
          >
            <span>🌐</span> View Website ↗
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-white/30 hover:text-red-400 text-xs font-mono transition-colors w-full"
          >
            <span>→</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
