import React from "react";
import { clsx } from "clsx";
import { DragControls } from "framer-motion";
import { GripVertical } from "lucide-react";

type DragHandleProps = {
  dragControls: DragControls;
  disabled?: boolean;
};

export function DragHandle({ dragControls, disabled }: DragHandleProps) {
  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (disabled) return;
      event.stopPropagation();
      event.preventDefault();
      dragControls.start(event);
    },
    [disabled, dragControls]
  );

  return (
    <GripVertical
      onPointerDown={onPointerDown}
      className={clsx("cursor-grab", {
        "opacity-50 cursor-not-allowed": disabled,
      })}
      size={14}
    />
  );
}
