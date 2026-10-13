import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { copy, imprint } from "@/lib/constants";

export const metadata: Metadata = { title: copy.legal.imprint, robots: { index: false }, alternates: { canonical: "/impressum" } };

const h2 = "pt-6 text-2xl font-semibold tracking-tight text-bone";

export default function Impressum() {
  return (
    <LegalPage title={copy.legal.imprint}>
      <h2 className={h2}>{copy.legal.imprintProvider}</h2>
      <p>
        {imprint.name}
        <br />
        {imprint.street}
        <br />
        {imprint.zipCity}
      </p>

      <h2 className={h2}>{copy.legal.imprintContact}</h2>
      <p>
        {copy.legal.email}:{" "}
        <a href={`mailto:${imprint.email}`} className="border-b border-bone/40 hover:border-ember hover:text-ember">
          {imprint.email}
        </a>
        {imprint.phone && (
          <>
            <br />
            {copy.legal.phone}: <a href={`tel:${imprint.phone.replace(/\s/g, "")}`}>{imprint.phone}</a>
          </>
        )}
      </p>

      {imprint.vatId && (
        <>
          <h2 className={h2}>{copy.legal.vatId}</h2>
          <p>{imprint.vatId}</p>
        </>
      )}
    </LegalPage>
  );
}
