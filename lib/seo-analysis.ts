import Anthropic from '@anthropic-ai/sdk'
import type { GSCReport } from './gsc'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Cached system prompt — stable across every run so prompt cache always hits
const SYSTEM_PROMPT = `You are an expert SEO analyst for Scalify Labs — a digital marketing agency in Ranchi, Jharkhand, India that serves SMBs across Jharkhand, Bihar, UP, MP, and Rajasthan.

Services offered: SEO, Google Ads, Meta Ads, GMB optimisation, WhatsApp Marketing, Website Development, AI Systems, RCS Messaging, OBD Voice Calls, Lead-to-Revenue consulting.

Also runs "Super 30" — a 3-month offline digital marketing course in Ranchi (₹12,000 fee, 30 seats per batch).

Target keywords focus on: local SEO + city names (Ranchi, Jamshedpur, Patna, Lucknow, etc.), digital marketing services, and course enrollments.

Analyse the provided Google Search Console data and return ONLY valid JSON (no markdown, no preamble) matching this exact schema:
{
  "summary": "2-3 sentence executive summary of overall performance",
  "trend": "up|down|stable",
  "key_insights": ["insight", "insight", "insight"],
  "action_items": [
    {
      "priority": "high|medium|low",
      "type": "content|technical|local|ctr|link",
      "title": "Short action title",
      "description": "What to do and why",
      "estimated_impact": "Expected measurable outcome",
      "page_or_keyword": "Specific URL or keyword if applicable"
    }
  ],
  "content_opportunities": ["blog topic or page idea with rationale"],
  "quick_wins": ["quick fix that can be done in under 1 hour"]
}`

export interface SEOAnalysis {
  summary: string
  trend: 'up' | 'down' | 'stable'
  key_insights: string[]
  action_items: Array<{
    priority: 'high' | 'medium' | 'low'
    type: string
    title: string
    description: string
    estimated_impact: string
    page_or_keyword?: string
  }>
  content_opportunities: string[]
  quick_wins: string[]
}

export async function analyzeSEOData(report: GSCReport): Promise<SEOAnalysis> {
  const clickDelta = report.currentPeriod.totalClicks - report.previousPeriod.totalClicks
  const clickPct =
    report.previousPeriod.totalClicks > 0
      ? Math.round((clickDelta / report.previousPeriod.totalClicks) * 100)
      : 0

  const prompt = `Analyse this GSC data for scalifylabs.com (${report.currentPeriod.startDate} → ${report.currentPeriod.endDate}).

CURRENT PERIOD:
- Clicks: ${report.currentPeriod.totalClicks} (${clickPct > 0 ? '+' : ''}${clickPct}% vs prev)
- Impressions: ${report.currentPeriod.totalImpressions}
- Avg CTR: ${report.currentPeriod.avgCTR}%
- Avg Position: ${report.currentPeriod.avgPosition}

PREVIOUS PERIOD:
- Clicks: ${report.previousPeriod.totalClicks}
- Impressions: ${report.previousPeriod.totalImpressions}
- Avg CTR: ${report.previousPeriod.avgCTR}%
- Avg Position: ${report.previousPeriod.avgPosition}

TOP 20 QUERIES (current):
${report.currentPeriod.topQueries.map(q => `  "${q.key}" — pos ${q.position}, ${q.clicks} clicks, ${q.impressions} imps, ${q.ctr}% CTR`).join('\n')}

OPPORTUNITY KEYWORDS (pos 4-20):
${report.opportunityQueries.slice(0, 10).map(q => `  "${q.key}" — pos ${q.position}, ${q.impressions} imps`).join('\n')}

DECLINING KEYWORDS:
${report.decliningQueries.slice(0, 10).map(q => `  "${q.key}" — dropped ${q.drop} positions (${q.prevPosition} → ${q.position})`).join('\n')}

LOW CTR PAGES (>200 imps, <2% CTR):
${report.lowCTRPages.map(p => `  ${p.key} — ${p.ctr}% CTR, ${p.impressions} imps, pos ${p.position}`).join('\n')}

Return ONLY the JSON analysis.`

  const stream = client.messages.stream({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: prompt }],
  })

  const message = await stream.finalMessage()
  const textBlock = message.content.find(b => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text response from Claude')

  // Strip any accidental markdown code fences
  const raw = textBlock.text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()

  try {
    return JSON.parse(raw) as SEOAnalysis
  } catch {
    throw new Error(`Claude returned invalid JSON: ${raw.slice(0, 200)}`)
  }
}
