import {
  NodePositionChange,
  OnNodesChange,
  useReactFlow,
  XYPosition,
} from "reactflow";
import { useState } from "react";
import {
  getHelperLines,
  HelperLines as HelperLinesType,
  updateSnapPosition,
} from "./utils.ts";

export function useHelperLines() {
  const { getNodes } = useReactFlow();
  const [helperLines, setHelperLines] = useState<HelperLinesType>({});

  const onHelperLines: OnNodesChange = (changes) => {
    // Reset the helper lines on each change
    setHelperLines({
      horizontal: undefined,
      vertical: undefined,
    });

    const firstChange = changes[0];
    if (
      firstChange &&
      firstChange.type === "position" &&
      firstChange.dragging &&
      firstChange.position
    ) {
      const otherChanges = changes.filter(
        (change) => change.type === "position" && change.id !== firstChange.id,
      ) as NodePositionChange[];

      const helperLinesResult = getHelperLines({
        change: firstChange,
        otherChanges,
        nodes: getNodes(),
        distance: 10,
      });

      const sameX = otherChanges.every(
        (change) => change.position?.x === firstChange.position?.x,
      );

      const sameY = otherChanges.every(
        (change) => change.position?.y === firstChange.position?.y,
      );

      if (sameX || sameY) {
        otherChanges.forEach((change) => {
          if (!change.position || !firstChange.position) return;
          const distance = getDistance(change.position, firstChange.position);

          updateSnapPosition(change, {
            x: helperLinesResult.snapPosition.x
              ? helperLinesResult.snapPosition.x + distance.x
              : undefined,
            y: helperLinesResult.snapPosition.y
              ? helperLinesResult.snapPosition.y + distance.y
              : undefined,
          });
        });
      } else {
        return;
      }

      // if we have a helper line, we snap the node to the helper line position
      // this is being done by manipulating the node position inside the change object (reference)
      updateSnapPosition(firstChange, helperLinesResult.snapPosition);

      // if helper lines are returned, we set them so that they can be displayed
      if (
        helperLinesResult.helperLines.horizontal !== undefined ||
        helperLinesResult.helperLines.vertical !== undefined
      ) {
        setHelperLines(helperLinesResult.helperLines);
      }
    }
  };

  return { helperLines, onHelperLines };
}

function getDistance(posA: XYPosition, posB: XYPosition) {
  return {
    x: Math.abs(posA.x - posB.x),
    y: Math.abs(posA.y - posB.y),
  };
}
