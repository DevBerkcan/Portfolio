"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { INTRO_STORAGE_KEY } from "@/lib/intro";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

/**
 * Merkt sich pro Tab-Sitzung (sessionStorage), dass das Intro schon lief.
 * Das Inline-Script aus dem Layout (lib/intro) setzt vor dem ersten Paint html[data-intro="played"],
 * damit CSS den Preloader beim Reload gar nicht erst zeigt. Der State startet trotzdem mit
 * false, damit Server- und Client-Render bei der Hydration übereinstimmen.
 */
export function introAlreadyPlayed(): boolean {
  return document.documentElement.dataset.intro === "played";
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Privater Modus o. Ä. — dann läuft das Intro eben beim nächsten Laden erneut.
    }
    // data-intro hier bewusst nicht setzen: das CSS würde den Preloader sofort ausblenden
    // und den Vorhang-Exit verschlucken. Das Attribut setzt erst das Inline-Script beim nächsten Laden.
    setDone(true);
  }, []);
  const value = useMemo(() => ({ done, finish }), [done, finish]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroState {
  return useContext(IntroContext);
}
