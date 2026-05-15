/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, phone, email, job_id, occupation, experience_years, skills, portfolio_url, linkedin_url, why_join } = body

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'Name, phone, and email are required' }, { status: 400 })
  }

  const db = createServerClient()
  const row: any = { name, phone, email, job_id: job_id || null, occupation, experience_years, skills, portfolio_url, linkedin_url, why_join, stage: 'applied' }
  const { error } = await (db.from('career_applications') as any).insert(row)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
