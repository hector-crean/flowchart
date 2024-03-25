import { useCallback, useState } from "react";
import { Handle, Node, NodeToolbar, Position, useReactFlow } from "reactflow";
import styles from "./BlockNode.module.css";

import { Renderable, render } from "@/components";
import { motion } from "framer-motion";
import { NodeToolbarBase } from "../node-toolbar/NodeToolbarBase";

interface BlockNodeData {
  blocks: Array<Renderable>;
}

type BlockNodeProps = Node<BlockNodeData, "BlockNode">;

const BlockNode = (props: BlockNodeProps) => {

  const { getNode, addNodes, deleteElements } = useReactFlow();

  const [hovered, setHovered] = useState(false);

  const node = getNode(props.id);

  const onAddNode = useCallback(() => {
    if (!node) return;
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes([
      {
        ...node, id: `${node.id}-copy`,
        position,
      }
    ]);
  }, [node, addNodes]);

  const onDeleteNode = useCallback(() => {
    if (!node) return;
    deleteElements({ nodes: [node] });
  }, [deleteElements, node]);



  if (!node) return null;


  return (
    <motion.div
      key={props.id}
      className={styles.rich_text_node}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <NodeToolbar
        nodeId={props.id}
        position={Position.Top}
        isVisible={props.selected}
      >
        <NodeToolbarBase
          onAddNode={onAddNode}
          onDeleteNode={onDeleteNode}
        />
      </NodeToolbar>
      <div>{props.data.blocks.map(render)}</div>
      {/* Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={true}
      />
      <Handle
        type="target"
        id="b"
        position={Position.Top}
        isConnectable={true}
      />
    </motion.div>
  );
};

export { BlockNode, type BlockNodeProps };
