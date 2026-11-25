"use client";

import {
  ArrowUpRight,
  Compass,
  Github,
  HeartHandshake,
  Layers,
  Linkedin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AboutViewProps {
  totalResources: number;
  totalRoadmaps: number;
  onStartPathways: () => void;
}

export function AboutView({
  totalResources,
  totalRoadmaps,
  onStartPathways,
}: AboutViewProps) {
  return (
    <div className="space-y-5">
      {/* Creator Profile Card */}
      <section className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)] sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4 sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-sky-500 text-xl font-bold text-white shadow-md shadow-indigo-500/20">
              JJ
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#EAE6DD] bg-[#F4F2EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#4F46E5]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Creator of SecStudy
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
                JOJIN JOHN
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                Cybersecurity learner, builder, and open-resource curator.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.linkedin.com/in/jojin-john/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0958a8]"
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://github.com/jojin1709"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-4 py-2.5 text-xs font-semibold text-stone-800 transition hover:bg-[#EAE6DD]"
            >
              <Github className="h-4 w-4" />
              GitHub (@jojin1709)
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EAE6DD] bg-white p-5 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4F46E5]">
            <Compass className="h-4 w-4" />
            Clear Starting Pathways
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900">
            {totalRoadmaps} Pathways
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Step-by-step order for Jobs, Bug Bounty, Pentesting, SOC, Cloud &amp; AI.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE6DD] bg-white p-5 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <Layers className="h-4 w-4" />
            Verified Free Catalog
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900">
            {totalResources} Resources
          </div>
          <p className="mt-1 text-xs text-stone-600">
            TryHackMe, Hack The Box, VulnHub, PortSwigger, CTFs &amp; Career Prep.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE6DD] bg-white p-5 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <Sparkles className="h-4 w-4" />
            Cost to Learn
          </div>
          <div className="mt-2 text-2xl font-bold text-stone-900">
            100% Free
          </div>
          <p className="mt-1 text-xs text-stone-600">
            No login, no paywall, and your progress &amp; notes stay private in your browser.
          </p>
        </div>
      </section>

      {/* Why I Built SecStudy (Story) */}
      <section className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)] sm:p-8">
        <h2 className="text-lg font-bold text-stone-900">
          Why I Built SecStudy — My Story
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-5">
            <div className="font-mono text-xs font-semibold text-[#4F46E5]">
              01 · The Problem
            </div>
            <h3 className="mt-2 text-sm font-bold text-stone-900">
              Too many links, no clear starting point
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              When starting out in cybersecurity, it&apos;s easy to end up with
              hundreds of messy bookmarks across TryHackMe, Hack The Box,
              VulnHub, PortSwigger, and random CTF sites—never knowing which
              room is actually free or which lab to solve first.
            </p>
          </div>

          <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-5">
            <div className="font-mono text-xs font-semibold text-[#4F46E5]">
              02 · The Idea
            </div>
            <h3 className="mt-2 text-sm font-bold text-stone-900">
              One structured hub for every free lab
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              I created SecStudy to organize every genuinely free room, box,
              VulnHub VM, Bug Bounty lab, and CTF into clear numbered pathways—so
              anyone aiming for a security job or bug bounty hunting can follow
              Step 1, Step 2, Step 3 without confusion.
            </p>
          </div>

          <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-5">
            <div className="font-mono text-xs font-semibold text-[#4F46E5]">
              03 · The Mission
            </div>
            <h3 className="mt-2 text-sm font-bold text-stone-900">
              Zero barriers for learners everywhere
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              You don&apos;t need expensive subscriptions to get started in
              cybersecurity. With OpenVPN, free-tier labs, PortSwigger Academy,
              and a clear study roadmap, anyone with dedication can build real
              skills and launch their career.
            </p>
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <section className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-2.5 text-[#4F46E5]">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Want to connect, share feedback, or suggest a free lab?
              </h2>
              <p className="mt-1 text-xs text-stone-600">
                Reach out to me anytime on LinkedIn or check out the open-source
                code on GitHub.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onStartPathways}
              className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-4 py-2 text-xs font-semibold text-stone-800 transition hover:bg-[#EAE6DD]"
            >
              Start Learning →
            </button>
            <a
              href="https://www.linkedin.com/in/jojin-john/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Message on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
