"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { site, socials } from "@/lib/constants";
import { easeOutExpo } from "@/lib/utils";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  // Ebene in Sektionsgröße per transform verschieben (Prozent = Anteil der eigenen, also der Sektionsgröße),
  // statt den Verlauf in jedem Frame neu zu setzen
  const glowX = useTransform(sx, (v) => `${v}%`);
  const glowY = useTransform(sy, (v) => `${v}%`);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  const bigOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-char px-4 pt-28 md:px-8 md:pt-44"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: glowX, y: glowY }}>
        <div
          className="absolute left-0 top-0 h-[60rem] w-[80rem] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(40rem 30rem at center, rgba(255,106,43,0.28), transparent 70%)" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1600px]">
        <p className="mb-8 text-ash">Kontakt</p>
        <h2 id="contact-title" className="text-[clamp(3.2rem,11vw,11rem)] font-bold leading-[0.86] tracking-[-0.05em]">
          <Reveal>Bereit, etwas</Reveal>
          <Reveal delay={0.08}>
            <span className="text-glow">zu entfachen?</span>
          </Reveal>
        </h2>

        <div className="mt-16 grid gap-12 border-t border-line pt-10 md:mt-24 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="max-w-[44ch] text-lg leading-relaxed text-bone/80">
              Erzählen Sie mir von Ihrem Vorhaben, ob neue Website, eigene Software oder ein Prozess, der endlich
              automatisch laufen soll. Ich melde mich zeitnah mit einer ehrlichen Einschätzung.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Projektanfrage")}`}
                  className="group relative inline-flex h-16 items-center overflow-hidden rounded-full bg-ember px-8 text-base font-semibold text-ink"
                >
                  <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="relative">E-Mail schreiben</span>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-16 items-center rounded-full border border-line px-7 text-base text-bone/90 transition-colors hover:border-bone/50"
              >
                <motion.span key={copied ? "c" : "e"} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}>
                  {copied ? "Adresse kopiert" : site.email}
                </motion.span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-4 text-ash">Netzwerke</p>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-bone/85 hover:text-bone">
                      <span className="relative">
                        {s.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ember transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-ash">Standort</p>
              <p className="text-bone/85">
                Wuppertal
                <br />
                Projekte in ganz NRW und remote im DACH-Raum
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative mx-auto mt-28 max-w-[1600px] md:mt-40">
        <div className="flex flex-col gap-4 border-t border-line py-6 text-sm text-ash md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="hover:text-bone">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-bone">
              Datenschutz
            </Link>
            <button
              type="button"
              onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
              className="hover:text-bone"
            >
              Nach oben
            </button>
          </nav>
        </div>
        <motion.p
          aria-hidden
          className="pointer-events-none select-none whitespace-nowrap font-display text-[19vw] font-bold leading-[0.75] tracking-[-0.06em] text-bone/[0.06] md:text-[18.5vw]"
          style={{ x: bigX, opacity: bigOpacity }}
        >
          Atesoglu
        </motion.p>
      </footer>
    </section>
  );
}
