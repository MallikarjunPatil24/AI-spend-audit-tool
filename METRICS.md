# Core Metrics & Analytics Strategy

This document defines the key performance indicators (KPIs) and telemetry strategy for evaluating the success of the SpendScope viral loop and lead generation funnel.

## 1. Top-of-Funnel (Acquisition)
- **Landing Page Conversion Rate**: The percentage of visitors who click "Start free audit".
- **Traffic Source Attribution**: Tracking whether users arrive via organic search, shared public URLs (viral loop), or direct traffic.

## 2. Mid-Funnel (Activation & Engagement)
- **Audit Completion Rate**: The percentage of users who start the audit form and successfully reach the results page.
- **Average Time to Complete**: Time spent on the `/audit` input flow. High times indicate excessive friction.
- **Identified Savings Volume**: The total dollar amount of potential savings identified across all audits (useful for marketing material).

## 3. Bottom-Funnel (Conversion)
- **Lead Capture Conversion Rate**: The percentage of users who see their audit results and submit their email to receive the detailed report.
- **High-Value Lead Ratio**: The percentage of leads capturing teams with >$500/mo in potential savings (eligible for infrastructure credits).

## 4. Viral Loop Metrics (Shareability)
- **Share Rate**: The percentage of completed audits where the user copies the public link or clicks a share button.
- **K-Factor (Viral Coefficient)**: How many new unique visitors are generated per shared public report.
- **Public Report Engagement**: Time spent viewing public `/audit/[slug]` routes.

## Telemetry Implementation Plan
*Currently, SpendScope relies on basic database counts (number of rows in `audits` and `leads`). Future telemetry will implement:*
1. **PostHog**: For tracking funnel drop-offs and session recordings.
2. **Vercel Web Analytics**: For privacy-first, zero-configuration traffic monitoring.
3. **UTM Parameters**: Appended to all public share links to accurately track the viral coefficient.
