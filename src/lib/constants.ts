/**
 * Alle Inhalte der Seite an einer Stelle.
 * Texte, Links und Projekte hier anpassen — die Komponenten lesen nur aus dieser Datei.
 */

/**
 * Ihr persönlicher Standort: Texte über Sie, Metadaten, JSON-LD und OG-Bild ziehen ihn von hier.
 * Orte von Firmen und Hochschule (Projekte, Ventures, Werdegang) stehen bewusst wörtlich dort.
 */
const city = "Wuppertal";

export const site = {
  name: "Berk-Can Atesoglu",
  firstName: "Berk-Can",
  lastName: "Atesoglu",
  initials: "BA",
  url: "https://www.berkcanatesoglu.de",
  email: "hallo@berkcanatesoglu.de",
  city,
  role: "Founder & Full-Stack-Entwickler",
  description: `Berk-Can Atesoglu — Founder von Gentle Webdesign und Full-Stack-Entwickler in ${city}. Websites, Web-Apps, SaaS und Cloud-Lösungen mit Next.js, C# .NET, Azure und Microsoft 365.`,
} as const;

/** Pflichtangaben für das Impressum (§ 5 DDG). */
export const imprint = {
  name: site.name,
  street: "Girardetstraße 17",
  zipCity: "42109 Wuppertal",
  email: site.email,
  // TODO: zweiten schnellen Kontaktweg ergänzen (z. B. Telefon) — § 5 DDG verlangt neben der E-Mail eine weitere direkte Kontaktmöglichkeit
  phone: null as string | null,
  // TODO: USt-IdNr. eintragen, falls vorhanden (sonst null lassen)
  vatId: null as string | null,
};

/** Strukturierte Daten (JSON-LD) für Suchmaschinen. */
export const person = {
  worksFor: { name: "Gentle Webdesign", url: "https://www.gentlewebdesign.de/" },
  alumniOf: "FOM Hochschule für Oekonomie & Management",
  knowsAbout: ["Next.js", "React", "TypeScript", "C# .NET", "Azure", "Microsoft 365", "Webdesign", "SaaS"],
} as const;

/**
 * Alle festen UI-Texte, nach Sektion gruppiert.
 * Mehrzeilige Überschriften sind Arrays — jede Zeile bekommt ihre eigene Reveal-Maske.
 */
export const copy = {
  skipLink: "Zum Inhalt springen",
  a11y: {
    /** Nur für Screenreader, hinter Links mit target="_blank" */
    newTab: "(öffnet in neuem Tab)",
  },
  preloader: {
    word: "Ateş",
    meaning: "türkisch für Feuer",
  },
  header: {
    homeLabel: `${site.name}, zur Startseite`,
    navLabel: "Hauptnavigation",
    mobileNavLabel: "Mobile Navigation",
    cta: "Projekt starten",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
  },
  hero: {
    orbit: "Websites ✦ Web-Apps ✦ Cloud ✦ Business ✦ ",
    noteWord: "Ateş",
    note: "heißt auf Türkisch Feuer. Ich nehme den Namen wörtlich.",
    intro: `Founder von Gentle Webdesign und Full-Stack-Entwickler in ${city}. Ich baue Websites, Web-Apps und Cloud-Lösungen, die sich mühelos anfühlen und für Ihr Geschäft arbeiten.`,
    status: "Offen für neue Projekte",
    cta: ["Projekt", "starten"],
    ctaCursor: "Los",
  },
  stack: {
    label: "Technologien",
  },
  about: {
    title: "Über mich",
  },
  services: {
    title: ["Was ich", "baue"],
    lead: "Vier Felder, ein Anspruch: Lösungen, die gut aussehen, schnell laufen und im Alltag bestehen.",
  },
  work: {
    title: ["Ausgewählte", "Arbeiten"],
    /** Desktop: schmalere Spalte, daher mit Trennstrich */
    titleWide: ["Ausge-", "wählte", "Arbeiten"],
    lead: "Eigene Produkte, Plattformen und Kundenprojekte.",
    scrollHint: "Scrollen Sie weiter, die Seite läuft seitwärts.",
    cursorLink: "Ansehen",
    cursorStatic: "Projekt",
    /** Linkname der Projektkarte für Screenreader: „<Titel>, Website ansehen" */
    linkLabel: "Website ansehen",
  },
  ventures: {
    title: ["Mehr als", "ein Job"],
    lead: "Ich gründe, betreibe und baue. Jede Firma hier ist mein eigenes Projekt, und jede hat mich als Entwickler besser gemacht.",
    visit: "Website besuchen",
  },
  journey: {
    title: "Werdegang",
    lead: `Von der ersten Zeile Code in Bochum zur eigenen Firmengruppe in ${city}.`,
  },
  contact: {
    eyebrow: "Kontakt",
    title: ["Bereit, etwas", "zu entfachen?"],
    text: "Erzählen Sie mir von Ihrem Vorhaben, ob neue Website, eigene Software oder ein Prozess, der endlich automatisch laufen soll. Ich melde mich zeitnah mit einer ehrlichen Einschätzung.",
    mailCta: "E-Mail schreiben",
    mailSubject: "Projektanfrage",
    copied: "Adresse kopiert",
    networks: "Netzwerke",
    location: "Standort",
    reach: "Projekte in ganz NRW und remote im DACH-Raum",
    legalNavLabel: "Rechtliches",
    backToTop: "Nach oben",
  },
  legal: {
    imprint: "Impressum",
    imprintProvider: "Angaben gemäß § 5 DDG",
    imprintContact: "Kontakt",
    email: "E-Mail",
    phone: "Telefon",
    vatId: "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG",
    privacy: "Datenschutz",
    privacyTitle: "Datenschutzerklärung",
    back: "Zurück zur Startseite",
  },
  notFound: {
    title: "Hier ist nur Asche.",
    text: "Diese Seite gibt es nicht (mehr). Zurück zur Startseite, dort brennt es noch.",
  },
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/DevBerkcan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/berk-can-atesoglu-b6366a1ab/" },
  { label: "Instagram", href: "https://www.instagram.com/berkcan_gf/" },
  { label: "Gentle Webdesign", href: "https://www.gentlewebdesign.de/" },
] as const;

export const nav = [
  { label: "Über mich", href: "#about" },
  { label: "Leistungen", href: "#services" },
  { label: "Arbeiten", href: "#work" },
  { label: "Werdegang", href: "#journey" },
  { label: "Kontakt", href: "#contact" },
] as const;

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "Three.js",
  "C# .NET",
  "ASP.NET Core",
  "Azure",
  "SQL Server",
  "PostgreSQL",
  "Dataverse",
  "SharePoint",
  "Teams",
  "Power Automate",
  "Vercel",
] as const;

export const roles = [
  { title: "Gründer", text: "Gentle Webdesign und die daraus entstandene Gentle Group mit GentleBook. Ich weiß, wie es ist, Verantwortung für Umsatz und Kundschaft zu tragen." },
  { title: "Entwickler", text: "Next.js und React im Frontend, C# .NET und Azure im Backend, Microsoft 365 für alles, was Teams im Alltag nutzen." },
  { title: "Student", text: "Betriebswirtschaft an der FOM in Wuppertal. Damit jede technische Entscheidung auch eine wirtschaftliche ist." },
] as const;

export const aboutText =
  "Ich baue digitale Produkte, die sich mühelos anfühlen — vom ersten Pixel bis zur letzten Schnittstelle. Als Gründer von Gentle Webdesign entwickle ich Websites und Software für Unternehmen, parallel arbeite ich bei der RealCore Group an CRM- und Middleware-Projekten und studiere berufsbegleitend Betriebswirtschaft an der FOM. Technik und Business denke ich deshalb immer zusammen.";

export type Service = {
  title: string;
  text: string;
  tags: string[];
};

export const services: Service[] = [
  {
    title: "Websites & Landingpages",
    text: "Markenauftritte, die in Sekunden überzeugen. Schnell geladen, sauber in der Suche und mit Bewegung, die Ihre Geschichte erzählt statt abzulenken.",
    tags: ["Next.js", "Motion", "Three.js", "SEO", "Core Web Vitals"],
  },
  {
    title: "Web-Apps & SaaS",
    text: "Vom internen Tool bis zum eigenen Produkt mit Abo-Modell: Buchungssysteme, Portale und Plattformen mit klarer Architektur und durchdachter Oberfläche.",
    tags: ["React", "TypeScript", "ASP.NET Core", "SQL", "Auth & Rollen"],
  },
  {
    title: "Cloud & Microsoft 365",
    text: "Prozesse, die von selbst laufen. Ich verbinde Azure, Dataverse, SharePoint, Teams und Power Automate zu Lösungen, die Ihr Team wirklich nutzt.",
    tags: ["Azure", "Dataverse", "SharePoint", "Power Automate", "Teams"],
  },
  {
    title: "CRM & Middleware",
    text: "Systeme, die miteinander sprechen. Erfahrung aus Enterprise-Projekten für CRM-Entwicklung, Schnittstellen und Datenflüsse zwischen Anwendungen.",
    tags: ["C# .NET", "REST APIs", "Integration", "CRM"],
  },
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  text: string;
  stack: string[];
  href?: string;
  /** Farben für die generierte Vorschau-Grafik */
  palette: [string, string, string];
  visual: "booking" | "dashboard" | "chauffeur" | "vault" | "crm" | "agency";
  /** Texte in der Vorschau-Grafik: Adresszeile des Browserrahmens und ggf. sichtbare Zeilen */
  preview: { url: string; lines?: readonly string[] };
};

export const projects: Project[] = [
  {
    slug: "gentlebook",
    title: "GentleBook",
    kind: "Eigenes SaaS",
    text: "Online-Buchungssystem für Salons, Barbershops, Beauty- und Physio-Praxen. 24/7-Buchung, Teamkalender, automatische Erinnerungen und eine gebrandete Buchungsseite pro Betrieb.",
    stack: ["Next.js", "TypeScript", "GSAP", "Three.js"],
    href: "https://gentlebook.app",
    palette: ["#6355E4", "#17A398", "#14162B"],
    visual: "booking",
    preview: { url: "gentlebook.app", lines: ["Termin buchen"] },
  },
  {
    slug: "daily-gourmet",
    title: "Daily Gourmet",
    kind: "Plattform",
    text: "Catering-Management für Großküchen, Schulen und Einrichtungen — mit Küchenproduktion, Kundenportal und Verwaltung für mehrere Betriebe.",
    stack: ["Next.js", "shadcn/ui", "C# .NET"],
    palette: ["#1B5FA0", "#E12B76", "#2FAE94"],
    visual: "dashboard",
    preview: { url: "daily-gourmet.app" },
  },
  {
    slug: "vipshuttle24",
    title: "VIPSHUTTLE24",
    kind: "Kundenprojekt",
    text: "Premium-Chauffeurservice in Wuppertal. Zweisprachige Website mit Flotte, Galerie und lokaler Suchmaschinenoptimierung.",
    stack: ["Next.js", "i18n", "SEO"],
    palette: ["#C9A45C", "#F3ECE6", "#0C0C0C"],
    visual: "chauffeur",
    preview: { url: "vipshuttle24.de", lines: ["Wuppertal", "Ankommen", "mit Stil."] },
  },
  {
    slug: "gentletrack",
    title: "GentleTrack",
    kind: "Projekt-CRM",
    text: "Projektmanagement und CRM mit Kunden- und Admin-Portal, Rollenrechten und E-Mail-Benachrichtigungen.",
    stack: ["React", "ASP.NET Core", "SQL Server", "JWT"],
    palette: ["#FF6A2B", "#FFC36E", "#1A1518"],
    visual: "crm",
    preview: { url: "gentletrack.app" },
  },
  {
    slug: "familyvault",
    title: "FamilyVault",
    kind: "Zero-Knowledge",
    text: "Passwortmanager für Familien. Verschlüsselt direkt im Browser über die Web Crypto API — der Server sieht nie ein Passwort.",
    stack: ["Next.js", "PostgreSQL", "Web Crypto"],
    palette: ["#5EEAD4", "#A78BFA", "#0B1220"],
    visual: "vault",
    preview: { url: "familyvault.app" },
  },
  {
    slug: "gentle-webdesign",
    title: "Gentle Webdesign",
    kind: "Agentur",
    text: "Meine Agentur für Websites mit Anspruch: cineastische Scroll-Erlebnisse, 3D und Relaunches für Industrie, Hotellerie, Immobilien und Gesundheit.",
    stack: ["Next.js", "React Three Fiber", "Motion"],
    href: "https://www.gentlewebdesign.de/",
    palette: ["#F3ECE6", "#FF6A2B", "#141012"],
    visual: "agency",
    preview: { url: "gentlewebdesign.de", lines: ["Gentle Webdesign", "Wuppertal", "Websites", "mit", "Gefühl."] },
  },
];

export type Venture = {
  name: string;
  role: string;
  text: string;
  href?: string;
  tone: string;
};

export const ventures: Venture[] = [
  {
    name: "Gentle Webdesign",
    role: "Gründer",
    text: "Agentur für Webdesign und Softwareentwicklung in Wuppertal und der Ursprung der Gentle Group. Next.js-Websites für Kunden, Full-Stack-Anwendungen mit .NET, Azure und Microsoft 365.",
    href: "https://www.gentlewebdesign.de/",
    tone: "#FF6A2B",
  },
  {
    name: "GentleBook",
    role: "Produkt",
    text: "Das eigene Buchungssystem für Dienstleister — vom Salon bis zur Physiopraxis. Gebaut, um Termine, Team und Kundschaft an einem Ort zu halten.",
    href: "https://gentlebook.app",
    tone: "#6355E4",
  },
  {
    name: "GentleCreativeHub",
    role: "Side Venture",
    text: "Digitale Produkte auf Etsy — Vorlagen und Designs, die Kreativen Arbeit abnehmen.",
    tone: "#17A398",
  },
];

/** Reihenfolge = Chronologie, neueste zuerst. Zeitangaben bei Bedarf ergänzen. */
export const journey = [
  {
    when: "Heute",
    title: "Gentle Webdesign & Gentle Group",
    place: "Wuppertal",
    text: "Führe meine Agentur, baue Kundenprojekte und eigene Produkte wie GentleBook.",
  },
  {
    when: "Parallel",
    title: "RealCore Group",
    place: "CRM & Middleware",
    text: "Entwicklung im CRM-Umfeld und Integrationsprojekte zwischen Enterprise-Systemen.",
  },
  {
    when: "Berufsbegleitend",
    title: "Betriebswirtschaft (B.A.)",
    place: "FOM Hochschule Wuppertal",
    text: "Studium neben dem Job — damit Technik immer auch wirtschaftlich Sinn ergibt.",
  },
  {
    when: "Der Anfang",
    title: "Informatik",
    place: "Hochschule Bochum",
    text: "Hier hat die Leidenschaft für Code und Design begonnen — und mit ihr die erste eigene Firma.",
  },
] as const;
