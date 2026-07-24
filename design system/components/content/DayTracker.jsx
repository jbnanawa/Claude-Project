import React from "react";
import { Icon } from "../media/Icon.jsx";

/** A week of "showing up" circles — the streak / watering tracker. */
export function DayTracker({ days, style = {}, ...rest }) {
  const list = days || [
    { label: "S", state: "empty" }, { label: "M", state: "empty" }, { label: "T", state: "empty" },
    { label: "W", state: "empty" }, { label: "T", state: "today" }, { label: "F", state: "empty" }, { label: "S", state: "empty" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...style }} {...rest}>
      {list.map((d, i) => {
        let circle = {
          width: 36, height: 36, borderRadius: "50%", display: "grid", placeItems: "center",
          border: "1px dashed var(--gw-amber)", background: "transparent",
        };
        let content = null;
        if (d.state === "watered") {
          circle = { ...circle, border: "1px solid var(--gw-sage)", background: "var(--gw-sage)" };
          content = <Icon name="droplet" size={16} color="#fff" />;
        } else if (d.state === "today") {
          circle = { ...circle, border: "1px dashed var(--gw-sage)", boxShadow: "0 0 0 1px #fff, 0 0 0 3px var(--gw-sage)" };
          content = <span style={{ opacity: 0.4 }}><Icon name="droplet" size={15} color="var(--gw-ink)" /></span>;
        }
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={circle}>{content}</div>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "var(--text-2xs)", letterSpacing: "0.025em", textTransform: "uppercase", color: "var(--text-muted)" }}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
