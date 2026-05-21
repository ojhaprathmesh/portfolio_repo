// filepath: components/sections/CodingProfiles.tsx
"use client"

import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { CodingCard } from "@/components/cards/CodingCard"
import { codingProfiles } from "@/data"

export default function CodingProfiles() {
  return (
    <section id="coding" className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="06"
            title="Coding Profiles"
            subtitle="Platform presence and problem-solving stats where I build and practice."
          />
        </AnimatedSection>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 md:mt-20 max-w-3xl">
          {codingProfiles.map((profile, idx) => (
            <AnimatedSection key={profile.platform} delay={idx * 0.1}>
              <CodingCard profile={profile} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
