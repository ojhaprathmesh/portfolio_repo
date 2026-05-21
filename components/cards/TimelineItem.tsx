// filepath: components/cards/TimelineItem.tsx
"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { ExperienceItem } from "@/types"

interface TimelineItemProps {
  item: ExperienceItem
  index: number
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <div className="relative pl-8 md:pl-12 pb-12 last:pb-0 border-l border-white/[0.06]">
      {/* Glow node anchor */}
      <div className="absolute left-0 top-1.5 -translate-x-[4.5px] w-2.5 h-2.5 rounded-full bg-[#0d0d0d] border border-white/20 flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-[#3B82F6]" />
      </div>

      {/* Item info header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-light text-white flex items-center gap-2 flex-wrap">
            <span>{item.role}</span>
            <span className="text-white/30 text-base">@</span>
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:underline flex items-center gap-1 font-mono text-sm tracking-wider"
              >
                <span>{item.company}</span>
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            ) : (
              <span className="font-mono text-sm tracking-wider text-white/70">{item.company}</span>
            )}
          </h3>
          <div className="flex items-center gap-3 mt-1 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <span>{item.type}</span>
            <span>·</span>
            <span>{item.location}</span>
          </div>
        </div>

        {/* Date period */}
        <div className="font-mono text-[10px] tracking-[0.25em] text-[#3B82F6] font-medium md:text-right uppercase">
          {item.period}
        </div>
      </div>

      {/* Description bullets */}
      <ul className="space-y-2 mb-5 list-none">
        {item.description.map((bullet, i) => (
          <li key={i} className="flex gap-2.5 text-xs text-white/60 leading-relaxed font-sans">
            <span className="text-[#3B82F6] select-none mt-1 font-mono text-[9px]">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Technologies & highlight footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/[0.03]">
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[8px] tracking-wider text-white/40 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {item.highlight && (
          <span className="font-mono text-[9px] tracking-[0.15em] text-[#00E5FF] bg-[#00E5FF]/[0.04] border border-[#00E5FF]/10 px-2.5 py-0.5 rounded-sm uppercase">
            {item.highlight}
          </span>
        )}
      </div>
    </div>
  )
}
