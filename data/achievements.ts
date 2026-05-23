// filepath: data/achievements.ts
import type { Achievement } from "@/types"

export const achievements: Achievement[] = [
  {
    id: "iitg-data-science",
    title: "Credit-Linked Program in Data Science",
    issuer: "Daksh Gurukul, IIT Guwahati",
    date: "Ongoing",
    type: "certification",
    description:
      "Enrolled in the Credit-Linked Program in Data Science, building advanced foundations in data science and machine learning through IIT Guwahati's Daksh Gurukul initiative.",
    badge: "📜",
  },
  {
    id: "beat-it-rank",
    title: "2nd Place — University Project Evaluation",
    issuer: "BML Munjal University",
    date: "2024 – 2025",
    type: "academic",
    description:
      "Developed Beat.it, a full-stack music streaming platform, which ranked 2nd in university project evaluation for technical depth and implementation quality.",
    metric: "2nd",
    metricLabel: "Place",
    badge: "🥈",
  },
  {
    id: "acm-tech-events",
    title: "Technical Team Member — 67th Milestone & Glitch 2025",
    issuer: "ACM — BML Munjal University",
    date: "2024 – 2025",
    type: "recognition",
    description:
      "Contributed to event website development and deployment as part of the technical team for 67th Milestone and Glitch 2025, enhancing user engagement and accessibility for participants.",
    badge: "⚡",
  },
]
