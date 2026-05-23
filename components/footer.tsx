// filepath: components/footer.tsx
"use client"

import { useEffect,useState } from "react"

import { profile, socialLinks } from "@/data"

export function Footer() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-[#050505] border-t border-white/[0.04] py-8 select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Local Time */}
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/40">
            <span className="mr-2.5">{profile.timezone} //</span>
            <span className="text-white/60 tabular-nums">{time}</span>
          </div>

          {/* Social Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
