import { BuiltInEdge, BuiltInNode } from '@xyflow/react';
import { PolymorphicEdgeType } from './edges/PolymorphicEdge';
import { PolymorphicNodeType } from "./nodes/PolymorphicNode";
import { ShapeNodeType } from "./nodes/ShapeNode";



type FlowNodeType = ShapeNodeType | PolymorphicNodeType | BuiltInNode
type FlowEdgeType = BuiltInEdge | PolymorphicEdgeType



export type { FlowEdgeType, FlowNodeType };


