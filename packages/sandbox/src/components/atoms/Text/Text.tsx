import React from "react";

import { textStyles, TextVariant } from "./Text.styles.tsx";

type TextProps<ElementType extends React.ElementType> =
  React.PropsWithChildren<{
    as?: ElementType;
  }> &
    Omit<React.ComponentPropsWithoutRef<ElementType>, keyof TextVariant> &
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
  ellipsis,
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
    ellipsis,
    className,
  });

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  );
}

type TextLinesProps = {
  text?: string;
};

function TextLines({ text }: TextLinesProps) {
  if (!text) return null;
  return (
    <span>
      {text.split("\n").map((line, index, self) => (
        <React.Fragment key={`${index}_${line}`}>
          {line}
          {index < self.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
}

Text.Lines = TextLines;
