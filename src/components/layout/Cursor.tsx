"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Punkt + nachziehender Ring. Über Links wächst der Ring,
 * über Elementen mit data-cursor="Text" erscheint ein Label.
 */
export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });
  const [state, setState] = useState<{ hover: boolean; label: string | null }>({ hover: false, label: null });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!shown) setShown(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setState({ hover: !!el, label: el?.dataset.cursor ?? null });
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
  }, [fine, shown, x, y]);

  if (!fine) return null;

  const size = state.label ? 96 : state.hover ? 56 : 32;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: shown ? 1 : 0 }}>
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/60 text-xs font-medium text-ink"
          animate={{
            width: size,
            height: size,
            backgroundColor: state.label ? "rgba(255,195,110,1)" : "rgba(255,195,110,0)",
            borderColor: state.label ? "rgba(255,195,110,0)" : "rgba(243,236,230,0.5)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {state.label}
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0 mix-blend-difference" style={{ x, y }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone" />
      </motion.div>
    </div>
  );
}
