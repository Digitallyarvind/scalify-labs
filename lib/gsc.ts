import { GoogleAuth } from 'google-auth-library'

const GSC_BASE = 'https://www.googleapis.com/webmasters/v3/sites'

export interface GSCRow {
  key: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

interface RawRow {
  keys: string[]
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface GSCReport {
  currentPeriod: {
    startDate: string
    endDate: string
    totalClicks: number
    totalImpressions: number
    avgCTR: number
    avgPosition: number
    topQueries: GSCRow[]
    topPages: GSCRow[]
  }
  previousPeriod: {
    totalClicks: number
    totalImpressions: number
    avgCTR: number
    avgPosition: number
  }
  decliningQueries: Array<GSCRow & { prevPosition: number; drop: number }>
  opportunityQueries: GSCRow[]
  lowCTRPages: GSCRow[]
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function dateRange(daysBack: number, spanDays: number): { start: string; end: string } {
  const end = new Date()
  end.setDate(end.getDate() - daysBack)
  const start = new Date(end)
  start.setDate(start.getDate() - spanDays + 1)
  return { start: formatDate(start), end: formatDate(end) }
}

async function getToken(): Promise<string> {
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
  const auth = new GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const client = await auth.getClient()
  const { token } = await client.getAccessToken()
  if (!token) throw new Error('Failed to get GSC auth token')
  return token
}

async function query(
  token: string,
  dimension: 'query' | 'page',
  startDate: string,
  endDate: string,
  rowLimit = 100,
): Promise<GSCRow[]> {
  const site = encodeURIComponent(process.env.GSC_SITE_URL!)
  const res = await fetch(`${GSC_BASE}/${site}/searchAnalytics/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startDate, endDate, dimensions: [dimension], rowLimit }),
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`GSC API ${res.status}: ${msg}`)
  }
  const data = await res.json()
  return (data.rows || []).map((r: RawRow) => ({
    key: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: Math.round(r.ctr * 10000) / 100,
    position: Math.round(r.position * 10) / 10,
  }))
}

function totals(rows: GSCRow[]) {
  if (!rows.length) return { totalClicks: 0, totalImpressions: 0, avgCTR: 0, avgPosition: 0 }
  const clicks = rows.reduce((s, r) => s + r.clicks, 0)
  const imps = rows.reduce((s, r) => s + r.impressions, 0)
  const avgPos =
    rows.reduce((s, r) => s + r.position * r.impressions, 0) /
    Math.max(imps, 1)
  return {
    totalClicks: clicks,
    totalImpressions: imps,
    avgCTR: imps > 0 ? Math.round((clicks / imps) * 10000) / 100 : 0,
    avgPosition: Math.round(avgPos * 10) / 10,
  }
}

export async function fetchGSCReport(): Promise<GSCReport> {
  const token = await getToken()

  const curr = dateRange(1, 28)
  const prev = dateRange(29, 28)

  const [currQueries, currPages, prevQueries] = await Promise.all([
    query(token, 'query', curr.start, curr.end, 100),
    query(token, 'page', curr.start, curr.end, 50),
    query(token, 'query', prev.start, prev.end, 100),
  ])

  const currTotals = totals(currQueries)
  const prevTotals = totals(prevQueries)

  // Build lookup for previous period positions
  const prevMap = new Map(prevQueries.map(r => [r.key, r]))

  // Declining: position worsened by 3+ positions, and appeared in both periods
  const decliningQueries = currQueries
    .filter(r => {
      const p = prevMap.get(r.key)
      return p && r.position - p.position >= 3 && r.impressions >= 50
    })
    .map(r => ({
      ...r,
      prevPosition: prevMap.get(r.key)!.position,
      drop: Math.round((r.position - prevMap.get(r.key)!.position) * 10) / 10,
    }))
    .sort((a, b) => b.drop - a.drop)
    .slice(0, 10)

  // Opportunities: ranking 4-20 with decent impressions (one push could hit top 3)
  const opportunityQueries = currQueries
    .filter(r => r.position >= 4 && r.position <= 20 && r.impressions >= 100)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)

  // Low CTR pages: > 200 impressions but < 2% CTR
  const lowCTRPages = currPages
    .filter(r => r.impressions >= 200 && r.ctr < 2)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10)

  return {
    currentPeriod: {
      startDate: curr.start,
      endDate: curr.end,
      ...currTotals,
      topQueries: currQueries.slice(0, 20),
      topPages: currPages.slice(0, 20),
    },
    previousPeriod: prevTotals,
    decliningQueries,
    opportunityQueries,
    lowCTRPages,
  }
}
