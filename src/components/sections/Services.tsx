"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { copy, services } from "@/lib/constants";
import { easeOutExpo } from "@/lib/utils";

export default function Services() {
  const [open, setOpen] = useState<number>(0);
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const sx = useSpring(gx, { stiffness: 120, damping: 20 });
  const sy = useSpring(gy, { stiffness: 120, damping: 20 });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-char px-4 py-28 md:px-8 md:py-40"
      aria-labelledby="services-title"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        gx.set(e.clientX - r.left);
        gy.set(e.clientY - r.top);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl md:block"
        style={{ x: sx, y: sy, background: "radial-gradient(circle, rgba(255,106,43,0.55), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <h2 id="services-title" className="text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            {copy.services.title.map((line, i) => (
              <Reveal key={line} delay={i * 0.08}>
                {line}
              </Reveal>
            ))}
          </h2>
          <p className="max-w-[34ch] text-ash md:text-right">{copy.services.lead}</p>
        </div>

        <ul className="border-t border-line">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className="border-b border-line">
                {/* Nur per Klick: Hover-Öffnen ließ die Zeilen unter dem Zeiger springen und kettenweise umschalten */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                >
                  <span
                    className={`font-display text-[clamp(1.9rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] text-bone transition-[opacity,translate] duration-500 ${
                      isOpen ? "translate-x-2 md:translate-x-6" : "opacity-45 group-hover:opacity-80"
                    }`}
                  >
                    {s.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-2xl md:h-16 md:w-16"
                    aria-hidden
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full bg-ember"
                      initial={false}
                      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.6 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                    />
                    <span className="relative">+</span>
                  </motion.span>
                </button>
                {/* Höhe schaltet ohne Animation um; der Inhalt wird per clip-path aufgedeckt */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.6, ease: easeOutExpo }}
                    >
                      <div className="grid gap-6 pb-10 md:grid-cols-[1fr_1fr] md:pl-6">
                        <p className="max-w-[48ch] text-lg leading-relaxed text-bone/80">{s.text}</p>
                        <ul className="flex flex-wrap content-start gap-2 md:justify-end">
                          {s.tags.map((t, ti) => (
                            <motion.li
                              key={t}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + ti * 0.05, duration: 0.5, ease: easeOutExpo }}
                              className="rounded-full border border-line px-4 py-2 text-sm text-bone/80"
                            >
                              {t}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
