import type { AiToolId } from "@/types/audit";

// ─── Pricing Primitives ───────────────────────────────────────────────────────

export interface PricingPlan {
  planId: string;
  planLabel: string;
  /** USD per seat per month. null = enterprise/custom pricing */
  monthlyPricePerSeat: number | null;
  /** USD per seat per month when billed annually (if available) */
  annualPricePerSeatMonthly?: number | null;
  /** Hard minimum seat requirement (e.g. Claude Team = 5) */
  minSeats?: number;
  isApiTier: boolean;
  isEnterprise: boolean;
  /** Canonical source URL for this price point */
  sourceUrl: string;
  /** ISO-8601 date this price was verified */
  verifiedDate: string;
  notes?: string;
}

export interface ToolPricing {
  toolId: AiToolId;
  toolName: string;
  vendorUrl: string;
  pricingPageUrl: string;
  plans: PricingPlan[];
}

/** Keyed lookup: toolId → ToolPricing */
export type PricingCatalog = Record<AiToolId, ToolPricing>;

// ─── Variance ─────────────────────────────────────────────────────────────────

export interface SpendVariance {
  toolId: AiToolId;
  planId: string;
  seats: number;
  reportedMonthlySpend: number;
  expectedMonthlySpend: number | null;
  /** positive = overspend vs catalog, negative = underspend */
  variancePct: number | null;
}
