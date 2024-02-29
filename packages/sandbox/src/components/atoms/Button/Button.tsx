import React from "react";

import { buttonStyles, ButtonVariant } from "./Button.styles.tsx";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & ButtonVariant;

export function Button({
  children,
  size,
  status,
  className,
  ...rest
}: ButtonProps) {
  const classes = buttonStyles({ size, status, className });
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
