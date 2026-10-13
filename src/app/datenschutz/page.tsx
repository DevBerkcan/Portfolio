import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { copy } from "@/lib/constants";

export const metadata: Metadata = { title: copy.legal.privacy, robots: { index: false }, alternates: { canonical: "/datenschutz" } };

export default function Datenschutz() {
  return (
    <LegalPage title={copy.legal.privacyTitle}>
      {/* TODO: Datenschutzerklärung (DSGVO) eintragen — inkl. Hosting-Anbieter und Google Fonts (selbst gehostet via next/font). */}
      <p>Die Datenschutzerklärung folgt in Kürze.</p>
    </LegalPage>
  );
}
