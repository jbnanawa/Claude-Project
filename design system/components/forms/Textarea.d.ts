import React from "react";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}
/** Multi-line note field, matches Input styling. */
export function Textarea(props: TextareaProps): JSX.Element;
