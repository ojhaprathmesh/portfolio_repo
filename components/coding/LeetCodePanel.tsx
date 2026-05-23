"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import { LeetCodeBrandIcon } from "@/components/icons/LeetCodeBrandIcon"
import { useCountUp } from "@/hooks/use-count-up"
import type { LeetCodeLiveStats } from "@/lib/coding/types"

interface LeetCodePanelProps {
  stats: LeetCodeLiveStats
}

const difficulties = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
] as const

export function LeetCodePanel({ stats }: LeetCodePanelProps) {
  const reduceMotion = useReducedMotion()
  const animatedSolved = useCountUp(stats.totalSolved, 1600, !reduceMotion)
  const displaySolved = reduceMotion ? stats.totalSolved : animatedSolved
  const total = stats.totalSolved || 1

  const counts = {
    easy: stats.easy,
    medium: stats.medium,
    hard: stats.hard,
  }

  return (
    <motion.a
      href={stats.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-sm border border-white/[0.06] bg-[#0a0a0a] border-l-2 border-l-white/20 p-5 md:p-6 hover:border-white/[0.12] hover:border-l-white/40 transition-all duration-300"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <LeetCodeBrandIcon size="sm" className="text-white/50 group-hover:text-white/70 transition-colors" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
            LeetCode
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] tracking-widest uppercase text-white/35">
            Live
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 animate-ping opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/60" />
          </span>
          <ExternalLink
            size={12}
            className="text-white/20 group-hover:text-white/60 transition-colors"
          />
        </div>
      </div>

      <p className="font-mono text-xs text-white/40 mb-6">@{stats.username}</p>

      <div className="flex items-baseline gap-3 mb-8">
        <span className="font-mono text-5xl md:text-6xl font-extralight text-white tabular-nums leading-none">
          {displaySolved}
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/35 pb-1">
          solved
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {difficulties.map(({ key, label }) => {
          const count = counts[key]
          const pct = Math.round((count / total) * 100)
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-white/30 w-12 shrink-0">{label}</span>
              <div className="flex-1 h-px bg-white/[0.06] relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 h-px bg-white/50"
                  initial={reduceMotion ? { width: `${pct}%` } : { width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="font-mono text-[10px] text-white/50 tabular-nums w-8 text-right">
                {count}
              </span>
            </div>
          )
        })}
      </div>

      {stats.ranking != null && (
        <p className="pt-4 border-t border-white/[0.05] font-mono text-[10px] text-white/30">
          Global rank{" "}
          <span className="text-white/55">#{stats.ranking.toLocaleString("en-IN")}</span>
        </p>
      )}
    </motion.a>
  )
}
