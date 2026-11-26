import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SecStudy — Free Cybersecurity Learning Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F6F4EE",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              backgroundColor: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#1C1917",
              }}
            >
              SecStudy
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#4F46E5",
              }}
            >
              secstudy-free.vercel.app
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            backgroundColor: "#FFFFFF",
            border: "2px solid #EAE6DD",
            borderRadius: "28px",
            padding: "44px",
          }}
        >
          <span
            style={{
              fontSize: "46px",
              fontWeight: 800,
              color: "#1C1917",
              lineHeight: 1.15,
            }}
          >
            All Free Cybersecurity Rooms, HTB Labs &amp; CTFs in One Hub
          </span>
          <span
            style={{
              fontSize: "24px",
              color: "#57534E",
              lineHeight: 1.4,
            }}
          >
            640+ curated free resources across TryHackMe, Hack The Box, VulnHub,
            PortSwigger, Android, API, Web3, K8s, AI &amp; 7 pathways.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            color: "#57534E",
          }}
        >
          <span>100% Free Resources · Local Progress &amp; Notes</span>
          <span style={{ fontWeight: 700, color: "#4F46E5" }}>
            Developed by JOJIN JOHN
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
