import React from "react";

import { inputStyles, InputVariant } from "./Input.styles.tsx";

/**
 * Props for the Input component
 */
export type InputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  keyof InputVariant
> &
  InputVariant;

/**
 * A text input field
 */
export function Input({
  size,
  className,
  variant,
  invalid,
  ...rest
}: InputProps) {
  const classes = inputStyles({ size, invalid, variant, className });
  return <input data-invalid={invalid} className={classes} {...rest} />;
}
