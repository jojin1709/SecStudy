import { StudyRoadmap } from "@/types/resource";

export const STUDY_ROADMAPS: StudyRoadmap[] = [
  {
    id: "roadmap-beginner-job",
    title: "Zero-to-Job Foundations Path",
    subtitle:
      "Complete beginner path covering Linux, Windows, Networking, core certs, and your first free labs.",
    targetRole: "Beginner -> IT / Junior Security",
    accent: "emerald",
    steps: [
      {
        id: "step-b1",
        title: "1. Lab Setup, Careers & Core Cert Prep",
        summary:
          "Set up OpenVPN for unlimited lab time and explore entry-level career tracks & certifications.",
        resourceIds: [
          "thm-openvpn",
          "thm-careers-cyber",
          "thm-principles-security",
          "career-cisco-netacad",
          "career-isc2-cc",
        ],
      },
      {
        id: "step-b2",
        title: "2. Linux & Windows OS Mastery",
        summary:
          "Build rock-solid Linux CLI and Windows administration fluency across OverTheWire, TryHackMe, and HTB Academy.",
        resourceIds: [
          "ctf-overthewire-bandit",
          "thm-linux-1",
          "thm-linux-2",
          "thm-linux-3",
          "thm-windows-1",
          "thm-windows-2",
          "thm-windows-3",
          "htba-linux-windows",
        ],
      },
      {
        id: "step-b3",
        title: "3. Networking & Recon Basics",
        summary:
          "Understand IP/DNS/OSI and learn how to scan live hosts and services with Nmap.",
        resourceIds: [
          "thm-what-is-networking",
          "thm-intro-networking",
          "thm-dns-in-detail",
          "thm-passive-recon",
          "thm-active-recon",
          "htba-networking-nmap",
        ],
      },
      {
        id: "step-b4",
        title: "4. First Guided Boxes & CTFs",
        summary:
          "Put everything together with HTB Starting Point Tier 0, PicoCTF, and beginner TryHackMe CTFs.",
        resourceIds: [
          "htb-sp-tier0",
          "ctf-picoctf",
          "thm-ohsint",
          "thm-pickle-rick",
          "thm-rootme",
        ],
      },
    ],
  },
  {
    id: "roadmap-bug-bounty",
    title: "Bug Bounty Hunter & Web AppSec Track",
    subtitle:
      "From HTTP basics to PortSwigger labs, Hacker101 private invites, real disclosed reports, and live hunting.",
    targetRole: "Bug Bounty Hunter / AppSec",
    accent: "cyan",
    steps: [
      {
        id: "step-bb1",
        title: "1. HTTP, Burp Suite & Recon Fuzzing",
        summary:
          "Set up Burp Suite Community and master HTTP manipulation, JS reading, and directory/parameter fuzzing.",
        resourceIds: [
          "tool-burp-community",
          "thm-burp-repeater",
          "htba-web-requests-js",
          "htba-web-ffuf-msf",
        ],
      },
      {
        id: "step-bb2",
        title: "2. Core Web Vulns & Realistic Practice",
        summary:
          "Practice IDOR, OWASP Top 10, and server-side flaws on OverTheWire Natas, TryHackMe, and OWASP Juice Shop.",
        resourceIds: [
          "thm-neighbour",
          "thm-owasp-juice-shop",
          "bb-owasp-juice-shop",
          "ctf-overthewire-natas",
          "bb-pentesterlab-free",
        ],
      },
      {
        id: "step-bb3",
        title: "3. PortSwigger Academy Mastery",
        summary:
          "Drill the highest-paying bug classes: SQLi, XSS, CSRF, Access Control/IDOR, SSRF, JWT, OAuth, and APIs.",
        resourceIds: [
          "bb-portswigger-hub",
          "bb-ps-sqli",
          "bb-ps-xss-csrf",
          "bb-ps-access-ssrf",
          "bb-ps-jwt-api",
        ],
      },
      {
        id: "step-bb4",
        title: "4. Private Invites, Reports & Methodology",
        summary:
          "Earn Hacker101 invites, study real disclosed payouts, and test using the OWASP WSTG checklist.",
        resourceIds: [
          "bb-hacker101",
          "bb-bugcrowd-uni",
          "bb-hackerone-hacktivity",
          "tool-owasp-wstg",
          "tool-payloads",
        ],
      },
    ],
  },
  {
    id: "roadmap-red-team",
    title: "Penetration Tester & Red Team Track",
    subtitle:
      "Full boot2root methodology: enumeration, exploitation, Linux/Windows PrivEsc, pivoting, and Active Directory.",
    targetRole: "Penetration Tester / Red Teamer",
    accent: "amber",
    steps: [
      {
        id: "step-r1",
        title: "1. Core Tooling & PrivEsc Foundations",
        summary:
          "Master Hydra, Metasploit, Linux PrivEsc, GTFOBins, HackTricks, and Exploit-DB.",
        resourceIds: [
          "thm-hydra",
          "thm-metasploit-intro",
          "thm-linprivesc",
          "tool-gtfobins",
          "tool-revshells",
          "tool-exploitdb",
          "tool-hacktricks",
        ],
      },
      {
        id: "step-r2",
        title: "2. Linux & Windows Boot2Root CTFs",
        summary:
          "Root classic Easy TryHackMe boxes and HTB Starting Point Tier 1 to build enumeration speed.",
        resourceIds: [
          "thm-simple-ctf",
          "thm-bounty-hacker",
          "thm-brooklyn99",
          "thm-agentsudo",
          "thm-vulnversity",
          "thm-lazyadmin",
          "thm-ignite",
          "thm-wgelctf",
          "thm-lianyu",
          "thm-overpass",
          "thm-gallery",
          "thm-kenobi",
          "thm-blue",
          "thm-ice",
          "thm-steelmountain",
          "htb-sp-tier1",
        ],
      },
      {
        id: "step-r3",
        title: "3. Medium Boxes & Unguided Targets",
        summary:
          "Step up to Docker escapes, LFI chaining, HTB Tier 2, and live HTB Active Machines.",
        resourceIds: [
          "thm-dogcat",
          "thm-mrrobot",
          "htb-sp-tier2",
          "htb-active-machines",
          "tool-lolbas",
        ],
      },
      {
        id: "step-r4",
        title: "4. Active Directory & Multi-Host Pivoting",
        summary:
          "Attack enterprise Windows AD environments and practice multi-machine lateral movement.",
        resourceIds: ["thm-attacktivedirectory", "thm-wreath", "ad-goad"],
      },
    ],
  },
  {
    id: "roadmap-blue-team",
    title: "SOC Analyst, Blue Team & DFIR Job Track",
    subtitle:
      "Prepare for Tier 1/2 SOC and Incident Response interviews with live SIEM triage, KQL, DFIR, and MITRE ATT&CK.",
    targetRole: "SOC Analyst / DFIR Responder",
    accent: "violet",
    steps: [
      {
        id: "step-d1",
        title: "1. Defensive Foundations & Decoding",
        summary:
          "Learn defensive operations, Windows logging/Defender, CyberChef, and Cisco's Junior Analyst path.",
        resourceIds: [
          "thm-intro-defensive",
          "thm-windows-2",
          "thm-windows-3",
          "thm-cyberchef",
          "tool-cyberchef",
          "career-cisco-netacad",
        ],
      },
      {
        id: "step-d2",
        title: "2. Live SOC Alert Triage & KQL Hunting",
        summary:
          "Practice investigating phishing, malware, and ransomware logs on LetsDefend, KC7 Cyber, and Antisyphon.",
        resourceIds: [
          "bt-kc7cyber",
          "bt-letsdefend",
          "career-antisyphon",
          "bt-mitre-attack",
        ],
      },
      {
        id: "step-d3",
        title: "3. DFIR, OSINT & Linux Incident Response",
        summary:
          "Analyze PCAPs, memory dumps, OSINT trails, and troubleshoot broken Linux servers under pressure.",
        resourceIds: [
          "bt-cyberdefenders",
          "bt-btlo",
          "bt-sadservers",
          "osint-sofia-santos",
          "osint-framework",
        ],
      },
    ],
  },
  {
    id: "roadmap-cloud-sec",
    title: "Cloud Security Engineer Track",
    subtitle:
      "Learn AWS misconfigurations, IAM privilege escalation, S3 leaks, and cloud pentesting for free.",
    targetRole: "Cloud Security / Cloud Pentester",
    accent: "emerald",
    steps: [
      {
        id: "step-c1",
        title: "1. Cloud CTF Fundamentals (No AWS Bill)",
        summary:
          "Exploit S3 buckets, snapshots, IAM roles, and EC2 metadata directly against hosted cloud challenges.",
        resourceIds: ["cloud-flaws", "bb-ps-access-ssrf"],
      },
      {
        id: "step-c2",
        title: "2. Self-Hosted AWS Pentesting Labs",
        summary:
          "Deploy intentionally vulnerable AWS architectures with Terraform and audit them with CloudGoat & HackTricks.",
        resourceIds: ["cloud-cloudgoat", "tool-hacktricks"],
      },
    ],
  },
  {
    id: "roadmap-pwn-crypto",
    title: "Binary Exploitation, Reversing & Crypto CTF Track",
    subtitle:
      "Deep technical path for reverse engineering, memory corruption, modern cryptography, and live CTFs.",
    targetRole: "Security Researcher / CTF Player",
    accent: "rose",
    steps: [
      {
        id: "step-p1",
        title: "1. Jeopardy & Modern Cryptography",
        summary:
          "Build broad CTF problem-solving on PicoCTF, classical crypto on OverTheWire, and RSA/AES/ECC on CryptoHack.",
        resourceIds: [
          "ctf-picoctf",
          "ctf-overthewire-leviathan",
          "ctf-cryptohack",
          "tool-cyberchef",
        ],
      },
      {
        id: "step-p2",
        title: "2. Reverse Engineering & Low-Level Pwn",
        summary:
          "Debug crackmes, solve embedded MSP430 firmware challenges, earn pwn.college belts, and compete on CTFtime.",
        resourceIds: [
          "ctf-crackmes-one",
          "ctf-microcorruption",
          "ctf-pwn-college",
          "htb-free-challenges",
          "ctf-ctftime",
        ],
      },
    ],
  },
];
