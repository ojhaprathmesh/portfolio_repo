// filepath: components/sections/Skills.tsx
"use client"

import { SkillGroup } from "@/components/cards/SkillGroup"
import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { skillGroups } from "@/data"

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="04"
            title="Technical Toolkit"
            subtitle="My stack is categorized by comfort and specialization. Honest levels, zero progress bars."
          />
        </AnimatedSection>

        {/* Legend block */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap items-center gap-6 mb-12 border border-white/[0.04] p-4 bg-[#0d0d0d]/40 rounded-sm w-fit font-mono text-[9px] tracking-widest uppercase">
            <span className="text-white/40 select-none">Legend //</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
              <span className="text-white/60">Confident / Primary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A7A7A7]" />
              <span className="text-white/60">Proficient / Secondary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full border border-dashed border-white/45" />
              <span className="text-white/60">Exploring / Learning</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => (
            <AnimatedSection key={group.category} delay={0.15 + idx * 0.05}>
              <SkillGroup group={group} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
