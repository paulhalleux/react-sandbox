import React from "react";
import { clsx } from "clsx";
import omit from "lodash/omit";

import {
  Popover,
  type PopoverProps,
  PopoverTriggerProps,
} from "@/components/atoms";

export function Tooltip({
  children,
  ...options
}: Omit<PopoverProps, "triggerType" | "triggerOnFocus">) {
  return (
    <Popover {...options} triggerType="hover" triggerOnFocus>
      {children}
    </Popover>
  );
}

Tooltip.Trigger = React.forwardRef<HTMLElement, PopoverTriggerProps>(
  function TooltipTrigger({ children, ...props }, propRef) {
    return (
      <Popover.Trigger ref={propRef} {...omit(props, ["ref"])}>
        {children}
      </Popover.Trigger>
    );
  }
);

Tooltip.Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent({ children, className, ...props }, propRef) {
  if (!children) return null;
  return (
    <Popover.Content
      ref={propRef}
      className={clsx(
        "bg-black/75 text-white px-2 py-1 rounded text-xs max-w-md text-center",
        className
      )}
      {...omit(props, ["ref"])}
    >
      {children}
    </Popover.Content>
  );
});
