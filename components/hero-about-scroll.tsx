"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { useLenis } from "lenis/react"
import { Hero } from "./hero"
import { About } from "./about"

// Helper to calculate the true layout offset top of an element relative to the document root
// This is unaffected by sticky positions, scroll states, or parent transforms.
const getAbsoluteOffsetTop = (element: HTMLElement) => {
  let offsetTop = 0
  let el: HTMLElement | null = element
  while (el) {
    offsetTop += el.offsetTop
    el = el.offsetParent as HTMLElement | null
  }
  return offsetTop
}

export function HeroAboutScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const x = useMotionValue("0%")
  const lenis = useLenis()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let snapTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      if (!containerRef.current) return

      // Calculate absolute scroll coordinates
      const offsetTop = getAbsoluteOffsetTop(containerRef.current)
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const sectionHeight = containerRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollDistance = sectionHeight - viewportHeight

      if (scrollDistance <= 0) return

      // Calculate progress (0 to 1) of scrolling inside this container
      const currentProgress = Math.max(0, Math.min(1, (scrollTop - offsetTop) / scrollDistance))
      
      // Map progress to translation (0% to -50%)
      x.set(`${-50 * currentProgress}%`)

      // Clear any pending snaps
      if (snapTimeout) {
        clearTimeout(snapTimeout)
      }

      // Trigger snapping only if the scroll rests inside the active transition range
      if (currentProgress > 0.01 && currentProgress < 0.99) {
        snapTimeout = setTimeout(() => {
          const targetProgress = currentProgress < 0.5 ? 0 : 1
          const targetScrollTop = offsetTop + targetProgress * scrollDistance

          if (lenis) {
            lenis.scrollTo(targetScrollTop, { duration: 0.3 })
          } else {
            window.scrollTo({
              top: targetScrollTop,
              behavior: "smooth",
            })
          }
        }, 100) // Snap 100ms after user finishes scrolling
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (snapTimeout) {
        clearTimeout(snapTimeout)
      }
    }
  }, [mounted, x, lenis])

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#050505]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted ? (
          /* Horizontal scroll track */
          <motion.div
            style={{ x }}
            className="flex flex-row w-[200vw] h-full will-change-transform"
          >
            {/* Slide 1: Hero Section (Left side) */}
            <div className="w-[100vw] h-full">
              <Hero />
            </div>

            {/* Slide 2: About Section (Right side) */}
            <div className="w-[100vw] h-full overflow-y-auto">
              <About />
            </div>
          </motion.div>
        ) : (
          <div className="w-full h-full">
            <Hero />
          </div>
        )}
      </div>
    </div>
  )
}
