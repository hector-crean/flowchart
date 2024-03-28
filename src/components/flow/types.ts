import { BuiltInEdge, BuiltInNode } from '@xyflow/react';
import { PolymorphicEdgeType } from './edges/PolymorphicEdge';
import { PolymorphicNodeType } from "./nodes/PolymorphicNode";
import { RichTextNodeType } from './nodes/RichTextNode';
import { ShapeNodeType } from "./nodes/ShapeNode";




type FlowNodeType = ShapeNodeType | PolymorphicNodeType | BuiltInNode | RichTextNodeType
type FlowEdgeType = BuiltInEdge | PolymorphicEdgeType



export type { FlowEdgeType, FlowNodeType };




// const defaultFlowNode = (type: FlowNodeType['type'], props: Partial<FlowNodeType>): FlowNodeType => {
//     switch(type){
//         case 'PolymorphicNode':
//             return {
//                 id: uuidv4(),
//                 type,
//                 position: { x: 0, y: 0},
//                 style: { width: 100, height: 100 },
//                 data: {
//                   blocks: [renderable],
//                   accentColor: "red",
//                 },
//                 selected: true,
//                 ...props
//             }
//     }
// }