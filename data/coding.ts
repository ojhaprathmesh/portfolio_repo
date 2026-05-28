// filepath: data/coding.ts
// Static handles only — live stats are fetched via /api/coding-stats

import { USERNAME } from "@/lib/coding/types";

export const codingConfig = {
  username: USERNAME,
  github: {
    platform: "GitHub",
    username: USERNAME,
    url: `https://github.com/${USERNAME}`,
    color: "#F0F6FC",
  },
  leetcode: {
    platform: "LeetCode",
    username: USERNAME,
    url: `https://leetcode.com/${USERNAME}`,
    color: "#FFA116",
  },
} as const;
