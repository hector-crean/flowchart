import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ReactNode, useCallback } from "react";
import { useReactFlow } from "reactflow";
import styles from './ContextMenu.module.css';

interface NodeContextMenuProps {
  id: string
  children: ReactNode

}
const NodeContextMenu = ({
  id,
  children
}: NodeContextMenuProps) => {

  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const node = getNode(id);

    if (node) {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      addNodes({ ...node, id: `${node.id}-copy`, position });
    }

  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={styles.ContextMenuTrigger}>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={styles.ContextMenuContent} >
          <ContextMenu.Item className={styles.ContextMenuItem} onClick={deleteNode}>
            Delete <div className={styles.RightSlot}>⌘+[</div>
          </ContextMenu.Item>
          <ContextMenu.Item className={styles.ContextMenuItem} onClick={duplicateNode}>
            Duplicate <div className={styles.RightSlot}>⌘+]</div>
          </ContextMenu.Item>
          <ContextMenu.Item className={styles.ContextMenuItem}>
            Reload <div className="RightSlot">⌘+R</div>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
              More Tools
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="ContextMenuSubContent"
                sideOffset={2}
                alignOffset={-5}
              >
                <ContextMenu.Item className="ContextMenuItem">
                  Save Page As… <div className="RightSlot">⌘+S</div>
                </ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">Create Shortcut…</ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">Name Window…</ContextMenu.Item>
                <ContextMenu.Separator className="ContextMenuSeparator" />
                <ContextMenu.Item className="ContextMenuItem">Developer Tools</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>


        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

export { NodeContextMenu };
export type { NodeContextMenuProps };

