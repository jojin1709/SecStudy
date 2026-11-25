"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CURATED_RESOURCES } from "@/data/resources";
import {
  BackupPayload,
  CyberResource,
  ProgressStatus,
  ResourceProgress,
} from "@/types/resource";

const STORAGE_PROGRESS_KEY = "cybervault_progress_v1";
const STORAGE_CUSTOM_KEY = "cybervault_custom_resources_v1";

const DEFAULT_PROGRESS: ResourceProgress = {
  status: "todo",
  bookmarked: false,
  notes: "",
  updatedAt: "",
};

export function useCyberVault() {
  const [progressById, setProgressById] = useState<
    Record<string, ResourceProgress>
  >({});
  const [customResources, setCustomResources] = useState<CyberResource[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawProgress = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (rawProgress) {
        setProgressById(JSON.parse(rawProgress));
      }
      const rawCustom = localStorage.getItem(STORAGE_CUSTOM_KEY);
      if (rawCustom) {
        setCustomResources(JSON.parse(rawCustom));
      }
    } catch (error) {
      console.error("Failed to read local CyberVault data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(progressById));
    } catch (error) {
      console.error("Failed to persist progress:", error);
    }
  }, [progressById, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_CUSTOM_KEY,
        JSON.stringify(customResources)
      );
    } catch (error) {
      console.error("Failed to persist custom resources:", error);
    }
  }, [customResources, isLoaded]);

  const allResources = useMemo(
    () => [...CURATED_RESOURCES, ...customResources],
    [customResources]
  );

  const getProgress = useCallback(
    (id: string): ResourceProgress => {
      return progressById[id] ?? DEFAULT_PROGRESS;
    },
    [progressById]
  );

  const setStatus = useCallback((id: string, status: ProgressStatus) => {
    setProgressById((prev) => {
      const current = prev[id] ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        [id]: {
          ...current,
          status,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const cycleStatus = useCallback((id: string) => {
    setProgressById((prev) => {
      const current = prev[id] ?? DEFAULT_PROGRESS;
      const nextStatus: ProgressStatus =
        current.status === "todo"
          ? "in_progress"
          : current.status === "in_progress"
            ? "completed"
            : "todo";
      return {
        ...prev,
        [id]: {
          ...current,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setProgressById((prev) => {
      const current = prev[id] ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        [id]: {
          ...current,
          bookmarked: !current.bookmarked,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const saveNotes = useCallback((id: string, notes: string) => {
    setProgressById((prev) => {
      const current = prev[id] ?? DEFAULT_PROGRESS;
      return {
        ...prev,
        [id]: {
          ...current,
          notes,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const addCustomResource = useCallback(
    (input: Omit<CyberResource, "id" | "recommendedOrder" | "isCustom">) => {
      const newResource: CyberResource = {
        ...input,
        id: `custom-${Date.now()}`,
        recommendedOrder: 1000 + customResources.length + 1,
        isCustom: true,
      };
      setCustomResources((prev) => [newResource, ...prev]);
      return newResource;
    },
    [customResources.length]
  );

  const deleteCustomResource = useCallback((id: string) => {
    setCustomResources((prev) => prev.filter((item) => item.id !== id));
    setProgressById((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const exportBackup = useCallback((): BackupPayload => {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      progressById,
      customResources,
    };
  }, [progressById, customResources]);

  const importBackup = useCallback((payload: BackupPayload) => {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid backup format.");
    }
    if (payload.progressById && typeof payload.progressById === "object") {
      setProgressById(payload.progressById);
    }
    if (Array.isArray(payload.customResources)) {
      setCustomResources(payload.customResources);
    }
  }, []);

  const resetAllData = useCallback(() => {
    setProgressById({});
    setCustomResources([]);
    localStorage.removeItem(STORAGE_PROGRESS_KEY);
    localStorage.removeItem(STORAGE_CUSTOM_KEY);
  }, []);

  const stats = useMemo(() => {
    let completed = 0;
    let inProgress = 0;
    let bookmarked = 0;

    for (const resource of allResources) {
      const p = progressById[resource.id];
      if (!p) continue;
      if (p.status === "completed") completed += 1;
      if (p.status === "in_progress") inProgress += 1;
      if (p.bookmarked) bookmarked += 1;
    }

    const total = allResources.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      bookmarked,
      customCount: customResources.length,
      percent,
    };
  }, [allResources, progressById, customResources.length]);

  return {
    isLoaded,
    allResources,
    customResources,
    progressById,
    stats,
    getProgress,
    setStatus,
    cycleStatus,
    toggleBookmark,
    saveNotes,
    addCustomResource,
    deleteCustomResource,
    exportBackup,
    importBackup,
    resetAllData,
  };
}
