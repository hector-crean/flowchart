import Elk, { ElkNode, LayoutOptions } from "elkjs";
import omit from "lodash/omit";
import { MouseEvent, useCallback, useMemo, useRef, useState, WheelEvent } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  EdgeTypes,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  MiniMap,
  Node,
  NodeMouseHandler,
  NodeToolbar,
  NodeTypes,
  OnConnect,
  OnMove,
  OnNodesDelete,
  OnSelectionChangeFunc,
  PanOnScrollMode,
  Position,
  ReactFlowInstance,
  SelectionMode,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "reactflow";
import { NodeContextMenu } from "./context-menu/ContextMenu";
import { ProgressEdge } from "./edges/progress-edge";
import { RichTextNode } from "./nodes/RichTextNode";

import "reactflow/dist/style.css";
import "./Flow.css";

const MULTI_SELECT_KEY = ['Meta', 'Shift'];

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

  const [isSelectable, setIsSelectable] = useState<boolean>(true);
  const [isDraggable, setIsDraggable] = useState<boolean>(true);
  const [isConnectable, setIsConnectable] = useState<boolean>(true);
  const [zoomOnScroll, setZoomOnScroll] = useState<boolean>(true);
  const [zoomOnPinch, setZoomOnPinch] = useState<boolean>(true);
  const [panOnScroll, setPanOnScroll] = useState<boolean>(false);
  const [panOnScrollMode, setPanOnScrollMode] = useState<PanOnScrollMode>(PanOnScrollMode.Free);
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState<boolean>(true);
  const [panOnDrag, setPanOnDrag] = useState<boolean>(true);
  const [captureZoomClick, setCaptureZoomClick] = useState<boolean>(false);
  const [captureZoomScroll, setCaptureZoomScroll] = useState<boolean>(false);
  const [captureElementClick, setCaptureElementClick] = useState<boolean>(false);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      RichText: RichTextNode,
    }),
    []
  );

  const edgeTypes: EdgeTypes = useMemo(() => ({
    ProgressEdge: ProgressEdge
  }), []);

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodes, setSelectedNodes] = useState<Array<string>>([]);
  const [selectedEdges, setSelectedEdges] = useState<Array<string>>([]);


  //handlers : 


  const onSelectionChange: OnSelectionChangeFunc = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes.map((node) => node.id));
    setSelectedEdges(edges.map((edge) => edge.id));
  }, [setSelectedNodes, setSelectedEdges])


  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    []
  );

  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
      setNodes(nodes.map(node => ({ ...node, selected: false })))
    },
    [nodes, edges, setEdges, selectedNodes]
  );


  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      event.preventDefault()
      setSelectedNodes([node.id]);
    },
    [setSelectedNodes]
  );

  const onPaneClick = useCallback(
    () => setSelectedNodes([]),
    [setSelectedNodes]
  );

  const onNodeDragStart = useCallback((_: MouseEvent, node: Node) => console.log('drag start', node), []);
  const onNodeDragStop = useCallback((_: MouseEvent, node: Node) => console.log('drag stop', node), []);
  const onNodeClick = useCallback((_: MouseEvent, node: Node) => console.log('click', node), []);
  const onEdgeClick = useCallback((_: MouseEvent, edge: Edge) => console.log('click', edge), []);
  const onPaneScroll = useCallback((event?: WheelEvent) => console.log('onPaneScroll', event), []);
  const onPaneContextMenu = useCallback((event: MouseEvent) => console.log('onPaneContextMenu', event), []);
  const onMoveEnd: OnMove = useCallback((event, viewport) => console.log('onMoveEnd', viewport), []);




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
    [fitView]
  );

  return (
    <NodeContextMenu>
      <div style={{ position: 'fixed', inset: 0 }}>
        <ReactFlow
          ref={flowContainerRef}
          proOptions={{ account: "paid-pro", hideAttribution: true }}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          elementsSelectable={isSelectable}
          nodesConnectable={isConnectable}
          nodesDraggable={isDraggable}
          zoomOnScroll={zoomOnScroll}
          zoomOnPinch={zoomOnPinch}
          panOnScroll={panOnScroll}
          panOnScrollMode={panOnScrollMode}
          zoomOnDoubleClick={zoomOnDoubleClick}
          panOnDrag={panOnDrag}
          nodeDragThreshold={0}
          selectNodesOnDrag={false}
          selectionMode={SelectionMode.Partial}
          multiSelectionKeyCode={MULTI_SELECT_KEY}
          fitView={true}
          snapToGrid={true}
          snapGrid={snapGrid}
          fitViewOptions={{ padding: 0.1 /*nodes: [{ id: '1' }]*/ }}
          attributionPosition="top-right"
          maxZoom={Infinity}
          // handlers
          // -- handlers: nodes
          onNodeClick={captureElementClick ? onNodeClick : undefined}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          onNodeContextMenu={onNodeContextMenu}
          onNodeDrag={onNodeDrag}
          onNodeDoubleClick={onNodeDoubleClick}
          // -- handlers: edges
          onEdgeClick={captureElementClick ? onEdgeClick : undefined}
          onEdgesChange={onEdgesChange}
          onEdgeContextMenu={onEdgeContextMenu}
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseMove={onEdgeMouseMove}
          onEdgeMouseLeave={onEdgeMouseLeave}
          onEdgeDoubleClick={onEdgeDoubleClick}
          // -- handlers: pane
          onPaneClick={captureZoomClick ? onPaneClick : undefined}
          onPaneScroll={captureZoomScroll ? onPaneScroll : undefined}
          onPaneContextMenu={captureZoomClick ? onPaneContextMenu : undefined}
          onPaneMouseMove={onPaneMouseMove}
          // -- handlers: selection
          onSelectionDragStart={onSelectionDragStart}
          onSelectionDrag={onSelectionDrag}
          onSelectionDragStop={onSelectionDragStop}
          onSelectionContextMenu={() => { }}
          onSelectionChange={onSelectionChange}

          onMoveStart={onMoveStart}
          onMoveEnd={onMoveEnd}

          onConnect={onConnect}

          onInit={() => onLayout(nodes, edges)}

          connectionLineStyle={connectionLineStyle}








        >
          <Background
            color="#ccc"
            variant={BackgroundVariant.Dots}
            style={{ zIndex: -1 }}
          />
          <MiniMap zoomable pannable />
          <Controls />
          <NodeToolbar nodeId={selectedNodes} position={Position.Top} isVisible={selectedNodes.length > 0} >
            {/* <NodeToolbarBase node={node} /> */}
            <button>Selection action</button>

          </NodeToolbar>
        </ReactFlow>
      </div>
    </NodeContextMenu>
  );
};

export { Flow };
export type { FlowProps };

