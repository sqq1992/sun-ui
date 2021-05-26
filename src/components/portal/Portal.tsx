import React, {FC, useState, useRef, useEffect, useMemo} from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    visible: boolean;
}

const Portal: FC<PortalProps> = ({
     visible  = false,
     children
}) => {

    const triggerRef = useRef(false);
    const [isFirstVisible, setIsFirstVisible] = useState(false);

    useEffect(() => {
        if(visible && !triggerRef.current){
            triggerRef.current = true;
            setIsFirstVisible(true);
        }
    }, [visible]);


    const containerNode = useMemo(() => {
        let containerNode = document.createElement('div');
        document.body.appendChild(containerNode);
        return containerNode
    }, []);


    return (
        <>
            {isFirstVisible && createPortal(
                children,
                containerNode
            )}
        </>
    );
};

export default Portal;
