import React from "react";
import type { IconName } from "../media/Icon";
export interface BottomNavItem { icon: IconName; label: string; href?: string; active?: boolean; }
export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Tabs. Defaults to Today / Garden / Intentions / Vision. */
  items?: BottomNavItem[];
}
/** Mobile bottom tab bar with icon + label. */
export function BottomNav(props: BottomNavProps): JSX.Element;
