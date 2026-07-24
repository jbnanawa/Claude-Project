import React from "react";
import { Icon } from "../media/Icon.jsx";

/** Mobile bottom tab bar: icon + label, active gets a pale-sage pill + green text. */
export function BottomNav({ items, style = {}, ...rest }) {
  const list = items || [
    { icon: "sun", label: "Today", active: true }, { icon: "sprout", label: "Garden" },
    { icon: "target", label: "Intentions" }, { icon: "image", label: "Vision" },
  ];
  return (
    <nav
      style={{
        display: "flex", justifyContent: "space-around", alignItems: "stretch",
        padding: "8px 12px", background: "var(--surface-header)",
        borderTop: "1px solid var(--border-soft)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", ...style,
      }}
      {...rest}
    >
      {list.map((it, i) => (
        <a key={i} href={it.href || "#"} style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          padding: "6px 4px", borderRadius: "var(--radius-md)", textDecoration: "none", flex: 1,
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 12, display: "grid", placeItems: "center",
            background: it.active ? "rgba(213,224,214,0.6)" : "transparent",
            color: it.active ? "var(--gw-green)" : "var(--text-muted)",
          }}>
            <Icon name={it.icon} size={20} />
          </span>
          <span style={{
            fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "var(--text-2xs)",
            letterSpacing: "0.025em", color: it.active ? "var(--gw-green)" : "var(--text-muted)",
          }}>{it.label}</span>
        </a>
      ))}
    </nav>
  );
}
