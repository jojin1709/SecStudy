"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
  Sparkles,
  X,
} from "lucide-react";
import {
  CyberResource,
  ProgressStatus,
  ResourceProgress,
} from "@/types/resource";

interface ResourceDetailModalProps {
  resource: CyberResource | null;
  progress: ResourceProgress | null;
  onClose: () => void;
  onSetStatus: (id: string, status: ProgressStatus) => void;
  onToggleBookmark: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

export function ResourceDetailModal({
  resource,
  progress,
  onClose,
  onSetStatus,
  onToggleBookmark,
  onSaveNotes,
}: ResourceDetailModalProps) {
  const [draftNotes, setDraftNotes] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setDraftNotes(progress?.notes ?? "");
    setSavedToast(false);
  }, [resource, progress?.notes]);

  useEffect(() => {
    if (!resource) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resource, onClose]);

  if (!resource || !progress) return null;

  const handleSaveNotes = () => {
    onSaveNotes(resource.id, draftNotes);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 1800);
  };

  const statuses: { value: ProgressStatus; label: string; Icon: typeof Circle }[] =
    [
      { value: "todo", label: "Todo", Icon: Circle },
      { value: "in_progress", label: "In Progress", Icon: PlayCircle },
      { value: "completed", label: "Completed", Icon: CheckCircle2 },
    ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs"
      onClick={onClose}
    >
      <aside
        className="flex h-full w-full max-w-xl flex-col border-l border-white/80 bg-white/85 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-900/5 px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">
                {resource.platform}
              </span>
              <span>·</span>
              <span>{resource.resourceType}</span>
              <span>·</span>
              <span className="font-medium text-emerald-700">
                {resource.freeStatus}
              </span>
            </div>
            <h2 className="mt-1.5 text-lg font-bold leading-snug text-slate-900">
              {resource.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* Status + Bookmark */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/65 p-3 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {statuses.map(({ value, label, Icon }) => {
                const active = progress.status === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onSetStatus(resource.id, value)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => onToggleBookmark(resource.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                progress.bookmarked
                  ? "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30"
                  : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
              }`}
            >
              <Bookmark
                className="h-3.5 w-3.5"
                fill={progress.bookmarked ? "currentColor" : "none"}
              />
              {progress.bookmarked ? "Saved" : "Save"}
            </button>
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center gap-3 text-xs text-slate-500">
              <span>Category: {resource.category}</span>
              <span>·</span>
              <span>Difficulty: {resource.difficulty}</span>
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
            <p className="text-sm leading-relaxed text-slate-700">
              {resource.description}
            </p>
          </div>

          {/* Free Access Tip */}
          <div className="rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.06] p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Free Access Tip
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
              {resource.freeAccessTip}
            </p>
          </div>

          {/* Skills */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Topics & Tools
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {resource.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/80 bg-white/70 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="drawer-notes"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
              >
                Personal Study Notes & Commands
              </label>
              {progress.updatedAt && (
                <span className="text-[11px] text-slate-500">
                  Updated {new Date(progress.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <textarea
              id="drawer-notes"
              rows={7}
              value={draftNotes}
              onChange={(e) => setDraftNotes(e.target.value)}
              placeholder="Write your study notes, key takeaways, commands, or writeup links..."
              className="mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/75 p-3.5 font-mono text-xs leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-900/5 bg-white/60 px-6 py-4 backdrop-blur-md">
          <button
            type="button"
            onClick={handleSaveNotes}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-900/10 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-white"
          >
            {savedToast ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                Notes Saved
              </>
            ) : (
              "Save Notes"
            )}
          </button>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Open Resource
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </aside>
    </div>
  );
}
