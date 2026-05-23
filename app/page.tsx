// filepath: app/page.tsx
"use client"

import { useState } from "react"
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

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
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
    </>
  )
}
