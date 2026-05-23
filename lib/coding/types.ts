import type { ContributionDay, StreakStats } from "./contributions"

export const CODING_USERNAME = "ojhaprathmesh" as const

export interface LanguageStat {
  name: string
  count: number
  percentage: number
}

export interface GitHubLiveStats {
  username: string
  url: string
  publicRepos: number
  followers: number
  following: number
  totalContributions: number | null
  totalStars: number
  contributionWeeks: ContributionDay[][]
  streak: StreakStats
  topLanguages: LanguageStat[]
  fetchedAt: string
}

export interface LeetCodeLiveStats {
  username: string
  url: string
  totalSolved: number
  easy: number
  medium: number
  hard: number
  ranking: number | null
  contestRating: number | null
  contestBadge: string | null
  fetchedAt: string
}

export interface CodingStatsResponse {
  github: GitHubLiveStats | null
  leetcode: LeetCodeLiveStats | null
  errors?: string[]
}
