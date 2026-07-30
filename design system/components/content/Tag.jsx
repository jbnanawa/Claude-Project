import React from "react";

/** Small pill chip — focus areas, categories, tags. */
export function Tag({ children, tone = "sage", style = {}, ...rest }) {
  const tones = {
    sage: { background: "rgba(213,224,214,0.5)", color: "var(--gw-green)", border: "1px solid rgba(143,166,142,0.4)" },
    amber: { background: "var(--gw-amber-soft)", color: "var(--gw-amber)", border: "1px solid rgba(158,100,25,0.25)" },
    neutral: { background: "rgba(255,255,255,0.6)", color: "var(--text-secondary)", border: "1px solid var(--border-soft)" },
  };
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center",
        fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "var(--text-sm)", lineHeight: "20px",
        padding: "5px 14px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap",
        ...(tones[tone] || tones.sage), ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
