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
    <>
      <style>{`
        .trust-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 270px;
          margin: 0 auto;
        }
        .trust-wrapper .trust-card {
          width: 100%;
        }
        @media (min-width: 768px) {
          .trust-wrapper {
            flex-direction: row;
            max-width: 560px;
            align-items: stretch;
          }
          .trust-wrapper .trust-card {
            flex: 1;
          }
        }
      `}</style>

      <div className="trust-wrapper">
        {/* Secure & Confidential badge */}
        <div
          className="trust-card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 18px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e8e8e8",
          }}
        >
          {/* Red circle with shield icon */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "#D63030",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          {/* Text */}
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "#0B1220", lineHeight: 1.3, whiteSpace: "nowrap" }}>
              {line1}
            </div>
            <div style={{ fontSize: "12px", fontWeight: "500", color: "#6b7280", lineHeight: 1.3, marginTop: "2px" }}>
              {line2}
            </div>
          </div>
        </div>

        {/* TrustedForm badge */}
        <div
          className="trust-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 22px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
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
    </>
  );
};

export default TrustedIndicator;