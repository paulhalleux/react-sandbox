import { Handle, NodeProps, Position } from "reactflow";
import { GraphNodeData } from "./graph.types.ts";

export const createNode = (direction: "h" | "v") => {
  return function Node({ data }: NodeProps<GraphNodeData>) {
    return (
      <div
        style={{
          background: "#2f2f3f",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #FFFFFF20",
          color: "#fff",
          width: "200px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          fontSize: "14px",
          position: "relative",
        }}
      >
        <Handle
          type="target"
          position={direction === "v" ? Position.Top : Position.Left}
        />
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.task.name}
        </div>
        <Handle
          type="source"
          position={direction === "v" ? Position.Bottom : Position.Right}
        />
      </div>
    );
  };
};
