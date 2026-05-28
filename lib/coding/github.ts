import {
  buildContributionGrid,
  computeStreaks,
  type ContributionDay,
  flattenContributionWeeks,
} from "./contributions";
import { type GitHubLiveStats, type LanguageStat, USERNAME } from "./types";

const GITHUB_USER_URL = `https://github.com/${USERNAME}`;

interface GitHubUserResponse {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  created_at: string;
}

interface RepoResponse {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// Dynamic contribution query for fetching a specific year's date range
const YEARLY_CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

// Current contribution query for the rolling last 12 months heatmap
const CURRENT_CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export interface GraphQLCalendarDay {
  date: string;
  contributionCount: number;
}

export interface GraphQLCalendarWeek {
  contributionDays: GraphQLCalendarDay[];
}

export interface GraphQLCalendar {
  totalContributions: number;
  weeks: GraphQLCalendarWeek[];
}

/**
 * Returns an array of years from startYear to endYear inclusive.
 */
export function getYearRange(startYear: number, endYear: number): number[] {
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }
  return years;
}

/**
 * Formats standard ISO strings for the start and end of a given calendar year.
 */
export function buildYearDateRange(year: number): { from: string; to: string } {
  return {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  };
}

/**
 * Flattens the nested weeks/contributionDays GraphQL structure into a flat array.
 */
export function flattenCalendarWeeks(
  calendar: GraphQLCalendar,
): ContributionDay[] {
  const days: ContributionDay[] = [];
  if (calendar.weeks) {
    for (const week of calendar.weeks) {
      if (week.contributionDays) {
        for (const day of week.contributionDays) {
          days.push({
            date: day.date,
            contributionCount: day.contributionCount,
          });
        }
      }
    }
  }
  return days;
}

/**
 * Deduplicates contribution days by their date to handle overlaps at year boundaries.
 */
export function dedupeContributionDays(
  days: ContributionDay[],
): ContributionDay[] {
  const seen = new Set<string>();
  return days.filter((day) => {
    if (seen.has(day.date)) {
      return false;
    }
    seen.add(day.date);
    return true;
  });
}

/**
 * Fetches the GitHub contribution calendar for a specific calendar year.
 */
export async function fetchContributionCalendarForYear(
  year: number,
): Promise<GraphQLCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const { from, to } = buildYearDateRange(year);

  try {
    const headers = new Headers(githubHeaders());
    headers.set("Content-Type", "application/json");
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: YEARLY_CONTRIBUTIONS_QUERY,
        variables: { login: USERNAME, from, to },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: GraphQLCalendar;
          };
        };
      };
    };
    return (
      json?.data?.user?.contributionsCollection?.contributionCalendar ?? null
    );
  } catch {
    return null;
  }
}

/**
 * Fetches the rolling 12-month contribution calendar.
 */
export async function fetchCurrentContributionCalendar(): Promise<GraphQLCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const headers = new Headers(githubHeaders());
    headers.set("Content-Type", "application/json");
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: CURRENT_CONTRIBUTIONS_QUERY,
        variables: { login: USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: GraphQLCalendar;
          };
        };
      };
    };
    return (
      json?.data?.user?.contributionsCollection?.contributionCalendar ?? null
    );
  } catch {
    return null;
  }
}

async function fetchReposMeta(): Promise<{
  stars: number;
  languages: LanguageStat[];
}> {
  const langCounts: Record<string, number> = {};
  let stars = 0;
  let page = 1;
  const perPage = 100;

  try {
    while (page <= 5) {
      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        { headers: githubHeaders(), next: { revalidate: 3600 } },
      );
      if (!res.ok) break;

      const repos = (await res.json()) as RepoResponse[];
      if (!Array.isArray(repos) || repos.length === 0) break;

      for (const repo of repos) {
        if (repo.fork) continue;
        stars += repo.stargazers_count ?? 0;
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] ?? 0) + 1;
        }
      }

      if (repos.length < perPage) break;
      page++;
    }

    const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const languages: LanguageStat[] = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return { stars, languages };
  } catch {
    return { stars: 0, languages: [] };
  }
}

function sumGridContributions(weeks: ContributionDay[][]): number {
  const grid = buildContributionGrid(weeks);
  let sum = 0;
  for (const col of grid) {
    for (const day of col) {
      sum += day.contributionCount;
    }
  }
  return sum;
}

function gridFlattenedDays(weeks: ContributionDay[][]): ContributionDay[] {
  const grid = buildContributionGrid(weeks);
  const days: ContributionDay[] = [];
  for (const col of grid) {
    for (const day of col) {
      days.push(day);
    }
  }
  return days;
}

export async function fetchGitHubStats(): Promise<GitHubLiveStats | null> {
  try {
    // 1. Fetch user REST data first to retrieve created_at for dynamic start year calculation.
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) return null;

    const user = (await userRes.json()) as GitHubUserResponse;

    // 2. Fetch the current rolling contribution calendar and repository metadata in parallel.
    const [currentCalendar, reposMeta] = await Promise.all([
      fetchCurrentContributionCalendar(),
      fetchReposMeta(),
    ]);

    // Map GraphQL contributionDays array structure to ContributionDay[][] for the heatmap
    const weeks: ContributionDay[][] =
      currentCalendar?.weeks?.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          contributionCount: d.contributionCount,
        })),
      ) ?? [];

    // 3. Dynamically determine the year range from account creation year to the current UTC year.
    // This is future-proof and handles 2027, 2028, etc., automatically without updates.
    const startYear = user.created_at
      ? new Date(user.created_at).getUTCFullYear()
      : 2020; // Safe minimum fallback if created_at is unavailable
    const endYear = new Date().getUTCFullYear();
    const yearsRange = getYearRange(startYear, endYear);

    // 4. Fetch yearly contribution calendars in parallel.
    // If one year fails, it returns null and is skipped gracefully.
    const yearlyCalendars = await Promise.all(
      yearsRange.map((year) => fetchContributionCalendarForYear(year)),
    );

    // 5. Merge all-time contribution days across all successfully fetched years
    let allDaysForStreak: ContributionDay[] = [];
    for (const calendar of yearlyCalendars) {
      if (calendar) {
        allDaysForStreak.push(...flattenCalendarWeeks(calendar));
      }
    }

    // 6. Deduplicate contribution days by date (to handle overlap at year boundaries)
    allDaysForStreak = dedupeContributionDays(allDaysForStreak);

    // 7. Sort all contribution days ascending by date to ensure streak counts are computed chronologically
    allDaysForStreak.sort((a, b) => a.date.localeCompare(b.date));

    // 8. Compute streaks from sorted/deduplicated all-time days
    const gridDays = weeks.length > 0 ? gridFlattenedDays(weeks) : [];
    const daysForStreak =
      allDaysForStreak.length > 0
        ? allDaysForStreak
        : gridDays.length > 0
          ? gridDays
          : flattenContributionWeeks(weeks);

    const streak = computeStreaks(daysForStreak);

    const apiTotal = currentCalendar?.totalContributions;
    const gridSum = weeks.length > 0 ? sumGridContributions(weeks) : null;
    const totalContributions =
      apiTotal ?? (gridSum !== null && gridSum > 0 ? gridSum : null);

    return {
      username: user.login ?? USERNAME,
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
    };
  } catch {
    return null;
  }
}
