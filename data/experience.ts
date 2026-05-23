// filepath: data/experience.ts
import type { ExperienceItem } from "@/types"

export const experience: ExperienceItem[] = [
  {
    id: "getting-roots-intern",
    role: "App Development Intern",
    company: "Getting Roots",
    period: "Jun 2025 – Jul 2025",
    type: "internship",
    location: "Gurugram, Haryana",
    description: [
      "Developed a cross-platform Flutter application (iOS & Android) implementing Clean Architecture with domain, data, and presentation layers using Provider state management.",
      "Designed remote/local data flow with API integration, local caching fallback, and dependency injection (GetIt), modularizing 8+ feature workflows including blogs, services, and contact.",
      "Built modular feature implementations with structured separation of concerns across the presentation and data layers.",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Provider", "GetIt", "Git"],
    highlight: "Cross-platform mobile app shipped",
  },
  {
    id: "acm-tech-team",
    role: "Technical Team Member",
    company: "67th Milestone & Glitch 2025 (ACM)",
    period: "2024 – 2025",
    type: "volunteer",
    location: "Gurugram, Haryana",
    description: [
      "Contributed to developing and deploying official event websites for university technical festivals.",
      "Collaborated with cross-functional teams on frontend implementation, improving user engagement and accessibility for event participants.",
      "Worked across React-based stacks with modern CSS tooling for responsive, production-ready event portals.",
    ],
    technologies: ["ReactJS", "JavaScript", "TailwindCSS", "Git", "GitHub"],
    highlight: "Event websites deployed",
  },
]
