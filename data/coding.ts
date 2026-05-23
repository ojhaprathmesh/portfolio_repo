// filepath: data/coding.ts
// Static handles only — live stats are fetched via /api/coding-stats

import { CODING_USERNAME } from "@/lib/coding/types"

export const codingConfig = {
  username: CODING_USERNAME,
  github: {
    platform: "GitHub",
    username: CODING_USERNAME,
    url: `https://github.com/${CODING_USERNAME}`,
    color: "#F0F6FC",
  },
  leetcode: {
    platform: "LeetCode",
    username: CODING_USERNAME,
    url: `https://leetcode.com/${CODING_USERNAME}`,
    color: "#FFA116",
  },
} as const
