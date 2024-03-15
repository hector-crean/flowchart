import { ChangeEventHandler, useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import styles from './RichTextNode.module.css';






interface RichTextNodeData {

}

interface Props extends NodeProps<RichTextNodeData> { }


const RichTextNode = ({ data }: Props) => {


    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className={styles.rich_text_node}>
            <Handle type="target" position={Position.Top} isConnectable={true} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={true}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={true} />
        </div>
    );
}

export { RichTextNode };
