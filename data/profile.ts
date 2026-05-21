// filepath: data/profile.ts
import type { ProfileInfo } from "@/types"

export const profile: ProfileInfo = {
  name: "Prathmesh Ojha",
  initials: "PO",
  title: "B.Tech CSE — Data Science & AI",
  headline: "Build. Ship. Improve. Repeat.",
  subline: "Prathmesh Ojha · Full-Stack · AI/ML · Mobile · Finance",
  tagline: "Engineering products at the intersection of code, data, and design.",
  email: "prathmesh.ojha.23cse@bmu.edu.in",
  location: "India",
  timezone: "IST (UTC+5:30)",
  shortBio:
    "I'm a Computer Science undergraduate specialising in Data Science & AI — building full-stack products, mobile apps, AI-backed tools, and financial analytics projects. I ship fast, iterate often, and care deeply about the craft.",
  bio: [
    "B.Tech CSE undergraduate focused on Data Science & Artificial Intelligence.",
    "I build full-stack web applications, cross-platform mobile apps, and AI-powered tools.",
    "Currently exploring financial analytics, LLM integration, and product engineering.",
    "Every project is a chance to learn something new and ship something real.",
  ],
  education: {
    institution: "Your University Name",
    degree: "B.Tech — Computer Science & Engineering (Data Science & AI)",
    period: "2022 – 2026",
    focus: "Data Science, Artificial Intelligence, Full-Stack Development",
    details:
      "Core coursework: Machine Learning, Deep Learning, Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks",
  },
  availability: "OPEN TO OPPORTUNITIES",
  availabilityStatus: "available",
  resumePath: "/resume/Prathmesh_Ojha_Resume.pdf",
}

// ─── Backward compat re-export ────────────────────────────────────────────────
/** @deprecated Import `profile` from data/profile instead */
export const personalInfo = {
  name: profile.name,
  title: profile.title,
  headline: profile.headline,
  tagline: profile.tagline,
  email: profile.email,
  location: profile.location,
  timezone: profile.timezone,
  bio: profile.bio,
  availability: profile.availability,
}
