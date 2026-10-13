"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site, socials } from "@/lib/constants";
import { useIntro } from "@/hooks/useIntro";
import { useScrollLock } from "@/hooks/useScrollLock";
import { easeInOutQuart, easeOutExpo } from "@/lib/utils";
import Magnetic from "@/components/motion/Magnetic";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

export default function Header() {
  const intro = useIntro();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const done = intro.done || !onHome;

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
  });

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    setOpen(false);
    // Die Menü-Sperre löst sich erst im nächsten Effect — ein gestopptes Lenis würde scrollTo ignorieren.
    if (open) lenis?.start();
    if (lenis) lenis.scrollTo(href, { offset: 0, duration: 1.6 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkHref = (h: string) => (onHome ? h : `/${h}`);

  return (
    <>
      <motion.header
        data-anim
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
        initial={{ y: -120 }}
        animate={{ y: done && !hidden ? 0 : -120 }}
        transition={{ duration: 0.9, ease: easeOutExpo, delay: done && !hidden ? 0.15 : 0 }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <Link
            href="/"
            onClick={onHome ? go("#top") : undefined}
            className="group flex items-center gap-3"
            aria-label="Berk-Can Atesoglu, zur Startseite"
          >
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-bone font-display text-sm font-bold text-ink">
              <span className="transition-transform duration-500 group-hover:-translate-y-8">BA</span>
              <span className="absolute translate-y-8 text-ember transition-transform duration-500 group-hover:translate-y-0">
                ✦
              </span>
            </span>
            <span className="hidden text-sm leading-tight sm:block">
              <span className="block font-medium">{site.name}</span>
              <span className="block text-ash">
                {site.city}, <LocalTime />
              </span>
            </span>
          </Link>

          <nav
            aria-label="Hauptnavigation"
            className="hidden items-center gap-1 rounded-full border border-line bg-ink/40 p-1.5 backdrop-blur-xl lg:flex"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={linkHref(item.href)}
                onClick={go(item.href)}
                className="relative rounded-full px-4 py-2 text-sm text-bone/80 transition-colors hover:bg-bone/10 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
            <Magnetic strength={0.25}>
              <a
                href={linkHref("#contact")}
                onClick={go("#contact")}
                className="inline-flex h-11 items-center rounded-full bg-ember px-5 text-sm font-semibold text-ink transition-colors hover:bg-gold"
              >
                Projekt starten
              </a>
            </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/40 backdrop-blur-xl lg:hidden"
            >
              <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-px w-full bg-bone"
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full bg-bone"
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-char px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            transition={{ duration: 0.8, ease: easeInOutQuart }}
          >
            <nav aria-label="Mobile Navigation">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={linkHref(item.href)}
                      onClick={go(item.href)}
                      className="block font-display text-[clamp(2.75rem,12vw,5rem)] leading-[1.05] tracking-tight"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: easeOutExpo }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ash"
            >
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-bone">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
