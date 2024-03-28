import clsx from "clsx";
import { useRef, type DragEvent } from "react";
import { FlowNodeType } from "../types";
import styles from "./SidebarItem.module.css";

type SidebarItemProps = {
  type: FlowNodeType['type'];
};

function SidebarItem({ type }: SidebarItemProps) {
  const dragImageRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: DragEvent<HTMLDivElement>, type: FlowNodeType['type']) => {
    event.dataTransfer?.setData(
      "application/reactflow",
      type ?? 'default'
    );
    event.dataTransfer.effectAllowed = 'move';

    if (dragImageRef.current) {
      event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  };

  return (
    <div className={clsx([styles.sidebar_item, 'react-flow__node-default'])} draggable onDragStart={e => onDragStart(e, type)}>
      {type}
    </div>
  );
}

export default SidebarItem;
