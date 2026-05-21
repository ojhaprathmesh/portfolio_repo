// filepath: components/smooth-scroll.tsx
"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

/**
 * SmoothScroll — wraps the page in Lenis for momentum-based smooth scrolling.
 *
 * The wrapper div must have `position: relative` so Framer Motion's `useScroll`
 * can correctly calculate scroll offsets. Without it, FM logs:
 * "Please ensure that the container has a non-static position…"
 *
 * `syncToNative` is disabled (false) because ReactLenis in `root` mode
 * already patches window.scrollY. Enabling it can double-fire events.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {/* position:relative is required so FM useScroll calculates
          scroll offsets against this element, not the viewport root */}
      <div style={{ position: "relative" }}>
        {children}
      </div>
    </ReactLenis>
  )
}
