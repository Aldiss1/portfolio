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
          background: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#fafafa",
              color: "#0a0a0a",
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
            <span style={{ color: "#fafafa", fontSize: 30, fontWeight: 600 }}>
              {site.name}
            </span>
            <span style={{ color: "#a1a1a1", fontSize: 22 }}>{site.role}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              color: "#fafafa",
              fontSize: 58,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#6366f1",
              }}
            />
            <span style={{ color: "#a1a1a1", fontSize: 24 }}>
              {site.location}
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
