/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { lead_id, type, content } = await req.json()
  if (!lead_id || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const db = createServerClient()
  const row: any = { lead_id, type: (type || 'note').toLowerCase(), content, created_by: 'admin' }
  const { error } = await db.from('lead_activities').insert(row)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
