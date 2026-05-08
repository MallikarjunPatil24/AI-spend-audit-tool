import { AI_TOOLS } from "@/types/tools";
import type { AiToolId } from "@/types/audit";

const TOOLS: { id: AiToolId; color: string }[] = [
  { id: "cursor",         color: "#6366f1" },
  { id: "github-copilot", color: "#24292e" },
  { id: "claude",         color: "#d97757" },
  { id: "chatgpt",        color: "#10a37f" },
  { id: "anthropic-api",  color: "#d97757" },
  { id: "openai-api",     color: "#10a37f" },
  { id: "gemini",         color: "#4285f4" },
  { id: "windsurf",       color: "#5b5fc7" },
];

export function ToolLogos() {
  return (
    <section
      id="tools"
      className="bg-white dark:bg-[#1a0f0a] py-14 px-5 border-b border-border"
      aria-label="Supported AI tools"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-[0.14em] mb-8">
          Audits every tool your team already uses
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TOOLS.map(({ id, color }) => {
            const tool = AI_TOOLS[id];
            return (
              <div
                key={id}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary/30 hover:shadow-sm transition-all duration-150 cursor-default"
              >
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                {tool.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
