// filepath: components/cards/SkillGroup.tsx
"use client";

import type { SkillGroup as SkillGroupType } from "@/types";

interface SkillGroupProps {
  group: SkillGroupType;
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="bg-elevated flex h-full flex-col rounded-sm border border-white/4 p-6 transition-colors duration-300 hover:border-white/8">
      {/* Category header */}
      <div className="mb-5 select-none">
        <span className="mb-1 block font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
          {group.category}
        </span>
        <h3 className="text-lg font-light tracking-wider text-white uppercase">
          {group.label}
        </h3>
      </div>

      {/* Skills tags list */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 rounded-sm border border-white/4 bg-white/2 px-3 py-1.5 transition-colors hover:bg-white/4"
          >
            {/* Status dot representation */}
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  skill.level === "confident"
                    ? "var(--primary)"
                    : skill.level === "proficient"
                      ? "var(--muted-foreground)"
                      : "transparent",
                border:
                  skill.level === "learning"
                    ? "1px dashed rgba(255,255,255,0.4)"
                    : "none",
              }}
              title={
                skill.level === "confident"
                  ? "Confident"
                  : skill.level === "proficient"
                    ? "Proficient"
                    : "Currently Learning"
              }
            />
            <span className="font-mono text-xs text-white/70 select-none">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
