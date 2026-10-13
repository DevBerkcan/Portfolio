"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, type CSSProperties } from "react";

/**
 * Text, der sich Wort für Wort im Scroll-Tempo „entzündet".
 * Ein einziger Scroll-Wert landet als CSS-Variable --p am Absatz; jedes Wort rechnet seinen
 * Fortschritt in CSS selbst aus (.scroll-word in globals.css) — keine Komponente pro Wort.
 */
export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.style.setProperty("--p", String(v));
  });

  return (
    <p ref={ref} className={className} style={{ "--p": 0, "--n": words.length } as CSSProperties}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} data-anim className="scroll-word" style={{ "--i": i } as CSSProperties}>
          {w}
        </span>
      ))}
    </p>
  );
}
