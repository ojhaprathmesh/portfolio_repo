// filepath: components/about.tsx
"use client";

import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { profile } from "@/data";

export function About() {
  return (
    <section
      id="about"
      className="bg-background relative min-h-full py-16 pb-28 md:py-20 md:pb-32"
    >
      {/* Visual glowing accent in the background */}
      <div className="pointer-events-none absolute top-[20%] right-[10%] h-72 w-72 rounded-full bg-white/2 blur-[120px] select-none" />
      <div className="pointer-events-none absolute bottom-[10%] left-[5%] h-60 w-60 rounded-full bg-white/1.5 blur-[100px] select-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">
        <AnimatedSection direction="horizontal" once={false}>
          <SectionHeading
            number="01"
            title="About Me"
            subtitle="Philosophy, background, and alignment at the intersection of development and AI."
          />
        </AnimatedSection>

        {/* Minimalist Centered Biography Layout */}
        <div className="mt-12 max-w-3xl space-y-6 md:mt-16 md:space-y-8">
          <AnimatedSection direction="horizontal" once={false} delay={0.1}>
            <h3 className="text-xl leading-relaxed font-light text-white md:text-2xl">
              {profile.tagline}
            </h3>
          </AnimatedSection>

          <AnimatedSection direction="horizontal" once={false} delay={0.15}>
            <p className="max-w-2xl font-sans text-sm leading-relaxed text-white/60 md:text-base">
              {profile.shortBio}
            </p>
          </AnimatedSection>

          <AnimatedSection direction="horizontal" once={false} delay={0.2}>
            <div className="space-y-4 border-l border-white/6 py-1 pl-6">
              {profile.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="max-w-xl font-sans text-xs leading-relaxed text-white/50 md:text-sm"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
