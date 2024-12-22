import { type RefObject, useEffect } from "react";

export default function useOnClickOutside<T extends HTMLElement | null>(
  ref: RefObject<T> | RefObject<T>[],
  handler: () => void,
) {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!target.isConnected) return;

      const isOutside = Array.isArray(ref)
        ? ref
          .filter(r => Boolean(r.current))
          .every(r => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler();
      }
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
}
