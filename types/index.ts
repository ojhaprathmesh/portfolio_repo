// filepath: types/index.ts
// ─── Portfolio TypeScript Interfaces ─────────────────────────────────────────

// ─── Profile & Identity ───────────────────────────────────────────────────────

export interface ProfileInfo {
  name: string
  initials: string
  title: string
  headline: string
  subline: string
  tagline: string
  email: string
  location: string
  timezone: string
  bio: string[]
  shortBio: string
  education: Education
  availability: string
  availabilityStatus: "available" | "busy" | "open"
  resumePath: string
}

export interface Education {
  institution: string
  degree: string
  period: string
  gpa?: string
  focus: string
  details?: string
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  index: string
}

// ─── Social & Coding Links ────────────────────────────────────────────────────

export interface SocialLink {
  label: string
  url: string
  handle?: string
  icon?: string
}


// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "full-stack"
  | "mobile"
  | "ai-ml"
  | "finance"
  | "open-source"

export interface Project {
  id: string
  title: string
  date: string
  description: string
  longDescription: string
  stack: string[]
  highlights: string[]
  github?: string
  demo?: string
  image: string
  category: ProjectCategory
  featured: boolean
  status: "shipped" | "in-progress" | "archived"
}

// ─── Experience ───────────────────────────────────────────────────────────────

export type ExperienceType = "internship" | "freelance" | "project" | "volunteer" | "education"

export interface ExperienceItem {
  id: string
  role: string
  company: string
  companyUrl?: string
  period: string
  type: ExperienceType
  location: string
  description: string[]
  technologies: string[]
  highlight?: string
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillLevel = "learning" | "proficient" | "confident"

export interface Skill {
  name: string
  level?: SkillLevel
}

export interface SkillGroup {
  category: string
  label: string
  icon?: string
  skills: Skill[]
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export type AchievementType = "hackathon" | "academic" | "certification" | "recognition" | "open-source"

export interface Achievement {
  id: string
  title: string
  issuer: string
  date: string
  type: AchievementType
  description: string
  metric?: string
  metricLabel?: string
  link?: string
  badge?: string
}

// ─── Site Metadata ────────────────────────────────────────────────────────────

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  ogImage: string
  keywords: string[]
  twitterHandle?: string
}


