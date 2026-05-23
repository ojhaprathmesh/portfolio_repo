// filepath: data/skills.ts
import type { SkillGroup } from "@/types"

export const skillGroups: SkillGroup[] = [
  {
    category: "languages",
    label: "Programming Languages",
    skills: [
      { name: "Python", level: "confident" },
      { name: "JavaScript", level: "confident" },
      { name: "TypeScript", level: "proficient" },
      { name: "Java", level: "proficient" },
      { name: "C++", level: "proficient" },
      { name: "Dart", level: "proficient" },
      { name: "SQL", level: "proficient" },
      { name: "C", level: "learning" },
    ],
  },
  {
    category: "frontend",
    label: "Web & Frontend",
    skills: [
      { name: "Next.js", level: "confident" },
      { name: "ReactJS", level: "confident" },
      { name: "TailwindCSS", level: "confident" },
      { name: "HTML & CSS", level: "confident" },
    ],
  },
  {
    category: "backend",
    label: "Backend & APIs",
    skills: [
      { name: "Node.js", level: "confident" },
      { name: "Express", level: "confident" },
      { name: "Flask", level: "proficient" },
      { name: "RESTful APIs", level: "confident" },
      { name: "Microservices", level: "proficient" },
    ],
  },
  {
    category: "mobile",
    label: "Mobile",
    skills: [
      { name: "Flutter", level: "proficient" },
      { name: "Android SDK", level: "proficient" },
      { name: "Firebase", level: "proficient" },
      { name: "Material Design", level: "proficient" },
    ],
  },
  {
    category: "ai-ml",
    label: "AI / ML & Data Science",
    skills: [
      { name: "PyTorch", level: "proficient" },
      { name: "HuggingFace", level: "proficient" },
      { name: "TensorFlow", level: "proficient" },
      { name: "scikit-learn", level: "proficient" },
      { name: "Pandas & NumPy", level: "confident" },
      { name: "NLP Pipelines", level: "proficient" },
    ],
  },
  {
    category: "databases",
    label: "Databases & Platforms",
    skills: [
      { name: "Firebase", level: "confident" },
      { name: "MongoDB", level: "proficient" },
      { name: "MySQL", level: "proficient" },
    ],
  },
  {
    category: "concepts",
    label: "Concepts",
    skills: [
      { name: "DSA", level: "confident" },
      { name: "OOP", level: "confident" },
      { name: "Clean Architecture", level: "proficient" },
      { name: "MVC", level: "proficient" },
      { name: "Client-Server Architecture", level: "proficient" },
      { name: "Machine Learning Pipelines", level: "proficient" },
    ],
  },
  {
    category: "tools",
    label: "Tools",
    skills: [
      { name: "Git & GitHub", level: "confident" },
      { name: "pnpm", level: "proficient" },
      { name: "Figma", level: "proficient" },
      { name: "Vercel", level: "proficient" },
    ],
  },
]

// ─── Tech Marquee (keep for existing TechMarquee component) ──────────────────
export const techMarqueeItems = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "FLUTTER",
  "NODE.JS",
  "FIREBASE",
  "FLASK",
  "PYTORCH",
  "HUGGINGFACE",
  "EXPRESS",
  "TAILWINDCSS",
]

export const conceptMarqueeItems = [
  "FULL-STACK",
  "AI / ML",
  "MOBILE",
  "FINANCE",
  "NLP",
  "MICROSERVICES",
  "CLEAN ARCHITECTURE",
  "DSA",
  "REST APIs",
  "DATA SCIENCE",
  "PORTFOLIO OPTIMIZATION",
  "SYSTEM DESIGN",
]

// ─── Legacy flat skills array (backward compat) ───────────────────────────────
export const skills = skillGroups.flatMap((g) =>
  g.skills.map((s) => ({ name: s.name, category: g.category as "language" | "framework" | "tool" | "concept" }))
)
