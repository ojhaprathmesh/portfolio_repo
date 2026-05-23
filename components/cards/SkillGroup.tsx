// filepath: components/cards/SkillGroup.tsx
"use client"

import { motion } from "framer-motion"
import type { SkillGroup as SkillGroupType } from "@/types"

interface SkillGroupProps {
  group: SkillGroupType
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="bg-[#0d0d0d] border border-white/[0.04] p-6 rounded-sm flex flex-col h-full hover:border-white/[0.08] transition-colors duration-300">
      {/* Category header */}
      <div className="mb-5 select-none">
        <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase block mb-1">
          {group.category}
        </span>
        <h3 className="text-lg font-light text-white uppercase tracking-wider">
          {group.label}
        </h3>
      </div>

      {/* Skills tags list */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.02] border border-white/[0.04] transition-colors hover:bg-white/[0.04]"
          >
            {/* Status dot representation */}
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor:
                  skill.level === "confident"
                    ? "#FFFFFF"
                    : skill.level === "proficient"
                    ? "#A7A7A7"
                    : "transparent",
                border: skill.level === "learning" ? "1px dashed rgba(255,255,255,0.4)" : "none",
              }}
              title={
                skill.level === "confident"
                  ? "Confident"
                  : skill.level === "proficient"
                  ? "Proficient"
                  : "Currently Learning"
              }
            />
            <span className="font-mono text-xs text-white/70 select-none">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
