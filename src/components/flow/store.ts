import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
} from "reactflow";
import { create } from "zustand";
import { initialEdges } from './edges';
import { initialNodes } from './nodes';

type FlowState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
};

type Storage = {
    nodes: FlowState["nodes"];
    edges: FlowState["edges"];
};

const storage: Storage = {
    nodes: initialNodes,
    edges: initialEdges
}

const useFlowStore = create<FlowState>()(

    (set, get) => ({
        // Initial values for nodes and edges
        nodes: storage.nodes,
        edges: storage.edges,

        // Apply changes to React Flow when the flowchart is interacted with
        onNodesChange: (changes: NodeChange[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        onConnect: (connection: Connection) => {
            set({
                edges: addEdge(connection, get().edges),
            });
        },
    }),

);

export { useFlowStore };

