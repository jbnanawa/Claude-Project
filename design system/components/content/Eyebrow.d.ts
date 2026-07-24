import React from "react";
export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "amber" */
  tone?: "amber" | "green" | "muted";
  children?: React.ReactNode;
}
/** Uppercase wide-tracked kicker label. */
export function Eyebrow(props: EyebrowProps): JSX.Element;
