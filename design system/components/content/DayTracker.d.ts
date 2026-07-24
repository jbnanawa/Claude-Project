import React from "react";
export interface DayCell { label: string; state?: "empty" | "today" | "watered"; }
export interface DayTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seven cells, Sun→Sat. Defaults to an empty week with today marked. */
  days?: DayCell[];
}
/** Weekly "showing up" streak of watering circles. */
export function DayTracker(props: DayTrackerProps): JSX.Element;
