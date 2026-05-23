"use client"

import { motion, useReducedMotion } from "framer-motion"
import { coreSkillsRows, engineeringFocus } from "@/data/coding-showcase"

export function CoreSkillsTable() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="rounded-sm border border-white/[0.06] bg-[#0a0a0a] overflow-hidden"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="px-5 py-3 border-b border-white/[0.05]">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Core skills
        </span>
      </div>

      <table className="w-full text-left">
        <tbody>
          {coreSkillsRows.map((row) => (
            <tr key={row.category} className="border-b border-white/[0.04] last:border-0">
              <td className="px-5 py-3.5 font-mono text-[10px] tracking-wider text-white/40 w-[26%] align-top whitespace-nowrap">
                {row.category}
              </td>
              <td className="px-5 py-3.5 text-sm text-white/45 leading-relaxed font-sans">
                {row.items}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-5 py-4 border-t border-dashed border-white/[0.06] flex flex-wrap gap-2">
        {engineeringFocus.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[8px] tracking-wide text-white/30 px-2 py-1 border border-white/[0.06] rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
