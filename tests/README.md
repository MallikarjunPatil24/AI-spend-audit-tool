# SpendScope Tests

This directory will contain all automated tests.

## Structure (Step 2+)

```
/tests
  /unit
    audit.test.ts        ← Audit engine calculations
    pricing.test.ts      ← Pricing data helpers
    format.test.ts       ← Utility functions
  /integration
    supabase.test.ts     ← DB query integration
  /e2e
    landing.spec.ts      ← Landing page E2E
    audit-flow.spec.ts   ← Full audit submission flow
```

## Setup (Step 2)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```
