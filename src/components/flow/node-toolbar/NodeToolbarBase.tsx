import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useCallback } from "react";
import { Node, useReactFlow } from "reactflow";
import { Tool } from "../tool/Tool";
import styles from "./NodeToolbarBase.module.css";

interface NodeToolbarBaseProps {
  nodes: Array<Node>;
  children?: ReactNode;
}

const NodeToolbarBase = ({ nodes, children }: NodeToolbarBaseProps) => {
  const { addNodes, deleteElements } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const addedNodes = nodes.map((node) => {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      return {
        ...node,
        id: `${node.id}-copy`,
        position,
      };
    });

    addNodes(addedNodes);
  }, [nodes, addNodes]);

  const deleteNode = useCallback(() => {
    deleteElements({ nodes });
  }, [deleteElements, nodes]);

  return (
    <AnimatePresence mode="wait">
      <motion.div className={styles.container}>
        <Tool onPointerDown={duplicateNode} disabled={false} title="Add Node">
          <PlusIcon width={15} height={15} />
        </Tool>
        <Tool onPointerDown={deleteNode} disabled={false} title="Delete Node">
          <MinusIcon width={15} height={15} />
        </Tool>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { NodeToolbarBase };
