import { ImageResponse } from "next/og";
import { homeDescription, homeTitle, siteName } from "./seo";

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
          background: "#0D1F3C",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background geometric shapes */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            background: "#152E55",
            borderRadius: "0 0 0 100%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 280,
            height: 280,
            background: "#1A3A6B",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "#0A1929",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 350,
            height: 80,
            background: "#112244",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top: Site name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                background: "#C9A84C",
                borderRadius: 12,
                fontSize: 28,
                fontWeight: 900,
                color: "#0D1F3C",
              }}
            >
              D
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#FFFFFF",
                textTransform: "uppercase",
              }}
            >
              {siteName}
            </span>
          </div>

          {/* Middle: Main headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
            {/* Gold accent line */}
            <div style={{ width: 220, height: 4, background: "#C9A84C", borderRadius: 2, display: "flex" }} />

            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#FFFFFF",
              }}
            >
              DashClub
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.3,
                color: "#BDD0E8",
                fontWeight: 400,
              }}
            >
              {homeDescription}
            </div>
          </div>

          {/* Bottom: Key selling points */}
          <div style={{ display: "flex", gap: 16 }}>
            {[
              "À partir de 19€/mois",
              "Zéro commission",
              "Paiements Stripe intégrés",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 999,
                  border: "1px solid #C9A84C",
                  color: "#C9A84C",
                  fontSize: 22,
                  padding: "12px 22px",
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
