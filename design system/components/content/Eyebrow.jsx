import React from "react";

/** Uppercase kicker label above headings (e.g. "GOOD AFTERNOON", "THIS WEEK"). */
export function Eyebrow({ children, tone = "amber", style = {}, ...rest }) {
  const colors = { amber: "var(--gw-amber)", green: "var(--gw-green)", muted: "var(--text-muted)" };
  return (
    <span
      style={{
        display: "block", fontFamily: "var(--font-sans)", fontWeight: 600,
        fontSize: "var(--text-xs)", lineHeight: "16px", letterSpacing: "0.16em",
        textTransform: "uppercase", color: colors[tone] || colors.amber, ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
