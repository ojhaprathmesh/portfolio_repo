"use client";

import { useMemo, useState } from "react";

import type { ContributionDay } from "@/lib/coding/contributions";
import {
  buildContributionGrid,
  getHeatmapDateRange,
  HEATMAP_SIZE,
  levelToOpacity,
} from "@/lib/coding/contributions";

interface EmbeddedContributionHeatmapProps {
  weeks: ContributionDay[][];
}

export function EmbeddedContributionHeatmap({
  weeks,
}: EmbeddedContributionHeatmapProps) {
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const grid = useMemo(() => buildContributionGrid(weeks), [weeks]);
  const range = useMemo(() => getHeatmapDateRange(), []);

  const tooltipText = tooltip
    ? `${tooltip.count} on ${tooltip.date}`
    : "Hover a cell for details";

  if (!weeks.length) return null;

  return (
    <div
      className="relative mb-6"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="mb-2 flex min-h-8 items-start justify-between gap-2">
        <div>
          <span className="block font-mono text-[8px] tracking-[0.2em] text-[#5F5F5F] uppercase">
            CONTRIBUTION_ACTIVITY
          </span>
          <span className="mt-0.5 block font-mono text-[7px] text-[#5F5F5F]/80 tabular-nums">
            {range.start} → {range.end}
          </span>
        </div>
        <span className="max-w-[50%] text-right font-mono text-[8px] leading-relaxed text-[#5F5F5F]">
          {tooltipText}
        </span>
      </div>

      <div
        className="bg-background grid w-full gap-0.5 rounded-[2px] border border-white/6 p-2"
        style={{
          gridTemplateColumns: `repeat(${HEATMAP_SIZE.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${HEATMAP_SIZE.rows}, minmax(0, 1fr))`,
        }}
        role="img"
        aria-label="Contribution activity heatmap"
      >
        {grid.map((column, col) =>
          column.map((day, row) => {
            const opacity = levelToOpacity(
              day.contributionLevel,
              day.contributionCount,
            );
            const isToday =
              col === HEATMAP_SIZE.cols - 1 && row === HEATMAP_SIZE.rows - 1;
            return (
              <button
                key={`${col}-${row}-${day.date}`}
                type="button"
                className={`aspect-square max-h-2.5 min-h-1.5 w-full rounded-[1px] border transition-[box-shadow,background-color] hover:ring-1 hover:ring-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none ${
                  isToday ? "border-white/25" : "border-white/4"
                }`}
                style={{
                  gridColumn: col + 1,
                  gridRow: row + 1,
                  backgroundColor: `rgba(245, 245, 245, ${Math.max(0.05, opacity * 0.9)})`,
                }}
                onMouseEnter={() =>
                  setTooltip({ date: day.date, count: day.contributionCount })
                }
                onFocus={() =>
                  setTooltip({ date: day.date, count: day.contributionCount })
                }
                onMouseLeave={() => setTooltip(null)}
                onBlur={() => setTooltip(null)}
                aria-label={`${day.contributionCount} contributions on ${day.date}`}
              />
            );
          }),
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[7px] tracking-wider text-[#5F5F5F] uppercase">
          52×7 · newest bottom-right
        </span>
        <div className="flex items-center gap-1 font-mono text-[7px] text-[#5F5F5F] uppercase">
          <span>Less</span>
          {[0.08, 0.35, 0.55, 0.75, 1].map((o) => (
            <span
              key={o}
              className="h-2 w-2 rounded-[1px] border border-white/4"
              style={{ backgroundColor: `rgba(245, 245, 245, ${o})` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
