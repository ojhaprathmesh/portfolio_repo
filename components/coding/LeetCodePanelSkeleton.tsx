"use client";

export function LeetCodePanelSkeleton() {
  return (
    <div
      className="bg-card h-full animate-pulse rounded-sm border border-l-2 border-white/6 border-l-white/10 p-5 md:p-6"
      aria-hidden
    >
      <div className="mb-5 h-3 w-24 rounded-sm bg-white/6" />
      <div className="mb-6 h-3 w-28 rounded-sm bg-white/4" />
      <div className="mb-8 h-14 w-16 rounded-sm bg-white/[0.07]" />
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-2 w-full rounded-sm bg-white/4" />
        ))}
      </div>
    </div>
  );
}
