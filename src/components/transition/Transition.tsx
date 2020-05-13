// @ts-nocheck
import React from 'react';
import { CSSTransition } from 'react-transition-group';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

interface CombineCssTransitionProps {
    className?: string;
    in: boolean;
    appear?: boolean;
    unmountOnExit?: boolean;
    animation?: AnimationName;
    timeout?: number;
    children?: React.ReactNode
};


const DefineTransition: React.FC<CombineCssTransitionProps> = (props) => {
    const {className, animation, children, ...restProps} = props;

    let combineClassName = `${animation}`;
    return (
        <CSSTransition
            classNames={combineClassName}
            {...restProps}
        >
            {children}
        </CSSTransition>
    );
};
DefineTransition.defaultProps = {
    className:'',
    animation: 'zoom-in-top',
    in: false,
    appear: true,
    unmountOnExit: true,
    timeout: 200
};

export default DefineTransition;
