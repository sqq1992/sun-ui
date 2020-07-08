import React, {FC, useState, useRef, useEffect} from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    visible: boolean;
}

const Portal: FC<PortalProps> = (props) => {
    let {
        visible,
        children
    } = props;
    const triggerRef = useRef(false);
    const [isFirstVisible, setIsFirstVisible] = useState(false);
    const boxNode = useRef<any>(null);

    useEffect(() => {
        if(visible && !triggerRef.current){
            triggerRef.current = true;
            let tempNode = document.createElement('div');
            document.body.appendChild(tempNode);
            boxNode.current = tempNode;
            setIsFirstVisible(true);
        }
    }, [visible]);


    return (
        <>
            {isFirstVisible && createPortal(
                children,
                boxNode.current
            )}
        </>
    );
};

Portal.defaultProps = {
    visible: false,
};

export default Portal;
