import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bricolage, hanken } from "@/lib/fonts";
import { site, socials } from "@/lib/constants";
import Providers from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Cursor from "@/components/layout/Cursor";
import { introInlineScript } from "@/lib/intro";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Founder & Full-Stack-Entwickler in Wuppertal`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Founder & Full-Stack-Entwickler`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Founder & Full-Stack-Entwickler`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f0c0e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: "Gentle Webdesign", url: "https://www.gentlewebdesign.de/" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "FOM Hochschule für Oekonomie & Management" },
  address: { "@type": "PostalAddress", addressLocality: "Wuppertal", addressCountry: "DE" },
  knowsAbout: ["Next.js", "React", "TypeScript", "C# .NET", "Azure", "Microsoft 365", "Webdesign", "SaaS"],
  sameAs: socials.map((s) => s.href),
};

/** Ohne JS: Preloader weg, alle Intro-/Reveal-Zustände (data-anim) sofort im Endzustand. */
const noScriptCss =
  "[data-preloader]{display:none!important}[data-anim]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: das Intro-Script setzt data-intro auf <html>, bevor React hydriert.
    <html lang="de" className={`${bricolage.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introInlineScript }} />
      </head>
      <body className="grain">
        <noscript dangerouslySetInnerHTML={{ __html: `<style>${noScriptCss}</style>` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-bone px-4 py-2 text-ink focus:translate-y-0"
        >
          Zum Inhalt springen
        </a>
        <Providers>
          <Header />
          <Cursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
