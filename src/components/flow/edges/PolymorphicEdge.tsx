import {
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useStore,
} from "@xyflow/react";
import cc from "classcat";
import { motion } from "framer-motion";


const draw = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      strokeDasharray: ["1, 150", "90, 150", "90, 150"],
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
        strokeDasharray: { delay, duration: 0.01 },
      },
    };
  },
};

type PolymorphicEdgeData = {
  label: string;
}

type PolymorphicEdgeType = Edge<PolymorphicEdgeData>;

function PolymorphicEdge({
  data,
  id,
  sourcePosition,
  targetPosition,
  target,
  source,
  style,
  markerEnd,
  markerStart,
  interactionWidth = 20,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps<PolymorphicEdgeType>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isConnectedNodeDragging = useStore((s) =>
    s.nodes.find((n) => n.dragging && (target === n.id || source === n.id))
  );

  return (
    <>
      <motion.path
        id={id}
        style={style}
        d={edgePath}
        fill="none"
        className={cc(["react-flow__edge-path"])}
        markerEnd={markerEnd}
        markerStart={markerStart}
        stroke="#222"
        strokeWidth={10}
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={1}
        strokeDasharray="1 2 3"
      />
      {interactionWidth && (
        <motion.path
          d={edgePath}
          fill="none"
          strokeOpacity={0}
          strokeWidth={interactionWidth}
          className="react-flow__edge-interaction"
        />
      )}
      {Boolean(data?.label) && <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "white",
            border: "1px solid #555",
            padding: 5,
            zIndex: isConnectedNodeDragging ? 10 : 0,
          }}
        >
          {data?.label}
        </div>
      </EdgeLabelRenderer>}
      {/* <EdgeText
        x={labelX}
        y={labelY}
        label={label}
        labelStyle={{ fill: "white" }}
        labelShowBg
        labelBgStyle={{ fill: "red" }}
        labelBgPadding={[2, 4]}
        labelBgBorderRadius={2}
      /> */}
    </>
  );
}

export { PolymorphicEdge, type PolymorphicEdgeType };
