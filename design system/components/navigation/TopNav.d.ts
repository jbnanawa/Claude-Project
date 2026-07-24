import React from "react";
export interface NavItem { label: string; href?: string; active?: boolean; }
export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Nav links. Defaults to the four app sections. */
  items?: NavItem[];
}
/** Amber "Gw" tile + serif "Glow Within" wordmark (brand renders in type). */
export function Wordmark(props: { size?: number; style?: React.CSSProperties }): JSX.Element;
/**
 * Desktop top navigation bar with pill links.
 * @startingPoint section="Navigation" subtitle="Desktop header + wordmark" viewport="700x90"
 */
export function TopNav(props: TopNavProps): JSX.Element;
