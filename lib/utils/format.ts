/**
 * Utility functions for formatting currency, numbers, and percentages.
 * Used throughout audit result displays.
 */

/**
 * Formats a number as USD currency.
 * Example: 1500 → "$1,500.00"
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  maximumFractionDigits = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Formats a number as a compact currency string.
 * Example: 1500 → "$1.5K"
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return formatCurrency(amount);
}

/**
 * Formats a percentage value.
 * Example: 0.35 → "35%"
 */
export function formatPercent(value: number, digits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/**
 * Formats a number with thousand separators.
 * Example: 12345 → "12,345"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
