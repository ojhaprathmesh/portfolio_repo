"use client"

export function LeetCodePanelSkeleton() {
  return (
    <div
      className="h-full rounded-sm border border-white/[0.06] border-l-2 border-l-white/10 bg-[#0a0a0a] p-5 md:p-6 animate-pulse"
      aria-hidden
    >
      <div className="h-3 w-24 bg-white/[0.06] rounded-sm mb-5" />
      <div className="h-3 w-28 bg-white/[0.04] rounded-sm mb-6" />
      <div className="h-14 w-16 bg-white/[0.07] rounded-sm mb-8" />
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-2 w-full bg-white/[0.04] rounded-sm" />
        ))}
      </div>
    </div>
  )
}
