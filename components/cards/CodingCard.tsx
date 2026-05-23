// filepath: components/cards/CodingCard.tsx
"use client"

import { motion } from "framer-motion"
import { ExternalLink, Terminal } from "lucide-react"
import type { CodingProfile } from "@/types"

interface CodingCardProps {
  profile: CodingProfile
}

export function CodingCard({ profile }: CodingCardProps) {
  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 bg-[#0d0d0d] border border-white/[0.04] rounded-sm overflow-hidden hover:border-white/[0.12] transition-all duration-300"
    >
      {/* Decorative platform color glow overlay */}
      <div
        className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-white blur-[80px] opacity-5 group-hover:opacity-12 transition-opacity duration-500"
      />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 select-none">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-white/60" />
            <h3 className="text-base font-light text-white uppercase tracking-wider">
              {profile.platform}
            </h3>
          </div>
          <ExternalLink size={12} className="text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>

        {/* Username */}
        <div className="font-mono text-xs text-white/50 mb-6 bg-white/[0.02] border border-white/[0.04] px-2.5 py-1.5 rounded-sm inline-block">
          @{profile.username}
        </div>
      </div>

      {/* Stats footer */}
      <div className="flex items-end justify-between mt-auto">
        <div>
          {profile.stat && (
            <span className="block font-mono text-2xl font-light text-white tracking-wide">
              {profile.stat}
            </span>
          )}
          {profile.statLabel && (
            <span className="block font-mono text-[9px] tracking-widest uppercase text-white/40">
              {profile.statLabel}
            </span>
          )}
        </div>

        {profile.badge && (
          <span
            className="font-mono text-[8px] tracking-widest uppercase border border-white/10 text-white/60 bg-white/[0.02] px-2 py-0.5 rounded-sm"
          >
            {profile.badge}
          </span>
        )}
      </div>
    </a>
  )
}
