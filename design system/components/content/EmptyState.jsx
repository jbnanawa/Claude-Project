import React from "react";

/** Gentle dashed empty state — reassuring, never a dead end. */
export function EmptyState({ title, description, children, style = {}, ...rest }) {
  return (
    <div
      style={{
        border: "1px dashed var(--border-dashed)", borderRadius: "var(--radius-xl)",
        padding: "40px 32px", textAlign: "center", ...style,
      }}
      {...rest}
    >
      {title && <div style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "var(--text-h3)", color: "var(--text-primary)", letterSpacing: "-0.5px", marginBottom: 8 }}>{title}</div>}
      {description && <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: "22px", color: "var(--text-secondary)", margin: 0 }}>{description}</p>}
      {children}
    </div>
  );
}
