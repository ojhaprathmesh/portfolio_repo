// filepath: app/page.tsx
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
  const [hasStartedReveal, setHasStartedReveal] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force manual scroll restoration so the browser does not jump down on refresh
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual"
      }
      // Force reset page position to the top
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <LoadingScreen
        onStartTransition={() => setHasStartedReveal(true)}
        onComplete={() => setIsLoading(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: "blur(2px)" }}
        animate={hasStartedReveal ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
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
