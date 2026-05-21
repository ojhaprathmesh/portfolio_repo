// filepath: data/achievements.ts
import type { Achievement } from "@/types"

export const achievements: Achievement[] = [
  {
    id: "hackathon-1",
    title: "Hackathon Winner — Social Impact Track",
    issuer: "National Hackathon",
    date: "2024",
    type: "hackathon",
    description:
      "Built and shipped Stray Haven in 36 hours during a national-level hackathon. Won first place in the Social Impact track, judged by industry professionals and NGO representatives.",
    metric: "1st",
    metricLabel: "Place",
    badge: "🏆",
  },
  {
    id: "hackathon-2",
    title: "Finalist — FinTech Build Challenge",
    issuer: "College Hackathon Fest",
    date: "2024",
    type: "hackathon",
    description:
      "Reached the final round with Angel Five — a financial analytics prototype — competing against 80+ teams. Recognised for technical depth and real-world applicability by the judges panel.",
    metric: "Top 5",
    metricLabel: "of 80+ teams",
    badge: "🥈",
  },
  {
    id: "academic-1",
    title: "Dean's List Recognition",
    issuer: "University Academic Council",
    date: "2023",
    type: "academic",
    description:
      "Recognised on the Dean's List for academic excellence during the second year of the B.Tech programme, maintaining a strong CGPA while shipping multiple projects.",
    metric: "Top 10%",
    metricLabel: "of cohort",
    badge: "🎓",
  },
  {
    id: "cert-1",
    title: "Machine Learning Specialization",
    issuer: "Coursera — DeepLearning.AI",
    date: "2023",
    type: "certification",
    description:
      "Completed Andrew Ng's Machine Learning Specialization, covering supervised learning, unsupervised learning, and best practices for ML system development.",
    link: "https://coursera.org/verify/placeholder",
    badge: "📜",
  },
  {
    id: "cert-2",
    title: "Meta Front-End Developer Certificate",
    issuer: "Coursera — Meta",
    date: "2023",
    type: "certification",
    description:
      "Completed the Meta Front-End Developer Professional Certificate, covering React, UI/UX design, version control, and web performance optimisation.",
    link: "https://coursera.org/verify/placeholder",
    badge: "📜",
  },
  {
    id: "open-source-1",
    title: "Open Source Contribution",
    issuer: "GitHub",
    date: "2024",
    type: "open-source",
    description:
      "Merged pull requests in open-source repositories, contributing bug fixes and documentation improvements appreciated by the maintainer communities.",
    metric: "PRs Merged",
    metricLabel: "across projects",
    badge: "⭐",
  },
]
