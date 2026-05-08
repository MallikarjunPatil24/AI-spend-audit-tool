import { scoreGrade } from "@/lib/formatters/percentages";

interface OptimizationScoreProps {
  score: number;
  summary: string;
}

export function OptimizationScore({ score, summary }: OptimizationScoreProps) {
  const { label, color, trackColor } = scoreGrade(score);
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;

  return (
    <div className="card-enterprise p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center gap-8">

        {/* SVG Score Ring */}
        <div className="relative flex-shrink-0" aria-label={`Optimization score: ${score} out of 100`}>
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            {/* Track */}
            <circle
              cx="60" cy="60" r={r}
              fill="none"
              stroke={trackColor}
              strokeWidth="10"
            />
            {/* Progress */}
            <circle
              cx="60" cy="60" r={r}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
          </svg>
          {/* Score number in centre */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold tracking-tight text-foreground">{score}</span>
            <span className="text-[11px] font-semibold text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center sm:text-left">
          <div className="mb-2 flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-[1.1rem] font-extrabold tracking-tight text-foreground">
              Optimization Score
            </h2>
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ background: trackColor, color }}
            >
              {label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
