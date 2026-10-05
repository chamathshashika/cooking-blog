import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 108,
          background: "#8b9572",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "serif",
          fontWeight: 700,
          borderRadius: "38px",
          border: "6px solid #fdcb63",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
