"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { IntroProvider } from "@/hooks/useIntro";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </IntroProvider>
    </MotionConfig>
  );
}
