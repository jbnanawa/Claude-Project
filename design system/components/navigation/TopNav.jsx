import React from "react";

/** The Glow Within wordmark: amber "Gw" tile + serif name. (No logo mark
 *  ships in the source — the brand renders in type.) */
export function Wordmark({ size = 20, style = {} }) {
  const tile = Math.round(size * 1.8);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, ...style }}>
      <span style={{
        width: tile, height: tile, borderRadius: 12, display: "grid", placeItems: "center",
        background: "var(--gw-amber-soft)", color: "var(--gw-amber)",
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.7,
      }}>Gw</span>
      <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: size, letterSpacing: "-0.5px", color: "var(--text-primary)" }}>Glow Within</span>
    </span>
  );
}

/** Desktop top navigation bar with wordmark + pill links. */
export function TopNav({ items, style = {}, ...rest }) {
  const list = items || [
    { label: "Today", active: true }, { label: "Garden" }, { label: "Intentions" }, { label: "Vision Board" },
  ];
  return (
    <header
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px", background: "var(--surface-header)",
        borderBottom: "1px solid var(--border-soft)", boxShadow: "var(--shadow-header)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", ...style,
      }}
      {...rest}
    >
      <Wordmark />
      <nav style={{ display: "flex", gap: 6 }}>
        {list.map((it, i) => (
          <a
            key={i} href={it.href || "#"}
            style={{
              display: "inline-flex", alignItems: "center", padding: "8px 16px",
              borderRadius: "var(--radius-md)", fontFamily: "var(--font-sans)", fontWeight: 500,
              fontSize: "var(--text-sm)", lineHeight: "20px", textDecoration: "none", whiteSpace: "nowrap",
              background: it.active ? "var(--gw-sage)" : "transparent",
              color: it.active ? "#fff" : "var(--text-secondary)",
              boxShadow: it.active ? "var(--shadow-btn)" : "none",
              transition: "background .18s ease, color .18s ease",
            }}
            onMouseEnter={(e) => { if (!it.active) e.currentTarget.style.background = "rgba(213,224,214,0.4)"; }}
            onMouseLeave={(e) => { if (!it.active) e.currentTarget.style.background = "transparent"; }}
          >{it.label}</a>
        ))}
      </nav>
    </header>
  );
}
