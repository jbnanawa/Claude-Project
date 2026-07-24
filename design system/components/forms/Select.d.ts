import React from "react";
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Shown as a disabled first option when no value selected. */
  placeholder?: string;
  children?: React.ReactNode;
}
/** Native select restyled to match Input, with a chevron. */
export function Select(props: SelectProps): JSX.Element;
