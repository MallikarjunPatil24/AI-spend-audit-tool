"use client";

import { useRouter } from "next/navigation";
import { Cpu, AlertCircle, ArrowRight, RotateCcw } from "lucide-react";
import { useAuditForm } from "@/lib/hooks/useAuditForm";
import { TeamInfoSection } from "./TeamInfoSection";
import { ToolEntryCard } from "./ToolEntryCard";
import { AddToolButton } from "./AddToolButton";
import { AuditSummaryPanel } from "./AuditSummaryPanel";
import { runAudit } from "@/lib/audit/engine";
import { storeAuditResult } from "@/lib/utils/audit-storage";
import type { UseCase, ToolEntry } from "@/types/audit";

export function AuditForm() {
  const router = useRouter();
  const {
    formData, errors, hydrated, totals,
    addTool, removeTool, updateTool, updateField,
    submitForm, resetForm,
  } = useAuditForm();

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const valid = submitForm();
    if (valid) {
      const result = runAudit(formData);
      storeAuditResult(result);
      router.push("/audit/results");
    }
  }

  // Loading skeleton while localStorage hydrates
  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading your audit…</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-border bg-card">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(79,70,229,0.05) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Cpu className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary mb-0.5">
                Audit Your Stack
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Audit My AI Stack
              </h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            Tell us which AI tools your team uses, how many seats you have, and what you pay.
            We&apos;ll instantly surface your savings opportunities.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* ── Left: Form ── */}
          <div className="flex flex-col gap-6">
            {/* Team info */}
            <TeamInfoSection
              formData={formData}
              errors={{ teamSize: errors.teamSize, useCase: errors.useCase }}
              onTeamSizeChange={(v) => updateField("teamSize", v as number | "")}
              onUseCaseChange={(v) => updateField("useCase", v as UseCase | "")}
            />

            {/* Tools section */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-foreground">
                  AI Tools
                  <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {formData.tools.length}
                  </span>
                </h2>
                {formData.tools.length > 1 && (
                  <span className="text-[11px] text-muted-foreground">
                    Hover a card to remove it
                  </span>
                )}
              </div>

              {/* General tools error */}
              {errors.general && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{errors.general}</p>
                </div>
              )}

              {/* Tool cards */}
              <div className="flex flex-col gap-4">
                {formData.tools.map((entry: ToolEntry, i) => (
                  <ToolEntryCard
                    key={entry.id}
                    entry={entry}
                    index={i}
                    errors={errors.tools[entry.id]}
                    canRemove={formData.tools.length > 1}
                    onUpdate={(field, value) => updateTool(entry.id, field, value)}
                    onRemove={() => removeTool(entry.id)}
                  />
                ))}
              </div>

              {/* Add tool button */}
              <div className="mt-4">
                <AddToolButton onClick={addTool} count={formData.tools.length} />
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden rounded-xl border border-border bg-card p-5">
              <button
                type="submit"
                className="btn-primary w-full justify-center !h-12 !text-base"
              >
                Calculate My Savings
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                Free · No account required
              </p>
            </div>

            {/* Reset */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Reset form
              </button>
            </div>
          </div>

          {/* ── Right: Summary panel (desktop) ── */}
          <div className="hidden lg:block">
            <AuditSummaryPanel
              totals={totals}
              formData={formData}
              onSubmit={handleSubmit}
              isValid={Object.keys(errors.tools).length === 0 && !errors.teamSize && !errors.useCase}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
