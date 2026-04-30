import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "DashClub — Le site pro de votre club, zéro commissions sur vos inscriptions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const heroBuffer = readFileSync(join(process.cwd(), "public", "triathlon-hero.jpg"));
  const heroBg = `data:image/jpeg;base64,${heroBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Hero photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroBg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Dark navy overlay — same as hero CSS */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(13,31,60,0.90) 0%, rgba(21,46,85,0.82) 55%, rgba(13,31,60,0.88) 100%)",
            display: "flex",
          }}
        />

        {/* Right-side radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 75% 50%, rgba(201,168,76,0.18) 0%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 80px",
            width: "100%",
            gap: 0,
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              width: 64,
              height: 4,
              background: "#C9A84C",
              borderRadius: 2,
              marginBottom: 32,
              display: "flex",
            }}
          />

          {/* Brand name */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              color: "#C9A84C",
              letterSpacing: "-2px",
              display: "flex",
              marginBottom: 28,
            }}
          >
            DashClub
          </div>

          {/* Tagline line 1 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#FFFFFF",
              display: "flex",
              marginBottom: 8,
            }}
          >
            Le site pro de votre club,
          </div>

          {/* Tagline line 2 */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#C9A84C",
              display: "flex",
              marginBottom: 48,
            }}
          >
            zéro commissions sur vos inscriptions.
          </div>

          {/* URL badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#C9A84C",
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 24,
                color: "rgba(201,168,76,0.85)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                display: "flex",
              }}
            >
              dashclub.app
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
