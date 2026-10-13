"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { useIntro } from "@/hooks/useIntro";
import { easeInOutQuart, easeOutExpo } from "@/lib/utils";

/** Zähler 0→100, glimmendes „Ateş", dann Vorhang nach oben direkt in den Hero. */
export default function Preloader() {
  const { done, finish } = useIntro();
  const [visible, setVisible] = useState(!done);
  const lenis = useLenis();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const glow = useTransform(count, [0, 100], [0.15, 1]);
  const bar = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      setVisible(false);
      return;
    }
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const controls = animate(count, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setVisible(false);
        finish();
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, lenis]);

  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
      lenis?.start();
    }
  }, [done, lenis]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 md:px-10 md:py-8"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: easeInOutQuart }}
        >
          <div className="flex items-start justify-between text-sm text-ash">
            <span>Berk-Can Atesoglu</span>
            <span>Düsseldorf</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.span
              className="font-display text-[clamp(4.5rem,18vw,14rem)] leading-none tracking-tight text-ember"
              style={{ opacity: glow }}
              initial={{ y: 40, filter: "blur(12px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: easeOutExpo }}
            >
              Ateş
            </motion.span>
            <motion.span
              className="text-sm text-ash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              türkisch für Feuer
            </motion.span>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 origin-left overflow-hidden bg-line">
              <motion.div className="h-full w-full origin-left bg-ember" style={{ scaleX: bar }} />
            </div>
            <motion.span className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tabular-nums">
              {rounded}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
