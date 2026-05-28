// filepath: components/cards/TimelineItem.tsx
"use client";

import { ExternalLink } from "lucide-react";

import type { ExperienceItem } from "@/types";

interface TimelineItemProps {
  item: ExperienceItem;
}

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <div className="relative border-l border-white/6 pb-12 pl-8 last:pb-0 md:pl-12">
      {/* Glow node anchor */}
      <div className="bg-elevated absolute top-1.5 left-0 flex h-2.5 w-2.5 translate-x-[-4.5px] items-center justify-center rounded-full border border-white/20">
        <span className="h-1 w-1 rounded-full bg-white" />
      </div>

      {/* Item info header */}
      <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
        <div>
          <h3 className="flex flex-wrap items-center gap-2 text-lg font-light text-white md:text-xl">
            <span>{item.role}</span>
            <span className="text-base text-white/30">@</span>
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-sm tracking-wider text-white/80 hover:text-white hover:underline"
              >
                <span>{item.company}</span>
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            ) : (
              <span className="font-mono text-sm tracking-wider text-white/70">
                {item.company}
              </span>
            )}
          </h3>
          <div className="mt-1 flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <span>{item.type}</span>
            <span>·</span>
            <span>{item.location}</span>
          </div>
        </div>

        {/* Date period */}
        <div className="font-mono text-[10px] font-medium tracking-[0.25em] text-white/50 uppercase md:text-right">
          {item.period}
        </div>
      </div>

      {/* Description bullets */}
      <ul className="mb-5 list-none space-y-2">
        {item.description.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-2.5 font-sans text-xs leading-relaxed text-white/60"
          >
            <span className="mt-1 font-mono text-[9px] text-white/30 select-none">
              •
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Technologies & highlight footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/3 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-white/4 bg-white/2 px-2 py-0.5 font-mono text-[8px] tracking-wider text-white/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {item.highlight && (
          <span className="rounded-sm border border-white/10 bg-white/3 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.15em] text-white uppercase">
            {item.highlight}
          </span>
        )}
      </div>
    </div>
  );
}
