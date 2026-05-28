// filepath: components/cards/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

import { GithubIcon } from "@/components/icons/lucide-github";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-elevated relative flex h-full flex-col overflow-hidden rounded-sm border border-white/4 transition-colors duration-500 hover:border-white/12"
    >
      {/* Visual Header / Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-60 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 group-hover:opacity-90"
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="from-elevated absolute inset-0 bg-linear-to-t via-transparent to-transparent" />

        {/* Status indicator tag */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/6 bg-black/60 px-2.5 py-1 backdrop-blur-md">
          <span
            className="h-1 w-1 animate-pulse rounded-full"
            style={{
              backgroundColor:
                project.status === "shipped"
                  ? "var(--primary)"
                  : project.status === "in-progress"
                    ? "var(--muted-foreground)"
                    : "var(--dim)",
            }}
          />
          <span className="font-mono text-[9px] tracking-wider text-white/70 uppercase">
            {project.status}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category & Date */}
        <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>

        {/* Title */}
        <h3 className="mb-3 flex items-center justify-between text-xl font-light text-white transition-colors duration-300">
          <span>{project.title}</span>
          <ArrowUpRight
            size={16}
            className="text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          />
        </h3>

        {/* Description */}
        <p className="mb-6 font-sans text-xs leading-relaxed text-white/60">
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div className="mt-auto border-t border-white/4 pt-4">
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-sm border border-white/2 bg-white/3 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/50"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="px-1 py-0.5 font-mono text-[9px] tracking-wider text-white/30">
                +{project.stack.length - 5} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-white"
              >
                <GithubIcon size={12} strokeWidth={1.5} />
                <span>Source</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase transition-colors hover:text-white"
              >
                <ExternalLink size={12} strokeWidth={1.5} />
                <span>Launch</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
