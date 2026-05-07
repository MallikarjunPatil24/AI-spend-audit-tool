import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function SelectInput({
  id, value, onChange, options, placeholder, disabled, error, className, "aria-label": ariaLabel,
}: SelectInputProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={error}
        className={cn(
          "w-full h-10 appearance-none rounded-lg border bg-card pl-3 pr-9 text-sm transition-colors duration-150",
          "focus:outline-none focus:ring-2",
          error
            ? "border-destructive focus:ring-destructive/20 focus:border-destructive text-foreground"
            : "border-border focus:ring-primary/20 focus:border-primary text-foreground",
          !value && "text-muted-foreground",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}
