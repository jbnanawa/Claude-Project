import React from "react";

/* Lucide (MIT) icon paths — the app uses this line style throughout:
   round caps/joins, 2px stroke, currentColor. Only the glyphs the
   Glow Within screens reference are included. */
const PATHS = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  /* chevrons + arrow: EXACT geometry lifted verbatim from the Glow Within
     Figma (stroke-expanded fills, hence fill-mode + padded viewBox). */
  "chevron-left": { vb: "-1 -1 7 12", d: "M 5.53 0.53 C 5.823 0.237 5.823 -0.237 5.53 -0.53 C 5.237 -0.823 4.763 -0.823 4.47 -0.53 L 5 0 L 5.53 0.53 Z M 0 5 L -0.53 4.47 C -0.823 4.763 -0.823 5.237 -0.53 5.53 L 0 5 Z M 4.47 10.53 C 4.763 10.823 5.237 10.823 5.53 10.53 C 5.823 10.237 5.823 9.763 5.53 9.47 L 5 10 L 4.47 10.53 Z M 5 0 L 4.47 -0.53 L -0.53 4.47 L 0 5 L 0.53 5.53 L 5.53 0.53 L 5 0 Z M 0 5 L -0.53 5.53 L 4.47 10.53 L 5 10 L 5.53 9.47 L 0.53 4.47 L 0 5 Z" },
  "chevron-right": { vb: "-1 -1 7 12", d: "M 0.53 -0.53 C 0.237 -0.823 -0.237 -0.823 -0.53 -0.53 C -0.823 -0.237 -0.823 0.237 -0.53 0.53 L 0 0 L 0.53 -0.53 Z M 5 5 L 5.53 5.53 C 5.823 5.237 5.823 4.763 5.53 4.47 L 5 5 Z M -0.53 9.47 C -0.823 9.763 -0.823 10.237 -0.53 10.53 C -0.237 10.823 0.237 10.823 0.53 10.53 L 0 10 L -0.53 9.47 Z M 0 0 L -0.53 0.53 L 4.47 5.53 L 5 5 L 5.53 4.47 L 0.53 -0.53 L 0 0 Z M 5 5 L 4.47 4.47 L -0.53 9.47 L 0 10 L 0.53 10.53 L 5.53 5.53 L 5 5 Z" },
  "chevron-down": { vb: "-1 -1 8.4 5.2", d: "M 0.424 -0.424 C 0.19 -0.659 -0.19 -0.659 -0.424 -0.424 C -0.659 -0.19 -0.659 0.19 -0.424 0.424 L 0 0 L 0.424 -0.424 Z M 3.2 3.2 L 2.776 3.624 C 3.01 3.859 3.39 3.859 3.624 3.624 L 3.2 3.2 Z M 6.824 0.424 C 7.059 0.19 7.059 -0.19 6.824 -0.424 C 6.59 -0.659 6.21 -0.659 5.976 -0.424 L 6.4 0 L 6.824 0.424 Z M 0 0 L -0.424 0.424 L 2.776 3.624 L 3.2 3.2 L 3.624 2.776 L 0.424 -0.424 L 0 0 Z M 3.2 3.2 L 3.624 3.624 L 6.824 0.424 L 6.4 0 L 5.976 -0.424 L 2.776 2.776 L 3.2 3.2 Z" },
  "arrow-up-right": { vb: "-1 -1 8.125 8.125", d: "M -0.464 5.661 C -0.72 5.917 -0.72 6.333 -0.464 6.589 C -0.208 6.845 0.208 6.845 0.464 6.589 L 0 6.125 L -0.464 5.661 Z M 6.125 0 L 6.781 0 C 6.781 -0.362 6.487 -0.656 6.125 -0.656 L 6.125 0 Z M 0.875 -0.656 C 0.513 -0.656 0.219 -0.362 0.219 0 C 0.219 0.362 0.513 0.656 0.875 0.656 L 0.875 0 L 0.875 -0.656 Z M 5.469 5.25 C 5.469 5.612 5.763 5.906 6.125 5.906 C 6.487 5.906 6.781 5.612 6.781 5.25 L 6.125 5.25 L 5.469 5.25 Z M 0 6.125 L 0.464 6.589 L 6.589 0.464 L 6.125 0 L 5.661 -0.464 L -0.464 5.661 L 0 6.125 Z M 0.875 0 L 0.875 0.656 L 6.125 0.656 L 6.125 0 L 6.125 -0.656 L 0.875 -0.656 L 0.875 0 Z M 6.125 0 L 5.469 0 L 5.469 5.25 L 6.125 5.25 L 6.781 5.25 L 6.781 0 L 6.125 0 Z" },
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  flower: '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9M7.5 12H9M12 16.5V15M16.5 12H15"/>',
};

/** Inline line icon. Chevrons + arrow carry the Figma's exact geometry
 *  (fill-mode); the rest are Lucide stroke glyphs in the same visual style. */
export function Icon({ name, size = 20, strokeWidth = 2, color = "currentColor", style = {}, ...rest }) {
  const entry = PATHS[name];
  const base = { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, style: { display: "block", flexShrink: 0, ...style }, ...rest };
  if (entry && typeof entry === "object") {
    // File-native fill icon
    return <svg {...base} viewBox={entry.vb} fill={color} dangerouslySetInnerHTML={{ __html: `<path d="${entry.d}" fill-rule="nonzero"/>` }} />;
  }
  return (
    <svg {...base} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: entry || "" }}
    />
  );
}

export const ICON_NAMES = Object.keys(PATHS);
