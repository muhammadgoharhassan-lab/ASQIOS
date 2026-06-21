import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "ASQIOS — Investment Intelligence. Reimagined.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(60% 80% at 50% 0%, #0B1220 0%, #050A14 60%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "2px solid #D4AF37",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            ASQIOS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#94A3B8",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Institutional Investment Intelligence
          </div>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Investment Intelligence.</span>
            <span style={{ color: "#D4AF37" }}>Reimagined.</span>
          </div>
        </div>

        <div
          style={{
            color: "#94A3B8",
            fontSize: 24,
            letterSpacing: 4,
            display: "flex",
            gap: 16,
          }}
        >
          <span>Research</span>
          <span style={{ color: "#4F8CFF" }}>•</span>
          <span>Governance</span>
          <span style={{ color: "#4F8CFF" }}>•</span>
          <span>AI</span>
          <span style={{ color: "#4F8CFF" }}>•</span>
          <span>Shariah</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
