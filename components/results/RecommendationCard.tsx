import { CheckCircle2, AlertCircle, Info, ArrowRight } from "lucide-react";
import { formatMonthly } from "@/lib/formatters/currency";
import type { AuditRecommendation, ConfidenceLevel, RecommendationType } from "@/lib/audit/types";

// ─── Label maps ──────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<RecommendationType, string> = {
  "downgrade-plan":      "Plan Downgrade",
  "reduce-seats":        "Seat Reduction",
  "consolidate-tools":   "Consolidate Tools",
  "api-vs-subscription": "API vs Subscription",
  "review-api-spend":    "API Spend Review",
  "tier-right-size":     "Tier Right-Size",
  "already-optimized":   "Already Optimized",
};

const CONFIDENCE_CONFIG: Record<ConfidenceLevel, {
  label: string;
  color: string;
  bg: string;
  icon: React.ElementType;
  description: string;
}> = {
  high: {
    label: "High Confidence",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
    icon: CheckCircle2,
    description: "Well-supported by pricing data",
  },
  medium: {
    label: "Medium Confidence",
    color: "#ca8a04",
    bg: "rgba(202,138,4,0.08)",
    icon: AlertCircle,
    description: "Verify before acting",
  },
  low: {
    label: "Low Confidence",
    color: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    icon: Info,
    description: "Warrants internal review",
  },
};

interface RecommendationCardProps {
  rec: AuditRecommendation;
  index: number;
}

export function RecommendationCard({ rec, index }: RecommendationCardProps) {
  const isOptimized = rec.type === "already-optimized";
  const conf = CONFIDENCE_CONFIG[rec.confidence];
  const ConfIcon = conf.icon;

  return (
    <article
      id={`rec-${index + 1}`}
      className="card-enterprise group relative overflow-hidden p-6"
      aria-label={`Recommendation ${index + 1}: ${TYPE_LABELS[rec.type]}`}
    >
      {/* Left accent line */}
      {!isOptimized && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
          style={{ background: conf.color }}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {/* Type badge */}
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {TYPE_LABELS[rec.type]}
            </span>
            {/* Confidence badge */}
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ background: conf.bg, color: conf.color }}
              title={conf.description}
            >
              <ConfIcon className="h-3 w-3" aria-hidden="true" />
              {conf.label}
            </span>
          </div>

          {/* Reasoning */}
          <p className="text-[0.9375rem] font-medium text-foreground leading-snug mb-2">
            {rec.reasoning}
          </p>

          {/* Action */}
          {!isOptimized && (
            <div className="mt-3 flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rec.action}
              </p>
            </div>
          )}
        </div>

        {/* ── Savings callout ── */}
        {!isOptimized && rec.estimatedMonthlySavings > 0 && (
          <div
            className="flex-shrink-0 rounded-xl p-4 text-center min-w-[120px]"
            style={{ background: "rgba(232,93,74,0.06)", border: "1px solid rgba(232,93,74,0.12)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Est. Savings
            </p>
            <p className="text-xl font-extrabold tracking-tight text-foreground">
              {formatMonthly(rec.estimatedMonthlySavings)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">per month</p>
          </div>
        )}
      </div>

      {/* Source link */}
      {rec.sourceUrl && !isOptimized && (
        <div className="mt-4 pt-3 border-t border-border">
          <a
            href={rec.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing source ↗
          </a>
        </div>
      )}
    </article>
  );
}
