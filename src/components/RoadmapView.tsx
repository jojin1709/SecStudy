"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Compass,
  PlayCircle,
} from "lucide-react";
import { STUDY_ROADMAPS } from "@/data/roadmaps";
import { CyberResource, ResourceProgress } from "@/types/resource";

interface RoadmapViewProps {
  resourcesById: Map<string, CyberResource>;
  getProgress: (id: string) => ResourceProgress;
  onCycleStatus: (id: string) => void;
  onOpenDetails: (resource: CyberResource) => void;
  onBrowseAll: () => void;
}

const ACCENT_MAP = {
  emerald: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
  cyan: "text-sky-700 bg-sky-50 border-sky-200/80",
  amber: "text-amber-700 bg-amber-50 border-amber-200/80",
  violet: "text-[#4F46E5] bg-[#4F46E5]/10 border-[#4F46E5]/20",
  rose: "text-rose-700 bg-rose-50 border-rose-200/80",
};

const BAR_MAP = {
  emerald: "bg-emerald-500",
  cyan: "bg-sky-500",
  amber: "bg-amber-500",
  violet: "bg-[#4F46E5]",
  rose: "bg-rose-500",
};

export function RoadmapView({
  resourcesById,
  getProgress,
  onCycleStatus,
  onOpenDetails,
  onBrowseAll,
}: RoadmapViewProps) {
  const [selectedId, setSelectedId] = useState<string>(
    STUDY_ROADMAPS[0]?.id ?? "all"
  );

  const visibleRoadmaps =
    selectedId === "all"
      ? STUDY_ROADMAPS
      : STUDY_ROADMAPS.filter((r) => r.id === selectedId);

  return (
    <div className="space-y-5">
      {/* Start Here Header Card */}
      <div className="rounded-2xl border border-[#EAE6DD] bg-white p-5 shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#4F46E5]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#4F46E5]">
              <Compass className="h-3.5 w-3.5" />
              Start Here · Step-by-Step Pathways
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
              Choose Your Career or Bug Bounty Path
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Pick a goal below and follow the numbered steps in order. Click
              any room to read its Free Access Tip, save notes, or mark it Done.
            </p>
          </div>

          <button
            type="button"
            onClick={onBrowseAll}
            className="shrink-0 rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] px-3.5 py-2 text-xs font-semibold text-stone-700 transition hover:bg-[#EAE6DD]"
          >
            Browse All {resourcesById.size} Labs →
          </button>
        </div>

        {/* Pathway Goal Tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {STUDY_ROADMAPS.map((r) => {
            const active = selectedId === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedId(r.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[#4F46E5] text-white shadow-sm"
                    : "border border-[#EAE6DD] bg-[#F4F2EC] text-stone-700 hover:bg-[#EAE6DD]"
                }`}
              >
                {r.title}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setSelectedId("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
              selectedId === "all"
                ? "bg-[#4F46E5] text-white shadow-sm"
                : "border border-[#EAE6DD] bg-[#F4F2EC] text-stone-700 hover:bg-[#EAE6DD]"
            }`}
          >
            View All ({STUDY_ROADMAPS.length})
          </button>
        </div>
      </div>

      {/* Selected Pathway Cards */}
      <div className="grid gap-5">
        {visibleRoadmaps.map((roadmap) => {
          const allIds = roadmap.steps.flatMap((s) => s.resourceIds);
          const uniqueIds = Array.from(new Set(allIds));
          const completedCount = uniqueIds.filter(
            (id) => getProgress(id).status === "completed"
          ).length;
          const pct =
            uniqueIds.length > 0
              ? Math.round((completedCount / uniqueIds.length) * 100)
              : 0;

          return (
            <section
              key={roadmap.id}
              className="rounded-2xl border border-[#EAE6DD] bg-white p-6 shadow-[0_2px_6px_rgba(28,25,23,0.03)]"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#EAE6DD] pb-4 md:flex-row md:items-center">
                <div>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${ACCENT_MAP[roadmap.accent]}`}
                  >
                    {roadmap.targetRole}
                  </span>
                  <h2 className="mt-2 text-lg font-bold text-stone-900">
                    {roadmap.title}
                  </h2>
                  <p className="mt-1 text-xs text-stone-600">
                    {roadmap.subtitle}
                  </p>
                </div>

                <div className="min-w-[190px]">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>Path Progress</span>
                    <span className="font-mono font-semibold text-stone-900">
                      {completedCount}/{uniqueIds.length} ({pct}%)
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#F4F2EC]">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${BAR_MAP[roadmap.accent]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sequential Step-by-Step Timeline */}
              <div className="mt-5 space-y-4">
                {roadmap.steps.map((step) => {
                  const stepDone = step.resourceIds.filter(
                    (id) => getProgress(id).status === "completed"
                  ).length;

                  return (
                    <div
                      key={step.id}
                      className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-stone-900">
                          {step.title}
                        </h3>
                        <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[11px] font-semibold text-stone-600">
                          {stepDone}/{step.resourceIds.length} done
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-stone-600">
                        {step.summary}
                      </p>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {step.resourceIds.map((resId, index) => {
                          const res = resourcesById.get(resId);
                          if (!res) return null;
                          const p = getProgress(res.id);
                          const StatusIcon =
                            p.status === "completed"
                              ? CheckCircle2
                              : p.status === "in_progress"
                                ? PlayCircle
                                : Circle;

                          return (
                            <div
                              key={res.id}
                              className="flex items-center justify-between gap-2 rounded-xl border border-[#EAE6DD] bg-white px-3 py-2 text-xs transition hover:border-[#D8D2C5]"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => onCycleStatus(res.id)}
                                  title="Click to cycle status"
                                  className={`shrink-0 ${
                                    p.status === "completed"
                                      ? "text-emerald-600"
                                      : p.status === "in_progress"
                                        ? "text-[#4F46E5]"
                                        : "text-stone-400 hover:text-stone-700"
                                  }`}
                                >
                                  <StatusIcon className="h-4 w-4" />
                                </button>

                                <span className="shrink-0 font-mono text-[11px] font-semibold text-stone-400">
                                  #{index + 1}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => onOpenDetails(res)}
                                  className={`truncate text-left font-medium hover:text-[#4F46E5] ${
                                    p.status === "completed"
                                      ? "text-stone-500 line-through"
                                      : "text-stone-800"
                                  }`}
                                >
                                  {res.title}
                                </button>
                              </div>

                              <div className="flex shrink-0 items-center gap-1.5">
                                <span className="hidden rounded bg-[#F4F2EC] px-1.5 py-0.5 text-[10px] font-medium text-stone-600 md:inline">
                                  {res.platform}
                                </span>
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-md p-1 text-stone-400 hover:bg-[#F4F2EC] hover:text-[#4F46E5]"
                                  title="Open official resource"
                                >
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
