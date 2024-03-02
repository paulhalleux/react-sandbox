import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { cardStyles, CardVariant } from "./Card.styles.ts";

type CardProps<ElementType extends React.ElementType> = PropsWithChildren<{
  as?: ElementType;
}> &
  ComponentPropsWithoutRef<ElementType> &
  CardVariant;

export function Card<ElementType extends React.ElementType = "div">({
  as,
  children,
  type,
  className,
  ...props
}: CardProps<ElementType>) {
  const Component = as || "div";
  const classes = cardStyles({ type, className });
  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  );
}
