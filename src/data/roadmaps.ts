import { StudyRoadmap } from "@/types/resource";

export const STUDY_ROADMAPS: StudyRoadmap[] = [
  {
    id: "roadmap-beginner-job",
    title: "1. Zero-to-Job Foundations Path",
    subtitle:
      "Start here if you are brand new. Follow Steps 1 -> 4 in exact order to build Linux, Windows, Networking, and job-ready foundations.",
    targetRole: "Absolute Beginner -> First Security Job",
    accent: "emerald",
    steps: [
      {
        id: "step-b1",
        title: "Step 1: Connect Free Labs & Learn Core Concepts",
        summary:
          "Start by setting up OpenVPN (unlimited free TryHackMe lab time) and learning security careers & fundamentals.",
        resourceIds: [
          "thm-openvpn",
          "thm-careers-cyber",
          "thm-principles-security",
          "thm-intro-offensive",
          "thm-intro-defensive",
          "career-cisco-netacad",
          "career-isc2-cc",
        ],
      },
      {
        id: "step-b2",
        title: "Step 2: Master Linux & Windows Command Line",
        summary:
          "Do OverTheWire Bandit first, then complete TryHackMe Linux 1-3 and Windows 1-3 (plus HTB Academy Tier 0).",
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
        title: "Step 3: Learn Networking, HTTP & Recon Tools",
        summary:
          "Understand IP, OSI, DNS, and HTTP before running Nmap, CyberChef, and Crack The Hash.",
        resourceIds: [
          "thm-what-is-networking",
          "thm-intro-networking",
          "thm-dns-in-detail",
          "thm-http-in-detail",
          "thm-passive-recon",
          "thm-active-recon",
          "thm-further-nmap",
          "htba-networking-nmap",
        ],
      },
      {
        id: "step-b4",
        title: "Step 4: Solve Your First Guided Labs & CTFs",
        summary:
          "Apply your skills on HTB Starting Point Tier 0, PicoCTF, OhSINT, and your first beginner TryHackMe & VulnHub boxes.",
        resourceIds: [
          "htb-sp-tier0",
          "ctf-picoctf",
          "thm-ohsint",
          "thm-pickle-rick",
          "thm-rootme",
          "vh-basic-pentesting-1",
        ],
      },
    ],
  },
  {
    id: "roadmap-bug-bounty",
    title: "2. Bug Bounty Hunter & Web AppSec Path",
    subtitle:
      "Follow Steps 1 -> 4 in exact sequence: HTTP & Burp -> Juice Shop & Natas -> All 32 PortSwigger Lab Topics -> Hacker101 Private Invites.",
    targetRole: "Bug Bounty Hunter / WEB1 / AppSec",
    accent: "cyan",
    steps: [
      {
        id: "step-bb1",
        title: "Step 1: HTTP, Burp Suite & Fuzzing Setup",
        summary:
          "Learn HTTP deeply, configure Burp Suite Community proxy, read JavaScript, and fuzz hidden endpoints with ffuf.",
        resourceIds: [
          "thm-http-in-detail",
          "tool-burp-community",
          "thm-burp-basics",
          "thm-burp-repeater",
          "htba-web-requests-js",
          "htba-web-ffuf-msf",
        ],
      },
      {
        id: "step-bb2",
        title: "Step 2: Core Web Vulns & Realistic Practice",
        summary:
          "Start with IDOR (Neighbour), OWASP Juice Shop, OverTheWire Natas, and PentesterLab free exercises.",
        resourceIds: [
          "thm-neighbour",
          "thm-owasp-juice-shop",
          "thm-owasptop10",
          "thm-dvwa",
          "thm-webgoat",
          "thm-sqlilab",
          "thm-learnssti",
          "bb-owasp-juice-shop",
          "ctf-overthewire-natas",
          "bb-pentesterlab-free",
        ],
      },
      {
        id: "step-bb3",
        title: "Step 3: Complete PortSwigger Academy (#1 -> #10)",
        summary:
          "Work through all 32 PortSwigger lab categories in exact Apprentice -> Practitioner -> Expert order.",
        resourceIds: [
          "bb-portswigger-hub",
          "bb-ps-01-essentials",
          "bb-ps-02-auth-idor",
          "bb-ps-03-sqli-nosql",
          "bb-ps-04-client-side",
          "bb-ps-05-cmd-upload-xxe",
          "bb-ps-06-ssrf-ssti-deser",
          "bb-ps-07-api-jwt",
          "bb-ps-08-smuggling-cache",
          "bb-ps-09-race-ws-proto",
          "bb-ps-10-ai-mystery",
        ],
      },
      {
        id: "step-bb4",
        title: "Step 4: Earn Private Invites & Hunt Live Programs",
        summary:
          "Score 26+ points in Hacker101 CTF for private invites, study disclosed Hacktivity payouts, and follow OWASP WSTG.",
        resourceIds: [
          "bb-hacker101",
          "bb-yeswehack-dojo",
          "bb-bugcrowd-uni",
          "bb-hackerone-hacktivity",
          "bb-owasp-crapi",
          "bb-dvga",
          "thm-androidhacking101",
          "mob-injured-android",
          "mob-insecureshop",
          "mob-owasp-mastg",
          "tool-frida",
          "tool-nuclei",
          "tool-owasp-wstg",
          "tool-payloads",
        ],
      },
    ],
  },
  {
    id: "roadmap-red-team",
    title: "3. Penetration Tester & Boot2Root Path (THM + HTB + VulnHub)",
    subtitle:
      "Exact room-by-room progression from Easy TryHackMe boxes -> VulnHub OSCP classics -> HTB Active Pool -> Active Directory (PT1 / PT2).",
    targetRole: "Penetration Tester (PT1 / WEB1 / PT2)",
    accent: "amber",
    steps: [
      {
        id: "step-r1",
        title: "Step 1: Offensive Tooling & Privilege Escalation",
        summary:
          "Learn Hydra, Metasploit, Red Team concepts, Linux PrivEsc, GTFOBins, RevShells, and Exploit-DB before attacking boxes.",
        resourceIds: [
          "thm-career-pentester",
          "thm-redteam-fundamentals",
          "thm-hydra",
          "thm-crackthehash",
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
        title: "Step 2: Easy TryHackMe & HTB Tier 1 Boxes",
        summary:
          "Build fast enumeration habits on these verified Easy Linux & Windows rooms in sequence.",
        resourceIds: [
          "thm-simple-ctf",
          "thm-bounty-hacker",
          "thm-colddboxeasy",
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
          "thm-anthem",
          "thm-startup",
          "htb-sp-tier1",
        ],
      },
      {
        id: "step-r3",
        title: "Step 3: VulnHub Offline OSCP-Style VMs",
        summary:
          "Practice completely unguided local VirtualBox/VMware boot2root machines from Easy to Medium.",
        resourceIds: [
          "vh-basic-pentesting-1",
          "vh-kioptrix-1",
          "vh-kioptrix-2",
          "vh-kioptrix-3",
          "vh-kioptrix-4",
          "vh-kioptrix-5",
          "vh-dc-1",
          "vh-dc-2",
          "vh-dc-3",
          "vh-lampiao",
          "vh-troll-1",
          "vh-billu-box",
          "vh-symfonos-1",
          "vh-stapler-1",
          "vh-mr-robot-1",
          "vh-troll-2",
          "vh-cybersploit-1",
          "vh-cybersploit-2",
          "vh-sunset-1",
          "vh-sunset-dawn",
          "vh-sunset-nightfall",
          "vh-sunset-twilight",
        ],
      },
      {
        id: "step-r4",
        title: "Step 4: Medium Boxes, Active Directory & Pivoting",
        summary:
          "Master LFI/Docker escapes, HTB Active Machines, Attacktive Directory, Wreath pivoting, and GOAD.",
        resourceIds: [
          "thm-dogcat",
          "thm-mrrobot",
          "thm-wonderland",
          "thm-relevant",
          "htb-sp-tier2",
          "htb-active-machines",
          "thm-attacktivedirectory",
          "thm-raz0rblack",
          "thm-wreath",
          "ad-goad",
          "tool-lolbas",
        ],
      },
    ],
  },
  {
    id: "roadmap-blue-team",
    title: "4. Security Analyst, SOC & DFIR Job Path (SAL1 / SAL2)",
    subtitle:
      "Prepare for Tier 1/2 SOC Analyst & Incident Response jobs with SIEM triage, KQL hunting, forensics, Azure/Windows IR, and MITRE ATT&CK.",
    targetRole: "Security Analyst (SAL1 / SAL2 / DFIR)",
    accent: "violet",
    steps: [
      {
        id: "step-d1",
        title: "Step 1: Defensive Basics, Windows Internals & CyberChef",
        summary:
          "Learn SOC operations, Windows Event Logs/Defender, Cisco Junior Analyst, and CyberChef decoding.",
        resourceIds: [
          "thm-career-analyst",
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
        title: "Step 2: Live Alert Triage & Threat Hunting",
        summary:
          "Investigate realistic corporate intrusions in KC7 Cyber (KQL), LetsDefend SIEM, Antisyphon, and MITRE ATT&CK.",
        resourceIds: [
          "bt-kc7cyber",
          "bt-letsdefend",
          "bt-splunk-botsv3",
          "thm-bpsplunk",
          "thm-investigatingwindows",
          "career-antisyphon",
          "bt-mitre-attack",
        ],
      },
      {
        id: "step-d3",
        title: "Step 3: DFIR, PCAP Forensics & OSINT",
        summary:
          "Analyze real malware PCAPs, memory dumps, OSINT trails, and fix broken Linux servers under pressure.",
        resourceIds: [
          "bt-cyberdefenders",
          "bt-btlo",
          "bt-malware-traffic",
          "thm-c2carnage",
          "thm-memoryforensics",
          "thm-autopsy2ze0",
          "bt-sadservers",
          "osint-sofia-santos",
          "osint-framework",
        ],
      },
    ],
  },
  {
    id: "roadmap-cloud-sec",
    title: "5. Security Engineer, DevSecOps & Cloud Security Path",
    subtitle:
      "Learn Security Engineering, DevSecOps, AWS cloud misconfigurations, IAM escalation, S3 leaks, and SSRF metadata attacks.",
    targetRole: "Security Engineer / Cloud / DevSecOps",
    accent: "emerald",
    steps: [
      {
        id: "step-c1",
        title: "Step 1: Hosted Cloud Security CTFs (Zero AWS Cost)",
        summary:
          "Exploit S3 bucket leaks, IAM enumeration, and SSRF metadata attacks in browser-ready labs.",
        resourceIds: [
          "thm-career-seceng",
          "cloud-flaws",
          "bb-ps-06-ssrf-ssti-deser",
        ],
      },
      {
        id: "step-c2",
        title: "Step 2: Kubernetes & AWS Pentesting Environments",
        summary:
          "Practice Kubernetes cluster escapes with Kubernetes Goat and deploy Terraform-based vulnerable AWS environments with CloudGoat.",
        resourceIds: ["cloud-kubernetes-goat", "cloud-cloudgoat", "tool-hacktricks"],
      },
    ],
  },
  {
    id: "roadmap-ai-sec",
    title: "6. AI Security, Web LLM & Agentic AI Path (AI1)",
    subtitle:
      "Explore prompt injection, Web LLM attacks, MCP Server vulnerabilities, and Agentic AI security.",
    targetRole: "AI Security Engineer (AI1)",
    accent: "cyan",
    steps: [
      {
        id: "step-ai1",
        title: "Step 1: AI Security & Live LLM / MCP Exploitation",
        summary:
          "Follow the TryHackMe AI Security (AI1) syllabus and complete PortSwigger's free Web LLM & MCP Server vulnerability labs.",
        resourceIds: [
          "thm-career-ai",
          "ai-lakera-gandalf",
          "bb-ps-10-ai-mystery",
          "ai-owasp-llm-top10",
          "bb-ps-07-api-jwt",
          "tool-owasp-wstg",
        ],
      },
    ],
  },
  {
    id: "roadmap-pwn-crypto",
    title: "7. Reverse Engineering, Binary Pwn & Crypto CTF Path",
    subtitle:
      "Structured deep-dive into cryptography, binary reversing, memory corruption, and competitive weekend CTFs.",
    targetRole: "Security Researcher / Exploit Dev",
    accent: "rose",
    steps: [
      {
        id: "step-p1",
        title: "Step 1: Jeopardy CTFs & Modern Cryptography",
        summary:
          "Start with PicoCTF, move to OverTheWire Leviathan/Krypton, and master AES/RSA/ECC on CryptoHack.",
        resourceIds: [
          "ctf-picoctf",
          "ctf-overthewire-leviathan",
          "ctf-cryptohack",
          "tool-cyberchef",
        ],
      },
      {
        id: "step-p2",
        title: "Step 2: Reverse Engineering, Binary Exploitation & Live CTFs",
        summary:
          "Reverse binaries on Crackmes.one, exploit firmware on Microcorruption, earn pwn.college belts, and compete on CTFtime.",
        resourceIds: [
          "ctf-crackmes-one",
          "ctf-microcorruption",
          "ctf-pwn-college",
          "thm-introtox8664",
          "thm-ccghidra",
          "thm-bufferoverflowprep",
          "thm-introtopwntools",
          "mob-owasp-crackmes",
          "mob-mobsf",
          "web3-ethernaut",
          "web3-dvdf",
          "htb-free-challenges",
          "ctf-ctftime",
        ],
      },
    ],
  },
];
