import { useState } from "react";
import { Handle, Node, Position, useReactFlow } from "reactflow";
import styles from "./BlockNode.module.css";

import { Renderable, render } from "@/components";
import { motion } from "framer-motion";

interface BlockNodeData {
  blocks: Array<Renderable>;
}

type BlockNodeProps = Node<BlockNodeData, "BlockNode">;

const BlockNode = (props: BlockNodeProps) => {
  const [hovered, setHovered] = useState(false);

  const { getNode } = useReactFlow();

  const node = getNode(props.id);

  if (!node) return null;

  console.log(props.data);

  return (
    <motion.div
      key={props.id}
      className={styles.rich_text_node}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
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
