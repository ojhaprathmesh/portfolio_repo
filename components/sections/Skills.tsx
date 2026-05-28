// filepath: components/sections/Skills.tsx
"use client";

import { SkillGroup } from "@/components/cards/SkillGroup";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { skillGroups } from "@/data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-background border-t border-white/2 py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
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
          <div className="bg-elevated/40 mb-12 flex w-fit flex-wrap items-center gap-6 rounded-sm border border-white/4 p-4 font-mono text-[9px] tracking-widest uppercase">
            <span className="text-white/40 select-none">Legend //</span>
            <div className="flex items-center gap-1.5">
              <span className="bg-primary h-1.5 w-1.5 rounded-full" />
              <span className="text-white/60">Confident / Primary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-muted-foreground h-1.5 w-1.5 rounded-full" />
              <span className="text-white/60">Proficient / Secondary</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full border border-dashed border-white/45" />
              <span className="text-white/60">Exploring / Learning</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <AnimatedSection key={group.category} delay={0.15 + idx * 0.05}>
              <SkillGroup group={group} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
