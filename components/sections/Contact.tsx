// filepath: components/sections/Contact.tsx
"use client"

import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { profile, contactLinks } from "@/data"
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Globe, Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="08"
            title="Get In Touch"
            subtitle="Let's build something next-gen. I am open to internships, collaboration, and contract work."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-14 md:mt-20 items-start">
          
          {/* Main CTA & Email */}
          <div className="md:col-span-8 space-y-8">
            <h3 className="text-2xl md:text-3xl font-light text-white leading-tight max-w-lg">
              Have an idea or an open position? Let&apos;s start a conversation.
            </h3>
            
            <div>
              <span className="block font-mono text-[9px] tracking-[0.25em] text-[#3B82F6] uppercase mb-2 select-none">
                Direct Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 text-xl md:text-2xl font-mono text-white/70 hover:text-[#00E5FF] transition-colors duration-300"
              >
                <span>{profile.email}</span>
                <ArrowUpRight size={20} className="text-white/20 group-hover:text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Socials & Location Metadata */}
          <div className="md:col-span-4 space-y-8">
            
            {/* Social Links List */}
            <div>
              <span className="block font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase mb-4 select-none">
                Follow / Connect
              </span>
              <div className="flex flex-col gap-3.5">
                {contactLinks.map((link) => {
                  const Icon = ICON_MAP[link.icon || ""] || Globe
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 font-mono text-[11px] tracking-wider text-white/50 hover:text-white transition-colors"
                    >
                      <Icon size={14} className="text-white/30 group-hover:text-[#00E5FF] transition-colors" />
                      <span>{link.label}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Availability and timezone metadata */}
            <div className="pt-6 border-t border-white/[0.04] space-y-4">
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-white/40">
                <Globe size={13} className="text-white/20" />
                <span>Based in {profile.location}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-white/40">
                <Clock size={13} className="text-white/20" />
                <span>{profile.timezone}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
