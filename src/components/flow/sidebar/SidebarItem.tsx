import { Renderable, render } from "@/components";
import { useRef, type DragEvent } from "react";
import styles from "./SidebarItem.module.css";

type SidebarItemProps = {
  renderable: Renderable;
};

function SidebarItem({ renderable }: SidebarItemProps) {
  const dragImageRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer?.setData(
      "application/reactflow",
      JSON.stringify(renderable)
    );

    if (dragImageRef.current) {
      event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  };

  return (
    <div className={styles.sidebar_item} draggable onDragStart={onDragStart}>
      {render(renderable)}
      <div className={styles.sidebar_item_drag_image} ref={dragImageRef}>
        {render(renderable)}
      </div>
    </div>
  );
}

export default SidebarItem;
