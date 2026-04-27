"use client";
import React from "react";

interface TrustedIndicatorProps {
  locale?: string;
}

const messages: Record<string, string> = {
  en: "100% Secure & Confidential.\nYour Privacy Is Guaranteed.",
  es: "100% Seguro y Confidencial.\nSu Privacidad Está Garantizada.",
  ca: "100% Secure & Confidential.\nYour Privacy Is Guaranteed.",
};

const TrustedIndicator: React.FC<TrustedIndicatorProps> = ({ locale = "en" }) => {
  const text = messages[locale] || messages.en;
  const [line1, line2] = text.split("\n");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      {/* TrustedIndicator pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // ← centered
          gap: "10px",
          padding: "14px 20px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          fontSize: "13px",
          color: "#1a3c8f",
          fontWeight: "700",
          textAlign: "center", // ← centered
          lineHeight: "1.5",
          width: "100%",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2a5bd7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <span>
          {line1}
          <br />
          {line2}
        </span>
      </div>

      {/* TrustedForm badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // ← centered
          padding: "14px 22px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <img
          src="/trustedform.jpeg"
          alt="TrustedForm"
          style={{
            height: "48px",
            width: "auto",
            borderRadius: "6px",
          }}
        />
      </div>
    </div>
  );
};

export default TrustedIndicator;