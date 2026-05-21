// filepath: components/navbar.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { navItems, profile } from "@/data"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  isVisible?: boolean
}

export function Navbar({ isVisible = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver to set activeSection based on scrolling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section occupies the upper-middle of viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Track each section that corresponds to a nav item plus the hero
    const sections = ["hero", ...navItems.map((item) => item.href.replace("#", ""))]
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled
                ? "bg-[#050505]/75 backdrop-blur-md border-b border-white/[0.06] py-3.5"
                : "bg-transparent py-6"
            }`}
          >
            <nav className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="group flex items-center gap-2 select-none"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-white/60 group-hover:text-white transition-colors duration-300">
                  {profile.initials}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#00E5FF] group-hover:scale-150 transition-transform duration-300" />
              </a>

              {/* Desktop Navigation Links */}
              <ul className="hidden xl:flex items-center gap-7">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "")
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`group relative font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                          isActive ? "text-white font-medium" : "text-white/45 hover:text-white"
                        }`}
                      >
                        <span className="text-[#3B82F6] mr-1.5 opacity-90">{item.index}</span>
                        {item.label}
                        
                        {/* Dynamic underline */}
                        <span
                          className={`absolute -bottom-1.5 left-0 h-px bg-white transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Status Indicator */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/45 uppercase select-none">
                  {profile.availability}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden text-white/65 hover:text-white transition-colors p-1"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl xl:hidden flex flex-col justify-center"
          >
            <nav className="flex flex-col items-center justify-center gap-8 py-12 px-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: index * 0.05, ease: "easeOut" }}
                    onClick={() => scrollToSection(item.href)}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <span className="font-mono text-xs text-[#3B82F6] tracking-[0.25em]">{item.index}</span>
                    <span
                      className={`text-2xl font-light tracking-widest uppercase transition-colors ${
                        isActive ? "text-[#00E5FF]" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-2.5 mt-8 border border-white/[0.06] px-4 py-2 rounded-full bg-white/[0.02]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.18em] text-white/50 uppercase">
                  {profile.availability}
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
