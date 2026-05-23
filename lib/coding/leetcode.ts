import { CODING_USERNAME, type LeetCodeLiveStats } from "./types"

const LEETCODE_URL = `https://leetcode.com/${CODING_USERNAME}`

const PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
        reputation
      }
    }
    userContestRanking(username: $username) {
      rating
      badge {
        name
      }
    }
  }
`

interface SubmissionCount {
  difficulty: string
  count: number
}

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser?: {
      submitStats?: {
        acSubmissionNum?: SubmissionCount[]
      }
      profile?: {
        ranking?: number
        reputation?: number
      }
    }
    userContestRanking?: {
      rating?: number
      badge?: { name?: string } | null
    } | null
  }
  errors?: { message: string }[]
}

function countByDifficulty(
  submissions: SubmissionCount[],
  difficulty: string,
): number {
  return submissions.find((s) => s.difficulty === difficulty)?.count ?? 0
}

export async function fetchLeetCodeStats(): Promise<LeetCodeLiveStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ojhaprathmesh-portfolio/1.0)",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: { username: CODING_USERNAME },
      }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null

    const json = (await res.json()) as LeetCodeGraphQLResponse
    if (json.errors?.length || !json.data?.matchedUser) return null

    const submissions =
      json.data.matchedUser.submitStats?.acSubmissionNum ?? []
    const contest = json.data.userContestRanking

    return {
      username: CODING_USERNAME,
      url: LEETCODE_URL,
      totalSolved: countByDifficulty(submissions, "All"),
      easy: countByDifficulty(submissions, "Easy"),
      medium: countByDifficulty(submissions, "Medium"),
      hard: countByDifficulty(submissions, "Hard"),
      ranking: json.data.matchedUser.profile?.ranking ?? null,
      contestRating: contest?.rating ?? null,
      contestBadge: contest?.badge?.name ?? null,
      fetchedAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}
