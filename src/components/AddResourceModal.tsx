"use client";

import { FormEvent, useState } from "react";
import { PlusCircle, X } from "lucide-react";
import {
  Category,
  CyberResource,
  Difficulty,
  FreeTierBadge,
  Platform,
} from "@/types/resource";

interface AddResourceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (
    resource: Omit<CyberResource, "id" | "recommendedOrder" | "isCustom">
  ) => void;
}

const PLATFORMS: Platform[] = [
  "TryHackMe",
  "Hack The Box",
  "VulnHub",
  "Bug Bounty & Web",
  "CTFs & Wargames",
  "Blue Team & Cloud",
  "Tools & Career Prep",
];

const CATEGORIES: Category[] = [
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
  "Career & Cert Prep",
  "Tools & Cheat Sheets",
];

const DIFFICULTIES: Difficulty[] = ["Beginner", "Easy", "Medium", "Hard"];

const FREE_STATUSES: FreeTierBadge[] = [
  "100% Free",
  "Free Account + OpenVPN",
  "Free Tier / 0 Cubes",
  "Free Active Pool",
  "Free Downloadable VM",
  "Pay-What-You-Can ($0+)",
];

export function AddResourceModal({
  open,
  onClose,
  onAdd,
}: AddResourceModalProps) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<Platform>("TryHackMe");
  const [resourceType, setResourceType] =
    useState<CyberResource["resourceType"]>("Room");
  const [category, setCategory] = useState<Category>("CTF Challenges");
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");
  const [freeStatus, setFreeStatus] = useState<FreeTierBadge>("100% Free");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [freeAccessTip, setFreeAccessTip] = useState(
    "Accessible with a free account."
  );
  const [skillsText, setSkillsText] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !description.trim()) {
      setError("Please fill in Title, URL, and Description.");
      return;
    }

    try {
      const parsed = new URL(url.trim());
      if (!["http:", "https:"].includes(parsed.protocol)) {
        setError("URL must start with https:// or http://");
        return;
      }
    } catch {
      setError("Please enter a valid URL (e.g. https://tryhackme.com/room/...).");
      return;
    }

    const skills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onAdd({
      title: title.trim(),
      platform,
      stage: "Stage 3: Easy CTFs & Boot2Root",
      resourceType,
      category,
      difficulty,
      freeStatus,
      freeAccessTip: freeAccessTip.trim() || "Free resource.",
      url: url.trim(),
      description: description.trim(),
      skills: skills.length > 0 ? skills : [category],
    });

    setTitle("");
    setUrl("");
    setDescription("");
    setSkillsText("");
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/80 bg-white/85 p-6 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-900/5 pb-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Add Custom Resource
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-900/5 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. TryHackMe: Brooklyn Nine Nine"
              className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Resource Type
              </label>
              <select
                value={resourceType}
                onChange={(e) =>
                  setResourceType(
                    e.target.value as CyberResource["resourceType"]
                  )
                }
                className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Room">Room</option>
                <option value="Learning Path">Learning Path</option>
                <option value="Starting Point">Starting Point</option>
                <option value="Machine Pool">Machine Pool</option>
                <option value="Academy Module">Academy Module</option>
                <option value="VulnHub VM">VulnHub VM</option>
                <option value="Bug Bounty Lab">Bug Bounty Lab</option>
                <option value="CTF Platform">CTF Platform</option>
                <option value="Wargame">Wargame</option>
                <option value="Cloud Lab">Cloud Lab</option>
                <option value="AD Lab">AD Lab</option>
                <option value="Career Course">Career Course</option>
                <option value="Tool / Reference">Tool / Reference</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Free Tier Status
              </label>
              <select
                value={freeStatus}
                onChange={(e) => setFreeStatus(e.target.value as FreeTierBadge)}
                className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
              >
                {FREE_STATUSES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Official URL *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://tryhackme.com/room/brooklynninenine"
              className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What concepts, vulnerabilities, or CTF challenges does this cover?"
              className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Free Access Tip
            </label>
            <input
              type="text"
              value={freeAccessTip}
              onChange={(e) => setFreeAccessTip(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Topics / Tags (comma separated)
            </label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="FTP, Steganography, Linux PrivEsc"
              className="mt-1 w-full rounded-xl border border-slate-900/10 bg-white/75 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-900/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-900/10 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
