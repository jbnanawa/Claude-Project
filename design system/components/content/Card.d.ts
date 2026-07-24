import React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding in px. @default 32 */
  padding?: number;
  /** Render the decorative blush + sage orbs behind content. */
  blobs?: boolean;
  children?: React.ReactNode;
}
/**
 * Glow Within's translucent glass card.
 * @startingPoint section="Content" subtitle="Signature glass card" viewport="700x260"
 */
export function Card(props: CardProps): JSX.Element;
