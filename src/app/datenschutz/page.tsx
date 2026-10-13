import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Datenschutz", robots: { index: false }, alternates: { canonical: "/datenschutz" } };

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      {/* TODO: Datenschutzerklärung (DSGVO) eintragen — inkl. Hosting-Anbieter und Google Fonts (selbst gehostet via next/font). */}
      <p>Die Datenschutzerklärung folgt in Kürze.</p>
    </LegalPage>
  );
}
