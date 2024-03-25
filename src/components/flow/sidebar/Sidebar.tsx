import { Renderable } from "@/components";
import SidebarItem from "./SidebarItem";
import styles from "./SidebarItem.module.css";

const defaultRenderable: Renderable = {
  type: "RichText",
  id: "a570a324-7009-4c83-8aa0-44c204629443",
  props: {
    text: "",
  },
};
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-label">Drag shapes to the canvas</div>
      <div className={styles.sidebar_items}>
        <SidebarItem
          renderable={defaultRenderable}
          key={"default-renderable"}
        />
      </div>
    </div>
  );
}

export default Sidebar;
