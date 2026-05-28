"use client";

import { motion, useReducedMotion } from "framer-motion";

import { coreSkillsRows, engineeringFocus } from "@/data/coding-showcase";

export function CoreSkillsTable() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="bg-card overflow-hidden rounded-sm border border-white/6"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Core skills
        </span>
      </div>

      <table className="w-full text-left">
        <tbody>
          {coreSkillsRows.map((row) => (
            <tr
              key={row.category}
              className="border-b border-white/4 last:border-0"
            >
              <td className="w-[26%] px-5 py-3.5 align-top font-mono text-[10px] tracking-wider whitespace-nowrap text-white/40">
                {row.category}
              </td>
              <td className="px-5 py-3.5 font-sans text-sm leading-relaxed text-white/45">
                {row.items}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap gap-2 border-t border-dashed border-white/6 px-5 py-4">
        {engineeringFocus.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-white/6 px-2 py-1 font-mono text-[8px] tracking-wide text-white/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
