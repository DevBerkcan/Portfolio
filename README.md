# berkcanatesoglu.de — Portfolio

Persönliches Portfolio von Berk-Can Atesoglu. Konzept: **Ateş = Feuer** — ein WebGL-Glut-Shader im Hero, warme Glut-Palette, Scroll-Choreografie.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 (`@theme`, keine Config-Datei) · Motion (`motion/react`) · Lenis

## Start
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Inhalte anpassen
Alle Texte, Links, Projekte, Unternehmen und Werdegang: `src/lib/constants.ts`.

**Offene TODOs**
- Impressum: zweiter Kontaktweg (Telefon) und ggf. USt-IdNr. in `imprint` (`src/lib/constants.ts`)
- Datenschutz: `src/app/datenschutz/page.tsx`
- Werdegang: Zeitangaben in `journey` ergänzen
- Optional: echte Projekt-Screenshots statt generierter Vorschauen (`src/components/ui/ProjectVisual.tsx`)

## Struktur
```
src/
├── app/                 layout, page, impressum, datenschutz, sitemap, robots, OG-Image, Icon
├── components/
│   ├── layout/          Header, Preloader, Cursor, SmoothScroll, Providers
│   ├── sections/        Hero, StackTicker, About, Services, Work, Ventures, Journey, Contact
│   ├── motion/          SplitChars, Reveal, Magnetic, ScrollWords, Marquee
│   ├── webgl/           EmberField (Raw-WebGL-Shader, ohne Three.js)
│   └── ui/              ProjectVisual
├── hooks/               useIntro, useMediaQuery
└── lib/                 constants, fonts, utils
```

## Animationen
- Preloader (Zähler + „Ateş“) → Vorhang in den Hero, einmal pro Sitzung
- Hero: Shader folgt Cursor, Name teilt sich beim Scrollen, Feuer kühlt ab
- Ticker mit Scroll-Velocity, Wort-für-Wort-Textreveal, Horizontal-Scroll „Arbeiten“
- Gestapelte Unternehmens-Karten, Timeline-Linie, Cursor-Glow im Kontakt
- `prefers-reduced-motion` wird überall respektiert (Lenis, Preloader, Shader, Motion)

## Deployment
GitHub-Repo bei Vercel importieren — keine Umgebungsvariablen nötig.
