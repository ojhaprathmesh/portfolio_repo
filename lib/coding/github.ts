import {
  buildContributionGrid,
  computeStreaks,
  flattenContributionWeeks,
  type ContributionDay,
} from "./contributions"
import { CODING_USERNAME, type GitHubLiveStats, type LanguageStat } from "./types"

const GITHUB_USER_URL = `https://github.com/${CODING_USERNAME}`

interface GitHubUserResponse {
  public_repos: number
  followers: number
  following: number
  login: string
}

interface ContributionsResponse {
  totalContributions?: number
  contributions?: ContributionDay[][]
}

interface RepoResponse {
  language: string | null
  stargazers_count: number
  fork: boolean
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

async function fetchContributionCalendar(): Promise<{
  total: number | null
  weeks: ContributionDay[][]
}> {
  try {
    const res = await fetch(
      `https://github-contributions-api.deno.dev/${CODING_USERNAME}.json`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return { total: null, weeks: [] }
    const data = (await res.json()) as ContributionsResponse
    return {
      total:
        typeof data.totalContributions === "number"
          ? data.totalContributions
          : null,
      weeks: data.contributions ?? [],
    }
  } catch {
    return { total: null, weeks: [] }
  }
}

async function fetchContributionsViaGraphQL(): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `

  try {
    const headers = new Headers(githubHeaders())
    headers.set("Content-Type", "application/json")
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables: { login: CODING_USERNAME } }),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return (
      json?.data?.user?.contributionsCollection?.contributionCalendar
        ?.totalContributions ?? null
    )
  } catch {
    return null
  }
}

async function fetchReposMeta(): Promise<{
  stars: number
  languages: LanguageStat[]
}> {
  const langCounts: Record<string, number> = {}
  let stars = 0
  let page = 1
  const perPage = 100

  try {
    while (page <= 5) {
      const res = await fetch(
        `https://api.github.com/users/${CODING_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        { headers: githubHeaders(), next: { revalidate: 3600 } },
      )
      if (!res.ok) break

      const repos = (await res.json()) as RepoResponse[]
      if (!Array.isArray(repos) || repos.length === 0) break

      for (const repo of repos) {
        if (repo.fork) continue
        stars += repo.stargazers_count ?? 0
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] ?? 0) + 1
        }
      }

      if (repos.length < perPage) break
      page++
    }

    const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1
    const languages: LanguageStat[] = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    return { stars, languages }
  } catch {
    return { stars: 0, languages: [] }
  }
}

function sumGridContributions(weeks: ContributionDay[][]): number {
  const grid = buildContributionGrid(weeks)
  let sum = 0
  for (const col of grid) {
    for (const day of col) {
      sum += day.contributionCount
    }
  }
  return sum
}

function gridFlattenedDays(weeks: ContributionDay[][]): ContributionDay[] {
  const grid = buildContributionGrid(weeks)
  const days: ContributionDay[] = []
  for (const col of grid) {
    for (const day of col) {
      days.push(day)
    }
  }
  return days
}

export async function fetchGitHubStats(): Promise<GitHubLiveStats | null> {
  try {
    const [userRes, calendar, reposMeta, graphqlTotal] = await Promise.all([
      fetch(`https://api.github.com/users/${CODING_USERNAME}`, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
      fetchContributionCalendar(),
      fetchReposMeta(),
      fetchContributionsViaGraphQL(),
    ])

    if (!userRes.ok) return null

    const user = (await userRes.json()) as GitHubUserResponse
    const weeks = calendar.weeks

    const gridDays = weeks.length > 0 ? gridFlattenedDays(weeks) : []
    const streak = computeStreaks(gridDays.length > 0 ? gridDays : flattenContributionWeeks(weeks))

    const apiTotal = graphqlTotal ?? calendar.total
    const gridSum = weeks.length > 0 ? sumGridContributions(weeks) : null
    const totalContributions =
      apiTotal ?? (gridSum !== null && gridSum > 0 ? gridSum : null)

    return {
      username: user.login ?? CODING_USERNAME,
      url: GITHUB_USER_URL,
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      totalContributions,
      totalStars: reposMeta.stars,
      contributionWeeks: weeks,
      streak,
      topLanguages: reposMeta.languages,
      fetchedAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}
