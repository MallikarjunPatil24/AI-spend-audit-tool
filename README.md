# SpendScope

> **AI Tool Spend Auditor for Startup Founders & Engineering Managers**

SpendScope helps teams discover exactly how much they're overspending on AI tools — Cursor, GitHub Copilot, Claude, ChatGPT, OpenAI API, Gemini, Windsurf, and v0 — and surfaces actionable savings opportunities in under 60 seconds.

**No login required. Free forever.**

---

## 📸 Screenshots

> _To be added after Step 2 (audit engine) is complete_

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Supabase PostgreSQL |
| AI | Anthropic Claude API |
| Email | Resend |
| Deployment | Vercel |
| Font | Inter (Google Fonts) |

---

## ⚡ Local Setup

### Prerequisites

- Node.js >= 18.17
- npm >= 9

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/spendscope.git
cd spendscope

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and API keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon key |
| `ANTHROPIC_API_KEY` | Step 3 | Anthropic API key for AI summaries |
| `RESEND_API_KEY` | Step 4 | Resend API key for email reports |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Environment Variables for Production

Copy all variables from `.env.local.example` and add them to your Vercel project.

---

## 📁 Project Structure

```
/app                  ← Next.js App Router pages
  /audit              ← Audit form (Step 2)
/components
  /landing            ← Landing page sections
  /shared             ← Shared layout components
  /ui                 ← shadcn/ui primitives
/lib
  /supabase           ← Typed Supabase clients
  /audit              ← Audit engine (Step 2)
  /ai                 ← Claude integration (Step 3)
  /pricing            ← Pricing data (Step 2)
  /utils              ← Shared utilities
/types                ← TypeScript type definitions
/docs                 ← Internal documentation
```

---

## 🔑 Key Decisions

> _To be populated during development_

---

## 📄 License

MIT
