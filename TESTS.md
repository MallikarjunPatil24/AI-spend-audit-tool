# TESTS.md

> Test strategy and test case documentation for SpendScope.

---

## Test Strategy

### Unit Tests (Vitest)
- Audit engine calculation functions
- Pricing data helper functions
- Utility functions (format, cn, etc.)
- Zod schema validation

### Integration Tests
- Supabase client queries
- Route handler responses

### End-to-End Tests (Playwright — Step 4)
- Landing page renders correctly
- Audit form submission flow
- Audit results page loads from slug
- Dark mode toggle works
- Mobile responsive layout

---

## Test Cases (Planned)

### Audit Engine

- [ ] Calculate monthly cost for single tool, single seat
- [ ] Calculate monthly cost for multiple tools
- [ ] Detect duplicate coverage (Cursor + Copilot overlap)
- [ ] Apply correct tier pricing per plan
- [ ] Generate savings percentage correctly
- [ ] Handle zero-seat edge case

### Landing Page

- [ ] Hero CTA links to /audit
- [ ] All 9 tool chips render
- [ ] Features section shows 6 cards
- [ ] How It Works shows 3 steps
- [ ] Footer CTA links to /audit

### Accessibility

- [ ] All interactive elements have ARIA labels
- [ ] Color contrast ratios pass WCAG AA
- [ ] Keyboard navigation works throughout
- [ ] Dark mode colors pass WCAG AA

---

## Running Tests

```bash
# Unit tests (coming in Step 2)
npm run test

# E2E tests (coming in Step 4)
npm run test:e2e
```
