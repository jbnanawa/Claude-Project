import React from "react";
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Serif reassuring headline. */
  title?: string;
  description?: string;
  children?: React.ReactNode;
}
/** Dashed-amber reassuring empty state. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
