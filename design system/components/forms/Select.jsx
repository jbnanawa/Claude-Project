import React from "react";
import { Icon } from "../media/Icon.jsx";

/** Dropdown select styled to match Input, with a chevron affordance. */
export function Select({ children, placeholder, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        defaultValue={placeholder ? "" : undefined}
        style={{
          width: "100%", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", color: "var(--text-primary)",
          background: "var(--surface-input)", border: "1px solid var(--border-input)",
          borderRadius: "var(--radius-lg)", padding: "14px 44px 14px 16px", lineHeight: "24px",
          cursor: "pointer", outline: "none",
          transition: "border-color .18s ease, box-shadow .18s ease", ...style,
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border-focus)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-input)"; e.currentTarget.style.boxShadow = "none"; }}
        {...rest}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {children}
      </select>
      <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }}>
        <Icon name="chevron-down" size={18} />
      </span>
    </div>
  );
}
