import * as ContextMenu from "@radix-ui/react-context-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import styles from "./ContextMenu.module.css";




interface NodeContextMenuProps {
  children: ReactNode;
}
const NodeContextMenu = ({ children }: NodeContextMenuProps) => {





  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={styles.ContextMenuTrigger}>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={styles.ContextMenuContent}>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
          >
            Delete <div className={styles.RightSlot}>⌘+[</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
          >
            Duplicate <div className={styles.RightSlot}>⌘+]</div>
          </ContextMenu.Item>
          <ContextMenu.Item className={styles.ContextMenuItem}>
            Reload <div className={styles.RightSlot}>⌘+R</div>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className={styles.ContextMenuSubTrigger}>
              More Tools
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className={styles.ContextMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <ContextMenu.Item className={styles.ContextMenuItem}>
                  Save Page As… <div className={styles.RightSlot}>⌘+S</div>
                </ContextMenu.Item>
                <ContextMenu.Item className={styles.ContextMenuItem}>
                  Create Shortcut…
                </ContextMenu.Item>
                <ContextMenu.Item className={styles.ContextMenuItem}>
                  Name Window…
                </ContextMenu.Item>
                <ContextMenu.Separator
                  className={styles.ContextMenuSeparator}
                />
                <ContextMenu.Item className={styles.ContextMenuItem}>
                  Developer Tools
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export { NodeContextMenu };
export type { NodeContextMenuProps };

