"use client";
import { useCallback, useSyncExternalStore } from "react";
import { safeParseJSON } from "../utils/json";

export default function useLocalStorage<T = string>(key: string, initialValue: T | null = null) {
  const data = useSyncExternalStore(
    onChange => {
      const onStorageEvent = (e: Event) => {
        const customEvent = e as CustomEvent<{ key: string }>;
        if (customEvent.detail.key === key) {
          onChange();
        }
      };
      window.addEventListener("storage", onChange);
      window.addEventListener("local-storage-change", onStorageEvent as EventListener);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("local-storage-change", onStorageEvent as EventListener);
      };
    },
    () => {
      const item = localStorage.getItem(key);
      const value = item && safeParseJSON<T>(item);
      return value || initialValue;
    },
    () => initialValue,
  );

  const setData = useCallback((value: T | null) => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    window.dispatchEvent(new CustomEvent("local-storage-change", { detail: { key } }));
  }, [key]);

  return [data, setData] as const;
}
