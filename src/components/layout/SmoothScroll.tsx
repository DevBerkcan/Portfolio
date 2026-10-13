"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Lenis läuft als Root-Instanz neben dem Inhalt statt um ihn herum — `useLenis` findet sie
 * über den Root-Store. So bleibt der Baum stabil, wenn Reduced Motion nach der Hydration greift.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <>
      {!reduced && <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -40 } }} />}
      {children}
    </>
  );
}
