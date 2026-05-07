"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  AuditFormData,
  AuditFormErrors,
  AuditTotals,
  ToolEntry,
  ToolEntryErrors,
} from "@/types/audit";

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "spendscope_audit_v1";

function genId(): string {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export function createDefaultEntry(): ToolEntry {
  return { id: genId(), toolId: "", plan: "", monthlySpend: "", seats: "" };
}

const DEFAULT_FORM: AuditFormData = {
  teamSize: "",
  useCase: "",
  tools: [createDefaultEntry()],
};

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function loadFromStorage(): AuditFormData {
  if (typeof window === "undefined") return DEFAULT_FORM;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FORM;
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed) || !Array.isArray(parsed.tools)) return DEFAULT_FORM;
    // Re-hydrate tools, ensuring every entry has an id
    const tools: ToolEntry[] = (parsed.tools as unknown[])
      .filter(isObject)
      .map((t) => ({ ...createDefaultEntry(), ...t }));
    return {
      teamSize: typeof parsed.teamSize === "number" || parsed.teamSize === "" ? parsed.teamSize as AuditFormData["teamSize"] : "",
      useCase:  typeof parsed.useCase  === "string"  ? parsed.useCase  as AuditFormData["useCase"]  : "",
      tools:    tools.length > 0 ? tools : [createDefaultEntry()],
    };
  } catch {
    return DEFAULT_FORM;
  }
}

function saveToStorage(data: AuditFormData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* quota exceeded — silent */ }
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateForm(data: AuditFormData): AuditFormErrors {
  const errors: AuditFormErrors = { tools: {} };

  if (data.teamSize === "" || Number(data.teamSize) < 1) {
    errors.teamSize = "Team size must be at least 1";
  }
  if (!data.useCase) {
    errors.useCase = "Select your primary use case";
  }
  if (data.tools.length === 0) {
    errors.general = "Add at least one AI tool";
  }

  for (const tool of data.tools) {
    const e: ToolEntryErrors = {};
    if (!tool.toolId)  e.toolId  = "Select a tool";
    if (tool.toolId && !tool.plan) e.plan = "Select a plan";
    if (tool.monthlySpend === "" || Number(tool.monthlySpend) < 0)
      e.monthlySpend = "Enter a valid spend amount";
    if (tool.seats === "" || Number(tool.seats) < 1)
      e.seats = "At least 1 seat";
    if (Object.keys(e).length) errors.tools[tool.id] = e;
  }

  return errors;
}

export function hasErrors(errors: AuditFormErrors): boolean {
  return (
    !!errors.teamSize ||
    !!errors.useCase  ||
    !!errors.general  ||
    Object.keys(errors.tools).length > 0
  );
}

// ─── Totals ───────────────────────────────────────────────────────────────────

export function computeTotals(data: AuditFormData): AuditTotals {
  let totalMonthlySpend = 0;
  let totalSeats = 0;
  for (const t of data.tools) {
    if (t.monthlySpend !== "") totalMonthlySpend += Number(t.monthlySpend);
    if (t.seats !== "")        totalSeats        += Number(t.seats);
  }
  return { toolCount: data.tools.length, totalMonthlySpend, totalSeats };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuditForm() {
  const [formData, setFormData] = useState<AuditFormData>(DEFAULT_FORM);
  const [errors, setErrors]     = useState<AuditFormErrors>({ tools: {} });
  const [touched, setTouched]   = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    setFormData(loadFromStorage());
    setHydrated(true);
  }, []);

  // Auto-save on every change (after hydration)
  useEffect(() => {
    if (hydrated) saveToStorage(formData);
  }, [formData, hydrated]);

  // Re-run validation live after first submit attempt
  useEffect(() => {
    if (touched) setErrors(validateForm(formData));
  }, [formData, touched]);

  const addTool = useCallback(() => {
    setFormData((prev) => ({ ...prev, tools: [...prev.tools, createDefaultEntry()] }));
  }, []);

  const removeTool = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.length > 1 ? prev.tools.filter((t) => t.id !== id) : prev.tools,
    }));
  }, []);

  const updateTool = useCallback((id: string, field: keyof ToolEntry, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.map((t) =>
        t.id === id
          ? { ...t, [field]: value, ...(field === "toolId" ? { plan: "" } : {}) }
          : t
      ),
    }));
  }, []);

  const updateField = useCallback(
    <K extends keyof Pick<AuditFormData, "teamSize" | "useCase">>(
      field: K,
      value: AuditFormData[K]
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const submitForm = useCallback((): boolean => {
    setTouched(true);
    const e = validateForm(formData);
    setErrors(e);
    return !hasErrors(e);
  }, [formData]);

  const resetForm = useCallback(() => {
    const fresh = { ...DEFAULT_FORM, tools: [createDefaultEntry()] };
    setFormData(fresh);
    setErrors({ tools: {} });
    setTouched(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return {
    formData,
    errors,
    hydrated,
    totals: computeTotals(formData),
    addTool,
    removeTool,
    updateTool,
    updateField,
    submitForm,
    resetForm,
  };
}
