import { GraphEdge, GraphNode, TaskType } from "./graph.types.ts";
import { HierarchyPointNode, stratify, tree } from "d3-hierarchy";

export const NODE_GAP = 100;
export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 50;

/**
 * The size of the nodes based on the direction.
 * Gap is added here to ensure a separation between nodes, it won't be added to the size of the nodes.
 */
const SizeMap: Record<"h" | "v", [number, number]> = {
  h: [NODE_HEIGHT + NODE_GAP / 8, NODE_WIDTH + NODE_GAP / 2],
  v: [NODE_WIDTH / 2 + NODE_GAP / 4, NODE_HEIGHT + NODE_GAP / 2],
};

/**
 * Get the layouted elements of the graph
 * @param nodes The nodes of the graph
 * @param edges The edges of the graph
 * @param direction The direction of the layout
 * @returns The layouted elements
 */
export const getLayoutedElements = (
  nodes: GraphNode[],
  edges: GraphEdge[],
  direction: "h" | "v",
) => {
  const g = tree<GraphNode>();
  if (nodes.length === 0) return { nodes, edges };

  const size = SizeMap[direction];

  const hierarchy = stratify<GraphNode>()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);

  const root = hierarchy(nodes);
  const layout = g.nodeSize(size)(root);

  // Align nodes with the same previous task
  fixLayout({ layout: layout, edges: edges, offset: size[1] });

  return {
    nodes: layout.descendants().map((node) => ({
      ...node.data,
      height: NODE_HEIGHT,
      width: NODE_WIDTH,
      position:
        // Swap the X and Y positions based on the direction
        direction === "h" ? { x: node.y, y: node.x } : { x: node.x, y: node.y },
    })),
    edges,
  };
};

/**
 * Fix the layout of the nodes to align nodes with the same previous task
 * @param layout The layout of the nodes
 * @param edges The edges of the graph
 * @param offset The offset to apply to the Y position of the join nodes
 */
function fixLayout({
  layout,
  edges,
  offset,
}: {
  layout: HierarchyPointNode<GraphNode>;
  edges: GraphEdge[];
  offset: number;
}) {
  const edgeSourceMap = getEdgeSourceMap(edges);
  layout.each((currentNode) => {
    if (!currentNode.data.data.previousTask) return;

    // Find the previous node
    const previousNode = layout.find(
      (node) => node.id === currentNode.data.data.previousTask?.id,
    );

    // If the previous node is not found, no need to fix the layout
    if (!previousNode) {
      return;
    }

    // If the current node is a join node, adapt all following nodes to the join node
    if (currentNode.data.data.task.type === TaskType.Join)
      fixJoinPosition({
        currentNode: currentNode,
        previousNode: previousNode,
        edgeSourceMap: edgeSourceMap,
        layout: layout,
        offset: offset,
      });
  });
}

/**
 * Fix the position of a join node
 * @param currentNode The current node (Join node)
 * @param previousNode The previous node
 * @param edgeSourceMap The map of source nodes
 * @param layout The layout of the nodes
 * @param offset The offset to apply to the Y position of the join nodes
 */
function fixJoinPosition({
  currentNode,
  previousNode,
  edgeSourceMap,
  layout,
  offset,
}: {
  currentNode: HierarchyPointNode<GraphNode>;
  previousNode: HierarchyPointNode<GraphNode>;
  edgeSourceMap: Record<string, string[]>;
  layout: HierarchyPointNode<GraphNode>;
  offset: number;
}) {
  // Calculate the delta between the current node and the previous node
  const fixDelta = currentNode.x - previousNode.x;

  // Subtract the delta from all descendants, including the current node
  currentNode.descendants().forEach((descendant) => {
    descendant.x -= fixDelta;
  });

  // Update the position of the current node (Join node) to be placed
  // after the last descendant of the fork branches
  if (!previousNode.children || previousNode.children.length === 0) {
    return;
  }

  // Get the edges that are connected to the current node (Last node of the fork branches)
  const sourceEdges = edgeSourceMap[currentNode.data.id];

  // Get the descendants of the current node that are connected to the current node
  const descendants = layout
    .descendants()
    .filter((descendant) => sourceEdges.includes(descendant.data.id));

  // Get the maximum Y position of the descendants
  const maxY = Math.max(...descendants.map((descendant) => descendant.y));

  // Update the Y position of the current node with an offset
  // corresponding to the gap between nodes and the height of the node
  currentNode.y = maxY + offset;
}

/**
 * Create a map for each node with the source nodes
 *
 * Example:
 * "node1": ["node2", "node3"] -> node2 and node3 have a link to node1
 * "node2": ["node1"] -> node1 has a link to node2
 *
 * @param edges The edges of the graph
 * @returns The map of source nodes: <node, [node targeting]>
 */
function getEdgeSourceMap(edges: GraphEdge[]) {
  return edges.reduce(
    (acc, edge) => {
      if (acc[edge.target]) {
        acc[edge.target].push(edge.source);
        return acc;
      }
      acc[edge.target] = [edge.source];
      return acc;
    },
    {} as Record<string, string[]>,
  );
}
