import Elk, { ElkNode, LayoutOptions } from "elkjs";
import omit from "lodash/omit";
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
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { NodeContextMenu } from "./ContextMenu";
import styles from "./Flow.module.css";
import { RichTextNode } from "./nodes/RichTextNode";

type GetLayoutedElementsArgs = {
  nodes: Node[];
  edges: Edge[];
};
const getLayoutedElements = async ({
  nodes,
  edges,
}: GetLayoutedElementsArgs) => {
  const elkOptions: LayoutOptions = {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.insideSelfLoops.activate": "false",
    "elk.interactiveLayout": "true",
    "elk.layered.crossingMinimization.semiInteractive": "true",
    "elk.layered.cycleBreaking.strategy": "INTERACTIVE",
    "elk.layered.layering.strategy": "INTERACTIVE",
    "elk.layered.nodePlacement.strategy": "INTERACTIVE",
    "elk.layered.spacing.edgeNodeBetweenLayers": "30",
    "elk.layered.spacing.nodeNodeBetweenLayers": "30",
    "elk.spacing.nodeNode": "50",
    "elk.spacing.componentComponent": "50",
    "elk.separateConnectedComponents": "false",
  };

  const elk = new Elk({
    defaultLayoutOptions: elkOptions,
  });

  const graph: ElkNode = {
    id: "root",
    layoutOptions: elkOptions,
    children: nodes.map((node) => {
      return {
        ...node,
        width: node.width ?? 0,
        height: node.height ?? 0,

        x: node.position.x,
        y: node.position.y,
      };
    }),
    edges: edges.map((edge) => {
      return {
        ...edge,
        sources: [edge.sourceHandle ?? edge.source],
        targets: [edge.target],
      };
    }),
  };

  const layoutedGraph = await elk.layout(graph);

  return {
    nodes: nodes.map((node) => {
      const layoutedNode = layoutedGraph.children?.find(
        (n) => n.id === node.id
      );
      if (!layoutedNode) return node;
      const clone = omit(node, ["width", "height"]);
      return {
        id: node.id,
        type: node.type,
        data: node.data,
        position: {
          x: layoutedNode.x ?? clone.position.x,
          y: layoutedNode.y ?? clone.position.y,
        },
        ...(layoutedNode.width &&
          layoutedNode.height && {
            width: layoutedNode.width,
            height: layoutedNode.height,
          }),
      };
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

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      RichText: RichTextNode,
    }),
    []
  );

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
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(
    () => setSelectedNodeId(null),
    [setSelectedNodeId]
  );

  const onLayout = useCallback(
    (nodes: Array<Node>, edges: Array<Edge>) => {
      const layouted = getLayoutedElements({
        nodes,
        edges,
      });

      layouted.then(({ nodes, edges }) => {
        setNodes([...nodes]);
        setEdges([...edges]);
      });

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [getLayoutedElements]
  );

  return (
    <NodeContextMenu id={selectedNodeId ?? ""}>
      <div className={styles.wrapper}>
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
          onInit={() => onLayout(nodes, edges)}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background
            color="#ccc"
            variant={BackgroundVariant.Cross}
            style={{ zIndex: -1 }}
          />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </NodeContextMenu>
  );
};

export { Flow };
export type { FlowProps };
