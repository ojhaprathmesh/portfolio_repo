"use client"

import { motion, useReducedMotion } from "framer-motion"

import type { LanguageStat } from "@/lib/coding/types"

interface TopLanguagesChartProps {
  languages: LanguageStat[]
}

export function TopLanguagesChart({ languages }: TopLanguagesChartProps) {
  const reduceMotion = useReducedMotion()
  if (languages.length === 0) return null

  const max = Math.max(...languages.map((l) => l.percentage), 1)

  return (
    <motion.div
      className="rounded-sm border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-baseline justify-between mb-6">
        <h3 className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Repository languages
        </h3>
        <span className="font-mono text-[9px] text-white/25">by share of repos</span>
      </div>

      <ol className="space-y-4">
        {languages.map((lang, idx) => (
          <li key={lang.name} className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-white/20 tabular-nums w-5 shrink-0">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1.5 gap-2">
                <span className="font-mono text-xs text-white/70 truncate">{lang.name}</span>
                <span className="font-mono text-[10px] text-white/35 tabular-nums shrink-0">
                  {lang.percentage}%
                </span>
              </div>
              <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/40 rounded-full"
                  initial={reduceMotion ? { width: `${(lang.percentage / max) * 100}%` } : { width: 0 }}
                  animate={{ width: `${(lang.percentage / max) * 100}%` }}
                  transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </motion.div>
  )
}
