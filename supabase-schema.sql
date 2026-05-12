-- ══════════════════════════════════════════════════════
-- SCALIFY LABS — SUPABASE DATABASE SCHEMA
-- Run this entire file in Supabase → SQL Editor → New Query
-- ══════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── POSTS (Blog) ───────────────────────────────────────
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT 'Digital Marketing',
  tags TEXT[],
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  author_name TEXT NOT NULL DEFAULT 'Arvind Gupta',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── PAGES (CMS) ────────────────────────────────────────
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('home','service','landing','info','course')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft')),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  sections JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── LEADS (CRM) ────────────────────────────────────────
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  business TEXT,
  city TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  service_interest TEXT,
  message TEXT,
  stage TEXT NOT NULL DEFAULT 'new'
    CHECK (stage IN ('new','contacted','qualified','proposal','negotiation','won','lost')),
  score INTEGER NOT NULL DEFAULT 50 CHECK (score >= 0 AND score <= 100),
  budget TEXT,
  followup_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── LEAD ACTIVITIES ────────────────────────────────────
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('note','call','email','meeting','stage_change','whatsapp')),
  content TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SUPER 30 BATCHES ───────────────────────────────────
CREATE TABLE s30_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  seats INTEGER NOT NULL DEFAULT 30,
  fee INTEGER NOT NULL DEFAULT 12000,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  app_open DATE NOT NULL,
  app_close DATE NOT NULL,
  mode TEXT NOT NULL DEFAULT 'offline' CHECK (mode IN ('offline','online','hybrid')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming'
    CHECK (status IN ('upcoming','accepting','closed','completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── SUPER 30 APPLICANTS ────────────────────────────────
CREATE TABLE s30_applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID NOT NULL REFERENCES s30_batches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  age INTEGER,
  gender TEXT,
  education TEXT,
  occupation TEXT,
  source TEXT,
  why_join TEXT,
  one_year_goal TEXT,
  stage TEXT NOT NULL DEFAULT 'applied'
    CHECK (stage IN ('applied','counselling','psychometric','interview','selected','enrolled','rejected')),
  score_academic INTEGER NOT NULL DEFAULT 0,
  score_psychometric INTEGER NOT NULL DEFAULT 0,
  score_interview INTEGER NOT NULL DEFAULT 0,
  score_motivation INTEGER NOT NULL DEFAULT 0,
  score_total INTEGER NOT NULL DEFAULT 0,
  rapd_r INTEGER NOT NULL DEFAULT 0,
  rapd_a INTEGER NOT NULL DEFAULT 0,
  rapd_p INTEGER NOT NULL DEFAULT 0,
  rapd_d INTEGER NOT NULL DEFAULT 0,
  rapd_s INTEGER NOT NULL DEFAULT 0,
  fee_status TEXT NOT NULL DEFAULT 'pending' CHECK (fee_status IN ('pending','partial','paid')),
  offer_sent BOOLEAN NOT NULL DEFAULT FALSE,
  offer_declined BOOLEAN NOT NULL DEFAULT FALSE,
  ban_until TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER applicants_updated_at BEFORE UPDATE ON s30_applicants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── MEDIA ──────────────────────────────────────────────
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'image/jpeg',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────
-- Public can INSERT leads and applicants (from website forms)
-- Only service role (admin) can read/update everything

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE s30_applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE s30_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public can insert leads from website
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT TO anon WITH CHECK (true);

-- Public can insert S30 applications
CREATE POLICY "Public can insert applications" ON s30_applicants
  FOR INSERT TO anon WITH CHECK (true);

-- Public can read published posts
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT TO anon USING (status = 'published');

-- Public can read published pages
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT TO anon USING (status = 'published');

-- Public can read active batches
CREATE POLICY "Public can read batches" ON s30_batches
  FOR SELECT TO anon USING (status IN ('accepting','upcoming'));

-- Public can read applicant ban status (for ban check only — email/phone lookup)
CREATE POLICY "Public can check ban" ON s30_applicants
  FOR SELECT TO anon USING (ban_until IS NOT NULL);

-- Service role has full access (handled by service role key in server actions)

-- ─── INDEXES ────────────────────────────────────────────
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_applicants_batch ON s30_applicants(batch_id);
CREATE INDEX idx_applicants_stage ON s30_applicants(stage);
CREATE INDEX idx_applicants_ban ON s30_applicants(ban_until) WHERE ban_until IS NOT NULL;

-- ─── SEED DATA ──────────────────────────────────────────

-- First batch
INSERT INTO s30_batches (name, seats, fee, start_date, end_date, app_open, app_close, mode, status, description)
VALUES (
  'Super 30 — Batch 7 (May 2026)',
  30, 12000,
  '2026-05-09', '2026-08-09',
  '2026-04-01', '2026-04-30',
  'offline', 'accepting',
  'May 2026 batch — currently accepting applications. Digital marketing intensive with live client projects.'
);

-- Sample blog posts
INSERT INTO posts (title, slug, content, excerpt, category, status, published_at, author_name, meta_title, meta_description) VALUES
(
  'Best SEO Services in Ranchi — Complete Guide 2026',
  'seo-services-ranchi-guide',
  '## Why Ranchi Businesses Need SEO in 2026

Ranchi is the capital of Jharkhand and a rapidly growing business hub. With more consumers searching online before any purchase decision, SEO has become essential for every local business.

Studies show that 78% of local searches on smartphones result in an offline purchase within 24 hours.

## The 5 Pillars of SEO for Ranchi Businesses

**1. Technical SEO** — Your website must be fast, mobile-friendly, and technically sound.

**2. On-Page SEO** — Every page should target specific keywords your customers search for.

**3. Content Marketing** — Publishing high-quality content consistently is the fastest way to build authority.

**4. Local SEO** — Google My Business and local citations are crucial for Ranchi businesses.

**5. Link Building** — Quality backlinks from reputable Indian websites signal trust to Google.

## Expected Results Timeline

- Month 1–2: Technical fixes complete, pages indexed correctly
- Month 3: First keywords appear on page 1
- Month 4–5: Significant ranking movement for main keywords
- Month 6+: Consistent page 1 rankings, organic traffic growing steadily

Contact Scalify Labs for a free SEO audit of your website.',
  'A complete guide to understanding SEO and choosing the right agency for your Ranchi business. Get to page 1 of Google.',
  'SEO',
  'published',
  NOW() - INTERVAL '7 days',
  'Arvind Gupta',
  'Best SEO Services in Ranchi | Scalify Labs 2026',
  'Looking for top SEO services in Ranchi? Scalify Labs offers proven local SEO for Jharkhand businesses. Free audit available.'
),
(
  'WhatsApp Marketing — Why Indian Businesses Are Switching',
  'whatsapp-marketing-india-2026',
  '## The WhatsApp Marketing Revolution in India

Email marketing: 22% open rate. Social media: 2% organic reach. WhatsApp: 98% open rate.

No marketing channel in India comes close to WhatsApp engagement. And yet, most businesses either use it informally or not at all.

## The 8-Stage Nurture System

This is the system Scalify Labs sets up for clients — a fully automated sequence from lead to customer:

- **Stage 1 — Immediate Welcome** (within 60 seconds of enquiry)
- **Stage 2 — Service Information** (1 hour later)
- **Stage 3 — Social Proof** (Day 1)
- **Stage 4 — Case Study** (Day 2)
- **Stage 5 — Pricing + FAQ** (Day 3)
- **Stage 6 — Objection Handling** (Day 5)
- **Stage 7 — Urgency + Offer** (Day 7)
- **Stage 8 — Final Follow-up** (Day 10)

This system runs automatically. You focus on closing — the nurturing happens on autopilot.

Scalify Labs has set up WhatsApp automation for 40+ Indian businesses.',
  '98% open rate. Here is why WhatsApp is now India's highest ROI marketing channel and how to set it up properly.',
  'WhatsApp Marketing',
  'published',
  NOW() - INTERVAL '14 days',
  'Arvind Gupta',
  'WhatsApp Marketing India 2026 — Complete Guide | Scalify Labs',
  'Complete WhatsApp marketing guide for Indian businesses. 98% open rates, automation, 8-stage nurture system.'
);

-- ══════════════════════════════════════════════════════
-- DONE. Run this in Supabase SQL Editor.
-- Then add your SUPABASE_URL and keys to .env.local
-- ══════════════════════════════════════════════════════
