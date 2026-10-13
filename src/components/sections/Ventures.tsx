"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { copy, ventures, type Venture } from "@/lib/constants";
import Reveal from "@/components/motion/Reveal";

function Card({ v, i, total, progress }: { v: Venture; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.045]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, i === total - 1 ? 0 : 0.45]);
  return (
    <div className="sticky top-0 flex h-svh items-center justify-center px-4 md:px-8">
      <motion.article
        style={{ scale, top: `calc(${i * 26}px)` }}
        className="relative flex min-h-[64svh] w-full max-w-[1300px] origin-top flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-char p-7 md:min-h-[60svh] md:p-14"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${v.tone}66, transparent 65%)` }}
        />
        <div className="relative flex items-start justify-between gap-6">
          <span className="rounded-full border border-line px-4 py-1.5 text-sm text-bone/80">{v.role}</span>
          <span className="h-3 w-3 rounded-full" style={{ background: v.tone, boxShadow: `0 0 24px ${v.tone}` }} />
        </div>
        <div className="relative mt-16 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h3 className="text-[clamp(2.6rem,7.5vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.045em]">{v.name}</h3>
          <div>
            <p className="max-w-[42ch] text-lg leading-relaxed text-bone/80">{v.text}</p>
            {v.href && (
              <a
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-b border-bone/40 pb-1 text-sm transition-colors hover:border-ember hover:text-ember"
              >
                {copy.ventures.visit}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export default function Ventures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="ventures" aria-labelledby="ventures-title" className="relative bg-ink pt-28 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <h2 id="ventures-title" className="text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          {copy.ventures.title.map((line, i) => (
            <Reveal key={line} delay={i * 0.08}>
              {line}
            </Reveal>
          ))}
        </h2>
        <p className="mt-6 max-w-[44ch] text-ash">{copy.ventures.lead}</p>
      </div>
      <div ref={ref} className="relative mt-8">
        {ventures.map((v, i) => (
          <Card key={v.name} v={v} i={i} total={ventures.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
