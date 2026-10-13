"use client";

import { motion } from "motion/react";
import ScrollWords from "@/components/motion/ScrollWords";
import Reveal from "@/components/motion/Reveal";
import { aboutText } from "@/lib/constants";
import { easeOutExpo } from "@/lib/utils";

const roles = [
  { title: "Gründer", text: "Gentle Webdesign, GentleBook und VIPSHUTTLE24. Ich weiß, wie es ist, Verantwortung für Umsatz und Kundschaft zu tragen." },
  { title: "Entwickler", text: "Next.js und React im Frontend, C# .NET und Azure im Backend, Microsoft 365 für alles, was Teams im Alltag nutzen." },
  { title: "Student", text: "Betriebswirtschaft an der FOM in Wuppertal. Damit jede technische Entscheidung auch eine wirtschaftliche ist." },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink px-4 py-28 md:px-8 md:py-44" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
        <div className="md:sticky md:top-32 md:self-start">
          <h2 id="about-title" className="text-sm font-normal text-ash" style={{ fontFamily: "var(--font-body)" }}>
            Über mich
          </h2>
        </div>
        <div>
          <ScrollWords
            text={aboutText}
            className="font-display text-[clamp(1.75rem,3.6vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.02em]"
          />

          <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
            {roles.map((r, i) => (
              <div key={r.title}>
                <motion.div
                  className="mb-6 h-px origin-left bg-ember"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: easeOutExpo }}
                />
                <Reveal delay={i * 0.12}>
                  <h3 className="font-display text-2xl font-semibold md:text-3xl">{r.title}</h3>
                </Reveal>
                <motion.p
                  data-anim
                  className="mt-3 max-w-[38ch] leading-relaxed text-ash"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: easeOutExpo }}
                >
                  {r.text}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
