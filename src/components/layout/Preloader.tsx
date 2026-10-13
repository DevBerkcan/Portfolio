"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { introAlreadyPlayed, useIntro } from "@/hooks/useIntro";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { copy, site } from "@/lib/constants";
import { easeInOutQuart, easeOutExpo } from "@/lib/utils";

/**
 * Zähler 0→100, glimmendes „Ateş", dann Vorhang nach oben direkt in den Hero.
 * Ohne JS, bei Reduced Motion oder wenn er in dieser Sitzung schon lief, blendet CSS ihn
 * schon vor der Hydration aus (data-preloader).
 */
export default function Preloader() {
  const { done, finish } = useIntro();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const glow = useTransform(count, [0, 100], [0.15, 1]);
  const bar = useTransform(count, [0, 100], [0, 1]);

  useScrollLock(!done);

  useEffect(() => {
    if (done) return;
    // Schon gesehen (diese Sitzung) oder Reduced Motion: CSS hat ihn bereits ausgeblendet, direkt weiter.
    if (introAlreadyPlayed() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    const controls = animate(count, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onComplete: finish,
    });
    return () => controls.stop();
  }, [done, finish, count]);

  // Bei Reduced Motion komplett aushängen — ohne AnimatePresence läuft auch kein Exit-Vorhang.
  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          data-preloader
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 md:px-10 md:py-8"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: easeInOutQuart }}
        >
          <div className="flex items-start justify-between text-sm text-ash">
            <span>{site.name}</span>
            <span>{site.city}</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.span
              className="font-display text-[clamp(4.5rem,18vw,14rem)] leading-none tracking-tight"
              style={{ opacity: glow }}
              initial={{ y: 40, filter: "blur(12px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: easeOutExpo }}
            >
              {/* Eigene Ebene: die filter-Animation von .text-glow würde sonst den Blur-Einstieg überschreiben */}
              <span className="text-glow">{copy.preloader.word}</span>
            </motion.span>
            <motion.span
              className="text-sm text-ash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {copy.preloader.meaning}
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
