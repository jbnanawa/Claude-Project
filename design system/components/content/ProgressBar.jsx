import React from "react";

/** Slim rounded progress track (e.g. progress toward the next season). */
export function ProgressBar({ value = 0, height = 12, style = {}, ...rest }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      style={{
        width: "100%", height, borderRadius: "var(--radius-full)", overflow: "hidden",
        background: "rgba(213,224,214,0.7)", ...style,
      }}
      role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
      {...rest}
    >
      <div style={{ width: `${pct}%`, height: "100%", background: "var(--gw-green)", borderRadius: "var(--radius-full)", transition: "width .4s ease" }} />
    </div>
  );
}
