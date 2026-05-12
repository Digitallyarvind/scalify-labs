'use server'

import { createServerClient } from './supabase'
import { revalidatePath } from 'next/cache'

/* eslint-disable @typescript-eslint/no-explicit-any */
function table(db: ReturnType<typeof createServerClient>, name: string) {
  return (db as any).from(name)
}

// ─── LEAD SUBMISSION ───────────────────────────────────────
export async function submitLead(formData: {
  name: string
  phone: string
  email?: string
  business?: string
  city?: string
  source: string
  service_interest?: string
  message?: string
}) {
  const db = createServerClient()

  const { error } = await table(db, 'leads').insert({
    name: formData.name,
    phone: formData.phone,
    email: formData.email || null,
    business: formData.business || null,
    city: formData.city || null,
    source: formData.source,
    service_interest: formData.service_interest || null,
    message: formData.message || null,
    stage: 'new',
    score: 50,
  })

  if (error) throw new Error('Failed to submit lead')
  return { success: true }
}

// ─── SUPER 30 APPLICATION ───────────────────────────────────
export async function submitS30Application(formData: {
  name: string
  phone: string
  email: string
  city?: string
  occupation?: string
  education?: string
  source?: string
  why_join?: string
  one_year_goal?: string
  batch_id: string
}) {
  const db = createServerClient()

  // Check ban list
  const { data: banned } = await table(db, 's30_applicants')
    .select('ban_until, name')
    .or(`phone.eq.${formData.phone},email.eq.${formData.email}`)
    .not('ban_until', 'is', null)
    .single() as { data: { ban_until: string | null } | null }

  if (banned?.ban_until) {
    const banDate = new Date(banned.ban_until)
    if (banDate > new Date()) {
      throw new Error(
        `You cannot reapply until ${banDate.toLocaleDateString('en-IN')}. You declined your selection offer — a 12-month reapplication restriction applies.`
      )
    }
  }

  const { error } = await table(db, 's30_applicants').insert({
    batch_id: formData.batch_id,
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    city: formData.city || null,
    occupation: formData.occupation || null,
    education: formData.education || null,
    source: formData.source || null,
    why_join: formData.why_join || null,
    one_year_goal: formData.one_year_goal || null,
    stage: 'applied',
    score_academic: 0,
    score_psychometric: 0,
    score_interview: 0,
    score_motivation: 0,
    score_total: 0,
    rapd_r: 0, rapd_a: 0, rapd_p: 0, rapd_d: 0, rapd_s: 0,
    fee_status: 'pending',
    offer_sent: false,
    offer_declined: false,
  })

  if (error) throw new Error('Failed to submit application')
  return { success: true }
}

// ─── ADMIN: SAVE POST ───────────────────────────────────────
export async function savePost(post: {
  id?: string
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  tags?: string[]
  status: 'draft' | 'published' | 'scheduled'
  meta_title?: string
  meta_description?: string
  scheduled_at?: string
}) {
  const db = createServerClient()

  if (post.id) {
    const { error } = await table(db, 'posts')
      .update({ ...post, updated_at: new Date().toISOString(), published_at: post.status === 'published' ? new Date().toISOString() : undefined })
      .eq('id', post.id)
    if (error) throw new Error('Failed to update post')
  } else {
    const { error } = await table(db, 'posts').insert({
      ...post,
      author_name: 'Arvind Gupta',
      views: 0,
      published_at: post.status === 'published' ? new Date().toISOString() : null,
    })
    if (error) throw new Error('Failed to create post')
  }

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  return { success: true }
}

// ─── ADMIN: DELETE POST ────────────────────────────────────
export async function deletePost(id: string) {
  const db = createServerClient()
  const { error } = await table(db, 'posts').delete().eq('id', id)
  if (error) throw new Error('Failed to delete post')
  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  return { success: true }
}

// ─── ADMIN: SAVE PAGE ───────────────────────────────────────
export async function savePage(page: {
  id?: string
  title: string
  slug: string
  content: string
  type: 'home' | 'service' | 'landing' | 'info' | 'course'
  status: 'published' | 'draft'
  meta_title?: string
  meta_description?: string
}) {
  const db = createServerClient()
  if (page.id) {
    const { error } = await table(db, 'pages').update({ ...page, updated_at: new Date().toISOString() }).eq('id', page.id)
    if (error) throw new Error('Failed to update page')
  } else {
    const { error } = await table(db, 'pages').insert(page)
    if (error) throw new Error('Failed to create page')
  }
  revalidatePath('/')
  revalidatePath('/admin/cms')
  return { success: true }
}

// ─── ADMIN: UPDATE LEAD ────────────────────────────────────
export async function updateLead(id: string, updates: {
  stage?: Lead['stage']
  score?: number
  followup_date?: string
  notes?: string
}) {
  const db = createServerClient()
  const { error } = await table(db, 'leads').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error('Failed to update lead')
  revalidatePath('/admin/crm')
  return { success: true }
}

// ─── ADMIN: ADD LEAD ACTIVITY ──────────────────────────────
export async function addLeadActivity(activity: {
  lead_id: string
  type: 'note' | 'call' | 'email' | 'meeting' | 'stage_change' | 'whatsapp'
  content: string
}) {
  const db = createServerClient()
  const { error } = await table(db, 'lead_activities').insert({ ...activity, created_by: 'Arvind Gupta' })
  if (error) throw new Error('Failed to add activity')
  revalidatePath('/admin/crm')
  return { success: true }
}

// ─── ADMIN: UPDATE APPLICANT ───────────────────────────────
export async function updateApplicant(id: string, updates: Partial<{
  stage: string
  score_academic: number
  score_psychometric: number
  score_interview: number
  score_motivation: number
  score_total: number
  rapd_r: number
  rapd_a: number
  rapd_p: number
  rapd_d: number
  rapd_s: number
  offer_sent: boolean
  offer_declined: boolean
  ban_until: string
  fee_status: string
  notes: string
}>) {
  const db = createServerClient()
  const { error } = await table(db, 's30_applicants').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error('Failed to update applicant')
  revalidatePath('/admin/super-30')
  return { success: true }
}

// ─── ADMIN: APPLY BAN ─────────────────────────────────────
export async function applyBan(applicantId: string) {
  const banUntil = new Date()
  banUntil.setFullYear(banUntil.getFullYear() + 1)

  const db = createServerClient()
  const { error } = await table(db, 's30_applicants').update({
    offer_declined: true,
    ban_until: banUntil.toISOString(),
    stage: 'rejected',
    updated_at: new Date().toISOString(),
  }).eq('id', applicantId)

  if (error) throw new Error('Failed to apply ban')
  revalidatePath('/admin/super-30')
  return { success: true, banUntil: banUntil.toLocaleDateString('en-IN') }
}

type Lead = { stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost' }
