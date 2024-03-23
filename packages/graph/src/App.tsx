import {
  Background,
  OnNodesChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { useCallback, useMemo, useState } from "react";
import { createNode } from "./Node.tsx";
import { buildGraph, ComplexExampleWorkflow } from "./graph.types.ts";
import { createEdge } from "./Edge.tsx";
import { HelperLines } from "./HelperLines.tsx";
import { NODE_GAP, getLayoutedElements } from "./layout.ts";
import { useHelperLines } from "./useHelperLines.ts";

export function App() {
  const [direction, setDirection] = useState<"h" | "v">("v");

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChangeBase] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { helperLines, onHelperLines } = useHelperLines();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      onHelperLines(changes);
      onNodesChangeBase(changes);
    },
    [onHelperLines, onNodesChangeBase],
  );

  const onLayout = useCallback(
    (direction: "h" | "v") => {
      const graph = buildGraph(ComplexExampleWorkflow().tasks);
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(graph.nodes, graph.edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView({ duration: 500 });
      });
    },
    [fitView, setEdges, setNodes],
  );

  const nodeTypes = useMemo(
    () => ({ node: createNode(direction) }),
    [direction],
  );

  const edgeTypes = useMemo(
    () => ({ edge: createEdge(direction, NODE_GAP) }),
    [direction],
  );

  return (
    <div style={{ height: "100vh", background: "#1d1d28" }}>
      <button
        style={{
          position: "absolute",
          zIndex: 9,
          top: 10,
          left: 10,
        }}
        onClick={() => onLayout(direction)}
      >
        Layout
      </button>
      <button
        style={{
          position: "absolute",
          zIndex: 9,
          top: 10,
          left: 70,
        }}
        onClick={() => {
          const newDirection = direction === "v" ? "h" : "v";
          setDirection(newDirection);
          onLayout(newDirection);
        }}
      >
        Change direction to {direction === "v" ? "horizontal" : "vertical"}
      </button>
      <ReactFlow
        proOptions={{
          hideAttribution: true,
        }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <HelperLines helperLines={helperLines} />
        <Background />
      </ReactFlow>
    </div>
  );
}
