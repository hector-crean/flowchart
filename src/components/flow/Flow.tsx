import { motion } from 'framer-motion';
import {
  useEffect,
  useMemo,
  useState
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import { NodeContextMenu } from './context-menu/ContextMenu';
import { Controls } from './control-bar/ControlBar';
import { ProgressEdge } from './edges/progress-edge';
import "./Flow.css";
import styles from './Flow.module.css';
import useAutoLayout, { LayoutOptions } from "./hooks/useAutoLayout";
import { BlockNode } from './nodes/BlockNode';

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};


interface FlowProps {
  id: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
}
const Flow = ({ nodes: initialNodes, edges: initialEdges }: FlowProps) => {
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [layoutComputed, setLayoutComputed] = useState(true)


  const nodeTypes: NodeTypes = useMemo(
    () => ({
      BlockNode: BlockNode,
    }),
    []
  );

  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      ProgressEdge: ProgressEdge,
    }),
    []
  );


  const layoutOptions: LayoutOptions = useMemo(() => ({
    algorithm: 'dagre',
    direction: 'BT',
    spacing: [50, 50],
  }), []);

  useAutoLayout(layoutOptions);


  useEffect(() => {
    const fitted = fitView();
    setLayoutComputed(fitted)
  }, [nodes, fitView])


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <NodeContextMenu>

        <ReactFlow
          className={styles.flow_wrapper}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          //  onConnect={(connection) => setEdges((eds) => addEdge(connection, eds))}
          nodesDraggable={false}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          proOptions={proOptions}
          zoomOnDoubleClick={false}

        >
          <Background
            color="#ccc"
            variant={BackgroundVariant.Dots}
            style={{ zIndex: -1 }}
          />
          <MiniMap zoomable pannable />
          <Controls />

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

