import { FlowEdgeType, FlowNodeType } from '@/components/flow/types'
import { MarkerType } from '@xyflow/react'


type Flow = {
  id: string,
  nodes: Array<FlowNodeType>,
  edges: Array<FlowEdgeType>
}
const flow: Flow = {
  "id": "641e8a6a-a911-4659-b583-d689de7d2c3f",
  "edges": [
    {
      "id": "reactflow__edge-2c4ed479-67b8-4e08-a3d0-ad592da11679a-4568e749-da92-437e-a86a-af230faf04dab",
      "label": "This is an example label",
      "markerEnd": MarkerType.Arrow,
      "selected": false,
      "source": "2c4ed479-67b8-4e08-a3d0-ad592da11679",
      "sourceHandle": "a",
      "style": { "opacity": 1 },
      "target": "4568e749-da92-437e-a86a-af230faf04da",
      "targetHandle": "b",
      "type": "PolymorphicEdge"
    },
    {
      "animated": true,
      "id": "reactflow__edge-2c4ed479-67b8-4e08-a3d0-ad592da11679a-bf9f2867-8686-470d-9f24-d6256264e319b",
      "markerEnd": MarkerType.Arrow,
      "selected": false,
      "source": "2c4ed479-67b8-4e08-a3d0-ad592da11679",
      "sourceHandle": "a",
      "style": { "opacity": 1 },
      "target": "bf9f2867-8686-470d-9f24-d6256264e319",
      "targetHandle": "b",
      "type": "smoothstep"
    }
  ],
  "nodes": [
  
    {
      "id": "3",
      "type": "ShapeNode",
      "position": { "x": -160, "y": 130 },
      "style": { "width": 80, "height": 80 },
      "data": {
        "type": "circle",
        "color": "#438D57"
      }
    },
   
    {
      "type": 'RichTextNode',
      "id": "2c4ed479-67b8-4e08-a3d0-ad592da11679",
      "position": { "x": 0, "y": 0 },
      "data": {
        'text': "Default text",
    },
  }
  
  ]
}


export { flow }
