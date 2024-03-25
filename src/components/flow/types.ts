import { Node, } from "reactflow";
import { BlockNodeProps } from "./nodes/BlockNode";


type BaseNodeProps = { label?: string; }
type InputNode = Node<BaseNodeProps, 'input'>
type OutputNode = Node<BaseNodeProps, 'output'>
type DefaultNode = Node<BaseNodeProps, 'default'>
type GroupNode = Node<BaseNodeProps, 'group'>

type TypedNode = BlockNodeProps | InputNode | OutputNode | DefaultNode | GroupNode




export type { TypedNode };


