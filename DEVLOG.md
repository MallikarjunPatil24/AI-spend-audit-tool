# DEVLOG.md

> Running development log for SpendScope. Updated as major decisions are made.

---

## Step 1 — Project Foundation ($(date))

### ✅ Completed

- Initialized Next.js 15 App Router project
- Configured Tailwind CSS v4 with custom design tokens (indigo/violet brand)
- Initialized shadcn/ui (Tailwind v4 mode)
- Installed: `@supabase/supabase-js`, `@supabase/ssr`, `@anthropic-ai/sdk`, `resend`, `zod`, `lucide-react`
- Created scalable folder structure (`/app`, `/components`, `/lib`, `/types`)
- Built typed Supabase client (browser + server)
- Created environment variable validation with Zod
- Built complete landing page:
  - Navbar with mobile drawer
  - Hero section with gradient headline and CTA
  - Tool logos strip (all 9 supported tools)
  - Features section (6 cards)
  - How It Works section
  - Footer with CTA
- Dark/light mode with localStorage persistence
- Created all 10 documentation skeleton files

### 🔑 Key Decisions

- **No auth in Step 1** — Keeping it friction-free, public-first
- **Tailwind v4** — shadcn auto-detected v4, sticking with it (newer API)
- **Custom ThemeProvider** instead of `next-themes` — avoids flash, full control
- **Indigo/violet palette** — Professional, distinct from competitors, accessible

---

## Step 2 — Audit Engine (Upcoming)

_To be filled in_

---

## Step 3 — AI Summaries (Upcoming)

_To be filled in_

---

## Step 4 — Email + Sharing (Upcoming)

_To be filled in_
