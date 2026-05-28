// filepath: components/cards/AchievementItem.tsx
"use client";

import { ExternalLink } from "lucide-react";

import type { Achievement } from "@/types";

interface AchievementItemProps {
  achievement: Achievement;
  index: number;
}

export function AchievementItem({ achievement, index }: AchievementItemProps) {
  const itemIndex = (index + 1).toString().padStart(2, "0");

  return (
    <div className="group bg-elevated relative flex flex-col gap-6 rounded-sm border border-white/4 p-6 transition-all duration-300 hover:border-white/10 md:flex-row md:p-8">
      {/* Metric callout on the right/top if exists */}
      <div className="flex min-w-30 flex-col items-start justify-center gap-1 md:order-last md:items-end">
        {achievement.metric ? (
          <>
            <span className="text-accent-cyan font-mono text-xl font-light tracking-wider md:text-2xl">
              {achievement.metric}
            </span>
            {achievement.metricLabel && (
              <span className="font-mono text-[9px] tracking-widest text-white/45 uppercase">
                {achievement.metricLabel}
              </span>
            )}
          </>
        ) : (
          <span className="text-accent-blue border-accent-blue/20 rounded-sm border px-2 py-0.5 font-mono text-[9px] font-medium tracking-widest uppercase">
            {achievement.type}
          </span>
        )}
      </div>

      {/* Main text content */}
      <div className="flex flex-1 gap-4">
        {/* Decorative prefix number */}
        <div className="pt-1 font-mono text-xs text-white/20 select-none">
          {itemIndex}
        </div>

        <div>
          {/* Header */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="group-hover:text-accent-cyan text-lg font-light text-white transition-colors duration-300">
              {achievement.title}
            </h3>
            {achievement.link && (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 transition-colors hover:text-white"
                aria-label={`Verify achievement: ${achievement.title}`}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Issuer / Date */}
          <div className="mb-4 flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <span>{achievement.issuer}</span>
            <span>·</span>
            <span>{achievement.date}</span>
          </div>

          {/* Description */}
          <p className="max-w-2xl font-sans text-xs leading-relaxed text-white/60">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  );
}
