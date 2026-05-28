// filepath: components/hero.tsx
"use client"

import { Text } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight,Download } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

import { GithubIcon } from "@/components/icons/lucide-github"
import { LinkedinIcon } from "@/components/icons/lucide-linkedin"
import { TwitterIcon } from "@/components/icons/lucide-twitter"
import { Sphere } from "@/components/sentient-sphere"
import { heroSocialLinks,profile } from "@/data"
import { useIsMobile } from "@/hooks/use-mobile"

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<any>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
}

// ─── 3D Scene Wrapper ────────────────────────────────────────────────────────
interface HeroSceneProps {
  isMobile: boolean
}

function HeroScene({
  isMobile,
}: HeroSceneProps) {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 8, 8]} intensity={1.5} />
      <pointLight position={[-8, -8, -8]} intensity={0.4} />

      {/* Large Ghosted Wordmark in 3D scene (parallax background) */}
      <Text
        position={[0, 0.15, -2.5]}
        fontSize={isMobile ? 0.7 : 1.4}
        color="#ffffff"
        fillOpacity={0.012} // very faint ghost
        strokeWidth={isMobile ? 0.003 : 0.005}
        strokeColor="#ffffff"
        strokeOpacity={0.03}
        letterSpacing={0.12}
        textAlign="center"
      >
        PRATHMESH
      </Text>
    </>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const [isInView, setIsInView] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.01 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [mounted])

  const THEME_COLOR = "#FFFFFF"

  // Parallax scroll transforms for overlay text
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 0.55], ["0%", "-8%"])

  const headlineWords = profile.headline
    .replace(/\.$/, "")
    .split(". ")
    .filter(Boolean)

  const scrollToProjects = () => {
    const el = document.querySelector("#projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#050505" }}
      aria-label="Hero section"
    >
      {/* ── 3D Cybernetic Canvas Background ── */}
      <div className="absolute inset-0 w-full h-full z-0 select-none" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          gl={{ antialias: true, alpha: true, depth: true, powerPreference: "high-performance" }}
          frameloop={isInView ? "always" : "never"}
        >
          <Sphere isMobile={isMobile} />
          <HeroScene
            isMobile={isMobile}
          />
        </Canvas>
      </div>

      {/* ── Gradient vignette overlay (baked depth contrast) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(5,5,5,0.45) 75%, rgba(5,5,5,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main text content ── */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-12 pointer-events-none"
      >
        <div className="text-center max-w-5xl w-full">
          {/* Section counter + availability */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span
              className="font-mono text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "#5F5F5F" }}
            >
              01 — Portfolio
            </span>
            <span style={{ color: "#333333" }}>·</span>
            <span className="relative flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40"
                  style={{ background: THEME_COLOR }}
                />
                <span
                  className="relative inline-flex rounded-full h-1.5 w-1.5 opacity-70"
                  style={{ background: THEME_COLOR }}
                />
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "#5F5F5F" }}
              >
                {profile.availability}
              </span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="font-sans font-light tracking-tight leading-[0.9] mb-6 select-none">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.85,
                  delay: 0.22 + index * 0.14,
                  ease: EASE,
                }}
                className="inline-block"
                style={{ marginRight: index < headlineWords.length - 1 ? "0.25em" : 0 }}
              >
                <span
                  className={`text-[clamp(3rem,8vw,7rem)] ${index % 2 === 1 ? "italic" : ""}`}
                  style={{
                    color: index % 2 === 1 ? "rgba(245,245,245,0.72)" : "#F5F5F5",
                  }}
                >
                  {word}
                  <span style={{ color: THEME_COLOR }}>.</span>
                </span>{" "}
              </motion.span>
            ))}
          </h1>

          {/* Positioning subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82, ease: EASE }}
            className="font-mono text-sm md:text-base max-w-xl mx-auto mb-12 tracking-wide select-none"
            style={{ color: "#A7A7A7" }}
          >
            {profile.subline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 pointer-events-auto"
          >
            {/* Primary CTA — View Projects */}
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-2.5 px-7 py-3.5 font-mono text-xs tracking-[0.2em] uppercase overflow-hidden cursor-pointer"
              style={{
                background: "#F5F5F5",
                color: "#050505",
                borderRadius: "2px",
              }}
              aria-label="View Projects section"
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight
                size={13}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              <motion.div
                className="absolute inset-0"
                style={{ background: "#E0E0E0" }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Secondary CTA — Download Resume */}
            <motion.a
              href={profile.resumePath}
              download="Prathmesh_Ojha_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-2.5 px-7 py-3.5 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#A7A7A7",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"
                e.currentTarget.style.color = "#F5F5F5"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"
                e.currentTarget.style.color = "#A7A7A7"
              }}
              aria-label="Download Resume PDF"
            >
              <Download
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
            className="flex items-center justify-center gap-6 pointer-events-auto"
          >
            {heroSocialLinks.map((link, index) => {
              const Icon = SOCIAL_ICON_MAP[link.icon ?? ""] ?? ArrowRight
              return (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.25 + index * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="group flex items-center gap-1.5 transition-colors duration-300"
                  style={{ color: "#5F5F5F" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F5F5F5"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5F5F5F"
                  }}
                  aria-label={`Visit ${link.label} profile`}
                >
                  <Icon size={15} strokeWidth={1.5} />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                    {link.label}
                  </span>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none"
        aria-hidden="true"
      >
        <motion.span
          className="font-mono text-[9px] tracking-[0.38em] uppercase"
          style={{ color: "#5F5F5F" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1.5} style={{ color: "#5F5F5F" }} />
        </motion.div>
      </motion.div>

      {/* ── Corner decorative labels ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-8 left-8 z-10 font-mono text-[9px] tracking-[0.3em] uppercase hidden md:block select-none"
        style={{ color: "#333333" }}
        aria-hidden="true"
      >
        {new Date().getFullYear()}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-8 right-8 z-10 font-mono text-[9px] tracking-[0.3em] uppercase hidden md:block select-none"
        style={{ color: "#333333" }}
        aria-hidden="true"
      >
        prathmesh ojha
      </motion.div>


    </section>
  )
}
