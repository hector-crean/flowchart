import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Edge,
  EdgeTypes,
  MarkerType,
  MiniMap,
  Node,
  NodeToolbar,
  NodeTypes,
  OnConnect,
  OnNodesDelete,
  OnSelectionChangeFunc,
  PanOnScrollMode,
  Position,
  ReactFlow,
  ReactFlowJsonObject,
  ReactFlowProvider,
  SelectionMode,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { motion } from "framer-motion";
import {
  DragEvent,
  DragEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Renderable } from "..";
import "./Flow.css";
import styles from "./Flow.module.css";
import { NodeContextMenu } from "./context-menu/ContextMenu";
import { Controls } from "./control-bar/ControlBar";
import { PolymorphicEdge } from "./edges/PolymorphicEdge";
import { ConnectionStatus } from "./edges/validation/ConnectionStatus";
import useAutoLayout, { LayoutOptions } from "./hooks/useAutoLayout";
import useCopyPaste from "./hooks/useCopyPaste";
import { NodeToolbarBase } from "./node-toolbar/NodeToolbarBase";
import { FlowNodeProps } from "./nodes";
import { PolymorphicNode, PolymorphicNodeProps } from "./nodes/PolymorphicNode";
import { ShapeNode } from "./nodes/ShapeNode";

import "@xyflow/react/dist/style.css";

const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};

interface FlowProps {
  id: string;
  nodes: Array<FlowNodeProps>;
  edges: Array<Edge>;
}
const Flow = ({ id, nodes: initialNodes, edges: initialEdges }: FlowProps) => {
  const {
    fitView,
    screenToFlowPosition,
    toObject,
    addEdges,
    addNodes,
    deleteElements,
  } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [layoutComputed, setLayoutComputed] = useState(true);

  const [isSelectable, setIsSelectable] = useState<boolean>(true);
  const [isDraggable, setIsDraggable] = useState<boolean>(true);
  const [isConnectable, setIsConnectable] = useState<boolean>(true);
  const [zoomOnScroll, setZoomOnScroll] = useState<boolean>(true);
  const [zoomOnPinch, setZoomOnPinch] = useState<boolean>(true);
  const [panOnScroll, setPanOnScroll] = useState<boolean>(false);
  const [panOnScrollMode, setPanOnScrollMode] = useState<PanOnScrollMode>(
    PanOnScrollMode.Free
  );
  const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState<boolean>(true);
  const [panOnDrag, setPanOnDrag] = useState<boolean>(true);
  const [captureZoomClick, setCaptureZoomClick] = useState<boolean>(false);
  const [captureZoomScroll, setCaptureZoomScroll] = useState<boolean>(false);
  const [captureElementClick, setCaptureElementClick] =
    useState<boolean>(false);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      PolymorphicNode: PolymorphicNode,
      ShapeNode: ShapeNode,
    }),
    []
  );

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      PolymorphicEdge: PolymorphicEdge,
    }),
    []
  );

  const layoutOptions: LayoutOptions = useMemo(
    () => ({
      algorithm: "dagre",
      direction: "LR",
      spacing: [50, 50],
    }),
    []
  );

  useAutoLayout(layoutOptions);

  useEffect(() => {
    const fitted = fitView();
    setLayoutComputed(fitted);
  }, [layoutComputed === true]);

  const { cut, copy, paste, bufferedNodes } = useCopyPaste();

  const canCopy = nodes.some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;

  const onConnectNodes: OnConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  // node handlers
  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
      setNodes(nodes.map((node) => ({ ...node, selected: false })));
    },
    [nodes, edges, setEdges]
  );

  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  // this function is called when a node from the sidebar is dropped onto the react flow pane
  const onDrop: DragEventHandler = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const str = evt.dataTransfer.getData("application/reactflow");

    const renderable: Renderable = JSON.parse(str);

    // this will convert the pixel position of the node to the react flow coordinate system
    // so that a node is added at the correct position even when viewport is translated and/or zoomed in
    const position = screenToFlowPosition({ x: evt.clientX, y: evt.clientY });

    const newNode: PolymorphicNodeProps = {
      id: uuidv4(),
      type: "PolymorphicNode",
      position,
      style: { width: 100, height: 100 },
      data: {
        blocks: [renderable],
        accentColor: "red",
      },
      selected: true,
    };

    setNodes((nodes) =>
      nodes.map((n) => ({ ...n, selected: false })).concat([newNode])
    );
  };

  const onSave = useCallback(() => {
    const flow = toObject();
    console.log(flow);

    localStorage.setItem(id, JSON.stringify(flow));
  }, [toObject]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const str = localStorage.getItem(id);
      if (!str) return;
      const flow: ReactFlowJsonObject<any, any> = JSON.parse(str);

      if (flow) {
        setNodes(flow.nodes);
        setEdges(flow.edges);
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, localStorage]);

  const [selectedNodes, setSelectedNodes] = useState<Array<Node>>([]);
  const [selectedEdges, setSelectedEdges] = useState<Array<Edge>>([]);

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ nodes, edges }) => {
      setSelectedNodes(nodes);
      setSelectedEdges(edges);
    },
    []
  );

  const onAddNodes = useCallback(
    (nodes: Array<Node>) => {
      const newNodes = nodes.map((node) => ({
        ...node,
        id: uuidv4(),
        position: {
          x: 0,
          y: 0,
        },
      }));

      addNodes(newNodes);
    },
    [addNodes]
  );

  const onDeleteNodes = useCallback(
    (nodes: Array<Node>) => {
      deleteElements({ nodes });
    },
    [deleteElements]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <NodeContextMenu onCut={cut} onCopy={copy} onPaste={paste}>
        <ReactFlow
          className={styles.flow_wrapper}
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
          onSelectionChange={onSelectionChange}
          fitView={true}
          snapToGrid={true}
          snapGrid={[25, 25]}
          fitViewOptions={{ padding: 0.1 /*nodes: [{ id: '1' }]*/ }}
          attributionPosition="top-right"
          maxZoom={Infinity}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectNodes}
          onNodesDelete={onNodesDelete}
          onDragOver={onDragOver}
          onDrop={onDrop}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          proOptions={proOptions}
        >
          <Background
            color="#ccc"
            variant={BackgroundVariant.Dots}
            style={{ zIndex: -1 }}
          />
          <MiniMap zoomable pannable />
          <Controls onSave={onSave} onRestore={onRestore} />
          {/* <Panel position="top-left">
            <Sidebar />
          </Panel> */}
          <ConnectionStatus />
          <NodeToolbar
            nodeId={selectedNodes.map((node) => node.id)}
            position={Position.Top}
          >
            <NodeToolbarBase
              onAddNodes={() => onAddNodes(selectedNodes)}
              onDeleteNodes={() => onDeleteNodes(selectedNodes)}
            />
          </NodeToolbar>
        </ReactFlow>
      </NodeContextMenu>
    </motion.div>
  );
};

const FlowWrapper = (props: FlowProps) => {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
};

export { FlowWrapper };
export type { FlowProps };
