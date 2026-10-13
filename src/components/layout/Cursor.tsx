"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type HoverState = { hover: boolean; label: string | null };

/**
 * Punkt + nachziehender Ring. Über Links wächst der Ring,
 * über Elementen mit data-cursor="Text" erscheint ein Label.
 * Ring und Label-Füllung sind getrennte Ebenen mit fester Größe — animiert werden nur scale und opacity.
 */
export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });
  const [state, setState] = useState<HoverState>({ hover: false, label: null });
  // Letztes Label behalten, damit der Text beim Ausblenden nicht schon vorher verschwindet
  const [lastLabel, setLastLabel] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      const next = { hover: !!el, label: el?.dataset.cursor ?? null };
      // Nur bei echter Änderung neu rendern — pointerover feuert an jeder Elementgrenze
      setState((prev) => (prev.hover === next.hover && prev.label === next.label ? prev : next));
      if (next.label) setLastLabel(next.label);
    };
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: shown ? 1 : 0 }}>
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        {/* Ring: 32 px, über Links 56 px, bei Label ausgeblendet */}
        <motion.div
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/50"
          animate={{ scale: state.label ? 1.5 : state.hover ? 1.75 : 1, opacity: state.label ? 0 : 1 }}
          transition={spring}
        />
        {/* Label-Füllung: 96 px, wächst aus der Ringgröße heraus */}
        <motion.div
          className="absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-xs font-medium text-ink"
          initial={false}
          animate={{ scale: state.label ? 1 : 0.33, opacity: state.label ? 1 : 0 }}
          transition={spring}
        >
          {state.label ?? lastLabel}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0 mix-blend-difference" style={{ x, y }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone" />
      </motion.div>
    </div>
  );
}
