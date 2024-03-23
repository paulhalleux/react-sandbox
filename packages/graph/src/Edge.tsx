import { BaseEdge, SmoothStepEdgeProps } from "reactflow";
import { getSmoothStepPath } from "./smoothstep-edge";

export const createEdge = (direction: "h" | "v", gap: number) => {
  return function Edge({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    id,
    label,
    labelBgPadding,
    labelBgBorderRadius,
    interactionWidth,
    labelBgStyle,
    style,
    labelStyle,
    labelShowBg,
    pathOptions,
    markerEnd,
    markerStart,
  }: SmoothStepEdgeProps) {
    const [path, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX: targetX,
      targetY,
      targetPosition,
      borderRadius: pathOptions?.borderRadius,
      offset: gap / 5,
      direction,
    });

    return (
      <BaseEdge
        id={id}
        path={path}
        labelX={labelX}
        labelY={labelY}
        label={label}
        labelStyle={labelStyle}
        labelShowBg={labelShowBg}
        labelBgStyle={labelBgStyle}
        labelBgPadding={labelBgPadding}
        labelBgBorderRadius={labelBgBorderRadius}
        style={style}
        markerEnd={markerEnd}
        markerStart={markerStart}
        interactionWidth={interactionWidth}
      />
    );
  };
};
