import React from "react";

import { inputStyles, InputVariant } from "./Input.styles.tsx";

type InputProps = React.ComponentPropsWithoutRef<"input"> & InputVariant;

export function Input({ size, className, ...rest }: InputProps) {
  const classes = inputStyles({ size, className });
  return <input className={classes} {...rest} />;
}
