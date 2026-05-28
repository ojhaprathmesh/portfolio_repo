"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { WaterRipplePlane } from "./effects/WaterRipplePlane";

interface LoadingScreenProps {
  onStartTransition?: () => void;
  onComplete: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function BlueprintP({
  triggerRipple,
  shouldReduceMotion,
}: {
  triggerRipple: boolean;
  shouldReduceMotion: boolean;
}) {
  if (shouldReduceMotion) {
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
        <g filter="url(#softGlowS)">
          <path
            d="M328 252H720L624 348H424V770L328 866V252Z"
            fill="url(#whiteFaceS)"
          />
          <path
            d="M624 348L720 252V538L624 634V348Z"
            fill="url(#silverFaceS)"
          />
          <path d="M424 538H624V634H520L424 538Z" fill="url(#silverLowerS)" />
          <path d="M424 348H624V538H424V348Z" fill="#050505" />
          <path d="M424 538L520 634L424 730V538Z" fill="url(#shadowFoldS)" />
          <path d="M328 866L424 770V730L328 826V866Z" fill="url(#whiteLegS)" />
        </g>
        <defs>
          <linearGradient
            id="whiteFaceS"
            x1="328"
            y1="252"
            x2="672"
            y2="786"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EDEDED" />
          </linearGradient>
          <linearGradient
            id="whiteLegS"
            x1="328"
            y1="730"
            x2="424"
            y2="866"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EDEDED" />
          </linearGradient>
          <linearGradient
            id="silverFaceS"
            x1="624"
            y1="252"
            x2="720"
            y2="634"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E5E5E5" />
            <stop offset="1" stopColor="#999999" />
          </linearGradient>
          <linearGradient
            id="silverLowerS"
            x1="424"
            y1="538"
            x2="624"
            y2="634"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B5B5B5" />
            <stop offset="1" stopColor="#7F7F7F" />
          </linearGradient>
          <linearGradient
            id="shadowFoldS"
            x1="424"
            y1="538"
            x2="520"
            y2="730"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#333333" />
            <stop offset="1" stopColor="#111111" />
          </linearGradient>
          <filter
            id="softGlowS"
            x="280"
            y="204"
            width="488"
            height="710"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="12"
              floodColor="#FFFFFF"
              floodOpacity="0.08"
            />
          </filter>
        </defs>
      </svg>
    );
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
        animate={
          triggerRipple ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.1, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="100"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />

        <motion.circle
          cx="200"
          cy="153.6"
          r="54.4"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200"
          cy="153.6"
          r="30"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />

        {[
          { y: 77.2, delay: 0.15, op: "rgba(255,255,255,0.06)" },
          { y: 115.6, delay: 0.2, op: "rgba(255,255,255,0.04)" },
          { y: 191.6, delay: 0.25, op: "rgba(255,255,255,0.04)" },
          { y: 230.0, delay: 0.3, op: "rgba(255,255,255,0.06)" },
          { y: 284.4, delay: 0.35, op: "rgba(255,255,255,0.03)" },
          { y: 322.8, delay: 0.4, op: "rgba(255,255,255,0.05)" },
        ].map(({ y, delay, op }) => (
          <motion.line
            key={`h-${y}`}
            x1="20"
            y1={y}
            x2="380"
            y2={y}
            stroke={op}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay, ease: EASE }}
          />
        ))}

        {[
          { x: 121.6, delay: 0.18, op: "rgba(255,255,255,0.06)" },
          { x: 160.0, delay: 0.23, op: "rgba(255,255,255,0.04)" },
          { x: 198.4, delay: 0.28, op: "rgba(255,255,255,0.03)" },
          { x: 240.0, delay: 0.33, op: "rgba(255,255,255,0.04)" },
          { x: 278.4, delay: 0.38, op: "rgba(255,255,255,0.06)" },
        ].map(({ x, delay, op }) => (
          <motion.line
            key={`v-${x}`}
            x1={x}
            y1="20"
            x2={x}
            y2="380"
            stroke={op}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay, ease: EASE }}
          />
        ))}

        <motion.line
          x1="20"
          y1="20"
          x2="380"
          y2="380"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
        />
        <motion.line
          x1="20"
          y1="380"
          x2="380"
          y2="20"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.0, delay: 0.45 }}
        />
        <motion.line
          x1="121.6"
          y1="77.2"
          x2="278.4"
          y2="230.0"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        />
        <motion.line
          x1="121.6"
          y1="322.8"
          x2="278.4"
          y2="77.2"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        />

        {[
          { x: 121.6, y: 77.2, path: "M 121.6 87.2 L 121.6 77.2 L 131.6 77.2" },
          { x: 278.4, y: 77.2, path: "M 268.4 77.2 L 278.4 77.2 L 278.4 87.2" },
          {
            x: 121.6,
            y: 322.8,
            path: "M 121.6 312.8 L 121.6 322.8 L 131.6 322.8",
          },
          {
            x: 278.4,
            y: 322.8,
            path: "M 268.4 322.8 L 278.4 322.8 L 278.4 312.8",
          },
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

        {[
          [121.6, 77.2],
          [278.4, 77.2],
          [278.4, 230.0],
          [160.0, 115.6],
          [240.0, 191.6],
          [200.0, 200.0],
          [121.6, 322.8],
          [160.0, 284.4],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r="1.5"
            fill={
              cx === 200.0 && cy === 200.0 ? "#FFFFFF" : "rgba(255,255,255,0.3)"
            }
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, delay: 0.7 + i * 0.04 }}
          />
        ))}

        <text
          x="127"
          y="73"
          fill="rgba(255,255,255,0.15)"
          fontFamily="monospace"
          fontSize="5"
          letterSpacing="0.08em"
        >
          P_STEM.START [121.6, 77.2]
        </text>
        <text
          x="127"
          y="318"
          fill="rgba(255,255,255,0.12)"
          fontFamily="monospace"
          fontSize="5"
          letterSpacing="0.08em"
        >
          P_STEM.END [121.6, 322.8]
        </text>
        <text
          x="246"
          y="148"
          fill="rgba(255,255,255,0.12)"
          fontFamily="monospace"
          fontSize="5"
          letterSpacing="0.08em"
        >
          R_BOWL = 76.00
        </text>
        <text
          x="206"
          y="196"
          fill="rgba(255,255,255,0.2)"
          fontFamily="monospace"
          fontSize="5"
          letterSpacing="0.08em"
        >
          CTR_OF_GRAV [200, 200]
        </text>
      </motion.g>

      <g transform="translate(-9.6, -23.6) scale(0.40)" filter="url(#softGlow)">
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
        <linearGradient
          id="whiteFace"
          x1="328"
          y1="252"
          x2="672"
          y2="786"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EDEDED" />
        </linearGradient>

        <linearGradient
          id="whiteLeg"
          x1="328"
          y1="730"
          x2="424"
          y2="866"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EDEDED" />
        </linearGradient>

        <linearGradient
          id="silverFace"
          x1="624"
          y1="252"
          x2="720"
          y2="634"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E5E5E5" />
          <stop offset="1" stopColor="#999999" />
        </linearGradient>

        <linearGradient
          id="silverLower"
          x1="424"
          y1="538"
          x2="624"
          y2="634"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B5B5B5" />
          <stop offset="1" stopColor="#7F7F7F" />
        </linearGradient>

        <linearGradient
          id="shadowFold"
          x1="424"
          y1="538"
          x2="520"
          y2="730"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#333333" />
          <stop offset="1" stopColor="#111111" />
        </linearGradient>

        <filter
          id="softGlow"
          x="280"
          y="204"
          width="488"
          height="710"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="12"
            floodColor="#FFFFFF"
            floodOpacity="0.08"
          />
        </filter>
      </defs>
    </svg>
  );
}

// --- TRANSITION LAYER STRUCTURE ---
// z-index hierarchy:
// z-[100]: Ripple Canvas (creates distortion between layers)
// z-[90]:  Loading Screen (fades out during ripple)
// z-[1]:   Landing Page (fades in through ripple)

export function LoadingScreen({
  onStartTransition,
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "rippling" | "revealed">(
    "loading",
  );
  const [rippleKey, setRippleKey] = useState(0);

  const shouldReduceMotion = useReducedMotion() ?? false;

  const onStartTransitionRef = useRef(onStartTransition);
  onStartTransitionRef.current = onStartTransition;

  // Progress animation
  useEffect(() => {
    const duration = shouldReduceMotion ? 1200 : 2200;
    const interval = 16;
    const steps = Math.floor(duration / interval);
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased =
        t < 0.75 ? (t / 0.75) * 0.88 : 0.88 + ((t - 0.75) / 0.25) * 0.12;
      const next = Math.min(eased * 100 + Math.random() * 1.1, 100);

      setProgress(next);

      if (step >= steps) {
        clearInterval(timer);
        setProgress(100);
        // Trigger the ripple transition
        setRippleKey((k) => k + 1);
        setPhase("rippling");
        onStartTransitionRef.current?.();
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleRippleComplete = () => {
    setPhase("revealed");
    onComplete();
  };

  // Reduced motion fallback
  if (shouldReduceMotion) {
    return (
      <AnimatePresence>
        {phase !== "revealed" && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-100 flex items-center justify-center bg-[#050505]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlueprintP triggerRipple={false} shouldReduceMotion={true} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const isLoaderVisible = phase === "loading" || phase === "rippling";
  const isRippleActive = phase === "rippling";

  return (
    <>
      {/* RIPPLE LAYER: z-[100] - Sits between loader and landing */}
      <AnimatePresence>
        {isRippleActive && (
          <motion.div
            key={`ripple-${rippleKey}`}
            className="pointer-events-none fixed inset-0 z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
              <WaterRipplePlane
                active={true}
                duration={4.0}
                intensity={0.9}
                onCompleteAction={handleRippleComplete}
              />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING SCREEN LAYER: z-[90] - Fades out during ripple */}
      <AnimatePresence>
        {isLoaderVisible && (
          <motion.div
            key="loader-overlay"
            className="pointer-events-auto fixed inset-0 z-90 overflow-hidden bg-[#050505]"
            aria-label="Loading portfolio"
            aria-live="polite"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "rippling" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: phase === "rippling" ? 1.2 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Blueprint Grid Background */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: phase === "rippling" ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="pointer-events-none absolute right-0 left-0 h-px"
                style={{
                  top: "33.333%",
                  background: "rgba(255,255,255,0.03)",
                  originX: 0,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              />
              <motion.div
                className="pointer-events-none absolute right-0 left-0 h-px"
                style={{
                  top: "66.666%",
                  background: "rgba(255,255,255,0.03)",
                  originX: 1,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              />
              <motion.div
                className="pointer-events-none absolute top-0 bottom-0 w-px"
                style={{
                  left: "33.333%",
                  background: "rgba(255,255,255,0.025)",
                  originY: 0,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              />
              <motion.div
                className="pointer-events-none absolute top-0 bottom-0 w-px"
                style={{
                  left: "66.666%",
                  background: "rgba(255,255,255,0.025)",
                  originY: 1,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.14, ease: EASE }}
              />

              {phase !== "rippling" && (
                <motion.div
                  className="pointer-events-none absolute right-0 left-0 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                  }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{
                    duration: 4.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </motion.div>

            {/* Metadata Labels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "rippling" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.22em] text-white/20 select-none"
            >
              SYS.IDENTITY // v2.0
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "rippling" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 right-7 text-right font-mono text-[8px] tracking-[0.22em] text-white/20 select-none"
            >
              SCALE_0.40 // CAD_REV
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "rippling" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-7 font-mono text-[8px] tracking-[0.22em] text-white/15 select-none"
            >
              LOC.X200 // Y200
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "rippling" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute right-7 bottom-6 text-right font-mono text-[8px] tracking-[0.22em] text-white/15 select-none"
            >
              MONOCHROME_SYSTEM
            </motion.div>

            {/* Center Content: Logo + Loader */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  phase === "rippling"
                    ? { scale: 1.05, opacity: 0 }
                    : { opacity: 1, scale: 1 }
                }
                transition={
                  phase === "rippling"
                    ? { duration: 0.6, ease: "easeOut" }
                    : { duration: 0.5 }
                }
                className="relative"
              >
                <BlueprintP
                  triggerRipple={phase === "rippling"}
                  shouldReduceMotion={shouldReduceMotion}
                />

                <div
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background:
                      "radial-gradient(circle 90px at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={
                  phase === "rippling"
                    ? { opacity: 0, y: 10 }
                    : { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="flex w-48 flex-col items-center gap-3.5"
              >
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase select-none">
                  CONSTRUCTING IDENTITY
                </span>

                <div className="w-full space-y-2">
                  <div
                    className="relative h-px w-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-white/70 transition-[width] duration-100 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[8px] tracking-widest text-white/20 uppercase">
                    <span>LOADING</span>
                    <span className="text-white/40">
                      {Math.round(progress).toString().padStart(3, "0")}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
