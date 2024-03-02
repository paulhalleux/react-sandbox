import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { clsx } from "clsx";

import { Text } from "@/components/atoms";

type FieldsetProps = PropsWithChildren<{
  legend?: string;
  description?: string;
  containerClassName?: string;
}> &
  ComponentPropsWithoutRef<"fieldset">;

export function Fieldset({
  legend,
  description,
  className,
  containerClassName,
  ...props
}: FieldsetProps) {
  const showHeader = !!legend || !!description;

  return (
    <fieldset className={clsx("flex flex-col gap-4", containerClassName)}>
      {showHeader && (
        <header className="flex flex-col gap-0.5">
          {legend && <Text as="legend">{legend}</Text>}
          {description && (
            <Text size="xs" color="secondary">
              {description}
            </Text>
          )}
        </header>
      )}
      <div className={clsx("flex flex-col", className)}>{props.children}</div>
    </fieldset>
  );
}
