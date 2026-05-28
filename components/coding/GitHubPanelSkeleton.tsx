"use client";

export function GitHubPanelSkeleton() {
  return (
    <div
      className="bg-card relative animate-pulse overflow-hidden rounded-sm border border-white/8 p-5 md:p-6"
      aria-hidden
    >
      <div className="absolute top-2.5 left-2.5 h-2.5 w-2.5 border-t border-l border-white/6" />
      <div className="absolute top-2.5 right-2.5 h-2.5 w-2.5 border-t border-r border-white/6" />
      <div className="space-y-5">
        <div className="h-3 w-24 rounded-sm bg-white/6" />
        <div className="h-3 w-28 rounded-sm bg-white/4" />
        <div className="h-12 w-24 rounded-sm bg-white/[0.07]" />
        <div className="h-16 w-full rounded-[2px] border border-white/4 bg-white/4" />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-14 rounded-sm border border-white/4 bg-white/3"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
