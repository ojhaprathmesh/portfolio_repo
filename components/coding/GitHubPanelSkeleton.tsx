"use client"

export function GitHubPanelSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-sm border border-white/8 bg-[#0B0B0B] p-5 md:p-6 animate-pulse"
      aria-hidden
    >
      <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-l border-t border-white/6" />
      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-r border-t border-white/6" />
      <div className="space-y-5">
        <div className="h-3 w-24 bg-white/6 rounded-sm" />
        <div className="h-3 w-28 bg-white/4 rounded-sm" />
        <div className="h-12 w-24 bg-white/[0.07] rounded-sm" />
        <div className="h-16 w-full bg-white/4 rounded-[2px] border border-white/4" />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 bg-white/3 border border-white/4 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  )
}
