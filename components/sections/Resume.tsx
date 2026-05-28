// filepath: components/sections/Resume.tsx
"use client";

import {
  Calendar,
  Compass,
  Download,
  FileText,
  GraduationCap,
} from "lucide-react";

import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { profile } from "@/data";

export default function Resume() {
  const edu = profile.education;

  return (
    <section
      id="resume"
      className="bg-background border-t border-white/2 py-24 md:py-36"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <SectionHeading
            number="07"
            title="Resume & Education"
            subtitle="View credentials, current degree focus, and download my latest CV."
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 md:mt-20 md:grid-cols-12">
          {/* Education Details Box */}
          <div className="bg-elevated flex flex-col justify-between rounded-sm border border-white/4 p-6 md:col-span-7 md:p-8">
            <div>
              <div className="mb-6 flex items-center gap-2 select-none">
                <GraduationCap size={16} className="text-white/60" />
                <span className="font-mono text-[10px] font-medium tracking-[0.25em] text-white/60 uppercase">
                  Education Profile
                </span>
              </div>

              <h3 className="mb-2 text-xl leading-snug font-light text-white">
                {edu.degree}
              </h3>
              <p className="mb-4 font-mono text-sm text-white/90">
                {edu.institution}
              </p>

              <div className="mb-6 flex flex-col gap-3 font-sans text-xs text-white/60">
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
                  <Compass size={13} className="mt-0.5 text-white/30" />
                  <span>Specialization Focus: {edu.focus}</span>
                </div>
              </div>
            </div>

            {edu.details && (
              <div className="border-t border-white/3 pt-4 font-mono text-[11px] leading-relaxed text-white/40">
                {edu.details}
              </div>
            )}
          </div>

          {/* Quick Download CTA Box */}
          <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-white/8 bg-white/1 p-6 text-center md:col-span-5 md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/4 bg-white/2 text-white/50 transition-colors group-hover:text-white">
              <FileText size={20} strokeWidth={1.5} />
            </div>

            <h4 className="mb-2 text-base font-light text-white">
              Curriculum Vitae
            </h4>
            <p className="mb-6 max-w-50 font-sans text-[11px] leading-relaxed text-white/40">
              Printable PDF detailing full academic history, projects list, and
              technology competencies.
            </p>

            <a
              href={profile.resumePath}
              download="Prathmesh_Ojha_Resume.pdf"
              className="bg-foreground hover:bg-foreground/90 text-background flex w-full transform items-center justify-center gap-2 rounded-sm py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 select-none hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
