import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  EdgeTypes,
  MiniMap,
  Node,
  NodeChange,
  NodeMouseHandler,
  NodeTypes,
  ReactFlowInstance,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import styles from "./Flow.module.css";

interface FlowProps {
  id: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
}
const Flow = ({ nodes: initialNodes, edges: initialEdges }: FlowProps) => {
  const flowContainerRef = useRef<HTMLDivElement>(null);

  const nodeTypes: NodeTypes = useMemo(() => ({}), []);

  const edgeTypes: EdgeTypes = useMemo(() => ({}), []);

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
  };

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Apply changes to React Flow when the flowchart is interacted with
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [nodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [edges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [edges]
  );

  const [menu, setMenu] = useState(null);

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.

      const pane = flowContainerRef?.current?.getBoundingClientRect();
      if (pane) {
        setMenu({
          id: node.id,
          top: event.clientY < pane.height - 200 && event.clientY,
          left: event.clientX < pane.width - 200 && event.clientX,
          right:
            event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom:
            event.clientY >= pane.height - 200 && pane.height - event.clientY,
        });
      }
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div className={styles.wrapper}>
      <ReactFlow
        ref={flowContainerRef}
        proOptions={{ account: "paid-pro", hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
      >
        <Background
          color="#ccc"
          variant={BackgroundVariant.Cross}
          style={{ zIndex: -1 }}
        />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export { Flow };
export type { FlowProps };
