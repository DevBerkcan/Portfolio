"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { useIntro } from "@/hooks/useIntro";
import { copy, site } from "@/lib/constants";
import { easeOutExpo } from "@/lib/utils";
import SplitChars from "@/components/motion/SplitChars";
import Magnetic from "@/components/motion/Magnetic";

const EmberField = dynamic(() => import("@/components/webgl/EmberField"), { ssr: false });

function OrbitBadge({ play }: { play: boolean }) {
  const text = copy.hero.orbit;
  return (
    <motion.div
      data-anim
      initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
      animate={play ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      transition={{ delay: 1.1, duration: 1.4, ease: easeOutExpo }}
      className="relative h-28 w-28 md:h-36 md:w-36"
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_22s_linear_infinite]">
        <defs>
          <path id="orbit" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-bone/80 text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
          <textPath href="#orbit" textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 fill-ember md:h-10 md:w-10">
        <path d="M12 2c.6 3.2-1 5.2-2.6 7C7.8 10.8 6 12.7 6 15.6 6 19.1 8.7 22 12 22s6-2.9 6-6.4c0-2.3-1-4.1-2.3-5.6.1 1.6-.4 3-1.6 3.6.4-3.4-.6-8.4-2.1-11.6Z" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const { done } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const leftX = useTransform(p, [0, 0.8], ["0vw", "-22vw"]);
  const rightX = useTransform(p, [0, 0.8], ["0vw", "22vw"]);
  const nameScale = useTransform(p, [0, 0.8], [1, 1.12]);
  const nameOpacity = useTransform(p, [0.35, 0.75], [1, 0]);
  const metaY = useTransform(p, [0, 0.6], ["0%", "60%"]);
  const metaOpacity = useTransform(p, [0, 0.4], [1, 0]);
  const canvasScale = useTransform(p, [0, 1], [1, 1.25]);
  const veil = useTransform(p, [0.4, 1], [0, 1]);

  const toContact = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo("#contact", { duration: 2 });
    else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" ref={ref} className="relative h-[170svh]" aria-labelledby="hero-title">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: canvasScale }}>
          <EmberField progress={scrollYProgress} active={done} className="absolute inset-0 h-full w-full" />
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: veil }} />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-6 pt-28 md:px-8 md:pb-10">
          <motion.div className="absolute right-4 top-28 md:right-8 md:top-32" style={{ opacity: metaOpacity }}>
            <motion.p
              data-anim
              className="max-w-[15rem] text-right text-sm text-bone/70"
              initial={{ opacity: 0, y: 12 }}
              animate={done ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 1.2, duration: 1, ease: easeOutExpo }}
            >
              <span className="font-display text-base text-gold">{copy.hero.noteWord}</span> {copy.hero.note}
            </motion.p>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="font-display font-bold leading-[0.82] tracking-[-0.045em] text-bone"
            style={{ scale: nameScale, opacity: nameOpacity, fontVariationSettings: '"opsz" 96, "wdth" 85' }}
          >
            <motion.span className="block text-[clamp(4.2rem,21vw,17.5rem)] md:text-[clamp(4.2rem,17vw,17.5rem)]" style={{ x: leftX }}>
              <SplitChars text={site.firstName} play={done} delay={0.15} />
            </motion.span>
            <motion.span className="block text-right text-[clamp(4.2rem,21vw,17.5rem)] md:text-[clamp(4.2rem,17vw,17.5rem)]" style={{ x: rightX }}>
              <SplitChars text={site.lastName} play={done} delay={0.35} />
            </motion.span>
          </motion.h1>

          <motion.div
            className="mt-8 grid items-end gap-8 border-t border-line pt-6 md:mt-10 md:grid-cols-[1.2fr_auto_auto] md:gap-12"
            style={{ y: metaY, opacity: metaOpacity }}
          >
            <motion.p
              data-anim
              className="max-w-[40ch] text-base leading-relaxed text-bone/85 md:text-lg"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={done ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ delay: 0.9, duration: 1.2, ease: easeOutExpo }}
            >
              {copy.hero.intro}
            </motion.p>

            <motion.div
              data-anim
              className="flex items-center gap-3 text-sm text-bone/80"
              initial={{ opacity: 0 }}
              animate={done ? { opacity: 1 } : undefined}
              transition={{ delay: 1.3, duration: 1 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
              </span>
              {copy.hero.status}
            </motion.div>

            <div className="flex items-center gap-6">
              <Magnetic strength={0.4}>
                <a
                  href="#contact"
                  onClick={toContact}
                  data-cursor={copy.hero.ctaCursor}
                  className="group relative grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-bone text-center text-sm font-semibold leading-tight text-ink md:h-32 md:w-32"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="relative">
                    {copy.hero.cta[0]}
                    <br />
                    {copy.hero.cta[1]}
                  </span>
                </a>
              </Magnetic>
              <OrbitBadge play={done} />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
