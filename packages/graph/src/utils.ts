import { Node, NodePositionChange, XYPosition } from "reactflow";

export type HelperLines = {
  horizontal?: number;
  vertical?: number;
};

/**
 * Update the position of a node with the snap position
 * @param change The node position change
 * @param snapPosition The snap position
 * @returns The updated node change
 */
export function updateSnapPosition(
  change: NodePositionChange,
  snapPosition: Partial<XYPosition>,
) {
  if (!change.position) {
    return;
  }

  change.position.x = snapPosition?.x ?? change.position?.x ?? 0;
  change.position.y = snapPosition?.y ?? change.position?.y ?? 0;
}

type GetHelperLinesResult = {
  helperLines: HelperLines;
  snapPosition: Partial<XYPosition>;
};

/**
 * Get the helper lines for the given node position change
 * @param change The node position change
 * @param nodes The nodes
 * @param distance The distance to snap to
 * @param otherChanges The other node position changes
 * @returns The helper lines and the snap position
 */
export function getHelperLines({
  change,
  nodes,
  distance = 10,
  otherChanges,
}: {
  change: NodePositionChange;
  otherChanges: NodePositionChange[];
  nodes: Node[];
  distance?: number;
}): GetHelperLinesResult {
  const emptyResult: GetHelperLinesResult = {
    helperLines: {
      horizontal: undefined,
      vertical: undefined,
    },
    snapPosition: { x: undefined, y: undefined },
  };

  const { id, position } = change;
  const nodeA = nodes.find((node) => node.id === id);

  if (!nodeA || !position) {
    return emptyResult;
  }

  const nodeABounds = {
    left: position.x,
    right: position.x + (nodeA.width ?? 0),
    top: position.y,
    bottom: position.y + (nodeA.height ?? 0),
    width: nodeA.width ?? 0,
    height: nodeA.height ?? 0,
  };

  let horizontalDistance = distance;
  let verticalDistance = distance;

  return nodes
    .filter((node) => node.id !== nodeA.id)
    .filter((node) => node.parentNode === nodeA.parentNode)
    .filter((node) => !otherChanges.some((change) => change.id === node.id))
    .reduce<GetHelperLinesResult>((result, nodeB) => {
      const parentNodeB = nodes.find((node) => node.id === nodeB.parentNode);

      const nodeBBounds = {
        left: nodeB.position.x + (parentNodeB?.position.x ?? 0),
        right: nodeB.position.x + (nodeB.width ?? 0),
        top: nodeB.position.y + (parentNodeB?.position.y ?? 0),
        bottom: nodeB.position.y + (nodeB.height ?? 0),
        width: nodeB.width ?? 0,
        height: nodeB.height ?? 0,
      };

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //  |
      //  |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceLeftLeft = Math.abs(nodeABounds.left - nodeBBounds.left);

      if (distanceLeftLeft < verticalDistance) {
        result.snapPosition.x = nodeBBounds.left;
        result.helperLines.vertical = nodeBBounds.left;
        verticalDistance = distanceLeftLeft;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //              |
      //              |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceRightRight = Math.abs(
        nodeABounds.right - nodeBBounds.right,
      );

      if (
        distanceRightRight < verticalDistance &&
        !(distanceLeftLeft > distanceRightRight)
      ) {
        result.snapPosition.x = nodeBBounds.right - nodeABounds.width;
        result.helperLines.vertical = nodeBBounds.right;
        verticalDistance = distanceRightRight;
      }

      //              |‾‾‾‾‾‾‾‾‾‾‾|
      //              |     A     |
      //              |___________|
      //              |
      //              |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceLeftRight = Math.abs(nodeABounds.left - nodeBBounds.right);

      if (distanceLeftRight < verticalDistance) {
        result.snapPosition.x = nodeBBounds.right;
        result.helperLines.vertical = nodeBBounds.right;
        verticalDistance = distanceLeftRight;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //              |
      //              |
      //              |‾‾‾‾‾‾‾‾‾‾‾|
      //              |     B     |
      //              |___________|
      const distanceRightLeft = Math.abs(nodeABounds.right - nodeBBounds.left);

      if (distanceRightLeft < verticalDistance) {
        result.snapPosition.x = nodeBBounds.left - nodeABounds.width;
        result.helperLines.vertical = nodeBBounds.left;
        verticalDistance = distanceRightLeft;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |     |     B     |
      //  |___________|     |___________|
      const distanceTopTop = Math.abs(nodeABounds.top - nodeBBounds.top);

      if (distanceTopTop < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top;
        result.helperLines.horizontal = nodeBBounds.top;
        horizontalDistance = distanceTopTop;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|_________________
      //                    |           |
      //                    |     B     |
      //                    |___________|
      const distanceBottomTop = Math.abs(nodeABounds.bottom - nodeBBounds.top);

      if (distanceBottomTop < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top - nodeABounds.height;
        result.helperLines.horizontal = nodeBBounds.top;
        horizontalDistance = distanceBottomTop;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |     |     B     |
      //  |___________|_____|___________|
      const distanceBottomBottom = Math.abs(
        nodeABounds.bottom - nodeBBounds.bottom,
      );

      if (distanceBottomBottom < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom - nodeABounds.height;
        result.helperLines.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceBottomBottom;
      }

      //                    |‾‾‾‾‾‾‾‾‾‾‾|
      //                    |     B     |
      //                    |           |
      //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
      //  |     A     |
      //  |___________|
      const distanceTopBottom = Math.abs(nodeABounds.top - nodeBBounds.bottom);

      if (distanceTopBottom < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom;
        result.helperLines.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceTopBottom;
      }

      return result;
    }, emptyResult);
}
