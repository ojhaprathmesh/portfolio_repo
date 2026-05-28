// filepath: components/sections/Achievements.tsx
"use client";

import { AchievementItem } from "@/components/cards/AchievementItem";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { achievements } from "@/data";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="bg-background border-t border-white/2 py-24 md:py-36"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="05"
            title="Recognitions & Achievements"
            subtitle="Prizes, hackathon finishes, academic mentions, and technical certifications."
          />
        </AnimatedSection>

        {/* List of items */}
        <div className="mt-14 flex flex-col gap-6 md:mt-20">
          {achievements.map((achievement, idx) => (
            <AnimatedSection key={achievement.id} delay={idx * 0.08}>
              <AchievementItem achievement={achievement} index={idx} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
