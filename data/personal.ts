// filepath: data/personal.ts
// ─── Backward Compatibility Shim ─────────────────────────────────────────────
// All data has moved to data/profile.ts, data/socials.ts, data/navigation.ts, data/site.ts
// This file re-exports from the canonical sources so existing component imports continue to work.

export { navItems, navLinks } from "./navigation"
export { personalInfo, profile } from "./profile"
export { siteMetadata } from "./site"
export { contactLinks,heroSocialLinks, socialLinks } from "./socials"
