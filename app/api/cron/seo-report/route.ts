import { NextRequest, NextResponse } from 'next/server'
import { fetchGSCReport } from '@/lib/gsc'
import { analyzeSEOData } from '@/lib/seo-analysis'
import { createServerClient } from '@/lib/supabase'

/* eslint-disable @typescript-eslint/no-explicit-any */
function table(db: ReturnType<typeof createServerClient>, name: string) {
  return (db as any).from(name)
}

export async function GET(request: NextRequest) {
  // Verify Vercel cron secret
  const auth = request.headers.get('authorization')
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[SEO Cron] Fetching GSC data...')
    const report = await fetchGSCReport()

    console.log(
      `[SEO Cron] GSC data: ${report.currentPeriod.totalClicks} clicks, ` +
        `${report.currentPeriod.totalImpressions} impressions`,
    )

    console.log('[SEO Cron] Calling Claude API for analysis...')
    const analysis = await analyzeSEOData(report)

    console.log('[SEO Cron] Saving report to Supabase...')
    const db = createServerClient()
    const { error } = await table(db, 'seo_reports').insert({
      period_start: report.currentPeriod.startDate,
      period_end: report.currentPeriod.endDate,
      total_clicks: report.currentPeriod.totalClicks,
      total_impressions: report.currentPeriod.totalImpressions,
      avg_ctr: report.currentPeriod.avgCTR,
      avg_position: report.currentPeriod.avgPosition,
      prev_clicks: report.previousPeriod.totalClicks,
      prev_impressions: report.previousPeriod.totalImpressions,
      trend: analysis.trend,
      top_queries: report.currentPeriod.topQueries,
      declining_queries: report.decliningQueries,
      opportunity_queries: report.opportunityQueries,
      low_ctr_pages: report.lowCTRPages,
      ai_analysis: analysis.summary,
      action_items: analysis.action_items,
      key_insights: analysis.key_insights,
      content_opportunities: analysis.content_opportunities,
      quick_wins: analysis.quick_wins,
    })

    if (error) throw new Error(`Supabase insert failed: ${error.message}`)

    console.log('[SEO Cron] Done.')
    return NextResponse.json({
      success: true,
      period: `${report.currentPeriod.startDate} → ${report.currentPeriod.endDate}`,
      clicks: report.currentPeriod.totalClicks,
      actionItems: analysis.action_items.length,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[SEO Cron] Failed:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
