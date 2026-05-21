// filepath: components/sections/Projects.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { projects } from "@/data"
import type { ProjectCategory } from "@/types"

const CATEGORIES: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All Works", value: "all" },
  { label: "AI/ML Systems", value: "ai-ml" },
  { label: "FinTech", value: "finance" },
  { label: "Mobile Apps", value: "mobile" },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all")

  const filteredProjects = projects.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  )

  return (
    <section id="projects" className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <AnimatedSection>
          <SectionHeading
            number="03"
            title="Selected Projects"
            subtitle="Explore high-contrast systems, native mobile apps, and machine learning architectures I've built."
          />
        </AnimatedSection>

        {/* Category Filters */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-12 border-b border-white/[0.03] pb-6">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase select-none transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span className="relative z-10">{cat.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#00E5FF]"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
