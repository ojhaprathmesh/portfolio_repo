// filepath: components/sections/Achievements.tsx
"use client"

import { AchievementItem } from "@/components/cards/AchievementItem"
import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { achievements } from "@/data"

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-36 bg-[#050505] border-t border-white/2">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="05"
            title="Recognitions & Achievements"
            subtitle="Prizes, hackathon finishes, academic mentions, and technical certifications."
          />
        </AnimatedSection>

        {/* List of items */}
        <div className="flex flex-col gap-6 mt-14 md:mt-20">
          {achievements.map((achievement, idx) => (
            <AnimatedSection key={achievement.id} delay={idx * 0.08}>
              <AchievementItem achievement={achievement} index={idx} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
