


import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useCallback } from 'react';
import { Node, useReactFlow } from 'reactflow';
import styles from './NodeToolbarBase.module.css';
import { Tool } from './Tool';




interface NodeToolbarBaseProps {
    node: Node;
    children?: ReactNode;
}

const NodeToolbarBase = ({ node, children }: NodeToolbarBaseProps) => {

    const { addNodes, deleteElements } = useReactFlow();

    const duplicateNode = useCallback(() => {
        const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
        };

        addNodes({ ...node, id: `${node.id}-copy`, position });

    }, [node, addNodes]);

    const deleteNode = useCallback(() => {

        deleteElements({ nodes: [node] })

    }, [deleteElements, node]);


    return (
        <AnimatePresence mode='wait'>
            {node && <motion.div
                className={styles.container}
            >

                <Tool onPointerDown={duplicateNode}>
                    <PlusIcon width={15} height={15} />
                </Tool>
                <Tool onPointerDown={deleteNode}>
                    <MinusIcon width={15} height={15} />
                </Tool>
                {children}
            </motion.div>}
        </AnimatePresence>

    );
};

export { NodeToolbarBase };
