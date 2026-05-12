import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET() {
  try {
    const db = createServerClient()
    const { data, error } = await (db as any)
      .from('seo_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) throw error
    return NextResponse.json({ reports: data || [] })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
