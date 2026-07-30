/* @ds-bundle: {"format":4,"namespace":"GlowWithinDesignSystem_5614ce","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"DayTracker","sourcePath":"components/content/DayTracker.jsx"},{"name":"EmptyState","sourcePath":"components/content/EmptyState.jsx"},{"name":"Eyebrow","sourcePath":"components/content/Eyebrow.jsx"},{"name":"ProgressBar","sourcePath":"components/content/ProgressBar.jsx"},{"name":"Tag","sourcePath":"components/content/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Icon","sourcePath":"components/media/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/media/Icon.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"SegmentedTabs","sourcePath":"components/navigation/SegmentedTabs.jsx"},{"name":"Wordmark","sourcePath":"components/navigation/TopNav.jsx"},{"name":"TopNav","sourcePath":"components/navigation/TopNav.jsx"}],"sourceHashes":{"components/content/Card.jsx":"cc5d32b4fa36","components/content/DayTracker.jsx":"06fcb75181c6","components/content/EmptyState.jsx":"e0730b80f858","components/content/Eyebrow.jsx":"fc491321a997","components/content/ProgressBar.jsx":"0efb71661f6f","components/content/Tag.jsx":"65c127a98168","components/forms/Button.jsx":"832cd91bb070","components/forms/Input.jsx":"2ee620f52e22","components/forms/Select.jsx":"a0cb7cd41f36","components/forms/Textarea.jsx":"0d92026f7862","components/media/Icon.jsx":"36002a5dce17","components/navigation/BottomNav.jsx":"b6b75d12d533","components/navigation/SegmentedTabs.jsx":"82c76f6e2e42","components/navigation/TopNav.jsx":"78befbbc5c83","ui_kits/glow-within/App.jsx":"3813162da86c","ui_kits/glow-within/GardenScreen.jsx":"e7d7c48d55d5","ui_kits/glow-within/IntentionsScreen.jsx":"7fe39f3b07bc","ui_kits/glow-within/TodayScreen.jsx":"0020f098eb5d","ui_kits/glow-within/VisionScreen.jsx":"ff0adedd701a"},"inlinedExternals":[],"unexposedExports":[{"name":"fieldBase","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.GlowWithinDesignSystem_5614ce = window.GlowWithinDesignSystem_5614ce || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The signature Glow Within glass card: translucent warm fill, white
 * hairline edge, soft cocoa glow. Optional decorative blush/sage orbs.
 */
function Card({
  children,
  padding = 32,
  blobs = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--glass-fill)",
      border: "1px solid var(--border-glass)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-card)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      padding,
      ...style
    }
  }, rest), blobs && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -46,
      top: -40,
      width: 146,
      height: 146,
      borderRadius: "50%",
      background: "rgba(243,214,208,0.5)",
      opacity: 0.65,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: -23,
      bottom: -34,
      width: 128,
      height: 128,
      borderRadius: "50%",
      background: "rgba(213,224,214,0.45)",
      pointerEvents: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Gentle dashed empty state — reassuring, never a dead end. */
function EmptyState({
  title,
  description,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px dashed var(--border-dashed)",
      borderRadius: "var(--radius-xl)",
      padding: "40px 32px",
      textAlign: "center",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: "var(--text-h3)",
      color: "var(--text-primary)",
      letterSpacing: "-0.5px",
      marginBottom: 8
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      lineHeight: "22px",
      color: "var(--text-secondary)",
      margin: 0
    }
  }, description), children);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/content/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Uppercase kicker label above headings (e.g. "GOOD AFTERNOON", "THIS WEEK"). */
function Eyebrow({
  children,
  tone = "amber",
  style = {},
  ...rest
}) {
  const colors = {
    amber: "var(--gw-amber)",
    green: "var(--gw-green)",
    muted: "var(--text-muted)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "block",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: "var(--text-xs)",
      lineHeight: "16px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: colors[tone] || colors.amber,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Slim rounded progress track (e.g. progress toward the next season). */
function ProgressBar({
  value = 0,
  height = 12,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: "100%",
      height,
      borderRadius: "var(--radius-full)",
      overflow: "hidden",
      background: "rgba(213,224,214,0.7)",
      ...style
    },
    role: "progressbar",
    "aria-valuenow": pct,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: "var(--gw-green)",
      borderRadius: "var(--radius-full)",
      transition: "width .4s ease"
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/content/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small pill chip — focus areas, categories, tags. */
function Tag({
  children,
  tone = "sage",
  style = {},
  ...rest
}) {
  const tones = {
    sage: {
      background: "rgba(213,224,214,0.5)",
      color: "var(--gw-green)",
      border: "1px solid rgba(143,166,142,0.4)"
    },
    amber: {
      background: "var(--gw-amber-soft)",
      color: "var(--gw-amber)",
      border: "1px solid rgba(158,100,25,0.25)"
    },
    neutral: {
      background: "rgba(255,255,255,0.6)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-soft)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: "var(--text-sm)",
      lineHeight: "20px",
      padding: "5px 14px",
      borderRadius: "var(--radius-full)",
      whiteSpace: "nowrap",
      ...(tones[tone] || tones.sage),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Glow Within primary action button.
 * Soft, rounded, gentle — never shouty.
 */
function Button({
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
    sm: {
      padding: "4px 8px",
      fontSize: "var(--text-sm)",
      borderRadius: "var(--radius-sm)",
      height: 28
    },
    md: {
      padding: "10px 16px",
      fontSize: "var(--text-sm)",
      borderRadius: "var(--radius-md)",
      height: 40
    },
    lg: {
      padding: "14px 20px",
      fontSize: "var(--text-body)",
      borderRadius: "var(--radius-md)",
      height: 52
    }
  };
  const variants = {
    primary: {
      background: "var(--gw-green)",
      color: "var(--text-on-green)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-btn)"
    },
    sage: {
      background: "var(--gw-sage)",
      color: "var(--text-on-green)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-btn)"
    },
    secondary: {
      background: "rgba(255,255,255,0.72)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-input)",
      boxShadow: "var(--shadow-btn)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-accent)",
      border: "1px solid transparent",
      boxShadow: "none"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontWeight: variant === "ghost" ? 500 : 600,
      lineHeight: "20px",
      cursor: disabled ? "not-allowed" : "pointer",
      width: full ? "100%" : "auto",
      whiteSpace: "nowrap",
      transition: "filter .18s ease, transform .18s ease, opacity .18s ease",
      opacity: disabled ? 0.5 : 1,
      padding: s.padding,
      fontSize: s.fontSize,
      borderRadius: s.borderRadius,
      minHeight: s.height,
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = variant === "ghost" ? "opacity(0.75)" : "brightness(0.95)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldBase = {
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-body)",
  color: "var(--text-primary)",
  background: "var(--surface-input)",
  border: "1px solid var(--border-input)",
  borderRadius: "var(--radius-lg)",
  padding: "14px 16px",
  lineHeight: "24px",
  transition: "border-color .18s ease, box-shadow .18s ease",
  outline: "none"
};

/** Single-line text input with gentle green focus. */
function Input({
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    style: {
      ...fieldBase,
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--border-focus)";
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--border-input)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest));
}
Object.assign(__ds_scope, { Input, fieldBase });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text area (e.g. "Why this one?"). */
function Textarea({
  rows = 4,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    style: {
      ...__ds_scope.fieldBase,
      resize: "vertical",
      minHeight: 96,
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--border-focus)";
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--border-input)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/media/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  "chevron-left": {
    vb: "-1 -1 7 12",
    d: "M 5.53 0.53 C 5.823 0.237 5.823 -0.237 5.53 -0.53 C 5.237 -0.823 4.763 -0.823 4.47 -0.53 L 5 0 L 5.53 0.53 Z M 0 5 L -0.53 4.47 C -0.823 4.763 -0.823 5.237 -0.53 5.53 L 0 5 Z M 4.47 10.53 C 4.763 10.823 5.237 10.823 5.53 10.53 C 5.823 10.237 5.823 9.763 5.53 9.47 L 5 10 L 4.47 10.53 Z M 5 0 L 4.47 -0.53 L -0.53 4.47 L 0 5 L 0.53 5.53 L 5.53 0.53 L 5 0 Z M 0 5 L -0.53 5.53 L 4.47 10.53 L 5 10 L 5.53 9.47 L 0.53 4.47 L 0 5 Z"
  },
  "chevron-right": {
    vb: "-1 -1 7 12",
    d: "M 0.53 -0.53 C 0.237 -0.823 -0.237 -0.823 -0.53 -0.53 C -0.823 -0.237 -0.823 0.237 -0.53 0.53 L 0 0 L 0.53 -0.53 Z M 5 5 L 5.53 5.53 C 5.823 5.237 5.823 4.763 5.53 4.47 L 5 5 Z M -0.53 9.47 C -0.823 9.763 -0.823 10.237 -0.53 10.53 C -0.237 10.823 0.237 10.823 0.53 10.53 L 0 10 L -0.53 9.47 Z M 0 0 L -0.53 0.53 L 4.47 5.53 L 5 5 L 5.53 4.47 L 0.53 -0.53 L 0 0 Z M 5 5 L 4.47 4.47 L -0.53 9.47 L 0 10 L 0.53 10.53 L 5.53 5.53 L 5 5 Z"
  },
  "chevron-down": {
    vb: "-1 -1 8.4 5.2",
    d: "M 0.424 -0.424 C 0.19 -0.659 -0.19 -0.659 -0.424 -0.424 C -0.659 -0.19 -0.659 0.19 -0.424 0.424 L 0 0 L 0.424 -0.424 Z M 3.2 3.2 L 2.776 3.624 C 3.01 3.859 3.39 3.859 3.624 3.624 L 3.2 3.2 Z M 6.824 0.424 C 7.059 0.19 7.059 -0.19 6.824 -0.424 C 6.59 -0.659 6.21 -0.659 5.976 -0.424 L 6.4 0 L 6.824 0.424 Z M 0 0 L -0.424 0.424 L 2.776 3.624 L 3.2 3.2 L 3.624 2.776 L 0.424 -0.424 L 0 0 Z M 3.2 3.2 L 3.624 3.624 L 6.824 0.424 L 6.4 0 L 5.976 -0.424 L 2.776 2.776 L 3.2 3.2 Z"
  },
  "arrow-up-right": {
    vb: "-1 -1 8.125 8.125",
    d: "M -0.464 5.661 C -0.72 5.917 -0.72 6.333 -0.464 6.589 C -0.208 6.845 0.208 6.845 0.464 6.589 L 0 6.125 L -0.464 5.661 Z M 6.125 0 L 6.781 0 C 6.781 -0.362 6.487 -0.656 6.125 -0.656 L 6.125 0 Z M 0.875 -0.656 C 0.513 -0.656 0.219 -0.362 0.219 0 C 0.219 0.362 0.513 0.656 0.875 0.656 L 0.875 0 L 0.875 -0.656 Z M 5.469 5.25 C 5.469 5.612 5.763 5.906 6.125 5.906 C 6.487 5.906 6.781 5.612 6.781 5.25 L 6.125 5.25 L 5.469 5.25 Z M 0 6.125 L 0.464 6.589 L 6.589 0.464 L 6.125 0 L 5.661 -0.464 L -0.464 5.661 L 0 6.125 Z M 0.875 0 L 0.875 0.656 L 6.125 0.656 L 6.125 0 L 6.125 -0.656 L 0.875 -0.656 L 0.875 0 Z M 6.125 0 L 5.469 0 L 5.469 5.25 L 6.125 5.25 L 6.781 5.25 L 6.781 0 L 6.125 0 Z"
  },
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  flower: '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9M7.5 12H9M12 16.5V15M16.5 12H15"/>'
};

/** Inline line icon. Chevrons + arrow carry the Figma's exact geometry
 *  (fill-mode); the rest are Lucide stroke glyphs in the same visual style. */
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = "currentColor",
  style = {},
  ...rest
}) {
  const entry = PATHS[name];
  const base = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    },
    ...rest
  };
  if (entry && typeof entry === "object") {
    // File-native fill icon
    return /*#__PURE__*/React.createElement("svg", _extends({}, base, {
      viewBox: entry.vb,
      fill: color,
      dangerouslySetInnerHTML: {
        __html: `<path d="${entry.d}" fill-rule="nonzero"/>`
      }
    }));
  }
  return /*#__PURE__*/React.createElement("svg", _extends({}, base, {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    dangerouslySetInnerHTML: {
      __html: entry || ""
    }
  }));
}
const ICON_NAMES = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/DayTracker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** A week of "showing up" circles — the streak / watering tracker. */
function DayTracker({
  days,
  style = {},
  ...rest
}) {
  const list = days || [{
    label: "S",
    state: "empty"
  }, {
    label: "M",
    state: "empty"
  }, {
    label: "T",
    state: "empty"
  }, {
    label: "W",
    state: "empty"
  }, {
    label: "T",
    state: "today"
  }, {
    label: "F",
    state: "empty"
  }, {
    label: "S",
    state: "empty"
  }];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      ...style
    }
  }, rest), list.map((d, i) => {
    let circle = {
      width: 36,
      height: 36,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      border: "1px dashed var(--gw-amber)",
      background: "transparent"
    };
    let content = null;
    if (d.state === "watered") {
      circle = {
        ...circle,
        border: "1px solid var(--gw-sage)",
        background: "var(--gw-sage)"
      };
      content = /*#__PURE__*/React.createElement(__ds_scope.Icon, {
        name: "droplet",
        size: 16,
        color: "#fff"
      });
    } else if (d.state === "today") {
      circle = {
        ...circle,
        border: "1px dashed var(--gw-sage)",
        boxShadow: "0 0 0 1px #fff, 0 0 0 3px var(--gw-sage)"
      };
      content = /*#__PURE__*/React.createElement("span", {
        style: {
          opacity: 0.4
        }
      }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
        name: "droplet",
        size: 15,
        color: "var(--gw-ink)"
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: circle
    }, content), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "var(--text-2xs)",
        letterSpacing: "0.025em",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, d.label));
  }));
}
Object.assign(__ds_scope, { DayTracker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DayTracker.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dropdown select styled to match Input, with a chevron affordance. */
function Select({
  children,
  placeholder,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    defaultValue: placeholder ? "" : undefined,
    style: {
      width: "100%",
      boxSizing: "border-box",
      appearance: "none",
      WebkitAppearance: "none",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body)",
      color: "var(--text-primary)",
      background: "var(--surface-input)",
      border: "1px solid var(--border-input)",
      borderRadius: "var(--radius-lg)",
      padding: "14px 44px 14px 16px",
      lineHeight: "24px",
      cursor: "pointer",
      outline: "none",
      transition: "border-color .18s ease, box-shadow .18s ease",
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = "var(--border-focus)";
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)";
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = "var(--border-input)";
      e.currentTarget.style.boxShadow = "none";
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 16,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Mobile bottom tab bar: icon + label, active gets a pale-sage pill + green text. */
function BottomNav({
  items,
  style = {},
  ...rest
}) {
  const list = items || [{
    icon: "sun",
    label: "Today",
    active: true
  }, {
    icon: "sprout",
    label: "Garden"
  }, {
    icon: "target",
    label: "Intentions"
  }, {
    icon: "image",
    label: "Vision"
  }];
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "stretch",
      padding: "8px 12px",
      background: "var(--surface-header)",
      borderTop: "1px solid var(--border-soft)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      ...style
    }
  }, rest), list.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: it.href || "#",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      padding: "6px 4px",
      borderRadius: "var(--radius-md)",
      textDecoration: "none",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 12,
      display: "grid",
      placeItems: "center",
      background: it.active ? "rgba(213,224,214,0.6)" : "transparent",
      color: it.active ? "var(--gw-green)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: "var(--text-2xs)",
      letterSpacing: "0.025em",
      color: it.active ? "var(--gw-green)" : "var(--text-muted)"
    }
  }, it.label))));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedTabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Segmented control (e.g. Daily / Monthly intentions). Active = sage fill. */
function SegmentedTabs({
  options,
  value,
  onChange,
  style = {},
  ...rest
}) {
  const opts = options || ["Daily intentions", "Monthly intentions"];
  const [internal, setInternal] = React.useState(value ?? opts[0]);
  const current = value ?? internal;
  const pick = o => {
    setInternal(o);
    onChange && onChange(o);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: 4,
      padding: 4,
      borderRadius: "24px",
      background: "rgba(238,243,238,0.7)",
      border: "1px solid var(--border-soft)",
      ...style
    }
  }, rest), opts.map((o, i) => {
    const active = o === current;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => pick(o),
      style: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: "30px",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "var(--text-sm)",
        lineHeight: "20px",
        background: active ? "var(--gw-sage)" : "transparent",
        color: active ? "#fff" : "var(--text-secondary)",
        boxShadow: active ? "var(--shadow-btn)" : "none",
        transition: "background .18s ease, color .18s ease"
      }
    }, o);
  }));
}
Object.assign(__ds_scope, { SegmentedTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedTabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The Glow Within wordmark: amber "Gw" tile + serif name. (No logo mark
 *  ships in the source — the brand renders in type.) */
function Wordmark({
  size = 20,
  style = {}
}) {
  const tile = Math.round(size * 1.8);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: tile,
      height: tile,
      borderRadius: 12,
      display: "grid",
      placeItems: "center",
      background: "var(--gw-amber-soft)",
      color: "var(--gw-amber)",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: size * 0.7
    }
  }, "Gw"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: size,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)"
    }
  }, "Glow Within"));
}

/** Desktop top navigation bar with wordmark + pill links. */
function TopNav({
  items,
  style = {},
  ...rest
}) {
  const list = items || [{
    label: "Today",
    active: true
  }, {
    label: "Garden"
  }, {
    label: "Intentions"
  }, {
    label: "Vision Board"
  }];
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 24px",
      background: "var(--surface-header)",
      borderBottom: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-header)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 6
    }
  }, list.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: it.href || "#",
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "8px 16px",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: "var(--text-sm)",
      lineHeight: "20px",
      textDecoration: "none",
      whiteSpace: "nowrap",
      background: it.active ? "var(--gw-sage)" : "transparent",
      color: it.active ? "#fff" : "var(--text-secondary)",
      boxShadow: it.active ? "var(--shadow-btn)" : "none",
      transition: "background .18s ease, color .18s ease"
    },
    onMouseEnter: e => {
      if (!it.active) e.currentTarget.style.background = "rgba(213,224,214,0.4)";
    },
    onMouseLeave: e => {
      if (!it.active) e.currentTarget.style.background = "transparent";
    }
  }, it.label))));
}
Object.assign(__ds_scope, { Wordmark, TopNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glow-within/App.jsx
try { (() => {
/* Glow Within — app shell: top nav + screen router + shared state */
const {
  TopNav
} = window.GlowWithinDesignSystem_5614ce;
function App() {
  const [tab, setTab] = React.useState("Today");
  const [streak, setStreak] = React.useState(0);
  const [gratitudes, setGratitudes] = React.useState([]);
  const [goals, setGoals] = React.useState([]);
  const [visions, setVisions] = React.useState([]);
  const app = {
    streak,
    gratitudes,
    goals,
    visions,
    go: setTab,
    waterToday: () => setStreak(s => Math.min(7, s + 1)),
    addGratitude: t => {
      setGratitudes(g => [t, ...g]);
      setStreak(s => Math.min(7, s + 1));
    },
    addGoal: g => setGoals(prev => [g, ...prev]),
    addVision: v => setVisions(prev => [v, ...prev])
  };
  const items = ["Today", "Garden", "Intentions", "Vision Board"].map(label => ({
    label,
    active: label === tab
  }));
  const Screen = {
    "Today": window.TodayScreen,
    "Garden": window.GardenScreen,
    "Intentions": window.IntentionsScreen,
    "Vision Board": window.VisionScreen
  }[tab];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--surface-page)",
      backgroundAttachment: "fixed"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    items: items.map(it => ({
      ...it,
      href: "#",
      onClick: undefined
    })),
    onClickCapture: e => {
      const a = e.target.closest("a");
      if (a) {
        e.preventDefault();
        setTab(a.textContent);
      }
    }
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1024,
      margin: "0 auto",
      padding: "48px 24px 96px",
      boxSizing: "border-box"
    }
  }, Screen ? /*#__PURE__*/React.createElement(Screen, {
    app: app
  }) : null), /*#__PURE__*/React.createElement("footer", {
    style: {
      textAlign: "center",
      padding: "0 0 40px",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "Glow Within \xB7 made with love, just for you"));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glow-within/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glow-within/GardenScreen.jsx
try { (() => {
/* Glow Within — Garden (gratitude + growth calendar) */
const {
  Card,
  Button,
  EmptyState,
  Icon
} = window.GlowWithinDesignSystem_5614ce;
function GardenScreen({
  app
}) {
  const {
    gratitudes,
    addGratitude,
    streak
  } = app;
  const [text, setText] = React.useState("");
  const submit = () => {
    if (text.trim()) {
      addGratitude(text.trim());
      setText("");
    }
  };
  const days = Array.from({
    length: 30
  }, (_, i) => i + 1);
  const labels = ["W", "T", "F", "S", "S", "M", "T"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 40,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Garden"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: "var(--text-secondary)",
      margin: "10px 0 0",
      maxWidth: 620
    }
  }, "Add a gratitude moment to water your plant. Every day you show up becomes one drop of care, helping your season slowly grow.")), /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: "0 0 16px"
    }
  }, "Today I'm grateful for\u2026"), /*#__PURE__*/React.createElement("input", {
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: e => e.key === "Enter" && submit(),
    placeholder: "e.g. Morning light through the window",
    style: {
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "var(--text-primary)",
      background: "var(--surface-input)",
      border: "1px solid var(--border-input)",
      borderRadius: 16,
      padding: "16px 18px",
      outline: "none"
    },
    onFocus: e => {
      e.target.style.borderColor = "var(--border-focus)";
      e.target.style.boxShadow = "0 0 0 3px rgba(143,166,142,0.18)";
    },
    onBlur: e => {
      e.target.style.borderColor = "var(--border-input)";
      e.target.style.boxShadow = "none";
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "sage",
    size: "lg",
    full: true,
    onClick: submit,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "droplet",
      size: 18,
      color: "#fff"
    })
  }, "Water with gratitude"))), /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Your growth calendar"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: "6px 0 20px"
    }
  }, "Every day you water gets a plant from your current season."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: ghostIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, "July 2026"), /*#__PURE__*/React.createElement("button", {
    style: ghostIcon
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 8
    }
  }, days.slice(0, 21).map(d => {
    const watered = d <= gratitudes.length;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        aspectRatio: "1",
        borderRadius: 12,
        display: "grid",
        placeItems: "center",
        background: watered ? "var(--gw-sage-tint-2)" : "transparent",
        border: watered ? "1px solid var(--gw-sage)" : "1px dashed var(--border-input)",
        position: "relative"
      }
    }, watered ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, "\uD83C\uDF31") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 6,
        left: 8,
        fontSize: 10,
        color: "var(--text-muted)"
      }
    }, labels[(d - 1) % 7]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        color: "var(--text-muted)"
      }
    }, d)));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 30,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: "0 0 16px"
    }
  }, "Past waters"), gratitudes.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, gratitudes.map((g, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24
    }
  }, "\uD83C\uDF31"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--text-primary)"
    }
  }, g), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Watered today")))))) : /*#__PURE__*/React.createElement(EmptyState, {
    title: "Nothing planted yet",
    description: "Once you water a day, your moments will grow here."
  })));
}
const ghostIcon = {
  width: 32,
  height: 32,
  borderRadius: 10,
  border: "1px solid var(--border-soft)",
  background: "rgba(255,255,255,0.5)",
  display: "grid",
  placeItems: "center",
  cursor: "pointer"
};
window.GardenScreen = GardenScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glow-within/GardenScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glow-within/IntentionsScreen.jsx
try { (() => {
/* Glow Within — Intentions (daily & monthly goals) */
const {
  Card,
  Button,
  Input,
  Textarea,
  Select,
  SegmentedTabs,
  EmptyState,
  Tag
} = window.GlowWithinDesignSystem_5614ce;
function IntentionsScreen({
  app
}) {
  const {
    goals,
    addGoal
  } = app;
  const [tab, setTab] = React.useState("Daily intentions");
  const [goal, setGoal] = React.useState("");
  const [cat, setCat] = React.useState("");
  const [why, setWhy] = React.useState("");
  const submit = () => {
    if (goal.trim()) {
      addGoal({
        goal: goal.trim(),
        cat: cat || "Wellness",
        why
      });
      setGoal("");
      setCat("");
      setWhy("");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 40,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Intentions"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: "var(--text-secondary)",
      margin: "10px 0 0",
      maxWidth: 620
    }
  }, "Tend your daily goals and this month's focus \u2014 big or small, they all count.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement(SegmentedTabs, {
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "What are we working toward?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: "6px 0 24px"
    }
  }, "Pick a category and tell me what you're reaching for."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Goal"), /*#__PURE__*/React.createElement(Input, {
    value: goal,
    onChange: e => setGoal(e.target.value),
    placeholder: "e.g. Morning walks three times a week"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Category"), /*#__PURE__*/React.createElement(Select, {
    placeholder: "Choose one",
    value: cat,
    onChange: e => setCat(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Wellness"), /*#__PURE__*/React.createElement("option", null, "Mindset"), /*#__PURE__*/React.createElement("option", null, "Creativity"), /*#__PURE__*/React.createElement("option", null, "Connection"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Why this one? (optional)"), /*#__PURE__*/React.createElement(Textarea, {
    value: why,
    onChange: e => setWhy(e.target.value),
    rows: 3,
    placeholder: "A little note to remind you why this matters\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    full: true,
    onClick: submit
  }, "Add it to the list"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 30,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: "0 0 16px"
    }
  }, "Everything you're growing"), goals.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, goals.map((g, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, g.goal), g.why && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, g.why)), /*#__PURE__*/React.createElement(Tag, null, g.cat))))) : /*#__PURE__*/React.createElement(EmptyState, {
    title: "No goals yet \u2014 and that's okay",
    description: "Add your first one above and it'll show up right here."
  })));
}
const lbl = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  color: "var(--text-secondary)",
  marginBottom: 8
};
window.IntentionsScreen = IntentionsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glow-within/IntentionsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glow-within/TodayScreen.jsx
try { (() => {
/* Glow Within — Today dashboard screen */
const {
  Card,
  Button,
  Tag,
  Eyebrow,
  ProgressBar,
  DayTracker,
  Icon
} = window.GlowWithinDesignSystem_5614ce;
function StatRow({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, children);
}
function TodayScreen({
  app
}) {
  const {
    streak,
    waterToday,
    goals,
    visions,
    go
  } = app;
  const seedLeft = Math.max(0, 3 - streak);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Good afternoon"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 48,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: "6px 0 10px",
      lineHeight: 1.05
    }
  }, "Janelle"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "Your little corner for goals, daily pep talks, and the dreams you're making real."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, "You're focusing on:"), /*#__PURE__*/React.createElement(Tag, null, "Wellness"), /*#__PURE__*/React.createElement(Tag, null, "Mindset"), /*#__PURE__*/React.createElement(Tag, null, "Creativity"))), /*#__PURE__*/React.createElement(Card, {
    padding: 40
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "A little reminder for you"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Thursday, July 23"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 30,
      lineHeight: 1.3,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: "18px 0 0"
    }
  }, "\u201CAbundance finds me when I stay open, grounded, and true.\u201D")), /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 40,
      padding: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 380px",
      minWidth: 300
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Your Growth Journey"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.625,
      color: "var(--text-secondary)",
      margin: "8px 0 20px"
    }
  }, "Each check-in, reflection, and gratitude moment helps your garden grow. No pressure \u2014 just small moments of showing up for yourself."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "var(--gw-sage-tint-2)",
      border: "1px solid #fff",
      boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.8)",
      fontSize: 42
    }
  }, "\uD83C\uDF31"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "green"
  }, "Current season"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 20,
      color: "var(--text-primary)",
      margin: "2px 0"
    }
  }, "Ready to grow"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "Your first check-in grows the first seed of your future."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "sage",
    onClick: waterToday,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "droplet",
      size: 16,
      color: "#fff"
    })
  }, "Water with gratitude"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 1 320px",
      minWidth: 260
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "You've shown up ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 20
    }
  }, streak), " ", streak === 1 ? "day" : "days", " for yourself."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "14px 0"
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: Math.min(100, streak / 3 * 100)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "var(--text-secondary)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF31"), " ", seedLeft > 0 ? `Seed in ${seedLeft} more ${seedLeft === 1 ? "day" : "days"}` : "Seed season reached!"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "green"
  }, "This week"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(DayTracker, {
    days: ["S", "M", "T", "W", "T", "F", "S"].map((l, i) => ({
      label: l,
      state: i < streak ? "watered" : i === 4 ? "today" : "empty"
    }))
  })))))), /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "green"
  }, "July"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: "2px 0 0"
    }
  }, "This month at a glance")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go("Intentions"),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "Set them")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.625,
      color: "var(--text-secondary)",
      margin: "16px 0 0"
    }
  }, "No intentions planted for July yet. Set a focus and a few priorities on Intentions \u2014 they'll bloom here as you mark progress.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Today's Goals"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go("Intentions"),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "Add goals")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: "16px 0 0"
    }
  }, goals.length ? `${goals.length} goal${goals.length > 1 ? "s" : ""} in motion — keep tending them.` : "Nothing here yet — add your first goal and let's get things moving.")), /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Vision board"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go("Vision Board"),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "Add vision")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: "16px 0 18px"
    }
  }, visions.length ? `${visions.length} pinned — future you is taking shape.` : "Nothing pinned yet. Add a photo, image link, or quote that feels like your future — one piece is enough to start."), !visions.length && /*#__PURE__*/React.createElement(Button, {
    variant: "sage",
    onClick: () => go("Vision Board")
  }, "Set up my board"))));
}
window.TodayScreen = TodayScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glow-within/TodayScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/glow-within/VisionScreen.jsx
try { (() => {
/* Glow Within — Vision Board */
const {
  Card,
  Button,
  Textarea,
  EmptyState,
  Icon
} = window.GlowWithinDesignSystem_5614ce;
function VisionScreen({
  app
}) {
  const {
    visions,
    addVision
  } = app;
  const [mode, setMode] = React.useState("upload"); // upload | link | quote
  const [value, setValue] = React.useState("");
  const [meaning, setMeaning] = React.useState("");
  const submit = () => {
    addVision({
      mode,
      value: value.trim() || (mode === "quote" ? "A calm, spacious morning" : "Sunlit studio"),
      meaning: meaning.trim()
    });
    setValue("");
    setMeaning("");
  };
  const modeBtn = (m, label) => /*#__PURE__*/React.createElement(Button, {
    variant: mode === m ? "primary" : "secondary",
    full: true,
    onClick: () => setMode(m)
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      fontSize: 40,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Vision Board"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: "var(--text-secondary)",
      margin: "10px 0 0",
      maxWidth: 640
    }
  }, "Collect images and words that feel like the life you're growing into. Start with one piece \u2014 upload a photo, paste an image link, or make a quote card.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-dashed)",
      borderRadius: 24,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-eyebrow",
    style: {
      marginBottom: 14
    }
  }, "Getting started"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20,
      color: "var(--text-secondary)",
      fontSize: 15,
      lineHeight: 2
    }
  }, /*#__PURE__*/React.createElement("li", null, "Choose upload, paste a direct image link, or create a quote card."), /*#__PURE__*/React.createElement("li", null, "Tell me what it represents for you."), /*#__PURE__*/React.createElement("li", null, "Pin it \u2014 your board grows from here."))), /*#__PURE__*/React.createElement(Card, {
    padding: 32
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 24,
      letterSpacing: "-0.5px",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "Pin your first vision"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-secondary)",
      margin: "6px 0 22px"
    }
  }, "One image or quote is enough to begin. You can always add more later."), /*#__PURE__*/React.createElement("label", {
    style: lbl2
  }, "How do you want to add it?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 20
    }
  }, modeBtn("upload", "Upload image"), modeBtn("link", "Paste image link"), modeBtn("quote", "Create quote card")), mode !== "upload" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl2
  }, mode === "link" ? "Image URL" : "Your quote"), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => setValue(e.target.value),
    placeholder: mode === "link" ? "https://…" : "A line that feels like your future…",
    style: {
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "var(--text-primary)",
      background: "var(--surface-input)",
      border: "1px solid var(--border-input)",
      borderRadius: 16,
      padding: "14px 16px",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("label", {
    style: lbl2
  }, "What does this represent?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    value: meaning,
    onChange: e => setMeaning(e.target.value),
    rows: 3,
    placeholder: "The feeling, the life, the moment you're picturing\u2026"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "sage",
    size: "lg",
    full: true,
    onClick: submit
  }, "Pin it to the board")), visions.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
      gap: 16
    }
  }, visions.map((v, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: 0,
    style: {
      overflow: "hidden"
    }
  }, v.mode === "quote" ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      minHeight: 140,
      display: "grid",
      placeItems: "center",
      background: "var(--gw-sage-tint-2)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 20,
      textAlign: "center",
      color: "var(--text-primary)",
      margin: 0
    }
  }, "\u201C", v.value, "\u201D")) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      background: "linear-gradient(135deg,var(--gw-blush),var(--gw-sage-tint))",
      display: "grid",
      placeItems: "center",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 28,
    color: "var(--text-muted)"
  })), v.meaning && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, v.meaning)))) : /*#__PURE__*/React.createElement(EmptyState, {
    title: "Your board is waiting for its first pin",
    description: "Use the form above \u2014 future you will love looking back at these."
  }));
}
const lbl2 = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  color: "var(--text-secondary)",
  marginBottom: 10
};
window.VisionScreen = VisionScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/glow-within/VisionScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DayTracker = __ds_scope.DayTracker;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.SegmentedTabs = __ds_scope.SegmentedTabs;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.TopNav = __ds_scope.TopNav;

})();
