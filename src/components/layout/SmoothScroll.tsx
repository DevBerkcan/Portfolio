"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -40 } }}>
      {children}
    </ReactLenis>
  );
}
