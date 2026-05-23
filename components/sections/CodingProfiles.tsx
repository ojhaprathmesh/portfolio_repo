"use client";

import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ConnectStrip } from "@/components/coding/ConnectStrip";
import { CoreSkillsTable } from "@/components/coding/CoreSkillsTable";
import { DeveloperProfileBlock } from "@/components/coding/DeveloperProfileBlock";
import { GitHubPanel } from "@/components/coding/GitHubPanel";
import { GitHubPanelSkeleton } from "@/components/coding/GitHubPanelSkeleton";
import { LeetCodePanel } from "@/components/coding/LeetCodePanel";
import { LeetCodePanelSkeleton } from "@/components/coding/LeetCodePanelSkeleton";
import { TechStackIcons } from "@/components/coding/TechStackIcons";
import { TopLanguagesChart } from "@/components/coding/TopLanguagesChart";
import { useCodingStats } from "@/hooks/use-coding-stats";

export default function CodingProfiles() {
  const { data, isLoading, error } = useCodingStats();

  const lastSynced =
    data?.github?.fetchedAt || data?.leetcode?.fetchedAt
      ? new Date(
          data.github?.fetchedAt && data.leetcode?.fetchedAt
            ? data.github.fetchedAt > data.leetcode.fetchedAt
              ? data.github.fetchedAt
              : data.leetcode.fetchedAt
            : (data.github?.fetchedAt ?? data.leetcode?.fetchedAt ?? ""),
        ).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : null;

  return (
    <section
      id="coding"
      className="py-24 md:py-36 bg-[#050505] border-t border-white/[0.02]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionHeading
            number="06"
            title="Coding Profiles"
            subtitle="GitHub & LeetCode presence — live stats, activity graph, streaks, and the stack behind the builds."
          />
        </AnimatedSection>

        {error && !isLoading && (
          <p className="mt-6 font-mono text-[10px] tracking-wider text-[#A7A7A7]">
            Signal degraded — showing available data.
          </p>
        )}

        <div className="mt-14 md:mt-20 space-y-8 md:space-y-10">
          <AnimatedSection delay={0.05}>
            <ConnectStrip />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection delay={0.08}>
              <DeveloperProfileBlock />
            </AnimatedSection>

            <div className="space-y-6">
              {isLoading ? (
                <>
                  <GitHubPanelSkeleton />
                  <LeetCodePanelSkeleton />
                </>
              ) : (
                <>
                  {data?.github && (
                    <AnimatedSection delay={0.1}>
                      <GitHubPanel stats={data.github} />
                    </AnimatedSection>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {!isLoading &&
              data?.github &&
              data.github.topLanguages.length > 0 && (
                <AnimatedSection delay={0.14}>
                  <TopLanguagesChart languages={data.github.topLanguages} />
                </AnimatedSection>
              )}

            {isLoading ? (
              <LeetCodePanelSkeleton />
            ) : (
              data?.leetcode && (
                <AnimatedSection delay={0.12}>
                  <LeetCodePanel stats={data.leetcode} />
                </AnimatedSection>
              )
            )}
          </div>

          <AnimatedSection delay={0.15}>
            <TechStackIcons />
          </AnimatedSection>

          <AnimatedSection delay={0.16}>
            <CoreSkillsTable />
          </AnimatedSection>
        </div>

        {lastSynced && !isLoading && (
          <p className="mt-10 font-mono text-[9px] tracking-widest uppercase text-[#5F5F5F]">
            Section last synced {lastSynced}
          </p>
        )}
      </div>
    </section>
  );
}
