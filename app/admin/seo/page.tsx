'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, AlertCircle, Zap, BookOpen } from 'lucide-react'

interface ActionItem {
  priority: 'high' | 'medium' | 'low'
  type: string
  title: string
  description: string
  estimated_impact: string
  page_or_keyword?: string
}

interface SEOReport {
  id: string
  period_start: string
  period_end: string
  total_clicks: number
  total_impressions: number
  avg_ctr: number
  avg_position: number
  prev_clicks: number
  trend: 'up' | 'down' | 'stable'
  ai_analysis: string
  action_items: ActionItem[]
  key_insights: string[]
  content_opportunities: string[]
  quick_wins: string[]
  created_at: string
}

const priorityColor: Record<string, string> = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
}

export default function SEOReportsPage() {
  const [reports, setReports] = useState<SEOReport[]>([])
  const [selected, setSelected] = useState<SEOReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    fetchReports()
  }, [])

  async function fetchReports() {
    try {
      const res = await fetch('/api/admin/seo-reports')
      const data = await res.json()
      setReports(data.reports || [])
      if (data.reports?.length) setSelected(data.reports[0])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function triggerCron() {
    setRunning(true)
    try {
      const res = await fetch('/api/cron/seo-report', {
        headers: { Authorization: `Bearer ${prompt('Enter CRON_SECRET:') || ''}` },
      })
      const data = await res.json()
      if (data.success) {
        alert(`Report generated! ${data.actionItems} action items.`)
        fetchReports()
      } else {
        alert(`Error: ${data.error}`)
      }
    } finally {
      setRunning(false)
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading SEO reports...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Intelligence</h1>
            <p className="text-gray-500 mt-1">GSC + Claude analysis · runs 1st &amp; 16th each month</p>
          </div>
          <button
            onClick={triggerCron}
            disabled={running}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
          >
            {running ? 'Running...' : 'Run Now'}
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No reports yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Add GSC credentials and click &quot;Run Now&quot; to generate the first report.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* Report list */}
            <div className="col-span-3 space-y-2">
              {reports.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selected?.id === r.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {r.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {r.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {r.trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(r.period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{r.total_clicks.toLocaleString()} clicks</p>
                </button>
              ))}
            </div>

            {/* Report detail */}
            {selected && (
              <div className="col-span-9 space-y-6">
                {/* KPI bar */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Clicks', value: selected.total_clicks.toLocaleString(), delta: selected.prev_clicks ? `${selected.total_clicks > selected.prev_clicks ? '+' : ''}${Math.round(((selected.total_clicks - selected.prev_clicks) / selected.prev_clicks) * 100)}%` : null },
                    { label: 'Impressions', value: selected.total_impressions.toLocaleString(), delta: null },
                    { label: 'Avg CTR', value: `${selected.avg_ctr}%`, delta: null },
                    { label: 'Avg Position', value: `#${selected.avg_position}`, delta: null },
                  ].map(kpi => (
                    <div key={kpi.label} className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                      {kpi.delta && (
                        <p className={`text-xs mt-1 font-medium ${kpi.delta.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.delta} vs prev period
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* AI Summary */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h2 className="font-semibold text-gray-900 mb-2">AI Analysis</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{selected.ai_analysis}</p>
                  {selected.key_insights?.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {selected.key_insights.map((ins, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          {ins}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Action Items */}
                {selected.action_items?.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="font-semibold text-gray-900 mb-4">
                      Action Items ({selected.action_items.length})
                    </h2>
                    <div className="space-y-3">
                      {selected.action_items.map((item, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium h-fit mt-0.5 shrink-0 ${priorityColor[item.priority]}`}>
                            {item.priority}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                            {item.page_or_keyword && (
                              <p className="text-xs text-blue-600 mt-1 font-mono truncate">{item.page_or_keyword}</p>
                            )}
                            <p className="text-xs text-green-700 mt-1">↑ {item.estimated_impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {/* Quick Wins */}
                  {selected.quick_wins?.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <h2 className="font-semibold text-gray-900">Quick Wins</h2>
                      </div>
                      <ul className="space-y-2">
                        {selected.quick_wins.map((w, i) => (
                          <li key={i} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-yellow-500 shrink-0">⚡</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Content Opportunities */}
                  {selected.content_opportunities?.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <h2 className="font-semibold text-gray-900">Content Opportunities</h2>
                      </div>
                      <ul className="space-y-2">
                        {selected.content_opportunities.map((c, i) => (
                          <li key={i} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-blue-500 shrink-0">📝</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
