import { CheckCircle2 } from "lucide-react";

export function SuccessState() {
  return (
    <div className="card-white p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 className="h-7 w-7 text-green-500" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-extrabold tracking-tight text-foreground mb-2">
        You're on the list!
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        We've sent a copy of your audit results to your inbox. We'll notify you
        when new optimization opportunities apply to your stack.
      </p>
    </div>
  );
}
