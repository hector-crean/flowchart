import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";


function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_items}>
        <SidebarItem
          type={'RichTextNode'}
          key={"default-renderable"}
        />
      </div>
    </div>
  );
}

export default Sidebar;
