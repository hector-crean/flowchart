import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { Tool } from "../tool/Tool";
import styles from "./NodeToolbarBase.module.css";

interface NodeToolbarBaseProps {
  onDeleteNodes: () => void;
  onAddNodes: () => void;
  children?: ReactNode;
}

const NodeToolbarBase = ({
  onAddNodes,
  onDeleteNodes,
  children,
}: NodeToolbarBaseProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div className={styles.container}>
        <Tool onPointerDown={onAddNodes} disabled={false} title="Add Node">
          <PlusIcon width={15} height={15} />
        </Tool>
        <Tool
          onPointerDown={onDeleteNodes}
          disabled={false}
          title="Delete Node"
        >
          <MinusIcon width={15} height={15} />
        </Tool>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { NodeToolbarBase };
