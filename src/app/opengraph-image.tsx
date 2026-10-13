import { ImageResponse } from "next/og";

export const alt = "Berk-Can Atesoglu, Founder & Full-Stack-Entwickler in Düsseldorf";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "#f3ece6",
          background: "radial-gradient(120% 80% at 50% 120%, #ff6a2b 0%, #5a120c 35%, #0f0c0e 70%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, opacity: 0.75 }}>
          <span>Founder & Full-Stack-Entwickler</span>
          <span>Düsseldorf</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.85, letterSpacing: -6 }}>
          <span>Berk-Can</span>
          <span style={{ alignSelf: "flex-end" }}>Atesoglu</span>
        </div>
      </div>
    ),
    size,
  );
}
