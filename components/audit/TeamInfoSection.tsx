import type { AuditFormData, AuditFormErrors, UseCase } from "@/types/audit";
import { USE_CASE_OPTIONS } from "@/lib/constants/tools";
import { FormField } from "@/components/forms/FormField";
import { SelectInput } from "@/components/forms/SelectInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { Users } from "lucide-react";

interface TeamInfoSectionProps {
  formData: Pick<AuditFormData, "teamSize" | "useCase">;
  errors: Pick<AuditFormErrors, "teamSize" | "useCase">;
  onTeamSizeChange: (v: number | "") => void;
  onUseCaseChange: (v: UseCase | "") => void;
}

export function TeamInfoSection({
  formData, errors, onTeamSizeChange, onUseCaseChange,
}: TeamInfoSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-4.5 w-4.5 text-primary" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
            Team Information
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tell us about your team so we can benchmark your spend
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Total Team Size"
          htmlFor="team-size"
          error={errors.teamSize}
          required
          hint="All employees who might use AI tools"
        >
          <NumberInput
            id="team-size"
            value={formData.teamSize}
            onChange={(v) => onTeamSizeChange(v as number | "")}
            min={1}
            placeholder="e.g. 12"
            suffix="people"
            error={!!errors.teamSize}
            aria-label="Total team size"
          />
        </FormField>

        <FormField
          label="Primary Use Case"
          htmlFor="use-case"
          error={errors.useCase}
          required
        >
          <SelectInput
            id="use-case"
            value={formData.useCase}
            onChange={(v) => onUseCaseChange(v as UseCase | "")}
            placeholder="Select use case…"
            options={USE_CASE_OPTIONS}
            error={!!errors.useCase}
            aria-label="Primary use case"
          />
        </FormField>
      </div>
    </div>
  );
}
