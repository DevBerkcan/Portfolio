"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/utils";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const inner: Variants = {
  hidden: { y: "105%" },
  show: (delay: number) => ({ y: "0%", transition: { duration: 1.1, delay, ease: easeOutExpo } }),
};

/**
 * Zeilen-Maske: Inhalt gleitet aus einem überlaufenden Container nach oben.
 * Der Sichtbarkeits-Trigger sitzt auf dem äußeren (sichtbaren) Container — der innere
 * ist anfangs weggeclippt und würde vom IntersectionObserver nie erkannt.
 */
export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.06em] -mb-[0.06em] ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.span data-anim className="block will-change-transform" variants={inner} custom={delay}>
        {children}
      </motion.span>
    </motion.span>
  );
}
