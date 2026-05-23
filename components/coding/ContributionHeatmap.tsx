"use client"

import { useMemo, useState } from "react"

import type { ContributionDay } from "@/lib/coding/contributions"
import {
  buildContributionGrid,
  getHeatmapDateRange,
  HEATMAP_SIZE,
  levelToOpacity,
} from "@/lib/coding/contributions"

interface ContributionHeatmapProps {
  weeks: ContributionDay[][]
}

export function ContributionHeatmap({ weeks }: ContributionHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number } | null>(null)

  const grid = useMemo(() => buildContributionGrid(weeks), [weeks])
  const range = useMemo(() => getHeatmapDateRange(), [])

  const tooltipText = tooltip
    ? `${tooltip.count} contribution${tooltip.count === 1 ? "" : "s"} on ${tooltip.date}`
    : "Hover a cell for details"

  if (!weeks.length) {
    return (
      <div className="p-6 bg-[#0d0d0d] border border-white/[0.04] rounded-sm text-center font-mono text-[10px] text-white/30">
        Contribution graph unavailable
      </div>
    )
  }

  return (
    <div className="p-5 md:p-6 bg-[#0d0d0d] border border-white/[0.04] rounded-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 min-h-[40px]">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase block">
            Contribution Activity
          </span>
          <span className="font-mono text-[9px] text-white/25 mt-1 block">
            {range.start} → {range.end}
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/40 sm:text-right leading-relaxed">
          {tooltipText}
        </span>
      </div>

      <div
        className="w-full grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${HEATMAP_SIZE.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${HEATMAP_SIZE.rows}, minmax(0, 1fr))`,
        }}
        role="img"
        aria-label={`GitHub contribution heatmap, ${HEATMAP_SIZE.cols} weeks by ${HEATMAP_SIZE.rows} days`}
      >
        {grid.map((column, col) =>
          column.map((day, row) => {
            const opacity = levelToOpacity(day.contributionLevel, day.contributionCount)
            const isToday = col === HEATMAP_SIZE.cols - 1 && row === HEATMAP_SIZE.rows - 1
            return (
              <button
                key={`${col}-${row}-${day.date}`}
                type="button"
                className={`aspect-square w-full min-h-[8px] rounded-[2px] border transition-[box-shadow,background-color] hover:ring-1 hover:ring-sky-400/60 focus:outline-none focus:ring-1 focus:ring-sky-400/60 ${
                  isToday ? "border-sky-400/40" : "border-white/[0.03]"
                }`}
                style={{
                  gridColumn: col + 1,
                  gridRow: row + 1,
                  backgroundColor: `rgba(88, 166, 255, ${opacity})`,
                }}
                onMouseEnter={() =>
                  setTooltip({ date: day.date, count: day.contributionCount })
                }
                onFocus={() =>
                  setTooltip({ date: day.date, count: day.contributionCount })
                }
                onMouseLeave={() => setTooltip(null)}
                onBlur={() => setTooltip(null)}
                aria-label={`${day.contributionCount} contributions on ${day.date}${isToday ? " (today)" : ""}`}
              />
            )
          }),
        )}
      </div>

      <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
        <span className="font-mono text-[8px] text-white/25 uppercase tracking-wider">
          {HEATMAP_SIZE.cols}×{HEATMAP_SIZE.rows} days · newest bottom-right
        </span>
        <div className="flex items-center gap-2 font-mono text-[8px] text-white/25 uppercase tracking-wider">
          <span>Less</span>
          {[0.08, 0.35, 0.55, 0.75, 1].map((o) => (
            <span
              key={o}
              className="w-[11px] h-[11px] rounded-[2px]"
              style={{ backgroundColor: `rgba(88, 166, 255, ${o})` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
