import React from "react";

/** Segmented control (e.g. Daily / Monthly intentions). Active = sage fill. */
export function SegmentedTabs({ options, value, onChange, style = {}, ...rest }) {
  const opts = options || ["Daily intentions", "Monthly intentions"];
  const [internal, setInternal] = React.useState(value ?? opts[0]);
  const current = value ?? internal;
  const pick = (o) => { setInternal(o); onChange && onChange(o); };
  return (
    <div
      style={{
        display: "flex", gap: 4, padding: 4, borderRadius: "24px",
        background: "rgba(238,243,238,0.7)", border: "1px solid var(--border-soft)", ...style,
      }}
      {...rest}
    >
      {opts.map((o, i) => {
        const active = o === current;
        return (
          <button key={i} onClick={() => pick(o)} style={{
            flex: 1, padding: "10px 12px", borderRadius: "30px", border: "none", cursor: "pointer",
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "var(--text-sm)", lineHeight: "20px",
            background: active ? "var(--gw-sage)" : "transparent",
            color: active ? "#fff" : "var(--text-secondary)",
            boxShadow: active ? "var(--shadow-btn)" : "none",
            transition: "background .18s ease, color .18s ease",
          }}>{o}</button>
        );
      })}
    </div>
  );
}
