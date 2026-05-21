// filepath: components/sections/Experience.tsx
"use client"

import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { TimelineItem } from "@/components/cards/TimelineItem"
import { experience } from "@/data"

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionHeading
            number="02"
            title="Professional Experience"
            subtitle="My journey through freelance projects, open-source work, and academic building."
          />
        </AnimatedSection>

        <div className="mt-14 md:mt-20">
          {experience.map((item, idx) => (
            <AnimatedSection key={item.id} delay={idx * 0.1}>
              <TimelineItem item={item} index={idx} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
