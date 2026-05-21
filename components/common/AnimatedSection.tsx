// filepath: components/common/AnimatedSection.tsx
"use client"

import { useRef, ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", id, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // cinematic cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
