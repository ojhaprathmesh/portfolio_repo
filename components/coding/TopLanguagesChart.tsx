"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { LanguageStat } from "@/lib/coding/types";

interface TopLanguagesChartProps {
  languages: LanguageStat[];
}

export function TopLanguagesChart({ languages }: TopLanguagesChartProps) {
  const reduceMotion = useReducedMotion();
  if (languages.length === 0) return null;

  const max = Math.max(...languages.map((l) => l.percentage), 1);

  return (
    <motion.div
      className="bg-card rounded-sm border border-white/6 p-5 md:p-6"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <h3 className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Repository languages
        </h3>
        <span className="font-mono text-[9px] text-white/25">
          by share of repos
        </span>
      </div>

      <ol className="space-y-4">
        {languages.map((lang, idx) => (
          <li key={lang.name} className="flex items-center gap-4">
            <span className="w-5 shrink-0 font-mono text-[10px] text-white/20 tabular-nums">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex justify-between gap-2">
                <span className="truncate font-mono text-xs text-white/70">
                  {lang.name}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-white/35 tabular-nums">
                  {lang.percentage}%
                </span>
              </div>
              <div className="h-0.75 overflow-hidden rounded-full bg-white/4">
                <motion.div
                  className="h-full rounded-full bg-white/40"
                  initial={
                    reduceMotion
                      ? { width: `${(lang.percentage / max) * 100}%` }
                      : { width: 0 }
                  }
                  animate={{ width: `${(lang.percentage / max) * 100}%` }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}
