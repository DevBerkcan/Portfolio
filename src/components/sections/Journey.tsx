"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { copy, journey } from "@/lib/constants";
import { easeOutExpo } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative bg-ink px-4 py-28 md:px-8 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="md:sticky md:top-32 md:self-start">
          <h2 id="journey-title" className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            <Reveal>{copy.journey.title}</Reveal>
          </h2>
          <p className="mt-6 max-w-[36ch] text-ash">{copy.journey.lead}</p>
        </div>

        <ol ref={ref} className="relative pl-10 md:pl-16">
          <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[11px]" />
          <motion.span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold to-ember md:left-[11px]"
            style={{ scaleY: line }}
          />
          {journey.map((j, i) => (
            <li key={j.title} className="relative pb-16 last:pb-0 md:pb-24">
              <span
                aria-hidden
                className="absolute -left-10 top-2 h-[15px] w-[15px] rounded-full border border-line bg-ink md:-left-16 md:h-[23px] md:w-[23px]"
              >
                {/* Glut-Ebene mit festem Schein — nur die Deckkraft wird animiert */}
                <motion.span
                  className="absolute -inset-px rounded-full bg-ember shadow-[0_0_28px_rgba(255,106,43,0.8)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  transition={{ duration: 0.5 }}
                />
              </span>
              <motion.div
                data-anim
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, delay: i * 0.05, ease: easeOutExpo }}
              >
                <p className="text-sm text-gold">{j.when}</p>
                <h3 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-tight tracking-tight">
                  {j.title}
                </h3>
                <p className="mt-1 text-bone/60">{j.place}</p>
                <p className="mt-4 max-w-[48ch] leading-relaxed text-bone/80">{j.text}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
