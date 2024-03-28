import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { useState } from "react";
import styles from "./PolymorphicNode.module.css";

import { Renderable, render } from "@/components";
import { motion } from "framer-motion";

type PolymorphicNodeData = {
  blocks: Array<Renderable>;
  accentColor: string;
};

type PolymorphicNodeType = Node<PolymorphicNodeData, "PolymorphicNode">;

const PolymorphicNode = (props: NodeProps<PolymorphicNodeType>) => {
  const [hovered, setHovered] = useState(false);


  return (
    <motion.div
      key={props.id}
      className={styles.polymorphic_node}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {props.data.blocks.map(render)}
      {/* Handles */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={true}
      />
      <Handle
        type="target"
        id="b"
        position={Position.Left}
        isConnectable={true}
      />
    </motion.div>
  );
};

export { PolymorphicNode, type PolymorphicNodeType };
