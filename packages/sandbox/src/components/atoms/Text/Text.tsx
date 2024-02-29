import React from "react";

import { textStyles, TextVariant } from "./Text.styles.tsx";

type TextProps<ElementType extends React.ElementType> =
  React.PropsWithChildren<{
    as?: ElementType;
  }> &
    React.ComponentPropsWithoutRef<ElementType> &
    TextVariant;

export function Text<ElementType extends React.ElementType = "p">({
  children,
  as,
  className,
  size,
  weight,
  underline,
  italic,
  strikethrough,
  color,
  ...props
}: TextProps<ElementType>) {
  const Component = as || "p";

  const classes = textStyles({
    size,
    weight,
    underline,
    italic,
    strikethrough,
    color,
    className,
  });

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  );
}
