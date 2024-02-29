import React from "react";

import { Text } from "..";

type LabelProps = React.PropsWithChildren<{
  required?: boolean;
  htmlFor?: string;
}>;

export function Label({ children, required, htmlFor }: LabelProps) {
  return (
    <Text size="xs" as="label" htmlFor={htmlFor}>
      {children}
      {required && (
        <Text as="span" color="danger" weight="bold">
          {" *"}
        </Text>
      )}
    </Text>
  );
}
