import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const db = createServerClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (db as any).from('leads').insert({
      name: name || email.split('@')[0],
      phone: '0000000000',
      email,
      source: 'newsletter',
      service_interest: 'Newsletter Subscription',
      stage: 'new',
      score: 20,
    })

    if (error && error.code !== '23505') {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
