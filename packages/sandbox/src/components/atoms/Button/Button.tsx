import React from "react";

import { buttonStyles, ButtonVariant } from "./Button.styles.tsx";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & ButtonVariant;

export function Button({
  children,
  size = "md",
  status,
  className,
  icon,
  ...rest
}: ButtonProps) {
  const classes = buttonStyles({ size, status, className, icon });
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

function IconButton({ children, ...props }: Omit<ButtonProps, "icon">) {
  return (
    <Button {...props} icon>
      {children}
    </Button>
  );
}

Button.Icon = IconButton;
