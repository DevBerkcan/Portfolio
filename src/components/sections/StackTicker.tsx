"use client";

import Marquee from "@/components/motion/Marquee";
import { copy, stack } from "@/lib/constants";

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="mx-6 h-5 w-5 shrink-0 fill-ember md:mx-10 md:h-7 md:w-7" aria-hidden>
      <path d="M12 0c.7 6.4 5 10.7 12 12-7 1.3-11.3 5.6-12 12-.7-6.4-5-10.7-12-12C7 10.7 11.3 6.4 12 0Z" />
    </svg>
  );
}

export default function StackTicker() {
  return (
    <section aria-label={copy.stack.label} className="relative z-10 -mt-px border-y border-line bg-ink py-6 md:py-8">
      <Marquee baseVelocity={-1.6}>
        {stack.map((s) => (
          <span key={s} className="flex items-center font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-semibold tracking-tight">
            <span>{s}</span>
            <Spark />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
