// filepath: data/experience.ts
import type { ExperienceItem } from "@/types"

export const experience: ExperienceItem[] = [
  {
    id: "freelance-fullstack",
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jun 2024 – Present",
    type: "freelance",
    location: "Remote",
    description: [
      "Designed and shipped full-stack web applications for small businesses and early-stage startups.",
      "Built custom dashboards, landing pages, and internal tools using Next.js and TypeScript.",
      "Managed client relationships from requirement gathering through deployment and iteration.",
      "Delivered projects on tight timelines while maintaining code quality and performance standards.",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel"],
    highlight: "4 client projects delivered",
  },
  {
    id: "open-source",
    role: "Open Source Contributor",
    company: "GitHub",
    companyUrl: "https://github.com/ojhaprathmesh",
    period: "Jan 2023 – Present",
    type: "volunteer",
    location: "Remote",
    description: [
      "Contributed bug fixes, documentation improvements, and feature additions to open-source repositories.",
      "Engaged with maintainers and community members through issues and pull request discussions.",
      "Built personal tools and libraries shared publicly for the developer community.",
    ],
    technologies: ["Python", "TypeScript", "React", "Node.js"],
    highlight: "Multiple merged PRs",
  },
  {
    id: "college-projects",
    role: "Project Lead",
    company: "University — Academic Projects",
    period: "Aug 2022 – Present",
    type: "project",
    location: "On-Campus",
    description: [
      "Led cross-functional teams of 3–4 students to build and present semester-long engineering projects.",
      "Applied core CS concepts — DBMS, OS, Networks, ML — in hands-on project implementations.",
      "Presented technical solutions to faculty panels and received top evaluation scores.",
      "Mentored junior batch students during project workshops and lab sessions.",
    ],
    technologies: ["Python", "MySQL", "React", "Node.js", "scikit-learn", "Flask"],
    highlight: "Dean's list recognition",
  },
  {
    id: "hackathon-builder",
    role: "Hackathon Participant & Builder",
    company: "Various Hackathons",
    period: "2023 – Present",
    type: "project",
    location: "India",
    description: [
      "Participated in national and college-level hackathons, shipping MVPs within 24–48 hour windows.",
      "Built AI-powered tools, social impact apps, and fintech prototypes under extreme time constraints.",
      "Collaborated with cross-functional teams, handling system design, backend, and frontend tasks.",
      "Received recognition and prizes in competitive events across multiple domains.",
    ],
    technologies: ["React Native", "FastAPI", "Python", "Firebase", "OpenAI API"],
    highlight: "2× podium finishes",
  },
]
