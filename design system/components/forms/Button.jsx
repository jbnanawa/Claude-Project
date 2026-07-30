import React from "react";

/**
 * Glow Within primary action button.
 * Soft, rounded, gentle — never shouty.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  icon = null,
  iconRight = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "4px 8px", fontSize: "var(--text-sm)", borderRadius: "var(--radius-sm)", height: 28 },
    md: { padding: "10px 16px", fontSize: "var(--text-sm)", borderRadius: "var(--radius-md)", height: 40 },
    lg: { padding: "14px 20px", fontSize: "var(--text-body)", borderRadius: "var(--radius-md)", height: 52 },
  };
  const variants = {
    primary: { background: "var(--gw-green)", color: "var(--text-on-green)", border: "1px solid transparent", boxShadow: "var(--shadow-btn)" },
    sage: { background: "var(--gw-sage)", color: "var(--text-on-green)", border: "1px solid transparent", boxShadow: "var(--shadow-btn)" },
    secondary: { background: "rgba(255,255,255,0.72)", color: "var(--text-primary)", border: "1px solid var(--border-input)", boxShadow: "var(--shadow-btn)" },
    ghost: { background: "transparent", color: "var(--text-accent)", border: "1px solid transparent", boxShadow: "none" },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return (
    <button
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        fontFamily: "var(--font-sans)", fontWeight: variant === "ghost" ? 500 : 600,
        lineHeight: "20px", cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto", whiteSpace: "nowrap",
        transition: "filter .18s ease, transform .18s ease, opacity .18s ease",
        opacity: disabled ? 0.5 : 1,
        padding: s.padding, fontSize: s.fontSize, borderRadius: s.borderRadius, minHeight: s.height,
        ...v, ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = variant === "ghost" ? "opacity(0.75)" : "brightness(0.95)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
