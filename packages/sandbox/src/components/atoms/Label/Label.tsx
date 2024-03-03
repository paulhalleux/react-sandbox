import React from "react";
import { HelpCircle } from "lucide-react";

import { Text, Tooltip } from "..";

type LabelProps = React.PropsWithChildren<{
  required?: boolean;
  help?: React.ReactNode;
  addon?: React.ReactNode;
  htmlFor?: string;
  requiredDisplay?: "optional" | "required";
}>;

export function Label({
  children,
  required,
  requiredDisplay = "required",
  htmlFor,
  help,
  addon,
}: LabelProps) {
  return (
    <Text size="xs" as="label" htmlFor={htmlFor} className="flex items-center">
      {children}
      {requiredDisplay === "optional" && !required && (
        <Text as="span" color="secondary" className="ml-0.5">
          (optional)
        </Text>
      )}
      {requiredDisplay === "required" && required && (
        <Text as="span" color="danger" className="ml-0.5">
          *
        </Text>
      )}
      {help && (
        <Tooltip>
          <Tooltip.Trigger className="ml-1">
            <HelpCircle size={12} />
          </Tooltip.Trigger>
          <Tooltip.Content>{help}</Tooltip.Content>
        </Tooltip>
      )}
      {addon && <div className="ml-auto">{addon}</div>}
    </Text>
  );
}
