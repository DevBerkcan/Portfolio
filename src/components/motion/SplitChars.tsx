"use client";

import { motion } from "motion/react";
import { easeOutExpo } from "@/lib/utils";

type Props = {
  text: string;
  play: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
};

/** Zeichenweise Maskenanimation: Buchstaben steigen aus der Grundlinie auf. */
export default function SplitChars({ text, play, delay = 0, stagger = 0.035, className }: Props) {
  return (
    <span aria-label={text} role="text" className={className}>
      <span aria-hidden className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em]">
        {Array.from(text).map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block will-change-transform"
            initial={{ y: "115%", rotate: 8, opacity: 0 }}
            animate={play ? { y: "0%", rotate: 0, opacity: 1 } : undefined}
            transition={{ delay: delay + i * stagger, duration: 1.1, ease: easeOutExpo }}
            style={{ transformOrigin: "0% 100%" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
