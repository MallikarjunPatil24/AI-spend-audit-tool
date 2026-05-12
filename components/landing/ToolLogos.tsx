import Image from "next/image";
import { AI_TOOLS } from "@/types/tools";
import type { AiToolId } from "@/types/audit";

const TOOLS: { id: AiToolId; color: string }[] = [
  { id: "cursor", color: "#6366f1" },
  { id: "github-copilot", color: "#24292e" },
  { id: "claude", color: "#d97757" },
  { id: "chatgpt", color: "#10a37f" },
  { id: "anthropic-api", color: "#d97757" },
  { id: "openai-api", color: "#10a37f" },
  { id: "gemini", color: "#4285f4" },
  { id: "windsurf", color: "#5b5fc7" },
];

export function ToolLogos() {
  return (
    <section
      id="tools"
      className="marketing-dot-bg py-12 px-5 border-b border-border"
      aria-label="Supported AI tools"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-medium text-zinc-500 uppercase tracking-widest mb-6">
          Audits every tool your team already uses
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 text-center mb-6">
          AI Tools We Audit
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TOOLS.map(({ id }) => {
            const tool = AI_TOOLS[id];

            return (
              <div
                key={id}
                className="flex min-h-[156px] flex-col items-center justify-center rounded-lg border border-border bg-card p-5 text-center shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5"
                role="listitem"
                aria-label={tool.name}
              >
                {/* Monochrome SVG logo from /public/logos */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-white">
                  <Image
                    src={tool.logoUrl ?? "/logos/openai.svg"}
                    alt={`${tool.name} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <div className="mt-4 text-sm font-semibold text-foreground">
                  {tool.name}
                </div>

                <div className="mt-1.5 text-[13px] text-muted-foreground font-medium">
                  {tool.vendor}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
