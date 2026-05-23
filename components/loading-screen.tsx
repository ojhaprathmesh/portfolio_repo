// filepath: components/loading-screen.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface LoadingScreenProps {
  onStartTransition?: () => void
  onComplete: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Blueprint P SVG Component ────────────────────────────────────────────────
// Renders a 2D faceted P folded ribbon centered in a 400x400 CAD blueprint composition
function BlueprintP({ triggerRipple, shouldReduceMotion }: { triggerRipple: boolean; shouldReduceMotion: boolean }) {
  if (shouldReduceMotion) {
    // Simplified static representation for reduced motion
    return (
      <svg
        width="220"
        height="220"
        viewBox="320 240 410 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden="true"
      >
        <g filter="url(#softGlow)">
          <path d="M328 252H720L624 348H424V770L328 866V252Z" fill="url(#whiteFace)" />
          <path d="M624 348L720 252V538L624 634V348Z" fill="url(#silverFace)" />
          <path d="M424 538H624V634H520L424 538Z" fill="url(#silverLower)" />
          <path d="M424 348H624V538H424V348Z" fill="#050505" />
          <path d="M424 538L520 634L424 730V538Z" fill="url(#shadowFold)" />
          <path d="M328 866L424 770V730L328 826V866Z" fill="url(#whiteLeg)" />
        </g>
        <defs>
          <linearGradient id="whiteFace" x1="328" y1="252" x2="672" y2="786" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF"/>
            <stop offset="1" stopColor="#EDEDED"/>
          </linearGradient>
          <linearGradient id="whiteLeg" x1="328" y1="730" x2="424" y2="866" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF"/>
            <stop offset="1" stopColor="#EDEDED"/>
          </linearGradient>
          <linearGradient id="silverFace" x1="624" y1="252" x2="720" y2="634" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5E5E5"/>
            <stop offset="1" stopColor="#999999"/>
          </linearGradient>
          <linearGradient id="silverLower" x1="424" y1="538" x2="624" y2="634" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B5B5B5"/>
            <stop offset="1" stopColor="#7F7F7F"/>
          </linearGradient>
          <linearGradient id="shadowFold" x1="424" y1="538" x2="520" y2="730" gradientUnits="userSpaceOnUse">
            <stop stopColor="#333333"/>
            <stop offset="1" stopColor="#111111"/>
          </linearGradient>
          <filter id="softGlow" x="280" y="204" width="488" height="710" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#FFFFFF" floodOpacity="0.08"/>
          </filter>
        </defs>
      </svg>
    )
  }

  return (
    <svg
      width="240"
      height="240"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
      aria-hidden="true"
    >
      <motion.g
        animate={triggerRipple ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ transformOrigin: "200px 200px" }}
      >
        {/* Concentric construction circles at the center of gravity (200, 200) */}
        <motion.circle
          cx="200" cy="200" r="140"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.1, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200" cy="200" r="100"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200" cy="200" r="60"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Construction circles around the cutout center (200, 153.6) */}
        <motion.circle
          cx="200" cy="153.6" r="54.4"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200" cy="153.6" r="30"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />

        {/* Horizontal guide lines (aligned exactly with logo vertices) */}
        {[
          { y: 77.2, delay: 0.15, op: "rgba(255,255,255,0.06)" },
          { y: 115.6, delay: 0.20, op: "rgba(255,255,255,0.04)" },
          { y: 191.6, delay: 0.25, op: "rgba(255,255,255,0.04)" },
          { y: 230.0, delay: 0.30, op: "rgba(255,255,255,0.06)" },
          { y: 284.4, delay: 0.35, op: "rgba(255,255,255,0.03)" },
          { y: 322.8, delay: 0.40, op: "rgba(255,255,255,0.05)" },
        ].map(({ y, delay, op }) => (
          <motion.line
            key={`h-${y}`}
            x1="20" y1={y} x2="380" y2={y}
            stroke={op}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay, ease: EASE }}
          />
        ))}

        {/* Vertical guide lines (aligned exactly with logo vertices) */}
        {[
          { x: 121.6, delay: 0.18, op: "rgba(255,255,255,0.06)" },
          { x: 160.0, delay: 0.23, op: "rgba(255,255,255,0.04)" },
          { x: 198.4, delay: 0.28, op: "rgba(255,255,255,0.03)" },
          { x: 240.0, delay: 0.33, op: "rgba(255,255,255,0.04)" },
          { x: 278.4, delay: 0.38, op: "rgba(255,255,255,0.06)" },
        ].map(({ x, delay, op }) => (
          <motion.line
            key={`v-${x}`}
            x1={x} y1="20" x2={x} y2="380"
            stroke={op}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay, ease: EASE }}
          />
        ))}

        {/* Diagonal guides and intersection webs */}
        <motion.line
          x1="20" y1="20" x2="380" y2="380"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
        />
        <motion.line
          x1="20" y1="380" x2="380" y2="20"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.45 }}
        />
        <motion.line
          x1="121.6" y1="77.2" x2="278.4" y2="230.0"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        />
        <motion.line
          x1="121.6" y1="322.8" x2="278.4" y2="77.2"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        />

        {/* Bounding box corner tick marks */}
        {[
          { x: 121.6, y: 77.2, path: "M 121.6 87.2 L 121.6 77.2 L 131.6 77.2" },
          { x: 278.4, y: 77.2, path: "M 268.4 77.2 L 278.4 77.2 L 278.4 87.2" },
          { x: 121.6, y: 322.8, path: "M 121.6 312.8 L 121.6 322.8 L 131.6 322.8" },
          { x: 278.4, y: 322.8, path: "M 268.4 322.8 L 278.4 322.8 L 278.4 312.8" },
        ].map(({ x, y, path }) => (
          <motion.path
            key={`tick-${x}-${y}`}
            d={path}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
        ))}

        {/* Reference node points */}
        {[
          [121.6, 77.2], [278.4, 77.2], [278.4, 230.0],
          [160.0, 115.6], [240.0, 191.6], [200.0, 200.0],
          [121.6, 322.8], [160.0, 284.4]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={cx} cy={cy} r="1.5"
            fill={cx === 200.0 && cy === 200.0 ? "#FFFFFF" : "rgba(255,255,255,0.3)"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, delay: 0.7 + i * 0.04 }}
          />
        ))}

        {/* CAD Blueprint Annotation Texts */}
        <text x="127" y="73" fill="rgba(255,255,255,0.15)" fontFamily="monospace" fontSize="5" letterSpacing="0.08em">P_STEM.START [121.6, 77.2]</text>
        <text x="127" y="318" fill="rgba(255,255,255,0.12)" fontFamily="monospace" fontSize="5" letterSpacing="0.08em">P_STEM.END [121.6, 322.8]</text>
        <text x="246" y="148" fill="rgba(255,255,255,0.12)" fontFamily="monospace" fontSize="5" letterSpacing="0.08em">R_BOWL = 76.00</text>
        <text x="206" y="196" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontSize="5" letterSpacing="0.08em">CTR_OF_GRAV [200, 200]</text>
      </motion.g>

      {/* ──────────────────────────────────────────────────────── */}
      {/* THE 2D LETTER P — centered exactly at (200, 200)         */}
      {/* ──────────────────────────────────────────────────────── */}
      <g transform="translate(-9.6, -23.6) scale(0.40)" filter="url(#softGlow)">
        {/* Facet 1: Main White Face (Stem & Top folding curve) */}
        <motion.path
          d="M328 252H720L624 348H424V770L328 866V252Z"
          fill="url(#whiteFace)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 1.2, delay: 0.4, ease: EASE },
            fillOpacity: { duration: 0.6, delay: 1.3, ease: EASE },
          }}
        />

        {/* Facet 2: White Leg Bottom Bevel */}
        <motion.path
          d="M328 866L424 770V730L328 826V866Z"
          fill="url(#whiteLeg)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 0.9, delay: 0.6, ease: EASE },
            fillOpacity: { duration: 0.6, delay: 1.4, ease: EASE },
          }}
        />

        {/* Facet 3: Silver Loop Outer Curve */}
        <motion.path
          d="M624 348L720 252V538L624 634V348Z"
          fill="url(#silverFace)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 1.2, delay: 0.7, ease: EASE },
            fillOpacity: { duration: 0.6, delay: 1.5, ease: EASE },
          }}
        />

        {/* Facet 4: Silver Lower Horizontal Fold */}
        <motion.path
          d="M424 538H624V634H520L424 538Z"
          fill="url(#silverLower)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 0.9, delay: 0.9, ease: EASE },
            fillOpacity: { duration: 0.6, delay: 1.6, ease: EASE },
          }}
        />

        {/* Facet 5: Shadow Fold Under */}
        <motion.path
          d="M424 538L520 634L424 730V538Z"
          fill="url(#shadowFold)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 0.9, delay: 1.0, ease: EASE },
            fillOpacity: { duration: 0.6, delay: 1.7, ease: EASE },
          }}
        />

        {/* Center Cut-out Mask (Black center) */}
        <motion.path
          d="M424 348H624V538H424V348Z"
          fill="#050505"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.0"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 0.8, delay: 1.1, ease: EASE },
            fillOpacity: { duration: 0.4, delay: 1.7, ease: EASE },
          }}
        />
      </g>

      <defs>
        <linearGradient id="whiteFace" x1="328" y1="252" x2="672" y2="786" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF"/>
          <stop offset="1" stopColor="#EDEDED"/>
        </linearGradient>

        <linearGradient id="whiteLeg" x1="328" y1="730" x2="424" y2="866" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF"/>
          <stop offset="1" stopColor="#EDEDED"/>
        </linearGradient>

        <linearGradient id="silverFace" x1="624" y1="252" x2="720" y2="634" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5E5E5"/>
          <stop offset="1" stopColor="#999999"/>
        </linearGradient>

        <linearGradient id="silverLower" x1="424" y1="538" x2="624" y2="634" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B5B5B5"/>
          <stop offset="1" stopColor="#7F7F7F"/>
        </linearGradient>

        <linearGradient id="shadowFold" x1="424" y1="538" x2="520" y2="730" gradientUnits="userSpaceOnUse">
          <stop stopColor="#333333"/>
          <stop offset="1" stopColor="#111111"/>
        </linearGradient>

        <filter id="softGlow" x="280" y="204" width="488" height="710" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#FFFFFF" floodOpacity="0.08"/>
        </filter>
      </defs>
    </svg>
  )
}

// ─── Main LoadingScreen ───────────────────────────────────────────────────────
export function LoadingScreen({ onStartTransition, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [triggerRipple, setTriggerRipple] = useState(false)
  
  const shouldReduceMotion = useReducedMotion() ?? false

  useEffect(() => {

    const duration = shouldReduceMotion ? 1200 : 2200 // Slightly faster if reduced motion requested
    const interval = 16
    const steps = Math.floor(duration / interval)
    let step = 0

    const timer = setInterval(() => {
      step++
      const t = step / steps
      // Custom ease to simulate architectural calculation pause/speedups
      const eased = t < 0.75 ? (t / 0.75) * 0.88 : 0.88 + ((t - 0.75) / 0.25) * 0.12
      const next = Math.min(eased * 100 + Math.random() * 1.0, 100)

      setProgress(next)

      if (step >= steps) {
        clearInterval(timer)
        setProgress(100)
        


        // 1. Trigger the monochrome ripple and dissolve
        setTriggerRipple(true)
        if (onStartTransition) onStartTransition()

        // 2. Dissolve fade-out duration
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 50)
        }, 800)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onStartTransition, onComplete, shouldReduceMotion])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "#050505" }}
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* ── Architectural blueprint crossing guide lines (full-screen) ── */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ top: "33.333%", background: "rgba(255,255,255,0.03)", originX: 0 }}
                animate={triggerRipple ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
                initial={{ scaleX: 0, opacity: 0 }}
                transition={triggerRipple ? { duration: 0.3 } : { duration: 0.8, delay: 0.08, ease: EASE }}
              />
              <motion.div
                className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ top: "66.666%", background: "rgba(255,255,255,0.03)", originX: 1 }}
                animate={triggerRipple ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
                initial={{ scaleX: 0, opacity: 0 }}
                transition={triggerRipple ? { duration: 0.3 } : { duration: 0.8, delay: 0.12, ease: EASE }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-px pointer-events-none"
                style={{ left: "33.333%", background: "rgba(255,255,255,0.025)", originY: 0 }}
                animate={triggerRipple ? { opacity: 0 } : { scaleY: 1, opacity: 1 }}
                initial={{ scaleY: 0, opacity: 0 }}
                transition={triggerRipple ? { duration: 0.3 } : { duration: 0.8, delay: 0.10, ease: EASE }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-px pointer-events-none"
                style={{ left: "66.666%", background: "rgba(255,255,255,0.025)", originY: 1 }}
                animate={triggerRipple ? { opacity: 0 } : { scaleY: 1, opacity: 1 }}
                initial={{ scaleY: 0, opacity: 0 }}
                transition={triggerRipple ? { duration: 0.3 } : { duration: 0.8, delay: 0.14, ease: EASE }}
              />

              {/* Technical scan line overlay */}
              {!triggerRipple && (
                <motion.div
                  className="absolute left-0 right-0 h-px pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                  }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4.0, repeat: Infinity, ease: "linear" }}
                />
              )}
            </>
          )}

          {/* ── Technical metadata labels (blueprint frame) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={triggerRipple ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.22em] text-white/20 select-none"
          >
            SYS.IDENTITY // v2.0
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={triggerRipple ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 right-7 font-mono text-[8px] tracking-[0.22em] text-right text-white/20 select-none"
          >
            SCALE_0.40 // CAD_REV
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={triggerRipple ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-7 font-mono text-[8px] tracking-[0.22em] text-white/15 select-none"
          >
            LOC.X200 // Y200
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={triggerRipple ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 right-7 font-mono text-[8px] tracking-[0.22em] text-right text-white/15 select-none"
          >
            MONOCHROME_SYSTEM
          </motion.div>

          {/* ── Center Content: Logo + Loader ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
            {/* Centered SVG Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={triggerRipple ? { scale: 0.92, opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <BlueprintP triggerRipple={triggerRipple} shouldReduceMotion={shouldReduceMotion} />

              {/* Faint white depth glow behind P */}
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle 90px at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Progress and status indicators */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={triggerRipple ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col items-center gap-3.5 w-48"
            >
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30 select-none">
                CONSTRUCTING IDENTITY
              </span>

              {/* Progress bar and label */}
              <div className="w-full space-y-2">
                <div className="relative h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="absolute inset-y-0 left-0 bg-white/70 transition-[width] duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center font-mono text-[8px] text-white/20 uppercase tracking-widest">
                  <span>LOADING</span>
                  <span className="text-white/40">{Math.round(progress).toString().padStart(3, "0")}%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Grayscale Water Drop Ripple Waves ── */}
          {triggerRipple && !shouldReduceMotion && (
            <>
              {/* Ripple Ring 1 */}
              <motion.div
                className="absolute rounded-full border border-white/40 pointer-events-none z-50"
                style={{
                  width: 80,
                  height: 80,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0.1, opacity: 0.9, borderWidth: "3px" }}
                animate={{ scale: 16, opacity: 0, borderWidth: "0.2px" }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Ripple Ring 2 */}
              <motion.div
                className="absolute rounded-full border border-white/20 pointer-events-none z-50"
                style={{
                  width: 80,
                  height: 80,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0.1, opacity: 0.7, borderWidth: "2px" }}
                animate={{ scale: 12, opacity: 0, borderWidth: "0.2px" }}
                transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Ripple Ring 3 */}
              <motion.div
                className="absolute rounded-full border border-white/10 pointer-events-none z-40"
                style={{
                  width: 120,
                  height: 120,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0.05, opacity: 0.4, borderWidth: "1px" }}
                animate={{ scale: 9, opacity: 0, borderWidth: "0.1px" }}
                transition={{ duration: 1.5, delay: 0.05, ease: "easeOut" }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
