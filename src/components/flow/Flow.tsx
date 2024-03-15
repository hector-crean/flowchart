import { ResizeContainer } from "@/components/resize-container/ResizeContainer";
import Dagre, { GraphLabel } from 'dagre';
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
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import { NodeContextMenu } from "./ContextMenu";
import styles from "./Flow.module.css";
import { RichTextNode } from "./nodes/RichTextNode";


const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Array<Node>, edges: Array<Edge>, options: Dagre.GraphLabel) => {
  g.setGraph(options);

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};




interface FlowProps {
  id: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
}
const Flow = ({ nodes: initialNodes, edges: initialEdges }: FlowProps) => {
  const flowContainerRef = useRef<HTMLDivElement>(null);
  const { fitView } = useReactFlow();


  const nodeTypes: NodeTypes = useMemo(() => ({
    'RichText': RichTextNode
  }), []);

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

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {

      setSelectedNodeId(node.id)

      console.log(node.id)


    },
    [setSelectedNodeId]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setSelectedNodeId(null), [setSelectedNodeId]);


  const onLayout = useCallback(
    (options: GraphLabel) => {
      const layouted = getLayoutedElements(nodes, edges, options);

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );



  return (
    <NodeContextMenu id={selectedNodeId ?? ""}>
      <div className={styles.wrapper}>
        <ResizeContainer
          as="div"
          className={styles.no_select}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: '100%',
            // aspectRatio: `${aw}/${ah}`,
          }}
        >
          {({ width, height }) => (
            <ReactFlow
              ref={flowContainerRef}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              proOptions={{ account: "paid-pro", hideAttribution: true }}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={() => onLayout({ width, height })}
              onPaneClick={onPaneClick}
              onNodeContextMenu={onNodeContextMenu}
            // fitView
            >
              <Background
                color="#ccc"
                variant={BackgroundVariant.Cross}
                style={{ zIndex: -1 }}
              />
              <MiniMap />
              <Controls />
            </ReactFlow>)}
        </ResizeContainer>
      </div>
    </NodeContextMenu>

  );
};




export { Flow };
export type { FlowProps };

