/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { id, stage } = await req.json()
  if (!id || !stage) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const db = createServerClient()
  const update: any = { stage }
  const { error } = await (db.from('leads') as any).update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
