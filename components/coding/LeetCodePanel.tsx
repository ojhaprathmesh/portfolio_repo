"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { LeetCodeBrandIcon } from "@/components/icons/LeetCodeBrandIcon";
import { useCountUp } from "@/hooks/use-count-up";
import type { LeetCodeLiveStats } from "@/lib/coding/types";

interface LeetCodePanelProps {
  stats: LeetCodeLiveStats;
}

const difficulties = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
] as const;

function CornerBrackets({ className = "" }: { className?: string }) {
  const c = "absolute w-2.5 h-2.5 border-white/15 pointer-events-none";
  return (
    <>
      <span
        className={`${c} top-2.5 left-2.5 border-t border-l ${className}`}
      />
      <span
        className={`${c} top-2.5 right-2.5 border-t border-r ${className}`}
      />
      <span
        className={`${c} bottom-2.5 left-2.5 border-b border-l ${className}`}
      />
      <span
        className={`${c} right-2.5 bottom-2.5 border-r border-b ${className}`}
      />
    </>
  );
}

export function LeetCodePanel({ stats }: LeetCodePanelProps) {
  const reduceMotion = useReducedMotion();
  const animatedSolved = useCountUp(stats.totalSolved, 1600, !reduceMotion);
  const displaySolved = reduceMotion ? stats.totalSolved : animatedSolved;
  const total = stats.totalSolved || 1;

  const counts = {
    easy: stats.easy,
    medium: stats.medium,
    hard: stats.hard,
  };

  return (
    <motion.a
      href={stats.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-card relative block h-full cursor-pointer overflow-hidden rounded-sm border border-white/8 p-5 transition-[border-color,box-shadow] duration-500 hover:border-white/[0.14] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] md:p-6"
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <CornerBrackets className="transition-colors duration-500 group-hover:border-white/25" />

      {/* header */}
      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <LeetCodeBrandIcon className="text-[#A7A7A7] transition-colors duration-500 group-hover:text-[#F5F5F5]" />
            <span className="font-mono text-[9px] tracking-[0.28em] text-[#A7A7A7] uppercase">
              LeetCode
            </span>
          </div>
          <span className="block font-mono text-[8px] tracking-[0.18em] text-[#5F5F5F] uppercase">
            PROBLEM_SOLVED · STATS.LIVE
          </span>
        </div>

        <div className="shrink-0 text-right">
          <div className="mb-1 flex items-center justify-end gap-2">
            <span className="flex items-center gap-1.5 font-mono text-[8px] tracking-widest text-[#A7A7A7] uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/30 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
              </span>
              SYNC_OK
            </span>
            <ExternalLink
              size={11}
              className="text-[#5F5F5F] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F5F5F5]"
            />
          </div>
          <span className="font-mono text-[8px] text-[#5F5F5F] tabular-nums opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            X:035 Y:092
          </span>
        </div>
      </div>

      <div className="relative mb-5 font-mono text-xs text-[#A7A7A7]">
        @{stats.username}
      </div>

      {/* primary readout */}
      <div className="relative mb-6 border-b border-white/6 pb-6">
        <span className="mb-3 block font-mono text-[8px] tracking-[0.22em] text-[#5F5F5F] uppercase">
          SOURCE.SOLVED
        </span>

        <div className="flex items-end gap-4">
          <motion.span
            className="font-mono text-[3.25rem] leading-none font-extralight tracking-tight text-[#F5F5F5] tabular-nums md:text-[3.75rem]"
            style={{
              textShadow: "0 0 48px rgba(255,255,255,0.06)",
            }}
          >
            {displaySolved}
          </motion.span>
          <div className="pb-2">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-[#A7A7A7] uppercase">
              Problems
            </span>
            <span className="mt-1 block font-mono text-[8px] text-[#5F5F5F]">
              all-time solved
            </span>
          </div>
        </div>
      </div>

      {/* difficulty distribution */}
      <div className="mb-6 space-y-3">
        {difficulties.map(({ key, label }) => {
          const count = counts[key];
          const pct = Math.round((count / total) * 100);
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-12 shrink-0 font-mono text-[9px] text-[#A7A7A7]">
                {label}
              </span>
              <div className="relative h-px flex-1 overflow-hidden bg-white/6">
                <motion.div
                  className="absolute inset-y-0 left-0 h-px bg-white/30"
                  initial={reduceMotion ? { width: `${pct}%` } : { width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[10px] text-[#F5F5F5] tabular-nums">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {stats.ranking != null && (
        <p className="relative mt-5 border-t border-white/5 pt-4 font-mono text-[8px] tracking-wider text-[#5F5F5F] uppercase">
          Global Rank ·{" "}
          <span className="text-[#A7A7A7] tabular-nums">
            #{stats.ranking.toLocaleString("en-IN")}
          </span>
        </p>
      )}

      {/* hover micro-detail */}
      <p className="pointer-events-none absolute right-4 bottom-3 font-mono text-[7px] tracking-[0.2em] text-[#5F5F5F] uppercase opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        Open profile source →
      </p>
    </motion.a>
  );
}
