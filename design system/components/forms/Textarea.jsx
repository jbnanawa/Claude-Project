import React from "react";
import { fieldBase } from "./Input.jsx";

/** Multi-line text area (e.g. "Why this one?"). */
export function Textarea({ rows = 4, style = {}, ...rest }) {
  return (
    <textarea
      rows={rows}
      style={{ ...fieldBase, resize: "vertical", minHeight: 96, ...style }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border-focus)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-input)"; e.currentTarget.style.boxShadow = "none"; }}
      {...rest}
    />
  );
}
