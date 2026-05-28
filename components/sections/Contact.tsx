// filepath: components/sections/Contact.tsx
"use client";

import { ArrowUpRight, Clock, Globe, Mail } from "lucide-react";
import React from "react";

import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GithubIcon } from "@/components/icons/lucide-github";
import { LinkedinIcon } from "@/components/icons/lucide-linkedin";
import { TwitterIcon } from "@/components/icons/lucide-twitter";
import { contactLinks, profile } from "@/data";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  mail: Mail,
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-background border-t border-white/2 py-24 md:py-36"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="08"
            title="Get In Touch"
            subtitle="Let's build something next-gen. I am open to internships, collaboration, and contract work."
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 md:mt-20 md:grid-cols-12">
          {/* Main CTA & Email */}
          <div className="space-y-8 md:col-span-8">
            <h3 className="max-w-lg text-2xl leading-tight font-light text-white md:text-3xl">
              Have an idea or an open position? Let&apos;s start a conversation.
            </h3>

            <div>
              <span className="mb-2 block font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase select-none">
                Direct Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 font-mono text-xl text-white/70 transition-colors duration-300 hover:text-white md:text-2xl"
              >
                <span>{profile.email}</span>
                <ArrowUpRight
                  size={20}
                  className="text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                />
              </a>
            </div>
          </div>

          {/* Socials & Location Metadata */}
          <div className="space-y-8 md:col-span-4">
            {/* Social Links List */}
            <div>
              <span className="mb-4 block font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase select-none">
                Follow / Connect
              </span>
              <div className="flex flex-col gap-3.5">
                {contactLinks.map((link) => {
                  const Icon = ICON_MAP[link.icon || ""] || Globe;
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 font-mono text-[11px] tracking-wider text-white/50 transition-colors hover:text-white"
                    >
                      <Icon
                        size={14}
                        className="text-white/30 transition-colors group-hover:text-white"
                      />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability and timezone metadata */}
            <div className="space-y-4 border-t border-white/4 pt-6">
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
  );
}
