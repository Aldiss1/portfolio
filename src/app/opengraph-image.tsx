import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#E30613",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#111111", fontSize: 30, fontWeight: 600 }}>
              {site.name}
            </span>
            <span style={{ color: "#6f6f6f", fontSize: 22 }}>{site.role}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ height: 2, background: "#111111" }} />
          <span
            style={{
              color: "#111111",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 980,
              textTransform: "uppercase",
            }}
          >
            Membangun web dari tampilan sampai database.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 12, height: 12, background: "#E30613" }} />
            <span style={{ color: "#6f6f6f", fontSize: 24 }}>
              {site.location} — {site.url.replace(/^https?:\/\//, "")}
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
