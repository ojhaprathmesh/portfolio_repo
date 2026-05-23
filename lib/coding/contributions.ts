export interface ContributionDay {
  date: string
  contributionCount: number
  contributionLevel?: string
}

export interface StreakStats {
  current: number
  longest: number
}

const HEATMAP_COLS = 52
const HEATMAP_ROWS = 7
const HEATMAP_DAYS = HEATMAP_COLS * HEATMAP_ROWS

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function formatLocalDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function dayKey(date: Date): string {
  return formatLocalDate(date)
}

export function flattenContributionWeeks(
  weeks: ContributionDay[][],
): ContributionDay[] {
  return weeks.flat().filter((d) => d.date)
}

/**
 * 52×7 grid: column-major from top-left (oldest) to bottom-right (today).
 * grid[col][row] — col 0..51, row 0..6; grid[51][6] is always the latest day.
 */
export function buildContributionGrid(
  weeks: ContributionDay[][],
  endDate: Date = new Date(),
): ContributionDay[][] {
  const byDate = new Map<string, ContributionDay>()
  for (const day of flattenContributionWeeks(weeks)) {
    byDate.set(day.date, day)
  }

  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)

  const grid: ContributionDay[][] = []

  for (let col = 0; col < HEATMAP_COLS; col++) {
    const column: ContributionDay[] = []
    for (let row = 0; row < HEATMAP_ROWS; row++) {
      const dayIndex = col * HEATMAP_ROWS + row
      const date = new Date(end)
      date.setDate(date.getDate() - (HEATMAP_DAYS - 1 - dayIndex))
      const key = dayKey(date)
      column.push(
        byDate.get(key) ?? {
          date: key,
          contributionCount: 0,
          contributionLevel: "NONE",
        },
      )
    }
    grid.push(column)
  }

  return grid
}

export function getHeatmapDateRange(endDate: Date = new Date()): {
  start: string
  end: string
} {
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  const start = new Date(end)
  start.setDate(start.getDate() - (HEATMAP_DAYS - 1))
  return { start: dayKey(start), end: dayKey(end) }
}

export function computeStreaks(days: ContributionDay[]): StreakStats {
  if (days.length === 0) return { current: 0, longest: 0 }

  const activeDates = new Set(
    days.filter((d) => d.contributionCount > 0).map((d) => d.date),
  )

  const sorted = [...activeDates].sort()
  let longest = 0
  let run = 0
  let prev: Date | null = null

  for (const dateStr of sorted) {
    const current = parseDate(dateStr)
    if (prev) {
      const diff = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      run = diff === 1 ? run + 1 : 1
    } else {
      run = 1
    }
    longest = Math.max(longest, run)
    prev = current
  }

  let current = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let cursor = new Date(today)

  if (!activeDates.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }

  while (activeDates.has(dayKey(cursor))) {
    current++
    cursor.setDate(cursor.getDate() - 1)
  }

  return { current, longest }
}

export function levelToOpacity(level?: string, count?: number): number {
  if (!count || count === 0) return 0.08
  switch (level) {
    case "FIRST_QUARTILE":
      return 0.35
    case "SECOND_QUARTILE":
      return 0.55
    case "THIRD_QUARTILE":
      return 0.75
    case "FOURTH_QUARTILE":
      return 1
    default:
      return Math.min(1, 0.2 + count * 0.15)
  }
}

export const HEATMAP_SIZE = { cols: HEATMAP_COLS, rows: HEATMAP_ROWS } as const
