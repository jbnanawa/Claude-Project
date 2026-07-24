import React from "react";
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "sage" */
  tone?: "sage" | "amber" | "neutral";
  children?: React.ReactNode;
}
/** Rounded pill chip for focus areas / categories. */
export function Tag(props: TagProps): JSX.Element;
