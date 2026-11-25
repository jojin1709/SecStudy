"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  PlayCircle,
} from "lucide-react";
import { STUDY_ROADMAPS } from "@/data/roadmaps";
import { CyberResource, ResourceProgress } from "@/types/resource";

interface RoadmapViewProps {
  resourcesById: Map<string, CyberResource>;
  getProgress: (id: string) => ResourceProgress;
  onCycleStatus: (id: string) => void;
  onOpenDetails: (resource: CyberResource) => void;
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
}: RoadmapViewProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-stone-900">
          Guided Study Roadmaps
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Step-by-step free tracks combining TryHackMe, Hack The Box, wargames,
          and tools. Click any item to inspect notes or mark progress.
        </p>
      </div>

      <div className="grid gap-5">
        {STUDY_ROADMAPS.map((roadmap) => {
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
                  <h3 className="mt-2 text-lg font-bold text-stone-900">
                    {roadmap.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-600">
                    {roadmap.subtitle}
                  </p>
                </div>

                <div className="min-w-[190px]">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>Completed</span>
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

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {roadmap.steps.map((step) => (
                  <div
                    key={step.id}
                    className="rounded-xl border border-[#EAE6DD] bg-[#F4F2EC] p-4"
                  >
                    <h4 className="text-sm font-semibold text-stone-900">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      {step.summary}
                    </p>

                    <div className="mt-3 space-y-1.5">
                      {step.resourceIds.map((resId) => {
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
                            className="flex items-center justify-between gap-2 rounded-xl bg-white px-2.5 py-1.5 text-xs transition hover:bg-[#FAF9F5]"
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onCycleStatus(res.id)}
                                title="Cycle status"
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

                              <button
                                type="button"
                                onClick={() => onOpenDetails(res)}
                                className="truncate text-left font-medium text-stone-800 hover:text-[#4F46E5]"
                              >
                                {res.title}
                              </button>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                              <span className="hidden text-[11px] text-stone-500 sm:inline">
                                {res.platform}
                              </span>
                              <a
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-400 hover:text-[#4F46E5]"
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
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
