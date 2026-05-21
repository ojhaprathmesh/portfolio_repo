// filepath: components/common/SectionHeading.tsx
"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  number: string
  title: string
  subtitle?: string
}

export function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20 select-none">
      {/* Number and small tag */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#3B82F6] font-medium">
          {number}
        </span>
        <span className="h-px w-8 bg-white/10" />
        <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
          Section Archive
        </span>
      </div>

      {/* Main title */}
      <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="font-mono text-xs tracking-wide text-white/40 max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
