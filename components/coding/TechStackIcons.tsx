"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { techStackIcons } from "@/data/coding-showcase";

export function TechStackIcons() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="bg-card overflow-hidden rounded-sm border border-white/6"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Tech stack
        </span>
      </div>

      <div className="px-5 py-5">
        <div className="flex flex-wrap items-start justify-between gap-y-8">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="flex w-14 flex-col items-center gap-1.5 rounded-sm px-1 py-1 transition-colors"
              title={icon.name}
            >
              <Image
                src={icon.src}
                alt={icon.name}
                width={22}
                height={22}
                className={`object-contain opacity-55 transition-opacity hover:opacity-90 ${
                  "mono" in icon && icon.mono ? "invert" : ""
                }`}
                unoptimized
              />
              <span className="font-mono text-[7px] tracking-wide whitespace-nowrap text-white/30 uppercase">
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
