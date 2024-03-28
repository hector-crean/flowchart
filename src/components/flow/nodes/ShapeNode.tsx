import { Handle, Node, NodeProps, Position, useStore } from "@xyflow/react";

import Shape from "../shape";
import { type ShapeType } from "../shape/types";

type ShapeNodeData = {
  type: ShapeType;
  color: string;
};

type ShapeNodeType = Node<ShapeNodeData, "ShapeNode">;

function ShapeNode({ id, selected, data, width, height, }: NodeProps<ShapeNodeType>) {
  const { color, type } = data;

  const handleStyle = { backgroundColor: color };

  return (
    <>
      <Shape
        type={type}
        width={width}
        height={height}
        fill={color}
        strokeWidth={2}
        stroke={color}
        fillOpacity={0.8}
      />
      <Handle
        style={handleStyle}
        id="top"
        type="source"
        position={Position.Top}
      />
      <Handle
        style={handleStyle}
        id="right"
        type="source"
        position={Position.Right}
      />
      <Handle
        style={handleStyle}
        id="bottom"
        type="source"
        position={Position.Bottom}
      />
      <Handle
        style={handleStyle}
        id="left"
        type="source"
        position={Position.Left}
      />
    </>
  );
}

// this will return the current dimensions of the node (measured internally by react flow)
function useNodeDimensions(id: string) {
  const node = useStore((state) => state.nodeLookup.get(id));
  return {
    width: node?.width || 0,
    height: node?.height || 0,
  };
}

export { ShapeNode };
export type { ShapeNodeType };

