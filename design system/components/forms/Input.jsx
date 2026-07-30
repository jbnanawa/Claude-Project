import React from "react";

const fieldBase = {
  width: "100%", boxSizing: "border-box",
  fontFamily: "var(--font-sans)", fontSize: "var(--text-body)",
  color: "var(--text-primary)", background: "var(--surface-input)",
  border: "1px solid var(--border-input)", borderRadius: "var(--radius-lg)",
  padding: "14px 16px", lineHeight: "24px",
  transition: "border-color .18s ease, box-shadow .18s ease",
  outline: "none",
};

/** Single-line text input with gentle green focus. */
export function Input({ style = {}, ...rest }) {
  return (
    <input
      style={{ ...fieldBase, ...style }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border-focus)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-input)"; e.currentTarget.style.boxShadow = "none"; }}
      {...rest}
    />
  );
}

export { fieldBase };
