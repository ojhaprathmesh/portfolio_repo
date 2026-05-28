// filepath: components/cards/AchievementItem.tsx
"use client"

import { ExternalLink } from "lucide-react"

import type { Achievement } from "@/types"

interface AchievementItemProps {
  achievement: Achievement
  index: number
}

export function AchievementItem({ achievement, index }: AchievementItemProps) {
  const itemIndex = (index + 1).toString().padStart(2, "0")

  return (
    <div className="group relative flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-[#0d0d0d] border border-white/4 rounded-sm hover:border-white/10 transition-all duration-300">
      
      {/* Metric callout on the right/top if exists */}
      <div className="md:order-last flex flex-col justify-center items-start md:items-end gap-1 min-w-30">
        {achievement.metric ? (
          <>
            <span className="font-mono text-xl md:text-2xl font-light text-[#00E5FF] tracking-wider">
              {achievement.metric}
            </span>
            {achievement.metricLabel && (
              <span className="font-mono text-[9px] tracking-widest uppercase text-white/45">
                {achievement.metricLabel}
              </span>
            )}
          </>
        ) : (
          <span className="font-mono text-[9px] tracking-widest uppercase text-[#3B82F6] font-medium border border-[#3B82F6]/20 px-2 py-0.5 rounded-sm">
            {achievement.type}
          </span>
        )}
      </div>

      {/* Main text content */}
      <div className="flex-1 flex gap-4">
        {/* Decorative prefix number */}
        <div className="font-mono text-xs text-white/20 select-none pt-1">
          {itemIndex}
        </div>

        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-lg font-light text-white group-hover:text-[#00E5FF] transition-colors duration-300">
              {achievement.title}
            </h3>
            {achievement.link && (
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                aria-label={`Verify achievement: ${achievement.title}`}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Issuer / Date */}
          <div className="flex items-center gap-3 mb-4 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <span>{achievement.issuer}</span>
            <span>·</span>
            <span>{achievement.date}</span>
          </div>

          {/* Description */}
          <p className="text-white/60 text-xs font-sans leading-relaxed max-w-2xl">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  )
}
