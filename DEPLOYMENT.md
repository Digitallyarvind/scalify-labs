# Scalify Labs — Go Live Guide

## What you're deploying
- **Next.js 14** app (SSR + SSG + Server Actions)
- **Supabase** for database (posts, leads, applicants, CRM)
- **Vercel** for hosting (free tier, auto-deploy from GitHub)
- Custom domain: scalifylabs.com

---

## STEP 1 — Set Up Supabase (15 minutes)

1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Click **New Project** → Name it `scalify-labs` → Set a strong password → Choose region **Mumbai (ap-south-1)**
3. Wait ~2 minutes for project to be ready
4. Go to **SQL Editor** → Click **New Query** → Paste entire contents of `supabase-schema.sql` → Click **Run**
5. Go to **Project Settings → API**
   - Copy **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public key** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy **service_role key** → this is `SUPABASE_SERVICE_ROLE_KEY`

---

## STEP 2 — Push to GitHub (5 minutes)

```bash
# In the scalify-labs folder
git init
git add .
git commit -m "Initial commit — Scalify Labs"

# Create a new repo on github.com called scalify-labs
git remote add origin https://github.com/YOUR_USERNAME/scalify-labs.git
git push -u origin main
```

---

## STEP 3 — Deploy on Vercel (10 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New → Project**
3. Import `scalify-labs` repo
4. In **Environment Variables**, add these 4 variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | https://xxx.supabase.co |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJhbGci... |
| `SUPABASE_SERVICE_ROLE_KEY` | eyJhbGci... |
| `NEXT_PUBLIC_SITE_URL` | https://scalifylabs.com |

5. Click **Deploy** → Wait ~3 minutes
6. You get a URL like `scalify-labs.vercel.app` — your site is live!

---

## STEP 4 — Connect Custom Domain (10 minutes)

1. In Vercel → Your project → **Settings → Domains**
2. Add `scalifylabs.com` and `www.scalifylabs.com`
3. Vercel shows you DNS records to add
4. Log into your domain registrar (GoDaddy / Namecheap / BigRock)
5. Go to DNS settings and add:
   - **A record**: `@` → `76.76.21.21` (Vercel IP)
   - **CNAME**: `www` → `cname.vercel-dns.com`
6. Wait 5–30 minutes for DNS to propagate
7. Vercel auto-issues an SSL certificate

---

## STEP 5 — Access Admin Panel

Go to `scalifylabs.com/admin` — the admin panel is at this route.

> **Note:** Add Supabase Auth to protect the admin panel. For now, it's accessible to anyone who knows the URL.

**To add basic protection quickly:**
In Vercel → Settings → Authentication → Enable Basic Auth → Set username/password

---

## Auto-Deploy (already set up)

Every time you push to GitHub:
```
git push origin main
```
→ Vercel automatically builds and deploys in ~2 minutes
→ Website is updated live

---

## How Changes Go Live

| Action | Result |
|--------|--------|
| Publish a blog post in admin | Live on website within 60 seconds (ISR revalidation) |
| Update page content in CMS | Live immediately on next request |
| New lead from website | Appears in CRM instantly (real-time Supabase) |
| New S30 application | Appears in admin instantly |
| Code change + git push | Live in ~2 minutes via Vercel auto-deploy |

---

## Monthly Cost

| Service | Cost |
|---------|------|
| Vercel (Hobby plan) | Free |
| Supabase (Free tier) | Free |
| Domain (scalifylabs.com) | ~₹800/year |
| **Total** | **~₹800/year** |

Upgrade to Vercel Pro (₹1,500/month) only when traffic exceeds 100GB bandwidth/month.

---

## Troubleshooting

**Build fails on Vercel:**
- Check all env vars are added correctly
- Run `npm run build` locally to see errors

**Database connection fails:**
- Verify Supabase URL and keys in env vars
- Check Supabase project is not paused (free tier pauses after 7 days inactivity)

**Admin panel shows no data:**
- Run the SQL schema if you haven't
- Check RLS policies in Supabase → Table Editor → RLS

**SEO not working:**
- Ensure `NEXT_PUBLIC_SITE_URL` is set to your actual domain
- Submit sitemap `scalifylabs.com/sitemap.xml` to Google Search Console
