import React from "react";
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. @default 0 */
  value?: number;
  /** px. @default 12 */
  height?: number;
}
/** Slim sage progress track. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
