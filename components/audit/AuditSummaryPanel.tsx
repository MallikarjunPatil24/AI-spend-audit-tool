import { ArrowRight, BarChart3, Users, Layers, DollarSign } from "lucide-react";
import type { AuditTotals, AuditFormData } from "@/types/audit";

interface AuditSummaryPanelProps {
  totals: AuditTotals;
  formData: Pick<AuditFormData, "teamSize">;
  onSubmit: () => void;
  isValid: boolean;
}

function StatRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} />
        {label}
      </div>
      <span
        className={
          highlight
            ? "text-[15px] font-bold tracking-tight text-foreground"
            : "text-sm font-semibold text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function AuditSummaryPanel({ totals, formData, onSubmit }: AuditSummaryPanelProps) {
  const annualSpend = totals.totalMonthlySpend * 12;

  return (
    <div className="sticky top-24 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Panel header */}
      <div
        className="px-5 py-4 border-b border-border"
        style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.06) 0%, transparent 100%)" }}
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" strokeWidth={1.75} />
          <h3 className="text-[13px] font-semibold text-foreground">Audit Summary</h3>
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Updates as you fill in the form</p>
      </div>

      {/* Stats */}
      <div className="px-5">
        <StatRow
          icon={Users}
          label="Team size"
          value={formData.teamSize !== "" ? `${formData.teamSize} people` : "—"}
        />
        <StatRow
          icon={Layers}
          label="Tools added"
          value={totals.toolCount > 0 ? `${totals.toolCount} tool${totals.toolCount !== 1 ? "s" : ""}` : "—"}
        />
        <StatRow
          icon={Users}
          label="Total seats"
          value={totals.totalSeats > 0 ? `${totals.totalSeats}` : "—"}
        />
        <StatRow
          icon={DollarSign}
          label="Monthly spend"
          value={
            totals.totalMonthlySpend > 0
              ? `$${totals.totalMonthlySpend.toLocaleString()}`
              : "—"
          }
          highlight
        />
      </div>

      {/* Annual callout */}
      {annualSpend > 0 && (
        <div className="mx-4 mb-4 mt-1 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
          <p className="text-[11px] text-muted-foreground">Projected annual spend</p>
          <p className="text-xl font-extrabold tracking-tight text-foreground mt-0.5">
            ${annualSpend.toLocaleString()}
            <span className="text-xs font-normal text-muted-foreground ml-1">/yr</span>
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="px-4 pb-5">
        <button
          type="button"
          onClick={onSubmit}
          className="btn-primary w-full justify-center !h-11"
        >
          Calculate My Savings
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
          Free · No account required
        </p>
      </div>
    </div>
  );
}
