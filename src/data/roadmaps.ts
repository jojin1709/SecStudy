import { StudyRoadmap } from "@/types/resource";

export const STUDY_ROADMAPS: StudyRoadmap[] = [
  {
    id: "roadmap-beginner-ctf",
    title: "Zero-to-First-CTF Path",
    subtitle: "Best starting path if you are completely new to Linux, networking, and hacking.",
    targetRole: "Beginner / Junior Learner",
    accent: "emerald",
    steps: [
      {
        id: "step-b1",
        title: "1. Lab Setup & Orientation",
        summary: "Set up OpenVPN so you have unlimited free lab time and learn core security ideas.",
        resourceIds: ["thm-openvpn", "thm-intro-offensive", "thm-principles-security"],
      },
      {
        id: "step-b2",
        title: "2. Linux & Terminal Fluency",
        summary: "Combine OverTheWire Bandit with TryHackMe Linux Fundamentals to master the shell.",
        resourceIds: ["ctf-overthewire-bandit", "thm-linux-1", "thm-linux-2", "thm-linux-3"],
      },
      {
        id: "step-b3",
        title: "3. Networking & Recon Basics",
        summary: "Understand IP/DNS/OSI and start scanning live targets with Nmap.",
        resourceIds: ["thm-what-is-networking", "thm-intro-networking", "thm-dns-in-detail", "thm-active-recon"],
      },
      {
        id: "step-b4",
        title: "4. Your First Guided Boxes & CTFs",
        summary: "Complete HTB Starting Point Tier 0, PicoCTF starter challenges, and classic easy THM rooms.",
        resourceIds: ["htb-sp-tier0", "ctf-picoctf", "thm-ohsint", "thm-pickle-rick", "thm-rootme"],
      },
    ],
  },
  {
    id: "roadmap-web-pentest",
    title: "Web App Pentesting Track",
    subtitle: "Master HTTP, Burp Suite, OWASP Top 10, and real-world web exploitation for free.",
    targetRole: "Web Pentester / Bug Bounty",
    accent: "cyan",
    steps: [
      {
        id: "step-w1",
        title: "1. HTTP, Fuzzing & Burp Setup",
        summary: "Learn how web requests work and set up Burp Suite Community + ffuf.",
        resourceIds: ["tool-burp-community", "thm-burp-repeater", "htba-web-ffuf-msf"],
      },
      {
        id: "step-w2",
        title: "2. Server-Side Web Wargames",
        summary: "Practice PHP, authentication, and web logic flaws in OverTheWire Natas.",
        resourceIds: ["ctf-overthewire-natas", "thm-vulnversity", "thm-lazyadmin"],
      },
      {
        id: "step-w3",
        title: "3. Industry Gold-Standard Labs",
        summary: "Work through PortSwigger Web Security Academy labs alongside PayloadsAllTheThings.",
        resourceIds: ["ctf-portswigger", "tool-payloads"],
      },
    ],
  },
  {
    id: "roadmap-red-team",
    title: "Pentesting & Boot2Root Track",
    subtitle: "Build full enumeration -> foothold -> privilege escalation muscle on THM & HTB.",
    targetRole: "Penetration Tester",
    accent: "amber",
    steps: [
      {
        id: "step-r1",
        title: "1. OS Internals & Enumeration",
        summary: "Cover Windows Fundamentals, HTB Academy Nmap, and HackTricks methodology.",
        resourceIds: ["thm-windows-1", "thm-windows-2", "htba-networking-nmap", "tool-hacktricks"],
      },
      {
        id: "step-r2",
        title: "2. Guided Boot2Root CTFs",
        summary: "Root Easy Linux & Windows boxes using Exploit-DB, GTFOBins, and RevShells.",
        resourceIds: ["thm-simple-ctf", "thm-bounty-hacker", "thm-kenobi", "thm-blue", "thm-ice", "tool-gtfobins", "tool-revshells", "tool-exploitdb"],
      },
      {
        id: "step-r3",
        title: "3. Unguided Real Targets",
        summary: "Step up to Medium rooms, HTB Tier 1-2, and HTB Active Free Machines.",
        resourceIds: ["thm-mrrobot", "htb-sp-tier1-2", "htb-active-machines", "tool-lolbas"],
      },
    ],
  },
  {
    id: "roadmap-blue-team",
    title: "Blue Team / SOC & DFIR Track",
    subtitle: "Learn alert triage, packet analysis, forensics, and incident response for free.",
    targetRole: "SOC Analyst / Incident Responder",
    accent: "violet",
    steps: [
      {
        id: "step-d1",
        title: "1. Defensive Foundations",
        summary: "Learn defensive workflows, Windows Event Logs, Defender, and CyberChef.",
        resourceIds: ["thm-intro-defensive", "thm-windows-2", "thm-windows-3", "thm-cyberchef", "tool-cyberchef"],
      },
      {
        id: "step-d2",
        title: "2. Alert Triage & Forensics CTFs",
        summary: "Investigate real SIEM alerts on LetsDefend and DFIR artifacts on CyberDefenders.",
        resourceIds: ["ctf-letsdefend", "ctf-cyberdefenders", "thm-passive-recon"],
      },
    ],
  },
  {
    id: "roadmap-pwn-crypto",
    title: "Crypto, Binary & Competitive CTF Track",
    subtitle: "Deep technical track for Cryptography, Reverse Engineering, Pwn, and weekend CTFs.",
    targetRole: "CTF Player / Security Researcher",
    accent: "rose",
    steps: [
      {
        id: "step-p1",
        title: "1. Jeopardy & Crypto Foundations",
        summary: "Build broad problem-solving on PicoCTF and modern crypto attacks on CryptoHack.",
        resourceIds: ["ctf-picoctf", "ctf-cryptohack", "tool-cyberchef"],
      },
      {
        id: "step-p2",
        title: "2. Low-Level Systems & Weekend CTFs",
        summary: "Earn belts on pwn.college, solve HTB Challenges, and compete via CTFtime.",
        resourceIds: ["ctf-pwn-college", "htb-free-challenges", "ctf-ctftime"],
      },
    ],
  },
];
