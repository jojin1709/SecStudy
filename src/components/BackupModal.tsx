"use client";

import { ChangeEvent, useState } from "react";
import { Download, RotateCcw, Upload, X } from "lucide-react";
import { BackupPayload } from "@/types/resource";

interface BackupModalProps {
  open: boolean;
  onClose: () => void;
  onExport: () => BackupPayload;
  onImport: (payload: BackupPayload) => void;
  onReset: () => void;
}

export function BackupModal({
  open,
  onClose,
  onExport,
  onImport,
  onReset,
}: BackupModalProps) {
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  if (!open) return null;

  const handleDownload = () => {
    const data = onExport();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `secstudy-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Backup exported as JSON!");
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as BackupPayload;
        onImport(parsed);
        setMessage("Backup imported successfully!");
      } catch {
        setMessage("Invalid backup JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    onReset();
    setConfirmReset(false);
    setMessage("All local progress and custom items cleared.");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/80 bg-white/85 p-6 shadow-2xl backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-900/5 pb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Backup & Local Storage
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-900/5 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-600">
          Your progress, bookmarks, notes, and custom rooms are stored locally in
          your browser. Export a JSON backup anytime to move between devices.
        </p>

        {message && (
          <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-700">
            {message}
          </div>
        )}

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            <Download className="h-4 w-4" />
            Export Progress & Notes (.json)
          </button>

          <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-900/10 bg-white/75 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-white">
            <Upload className="h-4 w-4" />
            Import Backup (.json)
            <input
              type="file"
              accept="application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={handleReset}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
              confirmReset
                ? "border-rose-500 bg-rose-500/20 text-rose-800"
                : "border-rose-500/25 bg-rose-500/10 text-rose-700 hover:bg-rose-500/15"
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            {confirmReset
              ? "Click again to confirm full reset"
              : "Reset All Local Progress"}
          </button>
        </div>
      </div>
    </div>
  );
}
