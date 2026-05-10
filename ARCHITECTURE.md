# Architecture Overview

SpendScope is built using a modern, scalable, and operator-focused tech stack designed for speed, maintainability, and rapid iteration.

## Core Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **AI/LLM**: Google Gemini (gemini-1.5-flash) via `@google/generative-ai`
- **Email**: Resend

---

## Architectural Decisions & Tradeoffs

### 1. The Audit Engine: Deterministic Math vs. AI Inference
**Decision**: Calculate all savings, optimization scores, and actionable recommendations using a deterministic, rule-based TypeScript engine. Use the LLM *only* for synthesizing the executive summary prose.

**Reasoning**: LLMs hallucinate math. For a financial audit tool targeted at startups and procurement teams, trust is paramount. A single hallucinated pricing tier destroys credibility. By strictly separating the mathematical calculation layer from the language synthesis layer, we ensure that every dollar of claimed savings is defensible and traceable to public pricing data, while still providing a personalized, AI-driven experience.

### 2. Post-Audit Lead Capture (Frictionless Onboarding)
**Decision**: Allow users to run the complete audit and see high-level results *before* asking for an email address. 

**Reasoning**: Modern SaaS users are fatigued by aggressive "gatekeeping." By proving immediate, tangible value first (the "aha!" moment), the conversion rate for capturing an email to send the detailed report significantly increases. It builds goodwill and positions SpendScope as a product-led growth (PLG) tool rather than a standard lead-gen trap.

### 3. Public by Default (Viral Growth Loop)
**Decision**: Audit reports are saved instantly upon completion and assigned a random, shareable 6-character public slug (`/audit/[slug]`).

**Reasoning**: Startups rely on word-of-mouth. If a founder runs an audit and saves $1,000/mo, their first instinct is to share it with their co-founder, their board, or on Twitter/Hacker News. By making reports public-by-default (while strictly stripping out PII like the user's email or company name), we create a seamless viral loop. 

### 4. Abuse Protection: Honeypot + Rate Limiting vs. CAPTCHA
**Decision**: Implemented an invisible honeypot field and simple IP-based rate limiting on the server action instead of integrating Google reCAPTCHA or Turnstile.

**Reasoning**: CAPTCHAs introduce significant user friction and degrade the premium feel of a SaaS product. A honeypot catches the vast majority of low-effort scraping bots silently, ensuring real users never have to click "I am not a robot" after just experiencing the polished audit reveal.

### 5. Database Schema: Immutable Snapshots
**Decision**: Store the complete `AuditResult` object (including generated recommendations and tool breakdowns) as an immutable JSON snapshot (`tools_json`) inside Supabase.

**Reasoning**: Pricing changes constantly. If we only stored the input tools and dynamically re-calculated the savings on the public report page, a user returning to their report 6 months later might see completely different numbers, destroying the integrity of historical audits. Storing an immutable snapshot guarantees the report always reflects the state of the world at the exact moment it was generated.
