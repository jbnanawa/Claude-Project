import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "sage" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill container width. */
  full?: boolean;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Trailing icon node (e.g. arrow-up-right on ghost links). */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action button for Glow Within.
 * @startingPoint section="Forms" subtitle="Buttons in every variant & size" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
