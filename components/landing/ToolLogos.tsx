import { AI_TOOLS } from "@/types/tools";
import type { AiToolId } from "@/types/audit";

const FEATURED_TOOLS: { id: AiToolId; color: string }[] = [
  { id: "cursor",         color: "#000000" },
  { id: "github-copilot", color: "#24292e" },
  { id: "claude",         color: "#d97757" },
  { id: "chatgpt",        color: "#10a37f" },
  { id: "anthropic-api",  color: "#d97757" },
  { id: "openai-api",     color: "#10a37f" },
  { id: "gemini",         color: "#4285f4" },
  { id: "windsurf",       color: "#5b5fc7" },
  { id: "v0",             color: "#000000" },
];

export function ToolLogos() {
  return (
    <section
      id="tools"
      className="py-16 px-5 border-y border-border/50"
      style={{ background: "linear-gradient(to bottom, var(--muted), var(--background))" }}
      aria-label="Supported AI tools"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-8">
          Audits every tool your team already uses
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {FEATURED_TOOLS.map(({ id, color }) => {
            const tool = AI_TOOLS[id];
            return (
              <ToolChip key={id} name={tool.name} color={color} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolChip({ name, color }: { name: string; color: string }) {
  const isDark = color === "#000000" || color === "#24292e";

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-card-foreground shadow-xs hover:shadow-sm hover:border-primary/20 transition-all duration-200 cursor-default select-none">
      <span
        className="h-2 w-2 rounded-full flex-shrink-0 ring-1 ring-black/5"
        style={{
          backgroundColor: isDark ? "#374151" : color,
        }}
        aria-hidden="true"
      />
      {name}
    </div>
  );
}
