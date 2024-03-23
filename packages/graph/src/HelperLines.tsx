import { CSSProperties, useRef, useState } from "react";
import { ReactFlowState, Transform, useStore } from "reactflow";
import { HelperLines as HelperLinesType } from "./utils.ts";

const canvasStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: 10,
  pointerEvents: "none",
};

const storeSelector = (state: ReactFlowState) => ({
  width: state.width,
  height: state.height,
  transform: state.transform,
});

type HelperLinesRendererProps = {
  color?: string;
  width?: number;
  helperLines: HelperLinesType;
};

export function HelperLines({
  color = "#0071e3",
  width: lineWidth = 1,
  helperLines,
}: HelperLinesRendererProps) {
  const { width, height, transform } = useStore(storeSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [prevHelperLines, setPrevHelperLines] = useState(helperLines);

  if (prevHelperLines !== helperLines) {
    setPrevHelperLines(helperLines);
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    drawCanvas({
      canvas,
      helperLines,
      transform,
      color,
      lineWidth,
      width,
      height,
    });
  }

  return <canvas ref={canvasRef} style={canvasStyle} />;
}

/**
 * Draw the helper lines on the canvas
 * @param canvas The canvas element
 * @param helperLines The helper lines
 * @param transform The transform of the graph
 * @param color The color of the lines
 * @param lineWidth The width of the lines
 * @param width The width of the canvas
 * @param height The height of the canvas
 */
function drawCanvas({
  canvas,
  helperLines,
  transform,
  color,
  lineWidth,
  width,
  height,
}: {
  canvas: HTMLCanvasElement;
  helperLines: HelperLinesType;
  transform: Transform;
  color: string;
  lineWidth: number;
  width: number;
  height: number;
}) {
  const renderingContext = canvas.getContext("2d");
  if (!renderingContext) {
    return;
  }

  const { horizontal, vertical } = helperLines;
  const [x, y, zoom] = transform;

  // Setup canvas
  const pixelRatio = window.devicePixelRatio;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  renderingContext.scale(pixelRatio, pixelRatio);
  renderingContext.clearRect(0, 0, width, height);

  // Set the line properties
  renderingContext.strokeStyle = color;
  renderingContext.lineWidth = lineWidth;

  // Draw the lines
  if (typeof vertical === "number") {
    renderingContext.moveTo(vertical * zoom + x, 0);
    renderingContext.lineTo(vertical * zoom + x, height);
    renderingContext.stroke();
  }

  if (typeof horizontal === "number") {
    renderingContext.moveTo(0, horizontal * zoom + y);
    renderingContext.lineTo(width, horizontal * zoom + y);
    renderingContext.stroke();
  }
}
