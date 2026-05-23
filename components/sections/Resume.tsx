// filepath: components/sections/Resume.tsx
"use client"

import { Calendar, Compass,Download, FileText, GraduationCap } from "lucide-react"

import { AnimatedSection } from "@/components/common/AnimatedSection"
import { SectionHeading } from "@/components/common/SectionHeading"
import { profile } from "@/data"

export default function Resume() {
  const edu = profile.education

  return (
    <section id="resume" className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="07"
            title="Resume & Education"
            subtitle="View credentials, current degree focus, and download my latest CV."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-14 md:mt-20 items-stretch">
          
          {/* Education Details Box */}
          <div className="md:col-span-7 flex flex-col justify-between p-6 md:p-8 bg-[#0d0d0d] border border-white/[0.04] rounded-sm">
            <div>
              <div className="flex items-center gap-2 mb-6 select-none">
                <GraduationCap size={16} className="text-white/60" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase font-medium">
                  Education Profile
                </span>
              </div>

              <h3 className="text-xl font-light text-white mb-2 leading-snug">
                {edu.degree}
              </h3>
              <p className="font-mono text-sm text-white/90 mb-4">
                {edu.institution}
              </p>

              <div className="flex flex-col gap-3 font-sans text-xs text-white/60 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-white/30" />
                  <span className="font-mono">{edu.period}</span>
                </div>
                {edu.gpa && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white/50">{edu.gpa}</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Compass size={13} className="text-white/30 mt-0.5" />
                  <span>Specialization Focus: {edu.focus}</span>
                </div>
              </div>
            </div>

            {edu.details && (
              <div className="pt-4 border-t border-white/[0.03] text-[11px] font-mono leading-relaxed text-white/40">
                {edu.details}
              </div>
            )}
          </div>

          {/* Quick Download CTA Box */}
          <div className="md:col-span-5 flex flex-col justify-center items-center p-6 md:p-8 bg-white/[0.01] border border-dashed border-white/[0.08] rounded-sm text-center">
            <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mb-4 text-white/50 group-hover:text-white transition-colors">
              <FileText size={20} strokeWidth={1.5} />
            </div>

            <h4 className="text-base font-light text-white mb-2">
              Curriculum Vitae
            </h4>
            <p className="text-white/40 text-[11px] leading-relaxed mb-6 max-w-[200px] font-sans">
              Printable PDF detailing full academic history, projects list, and technology competencies.
            </p>

            <a
              href={profile.resumePath}
              download="Prathmesh_Ojha_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#F5F5F5] hover:bg-[#E0E0E0] text-[#050505] font-mono text-[10px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] select-none"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
