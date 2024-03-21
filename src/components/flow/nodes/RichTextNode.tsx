import { useState } from 'react';
import { Handle, Node, Position, useReactFlow } from 'reactflow';
import styles from './RichTextNode.module.css';

import { motion } from 'framer-motion';




interface RichTextNodeData { }

type RichTextNodeProps = Node<RichTextNodeData, 'RichTextNode'>;


const RichTextNode = (props: RichTextNodeProps) => {

    const [hovered, setHovered] = useState(false)


    const { getNode } = useReactFlow()

    const node = getNode(props.id)

    if (!node) return null;

    return (
        <motion.div
            key={props.id}
            className={styles.rich_text_node}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >

            <div>
                <p>Node content</p>
            </div>
            {/* Handles */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={true}
            />
            <Handle
                type="target"
                id='b'
                position={Position.Top}
                isConnectable={true}
            />
        </motion.div>
    );
}

export { RichTextNode, type RichTextNodeProps };
