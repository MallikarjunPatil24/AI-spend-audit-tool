export function ResultsSkeleton() {
  return (
    <div className="animate-pulse" aria-label="Loading audit results" aria-busy="true">
      {/* Hero skeleton */}
      <div className="marketing-dot-bg h-64 border-b border-border" />

      <div className="mx-auto max-w-4xl px-5 py-10 space-y-8">
        {/* Score */}
        <div className="card-enterprise p-6 flex gap-6">
          <div className="h-28 w-28 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-5 w-40 rounded-full bg-muted" />
            <div className="h-4 w-full rounded-full bg-muted" />
            <div className="h-4 w-3/4 rounded-full bg-muted" />
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <div className="h-5 w-48 rounded-full bg-muted" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-enterprise p-6 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-24 rounded-full bg-muted" />
                <div className="h-5 w-32 rounded-full bg-muted" />
              </div>
              <div className="h-4 w-full rounded-full bg-muted" />
              <div className="h-4 w-2/3 rounded-full bg-muted" />
            </div>
          ))}
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="card-enterprise p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                <div className="h-4 w-32 rounded-full bg-muted" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="h-3 w-16 rounded-full bg-muted" />
                  <div className="h-5 w-20 rounded-full bg-muted" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-14 rounded-full bg-muted" />
                  <div className="h-5 w-20 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
