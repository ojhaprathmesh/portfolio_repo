"use client";

import { ExternalLink, Github, Linkedin } from "lucide-react";

import { LeetCodeBrandIcon } from "@/components/icons/LeetCodeBrandIcon";
import { codingConfig } from "@/data/coding";
import { socialLinks } from "@/data/socials";

const linkClass =
  "group flex items-center gap-2.5 px-4 py-2.5 bg-elevated border border-white/[0.06] rounded-sm font-mono text-[10px] tracking-wider text-white/50 transition-all duration-300";

const platforms = [
  {
    label: "GitHub",
    href: codingConfig.github.url,
    icon: (
      <Github
        size={14}
        className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
      />
    ),
    accent: "hover:border-white/20 hover:text-white",
  },
  {
    label: "LinkedIn",
    href: socialLinks.find((s) => s.icon === "linkedin")?.url ?? "#",
    icon: (
      <Linkedin
        size={14}
        className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
      />
    ),
    accent: "hover:border-sky-500/30 hover:text-sky-300/90",
  },
  {
    label: "LeetCode",
    href: codingConfig.leetcode.url,
    icon: (
      <LeetCodeBrandIcon
        size="sm"
        className="shrink-0 text-white/50 opacity-80 transition-all group-hover:text-white group-hover:opacity-100"
      />
    ),
    accent: "hover:border-white/20 hover:text-white",
  },
] as const;

export function ConnectStrip() {
  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map(({ label, href, icon, accent }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} ${accent}`}
        >
          {icon}
          <span className="flex-1">{label}</span>
          <ExternalLink
            size={10}
            className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
            aria-hidden
          />
        </a>
      ))}
      <span className="bg-elevated flex items-center gap-2 rounded-sm border border-white/4 px-4 py-2.5 font-mono text-[10px] tracking-wider text-white/35">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500/60" />
        @{codingConfig.username}
      </span>
    </div>
  );
}
