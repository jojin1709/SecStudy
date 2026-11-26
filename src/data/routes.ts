import { Platform } from "@/types/resource";

export const SITE_URL = "https://secstudy-free.vercel.app";

export type ActiveNav =
  | "all"
  | Platform
  | "bookmarked"
  | "in_progress"
  | "roadmaps"
  | "playbook"
  | "about";

export interface SectionRoute {
  slug: string;
  nav: ActiveNav;
  title: string;
  description: string;
  priority: number;
}

export const SECTION_ROUTES: SectionRoute[] = [
  {
    slug: "roadmaps",
    nav: "roadmaps",
    title: "Guided Cybersecurity Study Roadmaps | SecStudy",
    description:
      "Follow 7 structured zero-cost cybersecurity pathways from Zero-to-Job Foundations, Bug Bounty, Pentesting, SOC/DFIR, Cloud/DevSecOps, AI Security, and Binary/Crypto CTFs.",
    priority: 0.9,
  },
  {
    slug: "resources",
    nav: "all",
    title: "All 157 Free Cybersecurity Resources | SecStudy",
    description:
      "Search and filter 157 verified free TryHackMe rooms, Hack The Box labs, VulnHub VMs, PortSwigger Academy topics, Android/API/Web3/AI/Kubernetes labs, CTFs & tools.",
    priority: 0.9,
  },
  {
    slug: "tryhackme",
    nav: "TryHackMe",
    title: "Free TryHackMe Rooms & Career Paths | SecStudy",
    description:
      "60 curated free TryHackMe rooms, Pre Security & Cyber 101 basics, Linux/Windows PrivEsc, Active Directory, Wreath, and 25+ free CTFs with OpenVPN tips.",
    priority: 0.9,
  },
  {
    slug: "hackthebox",
    nav: "Hack The Box",
    title: "Hack The Box Free Labs & Starting Point | SecStudy",
    description:
      "Explore free Hack The Box Starting Point Tier 0-2 boxes, Active Machines Pool, Challenges, and 0-Cube HTB Academy modules.",
    priority: 0.85,
  },
  {
    slug: "vulnhub",
    nav: "VulnHub",
    title: "VulnHub Free Offline Boot2Root VMs | SecStudy",
    description:
      "22 classic downloadable OSCP-style VulnHub VMs including Kioptrix 1-5, Basic Pentesting, DC 1-3, Stapler, Symfonos, Mr-Robot, CyberSploit 1-2, and Sunset series.",
    priority: 0.8,
  },
  {
    slug: "bug-bounty",
    nav: "Bug Bounty & Web",
    title: "Bug Bounty & Web AppSec Free Labs | SecStudy",
    description:
      "All 32 PortSwigger Web Security Academy topics, Hacker101 private invites, OWASP Juice Shop, Natas, PentesterLab, and Hacktivity writeups.",
    priority: 0.9,
  },
  {
    slug: "ctf",
    nav: "CTFs & Wargames",
    title: "Free CTFs, Pwn, Cryptography & OSINT Wargames | SecStudy",
    description:
      "Practice with OverTheWire Bandit & Natas, PicoCTF, CryptoHack, pwn.college, Crackmes.one, Microcorruption, CTFtime, and Sofia Santos OSINT.",
    priority: 0.85,
  },
  {
    slug: "blue-team",
    nav: "Blue Team & Cloud",
    title: "Blue Team, SOC, Cloud & Active Directory Labs | SecStudy",
    description:
      "Hands-on defensive and cloud labs including LetsDefend, CyberDefenders, Blue Team Labs Online, KC7 Cyber KQL, SadServers, flaws.cloud, CloudGoat, and GOAD.",
    priority: 0.85,
  },
  {
    slug: "career-tools",
    nav: "Tools & Career Prep",
    title: "Free Cybersecurity Certifications, Playbooks & Tools | SecStudy",
    description:
      "Cisco NetAcad, ISC2 CC prep, Antisyphon $0 PWYC, OWASP WSTG, GTFOBins, LOLBAS, HackTricks, PayloadsAllTheThings, CyberChef, and Burp Community.",
    priority: 0.8,
  },
  {
    slug: "free-playbook",
    nav: "playbook",
    title: "Free Cybersecurity Lab Access Playbook | SecStudy",
    description:
      "Step-by-step guide to bypassing paywalls legally with TryHackMe OpenVPN unlimited lab time, HTB Active Pool, 0-Cube modules, and 100% free platforms.",
    priority: 0.8,
  },
  {
    slug: "about",
    nav: "about",
    title: "About JOJIN JOHN & SecStudy Story | SecStudy",
    description:
      "Learn why JOJIN JOHN built SecStudy to organize 640+ verified free cybersecurity resources and connect on LinkedIn, GitHub, and portfolio.",
    priority: 0.7,
  },
];

export function getSectionBySlug(slug: string): SectionRoute | undefined {
  return SECTION_ROUTES.find((route) => route.slug === slug);
}

export function getSectionByNav(nav: ActiveNav): SectionRoute | undefined {
  return SECTION_ROUTES.find((route) => route.nav === nav);
}

export function getNavFromPathname(pathname: string): ActiveNav {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  if (!clean) return "roadmaps";
  return getSectionBySlug(clean)?.nav ?? "roadmaps";
}
