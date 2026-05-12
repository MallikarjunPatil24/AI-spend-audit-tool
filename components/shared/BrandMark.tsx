import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
}

export function BrandMark({ className, iconClassName }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/15 bg-primary text-primary-foreground shadow-xs",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("h-[18px] w-[18px]", iconClassName)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 7.5h11M6.5 12h8M6.5 16.5h4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M16.5 14.25l1.35 1.35 2.65-3.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
