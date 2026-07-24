import React from "react";
export interface SegmentedTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** @default ["Daily intentions","Monthly intentions"] */
  options?: string[];
  /** Controlled selected option. */
  value?: string;
  onChange?: (option: string) => void;
}
/** Two/three-way segmented control with a sage active pill. */
export function SegmentedTabs(props: SegmentedTabsProps): JSX.Element;
