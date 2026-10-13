import Link from "next/link";
import type { ReactNode } from "react";
import { copy } from "@/lib/constants";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="main" className="mx-auto min-h-svh max-w-3xl px-4 pb-24 pt-40 md:px-8">
      <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">{title}</h1>
      <div className="mt-12 space-y-4 leading-relaxed text-bone/80">{children}</div>
      <Link href="/" className="mt-16 inline-block border-b border-bone/40 pb-1 text-sm hover:border-ember hover:text-ember">
        {copy.legal.back}
      </Link>
    </main>
  );
}
