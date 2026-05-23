// filepath: data/index.ts
// ─── Data Layer — Central Export ─────────────────────────────────────────────

// Profile & Identity
export { personalInfo,profile } from "./profile"

// Navigation
export { navItems, navLinks } from "./navigation"

// Social Links
export { contactLinks,heroSocialLinks, socialLinks } from "./socials"

// Site Metadata
export { siteMetadata } from "./site"

// Projects
export { featuredProjects,projects } from "./projects"

// Experience
export { experience } from "./experience"

// Skills
export { conceptMarqueeItems,skillGroups, skills, techMarqueeItems } from "./skills"

// Achievements
export { achievements } from "./achievements"

// Coding platform handles (live stats via /api/coding-stats)
export { codingConfig } from "./coding"
