// filepath: components/sections/Projects.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { projects } from "@/data";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Project, ProjectCategory } from "@/types";

// Categories mapped directly to their focus points in the 3D scroll sequence
const CATEGORIES: {
  label: string;
  value: ProjectCategory | "all";
  progress: number;
}[] = [
  { label: "All Works", value: "all", progress: 0 },
  { label: "FinTech", value: "finance", progress: 0 },
  { label: "Mobile Apps", value: "mobile", progress: 0.5 },
  { label: "AI/ML Systems", value: "ai-ml", progress: 1.0 },
];

function ProjectCylinderCard({
  project,
  index,
  scrollYProgress,
  total,
}: {
  project: Project;
  index: number;
  scrollYProgress: any;
  total: number;
}) {
  const isMobile = useIsMobile();

  // Calculate relative progress for each card
  // relativeProgress goes from negative (right side) to 0 (focused center) to positive (left side)
  const relativeProgress = useTransform(scrollYProgress, (val: number) => {
    return val * (total - 1) - index;
  });

  // 3D transitions mapping relative progress to layout coordinates
  const x = useTransform(
    relativeProgress,
    [-1.5, -1, 0, 1, 1.5],
    isMobile
      ? ["-120vw", "-75vw", "0vw", "75vw", "120vw"]
      : ["-100vw", "-45vw", "0vw", "45vw", "100vw"],
  );

  // Concave cylinder rotation: left tilts right (positive), right tilts left (negative)
  const rotateY = useTransform(relativeProgress, [-1, 0, 1], [35, 0, -35]);

  // Depth translation: pushed back on sides, close in focus
  const z = useTransform(relativeProgress, [-1, 0, 1], [-250, 0, -250]);

  // Scale down towards the horizon
  const scale = useTransform(relativeProgress, [-1, 0, 1], [0.8, 1, 0.8]);

  // Smooth opacity fading
  const opacity = useTransform(
    relativeProgress,
    [-1.5, -1, 0, 1, 1.5],
    [0, 0.65, 1, 0.65, 0],
  );

  // Allow interaction only on the active card to prevent overlay click hijacking
  const pointerEvents = useTransform(relativeProgress, (val: number) => {
    return Math.abs(val) < 0.4 ? "auto" : "none";
  });

  return (
    <motion.div
      style={{
        x,
        rotateY,
        z,
        scale,
        opacity,
        pointerEvents: pointerEvents as any,
        transformStyle: "preserve-3d",
      }}
      className="absolute flex h-auto w-[85vw] max-w-105 flex-col justify-center select-none"
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
    "all",
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (val) => {
      if (val < 0.25) {
        setActiveCategory("finance");
      } else if (val >= 0.25 && val < 0.75) {
        setActiveCategory("mobile");
      } else {
        setActiveCategory("ai-ml");
      }
    });
  }, [scrollYProgress]);

  // Scroll window to focus on target card in the cylinder sequence
  const scrollToProgress = (progress: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionStart = rect.top + scrollTop;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrollDistance = sectionHeight - viewportHeight;

    window.scrollTo({
      top: sectionStart + progress * scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="bg-background relative h-[250vh] border-t border-white/2"
    >
      {/* Sticky Fullscreen viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-12 md:py-16">
        {/* Title Header */}
        <div className="relative z-20 mx-auto w-full max-w-6xl px-6 md:px-12">
          <AnimatedSection>
            <SectionHeading
              number="03"
              title="Selected Projects"
              subtitle="Explore high-contrast systems, native mobile apps, and machine learning architectures I've built."
            />
          </AnimatedSection>

          {/* Category Filters */}
          <AnimatedSection delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-white/3 pb-4 md:gap-4">
              {CATEGORIES.map((cat) => {
                const isActive =
                  activeCategory === cat.value ||
                  (cat.value === "all" && activeCategory === "all");
                return (
                  <button
                    key={cat.label}
                    onClick={() => {
                      if (cat.value === "all") {
                        scrollToProgress(0);
                        setActiveCategory("all");
                      } else {
                        scrollToProgress(cat.progress);
                      }
                    }}
                    className={`relative px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 select-none ${
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span className="relative z-10">{cat.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeCategoryIndicator"
                        className="absolute right-0 bottom-0 left-0 h-px bg-white"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* 3D Cylindrical Cylinder Viewport */}
        <div
          className="relative flex w-full flex-1 items-center justify-center"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          {projects.map((project, idx) => (
            <ProjectCylinderCard
              key={project.id}
              project={project}
              index={idx}
              scrollYProgress={scrollYProgress}
              total={projects.length}
            />
          ))}
        </div>

        {/* Dynamic scroll indicator spacer */}
        <div className="pointer-events-none h-6 w-full select-none md:h-12" />
      </div>
    </section>
  );
}
