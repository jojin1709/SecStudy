"use client";

import {
  ArrowUpRight,
  Award,
  Bug,
  Code2,
  Compass,
  Github,
  Globe,
  HeartHandshake,
  Linkedin,
  MapPin,
  ShieldCheck,
} from "lucide-react";

interface AboutViewProps {
  totalResources: number;
  totalRoadmaps: number;
  onStartPathways: () => void;
}

const HIGHLIGHTS = [
  {
    badge: "NASA VDP",
    title: "NASA Security Recognition",
    detail:
      "Received an official recognition letter from NASA's Vulnerability Disclosure Program for responsibly disclosing a security vulnerability.",
  },
  {
    badge: "YesWeHack #1 HoF",
    title: "€900+ Bug Bounty Rewards & Comet Badge",
    detail:
      "10+ accepted reports including a Critical IDOR (CVSS 9.6), Business Logic (CWE-840), Race Condition (CWE-364), and #1 Hall of Fame on a private YesWeHack program.",
  },
  {
    badge: "ECSoC 2026",
    title: "Elite Coders Summer of Code — Top 500",
    detail:
      "Selected among the Top 500 Winners of ECSoC 2026 for open-source contributions, GitHub workflows, and real-world software engineering.",
  },
  {
    badge: "AppSec & CTFs",
    title: "Intigriti & YesWeHack Dojo Solver",
    detail:
      "Solved complex security challenges including Intigriti 0926 (UNION SQLi) and YesWeHack Dojo #55 & #56 (MIME Parser Differential & Config Injection RCE).",
  },
];

export function AboutView({
  totalResources,
  totalRoadmaps,
  onStartPathways,
}: AboutViewProps) {
  return (
    <div className="space-y-5">
      {/* Creator Profile Card */}
      <section className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)] sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              src="/images/jojin-john.jpg"
              alt="JOJIN JOHN"
              className="h-24 w-24 shrink-0 rounded-2xl border border-[#EAE6DD] object-cover shadow-sm"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#EAE6DD] bg-[#F4F2EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#4F46E5]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Creator of SecStudy
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
                JOJIN JOHN
              </h1>
              <p className="mt-1 text-sm font-medium text-stone-700">
                AI-Native Vibe Coder | Software Engineer | Cybersecurity
                Researcher
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Thrissur, Kerala, India
                </span>
                <span>·</span>
                <span>BCA Student · ELIMS College of Arts and Science</span>
                <span>·</span>
                <span>Tinos Software and Security Solutions LLP</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://www.linkedin.com/in/jojin-john/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0958a8]"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://www.jojinjohn.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-4 py-2.5 text-xs font-semibold text-stone-800 transition hover:bg-[#EAE6DD]"
            >
              <Globe className="h-4 w-4 text-[#4F46E5]" />
              jojinjohn.me
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://github.com/jojin1709"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-4 py-2.5 text-xs font-semibold text-stone-800 transition hover:bg-[#EAE6DD]"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Why I Built SecStudy (Story) */}
      <section className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)] sm:p-8">
        <h2 className="text-lg font-bold text-stone-900">
          Why I Built SecStudy — My Story
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          I&apos;m a BCA student, full-stack software engineer, and bug bounty
          researcher working at the intersection of AI-native development and
          application security. Everything I know in cybersecurity started with
          free community labs—but finding which rooms were actually free and
          what order to take them was frustrating.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-5">
            <div className="font-mono text-xs font-semibold text-[#4F46E5]">
              01 · The Frustration
            </div>
            <h3 className="mt-2 text-sm font-bold text-stone-900">
              Hundreds of links, no clear roadmap
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Beginners waste weeks jumping between random TryHackMe rooms,
              Hack The Box boxes, VulnHub VMs, and PortSwigger labs—often
              hitting unexpected paywalls or giving up because nobody showed
              them Step 1 -&gt; Step 2 -&gt; Step 3.
            </p>
          </div>

          <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-5">
            <div className="font-mono text-xs font-semibold text-[#4F46E5]">
              02 · Why SecStudy Exists
            </div>
            <h3 className="mt-2 text-sm font-bold text-stone-900">
              Every verified free lab in exact order
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              I built SecStudy to organize all {totalResources} genuinely free
              labs across TryHackMe, Hack The Box, VulnHub, PortSwigger (all 32
              topics), CTFs, Cloud, and Blue Team into {totalRoadmaps} clear
              pathways for getting job-ready or hunting real bug bounties.
            </p>
          </div>

          <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-5">
            <div className="font-mono text-xs font-semibold text-[#4F46E5]">
              03 · Proof That Free Works
            </div>
            <h3 className="mt-2 text-sm font-bold text-stone-900">
              From free labs to NASA &amp; €900+ bounties
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Using free labs like PortSwigger Web Security Academy, TryHackMe,
              and CTFs, I went on to earn €900+ on YesWeHack, hit #1 in a
              private Hall of Fame, and earn a NASA VDP recognition letter—all
              without paying for pricey bootcamps.
            </p>
          </div>
        </div>
      </section>

      {/* Real Security & Engineering Highlights */}
      <section className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)] sm:p-8">
        <div className="flex items-center gap-2 text-stone-900">
          <Award className="h-5 w-5 text-[#4F46E5]" />
          <h2 className="text-lg font-bold">
            Security Research &amp; Engineering Milestones
          </h2>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-4"
            >
              <span className="inline-block rounded-full border border-[#EAE6DD] bg-white px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#4F46E5]">
                {item.badge}
              </span>
              <h3 className="mt-2 text-sm font-bold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Core Tech & Security Focus */}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#EAE6DD] bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
              <Code2 className="h-4 w-4 text-[#4F46E5]" />
              Engineering &amp; AI-Native Stack
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[
                "TypeScript",
                "React / Next.js",
                "Node.js",
                "Python",
                "C# / .NET",
                "Rust",
                "AI Agents & LLMs",
                "Docker & CI/CD",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-[#EAE6DD] bg-[#F4F2EC] px-2.5 py-0.5 text-[11px] font-medium text-stone-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#EAE6DD] bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
              <Bug className="h-4 w-4 text-rose-600" />
              Security Research Focus
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[
                "Web & API Security",
                "IDOR & Access Control",
                "Business Logic (CWE-840)",
                "Race Conditions (CWE-364)",
                "Account Takeover",
                "Burp Suite",
                "Responsible Disclosure",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-[#EAE6DD] bg-[#F4F2EC] px-2.5 py-0.5 text-[11px] font-medium text-stone-700"
                >
                  {s}
                </span>
              ))}
            </div>
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
                Open to Full-Stack, AppSec, Pentester &amp; Security Analyst
                Opportunities
              </h2>
              <p className="mt-1 text-xs text-stone-600">
                Want to collaborate, discuss bug bounty, or suggest new free
                labs for SecStudy? Let&apos;s connect on LinkedIn.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onStartPathways}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-4 py-2 text-xs font-semibold text-stone-800 transition hover:bg-[#EAE6DD]"
            >
              <Compass className="h-3.5 w-3.5" />
              Start Pathways
            </button>
            <a
              href="https://www.linkedin.com/in/jojin-john/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Connect on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
