// filepath: components/about.tsx
"use client"

import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { profile } from "@/data"

export function About() {
  return (
    <section id="about" className="min-h-full py-16 md:py-20 pb-28 md:pb-32 bg-[#050505] relative">
      {/* Visual glowing accent in the background */}
      <div className="absolute right-[10%] top-[20%] w-72 h-72 rounded-full bg-white/2 blur-[120px] pointer-events-none select-none" />
      <div className="absolute left-[5%] bottom-[10%] w-60 h-60 rounded-full bg-white/1.5 blur-[100px] pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatedSection direction="horizontal" once={false}>
          <SectionHeading
            number="01"
            title="About Me"
            subtitle="Philosophy, background, and alignment at the intersection of development and AI."
          />
        </AnimatedSection>

        {/* Minimalist Centered Biography Layout */}
        <div className="space-y-6 md:space-y-8 mt-12 md:mt-16 max-w-3xl">
          <AnimatedSection direction="horizontal" once={false} delay={0.1}>
            <h3 className="text-xl md:text-2xl font-light text-white leading-relaxed">
              {profile.tagline}
            </h3>
          </AnimatedSection>

          <AnimatedSection direction="horizontal" once={false} delay={0.15}>
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
              {profile.shortBio}
            </p>
          </AnimatedSection>

          <AnimatedSection direction="horizontal" once={false} delay={0.2}>
            <div className="space-y-4 border-l border-white/6 pl-6 py-1">
              {profile.bio.map((paragraph, idx) => (
                <p key={idx} className="text-white/50 text-xs md:text-sm font-sans leading-relaxed max-w-xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
