import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { Tool } from "../tool/Tool";
import styles from "./NodeToolbarBase.module.css";

interface NodeToolbarBaseProps {
  onDeleteNode: () => void;
  onAddNode: () => void;
  children?: ReactNode;
}

const NodeToolbarBase = ({
  onAddNode,
  onDeleteNode,
  children,
}: NodeToolbarBaseProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div className={styles.container}>
        <Tool onPointerDown={onAddNode} disabled={false} title="Add Node">
          <PlusIcon width={15} height={15} />
        </Tool>
        <Tool onPointerDown={onDeleteNode} disabled={false} title="Delete Node">
          <MinusIcon width={15} height={15} />
        </Tool>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { NodeToolbarBase };
