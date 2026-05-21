// filepath: components/loading-screen.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Blueprint P SVG Component ────────────────────────────────────────────────
function BlueprintP() {
  return (
    <svg
      width="200"
      height="280"
      viewBox="0 0 220 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
      aria-hidden="true"
    >
      {/* ── Outer construction orbit ── */}
      <motion.circle
        cx="155" cy="105" r="82"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="0.6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: "linear" }}
      />

      {/* ── Inner dashed guide ring ── */}
      <motion.circle
        cx="155" cy="105" r="48"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.5"
        strokeDasharray="3 5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />

      {/* ── Bowl center dot ring ── */}
      <motion.circle
        cx="155" cy="105" r="5"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="0.5"
        fill="rgba(0,229,255,0.05)"
        initial={{ pathLength: 0, opacity: 0, scale: 0 }}
        animate={{ pathLength: 1, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.65 }}
      />

      {/* ── Horizontal guide lines ── */}
      {[
        { y: 45, delay: 0.25, opacity: "rgba(255,255,255,0.08)" },
        { y: 105, delay: 0.30, opacity: "rgba(255,255,255,0.06)" },
        { y: 165, delay: 0.35, opacity: "rgba(255,255,255,0.08)" },
        { y: 255, delay: 0.40, opacity: "rgba(255,255,255,0.03)" },
      ].map(({ y, delay, opacity: op }) => (
        <motion.line
          key={y}
          x1="15" y1={y} x2="215" y2={y}
          stroke={op}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay, ease: EASE }}
        />
      ))}

      {/* ── Vertical guide lines ── */}
      {[
        { x: 65, delay: 0.28, opacity: "rgba(255,255,255,0.08)" },
        { x: 155, delay: 0.33, opacity: "rgba(255,255,255,0.05)" },
        { x: 210, delay: 0.38, opacity: "rgba(255,255,255,0.05)" },
      ].map(({ x, delay, opacity: op }) => (
        <motion.line
          key={x}
          x1={x} y1="10" x2={x} y2="280"
          stroke={op}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay, ease: EASE }}
        />
      ))}

      {/* ── Diagonal construction lines through bowl box ── */}
      <motion.line
        x1="65" y1="45" x2="210" y2="165"
        stroke="rgba(255,255,255,0.035)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.5, ease: EASE }}
      />
      <motion.line
        x1="65" y1="165" x2="210" y2="45"
        stroke="rgba(255,255,255,0.035)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
      />

      {/* ── Corner tick marks at bowl bounding box ── */}
      {[
        { x: 65, y: 45, path: "M 65 53 L 65 45 L 73 45" },
        { x: 210, y: 45, path: "M 202 45 L 210 45 L 210 53" },
        { x: 65, y: 165, path: "M 65 157 L 65 165 L 73 165" },
        { x: 210, y: 165, path: "M 202 165 L 210 165 L 210 157" },
      ].map(({ x, y, path }) => (
        <motion.path
          key={`${x}-${y}`}
          d={path}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="square"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      ))}

      {/* ── Reference dots at key intersections ── */}
      {[
        [65, 45], [65, 105], [65, 165], [65, 255],
        [155, 45], [155, 165], [210, 105],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r="2"
          fill="rgba(255,255,255,0.25)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.62 + i * 0.04 }}
        />
      ))}

      {/* ──────────────────────────────────────────────────────── */}
      {/* THE LETTER P — architectural, thin-outline               */}
      {/* ──────────────────────────────────────────────────────── */}

      {/* Stem */}
      <motion.path
        d="M 65 45 L 65 255"
        stroke="rgba(255,255,255,0.88)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.62, ease: EASE }}
      />

      {/* Bowl (top horizontal + bezier right side + bottom horizontal) */}
      <motion.path
        d="M 65 45 L 155 45 C 215 45 215 165 155 165 L 65 165"
        stroke="rgba(255,255,255,0.88)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.90, ease: EASE }}
      />

      {/* Subtle cyan accent on the rightmost curve peak */}
      <motion.circle
        cx="210" cy="105" r="2.5"
        fill="#00E5FF"
        fillOpacity={0.5}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.5 }}
      />
    </svg>
  )
}

// ─── Main LoadingScreen ───────────────────────────────────────────────────────
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 4000
    const interval = 16
    const steps = Math.floor(duration / interval)
    let step = 0

    const timer = setInterval(() => {
      step++
      const t = step / steps
      // Natural easing: fast at first, slightly slower near the end
      const eased = t < 0.7 ? (t / 0.7) * 0.85 : 0.85 + ((t - 0.7) / 0.3) * 0.15
      const next = Math.min(eased * 100 + Math.random() * 1.5, 100)

      setProgress(next)

      if (step >= steps) {
        clearInterval(timer)
        setProgress(100)
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 550)
        }, 150)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "#050505" }}
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* ── Viewport guide lines (full-screen crossing lines) ── */}
          {/* Horizontal top-third */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ top: "33.333%", background: "rgba(255,255,255,0.04)", originX: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          />
          {/* Horizontal bottom-third */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ top: "66.666%", background: "rgba(255,255,255,0.04)", originX: 1 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          />
          {/* Vertical left-third */}
          <motion.div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: "33.333%", background: "rgba(255,255,255,0.03)", originY: 0 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.10, ease: EASE }}
          />
          {/* Vertical right-third */}
          <motion.div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: "66.666%", background: "rgba(255,255,255,0.03)", originY: 1 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          />

          {/* ── Scan line (technical blueprint aesthetic) ── */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(0,229,255,0.12) 50%, transparent 100%)",
            }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />

          {/* ── Corner annotations (blueprint metadata) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-6 left-7 font-mono text-[9px] tracking-[0.22em] select-none"
            style={{ color: "rgba(255,255,255,0.13)" }}
          >
            PO.PORTFOLIO // v2025
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-6 right-7 font-mono text-[9px] tracking-[0.22em] text-right select-none"
            style={{ color: "rgba(255,255,255,0.13)" }}
          >
            BUILD_01 // REV.A
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute bottom-6 left-7 font-mono text-[9px] tracking-[0.22em] select-none"
            style={{ color: "rgba(255,255,255,0.10)" }}
          >
            X:0000 Y:0000
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute bottom-6 right-7 font-mono text-[9px] tracking-[0.22em] text-right select-none"
            style={{ color: "rgba(255,255,255,0.10)" }}
          >
            PRATHMESH_OJHA
          </motion.div>

          {/* ── Main content — Blueprint P + progress ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-14">
            {/* Blueprint P */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="relative"
            >
              <BlueprintP />

              {/* Subtle glow behind the P */}
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 120px 140px at 55% 38%, rgba(255,255,255,0.02) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Progress container */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex flex-col items-center gap-4 w-52"
            >
              {/* Loading phrase */}
              <p
                className="font-mono text-[9px] tracking-[0.38em] uppercase select-none"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Initializing Portfolio
              </p>

              {/* Progress bar + percentage */}
              <div className="w-full space-y-2">
                <div
                  className="relative h-px overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="absolute inset-y-0 left-0 transition-[width] duration-75 ease-linear"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.9))",
                    }}
                  />
                  {/* Glint on progress bar tip */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-3 blur-sm"
                    style={{
                      left: `${progress}%`,
                      transform: "translateX(-50%)",
                      background: "rgba(255,255,255,0.8)",
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className="font-mono text-[8px] tracking-[0.32em] uppercase select-none"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    Loading
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-widest tabular-nums select-none"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {Math.round(progress).toString().padStart(3, "0")}%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
