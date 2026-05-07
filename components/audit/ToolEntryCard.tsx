import { X, Layers } from "lucide-react";
import type { ToolEntry, ToolEntryErrors } from "@/types/audit";
import { TOOL_CONFIGS, TOOL_CONFIG_MAP } from "@/lib/constants/tools";
import { FormField } from "@/components/forms/FormField";
import { SelectInput } from "@/components/forms/SelectInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { cn } from "@/lib/utils";

const TOOL_OPTIONS = TOOL_CONFIGS.map((t) => ({ value: t.id, label: t.name }));

interface ToolEntryCardProps {
  entry: ToolEntry;
  index: number;
  errors?: ToolEntryErrors;
  canRemove: boolean;
  onUpdate: (field: keyof ToolEntry, value: string | number) => void;
  onRemove: () => void;
}

export function ToolEntryCard({
  entry, index, errors, canRemove, onUpdate, onRemove,
}: ToolEntryCardProps) {
  const toolConfig = entry.toolId ? TOOL_CONFIG_MAP[entry.toolId] : null;
  const planOptions = toolConfig?.plans.map((p) => ({
    value: p.id,
    label: `${p.label} — ${p.priceHint}`,
  })) ?? [];

  const selectedPlan = toolConfig?.plans.find((p) => p.id === entry.plan);
  const isApiTier = selectedPlan?.isApiTier;

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-card p-5 shadow-sm transition-all duration-200",
        Object.keys(errors ?? {}).length
          ? "border-destructive/40 shadow-destructive/5"
          : "border-border hover:border-primary/20 hover:shadow-md hover:shadow-primary/5"
      )}
    >
      {/* Card header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {index + 1}
          </div>
          <div className="flex items-center gap-1.5">
            {toolConfig ? (
              <>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: toolConfig.color }}
                  aria-hidden="true"
                />
                <span className="text-[13px] font-semibold text-foreground">{toolConfig.name}</span>
                <span className="text-[11px] text-muted-foreground">· {toolConfig.vendor}</span>
              </>
            ) : (
              <span className="text-[13px] font-medium text-muted-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                Tool {index + 1}
              </span>
            )}
          </div>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove tool ${index + 1}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-150"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Tool selector */}
        <FormField label="AI Tool" htmlFor={`tool-${entry.id}`} error={errors?.toolId} required>
          <SelectInput
            id={`tool-${entry.id}`}
            value={entry.toolId}
            onChange={(v) => onUpdate("toolId", v)}
            options={TOOL_OPTIONS}
            placeholder="Select tool…"
            error={!!errors?.toolId}
            aria-label="Select AI tool"
          />
        </FormField>

        {/* Plan selector */}
        <FormField label="Plan" htmlFor={`plan-${entry.id}`} error={errors?.plan} required>
          <SelectInput
            id={`plan-${entry.id}`}
            value={entry.plan}
            onChange={(v) => onUpdate("plan", v)}
            options={planOptions}
            placeholder={entry.toolId ? "Select plan…" : "Select tool first"}
            disabled={!entry.toolId}
            error={!!errors?.plan}
            aria-label="Select plan"
          />
        </FormField>

        {/* Monthly spend */}
        <FormField
          label={isApiTier ? "Monthly API Spend" : "Monthly Spend"}
          htmlFor={`spend-${entry.id}`}
          error={errors?.monthlySpend}
          hint={isApiTier ? "Enter your average monthly bill" : undefined}
          required
        >
          <NumberInput
            id={`spend-${entry.id}`}
            value={entry.monthlySpend}
            onChange={(v) => onUpdate("monthlySpend", v === "" ? "" : Number(v))}
            min={0}
            placeholder="0"
            prefix="$"
            error={!!errors?.monthlySpend}
            aria-label="Monthly spend in USD"
          />
        </FormField>

        {/* Seats */}
        <FormField
          label={isApiTier ? "Team Members Using" : "Number of Seats"}
          htmlFor={`seats-${entry.id}`}
          error={errors?.seats}
          required
        >
          <NumberInput
            id={`seats-${entry.id}`}
            value={entry.seats}
            onChange={(v) => onUpdate("seats", v === "" ? "" : Number(v))}
            min={1}
            placeholder="1"
            suffix={isApiTier ? "users" : "seats"}
            error={!!errors?.seats}
            aria-label={isApiTier ? "Team members using this tool" : "Number of seats"}
          />
        </FormField>
      </div>
    </div>
  );
}
