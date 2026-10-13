import type { Project } from "@/lib/constants";

/**
 * Generierte Vorschau-Grafiken statt Screenshots — rein in SVG/CSS, daher gestochen scharf
 * und ohne Bild-Requests. Wer echte Screenshots hat: in /public ablegen und hier per next/image ersetzen.
 */

function Frame({ children, bg, url }: { children: React.ReactNode; bg: string; url: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]" style={{ background: bg }}>
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-black/25 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-4 truncate rounded-full bg-white/10 px-3 py-0.5 text-[10px] text-white/60">{url}</span>
      </div>
      <div className="relative h-[calc(100%-2.25rem)]">{children}</div>
    </div>
  );
}

/** c = Palette, p = Texte der Vorschau (aus constants.ts) */
type VisualProps = { c: Project["palette"]; p: Project["preview"] };

function Booking({ c, p }: VisualProps) {
  const slots = [
    [0, 1, 2], [1, 0, 3], [2, 2, 2], [3, 1, 1], [4, 3, 2], [0, 4, 2], [2, 5, 1], [4, 0, 1], [1, 4, 2], [3, 3, 2],
  ];
  return (
    <Frame bg={c[2]} url={p.url}>
      <div className="absolute inset-0 grid grid-cols-[1fr_2.2fr] gap-4 p-5">
        <div className="flex flex-col gap-3">
          <div className="h-10 w-10 rounded-xl" style={{ background: `linear-gradient(135deg, ${c[0]}, ${c[1]})` }} />
          <div className="h-3 w-3/4 rounded bg-white/70" />
          <div className="h-2 w-1/2 rounded bg-white/30" />
          <div className="mt-auto rounded-xl p-3 text-[10px] font-semibold text-white" style={{ background: `linear-gradient(135deg, ${c[0]}, ${c[1]})` }}>
            {p.lines?.[0]}
          </div>
        </div>
        <div className="relative grid grid-cols-5 grid-rows-6 gap-1.5 rounded-xl bg-white/5 p-2">
          {slots.map(([col, row, span], i) => (
            <div
              key={i}
              className="rounded-md"
              style={{
                gridColumn: col + 1,
                gridRow: `${row + 1} / span ${span}`,
                background: i % 3 === 0 ? c[0] : i % 3 === 1 ? c[1] : "rgba(255,255,255,0.18)",
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Dashboard({ c, p }: VisualProps) {
  const bars = [38, 62, 48, 80, 56, 92, 70];
  return (
    <Frame bg="#0E1A2B" url={p.url}>
      <div className="absolute inset-0 grid grid-cols-[0.5fr_2fr] gap-4 p-5">
        <div className="flex flex-col gap-2.5 rounded-xl bg-white/5 p-3">
          <div className="mb-2 grid grid-cols-2 gap-1">
            <span className="h-3 rounded-sm" style={{ background: c[0] }} />
            <span className="h-3 rounded-sm" style={{ background: c[1] }} />
            <span className="h-3 rounded-sm" style={{ background: c[2] }} />
            <span className="h-3 rounded-sm bg-amber-400" />
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-2 rounded bg-white/20" style={{ width: `${90 - i * 9}%` }} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {[c[0], c[1], c[2]].map((col, i) => (
              <div key={i} className="rounded-xl bg-white/5 p-3">
                <div className="h-2 w-1/2 rounded bg-white/30" />
                <div className="mt-2 h-4 w-3/4 rounded" style={{ background: col }} />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-2 rounded-xl bg-white/5 p-3">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? c[1] : c[0] }} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Chauffeur({ c, p }: VisualProps) {
  return (
    <Frame bg={c[2]} url={p.url}>
      <div className="absolute inset-0 p-6">
        <div className="text-[10px] tracking-[0.3em] text-white/50">{p.lines?.[0]}</div>
        <div className="mt-2 font-display text-3xl font-semibold leading-none" style={{ color: c[1] }}>
          {p.lines?.[1]}
          <br />
          <span style={{ color: c[0] }}>{p.lines?.[2]}</span>
        </div>
        <svg viewBox="0 0 400 160" className="absolute bottom-6 left-0 w-full" fill="none">
          <path d="M10 140 C 90 140, 110 60, 200 70 S 330 20, 390 30" stroke={c[0]} strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="10" cy="140" r="6" fill={c[0]} />
          <circle cx="390" cy="30" r="6" fill={c[1]} />
          <path
            d="M120 128 h120 c10 0 18-4 24-10 l14-12 c4-4 10-6 16-6 h20 c8 0 14 6 14 14 v10 c0 4-3 6-6 6 h-196 c-4 0-6-2-6-6 Z"
            stroke={c[1]}
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <circle cx="160" cy="132" r="9" stroke={c[1]} strokeWidth="1.5" />
          <circle cx="290" cy="132" r="9" stroke={c[1]} strokeWidth="1.5" />
        </svg>
      </div>
    </Frame>
  );
}

function Crm({ c, p }: VisualProps) {
  const cols = [3, 2, 4];
  return (
    <Frame bg={c[2]} url={p.url}>
      <div className="absolute inset-0 grid grid-cols-3 gap-3 p-5">
        {cols.map((n, ci) => (
          <div key={ci} className="flex flex-col gap-2 rounded-xl bg-white/5 p-2.5">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: ci === 2 ? c[1] : c[0] }} />
              <span className="h-2 w-1/2 rounded bg-white/40" />
            </div>
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="rounded-lg bg-white/10 p-2">
                <div className="h-1.5 w-4/5 rounded bg-white/50" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded bg-white/25" />
                {i === 0 && <div className="mt-2 h-1 rounded-full" style={{ background: c[0], width: `${40 + ci * 25}%` }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Vault({ c, p }: VisualProps) {
  return (
    <Frame bg={c[2]} url={p.url}>
      <div className="absolute inset-0 grid place-items-center overflow-hidden">
        {[220, 170, 120].map((s, i) => (
          <div
            key={s}
            className="absolute rounded-full border"
            style={{ width: s, height: s, borderColor: i % 2 ? c[1] : c[0], opacity: 0.25 + i * 0.2 }}
          />
        ))}
        <svg viewBox="0 0 24 24" className="relative h-14 w-14" fill="none" stroke={c[0]} strokeWidth="1.5">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 1 1 8 0v3" />
          <circle cx="12" cy="15" r="1.5" fill={c[0]} />
        </svg>
        <div className="absolute bottom-4 left-4 right-4 truncate text-[10px] text-white/35">
          a3f9c1e07b2d5f88e41c09ad7b63f2e1 9c4e0b7a2d81f6c3e5a9047b1d2c8e6f
        </div>
      </div>
    </Frame>
  );
}

function Agency({ c, p }: VisualProps) {
  return (
    <Frame bg={c[2]} url={p.url}>
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex justify-between text-[10px] text-white/50">
          <span>{p.lines?.[0]}</span>
          <span>{p.lines?.[1]}</span>
        </div>
        <div className="font-display text-[2.6rem] font-bold leading-[0.85] tracking-tight" style={{ color: c[0] }}>
          {p.lines?.[2]}
          <br />
          {p.lines?.[3]} <span style={{ color: c[1] }}>{p.lines?.[4]}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg"
              style={{ background: `linear-gradient(${140 + i * 30}deg, ${c[1]}, ${c[2]} 80%)`, opacity: 0.85 - i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

export default function ProjectVisual({ project }: { project: Project }) {
  const c = project.palette;
  const p = project.preview;
  switch (project.visual) {
    case "booking":
      return <Booking c={c} p={p} />;
    case "dashboard":
      return <Dashboard c={c} p={p} />;
    case "chauffeur":
      return <Chauffeur c={c} p={p} />;
    case "crm":
      return <Crm c={c} p={p} />;
    case "vault":
      return <Vault c={c} p={p} />;
    case "agency":
      return <Agency c={c} p={p} />;
  }
}
