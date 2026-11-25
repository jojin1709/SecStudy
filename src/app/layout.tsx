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
    "Organize and track 100% free TryHackMe rooms, Hack The Box labs, CTFs, wargames, tools, and study roadmaps.",
  authors: [{ name: "JOJIN JOHN" }],
  openGraph: {
    title: "SecStudy — Free Cybersecurity Rooms, HTB Labs, VulnHub & CTFs",
    description:
      "126 verified free TryHackMe rooms, Hack The Box labs, VulnHub VMs, all 32 PortSwigger topics, CTFs, Blue Team/Cloud labs, and 7 guided pathways.",
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
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans text-stone-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
