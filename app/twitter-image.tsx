import { ImageResponse } from "next/og";

export const alt = "Scrumptious - Authentic Sri Lankan Recipes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FCE9C0",
          borderTop: "16px solid #FDCB63",
          padding: "60px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px",
            border: "1px solid rgba(42, 38, 34, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#8B9572",
              color: "#FFFFFF",
              padding: "6px 16px",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              marginBottom: 20,
            }}
          >
            Authentic Island Flavors
          </div>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#2A2622",
              margin: "0 0 16px 0",
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            Scrumptious
          </h1>

          <p
            style={{
              fontSize: 28,
              color: "#6F675F",
              margin: "0 0 24px 0",
              textAlign: "center",
              maxWidth: 800,
              fontStyle: "italic",
            }}
          >
            Sri Lankan Cooking, Recipes & Heartfelt Food Stories
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontFamily: "sans-serif",
              fontSize: 14,
              color: "#2A2622",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: 12,
            }}
          >
            <span>Traditional Kiribath</span>
            <span>•</span>
            <span>Jaffna Crab Curry</span>
            <span>•</span>
            <span>Black Pork Curry</span>
            <span>•</span>
            <span>Egg Hoppers</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
