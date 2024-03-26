import { FlowEdgeType, FlowNodeType } from '@/components/flow/types'

type Flow = {
  id: string,
  nodes: Array<FlowNodeType>,
  edges: Array<FlowEdgeType>
}
const flow: Flow = {
  "edges": [
    {
      "id": "reactflow__edge-2c4ed479-67b8-4e08-a3d0-ad592da11679a-4568e749-da92-437e-a86a-af230faf04dab",
      "label": "This is an example label",
      "markerEnd": { "type": "arrowclosed" },
      "pathOptions": { "offset": 5 },
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
      "markerEnd": { "type": "arrowclosed" },
      "pathOptions": { "offset": 5 },
      "selected": false,
      "source": "2c4ed479-67b8-4e08-a3d0-ad592da11679",
      "sourceHandle": "a",
      "style": { "opacity": 1 },
      "target": "bf9f2867-8686-470d-9f24-d6256264e319",
      "targetHandle": "b",
      "type": "smoothstep"
    }
  ],
  "id": "641e8a6a-a911-4659-b583-d689de7d2c3f",
  "nodes": [
    {
      "id": "1",
      "type": "ShapeNode",
      "position": { "x": 0, "y": 0 },
      "style": { "width": 120, "height": 60 },
      "data": {
        "type": "round-rectangle",
        "color": "#3F8AE2"
      }
    },
    {
      "id": "2",
      "type": "ShapeNode",
      "position": { "x": 10, "y": 120 },
      "style": { "width": 100, "height": 100 },
      "data": {
        "type": "diamond",
        "color": "#EA9C41"
      }
    },
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
      "id": "4",
      "type": "ShapeNode",
      "position": { "x": 200, "y": 140 },
      "style": { "width": 120, "height": 60 },
      "data": {
        "type": "hexagon",
        "color": "#CF4C2C"
      }
    },
    {
      "id": "5",
      "type": "ShapeNode",
      "position": { "x": 380, "y": 280 },
      "style": { "width": 100, "height": 100 },
      "data": {
        "type": "rectangle",
        "color": "#438D57"
      }
    },
    {
      "id": "6",
      "type": "ShapeNode",
      "position": { "x": -260, "y": 320 },
      "style": { "width": 140, "height": 60 },
      "data": {
        "type": "arrow-rectangle",
        "color": "#803DEC"
      }
    },
    {
      "id": "7",
      "type": "ShapeNode",
      "position": { "x": 10, "y": 300 },
      "style": { "width": 100, "height": 100 },
      "data": {
        "type": "cylinder",
        "color": "#EBC347"
      },
      "selected": true
    },
    {
      "id": "8",
      "type": "ShapeNode",
      "position": { "x": 10, "y": 500 },
      "style": { "width": 100, "height": 80 },
      "data": {
        "type": "triangle",
        "color": "#3F8AE2"
      }
    },
    {
      "id": "9",
      "type": "ShapeNode",
      "position": { "x": 180, "y": 420 },
      "style": { "width": 140, "height": 60 },
      "data": {
        "type": "parallelogram",
        "color": "#803DEC"
      }
    },
    {
      "id": "10",
      "type": "ShapeNode",
      "position": { "x": -230, "y": 460 },
      "style": { "width": 80, "height": 80 },
      "data": {
        "type": "plus",
        "color": "#CF4C2C"
      }
    },
    {
      "data": {
        "accentColor": "#dfcfe6",
        "blocks": [
          {
            "id": "0a965a08-08a0-4c11-9c80-915789659782",
            "props": {
              "text": {
                "content": [
                  {
                    "attrs": { "level": 1, "textAlign": "left" },
                    "content": [
                      {
                        "text": "Key Eligibility Criteria",
                        "type": "text"
                      },
                      {
                        "marks": [{ "type": "superscript" }],
                        "text": "1",
                        "type": "text"
                      }
                    ],
                    "type": "heading"
                  }
                ],
                "type": "doc"
              }
            },
            "type": "RichText"
          }
        ]
      },
      "id": "2c4ed479-67b8-4e08-a3d0-ad592da11679",
      "position": { "x": 0, "y": 0 },
      "style": { "border": "2px solid #201d6c" },
      "type": "PolymorphicNode"
    },
    {
      "data": {
        "accentColor": "#dfcfe6",
        "blocks": [
          {
            "id": "91502a68-c1fd-41f1-9089-bf3135e5fa5a",
            "props": {
              "text": {
                "content": [
                  {
                    "attrs": { "level": 1, "textAlign": "left" },
                    "content": [{ "text": "Ivosidenib", "type": "text" }],
                    "type": "heading"
                  },
                  {
                    "attrs": { "textAlign": "left" },
                    "content": [
                      { "text": "500 mg QD orally", "type": "text" },
                      {
                        "marks": [{ "type": "superscript" }],
                        "text": "1",
                        "type": "text"
                      }
                    ],
                    "type": "paragraph"
                  }
                ],
                "type": "doc"
              }
            },
            "type": "RichText"
          }
        ]
      },
      "id": "4568e749-da92-437e-a86a-af230faf04da",
      "position": { "x": 0, "y": 0 },
      "style": { "border": "2px solid #201d6c" },
      "type": "PolymorphicNode"
    },
    {
      "data": {
        "accentColor": "#dfcfe6",
        "blocks": [
          {
            "id": "7a2ff444-43e2-45bf-940c-cb910f7c4329",
            "props": {
              "text": {
                "content": [
                  {
                    "attrs": { "level": 1, "textAlign": "left" },
                    "content": [{ "text": "Placebo", "type": "text" }],
                    "type": "heading"
                  },
                  {
                    "attrs": { "textAlign": "left" },
                    "content": [
                      {
                        "text": "Matched tablets QD orally",
                        "type": "text"
                      },
                      {
                        "marks": [{ "type": "superscript" }],
                        "text": "1",
                        "type": "text"
                      }
                    ],
                    "type": "paragraph"
                  }
                ],
                "type": "doc"
              }
            },
            "type": "RichText"
          }
        ]
      },
      "id": "bf9f2867-8686-470d-9f24-d6256264e319",
      "position": { "x": 0, "y": 0 },
      "style": { "border": "2px solid #201d6c" },
      "type": "PolymorphicNode"
    },
    {
      "data": {
        "accentColor": "#dfcfe6",
        "blocks": [
          {
            "id": "95508e76-2c02-4979-b76d-39948eea39aa",
            "props": {
              "text": {
                "content": [
                  {
                    "attrs": { "level": 1, "textAlign": "left" },
                    "content": [
                      { "text": "Primary End Point", "type": "text" },
                      {
                        "marks": [{ "type": "superscript" }],
                        "text": "1",
                        "type": "text"
                      }
                    ],
                    "type": "heading"
                  },
                  {
                    "content": [
                      {
                        "content": [
                          {
                            "attrs": { "textAlign": "left" },
                            "content": [
                              { "text": "PFS", "type": "text" },
                              {
                                "marks": [{ "type": "superscript" }],
                                "text": "a",
                                "type": "text"
                              },
                              {
                                "text": " by BICR in patients with grade 1 or 2 chondrosarcoma",
                                "type": "text"
                              }
                            ],
                            "type": "paragraph"
                          }
                        ],
                        "type": "listItem"
                      }
                    ],
                    "type": "bulletList"
                  }
                ],
                "type": "doc"
              }
            },
            "type": "RichText"
          }
        ]
      },
      "id": "520a3417-2649-422e-8d4c-961f529f8d98",
      "position": { "x": 0, "y": 0 },
      "style": { "border": "2px solid #201d6c" },
      "type": "PolymorphicNode"
    },
    {
      "data": {
        "accentColor": "#dfcfe6",
        "blocks": [
          {
            "id": "255fc815-58b4-4da1-883b-8d1058f1e01d",
            "props": {
              "text": {
                "content": [
                  {
                    "attrs": { "level": 1, "textAlign": "left" },
                    "content": [
                      { "text": "Secondary End points", "type": "text" }
                    ],
                    "type": "heading"
                  }
                ],
                "type": "doc"
              }
            },
            "type": "RichText"
          }
        ]
      },
      "id": "3b5da902-2f0e-4a9d-a415-032de4dbcb42",
      "position": { "x": 0, "y": 0 },
      "style": { "border": "2px solid #201d6c" },
      "type": "PolymorphicNode"
    }
  ]
}


