import * as ContextMenu from "@radix-ui/react-context-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { XYPosition } from "@xyflow/react";
import { ReactNode } from "react";
import styles from "./ContextMenu.module.css";

interface NodeContextMenuProps {
  onCut: VoidFunction;
  onCopy: VoidFunction;
  onPaste: (clipboard?: XYPosition) => void;
  children: ReactNode;
}
const NodeContextMenu = ({
  children,
  onCopy,
  onCut,
  onPaste,
}: NodeContextMenuProps) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={styles.ContextMenuTrigger}>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={styles.ContextMenuContent}>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
            onClick={() => onCut()}
          >
            Delete <div className={styles.RightSlot}>⌘+[</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
            onClick={() => onPaste({ x: 0, y: 0 })}
          >
            Duplicate <div className={styles.RightSlot}>⌘+]</div>
          </ContextMenu.Item>
          <ContextMenu.Item
            className={styles.ContextMenuItem}
            onClick={() => onCopy()}
          >
            Copy <div className={styles.RightSlot}>⌘+R</div>
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
