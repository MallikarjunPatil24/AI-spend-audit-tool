import { cn } from "@/lib/utils";

interface NumberInputProps {
  id: string;
  value: number | "";
  onChange: (value: number | "") => void;
  min?: number;
  max?: number;
  placeholder?: string;
  prefix?: string;   // e.g. "$"
  suffix?: string;   // e.g. "seats"
  error?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function NumberInput({
  id, value, onChange, min = 0, max, placeholder, prefix, suffix,
  error, disabled, className, "aria-label": ariaLabel,
}: NumberInputProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      {prefix && (
        <span className="absolute left-3 text-sm text-muted-foreground pointer-events-none select-none">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={error}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") { onChange(""); return; }
          const n = Number(raw);
          if (!isNaN(n)) onChange(n);
        }}
        className={cn(
          "w-full h-10 rounded-lg border bg-card text-sm transition-colors duration-150",
          "focus:outline-none focus:ring-2 [appearance:textfield]",
          "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          error
            ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
            : "border-border focus:ring-primary/20 focus:border-primary",
          prefix ? "pl-7" : "pl-3",
          suffix ? "pr-14" : "pr-3",
          disabled && "opacity-50 cursor-not-allowed",
          "text-foreground placeholder:text-muted-foreground"
        )}
      />
      {suffix && (
        <span className="absolute right-3 text-xs text-muted-foreground pointer-events-none select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}
