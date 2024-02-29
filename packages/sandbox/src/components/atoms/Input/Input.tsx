import React from "react";

import { inputStyles, InputVariant } from "./Input.styles.tsx";

/**
 * Props for the Input component
 */
export type InputProps = React.ComponentPropsWithoutRef<"input"> & InputVariant;

/**
 * A text input field
 */
export function Input({ size, className, invalid, ...rest }: InputProps) {
  const classes = inputStyles({ size, invalid, className });
  return <input data-invalid={invalid} className={classes} {...rest} />;
}
