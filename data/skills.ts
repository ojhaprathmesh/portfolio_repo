// filepath: data/skills.ts
import type { SkillGroup } from "@/types"

export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", level: "confident" },
      { name: "Next.js", level: "confident" },
      { name: "TypeScript", level: "confident" },
      { name: "Tailwind CSS", level: "confident" },
      { name: "Framer Motion", level: "proficient" },
      { name: "Three.js / R3F", level: "proficient" },
      { name: "HTML & CSS", level: "confident" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", level: "confident" },
      { name: "Express", level: "confident" },
      { name: "FastAPI", level: "proficient" },
      { name: "Flask", level: "proficient" },
      { name: "REST APIs", level: "confident" },
      { name: "WebSockets", level: "proficient" },
    ],
  },
  {
    category: "mobile",
    label: "Mobile",
    skills: [
      { name: "React Native", level: "proficient" },
      { name: "Expo", level: "proficient" },
      { name: "Firebase", level: "proficient" },
    ],
  },
  {
    category: "ai-ml",
    label: "AI / ML",
    skills: [
      { name: "Python", level: "confident" },
      { name: "scikit-learn", level: "proficient" },
      { name: "Pandas & NumPy", level: "confident" },
      { name: "TensorFlow", level: "learning" },
      { name: "LangChain", level: "learning" },
      { name: "OpenAI API", level: "proficient" },
      { name: "Jupyter", level: "confident" },
    ],
  },
  {
    category: "databases",
    label: "Databases",
    skills: [
      { name: "PostgreSQL", level: "confident" },
      { name: "MongoDB", level: "proficient" },
      { name: "MySQL", level: "confident" },
      { name: "Redis", level: "proficient" },
      { name: "Supabase", level: "proficient" },
    ],
  },
  {
    category: "tools",
    label: "Tools & Infra",
    skills: [
      { name: "Git & GitHub", level: "confident" },
      { name: "Docker", level: "proficient" },
      { name: "Vercel", level: "confident" },
      { name: "Linux / CLI", level: "proficient" },
      { name: "Postman", level: "confident" },
      { name: "Figma", level: "proficient" },
    ],
  },
  {
    category: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", level: "confident" },
      { name: "JavaScript", level: "confident" },
      { name: "Python", level: "confident" },
      { name: "Java", level: "proficient" },
      { name: "C / C++", level: "proficient" },
      { name: "SQL", level: "confident" },
    ],
  },
]

// ─── Tech Marquee (keep for existing TechMarquee component) ──────────────────
export const techMarqueeItems = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "NODE.JS",
  "REACT NATIVE",
  "POSTGRESQL",
  "FASTAPI",
  "REDIS",
  "DOCKER",
  "VERCEL",
  "SCIKIT-LEARN",
]

export const conceptMarqueeItems = [
  "FULL-STACK",
  "AI / ML",
  "MOBILE",
  "FINANCE",
  "PRODUCT",
  "SYSTEMS",
  "INTERFACES",
  "ALGORITHMS",
  "SCALABILITY",
  "PERFORMANCE",
  "AUTOMATION",
  "INNOVATION",
]

// ─── Legacy flat skills array (backward compat) ───────────────────────────────
export const skills = skillGroups.flatMap((g) =>
  g.skills.map((s) => ({ name: s.name, category: g.category as "language" | "framework" | "tool" | "concept" }))
)
