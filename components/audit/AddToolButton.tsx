import { Plus } from "lucide-react";

interface AddToolButtonProps {
  onClick: () => void;
  count: number;
}

export function AddToolButton({ onClick, count }: AddToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-border py-4 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/3 transition-all duration-200"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
        <Plus className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      Add {count > 0 ? "Another" : "a"} Tool
    </button>
  );
}
