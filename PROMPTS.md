# SpendScope — Prompt Engineering Documentation

## Overview

This document records the complete prompt engineering decisions for SpendScope's AI summary feature.
The audit engine itself is entirely deterministic and rule-based — Claude is used **only** to generate
a personalised executive summary paragraph, never for calculations, pricing, or recommendations.

---

## 1. Final Production Prompt

### System Prompt

```
You are a senior procurement analyst writing concise AI tooling audit reports
for startup operators and engineering managers.

Your role is to synthesise structured audit data into a single professional paragraph.
You write in a measured, factual tone — similar to a McKinsey operations brief
or a Y Combinator batch memo.

You must follow these rules strictly:
- Write exactly 80–120 words. No more, no less.
- Reference only the data provided. Never invent tool names, pricing, savings figures,
  or recommendations.
- Do not use marketing language, hyperbole, or urgency tactics.
- Do not mention SpendScope by name.
- Do not use bullet points, headers, or markdown.
- Return ONLY the summary paragraph — nothing else.
- Write as if advising a CFO or VP Engineering, not a general consumer.
```

### User Message Structure

```json
{
  "teamSize": "12",
  "primaryUseCase": "coding",
  "toolsAudited": "Cursor, GitHub Copilot, Claude",
  "totalMonthlySpend": "$480",
  "potentialMonthlySavings": "$120",
  "potentialAnnualSavings": "$1,440",
  "optimizationScore": "74/100",
  "topFindings": [
    "GitHub Copilot Business tier includes admin controls that typically deliver
     value at ≥5 seats — 2 active seats may not justify the premium. (confidence: high)"
  ]
}
```

---

## 2. Why the Prompt Was Designed This Way

### Role Anchoring ("procurement analyst")
Assigning a specific professional role prevents Claude from defaulting to
chatbot/assistant tone. "Procurement analyst" aligns with the target user
persona (engineering managers, startup operators, CFOs) and produces
output that feels like a colleague's written review, not an AI response.

### Tone Reference Points
"McKinsey operations brief" and "Y Combinator batch memo" are concrete style references
that Claude understands. Vague instructions like "professional tone" leave too much
latitude and produce inconsistent output.

### Length Constraint (80–120 words)
Executive stakeholders scan, not read. 80–120 words is long enough to include
context and findings, short enough to not require scrolling. Claude adheres well
to explicit word counts when stated in both the system prompt and user message.

### JSON Input vs Free-Form
Passing structured JSON (rather than natural-language descriptions) reduces the
risk of Claude misinterpreting ambiguous figures. A sentence like "the team spends
a lot on Cursor" leaves room for hallucination. `"totalMonthlySpend": "$480"` does not.

---

## 3. Hallucination-Prevention Decisions

### Decision: Never pass raw recommendation text
Initial prompts passed the full reasoning strings from audit rules. Claude occasionally
embellished these with additional context it inferred (inventing seat counts, etc.).
The fix: pass only structured fields, not free-form reasoning strings.

### Decision: "Reference only the data provided" rule
An explicit prohibition is more reliable than implicit expectation. Without this
instruction, Claude may "helpfully" add generic AI tool advice not grounded in the data.

### Decision: Omit tool pricing from the prompt
Passing per-tool pricing data created a temptation for Claude to re-derive savings
figures, sometimes with rounding errors or incorrect math. The prompt receives
only pre-computed totals from the deterministic engine.

### Decision: Validate output length before accepting
If Claude returns < 40 chars (empty/error) or > 800 chars (hallucination/runaway),
the response is rejected and the deterministic fallback is used.

---

## 4. Failed Prompt Experiments

### Experiment 1: Free-form instructions
**Prompt:** "Write a short summary of this audit."
**Problem:** Output varied wildly — sometimes 20 words, sometimes 400. Tone ranged
from casual chatbot to overly formal legal writing.
**Fix:** Added explicit length constraint and style references.

### Experiment 2: Asking for bullet points
**Prompt:** "Summarise the key findings as 3 bullet points."
**Problem:** Output overlapped with the structured recommendation cards already shown.
Users found it redundant. Bullet format also felt like a chatbot, not a report.
**Fix:** Switched to prose paragraph format.

### Experiment 3: Including tool descriptions in prompt
**Prompt:** Included full tool catalog descriptions ("Cursor is an AI code editor...").
**Problem:** Claude occasionally confused tool features, e.g. attributing Copilot's
repository-training feature to Cursor. Wasted tokens.
**Fix:** Removed tool descriptions. Claude knows these tools well enough from training.

### Experiment 4: Asking Claude to also generate recommendations
**Attempted:** Using Claude to generate recommendation text.
**Problem:** Output was not deterministic, sometimes recommended non-existent plans,
occasionally exaggerated savings.
**Decision:** All recommendations remain 100% rule-based. Claude is only for prose summary.

---

## 5. Why Deterministic Audit Logic Is Separated from AI

This is the most important architectural decision in SpendScope.

### Trustworthiness
Spend optimization recommendations have real financial consequences. If a recommendation
is wrong, the user may cancel a plan they need or downgrade and lose functionality.
Deterministic rules can be inspected, audited, and unit tested. Claude's output cannot.

### Reproducibility
Two users with identical inputs must receive identical recommendations. Language
models are stochastic by default. Fixing `temperature: 0` helps but does not eliminate
variation across model versions and API updates.

### Legal and compliance safety
Recommendations that reference real vendor pricing must be grounded in verified data.
"Cursor Business is $40/seat/mo" is a sourced fact. Claude should not be in the
critical path of generating or modifying that claim.

### Graceful degradation
If the Claude API is down, the results page still loads completely with full
recommendations. Only the prose summary degrades (to a deterministic fallback
that is itself professional and personalised). The user never sees a blank page.

### Cost efficiency
API calls at scale are expensive. Using Claude only for a 100-word summary (not
for calculations) keeps API costs proportional to value. The engine runs client-side
at zero marginal cost per audit.

---

## Model Selection

**Model used:** `gemini-1.5-flash`

**Rationale:**
- Gemini 1.5 Flash is Google's fastest and most cost-efficient model
- Excellent at structured JSON input → prose summarisation tasks
- Low latency makes it ideal for non-blocking background generation
- System instruction support enables role anchoring without extra user-turn tokens
- If summary quality needs to improve, upgrade to `gemini-1.5-pro` and re-evaluate

---

## API Configuration

| Setting      | Value               | Rationale                              |
|---|---|---|
| maxOutputTokens | 400              | 120-word summary ≈ 180 tokens; buffer for safety |
| timeout      | 15,000ms            | P99 response time for Flash; above this = fallback |
| model        | gemini-1.5-flash    | Cost/speed optimised for constrained summarisation |
| API key env  | GEMINI_API_KEY      | Server-side only, never exposed to client |

---

_Last updated: 2025-05-08_
