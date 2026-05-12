/** 0.1234 → "12%" */
export function formatPercent(ratio: number, decimals = 0): string {
  return `${(ratio * 100).toFixed(decimals)}%`;
}

/** 78 → "78/100" */
export function formatScore(score: number): string {
  return `${Math.round(score)}/100`;
}

/**
 * Returns a colour token and label for a given score.
 * Calibrated to avoid alarmist UX — 70+ is still "good".
 */
export function scoreGrade(score: number): {
  label: string;
  color: string;
  trackColor: string;
} {
  if (score >= 85) return { label: "Well Optimized",    color: "#16a34a", trackColor: "rgba(22,163,74,0.15)"   };
  if (score >= 70) return { label: "Good",              color: "#ca8a04", trackColor: "rgba(202,138,4,0.15)"   };
  if (score >= 50) return { label: "Savings Available", color: "#4F46E5", trackColor: "rgba(79,70,229,0.14)"  };
  return              { label: "Review Recommended",  color: "#dc2626", trackColor: "rgba(220,38,38,0.12)"  };
}
