/**
 * Currency formatting utilities — consistent across all results components.
 */

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** $1,234 */
export function formatCurrency(amount: number): string {
  return USD.format(Math.abs(amount));
}

/** $1,234/mo */
export function formatMonthly(amount: number): string {
  return `${formatCurrency(amount)}/mo`;
}

/** $14,808/yr */
export function formatAnnual(amount: number): string {
  return `${formatCurrency(amount)}/yr`;
}

/** $1.2k — compact form for tight spaces */
export function formatCompact(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000)     return `$${(amount / 1_000).toFixed(1)}k`;
  return formatCurrency(amount);
}
