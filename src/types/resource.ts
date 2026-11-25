export type Platform =
  | "TryHackMe"
  | "Hack The Box"
  | "VulnHub"
  | "Bug Bounty & Web"
  | "CTFs & Wargames"
  | "Blue Team & Cloud"
  | "Tools & Career Prep";

export type LearningStage =
  | "Stage 1: Foundations & OS"
  | "Stage 2: Networking & Core Tools"
  | "Stage 3: Easy CTFs & Boot2Root"
  | "Stage 4: Web & Bug Bounty"
  | "Stage 5: AD, Medium & Pivoting"
  | "Stage 6: VulnHub Offline VMs"
  | "Stage 7: Blue Team, SOC & Cloud"
  | "Stage 8: Pwn, Crypto & Career";

export type Category =
  | "Fundamentals & OS"
  | "Networking"
  | "Web & Bug Bounty"
  | "Linux & PrivEsc"
  | "Windows & AD"
  | "CTF Challenges"
  | "Cryptography"
  | "Binary & Pwn"
  | "OSINT & Forensics"
  | "Defensive & SOC"
  | "Cloud Security"
  | "Mobile Security"
  | "AI & LLM Security"
  | "Career & Cert Prep"
  | "Tools & Cheat Sheets";

export type Difficulty = "Beginner" | "Easy" | "Medium" | "Hard";

export type FreeTierBadge =
  | "100% Free"
  | "Free Account + OpenVPN"
  | "Free Tier / 0 Cubes"
  | "Free Active Pool"
  | "Free Downloadable VM"
  | "Pay-What-You-Can ($0+)";

export type ProgressStatus = "todo" | "in_progress" | "completed";

export interface CyberResource {
  id: string;
  title: string;
  platform: Platform;
  stage: LearningStage;
  resourceType:
    | "Room"
    | "Learning Path"
    | "Starting Point"
    | "Machine Pool"
    | "Academy Module"
    | "VulnHub VM"
    | "Bug Bounty Lab"
    | "CTF Platform"
    | "Wargame"
    | "Cloud Lab"
    | "AD Lab"
    | "Career Course"
    | "Tool / Reference";
  category: Category;
  difficulty: Difficulty;
  freeStatus: FreeTierBadge;
  freeAccessTip: string;
  url: string;
  description: string;
  skills: string[];
  estimatedMinutes?: number;
  recommendedOrder: number;
  isCustom?: boolean;
}

export interface ResourceProgress {
  status: ProgressStatus;
  bookmarked: boolean;
  notes: string;
  updatedAt: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  summary: string;
  resourceIds: string[];
}

export interface StudyRoadmap {
  id: string;
  title: string;
  subtitle: string;
  targetRole: string;
  accent: "emerald" | "cyan" | "amber" | "violet" | "rose";
  steps: RoadmapStep[];
}

export interface BackupPayload {
  version: number;
  exportedAt: string;
  progressById: Record<string, ResourceProgress>;
  customResources: CyberResource[];
}
