import React from "react";

/**
 * The signature Glow Within glass card: translucent warm fill, white
 * hairline edge, soft cocoa glow. Optional decorative blush/sage orbs.
 */
export function Card({ children, padding = 32, blobs = false, style = {}, ...rest }) {
  return (
    <div
      style={{
        position: "relative", overflow: "hidden",
        background: "var(--glass-fill)", border: "1px solid var(--border-glass)",
        borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-card)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        padding, ...style,
      }}
      {...rest}
    >
      {blobs && (
        <>
          <span style={{ position: "absolute", right: -46, top: -40, width: 146, height: 146, borderRadius: "50%", background: "rgba(243,214,208,0.5)", opacity: 0.65, pointerEvents: "none" }} />
          <span style={{ position: "absolute", left: -23, bottom: -34, width: 128, height: 128, borderRadius: "50%", background: "rgba(213,224,214,0.45)", pointerEvents: "none" }} />
        </>
      )}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
