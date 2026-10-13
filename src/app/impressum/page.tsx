import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Impressum", robots: { index: false }, alternates: { canonical: "/impressum" } };

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      {/* TODO: Pflichtangaben nach § 5 DDG eintragen (Name, Anschrift, Kontakt, ggf. USt-IdNr.). */}
      <p>Angaben gemäß § 5 DDG folgen in Kürze.</p>
    </LegalPage>
  );
}
