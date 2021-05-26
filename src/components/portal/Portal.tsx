import React, {FC, useState, useRef, useEffect, memo} from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    isPortal?: boolean;
    visible: boolean;
    children?:React.ReactNode
}

const Portal: FC<PortalProps> = ({
     isPortal=true,
     visible  = false,
     children
}) => {

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

    if(isPortal){
        return (
            <>
                {isFirstVisible && createPortal(
                    children,
                    boxNode.current
                )}
            </>
        );
    }

    return <>{children}</>;
};



export default memo(Portal);
