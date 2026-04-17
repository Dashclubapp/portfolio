import { ImageResponse } from "next/og";
import { homeTitle, siteName } from "./seo";

export const alt = homeTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #0D1F3C 0%, #1E3F6E 60%, #0D1F3C 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
            width: "100%",
            position: "relative",
            gap: 24,
          }}
        >
          {/* Gold accent line */}
          <div style={{ width: 180, height: 4, background: "#C9A84C", borderRadius: 2, display: "flex" }} />

          {/* Site name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              lineHeight: 1,
              color: "#FFFFFF",
              display: "flex",
            }}
          >
            {siteName}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "#BDD0E8",
              fontWeight: 400,
              maxWidth: 700,
              display: "flex",
            }}
          >
            Site web professionnel pour votre club sportif
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {["À partir de 19€/mois", "Zéro commission", "Paiements Stripe intégrés"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 999,
                  border: "1px solid #C9A84C",
                  color: "#C9A84C",
                  fontSize: 22,
                  padding: "10px 22px",
                  fontWeight: 500,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
