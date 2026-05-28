// filepath: components/cards/ProjectCard.tsx
"use client"

import { motion } from "framer-motion"
import { ArrowUpRight,ExternalLink } from "lucide-react"
import Image from "next/image"

import { GithubIcon } from "@/components/icons/lucide-github"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-[#0d0d0d] border border-white/4 hover:border-white/12 rounded-sm overflow-hidden transition-colors duration-500"
    >
      {/* Visual Header / Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-transparent" />
        
        {/* Status indicator tag */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/6">
          <span
            className="w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor:
                project.status === "shipped"
                  ? "#FFFFFF"
                  : project.status === "in-progress"
                  ? "#A7A7A7"
                  : "#5F5F5F",
            }}
          />
          <span className="font-mono text-[9px] tracking-wider uppercase text-white/70">
            {project.status}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between gap-4 mb-3 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-light text-white mb-3 transition-colors duration-300 flex items-center justify-between">
          <span>{project.title}</span>
          <ArrowUpRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </h3>

        {/* Description */}
        <p className="text-white/60 text-xs leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div className="mt-auto pt-4 border-t border-white/4">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] tracking-wider text-white/50 bg-white/3 px-2 py-0.5 rounded-sm border border-white/2"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="font-mono text-[9px] tracking-wider text-white/30 px-1 py-0.5">
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
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
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
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
              >
                <ExternalLink size={12} strokeWidth={1.5} />
                <span>Launch</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
