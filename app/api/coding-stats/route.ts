import { NextResponse } from "next/server"
import { fetchGitHubStats } from "@/lib/coding/github"
import { fetchLeetCodeStats } from "@/lib/coding/leetcode"
import type { CodingStatsResponse } from "@/lib/coding/types"

export const revalidate = 3600

export async function GET() {
  const errors: string[] = []

  const [github, leetcode] = await Promise.all([
    fetchGitHubStats().catch(() => {
      errors.push("github")
      return null
    }),
    fetchLeetCodeStats().catch(() => {
      errors.push("leetcode")
      return null
    }),
  ])

  const body: CodingStatsResponse = {
    github,
    leetcode,
    ...(errors.length > 0 ? { errors } : {}),
  }

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
