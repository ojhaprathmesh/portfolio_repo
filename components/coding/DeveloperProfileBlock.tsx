"use client"

import { developerProfile } from "@/data/coding-showcase"

export function DeveloperProfileBlock() {
  const lines = [
    `const prathmesh = {`,
    `  education: "${developerProfile.education}",`,
    `  graduation: "${developerProfile.graduation}",`,
    `  role: "${developerProfile.role}",`,
    `  focus: [`,
    ...developerProfile.focus.map((f) => `    "${f}",`),
    `  ],`,
    `  currentlyBuilding: "${developerProfile.currentlyBuilding}",`,
    `  learning: "${developerProfile.learning}",`,
    `  interests: [`,
    ...developerProfile.interests.map((i) => `    "${i}",`),
    `  ]`,
    `};`,
  ]

  return (
    <div className="p-5 md:p-6 bg-[#0d0d0d] border border-white/4 rounded-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
          developer.json
        </span>
        <span className="ml-auto flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </span>
      </div>
      <pre className="font-mono text-[10px] md:text-[11px] leading-relaxed text-white/55 overflow-x-auto">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block">
              <span className="text-white/20 select-none mr-3 inline-block w-4 text-right">
                {i + 1}
              </span>
              <span
                className={
                  line.includes("const ") || line.includes("};")
                    ? "text-white/80"
                    : line.includes(":")
                      ? ""
                      : ""
                }
              >
                {line.includes(":") ? (
                  <>
                    <span className="text-sky-400/80">
                      {line.split(":")[0]}
                      {line.includes(":") ? ":" : ""}
                    </span>
                    <span className="text-emerald-400/70">
                      {line.split(":").slice(1).join(":")}
                    </span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
