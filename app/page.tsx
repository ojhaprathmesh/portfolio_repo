"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HeroAboutScroll } from "@/components/hero-about-scroll"
import Experience from "@/components/sections/Experience"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import Achievements from "@/components/sections/Achievements"
import CodingProfiles from "@/components/sections/CodingProfiles"
import Resume from "@/components/sections/Resume"
import Contact from "@/components/sections/Contact"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [transitionPhase, setTransitionPhase] = useState<"loading" | "ripple" | "done">("loading")

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual"
      }
      window.scrollTo(0, 0)

      if (window.location.hash) {
        try {
          window.history.replaceState(null, "", window.location.pathname + window.location.search)
        } catch (e) {
          // ignore
        }
      }

      const t1 = setTimeout(() => window.scrollTo(0, 0), 50)
      const t2 = setTimeout(() => window.scrollTo(0, 0), 150)
      const t3 = setTimeout(() => window.scrollTo(0, 0), 350)
      const t4 = setTimeout(() => window.scrollTo(0, 0), 600)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
        clearTimeout(t4)
      }
    }
  }, [])

  const handleStartTransition = () => {
    // CRITICAL: Landing page fade starts EXACTLY when ripple starts
    setTransitionPhase("ripple")
  }

  const handleComplete = () => {
    setTransitionPhase("done")
    setIsLoading(false)
  }

  // Determine visibility based on phase
  const isRippleActive = transitionPhase === "ripple"
  const isLandingVisible = transitionPhase === "ripple" || transitionPhase === "done"

  return (
    <>
      <LoadingScreen
        onStartTransition={handleStartTransition}
        onComplete={handleComplete}
      />

      {/* 
        LANDING PAGE LAYER: z-[1]
        
        TIMING STRATEGY:
        - Phase "loading": Landing is at opacity 0, completely hidden behind loader
        - Phase "ripple": Landing fades in from 0 → 1, becoming visible THROUGH the ripple distortion
        - Phase "done": Landing at opacity 1, fully visible
        
        The landing page fade starts 400ms AFTER the ripple begins, so the loader
        has time to start dissolving before the landing becomes visible. This creates
        the effect that the landing page is emerging from within the ripple itself.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLandingVisible ? 1 : 0 }}
        transition={{ 
          duration: 2.4,  // Longer fade for smoother emergence
          ease: [0.16, 1, 0.3, 1],
          delay: isLandingVisible ? 0.4 : 0  // CRITICAL: 400ms delay so loader dissolves first
        }}
        style={{
          position: "relative",
          zIndex: 1,
          background: "#050505",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar isVisible={!isLoading} />
          <main>
            <HeroAboutScroll />
            <Experience />
            <Projects />
            <Skills />
            <TechMarquee />
            <Achievements />
            <CodingProfiles />
            <Resume />
            <Contact />
            <Footer />
          </main>
        </SmoothScroll>
      </motion.div>
    </>
  )
}
