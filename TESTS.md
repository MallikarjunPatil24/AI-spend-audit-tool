# Testing Strategy (TESTS.md)

This document outlines the automated testing architecture, required test cases, and execution guidelines for SpendScope. 

## Testing Philosophy
SpendScope operates as a financial utility for startups. To maintain absolute trust, the **audit engine must be deterministic, isolated, and strictly tested**. We do not use live network requests or external LLMs during unit testing.

We use **Vitest** for native TypeScript execution, high performance, and minimal configuration overhead.

---

## The Core Test Suite

The core test suite lives in `tests/audit-engine.test.ts` and validates 5 critical business logic paths:

### 1. Savings Calculation Test
- **Validates**: The core mathematical engine.
- **Scenario**: A user reports 10 seats of ChatGPT Team at $40/mo each ($400 total). The engine should correctly detect the expected $300/mo cost and flag the variance/savings opportunity.
- **Assertion**: Verifies `totalMonthlySavings` matches the mathematically correct value, and `totalAnnualSavings` is strictly 12x the monthly savings.

### 2. Downgrade Recommendation Test
- **Validates**: Rule 1 (`checkTierRightSize`).
- **Scenario**: A small team (2 users) is paying for an expensive "Business" tier that includes unused enterprise features like SSO and audit logs.
- **Assertion**: Verifies the engine explicitly generates a `tier-right-size` recommendation to downgrade to the `Pro` tier and calculates the exact price delta as the savings.

### 3. Optimization Score Test
- **Validates**: The `calculateOptimizationScore` function.
- **Scenario**: A team submits a perfectly optimized, right-sized stack with zero overlapping capabilities and correctly priced tiers.
- **Assertion**: Verifies the engine returns exactly $0 in savings and a perfect `100/100` optimization score.

### 4. Low-Savings Honesty Test
- **Validates**: Graceful handling of optimized startups.
- **Scenario**: A team with very low spend (e.g., a single seat of Claude Pro) runs an audit. 
- **Assertion**: Verifies the engine injects an `already-optimized` placeholder recommendation to clearly communicate that no actionable changes are needed, preventing a confusing empty state.

### 5. Fallback Summary Test
- **Validates**: The deterministic fallback generator (`generateSummary`).
- **Scenario**: The AI generation layer fails (or is bypassed).
- **Assertion**: Verifies the fallback prose correctly parses the `totalMonthlySpend` and `totalSavings` integers and injects them into grammatically correct English for the final report.

---

## How to Run Tests

### Local Execution

```bash
# Run tests once (recommended for CI/verification)
npm run test:run

# Run tests in watch mode (for active development)
npm run test
```

### Type Checking & Linting
Tests are part of a broader engineering quality loop. You should also verify types and linting:

```bash
# Verify TypeScript compilation
npm run type-check

# Run ESLint
npm run lint
```

---

## Continuous Integration (GitHub Actions)

A GitHub Actions workflow is configured in `.github/workflows/ci.yml`. It automatically enforces code quality on every push and pull request to the `main` branch.

**The Pipeline:**
1. Checks out the code.
2. Sets up Node.js 20.
3. Uses `npm ci` with dependency caching for speed.
4. Executes `npm run lint`.
5. Executes `npm run type-check`.
6. Executes `npm run test:run`.

If any of these steps fail, the pipeline fails, preventing broken code or untested math from reaching production.

---

## Known Limitations & Future Work
- **E2E Testing**: Currently, we rely on unit testing for the deterministic engine. Future iterations should incorporate Playwright to test the Next.js Server Actions and React hook boundaries.
- **Database Mocking**: The `audit-engine.test.ts` strictly tests the pure calculation functions. Tests for `lib/db/audits.ts` would require mocking the Supabase client or running a local Supabase docker instance, which was excluded from this phase to maximize testing speed and isolation.
