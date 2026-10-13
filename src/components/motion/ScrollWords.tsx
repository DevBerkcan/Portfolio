"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const blur = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span data-anim style={{ opacity, filter: blur }}>{word}</motion.span>
    </span>
  );
}

/** Text, der sich Wort für Wort im Scroll-Tempo „entzündet". */
export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}
