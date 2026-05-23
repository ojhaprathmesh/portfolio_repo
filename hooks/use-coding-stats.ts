"use client"

import { useEffect, useState } from "react"

import type { CodingStatsResponse } from "@/lib/coding/types"

interface UseCodingStatsResult {
  data: CodingStatsResponse | null
  isLoading: boolean
  error: string | null
}

export function useCodingStats(): UseCodingStatsResult {
  const [data, setData] = useState<CodingStatsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/coding-stats")
        if (!res.ok) throw new Error("Failed to load coding stats")
        const json = (await res.json()) as CodingStatsResponse
        if (!cancelled) {
          setData(json)
          if (!json.github && !json.leetcode) {
            setError("Could not load platform stats")
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error")
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { data, isLoading, error }
}
