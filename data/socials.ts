// filepath: data/socials.ts
import type { SocialLink } from "@/types"

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@ojhaprathmesh",
    url: "https://github.com/ojhaprathmesh",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "ojhaprathmesh",
    url: "https://linkedin.com/in/ojhaprathmesh",
    icon: "linkedin",
  },
  {
    label: "Twitter",
    handle: "@ojhaprathmesh",
    url: "https://twitter.com/ojhaprathmesh",
    icon: "twitter",
  },
  {
    label: "Email",
    handle: "prathmesh.ojha.23cse@bmu.edu.in",
    url: "mailto:prathmesh.ojha.23cse@bmu.edu.in",
    icon: "mail",
  },
]

/** Social links without email — for hero section display */
export const heroSocialLinks = socialLinks.filter((s) => s.icon !== "mail")

/** Contact links including email — for contact section */
export const contactLinks = socialLinks
