import Image from "next/image";
import { formatMonthly, formatCurrency } from "@/lib/formatters/currency";
import type { ToolBreakdown } from "@/lib/audit/types";
import { TOOL_CONFIG_MAP } from "@/lib/constants/tools";
import type { AiToolId } from "@/types/audit";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolBreakdownCardProps {
  breakdown: ToolBreakdown;
}

export function ToolBreakdownCard({ breakdown }: ToolBreakdownCardProps) {
  const config = TOOL_CONFIG_MAP[breakdown.toolId as AiToolId];
  const hasVariance = breakdown.varianceAmount !== null;
  const isOverpaying  = hasVariance && breakdown.varianceAmount! > 10;
  const isUnderpaying = hasVariance && breakdown.varianceAmount! < -10;

  return (
    <div className="card-enterprise p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Monochrome glyph */}
          <div className="h-8 w-8 flex items-center justify-center rounded-md bg-zinc-50 flex-shrink-0" aria-hidden="true">
            {config?.logoUrl ? (
              <Image
                src={config.logoUrl}
                alt={`${config.name} logo`}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Minus className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            )}
          </div>
          <div>
            <h3 className="text-[0.9375rem] font-bold text-foreground">{breakdown.toolName}</h3>
            <p className="text-[12px] text-muted-foreground font-medium">
              {breakdown.planLabel}
              {!breakdown.isApiTier && (
                <span className="ml-2 text-muted-foreground/60">
                  · {breakdown.reportedSeats} seat{breakdown.reportedSeats !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* API badge */}
        {breakdown.isApiTier && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            API
          </span>
        )}
      </div>

      {/* Spend row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Reported
          </p>
          <p className="text-base font-extrabold tracking-tight text-foreground">
            {formatMonthly(breakdown.reportedMonthlySpend)}
          </p>
        </div>

        {breakdown.expectedMonthlySpend !== null && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Catalog
            </p>
            <p className="text-base font-extrabold tracking-tight text-foreground">
              {formatMonthly(breakdown.expectedMonthlySpend)}
            </p>
          </div>
        )}

        {hasVariance && Math.abs(breakdown.varianceAmount!) >= 5 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Variance
            </p>
            <p
              className={cn(
                "text-base font-extrabold tracking-tight flex items-center gap-1",
                isOverpaying  ? "text-destructive" : isUnderpaying ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {isOverpaying  && <TrendingUp className="h-3.5 w-3.5"  aria-label="Spending above catalog price" />}
              {isUnderpaying && <TrendingDown className="h-3.5 w-3.5" aria-label="Spending below catalog price" />}
              {!isOverpaying && !isUnderpaying && <Minus className="h-3.5 w-3.5" aria-label="Aligned with catalog price" />}
              {isOverpaying ? "+" : ""}
              {formatCurrency(Math.abs(breakdown.varianceAmount!))}
            </p>
          </div>
        )}
      </div>

      {/* Catalog alignment note */}
      {breakdown.expectedMonthlySpend !== null && (
        <p className="mt-3 text-[11px] text-muted-foreground">
          {isOverpaying
            ? "Spend is above catalog price — may reflect add-ons or custom contract."
            : isUnderpaying
            ? "Spend is below catalog price — may reflect annual billing or negotiated rate."
            : "Spend aligns with published catalog pricing."}
        </p>
      )}
      {breakdown.isApiTier && (
        <p className="mt-3 text-[11px] text-muted-foreground">
          Usage-based billing. Catalog comparison not applicable.
        </p>
      )}
    </div>
  );
}
