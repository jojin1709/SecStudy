"use client";

import {
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  Circle,
  FileText,
  PlayCircle,
  Trash2,
} from "lucide-react";
import {
  CyberResource,
  Difficulty,
  Platform,
  ProgressStatus,
  ResourceProgress,
} from "@/types/resource";

interface ResourceTableProps {
  resources: CyberResource[];
  getProgress: (id: string) => ResourceProgress;
  onCycleStatus: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onOpenDetails: (resource: CyberResource) => void;
  onDeleteCustom?: (id: string) => void;
}

const PLATFORM_DOT: Record<Platform, string> = {
  TryHackMe: "bg-rose-500",
  "Hack The Box": "bg-emerald-500",
  "CTFs & Wargames": "bg-sky-500",
  "Tools & Cheat Sheets": "bg-amber-500",
};

const DIFFICULTY_TEXT: Record<Difficulty, string> = {
  Beginner: "text-emerald-700",
  Easy: "text-sky-700",
  Medium: "text-amber-700",
  Hard: "text-rose-700",
};

const STATUS_ICON: Record<
  ProgressStatus,
  { label: string; color: string; Icon: typeof Circle }
> = {
  todo: {
    label: "Todo",
    color: "text-stone-400 hover:text-stone-700",
    Icon: Circle,
  },
  in_progress: {
    label: "In Progress",
    color: "text-[#4F46E5]",
    Icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "text-emerald-600",
    Icon: CheckCircle2,
  },
};

export function ResourceTable({
  resources,
  getProgress,
  onCycleStatus,
  onToggleBookmark,
  onOpenDetails,
  onDeleteCustom,
}: ResourceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EAE6DD] bg-white shadow-[0_2px_6px_rgba(28,25,23,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#EAE6DD] bg-[#F4F2EC] text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <th className="w-12 py-3.5 pl-4 pr-2">State</th>
              <th className="py-3.5 px-3">Resource</th>
              <th className="hidden py-3.5 px-3 md:table-cell">Platform</th>
              <th className="hidden py-3.5 px-3 lg:table-cell">Category</th>
              <th className="py-3.5 px-3">Level</th>
              <th className="hidden py-3.5 px-3 sm:table-cell">Free Access</th>
              <th className="py-3.5 pl-2 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE6DD]">
            {resources.map((res) => {
              const p = getProgress(res.id);
              const s = STATUS_ICON[p.status];
              const StatusIcon = s.Icon;
              const hasNotes = p.notes.trim().length > 0;

              return (
                <tr
                  key={res.id}
                  onClick={() => onOpenDetails(res)}
                  className="cursor-pointer transition hover:bg-[#FAF9F5]"
                >
                  <td
                    className="py-3 pl-4 pr-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onCycleStatus(res.id)}
                      title={`Status: ${s.label} (click to cycle)`}
                      className={`rounded-lg p-1 transition ${s.color}`}
                    >
                      <StatusIcon className="h-4 w-4" />
                    </button>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900 hover:text-[#4F46E5]">
                        {res.title}
                      </span>
                      {hasNotes && (
                        <FileText className="h-3.5 w-3.5 shrink-0 text-[#4F46E5]" />
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-stone-500 md:hidden">
                      {res.platform} · {res.category}
                    </div>
                  </td>

                  <td className="hidden py-3 px-3 text-xs font-medium text-stone-700 md:table-cell">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${PLATFORM_DOT[res.platform]}`}
                      />
                      {res.platform}
                    </span>
                  </td>

                  <td className="hidden py-3 px-3 text-xs text-stone-600 lg:table-cell">
                    {res.category}
                  </td>

                  <td className="py-3 px-3 text-xs font-semibold">
                    <span className={DIFFICULTY_TEXT[res.difficulty]}>
                      {res.difficulty}
                    </span>
                  </td>

                  <td className="hidden py-3 px-3 text-xs font-medium text-emerald-700 sm:table-cell">
                    {res.freeStatus}
                  </td>

                  <td
                    className="py-3 pl-2 pr-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(res.id)}
                        className={`rounded-lg p-1.5 transition ${
                          p.bookmarked
                            ? "text-amber-600"
                            : "text-stone-400 hover:text-stone-700"
                        }`}
                      >
                        <Bookmark
                          className="h-3.5 w-3.5"
                          fill={p.bookmarked ? "currentColor" : "none"}
                        />
                      </button>

                      {res.isCustom && onDeleteCustom && (
                        <button
                          type="button"
                          onClick={() => onDeleteCustom(res.id)}
                          className="rounded-lg p-1.5 text-stone-400 hover:text-rose-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}

                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#4F46E5]/10 px-2.5 py-1 text-xs font-semibold text-[#4F46E5] transition hover:bg-[#4F46E5] hover:text-white"
                      >
                        Open
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
