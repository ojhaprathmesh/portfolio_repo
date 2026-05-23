"use client"

import { useEffect, useState } from "react"

export function useCountUp(
  target: number | null | undefined,
  durationMs = 1800,
  enabled = true,
): number | null {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled || target == null || target === undefined) {
      setValue(0)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs, enabled])

  if (target == null || target === undefined) return null
  return value
}
