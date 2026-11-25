import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://secstudy-free.vercel.app"),
  title: "SecStudy | Free TryHackMe, Hack The Box, CTFs & Learning Hub",
  description:
    "Organize and track 157 verified free TryHackMe rooms, Hack The Box labs, VulnHub VMs, PortSwigger topics, Android/API/Web3/Kubernetes/AI labs, CTFs, and 7 guided roadmaps.",
  keywords: [
    "SecStudy",
    "free cybersecurity resources",
    "free TryHackMe rooms",
    "Hack The Box free labs",
    "PortSwigger Web Security Academy",
    "VulnHub VMs",
    "CTF practice",
    "cybersecurity roadmap",
    "bug bounty learning",
  ],
  authors: [{ name: "JOJIN JOHN", url: "https://www.jojinjohn.me" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SecStudy — Free Cybersecurity Rooms, HTB Labs, VulnHub & CTFs",
    description:
      "157 verified free TryHackMe rooms, Hack The Box labs, VulnHub VMs, PortSwigger topics, Android/API/Web3/Kubernetes/AI labs, CTFs, and 7 guided pathways.",
    url: "https://secstudy-free.vercel.app",
    siteName: "SecStudy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecStudy — Free Cybersecurity Learning Hub",
    description:
      "Track free TryHackMe rooms, Hack The Box labs, CTFs, tools, and guided roadmaps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SecStudy",
    alternateName: "SecStudy Free Security Hub",
    url: "https://secstudy-free.vercel.app",
    description:
      "Free cybersecurity study hub organizing 157 verified free TryHackMe rooms, Hack The Box labs, VulnHub VMs, PortSwigger Academy topics, Android bug bounty labs, Web3 smart contract wargames, and 7 guided roadmaps.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: "JOJIN JOHN",
      url: "https://www.jojinjohn.me",
      sameAs: [
        "https://github.com/jojin1709",
        "https://www.linkedin.com/in/jojin-john/",
      ],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans text-stone-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
