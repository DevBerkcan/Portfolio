"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Zentrale Scroll-Sperre. Jede aktive Sperre (Preloader, Mobile-Menü …) trägt sich ein;
 * gescrollt werden darf erst, wenn keine mehr übrig ist. Ersetzt verstreute lenis.stop()/start()-Aufrufe,
 * die sich gegenseitig überschrieben haben. Greift auch ohne Lenis (Reduced Motion) über overflow.
 */
const locks = new Set<symbol>();

function apply(lenis: Lenis | undefined) {
  const locked = locks.size > 0;
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function useScrollLock(active: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (!active) return;
    const key = Symbol("scroll-lock");
    locks.add(key);
    apply(lenis);
    return () => {
      locks.delete(key);
      apply(lenis);
    };
  }, [active, lenis]);
}
