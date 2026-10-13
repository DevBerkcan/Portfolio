"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

/** Merkt sich pro Tab-Sitzung, dass das Intro schon lief. */
let introPlayed = false;

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(introPlayed);
  const finish = () => {
    introPlayed = true;
    setDone(true);
  };
  return <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroState {
  return useContext(IntroContext);
}
