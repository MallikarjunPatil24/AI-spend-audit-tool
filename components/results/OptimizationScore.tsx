import { scoreGrade } from "@/lib/formatters/percentages";
import { Sparkles } from "lucide-react";
import type { AuditSummaryResponse } from "@/lib/ai/types";

interface OptimizationScoreProps {
  score: number;
  /** Deterministic engine summary (shown immediately) */
  engineSummary: string;
  /** AI-generated summary (replaces engine summary when ready) */
  aiSummary?: AuditSummaryResponse | null;
  isLoadingAi?: boolean;
}

export function OptimizationScore({
  score, engineSummary, aiSummary, isLoadingAi,
}: OptimizationScoreProps) {
  const { label, color, trackColor } = scoreGrade(score);
  const r             = 44;
  const circumference = 2 * Math.PI * r;
  const dash          = (score / 100) * circumference;

  const displaySummary = aiSummary?.summary ?? engineSummary;
  const isAiSource     = aiSummary?.source === "ai";

  return (
    <div className="card-enterprise p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center gap-8">

        {/* SVG Score Ring */}
        <div className="relative flex-shrink-0" aria-label={`Optimization score: ${score} out of 100`}>
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r={r} fill="none" stroke={trackColor} strokeWidth="10" />
            <circle
              cx="60" cy="60" r={r}
              fill="none" stroke={color} strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold tracking-tight text-foreground">{score}</span>
            <span className="text-[11px] font-semibold text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center sm:text-left flex-1">
          <div className="mb-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-[1.1rem] font-extrabold tracking-tight text-foreground">
              Optimization Score
            </h2>
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ background: trackColor, color }}
            >
              {label}
            </span>
          </div>

          {/* Summary with loading skeleton */}
          {isLoadingAi && !aiSummary ? (
            <div className="space-y-2 animate-pulse" aria-label="Generating AI summary">
              <div className="h-3.5 w-full rounded-full bg-muted" />
              <div className="h-3.5 w-5/6 rounded-full bg-muted" />
              <div className="h-3.5 w-4/6 rounded-full bg-muted" />
              <div className="mt-1 h-3 w-32 rounded-full bg-muted/60" />
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                {displaySummary}
              </p>
              {isAiSource && (
                <div className="mt-2.5 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    AI-generated summary
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
