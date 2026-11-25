"use client";

import {
  ArrowUpRight,
  Bookmark,
  CheckCircle2,
  Circle,
  Clock,
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

interface ResourceCardProps {
  resource: CyberResource;
  progress: ResourceProgress;
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

const DIFFICULTY_BADGE: Record<Difficulty, string> = {
  Beginner: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
  Easy: "text-sky-700 bg-sky-50 border-sky-200/80",
  Medium: "text-amber-700 bg-amber-50 border-amber-200/80",
  Hard: "text-rose-700 bg-rose-50 border-rose-200/80",
};

const STATUS_CONFIG: Record<
  ProgressStatus,
  { label: string; style: string; Icon: typeof Circle }
> = {
  todo: {
    label: "Todo",
    style:
      "bg-[#F4F2EC] text-stone-600 hover:bg-[#EAE6DD] hover:text-stone-900",
    Icon: Circle,
  },
  in_progress: {
    label: "In Progress",
    style: "text-[#4F46E5] bg-[#4F46E5]/10 hover:bg-[#4F46E5]/15",
    Icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    style: "text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80",
    Icon: CheckCircle2,
  },
};

export function ResourceCard({
  resource,
  progress,
  onCycleStatus,
  onToggleBookmark,
  onOpenDetails,
  onDeleteCustom,
}: ResourceCardProps) {
  const statusInfo = STATUS_CONFIG[progress.status];
  const StatusIcon = statusInfo.Icon;
  const hasNotes = progress.notes.trim().length > 0;

  return (
    <article
      onClick={() => onOpenDetails(resource)}
      className={`group flex cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_2px_6px_rgba(28,25,23,0.03)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(28,25,23,0.06)] ${
        progress.status === "completed"
          ? "border-emerald-300/80"
          : progress.status === "in_progress"
            ? "border-[#4F46E5]/40"
            : "border-[#EAE6DD] hover:border-[#D8D2C5]"
      }`}
    >
      <div>
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-stone-700">
              <span
                className={`h-2 w-2 rounded-full ${PLATFORM_DOT[resource.platform]}`}
              />
              {resource.platform}
            </span>
            <span className="text-stone-300">·</span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${DIFFICULTY_BADGE[resource.difficulty]}`}
            >
              {resource.difficulty}
            </span>
          </div>

          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onToggleBookmark(resource.id)}
              title={progress.bookmarked ? "Remove bookmark" : "Bookmark"}
              className={`rounded-xl p-1.5 transition ${
                progress.bookmarked
                  ? "bg-amber-50 text-amber-600"
                  : "text-stone-400 hover:bg-[#F4F2EC] hover:text-stone-700"
              }`}
            >
              <Bookmark
                className="h-4 w-4"
                fill={progress.bookmarked ? "currentColor" : "none"}
              />
            </button>
            {resource.isCustom && onDeleteCustom && (
              <button
                type="button"
                onClick={() => onDeleteCustom(resource.id)}
                title="Delete custom resource"
                className="rounded-xl p-1.5 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-[15px] font-semibold leading-snug text-stone-900 transition group-hover:text-[#4F46E5]">
          {resource.title}
        </h3>

        {/* Sub-metadata */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span>{resource.category}</span>
          <span>·</span>
          <span className="font-medium text-emerald-700">
            {resource.freeStatus}
          </span>
          {resource.estimatedMinutes && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {resource.estimatedMinutes >= 60
                  ? `${Math.round(resource.estimatedMinutes / 60)}h`
                  : `${resource.estimatedMinutes}m`}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-stone-600">
          {resource.description}
        </p>

        {/* Secondary Warm Stone Pill Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {resource.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-[#EAE6DD] bg-[#F4F2EC] px-2.5 py-0.5 text-[11px] font-medium text-stone-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div
        className="mt-4 flex items-center justify-between border-t border-[#EAE6DD] pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onCycleStatus(resource.id)}
            title="Click to cycle status"
            className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-medium transition ${statusInfo.style}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusInfo.label}
          </button>

          {hasNotes && (
            <button
              type="button"
              onClick={() => onOpenDetails(resource)}
              title="View saved notes"
              className="inline-flex items-center gap-1 rounded-xl bg-[#F4F2EC] px-2 py-1 text-[11px] font-medium text-[#4F46E5] hover:bg-[#EAE6DD]"
            >
              <FileText className="h-3 w-3" />
              Notes
            </button>
          )}
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-xl bg-[#4F46E5]/10 px-3 py-1 text-xs font-semibold text-[#4F46E5] transition hover:bg-[#4F46E5] hover:text-white"
        >
          Open
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
