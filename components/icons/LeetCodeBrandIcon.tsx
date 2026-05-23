"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeetcode } from "@fortawesome/free-brands-svg-icons"

interface LeetCodeBrandIconProps {
  className?: string
  size?: "sm" | "md"
}

const sizeMap = { sm: "h-3.5 w-3.5", md: "h-4 w-4" } as const

export function LeetCodeBrandIcon({ className = "", size = "md" }: LeetCodeBrandIconProps) {
  return (
    <FontAwesomeIcon
      icon={faLeetcode}
      className={`${sizeMap[size]} ${className}`}
      aria-hidden
    />
  )
}
