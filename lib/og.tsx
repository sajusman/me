import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

type OgImageOptions = {
  title: string;
  eyebrow?: string;
  meta?: string;
};

/**
 * Renders a shared 1200x630 Open Graph card. Kept to the flexbox-only CSS
 * subset that `next/og` (satori) supports — no grid, no unsupported props.
 */
export function renderOgImage({ title, eyebrow, meta }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #171717 55%, #1e1b2e 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 28,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a78bfa",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: title.length > 55 ? 64 : 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
            color: "#a1a1aa",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "9999px",
                background: "#a78bfa",
                color: "#0a0a0a",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              US
            </div>
            <span style={{ color: "#fafafa", fontWeight: 600 }}>
              {site.name}
            </span>
          </div>
          <span>{meta ?? site.role}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
