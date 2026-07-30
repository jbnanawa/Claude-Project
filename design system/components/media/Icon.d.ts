import React from "react";

export type IconName =
  | "sun" | "sprout" | "target" | "image"
  | "chevron-left" | "chevron-right" | "chevron-down"
  | "arrow-up-right" | "plus" | "x" | "check"
  | "droplet" | "heart" | "sparkles" | "flower";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: IconName;
  /** px, applied to width & height. @default 20 */
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/** Inline Lucide-style line icon (the app's icon language). */
export function Icon(props: IconProps): JSX.Element;
export const ICON_NAMES: IconName[];
