"use client";

import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark,
  BookOpen,
  Compass,
  Flag,
  LayoutGrid,
  List,
  Menu,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
  X,
} from "lucide-react";
import { AboutView } from "@/components/AboutView";
import { ResourceCard } from "@/components/ResourceCard";
import { ResourceDetailModal } from "@/components/ResourceDetailModal";
import { ResourceTable } from "@/components/ResourceTable";
import { RoadmapView } from "@/components/RoadmapView";
import { STUDY_ROADMAPS } from "@/data/roadmaps";
import {
  ActiveNav,
  getNavFromPathname,
  getSectionByNav,
} from "@/data/routes";
import { useCyberVault } from "@/hooks/useCyberVault";
import {
  Category,
  CyberResource,
  Difficulty,
  LearningStage,
  Platform,
  ProgressStatus,
} from "@/types/resource";

type ViewMode = "grid" | "list";
type StatusFilter = "all" | ProgressStatus;
type SortOption = "recommended" | "difficulty" | "title" | "status";

const STAGES: ("All" | LearningStage)[] = [
  "All",
  "Stage 1: Foundations & OS",
  "Stage 2: Networking & Core Tools",
  "Stage 3: Easy CTFs & Boot2Root",
  "Stage 4: Web & Bug Bounty",
  "Stage 5: AD, Medium & Pivoting",
  "Stage 6: VulnHub Offline VMs",
  "Stage 7: Blue Team, SOC & Cloud",
  "Stage 8: Pwn, Crypto & Career",
];

const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Fundamentals & OS",
  "Networking",
  "Web & Bug Bounty",
  "Linux & PrivEsc",
  "Windows & AD",
  "CTF Challenges",
  "Cryptography",
  "Binary & Pwn",
  "OSINT & Forensics",
  "Defensive & SOC",
  "Cloud Security",
  "Mobile Security",
  "AI & LLM Security",
  "Web3 & Smart Contracts",
  "Career & Cert Prep",
  "Tools & Cheat Sheets",
];

const DIFFICULTIES: ("All" | Difficulty)[] = [
  "All",
  "Beginner",
  "Easy",
  "Medium",
  "Hard",
];

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  Beginner: 1,
  Easy: 2,
  Medium: 3,
  Hard: 4,
};

const STATUS_RANK: Record<ProgressStatus, number> = {
  in_progress: 1,
  todo: 2,
  completed: 3,
};

const NAV_TITLES: Record<ActiveNav, { title: string; subtitle: string }> = {
  all: {
    title: "All Free Resources",
    subtitle:
      "640+ TryHackMe rooms, HTB labs, VulnHub VMs, Bug Bounty, Android, Web3, AI, Cloud & Career tracks.",
  },
  TryHackMe: {
    title: "TryHackMe Free Rooms & Paths",
    subtitle:
      "Pre Security & Cyber 101 foundations, Linux/Windows PrivEsc, AD, Wreath & 25+ free CTFs.",
  },
  "Hack The Box": {
    title: "Hack The Box Free Labs",
    subtitle:
      "Starting Point Tier 0-2, Active Machines Pool, Challenges & 58 Tier 0 Academy modules.",
  },
  VulnHub: {
    title: "VulnHub Free Offline VMs",
    subtitle:
      "22 downloadable OSCP-style VirtualBox/VMware Boot2Root labs (Kioptrix 1-5, DC 1-3, Stapler, Symfonos, CyberSploit 1-2, Sunset series).",
  },
  "Bug Bounty & Web": {
    title: "Bug Bounty & Web AppSec",
    subtitle:
      "PortSwigger Academy tracks, Hacker101 private invites, Juice Shop, PentesterLab & Hacktivity.",
  },
  "CTFs & Wargames": {
    title: "Free CTFs, Pwn, Crypto & OSINT",
    subtitle:
      "OverTheWire, PicoCTF, CryptoHack, pwn.college, Crackmes.one, Microcorruption & Sofia Santos.",
  },
  "Blue Team & Cloud": {
    title: "Blue Team, SOC, Cloud & AD Labs",
    subtitle:
      "LetsDefend, CyberDefenders, BTLO, KC7 Cyber, SadServers, flaws.cloud, CloudGoat & GOAD.",
  },
  "Tools & Career Prep": {
    title: "Career Certs, Job Prep & Tools",
    subtitle:
      "Cisco NetAcad, ISC2 CC, Antisyphon ($0 PWYC), OWASP WSTG, GTFOBins, HackTricks & Burp.",
  },
  bookmarked: {
    title: "Bookmarked Resources",
    subtitle: "Your saved rooms, labs, and cheat sheets for quick access.",
  },
  in_progress: {
    title: "Currently In Progress",
    subtitle: "Active rooms and labs you are currently working through.",
  },
  roadmaps: {
    title: "Start Here: Guided Pathways",
    subtitle:
      "7 structured zero-cost pathways showing exactly where to start and which lab to do next.",
  },
  playbook: {
    title: "Free Access Playbook",
    subtitle:
      "Practical guide to accessing TryHackMe & Hack The Box labs for free.",
  },
  about: {
    title: "About & Creator Story",
    subtitle: "Meet JOJIN JOHN — why SecStudy was built and how to connect.",
  },
};

const PLATFORM_NAV_ITEMS: {
  nav: Platform;
  label: string;
  dotColor: string;
}[] = [
  { nav: "TryHackMe", label: "TryHackMe", dotColor: "bg-rose-500" },
  { nav: "Hack The Box", label: "Hack The Box", dotColor: "bg-emerald-500" },
  { nav: "VulnHub", label: "VulnHub VMs", dotColor: "bg-orange-500" },
  {
    nav: "Bug Bounty & Web",
    label: "Bug Bounty & Web",
    dotColor: "bg-violet-500",
  },
  {
    nav: "CTFs & Wargames",
    label: "CTFs & Wargames",
    dotColor: "bg-sky-500",
  },
  {
    nav: "Blue Team & Cloud",
    label: "Blue Team & Cloud",
    dotColor: "bg-teal-500",
  },
  {
    nav: "Tools & Career Prep",
    label: "Career & Tools",
    dotColor: "bg-amber-500",
  },
];

export function SecStudyWorkspace({
  initialNav = "roadmaps",
}: {
  initialNav?: ActiveNav;
}) {
  const {
    allResources,
    stats,
    getProgress,
    setStatus,
    cycleStatus,
    toggleBookmark,
    saveNotes,
    deleteCustomResource,
  } = useCyberVault();

  const [activeNav, setActiveNav] = useState<ActiveNav>(initialNav);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<"All" | LearningStage>(
    "All"
  );
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>(
    "All"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "All" | Difficulty
  >("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const [selectedResource, setSelectedResource] =
    useState<CyberResource | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setActiveNav(getNavFromPathname(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const resourcesById = useMemo(() => {
    const map = new Map<string, CyberResource>();
    for (const r of allResources) {
      map.set(r.id, r);
    }
    return map;
  }, [allResources]);

  const platformCounts = useMemo(() => {
    const counts: Record<Platform, number> = {
      TryHackMe: 0,
      "Hack The Box": 0,
      VulnHub: 0,
      "Bug Bounty & Web": 0,
      "CTFs & Wargames": 0,
      "Blue Team & Cloud": 0,
      "Tools & Career Prep": 0,
    };
    for (const r of allResources) {
      counts[r.platform] += 1;
    }
    return counts;
  }, [allResources]);

  const isCatalogView =
    activeNav !== "roadmaps" &&
    activeNav !== "playbook" &&
    activeNav !== "about";

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = allResources.filter((item) => {
      if (
        activeNav === "TryHackMe" ||
        activeNav === "Hack The Box" ||
        activeNav === "VulnHub" ||
        activeNav === "Bug Bounty & Web" ||
        activeNav === "CTFs & Wargames" ||
        activeNav === "Blue Team & Cloud" ||
        activeNav === "Tools & Career Prep"
      ) {
        if (item.platform !== activeNav) return false;
      }

      const progress = getProgress(item.id);
      if (activeNav === "bookmarked" && !progress.bookmarked) return false;
      if (activeNav === "in_progress" && progress.status !== "in_progress") {
        return false;
      }

      if (selectedStage !== "All" && item.stage !== selectedStage) {
        return false;
      }
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (
        selectedDifficulty !== "All" &&
        item.difficulty !== selectedDifficulty
      ) {
        return false;
      }
      if (statusFilter !== "all" && progress.status !== statusFilter) {
        return false;
      }

      if (q) {
        const haystack = [
          item.title,
          item.platform,
          item.category,
          item.resourceType,
          item.description,
          ...item.skills,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "difficulty") {
        return DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "status") {
        return (
          STATUS_RANK[getProgress(a.id).status] -
          STATUS_RANK[getProgress(b.id).status]
        );
      }
      return a.recommendedOrder - b.recommendedOrder;
    });
  }, [
    allResources,
    activeNav,
    searchQuery,
    selectedStage,
    selectedCategory,
    selectedDifficulty,
    statusFilter,
    sortBy,
    getProgress,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedStage !== "All" ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All" ||
    statusFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedStage("All");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setStatusFilter("all");
    setSortBy("recommended");
  };

  const selectNav = (nav: ActiveNav) => {
    setActiveNav(nav);
    setMobileMenuOpen(false);
    const route = getSectionByNav(nav);
    if (route && typeof window !== "undefined") {
      const nextPath = `/${route.slug}`;
      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, "", nextPath);
      }
      document.title = route.title;
    }
  };

  const handleLinkNavClick = (e: MouseEvent<HTMLAnchorElement>, nav: ActiveNav) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    selectNav(nav);
  };

  const navItemClass = (nav: ActiveNav) =>
    `flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium transition ${
      activeNav === nav
        ? "bg-[#4F46E5] text-white shadow-sm"
        : "text-stone-600 hover:bg-[#F4F2EC] hover:text-stone-900"
    }`;

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-1">
          <a
            href="/"
            onClick={(e) => handleLinkNavClick(e, "roadmaps")}
            className="flex items-center gap-2.5"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect width="64" height="64" rx="14" fill="#0B1120" />
              <polygon points="34,14 51,14 34,25" fill="#FFFFFF" />
              <polygon points="17,24 30,16 30,27 17,35" fill="#FFFFFF" />
              <polygon
                points="18,37.5 31,29.5 46,32.5 33,40.5"
                fill="#FFFFFF"
              />
              <polygon
                points="34,42.5 47,34.5 47,45.5 34,53.5"
                fill="#FFFFFF"
              />
              <polygon points="30,42.5 30,53.5 13,53.5" fill="#FFFFFF" />
            </svg>
            <div>
              <div className="text-base font-bold leading-tight tracking-tight text-[#0B1120]">
                SecStudy
              </div>
              <div className="text-xs text-[#64748B]">Free Security Hub</div>
            </div>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-900/5 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Widget */}
        <div className="rounded-2xl border border-[#EAE6DD] bg-[#F4F2EC] p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-stone-600">Your Progress</span>
            <span className="font-mono font-semibold text-[#4F46E5]">
              {stats.completed}/{stats.total}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#EAE6DD]">
            <div
              className="h-full rounded-full bg-[#4F46E5] transition-all duration-300"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
            <span>{stats.percent}% completed</span>
            <span>{stats.inProgress} active</span>
          </div>
        </div>

        {/* Start Here */}
        <div>
          <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            Start Here
          </div>
          <nav className="space-y-1">
            <a
              href="/roadmaps"
              onClick={(e) => handleLinkNavClick(e, "roadmaps")}
              className={navItemClass("roadmaps")}
            >
              <span className="flex items-center gap-2.5">
                <Compass className="h-4 w-4" />
                Guided Pathways
              </span>
              <span
                className={`font-mono text-[11px] ${
                  activeNav === "roadmaps"
                    ? "text-indigo-100"
                    : "text-stone-400"
                }`}
              >
                {STUDY_ROADMAPS.length}
              </span>
            </a>

            <a
              href="/free-playbook"
              onClick={(e) => handleLinkNavClick(e, "playbook")}
              className={navItemClass("playbook")}
            >
              <span className="flex items-center gap-2.5">
                <Flag className="h-4 w-4" />
                Free Access Guide
              </span>
            </a>

            <a
              href="/about"
              onClick={(e) => handleLinkNavClick(e, "about")}
              className={navItemClass("about")}
            >
              <span className="flex items-center gap-2.5">
                <User className="h-4 w-4" />
                About &amp; My Story
              </span>
            </a>
          </nav>
        </div>

        {/* Platforms */}
        <div>
          <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            Platforms
          </div>
          <nav className="space-y-1">
            <a
              href="/resources"
              onClick={(e) => handleLinkNavClick(e, "all")}
              className={navItemClass("all")}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4" />
                Explore All
              </span>
              <span
                className={`font-mono text-[11px] ${
                  activeNav === "all" ? "text-indigo-100" : "text-stone-400"
                }`}
              >
                {allResources.length}
              </span>
            </a>

            {PLATFORM_NAV_ITEMS.map(({ nav, label, dotColor }) => {
              const slug = getSectionByNav(nav)?.slug ?? "resources";
              return (
                <a
                  key={nav}
                  href={`/${slug}`}
                  onClick={(e) => handleLinkNavClick(e, nav)}
                  className={navItemClass(nav)}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                    {label}
                  </span>
                  <span
                    className={`font-mono text-[11px] ${
                      activeNav === nav ? "text-indigo-100" : "text-stone-400"
                    }`}
                  >
                    {platformCounts[nav]}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* My Study */}
        <div>
          <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            My Study
          </div>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => selectNav("in_progress")}
              className={navItemClass("in_progress")}
            >
              <span className="flex items-center gap-2.5">
                <PlayCircle className="h-4 w-4" />
                In Progress
              </span>
              <span
                className={`font-mono text-[11px] ${
                  activeNav === "in_progress"
                    ? "text-indigo-100"
                    : "text-slate-400"
                }`}
              >
                {stats.inProgress}
              </span>
            </button>

            <button
              type="button"
              onClick={() => selectNav("bookmarked")}
              className={navItemClass("bookmarked")}
            >
              <span className="flex items-center gap-2.5">
                <Bookmark className="h-4 w-4" />
                Bookmarked
              </span>
              <span
                className={`font-mono text-[11px] ${
                  activeNav === "bookmarked"
                    ? "text-indigo-100"
                    : "text-slate-400"
                }`}
              >
                {stats.bookmarked}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-[#EAE6DD] pt-4">
        <div className="text-center text-[11px] text-stone-500">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/jojin-john/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-stone-800 underline decoration-stone-300 underline-offset-2 hover:text-[#4F46E5]"
          >
            JOJIN JOHN
          </a>
        </div>
      </div>
    </div>
  );

  const headerMeta = NAV_TITLES[activeNav];

  return (
    <div className="flex min-h-screen bg-[#F6F4EE]">
      {/* Pure White Left Sidebar on Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-[#EAE6DD] bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex bg-stone-900/25 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="h-full w-72 overflow-y-auto border-r border-[#EAE6DD] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content Area (Warm Cream + Subtle Topographical Contour Pattern) */}
      <div className="topo-canvas flex min-w-0 flex-1 flex-col bg-[#F6F4EE]">
        {/* Pure White Sticky Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-[#EAE6DD] bg-white px-4 py-3 sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-2 text-stone-700 hover:bg-[#EAE6DD] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>

              {isCatalogView ? (
                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-3.5 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rooms, HTB labs, CTFs, tools... (/)"
                    className="w-full rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] py-2 pl-10 pr-8 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#4F46E5] focus:bg-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-sm font-semibold text-stone-800">
                  {headerMeta.title}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isCatalogView && (
                <div className="flex items-center rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    title="Card Grid View"
                    className={`rounded-lg p-1.5 transition ${
                      viewMode === "grid"
                        ? "bg-[#4F46E5] text-white shadow-2xs"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    title="Compact Table View"
                    className={`rounded-lg p-1.5 transition ${
                      viewMode === "list"
                        ? "bg-[#4F46E5] text-white shadow-2xs"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Scrollable Workspace */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-8">
          {isCatalogView && (
            <div className="space-y-5">
              {/* Page Title + Filters */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                      {headerMeta.title}
                    </h1>
                    <span className="rounded-full border border-[#EAE6DD] bg-[#F4F2EC] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#4F46E5]">
                      {filteredResources.length}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-600">
                    {headerMeta.subtitle}
                  </p>
                </div>

                {/* Warm Stone Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label="Learning stage filter"
                    value={selectedStage}
                    onChange={(e) =>
                      setSelectedStage(
                        e.target.value as "All" | LearningStage
                      )
                    }
                    className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-3 py-1.5 text-xs font-medium text-stone-700 focus:border-[#4F46E5] focus:bg-white focus:outline-none"
                  >
                    {STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage === "All" ? "All Stages (Order)" : stage}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Category filter"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value as "All" | Category)
                    }
                    className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-3 py-1.5 text-xs font-medium text-stone-700 focus:border-[#4F46E5] focus:bg-white focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Difficulty filter"
                    value={selectedDifficulty}
                    onChange={(e) =>
                      setSelectedDifficulty(
                        e.target.value as "All" | Difficulty
                      )
                    }
                    className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-3 py-1.5 text-xs font-medium text-stone-700 focus:border-[#4F46E5] focus:bg-white focus:outline-none"
                  >
                    {DIFFICULTIES.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff === "All" ? "All Levels" : diff}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Sort resources"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-3 py-1.5 text-xs font-medium text-stone-700 focus:border-[#4F46E5] focus:bg-white focus:outline-none"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="status">My Progress</option>
                    <option value="title">A-Z</option>
                  </select>
                </div>
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-[#EAE6DD] bg-[#F4F2EC] p-1">
                  {(
                    [
                      { id: "all", label: "All" },
                      { id: "todo", label: "Todo" },
                      { id: "in_progress", label: "In Progress" },
                      { id: "completed", label: "Completed" },
                    ] as { id: StatusFilter; label: string }[]
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStatusFilter(item.id)}
                      className={`rounded-xl px-3 py-1 text-xs font-medium transition ${
                        statusFilter === item.id
                          ? "bg-white text-[#4F46E5] shadow-[0_2px_6px_rgba(28,25,23,0.04)]"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:text-indigo-500"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reset filters
                  </button>
                )}
              </div>

              {/* Results */}
              {filteredResources.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredResources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        progress={getProgress(resource.id)}
                        onCycleStatus={cycleStatus}
                        onToggleBookmark={toggleBookmark}
                        onOpenDetails={setSelectedResource}
                        onDeleteCustom={
                          resource.isCustom ? deleteCustomResource : undefined
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <ResourceTable
                    resources={filteredResources}
                    getProgress={getProgress}
                    onCycleStatus={cycleStatus}
                    onToggleBookmark={toggleBookmark}
                    onOpenDetails={setSelectedResource}
                    onDeleteCustom={deleteCustomResource}
                  />
                )
              ) : (
                <div className="rounded-2xl border border-[#EAE6DD] bg-white p-12 text-center shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
                  <p className="text-sm font-semibold text-stone-800">
                    No matching resources found
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Try clearing your search or switching filters.
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Guided Roadmaps */}
          {activeNav === "roadmaps" && (
            <RoadmapView
              resourcesById={resourcesById}
              getProgress={getProgress}
              onCycleStatus={cycleStatus}
              onOpenDetails={setSelectedResource}
              onBrowseAll={() => selectNav("all")}
            />
          )}

          {/* About & Story */}
          {activeNav === "about" && (
            <AboutView
              totalResources={allResources.length}
              totalRoadmaps={STUDY_ROADMAPS.length}
              onStartPathways={() => selectNav("roadmaps")}
            />
          )}

          {/* Free Access Playbook */}
          {activeNav === "playbook" && (
            <div className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-stone-900">
                  Free Access Playbook
                </h1>
                <p className="mt-1 text-sm text-stone-600">
                  Practical guide to getting maximum free cybersecurity training
                  without hitting paywalls.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
                  <div className="flex items-center gap-2 text-rose-600">
                    <Sparkles className="h-4 w-4" />
                    <h2 className="text-base font-bold">
                      TryHackMe: Unlimited Free Strategy
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3 text-xs leading-relaxed text-stone-600">
                    <li>
                      <strong className="text-stone-900">
                        1. Use OpenVPN instead of AttackBox:
                      </strong>{" "}
                      Complete the free <code>OpenVPN</code> room and connect
                      from your own local Linux VM for unlimited lab time.
                    </li>
                    <li>
                      <strong className="text-stone-900">
                        2. Do Pre Security & Cyber 101 free rooms individually:
                      </strong>{" "}
                      Core rooms like Linux 1–3, Windows 1–3, Networking, DNS,
                      CyberChef, and Burp Repeater are completely free.
                    </li>
                    <li>
                      <strong className="text-stone-900">
                        3. Filter TryHackMe by &ldquo;Free Only&rdquo;:
                      </strong>{" "}
                      Unlock 100+ community CTFs like Pickle Rick, RootMe,
                      Simple CTF, Kenobi, Blue, Ice, and Mr. Robot CTF.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                    <h2 className="text-base font-bold">
                      Hack The Box: Free Tier Playbook
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3 text-xs leading-relaxed text-stone-600">
                    <li>
                      <strong className="text-stone-900">
                        1. Starting Point Tier 0 & Tier 1:
                      </strong>{" "}
                      Start with Tier 0 (Meow, Fawn, Dancing, Redeemer,
                      Explosion, Preignition) with official PDF walkthroughs.
                    </li>
                    <li>
                      <strong className="text-stone-900">
                        2. Active Machines & Challenges:
                      </strong>{" "}
                      HTB&apos;s rotating ~20 Active Machines and all Active
                      Challenges are 100% free via OpenVPN.
                    </li>
                    <li>
                      <strong className="text-stone-900">
                        3. HTB Academy Tier 0 Modules:
                      </strong>{" "}
                      Filter the Academy catalogue by <code>Tier 0</code>—these
                      cost 0 Cubes or refund their Cubes upon completion.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)] md:col-span-2">
                  <div className="flex items-center gap-2 text-[#4F46E5]">
                    <Wrench className="h-4 w-4" />
                    <h2 className="text-base font-bold">
                      100% Free Forever Platforms (No Paywalls)
                    </h2>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-4">
                      <h3 className="text-sm font-semibold text-stone-900">
                        PortSwigger Web Academy
                      </h3>
                      <p className="mt-1 text-xs text-stone-600">
                        Every web security lesson and live lab (SQLi, XSS, SSRF,
                        JWT, OAuth) is completely free forever.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-4">
                      <h3 className="text-sm font-semibold text-stone-900">
                        OverTheWire & PicoCTF
                      </h3>
                      <p className="mt-1 text-xs text-stone-600">
                        Zero paywalls. Best starting point for Linux SSH
                        (Bandit), Web (Natas), and Jeopardy CTFs.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-4">
                      <h3 className="text-sm font-semibold text-stone-900">
                        CryptoHack & pwn.college
                      </h3>
                      <p className="mt-1 text-xs text-stone-600">
                        Interactive Cryptography and university-grade Binary
                        Exploitation dojos at zero cost.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="mx-auto mt-4 w-full max-w-6xl px-4 pb-6 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-[#EAE6DD] bg-white px-5 py-3 text-xs text-stone-600 shadow-[0_2px_6px_rgba(28,25,23,0.03)] sm:flex-row">
            <span>SecStudy — Free Cybersecurity Rooms, HTB Labs &amp; CTFs</span>
            <span>
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/jojin-john/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4F46E5] hover:underline"
              >
                JOJIN JOHN
              </a>
            </span>
          </div>
        </footer>
      </div>

      {/* Slide-Over Detail & Notes Drawer */}
      <ResourceDetailModal
        resource={selectedResource}
        progress={selectedResource ? getProgress(selectedResource.id) : null}
        onClose={() => setSelectedResource(null)}
        onSetStatus={setStatus}
        onToggleBookmark={toggleBookmark}
        onSaveNotes={saveNotes}
      />
    </div>
  );
}
