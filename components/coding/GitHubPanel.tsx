"use client"

import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { EmbeddedContributionHeatmap } from "@/components/coding/github-panel/EmbeddedContributionHeatmap"
import { useCountUp } from "@/hooks/use-count-up"
import type { GitHubLiveStats } from "@/lib/coding/types"

interface GitHubPanelProps {
  stats: GitHubLiveStats
}

function CornerBrackets({ className = "" }: { className?: string }) {
  const c = "absolute w-2.5 h-2.5 border-white/15 pointer-events-none"
  return (
    <>
      <span className={`${c} top-2.5 left-2.5 border-l border-t ${className}`} />
      <span className={`${c} top-2.5 right-2.5 border-r border-t ${className}`} />
      <span className={`${c} bottom-2.5 left-2.5 border-l border-b ${className}`} />
      <span className={`${c} bottom-2.5 right-2.5 border-r border-b ${className}`} />
    </>
  )
}

function MetricCell({
  label,
  value,
  sub,
  delay = 0,
}: {
  label: string
  value: string | number
  sub?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className="relative px-3 py-2.5 border border-white/[0.06] bg-[#080808]/80"
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block font-mono text-[7px] tracking-[0.22em] text-[#5F5F5F] uppercase mb-1">
        {label}
      </span>
      <span className="block font-mono text-lg font-light text-[#F5F5F5] tabular-nums leading-none">
        {value}
      </span>
      {sub && (
        <span className="block font-mono text-[8px] text-[#5F5F5F] mt-1">{sub}</span>
      )}
    </motion.div>
  )
}

export function GitHubPanel({ stats }: GitHubPanelProps) {
  const reduceMotion = useReducedMotion()
  const contributions = stats.totalContributions
  const animatedCount = useCountUp(contributions, 2000, !reduceMotion)

  const syncedLabel = useMemo(() => {
    try {
      return new Date(stats.fetchedAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    } catch {
      return null
    }
  }, [stats.fetchedAt])

  const displayCount =
    contributions == null ? "—" : reduceMotion ? contributions : animatedCount

  const openProfile = () => window.open(stats.url, "_blank", "noopener,noreferrer")

  return (
    <motion.div
      role="link"
      tabIndex={0}
      onClick={openProfile}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openProfile()
        }
      }}
      className="group relative block h-full cursor-pointer overflow-hidden rounded-sm border border-white/[0.08] bg-[#0B0B0B] p-5 md:p-6 transition-[border-color,box-shadow] duration-500 hover:border-white/[0.14] hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <CornerBrackets className="group-hover:border-white/25 transition-colors duration-500" />

      {/* header */}
      <div className="relative flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Github size={13} className="text-[#A7A7A7] group-hover:text-[#F5F5F5] transition-colors duration-500" />
            <span className="font-mono text-[9px] tracking-[0.28em] text-[#A7A7A7] uppercase">
              GitHub
            </span>
          </div>
          <span className="font-mono text-[8px] tracking-[0.18em] text-[#5F5F5F] uppercase block">
            REPO_SIGNAL · SOURCE.ACTIVITY
          </span>
        </div>

        <div className="text-right shrink-0">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="flex items-center gap-1.5 font-mono text-[8px] tracking-widest uppercase text-[#A7A7A7]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/30 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
              </span>
              SYNC_OK
            </span>
            <ExternalLink
              size={11}
              className="text-[#5F5F5F] group-hover:text-[#F5F5F5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
            />
          </div>
          <span className="font-mono text-[8px] text-[#5F5F5F] tabular-nums opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            X:051 Y:007
          </span>
        </div>
      </div>

      <div className="relative font-mono text-xs text-[#A7A7A7] mb-5">
        @{stats.username}
      </div>

      {/* primary readout */}
      <div className="relative mb-6 pb-6 border-b border-white/[0.06]">
        <span className="font-mono text-[8px] tracking-[0.22em] text-[#5F5F5F] uppercase block mb-3">
          SOURCE.ACTIVITY
        </span>

        <div className="flex items-end gap-4">
          <motion.span
            className="font-mono text-[3.25rem] md:text-[3.75rem] font-extralight text-[#F5F5F5] tabular-nums leading-none tracking-tight"
            style={{
              textShadow: "0 0 48px rgba(255,255,255,0.06)",
            }}
          >
            {displayCount}
          </motion.span>
          <div className="pb-2">
            <span className="block font-mono text-[9px] tracking-[0.2em] text-[#A7A7A7] uppercase">
              Contributions
            </span>
            <span className="block font-mono text-[8px] text-[#5F5F5F] mt-1">
              last 12 months
            </span>
          </div>
        </div>
      </div>

      {stats.contributionWeeks.length > 0 && (
        <EmbeddedContributionHeatmap weeks={stats.contributionWeeks} />
      )}

      {/* metric grid */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <MetricCell label="REPOSITORIES" value={stats.publicRepos} delay={0.35} />
        <MetricCell label="TOTAL_STARS" value={stats.totalStars} delay={0.42} />
        <MetricCell label="FOLLOWERS" value={stats.followers} delay={0.49} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <MetricCell
          label="STREAK_CUR"
          value={stats.streak.current}
          sub="days"
          delay={0.56}
        />
        <MetricCell
          label="STREAK_MAX"
          value={stats.streak.longest}
          sub="days"
          delay={0.63}
        />
        <MetricCell
          label="FOLLOWING"
          value={stats.following}
          delay={0.7}
        />
      </div>

      {syncedLabel && (
        <p className="relative mt-5 pt-4 border-t border-white/[0.05] font-mono text-[8px] tracking-wider text-[#5F5F5F] uppercase">
          Last synced · {syncedLabel}
        </p>
      )}

      {/* hover micro-detail */}
      <p className="absolute bottom-3 right-4 font-mono text-[7px] tracking-[0.2em] text-[#5F5F5F] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        Open signal source →
      </p>
    </motion.div>
  )
}
