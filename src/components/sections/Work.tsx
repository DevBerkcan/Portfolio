"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { easeOutExpo } from "@/lib/utils";
import ProjectVisual from "@/components/ui/ProjectVisual";
import Reveal from "@/components/motion/Reveal";

function ProjectCard({ project, index, progress }: { project: Project; index: number; progress?: MotionValue<number> }) {
  // Leichte Parallaxe der Grafik innerhalb der Karte
  const fallback = useSpring(0);
  const local = useTransform(progress ?? fallback, [0, 1], [24 + index * 4, -24 - index * 4]);
  const Wrapper = project.href ? "a" : "div";
  return (
    <article className="group relative flex w-full shrink-0 flex-col gap-6 md:w-[min(62vw,980px)]">
      <Wrapper
        {...(project.href ? { href: project.href, target: "_blank", rel: "noreferrer", "data-cursor": "Ansehen" } : { "data-cursor": "Projekt" })}
        className="relative block aspect-[16/11] overflow-hidden rounded-[1.75rem] bg-smoke p-4 md:aspect-[16/10] md:p-8"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(90% 70% at 70% 100%, ${project.palette[0]}55, transparent 70%)` }}
        />
        <motion.div
          className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:-rotate-1"
          style={{ x: progress ? local : 0 }}
        >
          <ProjectVisual project={project} />
        </motion.div>
      </Wrapper>
      <div className="grid gap-3 md:grid-cols-[1fr_1.3fr] md:gap-8">
        <div>
          <p className="text-sm text-ash">{project.kind}</p>
          <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h3>
        </div>
        <div>
          <p className="max-w-[52ch] leading-relaxed text-bone/75">{project.text}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-bone/70">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Horizontal() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(projects.length, Math.max(1, Math.round(v * (projects.length - 1)) + 1)));
  });

  return (
    <section
      id="work"
      ref={section}
      aria-labelledby="work-title"
      className="relative bg-ink"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={track} className="flex items-center gap-[6vw] pl-8 pr-[10vw] will-change-transform" style={{ x }}>
          <div className="flex w-[34vw] shrink-0 flex-col justify-between self-stretch py-4">
            <h2 id="work-title" className="text-[clamp(3rem,7.5vw,8rem)] font-bold leading-[0.88] tracking-[-0.045em]">
              <Reveal>Ausge-</Reveal>
              <Reveal delay={0.06}>wählte</Reveal>
              <Reveal delay={0.12}>Arbeiten</Reveal>
            </h2>
            <p className="max-w-[30ch] text-ash">
              Eigene Produkte, Plattformen und Unternehmen. Scrollen Sie weiter, die Seite läuft seitwärts.
            </p>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} progress={smooth} />
          ))}
        </motion.div>

        <div className="absolute inset-x-8 bottom-8 flex items-center gap-6">
          <span className="font-display text-sm tabular-nums text-bone">
            {String(active).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-full origin-left bg-ember" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Vertical() {
  return (
    <section id="work" aria-labelledby="work-title-m" className="bg-ink px-4 py-24">
      <h2 id="work-title-m" className="mb-6 text-[clamp(3rem,14vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
        <Reveal>Ausgewählte</Reveal>
        <Reveal delay={0.06}>Arbeiten</Reveal>
      </h2>
      <p className="mb-14 max-w-[34ch] text-ash">Eigene Produkte, Plattformen und Unternehmen.</p>
      <div className="flex flex-col gap-20">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 60, clipPath: "inset(12% 0 0 0 round 28px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 28px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
          >
            <ProjectCard project={p} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Work() {
  const desktop = useMediaQuery("(min-width: 768px)", true);
  return desktop ? <Horizontal /> : <Vertical />;
}
